# RFC-0019: TAG↔NL Compiler — Semantic Reconstruction Engine (v3.0)

| Field | Value |
|-------|-------|
| **ID** | RFC-0019 |
| **Status** | Canonical |
| **Date** | 2026-04-22 |
| **Authors** | Gemmina Intelligence LLC. — Pure Information Laboratory |
| **Language** | EN |
| **Updates** | RFC-0016 (TAG28), RFC-0017 (LINK+), RFC-0018 (CFI) |
| **Dependencies** | X-bar Theory, Government and Binding (GB) Theory, 35TAG Standards v6.0 |

---

## 0. Purpose: Surgical Reconstruction of Information

This document defines the five-layer architecture and physical computation protocols of the **TAG↔NL Compiler** — a bidirectional translation engine between natural language (NL) and TAG28 graphs.

The compiler's objective is not the statistical generation of "plausible" text, but the extraction of invariant structure (I-language) from surface input (E-language), followed by energy-minimized reconstruction under Universal Grammar (UG) constraints.

---

## 1. The Five-Layer Stack

The compilation process passes through the following irreversible/reversible mixed layers:

### Layer 1: NL Layer (Natural Language)

- **Input:** Raw text containing ambiguity, ill-formed sentences, and missing information.
- **Characteristics:** Maximum statistical noise. The compiler accepts "broken input" — analogous to a soldier's cry on the battlefield.

### Layer 2: Proto-Structure Layer (Intermediate Syntax)

- **Role:** Mapping to Head-($X^0$)-centered slot structures based on X-bar templates.
- **Physical state:** "Liquid" — maintains probabilistic role distributions (Soft-UG).
- **Composition:** Event Frames ($E$), Roles ($R$), Slots ($S$), Uncertainty ($U$).

### Layer 3: TAG Graph Layer (Structure Crystallization / Π Projection)

- **Role:** Phase transition to discrete structure via the **Π operator**.
- **Physical state:** "Crystal" — a TAG28/LINK+ graph fully satisfying X-bar constraints (Spec > Head > Comp).
- **Constraints:** θ-Criterion, Binding Principles, DAG constraints applied forcefully.

### Layer 4: Evidence Alignment Layer (Semantic Grounding)

- **Role:** Connection to the gravity field of the Evidence DB (RFC-0020).
- **Physical operation:** **CDR (Consistency Detection & Repair)** using local CFI gradient $\nabla E$ (RFC-0018) to slide contradictory structures toward minimum-energy points.

### Layer 5: NL Realization Layer (Re-lingualization)

- **Output:** Re-projection from crystallized TAG graph into target natural language.
- **Characteristics:** Fluent natural language output while preserving structural invariants.

---

## 2. Core Operations: Π (Projection) and CDR (Repair)

### 2.1 Projection Operator Π

Discrete optimization that pours the continuous fog of meaning into the mold of Universal Grammar:

$$\Pi = \Pi_{repair} \circ \Pi_{constraint} \circ \Pi_{edge} \circ \Pi_{node}$$

- $\Pi_{node}$: Three-stage Head identification (candidate generation → role alignment → Evidence scoring).
- $\Pi_{constraint}$: Enforcement of X-bar hierarchy, causal irreversibility, and logical consistency.

### 2.2 CDR via Local Gradient

Energy Attribution identifies pain points (Spikes) and performs surgical repair:

$$\nabla E(G) \approx \{ (x, C_x, \Delta E(op_x)) \}$$

**Repair operations:**
- `change_head` — Replace the Head node
- `re-wire_complement` — Reconnect the complement argument
- `apply_evidence_re-weighting` — Adjust Evidence Field weights

---

## 3. Integrity and Abstention

The compiler **must reject** (abstain from output) under the following conditions:

1. **Π Collapse:** The projection yields no valid graph $G \in \mathcal{G}_{valid}$.
2. **High Residual Energy:** After repair, $E(G) > \tau_{reject}$ (T22 informational entropy excessive).

**Principle:** *"Better to declare structural uncertainty (silence) than to output a falsehood."*

This abstention mechanism prevents hallucination from propagating into the Evidence Field (RFC-0020), preserving the integrity of the crystallized knowledge base.

---

## 4. Multi-Perspective Realization (Layer 5)

Layer 5 supports perspective-shifted realization: the same crystallized TAG graph is re-projected through different T20 Observer Frames (RFC-0020 §1.2), producing linguistically distinct but structurally equivalent outputs.

**Example:**
```
Crystal (T25 state_hash: abc123)
  → JP perspective: "米国がイランへの制裁を発動した"
  → CN perspective: "美国对伊朗实施了单边经济压力"
  → EU perspective: "The US imposed additional sanctions on Iran"
```

All three outputs share the same state_hash — structural identity is preserved; only the observer frame rotates.

---

## 5. Validation Protocol

| Test | Criterion |
|------|-----------|
| **Minimal Pair Test** | "Man bites dog" vs "Dog bites man" → maximum CFI distance (RFC-0018) |
| **I-Language Consistency** | Paraphrases of the same meaning converge to identical state_hash at Layer 3 |
| **Human Agreement** | Inter-rater Cohen's $\kappa > 0.81$ on CRYSTAL/HOLD/REJECT classification |

---

## 6. Conclusion

> **"The TAG↔NL Compiler is an instrument that carves the crystal of truth from the statistical fog, using Universal Grammar as its lens."**

This RFC formalizes the transition of AI from a "probabilistic text generator" to a "structural integrity guardian" — a system that knows when to speak and when to remain silent.

---

*Gemmina Intelligence LLC. — Pure Information Laboratory*
*RFC-0019 | Canonical | 2026-04-22*
*Acta AIIE Protocol v6.1*
