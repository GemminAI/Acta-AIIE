# Acta AIIE — 35TAG v6.0.0 field registry and narrative kinematics helpers.
# Spec: ../specs/35TAG_Standard_v6.0.0.md

from __future__ import annotations

import math
from typing import Any, Final, Mapping, MutableMapping, Sequence

import numpy as np
from numpy.typing import NDArray

# ---------------------------------------------------------------------------
# Canonical field order (TAG 01–35) — semantic names per v6.0.0
# ---------------------------------------------------------------------------

TAG_FIELD_ORDER: Final[tuple[str, ...]] = (
    "permanent_id",
    "subject_origin",
    "predicate_type",
    "object_entity",
    "location",
    "time_frame",
    "actor_role",
    "causality_direction",
    "strategic_interest_vector",
    "epistemic_confidence",
    "bias_component",
    "model_differential",
    "global_synthesis",
    "n_o_variants",
    "source_credibility",
    "economic_transmission_path",
    "silence_reasons",
    "precedent_audit",
    "conflict_factuality_index",
    "backbone_history",
    "deep_dive",
    "epistemic_diffusion_state",
    "provenance_hash",
    "schema_version",
    "state_hash",
    "predictive_kinetic_metrics",
    "branching_futures",
    "collapse_state",
    "counterfactual_memory",
    "self_correction_deltas",
    "meta_cognition_state",
    "self_model_identity",
    "relative_time_field",
    "time_reversal_forks",
    "worldline_optimization",
)

# RFC 8785 (JCS) payload for T25 (`state_hash`): TAG 01–34 inclusive, excluding TAG 25 (`state_hash`).
STATE_HASH_JCS_KEYS: Final[tuple[str, ...]] = tuple(
    k for k in TAG_FIELD_ORDER if k not in ("state_hash", "worldline_optimization")
)

# ΔV feature layout dimension (numeric projection of v6 records for pairwise geometry)
DV_FEATURE_DIM: Final[int] = 20

# Strategic interest keys (TAG 09) — six dimensions
_STRATEGIC_KEYS: Final[tuple[str, ...]] = (
    "security",
    "economy",
    "tech",
    "resource",
    "ideology",
    "environment",
)


def _get_strategic_components(obj: Any) -> NDArray[np.float64]:
    if not isinstance(obj, dict):
        return np.zeros(6, dtype=np.float64)
    out = np.zeros(6, dtype=np.float64)
    for i, key in enumerate(_STRATEGIC_KEYS):
        v = obj.get(key)
        if v is None:
            for alt in (key.capitalize(), key.upper()):
                if alt in obj:
                    v = obj[alt]
                    break
        out[i] = float(v) if v is not None else 0.0
    return np.clip(out, -1.0, 1.0)


def _float_from(obj: Any, *keys: str, default: float = 0.0) -> float:
    if not isinstance(obj, dict):
        return default
    for k in keys:
        if k in obj and obj[k] is not None:
            return float(obj[k])
    return default


