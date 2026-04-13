# Changelog

All notable changes to the Acta AIIE Protocol are documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).  
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [1.1.0] — 2026-04-13

### Added

**RFC Series — RFC-0005 through RFC-0014**

- `specs/rfc/RFC-0005-AIIE-T22-Entropy-Shift.md` — RATIFIED. Phase transition from `epistemic_diffusion_state` (enum) to `informational_entropy` (float [0,1]). Required by T35 v2 Thermodynamic Decision Engine formula T(H) = 0.1 + 0.9·H₀. Defines Entropy-Shift migration protocol preserving 8,192 existing state hashes.
- `specs/rfc/RFC-0006-AIIE-Quantum-Formalism-Observation-Model.md` — RATIFIED. Introduces quantum-mechanical formalism as descriptive language for the information observation process. Maps T01–T07 and T22 to quantum analogues. Defines Observational Namespace via T01 prefix and unitary transformation U. Zero field changes — pure interpretation layer.
- `specs/rfc/RFC-0007-AIIE-MIFT-Narrative-Information-Field-Theory.md` — STABLE. Magnetic Information Field Theory: extends QFOM to collective narrative flow using framework isomorphic to classical electromagnetism. Defines Narrative Current Density J, Context Spin B, and four Narrative Maxwell Equations.
- `specs/rfc/RFC-0008-AIIE-PNLA-Narrative-Least-Action.md` — STABLE. Principle of Narrative Least Action: computable Narrative Lagrangian ℒ = K − V over 35TAG state variables. Trajectory selection Φ* = argmin S[Φ]. Empirically validated: Weibull ΔAIC=28,953 vs Exponential (β=0.78<1).
- `specs/rfc/RFC-0009-AIIE-Narrative-Curvature-Information-Spacetime.md` — STABLE (Revised 2026-04-13). Narrative Curvature and Information Statistical Mechanics: hybrid framework integrating κ with Boltzmann distribution, Information Temperature T, and Fluctuation-Dissipation theorem. Free Energy F = E − TS formulation. Prediction Error ε derived as thermodynamic property.
- `specs/rfc/RFC-0010-AIIE-Quantum-Narrative-Entanglement.md` — HYPOTHESIS. Quantum Narrative Entanglement: actor-state non-separability across T01 Namespaces. Bell-CHSH criterion |S_CHSH| > 2 as testable QNE condition. Requires empirical Bell-AIIE validation before ratification.
- `specs/rfc/RFC-0011-AIIE-Narrative-Field-Control.md` — DRAFT. External Control Field 𝒰 for PCE suppression and structural stability. Non-Manipulation Constraint: control acts only on energy distribution and interaction structure. Field energy budget ‖𝒰‖/‖ℐ‖ ≤ ε.
- `specs/rfc/RFC-0012-AIIE-Control-Governance-Layer.md` — DRAFT. Three-layer authority model (C0/C1/C2). Stability Function gate Δ𝒮 > 0 required for all operations. Weaponization detection and narrative authoritarianism prevention.
- `specs/rfc/RFC-0013-AIIE-Narrative-Identity-Persistence.md` — DRAFT. Event attractors, identity condition ΔV < θ_identity (θ=0.15), proper time τ, PCE as velocity runaway v > v_critical. JP/EN T25 hash consistency validated in production (April 2026).
- `specs/rfc/RFC-0014-AIIE-Narrative-Reality-Selection.md` — DRAFT. Boltzmann selection of realized narrative via Free Energy minimization. Dual characterization: δS=0 (PNLA) ≡ argmin ℱ (Boltzmann). Reality hijacking defense via T25 audit trail and RFC-0012 governance.

**Whitepapers**

- `paper/NarrativeQM3_v31_final.pdf` — QMNSO v3.1: Quantum-Formalism Narrative State Observation. Empirical causal inference in geopolitical information fields. Dataset: 4,729 narratives, 854 events. Three results: Non-Markovian memory (Weibull ΔAIC=28,953; β=0.78), Structured interference (p=0.0002; H_pair>H_noise), Objective core extraction (τ*=0.02).

**Documentation Portal (acta-aiie.org)**

- Individual detail pages for RFC-0005 through RFC-0014
- QMNSO v3.1 whitepaper page (`/whitepapers/narrative-qm3`) with embedded Figure 3, 4, 6
- Sidebar navigation updated to include all 14 RFCs and QMNSO v3.1
- RFC Index updated to full 14-RFC listing with status legend and dependency graph

