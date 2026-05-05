# RFC-0031: Information Geometry of CFI Space

| Field | Value |
|-------|-------|
| **ID** | RFC-0031 |
| **Version** | 1.0 |
| **Status** | Draft |
| **Date** | 2026-05-05 |
| **Authors** | Gemmina Intelligence LLC. — Pure Information Laboratory |
| **Language** | EN |
| **Depends on** | RFC-0018 (CFI), RFC-0020 (Evidence), RFC-0021 (EGEM), RFC-0028 (LoRA Lens), RFC-0030 (Groupoid) |

---

## 0. Abstract

This document extends the distance concept in CFI (Contradiction Field Index) space from simple Euclidean distance to an **Information-Geometric Metric**.

Conventional CFI was a scalar distance measuring "magnitude of inconsistency." This specification redefines it as a **Riemannian manifold** equipped with metric tensor $g_{ij}$, enabling:

- Introduction of "curvature" in semantic space
- Definition of natural semantic transformation via Geodesics
- Fisher Information-based "information density weighting"

This achieves geometric unification of energy minimization in EGEM (RFC-0021).

---

## 1. Redefinition of CFI Space

### 1.1 State Space

Semantic states are represented as:

$$S \in \mathcal{M}_{CFI}$$

where $\mathcal{M}_{CFI}$ is the semantic manifold constructed from TAG/LINK structures.

### 1.2 Metric Tensor Definition

The metric in CFI space is defined as:

$$g_{ij}(S) := \mathbb{E}\left[ \frac{\partial \log p_\theta(S)}{\partial \theta_i} \frac{\partial \log p_\theta(S)}{\partial \theta_j} \right]$$

### 1.3 Physical Interpretation

| Property | Meaning |
|----------|---------|
| $g_{ij}$ corresponds to Fisher Information Matrix | Captures statistical curvature of the model |
| High information density regions → distances "stretch" | Semantically important changes cost more |
| Important semantic transitions → high cost | Prevents casual traversal of semantically critical boundaries |

---

## 2. CFI Metric Distance

The distance between two states $S_1, S_2$ is defined as:

$$d_{CFI}^2(S_1, S_2) = (S_1 - S_2)^T \, g(S) \, (S_1 - S_2)$$

### 2.1 Interpretation

| Distance | Semantic Meaning |
|----------|-----------------|
| Small | Semantically close (paraphrase, translation) |
| Large | Structural breakdown or contradiction |

**Comparison with Euclidean distance:**

The Riemannian metric assigns different costs to the same Euclidean displacement depending on location in semantic space. A unit step through a high-information-density region (core argument structure) costs more than the same step through a low-density region (peripheral modifiers). This reflects the physical reality that distorting core meaning is more costly than peripheral variation.

---

## 3. Integration with EGEM

The energy function in EGEM (RFC-0021) takes the form:

$$E_{total} = \lambda_1 E_{UG} + \lambda_2 E_{Val} + \lambda_3 E_{Field}$$

The CFI metric functions as the internal structure of $E_{Field}$.

### 3.1 Extended Metric

In practical operation, the metric is defined as:

$$g(S) = F(S) + \lambda \nabla^2 E_{Field}(S)$$

| Component | Meaning |
|-----------|---------|
| $F(S)$ | Linguistic naturalness (statistical structure / Fisher Information) |
| $\nabla^2 E_{Field}$ | Reality (Evidence) constraint — Hessian of the Evidence Field |
| $\lambda$ | Reality grounding intensity (initial value = 1.0) |

---

## 4. Geodesics

### 4.1 Definition

The optimal semantic transformation between two points is defined as the Geodesic:

$$\gamma^* = \arg\min_{\gamma} \int_0^1 \sqrt{\dot{\gamma}(t)^T g(\gamma(t)) \dot{\gamma}(t)} \, dt$$

### 4.2 Energy Form

$$E[\gamma] = \frac{1}{2} \int_0^1 \dot{\gamma}^T g(\gamma) \dot{\gamma} \, dt$$

### 4.3 Physical Meaning

| Concept | Geometric Interpretation |
|---------|--------------------------|
| Geodesic | Minimum-energy semantic transformation |
| Translation | Not a point → a **trajectory** |
| Paraphrase | Nearby geodesic within same equivalence class |
| Hallucination | Departure from valid geodesic region |

---

