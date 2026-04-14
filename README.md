# Acta AIIE Protocol

**Artificial Intelligence Intent Encapsulation — Open Protocol Standard**

| Attribute | Value |
|-----------|--------|
| **Status** | RATIFIED — v1.0.0 |
| **Latest Release** | **v1.2.0 — 2026-04-15** |
| **Governance** | Acta AIIE Standardization Committee |
| **Normative corpus** | *Acta AIIE Protocol Definition v1.0.0*; **NQ 2.0** (*Narrative Quantification 2.0*); **QMNSO v3.1**; **RFC-0015** (*JCS Canonical Hashing*) |
| **Canonical schema** | **35TAG v6.1.1** |

> *"Words are woven by AI. Truth is guarded by mathematics."*

---

## Abstract

The **Acta AIIE Protocol** treats narrative not as mere text but as a **physical field**: a measurable object whose internal stresses, flows, and geometric distortions can be represented in structured state spaces and verified under explicit mathematical law. It is an open standard for **geometric quantification of interpretation**—decomposing events into a **35TAG v6.0.1** narrative state, sealing the invariant core with a cryptographic **T25** identity, and analysing dynamics through a **Field Tensor** model (interaction, velocity, and divergence) aligned with **Narrative Quantification 2.0 (NQ 2.0)**.

Implementations may differ in deployment; the **protocol** remains the public contract. **GemminAI** (Gemmina Intelligence LLC.) is a **reference implementation**—a demonstrator pipeline that exercises these rules in production-like settings. Conformance is defined solely against the specifications and RFCs in this repository, not against any single vendor product.

---

## Repository Structure

```
Acta-AIIE/
│
├── specs/                                    # Authoritative specifications (English)
│   ├── Acta_AIIE_Protocol_Definition_v1.0.0.md   # RATIFIED constitution (v1.0.0)
│   ├── 35TAG_Standard_v6.0.1.md                # Canonical 35TAG field registry & T25 preimage
│   ├── Narrative_Quantification_as_Cognitive_Infrastructure.md
│   ├── Acta_AIIE_JCS_SDK_Crystallization_Engine.md
│   ├── GemminAI_Narrative_Observation_Device.md
│   ├── Whitepapers.md
│   └── rfc/                                  # Standard-track RFC series (RFC-0001–0015)
│       ├── README.md                         # RFC index & dependency graph
│       ├── RFC-0001 … RFC-0015
│
├── sdk/                                      # Reference tooling & physics engine
│   ├── narrative_dynamics_engine.py
│   ├── verify_integrity.py
│   ├── tag_v6.py
│   └── narrative_generator/
│
├── paper/                                    # Academic foundation
│   ├── narrative_quantification_2_0_1.md     # NQ 2.0 — canonical manuscript
│   ├── NarrativeQM3_v31_final.pdf            # QMNSO v3.1 — peer-review revision
│   └── figures/
│
└── src/                                      # Documentation portal (acta-aiie.org)
    └── ...
```

---

## Core Concepts

### T25 Hashing (Cryptographic Invariant)

