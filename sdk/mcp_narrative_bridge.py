#!/usr/bin/env python3
"""
MCP bridge — stdin JSON → stdout JSON (NarrativeDynamicsResult + 35TAG v6.0.0).

Compliant with Acta AIIE Protocol v1.0.0 and specs/35TAG_Standard_v6.0.0.md.
Does not read Sovereign/ or any non-repo paths. CWD = this directory for imports.
"""

from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path
from typing import Any

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from narrative_dynamics_engine import (  # noqa: E402
    NarrativeDynamicsResult,
    detect_relaxation,
    run_narrative_dynamics_core,
)
from tag_v6 import (  # noqa: E402
    crystallized_state_from_worldline,
    phase_transition_probability_p_risk,
    proper_time_dtau,
    records_to_dv_feature_matrix,
    state_hash_jcs_payload,
    synthetic_narrative_record_v6,
)
from verify_integrity import canonicalize, compute_hash  # noqa: E402


def _structural_tension_t(interaction: np.ndarray) -> float:
    """Off-diagonal |ℐ| dispersion (structural tension proxy)."""
    n = int(interaction.shape[0])
    if n < 2:
        return 0.0
    iu = np.triu_indices(n, k=1)
    mags = np.abs(interaction[iu])
    if mags.size == 0:
        return 0.0
    return float(np.std(mags) * (n * (n - 1) / 2.0))


def _t25_from_record(rec: dict[str, Any]) -> str:
    """TAG 25 — SHA256(JCS(TAG 01…34 except state_hash))."""
    pl = state_hash_jcs_payload(rec)
    return compute_hash(canonicalize(pl))


def _topic_seed(topic: str) -> int:
    h = hashlib.sha256(topic.encode("utf-8")).hexdigest()
    return int(h[:8], 16) % (2**31)


def _serialize_complex_matrix(z: np.ndarray) -> list[list[dict[str, float]]]:
    out: list[list[dict[str, float]]] = []
    for row in z:
        out.append([{"re": float(x.real), "im": float(x.imag)} for x in row])
    return out


def _result_to_dict(
    res: NarrativeDynamicsResult,
    *,
    t25: str,
    field_status: str,
    structural_tension: float,
    hesitation: bool,
    relaxation_detected: bool,
    actors_35tag: list[dict[str, Any]],
    dv_features: np.ndarray,
    v6_kinematics: dict[str, Any],
) -> dict[str, Any]:
    ft = res.field_tensor
    sc = res.scalars
    p = res.pathology
    pce = res.pce_from_sigma

    return {
        "protocol_schema": "35TAG_v6.0.0",
        "t25_state_hash": t25,
        "field_status": field_status,
        "actors_35tag": actors_35tag,
        "delta_v_feature_matrix": dv_features.tolist(),
        "v6_kinematics": v6_kinematics,
        "structural_metrics": {
            "sigma_squared": sc.semantic_variance_sigma_sq,
            "J_energy_flow": sc.energy_flow_j,
            "T_structural_tension": structural_tension,
            "trajectory_velocity": sc.trajectory_velocity,
            "cfi_score": sc.cfi_score,
        },
        "field_pathology": {
            "codes": list(p.codes),
            "messages": list(p.messages),
            "hotspot_xy": [p.hotspot_xy[0], p.hotspot_xy[1]],
            "scores": dict(p.scores),
        },
        "pce": (
            None
            if pce is None
            else {
                "ignition": pce.ignition,
                "sigma_squared_prev": pce.sigma_squared_prev,
                "sigma_squared_now": pce.sigma_squared_now,
                "theta_floor": pce.theta_floor,
                "theta_expand": pce.theta_expand,
                "message": pce.message,
            }
        ),
        "hesitation_protocol": hesitation,
        "relaxation_detected": relaxation_detected,
        "field_tensor": {
            "interaction": _serialize_complex_matrix(ft.interaction),
            "velocity": _serialize_complex_matrix(ft.velocity),
            "divergence": ft.divergence.tolist(),
        },
    }


