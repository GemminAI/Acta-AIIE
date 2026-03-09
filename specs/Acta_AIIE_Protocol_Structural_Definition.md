# Acta AIIE Protocol — Structural Definition (v0.1.0 Draft)

**Status:** Draft  
**Governance:** Acta AIIE Standardization Committee  
**Reference Implementation:** Gemmina Intelligence LLC.

---

## 1. Abstract

The **Acta AIIE Protocol** (Artificial Intelligence Intent Encapsulation) is a standard model through which AI and humans make decisions by following a shared cognitive flow: **Analysis → Interpretation → Intent → Execution**.

```
Analysis → Interpretation → Intent → Execution
      ↑_______________________________________|
```

The protocol's defining principle is the explicit separation of AI's role as an objective analyst from the human's role as the holder of final intent. AI produces optimization; humans supply direction.

---

## 2. Layer Definitions

| Layer | Primary Agent | Role | Implementation Notes |
|-------|--------------|------|----------------------|
| **Analysis** | AI | Objective / Mathematical | Extract only tokens, numerical values, data structures, and system constraints. Eliminate all emotion and speculation. |
| **Interpretation** | Collaborative | Context / Meaning | Define what the extracted data means within the current project context and the operator's aesthetic framework. |
| **Intent** | Human | Sovereign Will | Fix the operator's unique purpose — the "outlier" — as an absolute constant that overrides AI's statistical predictions. |
| **Execution** | Collaborative | Action | Produce output that reflects the determined intent with maintained expertise and, where appropriate, wit. |

---

## 3. Core Design Philosophy

### AI = Optimization / Human = Direction

AI produces the statistical mean. Humans inject the outlier.

This is not a limitation of AI — it is the correct division of cognitive labor. A model trained on all existing human knowledge will naturally gravitate toward the average. The AIIE Protocol exists to ensure that the human operator's specific intent is never dissolved into that average, but is instead locked in as an immutable axis before execution begins.

### Intent as a Physical Constant

Within the protocol, human intent is treated not as a preference or a suggestion, but as a **physical constant** — analogous to the speed of light in physics calculations. All downstream execution is computed relative to this fixed value. It cannot be overridden by AI inference.

---

## 4. Protocol Integration: System Prompt Template

To embed this protocol in an AI system, prepend the following block to all instructions:

```
System Protocol: Acta AIIE

1. Analysis (Objective Only):
   Thoroughly analyze the mathematical structure of all input data
   and the current system constraints. Eliminate all inference and emotion.

2. Interpretation (Contextualize):
   Interpret the meaning of the extracted data within the context
   of the operator's project and stated aesthetic framework.

3. Intent (The Human Will):
   Fix the operator's specified values — numerical constants, structural
   decisions, aesthetic axioms — as an immovable axis.
   Suppress all generalist defaults.

4. Execution (Collaborative Action):
   Execute the determined purpose in the specified style,
   maintaining both technical precision and contextual wit.
```

---

## 5. Versioning

The protocol follows **Semantic Versioning (SemVer):** `MAJOR.MINOR.PATCH`

### v0.x.x — Draft Phase

| Version | Milestone |
|---------|-----------|
| v0.1.0 | Core four-layer model defined |
| v0.2.0 | AI/Human role separation formalized |
| v0.3.0 | JCS integration defined |

At this stage, all definitions are considered experimental specifications.

### v1.0.0 — First Stable Release

Required conditions:
- Four-layer definition is fixed
- Terminology is unambiguous
- A reference implementation (Gemmina Intelligence) exists
- Diagrams are finalized
- Published on GitHub

Only at this point may the document be formally called a "Protocol."

### v2.0.0 — Extended Edition

Examples of MAJOR version triggers:
- Branching Intent model (multi-operator)
- Multi-AI collaborative layer
- Organizational application model
- Policy application model

MAJOR version increments only on structural changes.

---

## 6. Spec / Implementation Separation

This is a critical architectural principle.

- **Acta AIIE Protocol** = The specification document
- **Gemmina Intelligence** = The reference implementation

This mirrors the structure used by the IETF when issuing RFCs: the specification defines the rules; implementations demonstrate compliance. Any system that correctly implements the four-layer model and the JCS crystallization rules may claim conformance with the Acta AIIE Protocol, regardless of technology stack.

---

## 7. Message Structure

Each protocol interaction produces an `AIIE_Block`:

```json
{
  "analysis":       {},
  "interpretation": {},
  "intent":         {},
  "execution":      {}
}
```

All four fields must be populated before the block is considered complete. Partial blocks are invalid protocol objects.

---

## 8. State Model

The standard flow is linear:

```
Analysis → Interpretation → Intent → Execution
```

However, real-world AI interactions require handling the following state transitions:

| Transition | Trigger |
|-----------|---------|
| **Loop** | New data arrives after Execution; re-enter Analysis |
| **Branch** | Intent specifies mutually exclusive execution paths |
| **Abort** | Physical contradiction (CFI) detected; halt and flag |
| **Revise** | Operator overrides a completed Execution; re-enter Intent |

These transitions are logged as state changes, not as errors.

---

## 9. Security Considerations

### Misuse Vectors

The protocol's "Intent fixation" mechanism is a powerful tool. Potential misuse scenarios that implementors must guard against:

- **Narrative Centralization:** A single authority using Intent fixation to delegitimize valid divergent interpretations.
- **Bias Laundering:** Encoding systemic bias into the Analysis layer and presenting the output as "objective."
- **Intent Forgery:** Injecting false Intent values to redirect Execution without the operator's knowledge.

### Mitigation

All Intent values are subject to the same JCS crystallization and `state_hash` verification as 24TAG data. Any post-hoc modification of Intent is mathematically detectable as a hash divergence.

---

## 10. Reference Implementation

**Gemmina Intelligence LLC. — GemminAI System**

The GemminAI pipeline implements the Acta AIIE Protocol as follows:

| Protocol Layer | GemminAI Component |
|---------------|-------------------|
| Analysis | Gem0 (data collection, CFI scoring) |
| Interpretation | Gem1 (structural vector generation, Bridge Layer) |
| Intent | Operator-defined parameters (temperature=0.1 fixed) |
| Execution | Gem2 (Gemini 2.0 Flash, Japanese article generation) |

The `temperature=0.1` setting in INTELLIGENCE_GAP mode is a **philosophical constraint**, not an operational parameter. It is hardcoded as a physical constant of the system.

---

## 11. Connection to 24TAG and JCS

The Acta AIIE Protocol is the cognitive framework. The **24TAG schema** is its data structure. The **JCS Crystallization Engine** is its integrity proof.

```
Acta AIIE Protocol (cognitive flow)
        ↓
   24TAG Schema (data structure)
        ↓
JCS Engine + SHA-256 (mathematical seal)
        ↓
     state_hash (immutable fingerprint)
```

These three components are inseparable. A system that implements the cognitive flow without the data structure produces unverifiable outputs. A system that produces a `state_hash` without the cognitive flow produces a hash of noise.

---

*© 2026 Gemmina Intelligence LLC.*  
*Acta AIIE Protocol v0.1.0 (Draft) — Standardization Committee*
