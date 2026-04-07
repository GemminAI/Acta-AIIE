# Compliant with Acta AIIE Protocol v1.0.0 — §9 (ΔV), §10 (CFI 2.0), §11 (PCE);
# AIIE-RFC-0001 (ΔV), RFC-0002 (PCE), RFC-0003 (interaction field), RFC-0004 (relaxation).
#
# Architecture: field-centric narrative dynamics — tensors over the coupling manifold,
# not actor-centric attribution.

from __future__ import annotations

import math
from dataclasses import dataclass
from enum import IntEnum
from typing import Final, Sequence

import numpy as np
from numpy.typing import NDArray

# ---------------------------------------------------------------------------
# Types
# ---------------------------------------------------------------------------

FloatArray = NDArray[np.float64]
ComplexArray = NDArray[np.complex128]


class TagKind(IntEnum):
    """Protocol v1.0.0 §9.2 — component distance δ."""

    FLOAT = 0
    ENUM_OR_BOOL = 1
    EMBEDDING = 2


@dataclass(frozen=True)
class FieldTensor:
    """
    Rank-structured field state over the narrative coupling manifold.

    - ``interaction`` — ℐ(t): current complex interaction amplitudes (RFC-0003).
    - ``velocity`` — dℐ/dt: information-flow rate between prior and current slice (Protocol §11.5 linkage).
    - ``divergence`` — ΔV_ij: Protocol §9 geometric distortion (pairwise, real).
    """

    interaction: ComplexArray
    velocity: ComplexArray
    divergence: FloatArray


@dataclass(frozen=True)
class PCEDetectionResult:
    """Protocol v1.0.0 §11.2 — PCE ignition (variance-based)."""

    ignition: bool
    sigma_squared_prev: float
    sigma_squared_now: float
    theta_floor: float
    theta_expand: float
    message: str


@dataclass(frozen=True)
class PCEConfirmationResult:
    """Protocol v1.0.0 §11.3 — sustained expansion gate."""

    confirmed: bool
    message: str


@dataclass(frozen=True)
class RelaxationResult:
    """RFC-0004 — post-PCE / quiescent regime: variance down-shock + low flow."""

    detected: bool
    gradient_sigma: float
    velocity_magnitude: float
    theta_conv: float
    message: str


@dataclass(frozen=True)
class FieldPathologyReport:
    """
    Structure-centric diagnostics (no actor blame language).
    ``hotspot_xy`` — normalized field coordinates [0,1]² of peak structural load.
    """

    codes: tuple[str, ...]
    messages: tuple[str, ...]
    hotspot_xy: tuple[float, float]
    scores: dict[str, float]


@dataclass(frozen=True)
class FieldScalars:
    """Aggregates for logging (Protocol §11.5 velocity, §9 flow)."""

    energy_flow_j: float
    """‖ℐ‖₁ off-diagonal — coupling budget (field momentum proxy)."""
    trajectory_velocity: float
    """Protocol §11.5: v(t) ≈ ‖s_t - s_{t-1}‖ / Δt — here ‖ℐ_t - ℐ_{t-1}‖_F / dt on off-diagonals."""
    semantic_variance_sigma_sq: float
    """σ²_t — variance pool over semantic alignment channels (§11.2 input)."""
    cfi_score: float
    """Protocol §10.1: C(s) = exp(-Σ_k p_k a_k) with default a_k = 0 → 1.0 unless anomalies supplied."""


@dataclass(frozen=True)
class NarrativeDynamicsResult:
    """Primary SDK bundle (next-gen)."""

    field_tensor: FieldTensor
    scalars: FieldScalars
    pathology: FieldPathologyReport
    pce_from_sigma: PCEDetectionResult | None
    phase_lag_radians: FloatArray | None = None
    amplitude_matrix: FloatArray | None = None

    @property
    def interaction_matrix(self) -> ComplexArray:
        """Backward-compatible name for ℐ(t)."""
        return self.field_tensor.interaction

    @property
    def delta_v_matrix(self) -> FloatArray:
        return self.field_tensor.divergence

    @property
    def field_metrics(self) -> FieldScalars:
        """Legacy alias for ``scalars``."""
        return self.scalars

    @property
    def anomalies(self) -> FieldPathologyReport:
        """Legacy slot — now structure-centric ``FieldPathologyReport``."""
        return self.pathology

    @property
    def phase_lag_matrix(self) -> FloatArray | None:
        """Alias for ``phase_lag_radians`` (legacy name)."""
        return self.phase_lag_radians


