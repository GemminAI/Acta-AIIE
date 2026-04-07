#!/usr/bin/env python3
"""
MCP bridge — stdin JSON → stdout JSON (NarrativeDynamicsResult serialisation).

Compliant with Acta AIIE Protocol v1.0.0. Does not read Sovereign/ or any non-repo paths.
Run with CWD = this directory so local imports resolve.
"""

from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path
from typing import Any

import numpy as np

# Local imports (sdk/)
sys.path.insert(0, str(Path(__file__).resolve().parent))

from narrative_dynamics_engine import (  # noqa: E402
    NarrativeDynamicsResult,
    detect_relaxation,
    run_narrative_dynamics_core,
)
from verify_integrity import canonicalize, compute_hash  # noqa: E402


def _structural_tension_t(interaction: np.ndarray) -> float:
    """Off-diagonal |ℐ| dispersion (legacy T proxy for MCP metrics)."""
    n = int(interaction.shape[0])
    if n < 2:
        return 0.0
    iu = np.triu_indices(n, k=1)
    mags = np.abs(interaction[iu])
    if mags.size == 0:
        return 0.0
    return float(np.std(mags) * (n * (n - 1) / 2.0))


def _t25_from_core_tags(tag_row: np.ndarray) -> str:
    """Protocol §4 — T25 = SHA256(JCS(s_core)); s_core ≈ T01–T21 (excl. projection/hash slots)."""
    core: dict[str, Any] = {}
    for i in range(21):
        core[f"T{i + 1:02d}"] = float(tag_row[i])
    return compute_hash(canonicalize(core))


def _topic_seed(topic: str) -> int:
    """Deterministic 32-bit seed (hash() is salted per process — unsuitable for MCP)."""
    h = hashlib.sha256(topic.encode("utf-8")).hexdigest()
    return int(h[:8], 16) % (2**31)


def _synthetic_tag_stack(topic: str, n_actors: int = 3) -> np.ndarray:
    """Deterministic field realization from topic string (no external data)."""
    rng = np.random.default_rng(_topic_seed(topic))
    return rng.random((n_actors, 35), dtype=np.float64)


def _synthetic_trajectory(n: int, topic: str, t: int = 24, d: int = 8) -> np.ndarray:
    rng = np.random.default_rng((_topic_seed(topic) + 17) % (2**31))
    return rng.standard_normal((t, n, d), dtype=np.float64)


def _serialize_complex_matrix(z: np.ndarray) -> list[list[dict[str, float]]]:
    out: list[list[dict[str, float]]] = []
    for row in z:
        out.append([{"re": float(x.real), "im": float(x.imag)} for x in row])
    return out


def _result_to_dict(
    res: NarrativeDynamicsResult,
    t25: str,
    field_status: str,
    structural_tension: float,
    hesitation: bool,
    relaxation_detected: bool,
) -> dict[str, Any]:
    ft = res.field_tensor
    sc = res.scalars
    p = res.pathology
    pce = res.pce_from_sigma

    return {
        "t25_state_hash": t25,
        "field_status": field_status,
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

    if "tag_stack" in payload and payload["tag_stack"] is not None:
        tag_stack = np.asarray(payload["tag_stack"], dtype=np.float64)
        if tag_stack.ndim != 2 or tag_stack.shape[1] != 35:
            raise ValueError("tag_stack must be (N, 35)")
    else:
        tag_stack = _synthetic_tag_stack(topic, n_actors=n_actors)

    traj: np.ndarray | None = None
    if "interpretation_trajectory" in payload and payload["interpretation_trajectory"] is not None:
        traj = np.asarray(payload["interpretation_trajectory"], dtype=np.float64)
        if traj.ndim != 3:
            raise ValueError("interpretation_trajectory must be (T, N, D)")
    else:
        traj = _synthetic_trajectory(tag_stack.shape[0], topic)

    sigma_prev = payload.get("sigma_prev_external")
    sigma_prev_f = float(sigma_prev) if sigma_prev is not None else 0.02
    theta_floor = float(payload.get("theta_floor", 0.05))
    theta_expand = float(payload.get("theta_expand", 0.04))
    theta_conv = float(payload.get("theta_conv", 2.0))

    res = run_narrative_dynamics_core(
        tag_stack,
        traj,
        interaction_prev=None,
        sigma_prev_external=sigma_prev_f,
        theta_floor=theta_floor,
        theta_expand=theta_expand,
    )

    t25 = _t25_from_core_tags(tag_stack[0])
    I = res.field_tensor.interaction
    tension_t = _structural_tension_t(I)

    sigma_now = res.scalars.semantic_variance_sigma_sq
    dv_mat = res.field_tensor.divergence
    iu = np.triu_indices(int(dv_mat.shape[0]), k=1)
    max_dv = float(np.max(dv_mat[iu])) if iu[0].size else 0.0
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

    out = _result_to_dict(
        res,
        t25=t25,
        field_status=field_status,
        structural_tension=tension_t,
        hesitation=hesitation,
        relaxation_detected=rel.detected,
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
