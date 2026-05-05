# RFC-0023: Π — Deterministic Projection from Proto-Structure to TAG Graph (v3.0)

| Field | Value |
|-------|-------|
| **ID** | RFC-0023 |
| **Version** | 3.0 |
| **Status** | Canonical |
| **Date** | 2026-05-04 |
| **Authors** | Gemmina Intelligence LLC. — Pure Information Laboratory |
| **Language** | EN |
| **Depends on** | RFC-0016 (TAG), RFC-0017 (LINK+), RFC-0024 (Valency) |
| **Implementation** | NOMOS Core / TAG↔NL Compiler (RFC-0019) |

---

## 0. Abstract

This document defines the **Π (Projection)** operator — the deterministic transformation that maps a continuous intermediate representation (Proto-Structure) $\tilde{G}$ to a valid TAG graph $G \in \mathcal{G}_{valid}$.

Π acts as a compiler that phase-transitions statistical "plausibility" into structural integrity under Universal Grammar (UG) constraints, physically blocking hallucination at the structural level.

$$G = \Pi(\tilde{G})$$

---

## 1. Physical Definition

Π is not a single function but a strictly ordered three-stage pipeline:

1. **Node Resolution** — Point: fixing type and existence
2. **Edge Resolution** — Line: fixing relations and direction
3. **Constraint Repair** — Surface: structural integration and suturing

---

## 2. Input: Proto-Structure ($\tilde{G}$)

$\tilde{G} = (\tilde{V}, \tilde{E}, \tilde{A})$ is a graph state with continuous probability distributions.

**Node representation:**
- $p_v \in \mathbb{R}^{28}$: TAG28 type distribution
- $emb_v$: Semantic embedding vector
- $act_v \in [0,1]$: Node activation score (existence probability)

**Edge representation:**
- $w_{ij} \in [0,1]$: Edge existence weight
- $p_e \in \mathbb{R}^{R}$: LINK+ relation distribution

---

## 3. Stage 1: Node Resolution

For each node $\tilde{v} \in \tilde{V}$:

$$\text{type}^*(v) = \arg\max_{t \in T_{28}} \left[ p_v(t) \cdot \mathrm{PredSurv}(t, \mathcal{E}) \right]$$

**Existence decision:**
$$v \in V \iff act_v > \theta_{node} \quad (\theta_{node} = 0.5)$$

Nodes below the threshold are pruned. Their argument roles are redistributed via Valency (RFC-0024) to satisfy θ-Criterion.

---

## 4. Stage 2: Edge Resolution

For each candidate edge $(\tilde{v}_i, \tilde{v}_j)$:

$$r^*(e) = \arg\max_{r \in R_{LINK}} \left[ p_e(r) \cdot P(r | \text{type}^*(v_i), \text{type}^*(v_j)) \right]$$

**Edge existence decision:**
$$e \in E \iff w_{ij} > \theta_{edge} \quad (\theta_{edge} = 0.3)$$

**DAG enforcement:** After edge resolution, cycle detection is applied. Any cycle in CAUSES/ENTAILS subgraph raises $E_{UG} \to \infty$ and triggers immediate repair.

---

## 5. Stage 3: Constraint Repair

After node and edge resolution, structural constraints are enforced:

**X-bar Hierarchy:** Every Head must have at most one Specifier and one Complement. Violations trigger `re-wire_complement` (RFC-0022 §3.1).

**θ-Criterion:** Each semantic role may be assigned exactly once per predicate head. Duplicate assignments trigger `delete_node` or `merge_equivalent`.

**Binding Principle:** Every pronominal node (LINK:identity) must resolve to a concrete antecedent within the discourse window.

---

## 6. Π Collapse (Abstention Protocol)

If Stage 3 cannot resolve all violations within $T_{max}$ iterations:

$$\Pi(\tilde{G}) = \emptyset \quad \text{(Π Collapse)}$$

This triggers the abstention protocol (RFC-0019 §3): the system declares structural uncertainty rather than outputting a structurally invalid graph.

**Π Collapse is not a failure — it is the system's integrity guarantee.**

---

## 7. Conclusion

> **"Π is the mold of Universal Grammar into which the liquid of statistical meaning is poured. What cannot fill the mold correctly is discarded — not patched with probabilistic guesswork."**

---

*Gemmina Intelligence LLC. — Pure Information Laboratory*
*RFC-0023 | Canonical v3.0 | 2026-05-04*
*Acta AIIE Protocol v6.1*