# T22–T25 excluded from ΔV — Protocol v1.0.0 §9.3
_EXCLUDED_DV_INDICES: Final[frozenset[int]] = frozenset(range(21, 25))

# CFI penalty weights p_k — Protocol v1.0.0 §10.2 (order: tamper, temporal, spatial, actor, meta)
_CFI_P_DEFAULT: Final[FloatArray] = np.array([0.8, 0.7, 0.5, 0.4, 0.3], dtype=np.float64)


def default_tag_weights_35() -> FloatArray:
    """Protocol §9.3 — default structural weights (normalized, exclusions zeroed)."""
    w = np.zeros(35, dtype=np.float64)
    for i in (4, 5, 12, 13):
        w[i] = 1.0
    for i in (7, 18, 19):
        w[i] = 0.6
    for i in range(35):
        if i in _EXCLUDED_DV_INDICES:
            w[i] = 0.0
        elif w[i] == 0.0:
            w[i] = 0.2
    s = float(np.sum(w))
    if s <= 0.0:
        raise ValueError("tag weights sum to zero")
    w /= s
    return w


def default_tag_kinds_35() -> NDArray[np.int8]:
    return np.zeros(35, dtype=np.int8)


def per_tag_delta(
    a: float | FloatArray,
    b: float | FloatArray,
    kind: int | TagKind,
) -> float:
    """Protocol §9.2."""
    k = TagKind(int(kind))
    if k is TagKind.FLOAT:
        return abs(float(a) - float(b))  # type: ignore[arg-type]
    if k is TagKind.ENUM_OR_BOOL:
        return 0.0 if float(a) == float(b) else 1.0
    if k is TagKind.EMBEDDING:
        va = np.asarray(a, dtype=np.float64).ravel()
        vb = np.asarray(b, dtype=np.float64).ravel()
        if va.size != vb.size or va.size == 0:
            raise ValueError("embedding pair must have same positive length")
        na = np.linalg.norm(va)
        nb = np.linalg.norm(vb)
        if na <= 1e-15 or nb <= 1e-15:
            return 1.0
        cos = float(np.clip(np.dot(va, vb) / (na * nb), -1.0, 1.0))
        return float(1.0 - cos)
    raise ValueError(f"unknown TagKind {k}")


def delta_v_weighted_l2(
    tags_a: FloatArray,
    tags_b: FloatArray,
    weights: FloatArray | None = None,
    kinds: NDArray[np.int8] | None = None,
) -> float:
    """Protocol §9.1 — scalar ΔV for one pair."""
    if tags_a.shape != (35,) or tags_b.shape != (35,):
        raise ValueError("tags must have shape (35,)")
    w = default_tag_weights_35() if weights is None else np.asarray(weights, dtype=np.float64).copy()
    if w.shape != (35,):
        raise ValueError("weights shape (35,)")
    for i in _EXCLUDED_DV_INDICES:
        w[i] = 0.0
    s = float(np.sum(w))
    if s > 0.0:
        w /= s
    k_arr = default_tag_kinds_35() if kinds is None else kinds
    if k_arr.shape != (35,):
        raise ValueError("kinds shape (35,)")

    acc = 0.0
    for i in range(35):
        if i in _EXCLUDED_DV_INDICES:
            continue
        acc += float(w[i]) * (per_tag_delta(tags_a[i], tags_b[i], int(k_arr[i])) ** 2)
    return float(math.sqrt(max(acc, 0.0)))