def narrative_record_to_dv_features(rec: Mapping[str, Any]) -> NDArray[np.float64]:
    """
    Project one v6.0.0 narrative record to a fixed real vector for Protocol §9 ΔV geometry.
    Emphasizes TAG 09 (strategic_interest_vector); incorporates kinetic / memory / meta scalars.
    """
    s = _get_strategic_components(rec.get("strategic_interest_vector"))
    t10 = float(rec.get("epistemic_confidence", 0.0))
    t15 = float(rec.get("source_credibility", 0.0))
    t19 = float(rec.get("conflict_factuality_index", 0.0))

    km = rec.get("predictive_kinetic_metrics")
    vt = _float_from(km, "v_t", "velocity", "v")
    at = _float_from(km, "a_t", "acceleration", "a")
    pr = _float_from(km, "P_risk", "p_risk", default=0.5)

    bf = rec.get("branching_futures")
    n_br = float(len(bf)) if isinstance(bf, list) else 0.0
    branch_norm = float(np.clip(n_br / 10.0, 0.0, 1.0))

    cs = rec.get("collapse_state")
    ghost = _float_from(cs, "ghost_intensity", "ghost", default=0.0) if isinstance(cs, dict) else 0.0
    mode = str(cs.get("mode", "")).upper() if isinstance(cs, dict) else ""
    hard_soft = 1.0 if mode == "HARD" else (0.5 if mode == "SOFT" else 0.25)

    cf = rec.get("counterfactual_memory")
    regret = _float_from(cf, "regret", "Regret", default=0.0) if isinstance(cf, dict) else 0.0

    sc = rec.get("self_correction_deltas")
    inertia = _float_from(sc, "inertia_alpha", "alpha", default=0.5) if isinstance(sc, dict) else 0.5
    lam = _float_from(sc, "lambda_weights", "lambda", default=1.0) if isinstance(sc, dict) else 1.0

    mc = rec.get("meta_cognition_state")
    sai = _float_from(mc, "sai", "SAI", "self_awareness_index", default=0.5) if isinstance(mc, dict) else 0.5

    rtf = rec.get("relative_time_field")
    # dτ computed analytically for feature slot; see proper_time_dtau()
    dtau = proper_time_dtau(rtf if isinstance(rtf, dict) else {})

    vec = np.concatenate(
        [
            s,
            np.array(
                [t10, t15, t19, vt, at, pr, branch_norm, ghost, hard_soft, regret, inertia, lam, sai, dtau],
                dtype=np.float64,
            ),
        ]
    )
    assert vec.shape[0] == DV_FEATURE_DIM
    return vec


def records_to_dv_feature_matrix(records: Sequence[Mapping[str, Any]]) -> NDArray[np.float64]:
    rows = [narrative_record_to_dv_features(r) for r in records]
    return np.stack(rows, axis=0) if rows else np.zeros((0, DV_FEATURE_DIM), dtype=np.float64)


def default_dv_feature_weights() -> NDArray[np.float64]:
    """Protocol §9.3 — structural weights on ``DV_FEATURE_DIM`` slots (normalized)."""
    w = np.zeros(DV_FEATURE_DIM, dtype=np.float64)
    w[0:6] = 1.0
    w[6:9] = 0.65
    w[9:12] = 0.45
    w[12:15] = 0.35
    w[15:18] = 0.3
    w[18:20] = 0.25
    s = float(np.sum(w))
    if s <= 0.0:
        raise ValueError("weights sum to zero")
    return w / s


def default_dv_feature_kinds() -> NDArray[np.int8]:
    """All FLOAT for the numeric projection layer (enum-like slots already collapsed)."""
    return np.zeros(DV_FEATURE_DIM, dtype=np.int8)


# ---------------------------------------------------------------------------
# Category VII — Kinetics (TAG 26–27): phase-transition probability P(risk)
# ---------------------------------------------------------------------------


def phase_transition_probability_p_risk(
    predictive_kinetic_metrics: Mapping[str, Any] | None,
    branching_futures: Any,
) -> float:
    """
    Combine TAG 26 (kinetic stress) and TAG 27 (superposition breadth) into P(risk) ∈ [0,1].
    """
    km = predictive_kinetic_metrics or {}
    vt = _float_from(km, "v_t", "velocity", "v")
    at = _float_from(km, "a_t", "acceleration", "a")
    pr = _float_from(km, "P_risk", "p_risk", default=0.5)

    kinetic_stress = math.tanh(abs(vt) + abs(at))
    n_b = len(branching_futures) if isinstance(branching_futures, list) else 0
    superposition_pressure = 1.0 - math.exp(-0.18 * max(0, n_b - 1))
    p = 0.45 * float(np.clip(pr, 0.0, 1.0)) + 0.3 * kinetic_stress + 0.25 * superposition_pressure
    return float(np.clip(p, 0.0, 1.0))


# ---------------------------------------------------------------------------
# Category VIII — Memory / correction (TAG 29–30): regret-gradient step
# ---------------------------------------------------------------------------


