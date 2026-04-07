# Archived specifications (pre–35TAG v6.0.0)

This folder preserves **superseded** drafts for historical traceability. **Normative** definitions live in:

- `specs/35TAG_Standard_v6.0.0.md` — canonical 35TAG v6.0.0
- `specs/Acta_AIIE_Protocol_Definition_v1.0.0.md` — Acta AIIE Protocol v1.0.0

## Contents

| Path | Note |
|------|------|
| `specs/24TAG_Standards_v4.1.0.md` | Legacy 24-field draft (v4.1.0). Do not implement new systems against this file. |
| `imports/*.md` | Archived copies of old import mirrors. |

**T25 (`state_hash`) today:** SHA-256 of RFC 8785 JCS over **TAG 01–34** excluding `state_hash`; TAG 35 is not in the anchor payload. See `sdk/tag_v6.py` and `sdk/verify_integrity.py`.
