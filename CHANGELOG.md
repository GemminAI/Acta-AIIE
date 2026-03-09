# Changelog

All notable changes to the Acta AIIE Protocol are documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).  
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

---

## [4.1.0] — 2026-03-09

### Added
- `specs/24TAG_Standards_v4.1.0.md` — Full English specification of all 24 tags
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
- `state_hash` formula confirmed: `SHA256(JCS(TAG_01 ... TAG_24))`
- `state_hash` field is self-referentially excluded from its own hash input
- All timestamps fixed to ISO 8601 UTC/Z format, seconds precision
- Official Implementation Hash: `3a5a3a9d1b13367621b5b34cc25a0d886a7da39ef91015a3f757ae37908602b8`

---

## [4.0.0] — 2026-02-18

### Added
- Initial JCS Engine implementation (RFC 8785 compliant)
- 24TAG schema first definition
- `verify_integrity.py` selftest: 49/49 PASS confirmed
- GitHub repository initialized: `GemminAI/Acta-AIIE`

### Protocol Notes
- First stable crystallization engine
- MIT License adopted
- Copyright holder: Gemmina Intelligence LLC.

---

*© 2026 Gemmina Intelligence LLC.*
