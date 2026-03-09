# Acta AIIE JCS SDK: The Crystallization Engine

**Status:** Official Implementation v1.0.0 (Candidate)  
**Standards:** RFC 8785 (JSON Canonicalization Scheme)  
**Official Implementation Hash:** `3a5a3a9d1b13367621b5b34cc25a0d886a7da39ef91015a3f757ae37908602b8`

---

## 1. Objective

Within the AIIE Protocol, the reliability of information is anchored by mathematical immutability. This SDK provides the normalization logic required to transition 24TAG JSON data into an "absolute-zero crystal" — enabling the generation of a `state_hash` with zero-bit variance across all compliant systems.

---

## 2. Technical Specifications

To eliminate the ambiguities inherent in standard libraries (such as Python's default JSON encoder), this SDK implements the following rigorous processing rules:

### 2.1 UTF-16 Key Sorting

Sorts dictionary keys in binary (UTF-16 code unit) order. This guarantees a deterministic, environment-independent key sequence regardless of the runtime or locale.

### 2.2 Numeric Serialization (ECMA-262 Compliant)

Executes numeric conversion in compliance with ECMA-262 (the JavaScript standard) to eliminate floating-point representation errors.

Key behaviors:
- `-0.0` is normalized to positive zero.
- Safe Integer boundary (2^53 - 1) is enforced.
- Exponential notation is applied at exactly 10^21 and 10^-7 thresholds.

### 2.3 Data Integrity Enforcement ("Silence")

Immediately raises a `ValueError` upon detecting invalid data types — such as `NaN`, `Infinity`, or lone Unicode surrogates — to ensure the absolute purity of the output. Compromise is not an option.

---

## 3. Implementation Reference (Python)

Standard implementation for generating a `state_hash` within environments such as GCP Cloud Functions:

```python
import hashlib
from acta_aiie_jcs import jcs_engine_serialize

def generate_state_hash(tags_dict: dict) -> str:
    """
    Generates a cryptographic fingerprint with zero-bit tolerance.

    Pre-conditions:
    - All float values must be converted to Decimal before calling this function.
    - All datetime objects must be formatted as ISO 8601 (UTC/Z):
      "YYYY-MM-DDTHH:mm:ssZ"
    - The state_hash field itself must NOT be included in tags_dict.
      (Self-referential exclusion prevents circular hash dependencies.)

    Returns:
        A 64-character lowercase hexadecimal SHA-256 hash string.
    """
    # Step 1: RFC 8785-compliant serialization (Crystallization)
    # - UTF-16 key sort
    # - ECMA-262 numeric serialization
    # - Lone surrogate detection
    jcs_string = jcs_engine_serialize(tags_dict)

    # Step 2: SHA-256 hashing
    return hashlib.sha256(jcs_string.encode('utf-8')).hexdigest()
```

### Crystallization Sequence (Pre-Save)

The correct order of operations before writing to the database:

```python
# 1. Data purity: normalize all numerics and timestamps
normalized = prepare_data(raw_tags_dict)
# - float → decimal.Decimal
# - datetime → "YYYY-MM-DDTHH:mm:ssZ"

# 2. Compute state_hash against in-memory data structure
# (CRITICAL: hash must be computed BEFORE the DB write,
#  against the exact data structure being stored)
state_hash = generate_state_hash(normalized)

# 3. Seal: attach hash to the payload
normalized["state_hash"] = state_hash

# 4. Transmit to Laravel / write to DB
```

---

## 4. Why Compute the Hash Before the DB Write?

When data is received by a Cloud Function, Python's standard library automatically converts `0.1` in JSON to a float with representation `0.10000000000000000555...`. If this is stored to the database as-is and the hash is computed later (after a DB read), the value retrieved by the DB driver may differ in type or precision — producing a non-matching hash.

**Rule:** The `state_hash` must always be calculated against **the in-memory data structure at the moment before the DB write**. Never compute the hash from data that has passed through a serialization/deserialization cycle.

---

## 5. Timestamp Handling

All `datetime` objects in a payload are incompatible with the JCS engine and must be converted to strings first.

**Specification:**
- Format: `YYYY-MM-DDTHH:mm:ssZ`
- Timezone: Always UTC. Use `Z` suffix — never `+09:00` or other offsets.
- Precision: Fixed to seconds. Milliseconds and microseconds are stripped.

```python
from datetime import timezone, datetime

def to_jcs_timestamp(dt: datetime) -> str:
    """Convert datetime to JCS-compatible ISO 8601 string."""
    return dt.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
```

---

## 6. Integrity Verification

The self-referential exclusion design creates a **one-way cognitive seal**:

```
state_hash = SHA256(JCS({TAG_01 ... TAG_24}))
             ─────────────────────────────────
             state_hash field is NOT included
             in the input to its own calculation
```

A receiver can verify any 24TAG object by:

1. Temporarily removing the `state_hash` field from the received data.
2. Re-running the JCS serialization and SHA-256 process on the remaining 24 tags.
3. Comparing the re-calculated hash against the original `state_hash` field.

Any divergence indicates that the narrative structure was modified or corrupted after crystallization.

---

## 7. Test Vector Compliance

This repository includes `selftest_vectors.json` containing the 49 official RFC 8785 test vectors. An environment is only certified for crystallization once it passes all 49 cases.

```
Test result: 49/49 PASS
```

Developers integrating this SDK into a new environment must run `selftest_vectors.json` and confirm full compliance before using the engine in production.

---

## 8. Roadmap

| Component | Status |
|-----------|--------|
| Python SDK | Reference Implementation — Complete |
| TypeScript SDK | For frontend hash verification — In Development |
| PHP/Laravel SDK | For storage-layer immutability checks — In Development |

---

*© 2026 Gemmina Intelligence LLC.*  
*Official Implementation Hash: `3a5a3a9d1b13367621b5b34cc25a0d886a7da39ef91015a3f757ae37908602b8`*
