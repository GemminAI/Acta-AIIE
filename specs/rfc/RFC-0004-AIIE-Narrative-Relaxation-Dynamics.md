# RFC-0004: Narrative Relaxation Dynamics

| Field | Value |
|-------|--------|
| **Status** | **DRAFT** |
| **Date** | 2026-04-07 |
| **Authors** | Acta AIIE Standardization Committee |
| **Language** | EN |

---

## 1. Normative reference

This draft connects **thermodynamic relaxation** of narrative states to:

**[`../Acta_AIIE_Protocol_Definition_v1.0.0.md`](../Acta_AIIE_Protocol_Definition_v1.0.0.md)** — §§7–8 (entropy dynamics, $\lambda_k(H)$, Boltzmann selection, $T(H)=0.1+0.9H$).

It also references **RFC-0001** (ΔV) and **RFC-0002** (PCE) for coupling between divergence, variance spikes, and relaxation timescales.

Until ratified, this document is **non-normative** for compliance claims.

---

## 2. Scope (draft)

Formalize **relaxation** as reduction of effective entropy $H(s_{field})$ along a trajectory under fixed external input $I_t$, subject to:

- Exploration budget $\sum_t \epsilon_t < \infty$ (v1.0.0 §7.2).
- Coherence floor $\eta = 0.1$ in $\lambda_k(H)$ (v1.0.0 §7.3).

---

## 3. Proposed relaxation time (informative)

Define a **characteristic relaxation time** $\tau_R$ as the expected number of steps for $H$ to cross from a high-entropy band to a crystallization band under the Boltzmann policy. Exact estimator is implementation-dependent; this RFC will standardize reporting fields once validated.

---

## 4. PCE coupling (informative)

PCE (RFC-0002) represents **failure of smooth relaxation** — discontinuous jump in $\sigma^2_t$ and $s_{core}$. Relaxation dynamics SHOULD treat PCE as a separate regime with distinct re-initialization of $s_{core}$ and T25 recompute.

---

## 5. Open questions

- Relationship to D-CSF metabolism (v1.0.0 §14) and long-timescale “sleep” cycles.
- Differentiable surrogates for production compilers.

---

## 6. Next steps

Empirical calibration on GemminAI logs; comparison with ΔV-triggered Hesitation (RFC-0001 §4).

---

*End of RFC-0004 (DRAFT)*
