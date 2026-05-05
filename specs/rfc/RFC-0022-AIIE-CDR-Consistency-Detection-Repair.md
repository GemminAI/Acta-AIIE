# RFC-0022: CDR — Consistency Detection & Repair Dynamics (v3.1)

| Field | Value |
|-------|-------|
| **ID** | RFC-0022 |
| **Version** | 3.1 |
| **Status** | Canonical |
| **Date** | 2026-05-04 |
| **Authors** | Gemmina Intelligence LLC. — Pure Information Laboratory |
| **Language** | EN |
| **Updates** | RFC-0018 (CFI), RFC-0020 (Evidence), RFC-0021 (EGEM), RFC-0025 (Diagnostics) |
| **Dependencies** | RFC-0023 (Π), RFC-0024 (Valency), 35TAG Standards v6.0 |

---

## 0. Abstract

This document defines **CDR (Consistency Detection & Repair)** — the dynamics of inconsistency detection and energy-minimization-based structural repair in TAG28 graphs.

CDR eliminates statistical regeneration in favor of discrete "surgical operations" on structure, recovering information consistency while preserving structural invariants.

---

## 1. CDR Equation: Physics of Convergence

Structural update in a discrete graph is formalized as an iterative process:

$$G_{t+1} = \Pi \left(\text{apply}(G_t, op^*)\right)$$

Here, $\text{apply}(G_t, op^*)$ selects and applies the discrete edit operation $op^*$ that maximally reduces energy based on gradient $\nabla E$ (continuous approximation), followed by re-projection $\Pi$ (RFC-0023) to enforce hard constraints.

---

## 2. Detection: Energy Attribution

"Where is it broken?" is answered by computing the contribution $C(x)$ of each element to total system energy:

$$C(x) = E(G) - E(G \setminus \{x\})$$

Elements whose contribution exceeds threshold $\tau_{spike}$ are identified as "pain points (Spikes)" — the surgical target for CDR repair.

**Three-zone classification (EXP-0033 calibration):**

| Zone | Condition | Action |
|------|-----------|--------|
| CRYSTAL | $C(x) \leq \tau_{spike} = 0.32$ | No repair needed |
| HOLD | $0.32 < C(x) \leq \tau_{reject} = 0.59$ | Monitor; optional repair |
| REJECT | $C(x) > \tau_{reject}$ | Mandatory repair |

---

## 3. Repair Protocol: Surgical Execution Sequence

Repair executes against identified spikes in four steps:

### Step 1: Neighborhood Ops Generation

For identified spike element $x$, enumerate the set of applicable local edit operations $\mathcal{O}(x)$:

**For Node $v$:**
- `change_type(v, t')` — Change TAG28 type
- `replace_with_neighbor(v)` — Replace with evidence-adjacent node
- `delete_node(v)` — Remove (if non-essential)

**For Edge $e$:**
- `flip_direction(e)` — Reverse directionality
- `change_relation(e, r')` — Change LINK+ relation type
- `remove_edge(e)` — Sever connection

**For Valency Deficiency:**
- `add_edge(h, r, v_new)` — Add missing argument
- `insert_placeholder(T24)` — Insert structural placeholder

### Step 2: Sensitivity Analysis

For each candidate operation $op \in \mathcal{O}(x)$, evaluate the energy change:

$$\Delta E(op) = E(G) - E(\text{apply}(G, op))$$

### Step 3: Operation Selection & Execution

Select and apply the operation with maximum energy reduction:

$$op^* = \arg\max_{op \in \mathcal{O}(x)} \Delta E(op)$$

subject to: $E_{UG}(\text{apply}(G, op)) < \infty$ (no UG violations introduced).

### Step 4: Constraint Re-Projection

Apply Π (RFC-0023) after each operation to enforce hard constraints:

$$G_{t+1} = \Pi(\text{apply}(G_t, op^*))$$

---

## 4. Convergence and Termination

### 4.1 Convergence Criterion

CDR terminates when:

$$E_{total}(G_t) \leq \tau_{crystal} \quad \text{(CRYSTAL zone)}$$

or when maximum iterations $T_{max}$ are exceeded (→ HOLD or REJECT classification per RFC-0025).

### 4.2 Non-Convergence Handling

If $E_{total}(G) > \tau_{reject}$ after $T_{max}$ iterations:

1. **Log** the failure state with full energy attribution vector
2. **Abstain** from output (RFC-0019 §3 Integrity protocol)
3. **Trigger** meta-diagnostic escalation (RFC-0025 §3)

---

## 5. CDR in the Evidence Field

CDR operates bidirectionally with the Evidence Field (RFC-0020):

**Forward:** CDR repairs candidate graphs to minimize $E_{Field}$ (distance to Evidence).

**Backward:** Repaired graphs that crystallize (CRYSTAL zone) are candidates for Evidence Field entry, potentially increasing $M_i$ of existing Evidence via Topo and PredSurv factors.

```
Incoming article
  → TAG28 crystallization (RFC-0019)
  → Energy computation (RFC-0021 EGEM)
  → CDR repair loop
  → If CRYSTAL: candidate for Evidence Field update
  → If REJECT: abstain + log
```

---

## 6. CDR vs. Statistical Regeneration

| Dimension | CDR (Structural Repair) | Statistical Regeneration |
|-----------|------------------------|--------------------------|
| Mechanism | Discrete surgery on existing graph | Probabilistic sampling of new sequence |
| Preserves structure | ✅ T25 state_hash maintained | ❌ New hash generated |
| Hallucination risk | ✅ Structurally bounded | ❌ Unconstrained |
| Computational cost | O(depth × |O(x)|) | O(sequence_length) |
| Integrity guarantee | ✅ Hard constraint enforced | ❌ No structural guarantee |

---

## 7. Conclusion

> **"CDR is the surgeon of the semantic system — not a regenerator that discards the patient and grows a new one, but a precision operator that repairs the pathological structure while preserving its invariant identity."**

---

*Gemmina Intelligence LLC. — Pure Information Laboratory*
*RFC-0022 | Canonical v3.1 | 2026-05-04*
*Acta AIIE Protocol v6.1*
