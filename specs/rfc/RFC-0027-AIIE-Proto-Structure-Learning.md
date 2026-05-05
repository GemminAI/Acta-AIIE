# RFC-0027: Proto-Structure Learning — End-to-End Optimization (Revised)

| Field | Value |
|-------|-------|
| **ID** | RFC-0027 |
| **Version** | 2.0 (Revised) |
| **Status** | Draft / Experimental |
| **Date** | 2026-05-05 |
| **Authors** | Gemmina Intelligence LLC. — Pure Information Laboratory |
| **Language** | EN |
| **Updates** | RFC-0026 (Π) |
| **Depends on** | RFC-0016 (TAG), RFC-0018 (CFI), RFC-0020 (Evidence), RFC-0021 (EGEM), RFC-0022 (CDR), RFC-0024 (Valency), RFC-0025 (Error) |

---

## 0. Abstract

This document defines the learning framework that optimizes the mapping from natural language to Proto-Structure end-to-end.

This revision introduces three mechanisms to advance the system toward **Anticipatory Intelligence**:

1. **Sparse TAG Attention** — accelerates learning convergence
2. **Entropy Regularization** — prevents mode collapse
3. **CDR Loop Learning** — increases repair robustness

---

## 1. Extended Integrated Loss Function

Model $f_\theta$ is trained to minimize the following multi-objective function:

$$\mathcal{L} = \mathcal{L}_{CFI} + \lambda_1 \mathcal{L}_{cycle} + \lambda_2 \mathcal{L}_{energy} + \lambda_3 \mathcal{L}_{entropy} + \lambda_4 \mathcal{L}_{valency}$$

### Loss Term Definitions

| Term | Role | Description |
|------|------|-------------|
| $\mathcal{L}_{CFI}$ | Structural supervision | CFI distance between inference result $\Pi(\tilde{G})$ and reference $G_{ref}$ |
| $\mathcal{L}_{cycle}$ | Bidirectional grounding | Mutual consistency between language and structure |
| $\mathcal{L}_{energy}$ | Physical alignment | Guidance toward low-energy regions of the Evidence Field |
| $\mathcal{L}_{entropy}$ | Diversity preservation | Regularization using T22 (Entropy). Prevents Proto Collapse — convergence of all nodes to the same type |
| $\mathcal{L}_{valency}$ | Valency anticipation | Anticipatory filling of correct valency slots based on dynamically updated Evidence Field statistics |

### Hyperparameter Schedule

| Parameter | Initial Value | Role |
|-----------|--------------|------|
| $\lambda_1$ | 0.5 | Cycle consistency strength |
| $\lambda_2$ | 1.0 | Energy alignment weight |
| $\lambda_3$ | 0.1 | Entropy regularization coefficient |
| $\lambda_4$ | 0.8 | Valency anticipation weight |

---

## 2. Architecture Optimization: Sparse TAG Attention

To avoid the $O(n^2)$ computational load of predicting connections between all node pairs:

### Type-Based Candidate Filtering

Mask attention scores for pairs that have no physical possibility of connection based on node type (TAG28) according to RFC-0017. This structurally prunes impossible LINK+ combinations before computation.

### Head-Centric Sparse Grid

Concentrate computational resources around the event-centroid Head node ($X^0$). Connections to Adjuncts are represented as sparse matrices:

```
Head (X⁰)
├── Specifier [dense attention]
├── Complement [dense attention]  
└── Adjuncts [sparse attention, O(n) not O(n²)]
```

**Computational reduction:** From $O(n^2)$ to $O(n \cdot k)$ where $k$ = average head degree.

---

## 3. Stage 4: CDR Loop Learning and Error Injection

To teach the model "repair," **Error Injection (noise injection)** is introduced in the learning phase.

### 3.1 Injection Noise Standards

| Noise Type | Probability | Description |
|------------|-------------|-------------|
| Type Flip | 20% | Randomly swap specific node type to adjacent TAG series |
| Edge Drop | 15% | Delete a portion of causal or structural links |
| Valency Violation | 10% | Remove required roles (Agent, etc.) to create incomplete structures |

### 3.2 Learning Objective

The model aims to:
1. Keep intentionally injected noise within "repairable range" through Π and CDR
2. Reach the correct solution with the **minimum number of CDR steps**

**CDR efficiency metric:**
$$\text{CDR\_steps}^* = \arg\min_{G^*} |\{op_i : G_0 \xrightarrow{op_i} G^*\}|$$

---

## 4. Dynamic Prior Update

The prior used in $\mathcal{L}_{valency}$ (§1) is periodically recomputed from the Evidence Field of the production universe (prod_main) and fed back to the model via LoRA weights. This enables autonomous learning of valency changes accompanying language evolution (usage shifts, neologisms).

**Update cycle:** Aligned with Evidence Field mass recomputation (RFC-0020 §2 PredSurv evaluation window $\tau_{min}$).

---

## 5. Anticipatory Intelligence

The ultimate objective of RFC-0027 training is a system that:

- **Does not merely repair broken input** — but proactively generates robust structures with minimum repair cost
- **Anticipates future CDR operations** — pre-positioning structural decisions to minimize downstream correction
- **Adapts to evolving Evidence** — continuously updating structural priors from the living knowledge field

---

## 6. Conclusion

> **"Through this protocol, GemminAI evolves from a system that 'repairs broken things' to an autonomously adaptive intelligence that 'anticipates correct things and generates noise-robust structures.'"**

The separation of inference (deterministic, RFC-0026 §1.1) from learning (stochastic, RFC-0026 §1.2) is the architectural prerequisite that makes this anticipatory capability possible without sacrificing production reliability.

---

*Gemmina Intelligence LLC. — Pure Information Laboratory*
*RFC-0027 | Draft/Experimental v2.0 | 2026-05-05*
*Acta AIIE Protocol v6.1*