def run_bridge(payload: dict[str, Any]) -> dict[str, Any]:
    topic = str(payload.get("topic", "")).strip()
    if not topic:
        raise ValueError("topic is required")

    n_actors = int(payload.get("n_actors", 3))
    n_actors = max(2, min(n_actors, 16))
    seed = _topic_seed(topic)

    if payload.get("actors_35tag") is not None:
        raw = payload["actors_35tag"]
        if not isinstance(raw, list) or len(raw) < 2:
            raise ValueError("actors_35tag must be a list of at least two v6.0.0 records")
        actors_35tag = raw
    else:
        actors_35tag = [synthetic_narrative_record_v6(seed, actor_index=i) for i in range(n_actors)]

    tag_stack = actors_35tag
    traj: np.ndarray | None = None
    if payload.get("interpretation_trajectory") is not None:
        traj = np.asarray(payload["interpretation_trajectory"], dtype=np.float64)
        if traj.ndim != 3:
            raise ValueError("interpretation_trajectory must be (T, N, D)")

    sigma_prev = payload.get("sigma_prev_external")
    sigma_prev_f = float(sigma_prev) if sigma_prev is not None else 0.02
    theta_floor = float(payload.get("theta_floor", 0.05))
    theta_expand = float(payload.get("theta_expand", 0.04))
    theta_conv = float(payload.get("theta_conv", 2.0))

    dv_mat = records_to_dv_feature_matrix(actors_35tag)

    res = run_narrative_dynamics_core(
        tag_stack,
        traj,
        interaction_prev=None,
        sigma_prev_external=sigma_prev_f,
        theta_floor=theta_floor,
        theta_expand=theta_expand,
    )

    t25 = _t25_from_record(actors_35tag[0])
    I = res.field_tensor.interaction
    tension_t = _structural_tension_t(I)

    sigma_now = res.scalars.semantic_variance_sigma_sq
    dv_field = res.field_tensor.divergence
    iu = np.triu_indices(int(dv_field.shape[0]), k=1)
    max_dv = float(np.max(dv_field[iu])) if iu[0].size else 0.0
    hesitation = max_dv >= 0.7

    rel = detect_relaxation(
        np.array([sigma_prev_f, sigma_now], dtype=np.float64),
        res.scalars.trajectory_velocity,
        theta_conv,
    )

    field_status = "STABLE"
    if res.pce_from_sigma is not None and res.pce_from_sigma.ignition:
        field_status = "PCE_IGNITION"
    elif rel.detected:
        field_status = "RELAXATION"

    v6_kinematics: dict[str, Any] = {
        "P_risk": [
            phase_transition_probability_p_risk(
                a.get("predictive_kinetic_metrics"),
                a.get("branching_futures"),
            )
            for a in actors_35tag
        ],
        "d_tau": [proper_time_dtau(a.get("relative_time_field")) for a in actors_35tag],
        "crystallized_closure": [
            crystallized_state_from_worldline(a.get("worldline_optimization")) for a in actors_35tag
        ],
    }

    out = _result_to_dict(
        res,
        t25=t25,
        field_status=field_status,
        structural_tension=tension_t,
        hesitation=hesitation,
        relaxation_detected=rel.detected,
        actors_35tag=actors_35tag,
        dv_features=dv_mat,
        v6_kinematics=v6_kinematics,
    )
    out["relaxation_detail"] = {
        "detected": rel.detected,
        "gradient_sigma": rel.gradient_sigma,
        "velocity_magnitude": rel.velocity_magnitude,
        "message": rel.message,
    }
    return out


def main() -> int:
    try:
        raw = sys.stdin.read()
        payload = json.loads(raw) if raw.strip() else {}
        out = run_bridge(payload)
        sys.stdout.write(json.dumps(out, ensure_ascii=False))
        return 0
    except Exception as e:
        err = {"error": True, "message": str(e), "type": type(e).__name__}
        sys.stdout.write(json.dumps(err, ensure_ascii=False))
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
