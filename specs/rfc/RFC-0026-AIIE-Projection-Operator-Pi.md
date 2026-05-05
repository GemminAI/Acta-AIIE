# RFC-0026: Projection Operator Π — Discrete Realization of Continuous Semantic Dynamics (v2.0)

| Field | Value |
|-------|-------|
| **ID** | RFC-0026 |
| **Version** | 2.0 |
| **Status** | Pre-Canonical |
| **Date** | 2026-05-05 |
| **Authors** | Gemmina Intelligence LLC. — Pure Information Laboratory |
| **Language** | EN |
| **Updates** | RFC-0023 (Proto-Structure) |
| **Depends on** | RFC-0016 (TAG28), RFC-0017 (LINK+), RFC-0018 (CFI), RFC-0022 (CDR), RFC-0024 (Valency), RFC-0025 (Diagnostics) |

---

## 0. Abstract

This document defines the projection operator **Π** that maps a continuous probability space (Proto-Structure) to a discrete TAG28 graph compliant with Universal Grammar (UG).

This revision integrates a **Hybrid Mode** that maintains deterministic stability during inference while enabling exploration during learning, together with an automatic insertion mechanism for **Valency Placeholders (T24)** based on RFC-0024.

---

## 1. Operation Modes: Separation of Inference and Learning

Π switches behavior based on execution context.

### 1.1 Inference Mode (Deterministic)

- **Principle:** Prioritizes reproducibility and reliability; always performs deterministic phase transition via $\arg\max$.
- **Use:** Production environment (prod_main), trace generation, final reality crystallization.

### 1.2 Learning / Exploration Mode (Stochastic)

- **Principle:** Permits temperature sampling (e.g., Gumbel-Softmax) to explore the broad energy landscape of semantic space.
- **Use:** LoRA learning, multiverse generation, entropy injection (RFC-0025 Level 2).

---

## 2. Three-Stage Projection Process

### Π₁: Node Resolution (Point: Type Fixation)

From node $v$'s type distribution $\text{type\_logits}_v$, fix a discrete TAG28 type:

1. **Selection:**
   - Inference: $\tau_V(v) = \arg\max_k \text{softmax}(L_v)_k$
   - Learning: $\tau_V(v) \sim \text{Gumbel-Softmax}(L_v, \tau)$

2. **Pruning:** Nodes below activation threshold $\tau_{node}$ are removed as informationally insufficient.

3. **Scale Adjustment:** All computations use the $E_{FIELD\_BASELINE}$-normalized scale ($\approx 1.0$, RFC-0021 §2).

### Π₂: Edge Resolution (Line: Connection Fixation)

Fix LINK+ relationships between nodes as physical wiring:

1. **Existence:** Retain edges where $p_{ij} > \theta_{edge}$.
2. **Typing:** $\tau_E(e_{ij}) = \arg\max \text{softmax}(\text{type\_logits}_{ij})$.
3. **Local Pruning:** If connected node types are physically incompatible with LINK+ (RFC-0017), send to repair queue at this stage.

### Π₃: Constraint Repair (Surface: Structural Integration)

Apply "surgical operations" based on RFC-0024 (Valency) and Universal Grammar:

1. **Valency Gap (Missing):** When a required argument is absent, automatically insert placeholder node **T24 (Placeholder)** to maintain structural completeness.

2. **Valency Excess (Surplus):** Connections exceeding valency are pruned in ascending order of confidence.

3. **Causal DAG Enforcement:** Detect cycles in causal links and sever the minimum-confidence edge to guarantee temporal irreversibility.

---

## 3. Projection Collapse and Rejection

If even after repair the Self-Awareness Index (SAI) remains below 0.1, or normalized energy $E_{total} > \tau_{reject}$ (RFC-0025), Π declares "Projection Collapse" and halts output as **REJECT (Honest Silence)**.

**Projection Collapse is not a failure — it is the structural integrity guarantee of the system.**

---

## 4. Physical Meaning

> **"Π is not mere decoding. It is a phase transition that extracts the 'crystal of meaning' from the fog of information — a physical barrier that structurally rejects the entropy trap of fluent falsehood."**

| Stage | Physical Analogy |
|-------|-----------------|
| Π₁ Node Resolution | Condensation from gas to liquid |
| Π₂ Edge Resolution | Solidification from liquid to solid |
| Π₃ Constraint Repair | Crystal lattice correction |
| Projection Collapse | Rejection of failed crystallization |

---

## 5. Relationship to Existing RFCs

| RFC | Relation |
|-----|---------|
| RFC-0023 (Π v1) | RFC-0026 extends with Hybrid Mode and T24 placeholder mechanism |
| RFC-0024 (Valency) | Drives Π₃ gap detection and placeholder insertion |
| RFC-0025 (Diagnostics) | Provides $\tau_{reject}$ and SAI thresholds for Projection Collapse |
| RFC-0027 (Proto-Learning) | Stochastic mode enables end-to-end learning through Π |
| RFC-0028 (LoRA) | LoRA calibrates the energy landscape that Π navigates |

---

*Gemmina Intelligence LLC. — Pure Information Laboratory*
*RFC-0026 | Pre-Canonical v2.0 | 2026-05-05*
*Acta AIIE Protocol v6.1*
