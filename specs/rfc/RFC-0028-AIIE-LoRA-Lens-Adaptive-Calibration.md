# RFC-0028: LoRA Lens — Adaptive Structural Calibration (v2.0)

| Field | Value |
|-------|-------|
| **ID** | RFC-0028 |
| **Version** | 2.0 |
| **Status** | Canonical Candidate |
| **Date** | 2026-05-05 |
| **Authors** | Gemmina Intelligence LLC. — Pure Information Laboratory |
| **Language** | EN |
| **Updates** | RFC-0028 v1.0 |
| **Depends on** | RFC-0016 (TAG), RFC-0018 (CFI), RFC-0020 (Evidence), RFC-0029 (Movement), RFC-0030 (Groupoid) |

---

## 0. Abstract

This document specifies the physical necessity and mathematical formalization of **LoRA (Low-Rank Adaptation)** — the adaptive mechanism of the L2 Lens layer in Sovereign v4.0.

> **"LoRA does not memorize data. It fixes the minimum-action path through the Hessian of the semantic energy field as a low-dimensional manifold."**

This revision introduces a rigorous Hessian definition, null-space preservation constraints, and Newton convergence guarantees for learning, establishing the integration foundation with information geometry.

---

## 1. Two-Layer Structure of Perception: Law and Habit

The semantic projection function $f_\theta$ is described as the composition of invariant "Law" and variable "Habit":

$$W = W_{base} + \Delta W \quad \text{where} \quad \Delta W = \alpha \frac{A \times B}{\text{rank}}$$

| Component | Symbol | Physical Meaning |
|-----------|--------|-----------------|
| **Law** | $W_{base}$ | Invariant potential field based on Universal Grammar (UG) |
| **Habit** | $\Delta W$ | Low-rank matrix absorbing curvature of a specific universe |

### Physical Necessity of Low-Rank

$$\Delta W = \arg\min_{\text{rank} \le r} \| H^{-1} \nabla \mathcal{L}_{CFI} - \Delta W \|$$

LoRA is not an approximation — it is the extraction of structural essence with noise filtered out. The rank constraint enforces that only the directions of highest curvature in the energy landscape are learned, discarding low-signal dimensions.

---

## 2. Hessian Specification

The curvature matrix $H$ at the Lens layer is rigorously defined as the second-order derivative of the CFI loss function $\mathcal{L}_{CFI}$:

$$H = \nabla^2 \mathcal{L}_{CFI} = 2 \sum_k M_k A_k$$

| Component | Definition |
|-----------|-----------|
| $M_k$ | Mass of each Evidence (RFC-0020 §1.1) |
| $A_k$ | **Structure-aware Metric** — high weight for core skeleton (T02-T03 subject-predicate), low weight for modifiers (T14, etc.) |

The Structure-aware Metric ensures that the Hessian reflects the physical priority of structural deformation — core argument distortion costs more than peripheral modification.

---

## 3. Null-Space Preservation Constraint (Equivariance Protection)

LoRA updates must not destroy the semantic invariants defined in RFC-0030 (Groupoid).

**Mandatory constraint:**
$$\forall v \in \text{Null}(H): \Delta W v = 0$$

**Projection implementation:**
$$\Delta W_{constrained} = P_{\perp} \Delta W$$

where $P_{\perp} = I - V_0 V_0^T$ and $V_0$ is the null-space basis of $H$.

**Physical meaning:** Structurally blocks learning from contaminating Morphisms on stable semantic manifolds — transformations such as "translation," "topicalization," and "paraphrase" that must preserve meaning identity.

---

## 4. Learning Dynamics and Convergence Guarantee

### 4.1 Newton Update Rule

For convergence acceleration and local minimum guarantee, quadratic convergence is adopted:

$$\Delta W_{t+1} = \Delta W_t - \eta H^{-1} \nabla \mathcal{L}_{CFI}$$

**Stability condition:** $H \succ 0$ (positive definite).

### 4.2 Adaptive Inertia Coefficient μ

$$\mu = \exp(-\kappa_1 \cdot \text{CFI\_Volatility} - \kappa_2 \cdot |\lambda_{min}|)$$

| State | $\lambda_{min}$ | μ Behavior | Action |
|-------|-----------------|-----------|--------|
| Unstable | < 0 (negative eigenvalue) | Small (abandon inertia) | Accelerate learning, transition to new regime |
| Stable | > 0 | Large (preserve inertia) | Maintain existing Habit, ensure noise robustness |

---

## 5. Snap Sealing (Crystallization Seal)

LoRA weight snapshot preservation is executed only when the following physical stability conditions are simultaneously satisfied:

1. **Gradient vanishing:** $\|\nabla \mathcal{L}_{CFI}\| < \epsilon$
2. **Structural positive definiteness:** $\lambda_{min} > 0$

This prevents incomplete reality crystallization at saddle points (saddle-point trap) — a common failure mode in gradient-based learning.

---

## 6. Integration with Movement Algebra

The relationship between Movement (RFC-0029) and LoRA is expressed by the following integral equation:

| Concept | Symbol | Meaning |
|---------|--------|---------|
| **Movement** | $\vec{m}(t) = -H^{-1} \nabla \mathcal{L}_{CFI}$ | Instantaneous gradient flow |
| **LoRA** | $\Delta W \approx \int_0^T \vec{m}(t) dt$ | Cumulative history of movement |

> **"LoRA is the result of the 'pathway of information (Geodesic)' becoming fixed in a specific universe."**

---

## 7. Conclusion

> **"Intelligence does not memorize data — it geometrically acquires the 'bending pattern' of the energy field that constitutes the world. This enables GemminAI to perform 'natural inference' based on the principle of minimum action, even for unknown narratives."**

RFC-0028 v2.0 elevates LoRA from "statistical fine-tuning" to "geometric calibration of information." The Hessian-based update, null-space protection, and snap-sealing together constitute a physically motivated adaptive mechanism that learns the geometry of meaning rather than the statistics of surface form.

---

*Gemmina Intelligence LLC. — Pure Information Laboratory*
*RFC-0028 | Canonical Candidate v2.0 | 2026-05-05*
*Acta AIIE Protocol v6.1*
