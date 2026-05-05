# RFC-0017: LINK+ — Relational Laws and Causal Constraints (v3.0)

| Field | Value |
|-------|-------|
| **ID** | RFC-0017 |
| **Status** | Canonical |
| **Date** | 2026-04-22 |
| **Authors** | Gemmina Intelligence LLC. — Pure Information Laboratory |
| **Language** | EN |
| **Updates** | RFC-0000 (Constitution), RFC-0016 (TAG28 v3.0) |
| **Dependencies** | X-bar Theory, Government and Binding (GB) Theory, RFC-0024 (Valency) |

---

## 0. Purpose: The Laws Governing Atoms (NOMOS)

This document defines the taxonomy, physical properties, and Universal Grammar (UG)-based constraints of **LINK+** — the relational connectors that bind TAG28 nodes into structured graphs.

---

## 1. Physical Properties of LINK+

Every LINK+ carries three physical parameters that form the basis of CFI computation (RFC-0018):

1. **Directionality** — The "direction" of causality or governance between nodes.
2. **Bond Strength** — The degree of confidence within the Evidence Field.
3. **Constraint Force** — The capacity to fix the grammatical "Case" (θ-role) in the X-bar hierarchy.

---

## 2. Category Taxonomy

### 2.1 Structural Links (X-bar Links)

| Link Type | Direction | Meaning |
|-----------|-----------|---------|
| **AGENT** | Specifier → Head | Volitional initiator of action |
| **PATIENT** | Head → Complement | Entity acted upon |
| **THEME** | Head ↔ Node | Subject of a state |
| **MODIFY** | Adjunct → X' | Optional modification |

### 2.2 Causal and Logical Constraints

| Link Type | Direction | Meaning |
|-----------|-----------|---------|
| **CAUSES** | Event A → Event B | Direct causal relationship |
| **ENTAILS** | A → B | Logical implication |
| **CONTRADICTS** | A ↔ B | Mutual exclusion / contradiction |
| **EQUIVALENT** | A ≡ B | Identity / co-reference |

---

## 3. Government and Binding Constraint Protocol

### 3.1 Government and Case Assignment

The Head ($X^0$) forces a semantic "Case" (θ-role) onto its Complement and Specifier via LINK+. This locking mechanism ensures that argument structure is enforced as a physical constraint, not a statistical preference.

### 3.2 Physics of Binding

**LINK:identity** — A pronominal node must be magnetically bound to a concrete antecedent noun in the discourse context. Unresolved pronominal binding contributes to CFI spike energy (RFC-0018 §3).

---

## 4. Correlation with CFI (Discontinuity Index)

LINK+ determines the $D_{link}$ term in CFI computation:

$$D_{link} = \sum |Link_{expected} - Link_{observed}|$$

**Definition (v4.0):** $Link_{expected}$ is the role set satisfying $P(r|h) > \tau_{req}$ from RFC-0024 §3.1 (Evidence-derived Valency). This transforms the expected argument structure into a real-valued physical quantity, making structural deviations measurable.

**CFI Contribution:**

$$CFI_{\text{structural}} = w_l \cdot D_{link}$$

where $w_l = 1.2$ (default, per `SYS_CONFIG_PARAM_REGISTRY`).

---

## 5. LINK+ in the TAG Graph DAG

LINK+ edges form the directed acyclic graph (DAG) over TAG28 nodes. DAG integrity requires:

1. **No cycles** — Causal LINK+ (CAUSES, ENTAILS) must be acyclic. Circular causation raises $D_{logic}$ to maximum.
2. **θ-Criterion** — Each argument role must be assigned exactly once per predicate head.
3. **Projection Consistency** — LINK+ must respect the X-bar projection: Spec > Head > Comp.

---

## 6. Validation Protocol

| Test | Criterion |
|------|-----------|
| Minimal Pair (RFC-0019) | "Man bites dog" vs "Dog bites man" → maximum CFI distance |
| Valency Compliance | $P(r\|h) > \tau_{req}$ for all required roles |
| DAG Acyclicity | Zero cycles in CAUSES/ENTAILS subgraph |

---

## 7. Conclusion

> **"LINK+ is not merely a connection. It is the force that fixes argument structure — as required by Universal Grammar — as a physical potential in semantic space."**

LINK+ transforms the TAG28 graph from a labeled hypergraph into a grammar-constrained physical system, where deviations from expected structure generate measurable energy (CFI) and trigger CDR repair operations (RFC-0022).

---

*Gemmina Intelligence LLC. — Pure Information Laboratory*
*RFC-0017 | Canonical | 2026-04-22*
*Acta AIIE Protocol v6.1*
