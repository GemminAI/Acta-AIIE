# Acta AIIE Protocol

**Artificial Intelligence Intent Encapsulation — Open Protocol Standard**

> *"Words are woven by AI. Truth is guarded by mathematics."*

---

## What is this?

The **Acta AIIE Protocol** is an open standard for transforming narrative information into structured, mathematically verifiable data. It defines how AI systems should decompose events, quantify bias, and produce cryptographically sealed outputs — ensuring that the intent behind every generated narrative is immutable and auditable.

This repository contains:

- **The specification** — the protocol rules that any compliant system must follow
- **The reference implementation** — the GemminAI pipeline that implements those rules
- **The academic paper** — the theoretical foundation for the approach

---

## Repository Structure

```
Acta-AIIE/
│
├── specs/                          # Protocol specifications (English)
│   ├── Acta_AIIE_Protocol_Definition_v1.0.0.md  ← RATIFIED CONSTITUTION (v1.0.0)
│   ├── 24TAG_Standards_v4.1.0.md                ← superseded by 35TAG v6.0 in v1.0.0
│   ├── Acta_AIIE_Protocol_Structural_Definition.md  ← ARCHIVED (v0.1.0 draft)
│   ├── Acta_AIIE_JCS_SDK_Crystallization_Engine.md
│   ├── GemminAI_Narrative_Observation_Device.md
│   └── Whitepapers.md
│
├── sdk/                            # Reference implementation
│   ├── verify_integrity.py                ← JCS Engine (RFC 8785 / 49/49 PASS)
│   ├── gem0_semantic_scholar.py           ← Academic source collection
│   └── narrative_generator/               ← Full generation pipeline
│       ├── step1_structural_vectors.sql
│       ├── step2_narrative_state_vectors.sql
│       ├── step3_NarrativeGeneratorBridge.php
│       ├── step4_narrative_generator.py
│       └── step5_deploy_and_scheduler.sh
│
├── paper/                          # Academic paper
│   ├── narrative_quantification.md        ← Canonical paper source
│   ├── FIGURES.md                         ← Figure integration notes
│   └── figures/                           ← SVG / PNG figure assets
│
└── src/                            # Documentation portal (acta-aiie.org)
    └── ...
```

---

## Core Concepts

### The 24TAG Schema

Every event processed by the AIIE Protocol is encoded as a JSON object with 24 structured fields. These 24 tags form the canonical narrative state representation. The `state_hash` is a separate cryptographic seal computed from the JCS-normalized 24 tags and excluded from its own input.

```
state_hash = SHA256(JCS(T01 ... T24))
```

### The Narrative Compiler

A search-and-optimization engine that transforms raw text into a probability distribution over narrative states: `P(N | text)`. It uses beam search, causal constraints, and graph pruning to collapse prose into a deterministic, verifiable structure.

### Crystallization

Compliance with [RFC 8785 (JSON Canonicalization Scheme)](https://www.rfc-editor.org/rfc/rfc8785) ensures that identical narrative data produces an identical `state_hash` regardless of runtime environment, language, or locale. The reference implementation passes all 49 official RFC 8785 test vectors.

```
Official Implementation Hash:
3a5a3a9d1b13367621b5b34cc25a0d886a7da39ef91015a3f757ae37908602b8
```

---

## Spec / Implementation Separation

The **Acta AIIE Protocol** is the specification. **Gemmina Intelligence** is the reference implementation.

This mirrors the IETF model: the RFC defines the rules; implementations demonstrate compliance. Any system that correctly implements the four-layer cognitive model and the JCS crystallization rules may claim conformance with the Acta AIIE Protocol.

---

## Documentation Portal

Full protocol documentation is available at **[acta-aiie.org](https://acta-aiie.org)**

---

## Academic Paper

**Narrative Quantification: Compiling Narrative Structures into Geometric State Representations**  
Tomohiko Nakamura — Independent Researcher, Japan (2026)

The paper introduces the theoretical foundation: Narrative Quantification, the 24TAG taxonomy, the Narrative Compiler architecture, Large Cognitive Models (LCM), and the geometric state representation framework.

→ [`paper/narrative_quantification.md`](paper/narrative_quantification.md)

---

## License

MIT License — © 2026 Gemmina Intelligence LLC.

The protocol specification is open. Implementations may be proprietary, but any system claiming "Acta AIIE Protocol compliance" must correctly implement the crystallization rules defined in `specs/`.

---

*Est. 2026 — Gemmina Intelligence LLC., Tokyo, Japan*