def pairwise_delta_v_matrix(
    tag_stack: FloatArray,
    weights: FloatArray | None = None,
    kinds: NDArray[np.int8] | None = None,
) -> FloatArray:
    """ΔV_ij — vectorized when all kinds are FLOAT; else pairwise loop."""
    if tag_stack.ndim != 2 or tag_stack.shape[1] != 35:
        raise ValueError("tag_stack must have shape (N, 35)")
    n = int(tag_stack.shape[0])
    kinds = default_tag_kinds_35() if kinds is None else kinds
    if np.any(kinds != 0):
        out = np.zeros((n, n), dtype=np.float64)
        for i in range(n):
            for j in range(i + 1, n):
                dv = delta_v_weighted_l2(tag_stack[i], tag_stack[j], weights=weights, kinds=kinds)
                out[i, j] = out[j, i] = dv
        return out

    w = default_tag_weights_35() if weights is None else np.asarray(weights, dtype=np.float64).copy()
    for i in _EXCLUDED_DV_INDICES:
        w[i] = 0.0
    sw = float(np.sum(w))
    if sw > 0.0:
        w /= sw
    mask = np.ones(35, dtype=np.float64)
    for i in _EXCLUDED_DV_INDICES:
        mask[i] = 0.0
    diff = tag_stack[:, np.newaxis, :] - tag_stack[np.newaxis, :, :]
    dv = np.sqrt(np.maximum(np.sum(w * (diff ** 2) * mask, axis=2), 0.0))
    np.fill_diagonal(dv, 0.0)
    return dv.astype(np.float64)


def sigma_delta_v(dv: FloatArray, steepness: float = 4.0) -> FloatArray:
    """σ(ΔV) gate for ℐ construction — exp(-k ΔV)."""
    return np.exp(-steepness * np.asarray(dv, dtype=np.float64))