The **25th structural anchor** is a deterministic seal over the **canonical core** of the narrative state. Serialization follows **[RFC 8785 (JSON Canonicalization Scheme)](https://www.rfc-editor.org/rfc/rfc8785)**; the hash field itself is excluded from its own input. The resulting **T25** value is the one-way cognitive identity of the sealed core—environment-independent, auditable, and tamper-evident.

```
T25 = SHA-256( JCS( TAG 01…34 ∖ { state_hash, jcs_hash } ) )
```

The companion **`jcs_hash`** (RFC-0015) seals the physical coordinate columns only (T01–T09, T22, T29, T30), enabling tamper detection independent of observation context.

### Field Tensor (**F**)

NQ 2.0 and the reference SDK model narrative dynamics as a **Field Tensor** unifying three layers on the coupling manifold:

| Layer | Role |
|--------|------|
| **Interaction** | Current complex coupling amplitudes ℐ(*t*) between narrative modes. |
| **Velocity** | Rate of change of interaction—information flow. |
| **Divergence** | Pairwise **ΔV**—geometric distortion in **35TAG v6.0.1** space. |

### T22 — Informational Entropy H₀

As of **RFC-0005** (RATIFIED), T22 is `informational_entropy` (float [0,1]), replacing the legacy `epistemic_diffusion_state` enum. Required by the Thermodynamic Decision Engine:

```
T(H) = 0.1 + 0.9 · H₀
```

### T25 Hesitation Protocol (Honest Incompleteness)

When **ΔV ≥ 0.7**, compliant systems must not fabricate false consensus. They surface divergence and treat hesitation as a valid output—honest incompleteness, not a failure mode.

---

## RFC Index (Standard Track)

| RFC | Title | Status |
|-----|--------|--------|
| **RFC-0001** | Delta Variance (ΔV) Standard | **RATIFIED** |
| **RFC-0002** | PCE Detection Protocol | **RATIFIED** |
| **RFC-0003** | Narrative Graph Interaction Model | DRAFT |
| **RFC-0004** | Narrative Relaxation Dynamics | DRAFT |
| **RFC-0005** | T22 Entropy-Shift (H₀) | **RATIFIED** |
| **RFC-0006** | Quantum-Formalism Observation Model (QFOM) | **RATIFIED** |
| **RFC-0007** | MIFT — Magnetic Information Field Theory | STABLE |
| **RFC-0008** | PNLA — Principle of Narrative Least Action | STABLE |
| **RFC-0009** | Narrative Curvature and Information Statistical Mechanics | STABLE |
| **RFC-0010** | Quantum Narrative Entanglement (QNE) | HYPOTHESIS |
| **RFC-0011** | Narrative Field Control | DRAFT |
| **RFC-0012** | Control Governance Layer | DRAFT |
| **RFC-0013** | Narrative Identity and Persistence | DRAFT |
| **RFC-0014** | Narrative Reality Selection | DRAFT |
| **RFC-0015** | JCS Canonical Hashing | **RATIFIED** |

**Status definitions:**

| Status | Meaning |
|--------|---------|
| **RATIFIED** | Normative. Changes require a new RFC. |
| **STABLE** | Complete and implementation-ready. Ratification pending empirical validation. |
| **DRAFT** | Proposal. Not a compliance requirement until ratified. |
| **HYPOTHESIS** | Theoretical. Requires empirical Bell-test validation before implementation. |

Full dependency graph and reading order: [`specs/rfc/README.md`](specs/rfc/README.md).

---

## Empirical Validation (QMNSO v3.1)

The QMNSO v3.1 paper provides empirical grounding for the theoretical framework, based on **4,729 narratives across 854 geopolitical events**:

| Result | Finding |
|--------|---------|
| **Non-Markovian Memory** | Weibull ΔAIC=28,953 vs Exponential; β=0.78<1 (post-deconfounding) |
| **Structured Interference** | H_pair > H_noise (p=0.0002); classical models falsified |
| **Objective Core Extraction** | τ*=0.02 from mutual information maximization |

→ [`paper/NarrativeQM3_v31_final.pdf`](paper/NarrativeQM3_v31_final.pdf) · [acta-aiie.org/whitepapers/narrative-qm3](https://acta-aiie.org/whitepapers/narrative-qm3)

---

## Specification vs. Implementation

| Layer | Responsibility |
|--------|----------------|
| **Acta AIIE Protocol** | The open standard—definitions, schemas, RFCs, and conformance criteria. |
| **GemminAI** (reference implementation) | An exemplar stack that implements the standard for verification and education. |

---

## Documentation Portal

Human-readable documentation: **[acta-aiie.org](https://acta-aiie.org)**

---

## License

MIT License — © 2026 Gemmina Intelligence LLC.

The **specification** is open. **Implementations** may be proprietary; any product claiming **Acta AIIE Protocol compliance** must implement the crystallization and narrative-state rules defined under `specs/`.

---

*Acta AIIE Standardization Committee · Est. 2026 — Gemmina Intelligence LLC., Tokyo, Japan*
