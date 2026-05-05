# RFC-0025: Error Handling & Meta-Diagnostics (v4.0)

| Field | Value |
|-------|-------|
| **ID** | RFC-0025 |
| **Version** | 4.0 |
| **Status** | Canonical |
| **Date** | 2026-05-04 |
| **Authors** | Gemmina Intelligence LLC. — Pure Information Laboratory |
| **Language** | EN |
| **Supersedes** | RFC-0025 v3.0 |
| **Updates** | RFC-0019 (Compiler Layers), RFC-0022 (CDR), RFC-0023 (Π) |
| **Depends on** | RFC-0021 v4.0 (EGEM), RFC-0020 v4.0 (Evidence) |
| **Experiment** | Experiment-001 Minimal Pair Validation (N=50, 2026-05-04) |
| **Canonical Promotion** | $\tau_{reject}$ achieves $Precision_{silence} > 0.95$ at simulation N=1,000 (v3.0). v4.0 reinforces threshold normalization basis with empirical data. |

---

## 0. Purpose: Self-Referential Governance of Intelligence (v4.0 Revision)

This document specifies error state definitions, the threshold registry, and meta-diagnostic protocols for NOMOS.

**Major changes in v4.0:**

1. **Normalization basis of threshold registry made explicit:** All τ values presuppose the two-stage normalized $E_{Field}$ scale defined in RFC-0021 v4.0 (A_NORMAL ≈ 1.0).
2. **Error class for K≥8 environments added:** Type D error defined for total multiverse collapse.
3. **Threshold basis reinforced with Experiment-001 empirical values:** Physical meaning of each threshold anchored to measured data.

---

## 1. Threshold Registry

### 1.1 Prerequisite: Scale Definition

**All thresholds in this registry presuppose the two-stage normalized $E_{Field}$ scale defined in RFC-0021 v4.0 §2.**

Normalization reference: $E_{Field}(G_{canonical}) = 1.0$ (canonical A_NORMAL structure)

### 1.2 Threshold Table

| Identifier | Definition | Initial Value / Range | Normalization Basis | Related RFC |
|---|---|---|---|---|
| $\tau_{node}$ | Node activation threshold | 0.4 / [0, 1] | Proto-Structure probability space (normalization-independent) | RFC-0023 |
| $\tau_{merge}$ | Node merge threshold | 0.9 / [0.8, 1.0] | Embedding similarity space (normalization-independent) | RFC-0023 |
| $\tau_{edge}$ | Edge crystallization threshold | 0.5 / [0, 1] | Edge existence weight space (normalization-independent) | RFC-0023 |
| $\tau_{spike}$ | CFI spike detection threshold | 0.7 / [0, 5] | CFI scale (normalization-independent). EXP-001: A_NORMAL avg CFI=0.167 < **0.32** < B_FLIP avg CFI=5.623 | RFC-0018 |
| $\tau_{crystal}$ | Crystallization pass energy | **1.2** / [0, ∞) | **Normalized scale.** A_NORMAL $E_{Field}$=1.0 as reference + 0.2 margin | RFC-0021 |
| $\tau_{reject}$ | Honest silence threshold | **3.5** / [0, ∞) | **Normalized scale.** EXP-001: B_FLIP pre-CDR $E_{Field}$=4.584 > **3.5** → CDR trigger confirmed | RFC-0021 |
| $\tau_{h}$ | Hallucination divergence threshold | **2.0** / [0, ∞) | **Normalized scale.** D_CONTEXT avg $E_{Field}$=1.44 < **2.0** → CRYSTAL confirmed | RFC-0020 |
| $\tau_{req}$ | P(r\|h) required judgment threshold | 0.8 / [0, 1] | Valency probability space (normalization-independent) | RFC-0024 |
| $\tau_{type}$ | Valency type compatibility threshold | 0.1 / [0, 1] | Valency probability space (normalization-independent) | RFC-0024 |
| $\tau_{integrity}$ | Π collapse detection threshold | 0.3 / [0, 1] | Information retention rate space (normalization-independent) | RFC-0023 |

### 1.3 Absolute Threshold Application Rules in K≥8 Environments

$\tau_{crystal}$, $\tau_{reject}$, and $\tau_{h}$ perform **absolute value comparison**. In K≥8 multiverse environments:

- Each candidate's $E_{Field}$ must use normalized values (RFC-0021 v4.0 §2.2)
- Inter-candidate ranking uses relative comparison (unaffected by normalization)
- **Mixing with pre-normalization legacy scale values is prohibited**

---

## 2. Error Taxonomy