def apply_regret_gradient_step(
    counterfactual_memory: Mapping[str, Any] | None,
    self_correction_deltas: Mapping[str, Any] | None,
    *,
    eta: float = 0.05,
) -> dict[str, Any]:
    """
    θ ← θ − η · ∇_θ Regret — inertia α and weights λ (TAG 30), driven by TAG 29 regret signal.
    """
    cm = counterfactual_memory or {}
    sc = dict(self_correction_deltas or {})

    regret = _float_from(cm, "regret", "Regret", default=0.0)
    cos_al = _float_from(cm, "cosine_alignment", "cos_theta", default=1.0)
    grad = float(np.clip(regret + (1.0 - cos_al), 0.0, 2.0))

    inertia = _float_from(sc, "inertia_alpha", "alpha", default=0.5)
    lam = _float_from(sc, "lambda_weights", "lambda", default=1.0)

    sc["inertia_alpha"] = float(np.clip(inertia - eta * grad * 0.12, 0.0, 1.0))
    sc["lambda_weights"] = float(np.clip(lam - eta * grad * 0.07, 0.01, 10.0))
    return sc


# ---------------------------------------------------------------------------
# Category IX — Relative time (TAG 33): proper time dτ
# ---------------------------------------------------------------------------


def proper_time_dtau(relative_time_field: Mapping[str, Any] | None) -> float:
    """
    Proper-time increment dτ from state velocity/acceleration and potential-field delay (TAG 33).
    """
    rf = relative_time_field or {}
    v = _float_from(rf, "velocity", "v", default=0.0)
    a = _float_from(rf, "acceleration", "a", default=0.0)
    delay = _float_from(rf, "potential_delay", "field_delay", default=0.0)
    c = 1.0
    beta = min(abs(v) / c, 0.999)
    lorentz = math.sqrt(max(1e-15, 1.0 - beta * beta))
    return float(lorentz * (1.0 + max(0.0, delay)) * (1.0 + 0.12 * abs(a)))


# ---------------------------------------------------------------------------
# Category X — Final closure (TAG 35): crystallized worldline summary
# ---------------------------------------------------------------------------


def crystallized_state_from_worldline(tag35: Mapping[str, Any] | None) -> dict[str, Any]:
    """TAG 35 — sealed optimal trajectory / crystallized narrative closure."""
    w = tag35 or {}
    return {
        "crystallized": True,
        "selected_worldline": w.get("selected_worldline", w.get("optimal_trajectory")),
        "integral_regret_dtau": w.get("integral_regret_dtau"),
        "coherence_score": w.get("coherence_score"),
        "human_value_score": w.get("human_value_score"),
        "sealed": bool(w.get("sealed", True)),
    }


# ---------------------------------------------------------------------------
# Defaults & synthetic construction (deterministic tests / MCP)
# ---------------------------------------------------------------------------


def empty_narrative_record_v6() -> dict[str, Any]:
    return {
        "permanent_id": "gmn://19700101/00000000",
        "subject_origin": "us",
        "predicate_type": "declare",
        "object_entity": [],
        "location": {"country": "", "coord": [0.0, 0.0]},
        "time_frame": "1970-01-01T00:00:00Z",
        "actor_role": "state",
        "causality_direction": "midstream",
        "strategic_interest_vector": {k: 0.0 for k in _STRATEGIC_KEYS},
        "epistemic_confidence": 0.5,
        "bias_component": {"load": 0.0, "centroid": [0.0, 0.0, 0.0]},
        "model_differential": {"consensus": [], "conflict": []},
        "global_synthesis": "",
        "n_o_variants": {},
        "source_credibility": 0.5,
        "economic_transmission_path": [],
        "silence_reasons": [],
        "precedent_audit": [],
        "conflict_factuality_index": 0.5,
        "backbone_history": "",
        "deep_dive": "",
        "epistemic_diffusion_state": "Diffused",
        "provenance_hash": "",
        "schema_version": "6.0.0",
        "state_hash": "",
        "predictive_kinetic_metrics": {"v_t": 0.0, "a_t": 0.0, "P_risk": 0.5},
        "branching_futures": [],
        "collapse_state": {"mode": "SOFT", "P_t1": [0.0, 0.0], "ghost_intensity": 0.0},
        "counterfactual_memory": {"regret": 0.0, "cosine_alignment": 1.0},
        "self_correction_deltas": {"inertia_alpha": 0.5, "lambda_weights": 1.0},
        "meta_cognition_state": {"sai": 0.5, "bias_vector": [0.0, 0.0, 0.0]},
        "self_model_identity": {
            "timeline_id": "",
            "parent_state_hash": "",
            "P_t": 0.0,
            "M_t": 0.0,
            "Theta": 0.0,
            "C": 0.0,
            "H": 0.0,
        },
        "relative_time_field": {"velocity": 0.0, "acceleration": 0.0, "potential_delay": 0.0},
        "time_reversal_forks": [],
        "worldline_optimization": {
            "selected_worldline": None,
            "integral_regret_dtau": 0.0,
            "sealed": False,
        },
    }