## 5. Relationship to Hessian (LoRA Lens Integration)

The curvature of CFI space is expressed as:

$$H_{CFI} = \nabla^2 E_{total}$$

### 5.1 Decomposition

$$H_{CFI} = F + H_{UG} + H_{Evidence}$$

| Component | Role |
|-----------|------|
| $F$ (Fisher) | Information density — statistical curvature |
| $H_{UG}$ | Syntactic constraint curvature — hard UG boundaries |
| $H_{Evidence}$ | Reality alignment curvature — Evidence Field geometry |

This decomposition connects RFC-0031 directly to RFC-0028 (LoRA Lens §2): the Hessian used for LoRA's Structure-aware Metric $A_k$ is the same $H_{CFI}$ defined here.

---

## 6. Natural Gradient Learning Rule

LoRA Lens updates are performed via natural gradient descent:

$$\Delta W = -\eta \, H^{-1}_{CFI} \nabla E$$

### 6.1 Meaning

| Aspect | Standard Gradient | Natural Gradient |
|--------|-------------------|-----------------|
| Direction | Steepest descent in parameter space | Steepest descent in **information space** |
| Considers | None (isotropic) | Space curvature (anisotropic) |
| Result | Arbitrary direction | "Most natural direction" |

The natural gradient ensures that LoRA learning steps are geometrically consistent with the information-geometric structure of CFI space — steps are large where the manifold is flat (low information density) and small where it is curved (high information density).

---

## 7. Integration with Groupoid Theory (RFC-0030)

Semantic transformations in RFC-0030 are redefined within the geodesic framework:

$$S_{target} \in \text{Geodesic Orbit}(S_{source})$$

### 7.1 Equivalence Relation (Geodesic Refinement)

$$S_1 \sim S_2 \iff d_{CFI}(S_1, S_2) < \epsilon$$

### 7.2 Interpretation

| Relation | Geometric Meaning |
|----------|------------------|
| Paraphrase | Same geodesic neighborhood |
| Translation | Same orbit, different coordinate |
| Hallucination | Outside geodesic orbit |

---

## 8. CDR as Geodesic Projection

CDR (RFC-0022) is redefined in information-geometric terms:

> **CDR is the operation of projecting a broken structure onto the nearest Geodesic.**

$$G_{repaired} = \text{GeodesicProjection}(G_{broken}, \mathcal{M}_{valid})$$

where $\mathcal{M}_{valid}$ is the sub-manifold of structurally valid states satisfying UG constraints.

---

## 9. Implementation Guidelines

### 9.1 Discrete Approximation

$$E \approx \sum_t (\Delta S_t)^T g(S_t) (\Delta S_t)$$

### 9.2 Pseudocode

```python
def cfi_energy(path: list[State], metric_fn) -> float:
    E = 0.0
    for t in range(len(path) - 1):
        dx = path[t+1] - path[t]
        g = metric_fn(path[t])
        E += dx.T @ g @ dx
    return E

def geodesic_repair(G_broken: Graph, manifold: Manifold) -> Graph:
    """CDR as geodesic projection."""
    return manifold.nearest_valid_point(G_broken, metric=cfi_metric)
```

### 9.3 Optimization Strategies

| Strategy | Scope | Method |
|----------|-------|--------|
| Beam Search + Energy Minimization | Local geodesic search | Greedy with energy pruning |
| MCTS (EGEM integrated) | Global manifold exploration | Monte Carlo Tree Search |
| Natural Gradient LoRA | Manifold-aware learning | $H_{CFI}^{-1} \nabla E$ |

---

## 10. Conclusion

> **"CFI is not a distance. It is the spacetime structure of semantic space."**

Through RFC-0031, the conceptual foundations of GemminAI are elevated:

| Before | After |
|--------|-------|
| Meaning = point | Meaning = **trajectory** |
| Inference = selection | Inference = **convergence** |
| Learning = gradient | Learning = **geometry** |

The unification of information geometry with the CFI framework closes the mathematical loop from TAG28 structure (RFC-0016) through Evidence Field dynamics (RFC-0020) to LoRA learning (RFC-0028) — all expressed as operations on the same Riemannian manifold $\mathcal{M}_{CFI}$.

---

*Gemmina Intelligence LLC. — Pure Information Laboratory*
*RFC-0031 | Draft v1.0 | 2026-05-05*
*Acta AIIE Protocol v6.1*