def phase_lag_matrix_from_trajectories(
    interpretation_trajectory: FloatArray,
    max_lag: int | None = None,
) -> FloatArray:
    """RFC-0003 — φ_ij from cross-correlation lag (field channels, not actor IDs)."""
    if interpretation_trajectory.ndim != 3:
        raise ValueError("interpretation_trajectory shape (T, N, D)")
    t, n, _d = interpretation_trajectory.shape
    if t < 2 or n < 2:
        return np.zeros((n, n), dtype=np.float64)
    ml = max_lag if max_lag is not None else max(1, t // 4)
    s = np.mean(interpretation_trajectory, axis=2)
    phi = np.zeros((n, n), dtype=np.float64)
    denom = float(max(ml, 1))
    for i in range(n):
        for j in range(i + 1, n):
            x = s[:, i] - np.mean(s[:, i])
            y = s[:, j] - np.mean(s[:, j])
            if np.std(x) < 1e-12 or np.std(y) < 1e-12:
                lag = 0
            else:
                corr = np.correlate(x, y, mode="full")
                lags = np.arange(-(t - 1), t, dtype=np.int64)
                lag = int(lags[int(np.argmax(corr))])
                lag = int(np.clip(lag, -ml, ml))
            phi_ij = math.pi * (lag / denom)
            phi[i, j] = phi_ij
            phi[j, i] = -phi_ij
    return phi


def build_interaction_matrix(
    amplitude: FloatArray,
    phase_lag_radians: FloatArray,
    delta_v_matrix: FloatArray,
    sigma_steepness: float = 4.0,
) -> ComplexArray:
    """RFC-0003 — ℐ_ij = 𝒜_ij exp(iφ_ij) σ(ΔV_ij)."""
    if amplitude.shape != phase_lag_radians.shape or amplitude.shape != delta_v_matrix.shape:
        raise ValueError("shape mismatch")
    sig = sigma_delta_v(delta_v_matrix, steepness=sigma_steepness).astype(np.float64)
    return (
        amplitude.astype(np.complex128)
        * np.exp(1j * phase_lag_radians.astype(np.float64))
        * sig
    )


def compute_field_tensor(
    I_t: ComplexArray,
    I_t_prev: ComplexArray | None,
    delta_v: FloatArray,
    dt: float = 1.0,
) -> FieldTensor:
    """
    Integrate interaction, flow velocity, and geometric divergence into one field object.

    - ``velocity`` = (ℐ_t - ℐ_{t-1}) / dt when previous slice exists (Protocol §11.5 discrete analog).
    - ``divergence`` = ΔV matrix (§9) — stored as the real distortion layer of **F**.
    """
    if I_t.shape != delta_v.shape:
        raise ValueError("I_t and delta_v must match shape")
    if I_t_prev is None:
        v = np.zeros_like(I_t, dtype=np.complex128)
    else:
        if I_t_prev.shape != I_t.shape:
            raise ValueError("I_t_prev shape must match I_t")
        v = (I_t.astype(np.complex128) - I_t_prev.astype(np.complex128)) / float(dt)
    return FieldTensor(interaction=I_t.astype(np.complex128), velocity=v, divergence=np.asarray(delta_v, dtype=np.float64))


def compute_semantic_alignment_variance_sigma_sq(
    interaction: ComplexArray,
    delta_v: FloatArray,
) -> float:
    """
    Protocol §11.2 — σ²_t over pooled semantic-alignment observables.

    Pool: off-diagonal |ℐ| and ΔV entries (field-only scalars; no actor labels).
    """
    n = interaction.shape[0]
    if interaction.shape != (n, n) or delta_v.shape != (n, n):
        raise ValueError("square matrices required")
    iu = np.triu_indices(n, k=1)
    pool = np.concatenate(
        [
            np.abs(interaction[iu]).ravel(),
            np.asarray(delta_v[iu], dtype=np.float64).ravel(),
        ]
    )
    if pool.size == 0:
        return 0.0
    return float(np.var(pool))


def compute_trajectory_velocity_frobenius(
    I_t: ComplexArray,
    I_t_prev: ComplexArray | None,
    dt: float = 1.0,
) -> float:
    """Protocol §11.5 — ‖ℐ_t - ℐ_{t-1}‖_F / dt on off-diagonal support."""
    if I_t_prev is None:
        return 0.0
    mask = ~np.eye(I_t.shape[0], dtype=bool)
    d = (I_t - I_t_prev) / float(dt)
    return float(np.linalg.norm(d[mask]))


def compute_energy_flow_j(interaction: ComplexArray) -> float:
    """Field coupling budget: Σ_{i≠j} |ℐ_ij|."""
    n = interaction.shape[0]
    mask = ~np.eye(n, dtype=bool)
    return float(np.sum(np.abs(interaction[mask])))


def cfi_score(anomaly_magnitudes: Sequence[float] | FloatArray | None = None) -> float:
    """
    Protocol §10.1 — C(s) = exp(-Σ_k p_k a_k). Default a_k = 0 → 1.0.
    ``anomaly_magnitudes`` length ≤ 5 mapped to §10.2 registry order.
    """
    if anomaly_magnitudes is None:
        return 1.0
    a = np.asarray(list(anomaly_magnitudes), dtype=np.float64).ravel()
    if a.size > 5:
        raise ValueError("at most five anomaly channels (§10.2)")
    p = _CFI_P_DEFAULT[: a.size]
    return float(np.exp(-float(np.dot(p, np.clip(a, 0.0, 1.0)))))


def detect_pce(
    sigma_prev: float,
    sigma_now: float,
    theta_floor: float,
    theta_expand: float,
) -> PCEDetectionResult:
    """
    Protocol §11.2 — PCE_t ⇔ σ²_{t-1} < θ_floor ∧ σ²_t > θ_expand.
    (σ² inputs are semantic variance scalars, not tag indices.)
    """
    ign = (sigma_prev < theta_floor) and (sigma_now > theta_expand)
    msg = (
        "Field variance exhibits non-equilibrium ignition: collapsed regime (σ² below θ_floor) "
        f"followed by expansion above θ_expand — structural phase transition candidate (Protocol §11.2). "
        f"σ²_prev={sigma_prev:.6g}, σ²_now={sigma_now:.6g}."
    )
    if not ign:
        msg = (
            "No PCE ignition: variance gate not satisfied (Protocol §11.2). "
            f"σ²_prev={sigma_prev:.6g}, σ²_now={sigma_now:.6g}."
        )
    return PCEDetectionResult(
        ignition=ign,
        sigma_squared_prev=sigma_prev,
        sigma_squared_now=sigma_now,
        theta_floor=theta_floor,
        theta_expand=theta_expand,
        message=msg,
    )


def detect_pce_confirmed(
    pce_t: bool,
    sigma_next: float,
    theta_expand: float,
) -> PCEConfirmationResult:
    """Protocol §11.3 — PCE_confirmed_{t+1} ⇔ PCE_t ∧ σ²_{t+1} > θ_expand."""
    ok = bool(pce_t) and (sigma_next > theta_expand)
    msg = (
        "Sustained expansion confirmed (Protocol §11.3)."
        if ok
        else "Expansion not sustained — treat as fluctuation (Protocol §11.3–11.4)."
    )
    return PCEConfirmationResult(confirmed=ok, message=msg)


def detect_relaxation(
    sigma_series: FloatArray,
    velocity_magnitude: float,
    theta_conv: float,
) -> RelaxationResult:
    """
    RFC-0004 — relaxation / quiescence: decreasing field variance with low flow.

    Uses last increment of σ² as gradient proxy; ``velocity_magnitude`` should be
    Protocol §11.5 v(t) or ‖dℐ/dt‖ aggregate from ``FieldTensor``.
    """
    s = np.asarray(sigma_series, dtype=np.float64).ravel()
    if s.size < 2:
        grad = 0.0
    else:
        grad = float(s[-1] - s[-2])
    detected = (grad < 0.0) and (velocity_magnitude < theta_conv)
    msg = (
        "Relaxation regime: variance gradient negative and field flow below θ_conv — "
        "order-rebuilding / annealing signature (RFC-0004)."
        if detected
        else "No relaxation signature: variance not decaying and/or flow still above θ_conv."
    )
    return RelaxationResult(
        detected=detected,
        gradient_sigma=grad,
        velocity_magnitude=velocity_magnitude,
        theta_conv=theta_conv,
        message=msg,
    )


def _hotspot_xy_from_load(load: FloatArray) -> tuple[float, float]:
    """Map argmax index (i,j) to normalized [0,1]² field coordinates."""
    n = load.shape[0]
    if load.ndim != 2 or load.shape[0] != load.shape[1]:
        raise ValueError("load must be square")
    iu = np.triu_indices(n, k=1)
    if iu[0].size == 0:
        return (0.5, 0.5)
    wflat = np.abs(load[iu])
    k = int(np.argmax(wflat))
    i, j = int(iu[0][k]), int(iu[1][k])
    return ((i + 0.5) / max(n, 1), (j + 0.5) / max(n, 1))


def analyze_field_pathologies(
    field: FieldTensor,
    *,
    dv_critical: float = 0.7,
    resonance_coherence_min: float = 0.85,
    phase_lock_std_max: float = 0.05,
) -> FieldPathologyReport:
    """
    Structure-centric pathology strings (Protocol §9.4, §11, RFC-0003/4).
    """
    I = field.interaction
    dv = field.divergence
    phi_v = np.angle(field.velocity)
    n = I.shape[0]
    iu = np.triu_indices(n, k=1)
    mags = np.abs(I[iu])
    phases_i = np.angle(I[iu])

    if mags.size and np.sum(mags) > 1e-12:
        w = mags / np.sum(mags)
        coh = float(np.abs(np.sum(w * np.exp(1j * phases_i))))
    else:
        coh = 0.0

    scores = {
        "field_coherence": float(np.clip(coh, 0.0, 1.0)),
        "max_geometric_distortion": float(np.max(dv[iu])) if iu[0].size else 0.0,
        "velocity_phase_std": float(np.std(phi_v[iu])) if iu[0].size else 0.0,
    }

    codes: list[str] = []
    msgs: list[str] = []

    load = np.abs(field.velocity) + dv
    hx, hy = _hotspot_xy_from_load(load)

    if scores["field_coherence"] >= resonance_coherence_min and float(np.mean(mags)) > 0.1:
        codes.append("RESONANCE_FIELD")
        msgs.append(
            f"Structural resonance: field coherence concentration {scores['field_coherence']:.3f} — "
            f"energy circulation density peaks near field coordinates [{hx:.3f}, {hy:.3f}] (not attributable to single actors)."
        )

    if scores["max_geometric_distortion"] >= dv_critical:
        codes.append("GEOMETRIC_DISTORTION_CRITICAL")
        msgs.append(
            f"Geometric distortion (ΔV) exceeds Protocol §9.4 critical band (≥ {dv_critical}) — "
            f"localized structural tension at [{hx:.3f}, {hy:.3f}]; Hesitation-scale divergence in the field (§13)."
        )

    if scores["velocity_phase_std"] < phase_lock_std_max and n >= 3 and iu[0].size:
        codes.append("PHASE_MANIFOLD_LOCK")
        msgs.append(
            "Phase-lock manifold: structural flow phase variance below noise floor — "
            "field exhibits rigid lag coordination across the coupling surface (RFC-0003)."
        )

    if not msgs:
        codes.append("FIELD_NOMINAL")
        msgs.append(
            f"No acute structural pathology flags — field load nominal; monitor [{hx:.3f}, {hy:.3f}] for drift."
        )

    return FieldPathologyReport(
        codes=tuple(codes),
        messages=tuple(msgs),
        hotspot_xy=(hx, hy),
        scores=scores,
    )


def run_narrative_dynamics_core(
    tag_stack: FloatArray,
    interpretation_trajectory: FloatArray | None = None,
    amplitude_matrix: FloatArray | None = None,
    interaction_prev: ComplexArray | None = None,
    *,
    weights: FloatArray | None = None,
    kinds: NDArray[np.int8] | None = None,
    sigma_steepness: float = 4.0,
    dt: float = 1.0,
    theta_floor: float | None = None,
    theta_expand: float | None = None,
    sigma_prev_external: float | None = None,
    anomaly_magnitudes_for_cfi: Sequence[float] | None = None,
) -> NarrativeDynamicsResult:
    """
    End-to-end field construction: ΔV → ℐ_t → FieldTensor → σ², J, v, pathology.

    PCE ignition is computed only if ``sigma_prev_external`` and both thresholds are provided
    alongside internally computed ``sigma_now`` from the current slice.
    """
    dv = pairwise_delta_v_matrix(tag_stack, weights=weights, kinds=kinds)
    n = int(dv.shape[0])
    if interpretation_trajectory is None:
        phi = np.zeros((n, n), dtype=np.float64)
    else:
        if interpretation_trajectory.shape[1] != n:
            raise ValueError("trajectory N must match tag_stack")
        phi = phase_lag_matrix_from_trajectories(interpretation_trajectory)
    amp = np.ones((n, n), dtype=np.float64) if amplitude_matrix is None else np.asarray(amplitude_matrix, dtype=np.float64)
    if amp.shape != (n, n):
        raise ValueError("amplitude_matrix (N,N)")
    np.fill_diagonal(amp, 0.0)
    I_t = build_interaction_matrix(amp, phi, dv, sigma_steepness=sigma_steepness)
    ft = compute_field_tensor(I_t, interaction_prev, dv, dt=dt)

    sigma_now = compute_semantic_alignment_variance_sigma_sq(I_t, dv)
    v_mag = compute_trajectory_velocity_frobenius(I_t, interaction_prev, dt=dt)
    j = compute_energy_flow_j(I_t)
    cfi = cfi_score(anomaly_magnitudes_for_cfi)

    scalars = FieldScalars(
        energy_flow_j=j,
        trajectory_velocity=v_mag,
        semantic_variance_sigma_sq=sigma_now,
        cfi_score=cfi,
    )
    pathology = analyze_field_pathologies(ft)

    pce: PCEDetectionResult | None = None
    if (
        sigma_prev_external is not None
        and theta_floor is not None
        and theta_expand is not None
    ):
        pce = detect_pce(sigma_prev_external, sigma_now, theta_floor, theta_expand)

    return NarrativeDynamicsResult(
        field_tensor=ft,
        scalars=scalars,
        pathology=pathology,
        pce_from_sigma=pce,
        phase_lag_radians=phi,
        amplitude_matrix=np.asarray(amp, dtype=np.float64).copy(),
    )


# Backward-compatible aliases (older SDK imports)
FieldMetrics = FieldScalars
InteractionEngineResult = NarrativeDynamicsResult

__all__ = [
    "TagKind",
    "FieldTensor",
    "FieldScalars",
    "FieldPathologyReport",
    "NarrativeDynamicsResult",
    "PCEDetectionResult",
    "PCEConfirmationResult",
    "RelaxationResult",
    "FieldMetrics",
    "InteractionEngineResult",
    "default_tag_weights_35",
    "default_tag_kinds_35",
    "per_tag_delta",
    "delta_v_weighted_l2",
    "sigma_delta_v",
    "pairwise_delta_v_matrix",
    "phase_lag_matrix_from_trajectories",
    "build_interaction_matrix",
    "compute_field_tensor",
    "compute_semantic_alignment_variance_sigma_sq",
    "compute_trajectory_velocity_frobenius",
    "compute_energy_flow_j",
    "cfi_score",
    "detect_pce",
    "detect_pce_confirmed",
    "detect_relaxation",
    "analyze_field_pathologies",
    "run_narrative_dynamics_core",
]