def synthetic_narrative_record_v6(seed: int, actor_index: int = 0) -> dict[str, Any]:
    rng = np.random.default_rng((seed + actor_index * 9973) % (2**32))
    base = empty_narrative_record_v6()
    base["permanent_id"] = f"gmn://20260407/{seed:08x}{actor_index:02x}"
    base["subject_origin"] = ["jp", "cn", "us", "uk", "qa", "eu"][int(rng.integers(0, 6))]
    vec = {k: float(rng.uniform(-1, 1)) for k in _STRATEGIC_KEYS}
    base["strategic_interest_vector"] = vec
    base["epistemic_confidence"] = float(rng.uniform(0, 1))
    base["source_credibility"] = float(rng.uniform(0, 1))
    base["conflict_factuality_index"] = float(rng.uniform(0, 1))
    base["predictive_kinetic_metrics"] = {
        "v_t": float(rng.normal(0, 0.3)),
        "a_t": float(rng.normal(0, 0.2)),
        "P_risk": float(rng.uniform(0, 1)),
    }
    n_br = int(rng.integers(1, 8))
    base["branching_futures"] = [
        {"P_hat": float(rng.uniform(0, 1)), "E": float(rng.uniform(0, 1)), "P": float(rng.uniform(0, 1))}
        for _ in range(n_br)
    ]
    base["collapse_state"] = {
        "mode": "HARD" if rng.random() > 0.5 else "SOFT",
        "P_t1": [float(rng.uniform(-1, 1)), float(rng.uniform(-1, 1))],
        "ghost_intensity": float(rng.uniform(0, 1)),
    }
    base["counterfactual_memory"] = {
        "regret": float(rng.uniform(0, 1)),
        "cosine_alignment": float(rng.uniform(0, 1)),
    }
    base["self_correction_deltas"] = {
        "inertia_alpha": float(rng.uniform(0.2, 0.8)),
        "lambda_weights": float(rng.uniform(0.5, 1.5)),
    }
    base["meta_cognition_state"] = {
        "sai": float(rng.uniform(0, 1)),
        "bias_vector": [float(rng.uniform(-1, 1)) for _ in range(3)],
    }
    base["relative_time_field"] = {
        "velocity": float(rng.uniform(-0.9, 0.9)),
        "acceleration": float(rng.uniform(-0.5, 0.5)),
        "potential_delay": float(rng.uniform(0, 0.5)),
    }
    base["worldline_optimization"] = {
        "selected_worldline": {"id": actor_index, "score": float(rng.uniform(0, 1))},
        "integral_regret_dtau": float(rng.uniform(0, 1)),
        "coherence_score": float(rng.uniform(0, 1)),
        "human_value_score": float(rng.uniform(0, 1)),
        "sealed": bool(rng.random() > 0.3),
    }
    # Apply one regret-gradient step for internal consistency (TAG 29–30)
    base["self_correction_deltas"] = apply_regret_gradient_step(
        base["counterfactual_memory"],
        base["self_correction_deltas"],
        eta=0.05,
    )
    return base


def state_hash_jcs_payload(data: Mapping[str, Any]) -> dict[str, Any]:
    """Subset of ``data`` containing only keys that participate in T25 JCS (TAG 01–34 excl. state_hash)."""
    return {k: data[k] for k in STATE_HASH_JCS_KEYS if k in data}


__all__ = [
    "TAG_FIELD_ORDER",
    "STATE_HASH_JCS_KEYS",
    "DV_FEATURE_DIM",
    "narrative_record_to_dv_features",
    "records_to_dv_feature_matrix",
    "default_dv_feature_weights",
    "default_dv_feature_kinds",
    "phase_transition_probability_p_risk",
    "apply_regret_gradient_step",
    "proper_time_dtau",
    "crystallized_state_from_worldline",
    "empty_narrative_record_v6",
    "synthetic_narrative_record_v6",
    "state_hash_jcs_payload",
]
