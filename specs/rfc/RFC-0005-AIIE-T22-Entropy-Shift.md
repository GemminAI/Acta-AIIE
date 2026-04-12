# RFC-0005: T22 Entropy-Shift

## Phase Transition from `epistemic_diffusion_state` to `informational_entropy` ($H_0$)

| Field | Value |
|-------|-------|
| **ID** | RFC-0005 |
| **Status** | RATIFIED |
| **Date** | 2026-04-12 |
| **Authors** | Tomohiko Nakamura, Gemmina Intelligence LLC. |
| **Supersedes** | T22 definition in 35TAG_Standard_v6.0.0.md |
| **Related** | [`../35TAG_Standard_v6.0.1.md`](../35TAG_Standard_v6.0.1.md), RFC-0006 (QFOM) |

---

## 1. Motivation

A full cross-document audit on 2026-04-12 revealed a breaking inconsistency in the T22 slot.

| Document | T22 field name | Type | Role |
|----------|----------------|------|------|
| 35TAG_Standard_v6.0.0.md | `epistemic_diffusion_state` | enum | UI state label |
| narrative_compiler.py (BASE_TAG_KEYS) | `informational_entropy` | float | Physical quantity $H_0$ |
| 01_data_layer_v2.md | `informational_entropy` | float | Physical quantity $H_0$ |

`narrative_compiler.py` and `01_data_layer_v2.md` were already consistent with `informational_entropy`, while `35TAG_Standard_v6.0.0.md` alone retained the legacy definition `epistemic_diffusion_state` (enum).

---

## 2. Breaking Change

### DEPRECATED

T22: epistemic_diffusion_state  
Type:   enum (Crystallized | Diffused | Polarized | ...)  
Role:   UI color / state label  
Reason: Presentation-layer concepts must not be embedded in the data layer (T01–T25)

### ADOPTED

T22: informational_entropy  
Type:   float (0.0 – 1.0)  
Role:   Initial informational entropy H₀ of the source text  
Reason: The T35 v2 temperature formula T(H) = 0.1 + 0.9·H₀ requires a continuous value

---

## 3. Physical Rationale

Temperature variable of the T35 v2 Thermodynamic Decision Engine:

$$T(H) = 0.1 + 0.9 \cdot H_0$$

This formula mandates that T22 be a continuous value (float). A qualitative enum label cannot serve as input to the thermodynamic engine.

In the context of RFC-0006 (QFOM): T22 represents sensor sensitivity that measures the spread of the wave function (uncertainty), quantifying the resolution of the observation.

---

## 4. Migration Protocol "Entropy-Shift"

| Phase | Condition | T22 key accepted | Hash behavior |
|-------|-----------|------------------|---------------|
| Legacy | `schema_version < 6.0.0` | `epistemic_diffusion_state` (enum) | Existing hashes preserved |
| Current | `schema_version = 6.0.0` | `informational_entropy` (float) | New hashes generated |

- `audit_aura` is retained as a non-hashed independent column in `narrative_articles` for UI rendering. It MUST NOT appear in the JCS preimage.
- DB migration: `narrative_states.t22_audit_aura` → `t22_informational_entropy` (float) is deferred to PHASE D.
- Laravel `EventController.store()` determines new/legacy schema via `schema_version`.
- Existing 8,192 records will NOT be retroactively re-hashed.

---

## 5. Implementation Impact

| Target | Change |
|--------|--------|
| `35TAG_Standard_v6.0.1.md` | T22 updated to `informational_entropy` (this RFC applied) |
| `narrative_compiler.py` | No change required (already consistent) |
| `sdk/tag_v6.py` | Updated to `informational_entropy: 0.5` |
| `gemminai-next/src/lib/tag35FieldOrder.ts` | Updated |
| `gemminai-next/src/lib/server/laravelV1Events.ts` | `informational_entropy` priority with legacy enum fallback |
| `generate_24tag()` prompt | Entropy calculation instruction to be added (PHASE A) |

---

## 6. Definition of Success

- New articles generated with `schema_version = 6.0.0` carry `informational_entropy` (float) in `aiie_tags`.
- `narrative_compiler.py` generates `state_hash` using `informational_entropy` as part of `BASE_TAG_KEYS`.
- The `state_hash` of existing 8,192 records remains unchanged (immutability preserved across migration).

---

*Gemmina Intelligence LLC. — Pure Information Laboratory*

*"To resist the heat death of information, measure entropy."*