### Changed

- `specs/rfc/RFC-0009-AIIE-Narrative-Curvature-Information-Spacetime.md` — Revised from "Information Spacetime" to "Information Statistical Mechanics". Added Boltzmann distribution, Information Temperature, Fluctuation-Dissipation theorem, Narrative Entropy, and Free Energy formulation (F = E − TS).
- `specs/rfc/README.md` — RFC index extended from 4 to 14 entries; dependency graph updated; reading order specified.
- `index.html` — Page title corrected from "Minimalist Documentation Portal" to "Acta AIIE — RFC Standardization Repository".
- `src/app/components/Sidebar.tsx` — Navigation updated to reflect complete RFC-0001–0014 series and QMNSO v3.1.

### Protocol Notes

- RFC-0005 through RFC-0006: RATIFIED — normative for all compliant implementations.
- RFC-0007 through RFC-0009: STABLE — complete and implementation-ready; ratification pending empirical validation.
- RFC-0010: HYPOTHESIS — theoretical; Bell-AIIE test required before implementation.
- RFC-0011 through RFC-0014: DRAFT — proposals; not compliance requirements until ratified.
- T22 field name: `epistemic_diffusion_state` (legacy, schema_version < 6.0.0) → `informational_entropy` (current, schema_version = 6.0.0). Existing 8,192 state hashes preserved.

---

## [Unreleased]

### Changed

- Canonical schema is **35TAG v6.0.0** (`specs/35TAG_Standard_v6.0.0.md`). Legacy `24TAG_Standards_v4.1.0.md` moved to `archived/specs/`.
- **T25 (`state_hash`)** reference implementation: SHA-256(RFC 8785 JCS) over TAG **01–34** excluding `state_hash` (TAG 35 not in JCS payload). See `sdk/tag_v6.py` / `sdk/verify_integrity.py`.
- Documentation portal and UI copy updated from "24TAG" to **35TAG v6.0.0** terminology.

---

## [4.1.0] — 2026-03-09

### Added

- `specs/24TAG_Standards_v4.1.0.md` — Full English specification of all 24 tags (now archived under `archived/specs/`)
- `specs/Acta_AIIE_Protocol_Structural_Definition.md` — Cognitive layer model (v0.1.0 Draft)
- `specs/Acta_AIIE_JCS_SDK_Crystallization_Engine.md` — JCS implementation rules
- `specs/GemminAI_Narrative_Observation_Device.md` — Meteorological observation model
- `specs/schema_v4.1.0.json` — Standalone JSON Schema (Draft-07)
- `sdk/selftest_vectors.json` — 49 RFC 8785 compliance test vectors
- `sdk/verify_integrity.py` — Reference JCS Engine (49/49 PASS)
- `sdk/gem0_semantic_scholar.py` — Academic source collection pipeline
- `sdk/narrative_generator/` — Full generation pipeline (step1–step5)
- `paper/narrative_quantification.tex` — arXiv-format LaTeX source
- `paper/narrative_quantification.pdf` — Compiled PDF
- `paper/narrative_quantification.md` — Markdown version
- `CONTRIBUTING.md` — Contribution guidelines

### Changed

- `README.md` — Rewritten to reflect full repository structure and RFC-style separation

### Protocol Notes

- Historical note (v4.1 era): `state_hash` was documented as `SHA256(JCS(TAG_01 ... TAG_24))`; **current** verifier uses TAG 01–34 excluding `state_hash` per 35TAG v6.0.0.
- `state_hash` field is self-referentially excluded from its own hash input
- All timestamps fixed to ISO 8601 UTC/Z format, seconds precision
- Official Implementation Hash: `3a5a3a9d1b13367621b5b34cc25a0d886a7da39ef91015a3f757ae37908602b8`

---

## [4.0.0] — 2026-02-18

### Added

- Initial JCS Engine implementation (RFC 8785 compliant)
- 35TAG lineage: early 24-field schema first definition (superseded by 35TAG v6.0.0)
- `verify_integrity.py` selftest: 49/49 PASS confirmed
- GitHub repository initialized: `GemminAI/Acta-AIIE`

### Protocol Notes

- First stable crystallization engine
- MIT License adopted
- Copyright holder: Gemmina Intelligence LLC.

---

_© 2026 Gemmina Intelligence LLC._
