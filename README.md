# Acta AIIE Protocol

**Artificial Intelligence Intent Encapsulation — Open Protocol Standard**

| Attribute | Value |
|-----------|--------|
| **Status** | **RATIFIED — v1.0.0** |
| **Governance** | Acta AIIE Standardization Committee |
| **Normative corpus** | *Acta AIIE Protocol Definition v1.0.0*; **NQ 2.0** (*Narrative Quantification 2.0*) |
| **Canonical schema** | **35TAG v6.0** |

> *"Words are woven by AI. Truth is guarded by mathematics."*

---

## Abstract

The **Acta AIIE Protocol** treats narrative not as mere text but as a **physical field**: a measurable object whose internal stresses, flows, and geometric distortions can be represented in structured state spaces and verified under explicit mathematical law. It is an open standard for **geometric quantification of interpretation**—decomposing events into a **35TAG v6.0** narrative state, sealing the invariant core with a cryptographic **T25** identity, and analysing dynamics through a **Field Tensor** model (interaction, velocity, and divergence) aligned with **Narrative Quantification 2.0 (NQ 2.0)**.

Implementations may differ in deployment; the **protocol** remains the public contract. **GemminAI** (Gemmina Intelligence LLC.) is a **reference implementation**—a demonstrator pipeline that exercises these rules in production-like settings. Conformance is defined solely against the specifications and RFCs in this repository, not against any single vendor product.

---

## Repository Structure

```
Acta-AIIE/
│
├── specs/                                    # Authoritative specifications (English)
│   ├── Acta_AIIE_Protocol_Definition_v1.0.0.md   # RATIFIED constitution (v1.0.0)
│   ├── 35TAG_Standard_v6.0.0.md                # Canonical 35TAG field registry & T25 preimage
│   ├── Narrative_Quantification_as_Cognitive_Infrastructure.md
│   ├── Acta_AIIE_JCS_SDK_Crystallization_Engine.md
│   ├── GemminAI_Narrative_Observation_Device.md
│   ├── Whitepapers.md                          # Index; wiki links resolve to filenames above
│   └── rfc/                                  # Standard-track RFC series
│       ├── README.md                         # RFC index & dependency graph
│       ├── RFC-0001-AIIE-Delta-Variance-Standard.md
│       ├── RFC-0002-AIIE-PCE-Detection-Protocol.md
│       ├── RFC-0003-AIIE-Narrative-Graph-Interaction-Model.md
│       └── RFC-0004-AIIE-Narrative-Relaxation-Dynamics.md
│
├── sdk/                                      # Reference tooling & physics engine
│   ├── narrative_dynamics_engine.py          # Field Tensor dynamics (ΔV, PCE, relaxation)
│   ├── verify_integrity.py                 # JCS crystallization engine (RFC 8785)
│   ├── gem0_semantic_scholar.py
│   └── narrative_generator/                # End-to-end narrative pipeline (SQL / PHP / Python)
│
├── paper/                                    # Academic foundation (NQ 2.0 lineage)
│   ├── narrative_quantification.md         # Canonical manuscript source
│   ├── FIGURES.md
│   └── figures/
│
└── src/                                      # Documentation portal (acta-aiie.org)
    └── ...
```

---

## Core Concepts

### T25 Hashing (Cryptographic Invariant)

The **25th structural anchor** is a deterministic seal over the **canonical core** of the narrative state. Serialization follows **[RFC 8785 (JSON Canonicalization Scheme)](https://www.rfc-editor.org/rfc/rfc8785)**; the hash field itself is excluded from its own input. The resulting **T25** value is the one-way cognitive identity of the sealed core—environment-independent, auditable, and tamper-evident.

### Field Tensor (**F**)

NQ 2.0 and the reference SDK model narrative dynamics as a **Field Tensor** unifying three layers on the coupling manifold:

| Layer | Role |
|--------|------|
| **Interaction** | Current complex coupling amplitudes ℐ(*t*) between narrative modes. |
| **Velocity** | Rate of change of interaction—information flow (discrete analog of §11.5 trajectory velocity). |
| **Divergence** | Pairwise **ΔV**—geometric distortion in **35TAG v6.0** space (Protocol §9). |

Together these describe the **field** as a physical object: where energy concentrates, where it moves, and where interpretive geometry warps.

### T25 Hesitation Protocol (Honest Incompleteness)

When **ΔV** exceeds the critical band (**≥ 0.7** per Protocol §9.4), compliant systems **must not** fabricate false consensus. They surface divergence, lower epistemic confidence where required, and treat **hesitation** as a valid output—**honest incompleteness** (Protocol §13), not a failure mode.

---

## RFC Index (Standard Track)

| RFC | Title | Role |
|-----|--------|------|
| **RFC-0001** | Delta Variance (ΔV) Standard | Normative weighted L₂ divergence between **35TAG** states; tiered response table; Hesitation linkage. |
| **RFC-0002** | PCE Detection Protocol | Variance-based **Post-Collapse Expansion** ignition and confirmation (Protocol §11). |
| **RFC-0003** | Narrative Graph Interaction Model | Complex interaction field over the narrative graph; structural pathology vocabulary. |
| **RFC-0004** | Narrative Relaxation Dynamics | Post-transition quiescence, variance decay, and order-rebuilding signatures. |

Full titles and dependency notes: [`specs/rfc/README.md`](specs/rfc/README.md).

---

## Specification vs. Implementation

| Layer | Responsibility |
|--------|----------------|
| **Acta AIIE Protocol** | The open standard—definitions, schemas, RFCs, and conformance criteria. |
| **GemminAI** (reference implementation) | An exemplar stack that implements the standard for verification and education; it does not replace the normative documents. |

This follows the familiar IETF pattern: the standard is what matters; implementations prove feasibility.

---

## Documentation Portal

Human-readable documentation and diagrams: **[acta-aiie.org](https://acta-aiie.org)**

---

## Academic Corpus

**Narrative Quantification** — geometric and thermodynamic foundations for narrative state spaces, compilers, and large cognitive models — is developed in the **`paper/`** tree and cross-referenced by **NQ 2.0** in the ratified **v1.0.0** definition.

→ [`paper/narrative_quantification.md`](paper/narrative_quantification.md)

---

## Crystallization Reference

The reference JCS engine passes the official **RFC 8785** test vectors. Published implementation fingerprint (illustrative):

```
3a5a3a9d1b13367621b5b34cc25a0d886a7da39ef91015a3f757ae37908602b8
```

---

## License

MIT License — © 2026 Gemmina Intelligence LLC.

The **specification** is open. **Implementations** may be proprietary; any product claiming **Acta AIIE Protocol compliance** must implement the crystallization and narrative-state rules defined under `specs/`.

---

*Acta AIIE Standardization Committee · Est. 2026 — Gemmina Intelligence LLC., Tokyo, Japan*
