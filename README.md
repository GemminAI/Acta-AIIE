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
│   ├── 24TAG_Standards_v4.1.0.md          ← Core data schema
│   ├── Acta_AIIE_Protocol_Structural_Definition.md  ← Cognitive layer model
│   ├── Acta_AIIE_JCS_SDK_Crystallization_Engine.md  ← Integrity / hashing rules
│   ├── GemminAI_Narrative_Observation_Device.md     ← Meteorological model
│   └── Whitepapers.md                     ← Whitepaper index
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
│   ├── narrative_quantification.tex       ← arXiv source
│   ├── narrative_quantification.pdf       ← Compiled PDF
│   └── narrative_quantification.md        ← Markdown version
│
└── src/                            # Documentation portal (acta-aiie.org)
    └── ...
```

---

## Core Concepts

### The 24TAG Schema

Every event processed by the AIIE Protocol is encoded as a JSON object with 24 structured fields — covering identity, causal dynamics, bias audit, risk propagation, and content presentation. The 25th field, `state_hash`, is a SHA-256 hash of the JCS-normalized 24 tags. It is the cryptographic seal.

```
state_hash = SHA256(JCS(TAG_01 ... TAG_24))
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

**Narrative Quantification as Cognitive Infrastructure**  
Tomohiko Nakamura — Independent Researcher, Japan (2026)

The paper introduces the theoretical foundation: Narrative Quantification, the 24TAG taxonomy, the Narrative Compiler architecture, Large Cognitive Models (LCM), and the cognitive infrastructure model.

→ [`paper/narrative_quantification.pdf`](paper/narrative_quantification.pdf)

---

## License

MIT License — © 2026 Gemmina Intelligence LLC.

The protocol specification is open. Implementations may be proprietary, but any system claiming "Acta AIIE Protocol compliance" must correctly implement the crystallization rules defined in `specs/`.

---

*Est. 2026 — Gemmina Intelligence LLC., Tokyo, Japan*
