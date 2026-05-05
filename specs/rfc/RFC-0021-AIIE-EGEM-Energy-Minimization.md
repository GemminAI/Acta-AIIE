# RFC-0021: EGEM — Evidence-Guided Energy Minimization (v4.0)

| Field | Value |
|-------|-------|
| **ID** | RFC-0021 |
| **Version** | 4.0 |
| **Status** | Canonical |
| **Date** | 2026-05-04 |
| **Authors** | Gemmina Intelligence LLC. — Pure Information Laboratory |
| **Language** | EN |
| **Supersedes** | RFC-0021 v3.0 |
| **Updates** | RFC-0018 (CFI), RFC-0020 (Evidence v4.0), RFC-0024 (Valency) |
| **Updated by** | RFC-0025 (Error Handling v4.0) |
| **Implementation** | NOMOS Core / MCTS Engine |
| **Experiment** | Experiment-001 Minimal Pair Validation (N=50, 2026-05-04) |

---

## 0. Abstract

This document defines **EGEM (Evidence-Guided Energy Minimization)** — the core inference algorithm of GemminAI.

**Major changes in v4.0:**

1. **Introduction of two-stage normalization via E_FIELD_BASELINE:** Based on Experiment-001 empirical results, normalization of Evidence Field energy by dividing by the E_Field value of a canonical A_NORMAL structure is mandated. This guarantees that RFC-0025 τ values (human-scale) function independently of Evidence DB size.

2. **Explicit impact analysis for K≥8 multiverse environments:** Normalization is not required for relative candidate comparison, but the REJECT threshold gate (absolute value comparison) requires the normalized scale.

---

## 1. Energy Function: Full System Hamiltonian

The total energy $E_{total}(G)$ of inference graph $G$ is the weighted sum of three potentials:

$$E_{total}(G) = \lambda_1 E_{UG}(G) + \lambda_2 E_{Val}(G) + \lambda_3 E_{Field}(G)$$

### 1.1 Term Definitions

- **$E_{UG}$ (Hard Constraint):** Violation cost against X-bar hierarchy, DAG constraints, and Binding Principles (RFC-0016). Violations trigger immediate rejection ($E_{UG} \to \infty$).

- **$E_{Val}$ (Soft Constraint):** Negative log-likelihood of Valency (RFC-0024).

- **$E_{Field}$ (Gravity):** RFC-0020 v4.1 compliant. **Two-stage normalized** Evidence Field energy (see §2).

Summing these as positive terms and **minimizing** the total drives the system toward the "structurally most stable configuration closest to evidence."

### 1.2 Governance Parameters (λ)

| Parameter | Initial Value | Role |
|-----------|--------------|------|
| $\lambda_1$ | 10.0 | Universal Grammar constraint importance (Hard) |
| $\lambda_2$ | 1.0 | Semantic integrity (Valency) weight |
| $\lambda_3$ | 1.5 | Reality grounding (Evidence) weight |

These ratios couple with 35TAG: 15 (`beta_scaling`) and 16 (`temperature_T`) to control inference "sharpness."

---

## 2. E_Field Two-Stage Normalization (v4.0)

### 2.1 Motivation

In v3.0, as Evidence DB entry count $N$ increases, $E_{Field}^{raw}$ scales as $O(N)$, becoming inconsistent with RFC-0025's fixed thresholds τ (human-scale 0–5).

Experiment-001 (N=12 entries) observed $E_{total} \approx O(100)$ without normalization, causing the τ_reject=3.5 REJECT gate to fail (all entries SAI=0.000).

### 2.2 Two-Stage Normalization Protocol

**Step 1: Entry count normalization (MSE-type transformation)**

$$E_{Field}^{norm1}(G) = \frac{1}{N} \sum_{e_i \in \mathcal{E}} M_i \cdot d_{CFI}(G, e_i)^2$$

**Step 2: Baseline normalization (canonical scale anchoring)**

$$E_{Field}^{norm2}(G) = \frac{E_{Field}^{norm1}(G)}{E_{FIELD\_BASELINE}}$$

where $E_{FIELD\_BASELINE} = E_{Field}^{norm1}(G_{A\_NORMAL})$ — the E_Field value of a structurally "normal" (A_NORMAL) canonical graph.

**Result:** $E_{Field}^{norm2}(G_{A\_NORMAL}) = 1.0$ by definition. All other graphs are measured relative to this scale.

### 2.3 Implementation

```python
def compute_e_field_normalized(G: Graph, evidence: EvidenceField) -> float:
    N = len(evidence)
    raw = sum(e.mass * cfi_distance(G, e)**2 for e in evidence)
    norm1 = raw / N
    return norm1 / E_FIELD_BASELINE  # anchored to A_NORMAL = 1.0
```

---

## 3. MCTS Search Architecture

EGEM uses Monte Carlo Tree Search to navigate the exponential space of graph operations:

### 3.1 Tree Structure

```
Root: G_0 (initial proto-structure)
├── op_1: change_head(v, T_agent)
│   └── G_1 → E_total = 2.3
├── op_2: add_edge(h, CAUSES, v_new)
│   └── G_2 → E_total = 1.8  ← selected
└── op_3: remove_edge(e_contradiction)
    └── G_3 → E_total = 3.1
```

### 3.2 Selection Policy

$$op^* = \arg\min_{op \in \mathcal{O}} E_{total}(\text{apply}(G, op))$$

subject to: $E_{UG}(\text{apply}(G, op)) < \infty$

### 3.3 Convergence Criterion

Search terminates when:
- $E_{total}(G) \leq \tau_{crystal}$ (crystallized), **or**
- Maximum iterations exceeded → output with HOLD classification

---

## 4. Multiverse Environment (K≥8)

In multiverse inference (K parallel universe candidates):

| Operation | Normalization Required? | Reason |
|-----------|------------------------|--------|
| Relative ranking between candidates | **No** | Monotone transformation preserves order |
| REJECT gate ($E > \tau_{reject}$) | **Yes** | Absolute comparison requires normalized scale |
| Boltzmann weight $P(\Phi) \propto \exp(-E/\hbar_I)$ | **Yes** | Probability requires absolute scale |

---

## 5. Relationship to Existing RFCs

| RFC | Relation |
|-----|---------|
| RFC-0018 (CFI) | $d_{CFI}$ is the distance metric in $E_{Field}$ |
| RFC-0020 (Evidence) | Provides $M_i$ and $e_i$ for energy computation |
| RFC-0022 (CDR) | CDR executes EGEM's selected operations |
| RFC-0023 (Π) | Projection enforces $E_{UG} < \infty$ before EGEM |
| RFC-0025 (Error Handling) | Defines τ thresholds used in termination criteria |

---

## 6. Conclusion

> **"EGEM is the physics engine of GemminAI — the algorithm that transforms the combinatorial explosion of possible meanings into a single minimum-energy crystallized structure, anchored to the gravity field of accumulated evidence."**

---

*Gemmina Intelligence LLC. — Pure Information Laboratory*
*RFC-0021 | Canonical v4.0 | 2026-05-04*
*Acta AIIE Protocol v6.1*