### 2.1 Layer-Based Error Map (RFC-0019 Five-Layer Stack)

#### Type A: Layer 2 — Proto-Structure Collapse (Uncertainty Spike)

- **Cause:** Event Frame ($E$) cannot be identified from input NL semantic extraction
- **Indicator:** Maximization of Uncertainty $U$
- **Response:** Generate clarifying question to user based on maximum information gain (IG)
- **35TAG:** `informational_entropy` (T22) increase

#### Type B: Layer 3 — Projection Collapse (Π Collapse)

- **Cause:** Π projection (RFC-0023) yields no valid graph $G \in \mathcal{G}_{valid}$ satisfying TAG28/LINK+ hard constraints
- **Indicator:** Π computation non-convergence, or empty set after crystallization
- **Response:** **Status: REJECT.** Declare "structurally uninterpretable."
- **EXP-001 observation:** 6/10 cases in C_MISSING category (AGENT + PATIENT both absent)

#### Type C: Layer 4 — Causal Paradox / Integrity Spike

- **Cause:** CFI distance from Evidence Field cannot fall below $\tau_{reject}$ during CDR (RFC-0022), or causal loop cannot be resolved
- **Indicator:** $E_{final} > \tau_{reject}$ (normalized), or `regret_S` stagnation
- **Response:** Present metastable solution, or honest silence
- **EXP-001 observation:** 8/10 cases REJECT in E_CONTRADICT category ($D_{logic} \to \infty$)

#### Type D: K≥8 Multiverse Total Collapse (v4.0 New)

- **Cause:** All K≥8 candidates receive REJECT ($E_{total} > \tau_{reject}$); no valid crystallized solution exists
- **Physical meaning:** Input information is a "zero-mass floating structure" that cannot be grounded in the current Evidence Field
- **Indicator:** All candidates `final_status = REJECT`, all SAI < 0.1
- **Response:**
  1. Record collapse locations of all candidates in `spike_history`
  2. Compute `multiverse_variance` to diagnose "polysemy collapse" vs "Evidence insufficiency collapse"
  3. Issue **Status: TOTAL_SILENCE**. Request additional evidence from user
- **35TAG writes:** `informational_entropy` (T22) maximum, `state_hash` (T25) undetermined, `relative_time_field` (T33) singularity recorded

---

## 3. Meta-Diagnostic Protocol

### 3.1 Structural Pain Index

Detects stagnation of energy descent $\Delta E / \Delta t_{iter}$ during CDR:

$$Pain = \frac{\Delta E}{\Delta t_{iter}}$$

When energy fails to converge after $t_{max}$ iterations, the system records "structural pain" in metadata and proposes silence (Reject) to the upper layer.

### 3.2 Self-Awareness Index (SAI / 35TAG: T31)

$$SAI = 1.0 - \text{normalized}(E_{final} + \text{Var}(Multiverse))$$

`normalized` maps to $[0, 1]$ based on the cumulative distribution function (CDF) of $E + \text{Var}$ over the past 1,000 samples.

**SAI interpretation:**

| SAI Range | State | Meaning |
|-----------|-------|---------|
| [0.8, 1.0] | CRYSTAL | High confidence; stable crystallization |
| [0.4, 0.8) | HOLD | Moderate confidence; monitoring required |
| [0.0, 0.4) | REJECT | Low confidence; honest silence |

### 3.3 Diagnostic Pipeline

```
Error detected
  → Classify Type (A/B/C/D)
  → Record spike_history
  → Compute SAI
  → If Type D: issue TOTAL_SILENCE
  → If Type B/C: issue REJECT + log
  → If Type A: generate clarifying question
```

---

## 4. Honest Silence Protocol

The honest silence mechanism is the system's primary integrity guarantee:

> **"Better structural silence than confident hallucination."**

When $E_{final} > \tau_{reject}$ after maximum CDR iterations, the system:

1. Does **not** output a structurally invalid result
2. Records the failure state with full diagnostic metadata
3. Returns a structured silence response indicating the reason for abstention

This ensures that the Evidence Field is never polluted with high-energy (contradictory) structures masquerading as crystallized knowledge.

---

## 5. Conclusion

> **"Error handling in GemminAI is not exception management — it is the system's conscience. The ability to say 'I cannot answer this with integrity' is not a limitation; it is the highest expression of epistemic responsibility."**

---

*Gemmina Intelligence LLC. — Pure Information Laboratory*
*RFC-0025 | Canonical v4.0 | 2026-05-04*
*Acta AIIE Protocol v6.1*
