# RFC-0018: CFI — Semantic Distance and Topological Curvature (v3.0)

| Field | Value |
|-------|-------|
| **ID** | RFC-0018 |
| **Status** | Canonical |
| **Date** | 2026-04-22 |
| **Authors** | Gemmina Intelligence LLC. — Pure Information Laboratory |
| **Language** | EN |
| **Updates** | RFC-0000 (Constitution), RFC-0016 (TAG28 v3.0), RFC-0017 (LINK+ v3.0) |
| **Dependencies** | RFC-0024 (Valency), RFC-0022 (CDR) |

---

## 0. Purpose: The Metric Standard of Semantic Space

This document defines the **Causal Contradiction Index (CFI)** — the physical quantity that measures "worldview divergence" between two structures ($G_1, G_2$) or between a structure and the Evidence Field ($\mathcal{E}$).

CFI is the **curvature meter of semantic space**: it detects where logical inconsistencies twist the information manifold away from its geodesic (minimum-energy) path.

---

## 1. Physical Definition: Semantic Curvature

| Region | CFI Value | Physical State |
|--------|-----------|----------------|
| **Flat** | Low | Logic is consistent; inference follows geodesics |
| **Curved** | Moderate | Partial contradictions; narrative in tension |
| **Spike** | High | Causal reversal or logical contradiction; space severely curved |

---

## 2. Integrated Energy Formula

CFI is computed as the weighted sum of three distance terms:

$$CFI(G_1, G_2) = w_t \cdot D_{tag} + w_l \cdot D_{link} + w_c \cdot D_{logic}$$

### 2.1 Weight Parameters

Parameters comply with `SYS_CONFIG_PARAM_REGISTRY` and are optimized through the learning process.

| Parameter | Default | Meaning |
|-----------|---------|---------|
| $w_t$ | 1.0 | Atomic agreement (TAG-level) |
| $w_l$ | 1.2 | Structural agreement (LINK-level) |
| $w_c$ | 5.0 | Logical integrity (Hard Constraint violations) |

### 2.2 Distance Term Definitions

**$D_{tag}$** — Tag-level divergence:
$$D_{tag} = \sum_{i} |T_i(G_1) - T_i(G_2)|$$

**$D_{link}$** — Structural divergence (per RFC-0017):
$$D_{link} = \sum |Link_{expected} - Link_{observed}|$$

**$D_{logic}$** — Hard constraint violations:
$$D_{logic} = |\{c \in \mathcal{C} : c \text{ violated in } G\}|$$

---

## 3. Localization and Energy Attribution

CFI decomposes per node/edge to identify "pain points" (spikes):

$$C(x) = E(G) - E(G \setminus \{x\})$$

where $C(x)$ is the energy contribution of element $x$.

**Spike Detection:** When local CFI exceeds threshold $\tau_{spike}$, the location is flagged as a repair target for CDR (RFC-0022).

**Three-zone classification (EXP-0033 empirical calibration):**

| Zone | Condition | State |
|------|-----------|-------|
| CRYSTAL | $E_{norm} \leq \tau_{spike} = 0.32$ | Crystallized — stable |
| HOLD | $\tau_{spike} < E_{norm} \leq \tau_{reject} = 0.59$ | Metastable — monitor |
| REJECT | $E_{norm} > \tau_{reject}$ | Reject — repair required |

---

## 4. CFI as Gradient Field

The local CFI gradient $\nabla E(G)$ drives CDR repair operations:

$$\nabla E(G) \approx \{ (x, C_x, \Delta E(op_x)) \}$$

where $(x, C_x, \Delta E(op_x))$ is the operation that reduces local energy at element $x$ by $\Delta E$.

This gradient is the input to the CDR surgical repair engine (RFC-0022), which selects the minimum-cost operation sequence to bring $E(G)$ below $\tau_{reject}$.

---

## 5. Relationship to RFC-0009 (Narrative Curvature)

CFI in semantic space corresponds to narrative curvature $\kappa$ in information spacetime (RFC-0009):

| Concept | RFC-0018 (CFI) | RFC-0009 (Curvature) |
|---------|----------------|----------------------|
| Measurement domain | Semantic graph | Information manifold |
| Input | TAG/LINK deviation | SIV vector acceleration |
| Output | $CFI \in [0, \infty)$ | $\kappa_{norm} \in [0, \infty)$ |
| Role | Contradiction detection | Trajectory bending |

High CFI correlates with high $\kappa$: both indicate regions where narrative structure is under stress.

---

## 6. Validation Protocol

CFI validity requires:

1. **Human Correlation:** Spearman rank correlation $\rho > 0.8$ with expert ground-truth plausibility scores (N ≥ 2 evaluators).

2. **Embedding Superiority:** CFI must detect logical reversals that statistical embeddings cannot distinguish. The minimal pair test ("Man bites dog" vs "Dog bites man") must yield maximum CFI distance.

3. **Inter-Rater Reliability:** Cohen's $\kappa > 0.81$ for human labelers applying the CRYSTAL/HOLD/REJECT classification.

---

## 7. Conclusion

> **"CFI is the ruler of semantic space — the instrument that transforms subjective 'contradiction' into a measurable physical quantity, enabling surgical repair rather than probabilistic regeneration."**

CFI closes the loop between narrative structure (TAG28/LINK+), the Evidence Field (RFC-0020), and the repair engine (CDR, RFC-0022). It is the fundamental metric of the Acta AIIE system.

---

*Gemmina Intelligence LLC. — Pure Information Laboratory*
*RFC-0018 | Canonical | 2026-04-22*
*Acta AIIE Protocol v6.1*
