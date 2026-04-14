# RFC-0015: JSON Canonicalization for Physical State Hashing
## AIIE v6.1 — Full RFC 8785 Compliance

| Field | Value |
|---|---|
| **ID** | RFC-0015 |
| **Status** | RATIFIED |
| **Date** | 2026-04-15 |
| **Authors** | Tomohiko Nakamura, Gemmina Intelligence LLC. |
| **Depends on** | RFC-0001 (ΔV), RFC-0006 (QFOM) |
| **Implements** | [RFC 8785 — JSON Canonicalization Scheme (JCS)](https://www.rfc-editor.org/rfc/rfc8785) |

---

## 1. Purpose

This RFC defines the canonical JSON serialization standard for all AIIE hash computations — specifically `jcs_hash` and `state_hash` in `v31_states_core`.

**The central requirement:**

> Same physical state → Always the same hash.  
> Different physical state → Always a different hash.

Laravel's built-in `json_encode()` does **not** satisfy RFC 8785. It produces unstable float representations, allows exponent notation, and does not enforce UTF-8 byte-order key sorting. Any implementation relying on `json_encode()` alone is non-compliant and will produce hash collisions or divergences across languages and environments.

---

## 2. RFC 8785 Requirements (Normative)

### 2.1 Object Key Ordering

Object keys MUST be sorted by UTF-8 byte order (equivalent to `strcmp()` on UTF-8 encoded strings).

```
{"b":2,"a":1}  →  {"a":1,"b":2}   ✅ correct
{"b":2,"a":1}  →  {"b":2,"a":1}   ❌ wrong (unsorted)
```

This applies recursively to all nested objects.

### 2.2 Number Normalization

Numbers MUST be serialized without exponent notation and without trailing zeros.

| Input | Canonical Output |
|---|---|
| `1.0` | `1` |
| `1.2300` | `1.23` |
| `0.000` | `0` |
| `1e+3` | `1000` |
| `0.5` | `0.5` |
| `1.000001` | `1.000001` |

Integers are serialized as integers (no decimal point).  
`NaN` and `Infinity` are **prohibited** and MUST raise an exception.

### 2.3 String Encoding

- UTF-8 encoding; multi-byte characters MUST NOT be escaped (`\uXXXX`) unless required by JSON specification.
- Unnecessary escape sequences are prohibited.
- Control characters (U+0000–U+001F) MUST be escaped.

### 2.4 Whitespace

No whitespace between tokens. No space after `:` or `,`.

```
{"a": 1, "b": 2}  →  ❌ spaces prohibited
{"a":1,"b":2}      →  ✅ correct
```

### 2.5 Array Ordering

Arrays MUST preserve their original element order. Array elements are **never sorted**.

```
[3,1,2]  →  [3,1,2]  ✅ preserved
[3,1,2]  →  [1,2,3]  ❌ never sort
```

### 2.6 Literals

`null`, `true`, `false` are serialized as-is.

---

## 3. AIIE-Specific Extensions

The following rules extend RFC 8785 to address AIIE-specific data types.

### 3.1 DateTime Normalization

All datetime values MUST be normalized to ISO 8601 UTC before canonicalization.

```
"2026-04-15 10:00:00"   →  "2026-04-15T10:00:00Z"   ✅
"2026-04-15T10:00:00"   →  "2026-04-15T10:00:00Z"   ✅
Carbon/DateTime objects →  "2026-04-15T10:00:00Z"   ✅
```

Rationale: Database datetime strings and PHP `DateTime` objects represent the same instant but serialize differently. Without normalization, the same physical event produces different hashes depending on the input format.

### 3.2 Null Exclusion

Keys with `null` values are excluded from the canonical payload before hashing.

```php
['t22_entropy' => 0.5, 't29_velocity' => null]
→  {"t22_entropy":0.5}   // t29_velocity excluded
```

Rationale: An unobserved quantity (null) and an absent key represent the same physical state — "not yet measured."

### 3.3 Float Precision

Floats are serialized to 15 significant digits maximum, with trailing zeros stripped. This is consistent with IEEE 754 double precision and PHP's `sprintf('%.15G', $f)` behavior after normalization.

```
0.500000000000000  →  0.5
0.123456789012345  →  0.123456789012345
```

---

## 4. Hash Definitions

### 4.1 `jcs_hash` — Physical State Identity

`jcs_hash` proves that two records represent the **same physical state** — same coordinates in narrative spacetime. It is computed over a fixed set of Core columns only.

```
jcs_hash = SHA-256( CanonicalJson( { T01, T02, T03, T04, T05, T06, T07, T08,
                                     T09×6, T22, T29, T30 } ) )
```

**Implication:**
- Same `jcs_hash` = same physical state (regardless of observation context)
- Different `jcs_hash` = different physical state (definitive)
- Collision of `jcs_hash` with different stored value = **tampering detected**

### 4.2 `state_hash` — Observation Fingerprint (T25)

`state_hash` is the complete crystallization fingerprint — it covers all Core columns including schema version and event identity. It corresponds to T25 in the 35TAG schema.

```
state_hash = SHA-256( CanonicalJson( ALL_CORE_COLUMNS \ {state_hash, jcs_hash} ) )
```

The fields `state_hash` and `jcs_hash` themselves are always excluded from the `state_hash` computation to prevent circular dependency.

### 4.3 Separation Rationale

| Hash | Covers | Purpose |
|---|---|---|
| `jcs_hash` | Physical coordinates only (T01–T09, T22, T29, T30) | Prove physical identity; detect tampering |
| `state_hash` (T25) | All Core columns minus hash fields | Crystallize full observation; RFC-0006 QFOM anchor |

This separation allows the same physical event observed from different namespaces (RFC-0006 §3) to share a `jcs_hash` while having distinct `state_hash` values. Conversely, a tampered physical value is immediately detectable by `jcs_hash` mismatch even if `state_hash` was regenerated.

---

## 5. Implementation

### 5.1 Recommended Approach

Use a dedicated RFC 8785 compliant library rather than a custom implementation.

**PHP:**
```bash
composer require spomky-labs/json-canonicalization
# or
composer require root23/php-json-canonicalization
```

**Python:**
```bash
pip install json-canonicalization
```

Custom implementations are permitted **only** if they pass the full test vectors in §6 and produce byte-identical output to the reference libraries across PHP and Python.

### 5.2 `CanonicalJson` — Reference Implementation (PHP)

```php
// App\Services\CanonicalJson.php

namespace App\Services;

/**
 * RFC 8785 (JCS) compliant canonical JSON encoder.
 *
 * Use this class only through JcsHasher.
 * Do not call json_encode() directly for any hash computation.
 */
class CanonicalJson
{
    public function encode(mixed $data): string
    {
        return $this->encodeValue($data);
    }

    private function encodeValue(mixed $value): string
    {
        if (is_null($value))  return 'null';
        if ($value === true)  return 'true';
        if ($value === false) return 'false';
        if (is_int($value))   return (string) $value;
        if (is_float($value)) return $this->encodeFloat($value);
        if (is_string($value))return $this->encodeString($value);

        if (is_array($value)) {
            return $this->isAssoc($value)
                ? $this->encodeObject($value)
                : $this->encodeArray($value);
        }

        // DateTime → normalize to ISO 8601 UTC (AIIE extension §3.1)
        if ($value instanceof \DateTimeInterface) {
            return $this->encodeString(
                $value->setTimezone(new \DateTimeZone('UTC'))->format('Y-m-d\TH:i:s\Z')
            );
        }

        throw new \InvalidArgumentException(
            'Unsupported type for canonical JSON: ' . gettype($value)
        );
    }

    /**
     * Object encoding: keys sorted by UTF-8 byte order (RFC 8785 §3.2.3)
     */
    private function encodeObject(array $obj): string
    {
        // UTF-8 byte order sort (strcmp on UTF-8 strings = byte order)
        uksort($obj, fn($a, $b) => strcmp($a, $b));

        $pairs = [];
        foreach ($obj as $k => $v) {
            $pairs[] = $this->encodeString((string) $k) . ':' . $this->encodeValue($v);
        }

        return '{' . implode(',', $pairs) . '}';
    }

    /**
     * Array encoding: preserve original order (RFC 8785 §3.2.2)
     */
    private function encodeArray(array $arr): string
    {
        $items = array_map(fn($v) => $this->encodeValue($v), $arr);
        return '[' . implode(',', $items) . ']';
    }

    /**
     * String encoding: UTF-8, minimal escaping (RFC 8785 §3.2.2.2)
     */
    private function encodeString(string $str): string
    {
        return json_encode($str, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
    }

    /**
     * Float encoding: no exponent notation, no trailing zeros (RFC 8785 §3.2.2.3)
     */
    private function encodeFloat(float $num): string
    {
        if (is_nan($num) || is_infinite($num)) {
            throw new \InvalidArgumentException(
                'NaN and Infinity are not valid in canonical JSON.'
            );
        }

        // Use PHP_FLOAT_DIG (15) significant digits — IEEE 754 double precision
        $formatted = rtrim(rtrim(sprintf('%.' . PHP_FLOAT_DIG . 'G', $num), '0'), '.');

        // Ensure no exponent notation slips through (e.g. "1E+3" → "1000")
        if (stripos($formatted, 'e') !== false) {
            $formatted = rtrim(rtrim(number_format($num, 15, '.', ''), '0'), '.');
        }

        return $formatted === '' ? '0' : $formatted;
    }

    /**
     * Distinguish sequential arrays from associative objects
     */
    private function isAssoc(array $arr): bool
    {
        return $arr !== [] && array_keys($arr) !== range(0, count($arr) - 1);
    }
}
```

### 5.3 `JcsHasher` — Hash Generation (PHP)

```php
// App\Services\JcsHasher.php

namespace App\Services;

/**
 * JcsHasher — AIIE physical state hashing via RFC 8785 canonical JSON.
 *
 * This class is the ONLY place where jcs_hash and state_hash are generated.
 * Called exclusively from EventWriter. Never from Controller or Model.
 */
class JcsHasher
{
    /**
     * Core column keys for jcs_hash computation.
     * Sorted in UTF-8 byte order — do NOT reorder.
     */
    private const JCS_KEYS = [
        't01_permanent_id',
        't02_subject_origin',
        't03_predicate_type',
        't04_object_entity',
        't05_location',
        't06_time_frame',
        't07_actor_role',
        't08_causality',
        't09_siv_economy',      // T09 keys in byte order
        't09_siv_environment',
        't09_siv_ideology',
        't09_siv_resource',
        't09_siv_security',
        't09_siv_tech',
        't22_entropy',
        't29_velocity',
        't30_curvature',
    ];

    private const STATE_HASH_EXCLUDE = ['state_hash', 'jcs_hash', 'created_at'];

    public function __construct(
        private readonly CanonicalJson $canon
    ) {}

    /**
     * Generate jcs_hash — physical state identity proof.
     * Covers Core coordinate columns only.
     */
    public function hash(array $input): string
    {
        $payload = [];

        foreach (self::JCS_KEYS as $key) {
            // Null exclusion (AIIE extension §3.2)
            if (array_key_exists($key, $input) && $input[$key] !== null) {
                $payload[$key] = $this->normalizeValue($input[$key]);
            }
        }

        // uksort enforces UTF-8 byte order (redundant here since JCS_KEYS is pre-sorted,
        // but kept as a safety net against future key additions)
        uksort($payload, fn($a, $b) => strcmp($a, $b));

        return hash('sha256', $this->canon->encode($payload));
    }

    /**
     * Generate state_hash (T25) — full observation fingerprint.
     * Covers all Core columns except hash fields themselves.
     */
    public function stateHash(array $input): string
    {
        $payload = [];

        foreach ($input as $key => $value) {
            if (in_array($key, self::STATE_HASH_EXCLUDE, true)) continue;
            if ($value === null) continue;  // null exclusion

            $payload[$key] = $this->normalizeValue($value);
        }

        uksort($payload, fn($a, $b) => strcmp($a, $b));

        return hash('sha256', $this->canon->encode($payload));
    }

    /**
     * Normalize a value before canonicalization (AIIE extensions §3.1, §3.3)
     */
    private function normalizeValue(mixed $value): mixed
    {
        // DateTime → ISO 8601 UTC string
        if ($value instanceof \DateTimeInterface) {
            return $value->setTimezone(new \DateTimeZone('UTC'))
                         ->format('Y-m-d\TH:i:s\Z');
        }

        // Datetime string → normalize format
        if (is_string($value) && $this->looksLikeDatetime($value)) {
            try {
                return (new \DateTime($value, new \DateTimeZone('UTC')))
                    ->format('Y-m-d\TH:i:s\Z');
            } catch (\Exception) {
                // Not a parseable date — treat as plain string
            }
        }

        // Nested arrays → recurse
        if (is_array($value)) {
            foreach ($value as $k => $v) {
                $value[$k] = $this->normalizeValue($v);
            }
            return $value;
        }

        return $value;
    }

    private function looksLikeDatetime(string $s): bool
    {
        return (bool) preg_match('/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}/', $s);
    }
}
```

### 5.4 Python Counterpart

The Python implementation MUST produce byte-identical output.

```python
# causal_integrity.py

import hashlib
from json_canonicalization import canonicalize  # pip install json-canonicalization
from typing import Any, Dict
from datetime import datetime, timezone

JCS_KEYS = sorted([
    't01_permanent_id', 't02_subject_origin', 't03_predicate_type',
    't04_object_entity', 't05_location', 't06_time_frame', 't07_actor_role',
    't08_causality',
    't09_siv_economy', 't09_siv_environment', 't09_siv_ideology',
    't09_siv_resource', 't09_siv_security', 't09_siv_tech',
    't22_entropy', 't29_velocity', 't30_curvature',
])

STATE_HASH_EXCLUDE = {'state_hash', 'jcs_hash', 'created_at'}


def _normalize(value: Any) -> Any:
    """Normalize a value for canonical JSON (AIIE extensions)."""
    if isinstance(value, datetime):
        return value.astimezone(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
    if isinstance(value, str) and _looks_like_datetime(value):
        try:
            dt = datetime.fromisoformat(value.replace('Z', '+00:00'))
            return dt.astimezone(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
        except ValueError:
            pass
    if isinstance(value, dict):
        return {k: _normalize(v) for k, v in value.items()}
    return value


def _looks_like_datetime(s: str) -> bool:
    import re
    return bool(re.match(r'^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}', s))


def calculate_jcs_hash(tags: Dict[str, Any]) -> str:
    """Generate jcs_hash — physical state identity proof."""
    payload = {
        k: _normalize(tags[k])
        for k in JCS_KEYS
        if k in tags and tags[k] is not None  # null exclusion
    }
    return hashlib.sha256(canonicalize(payload)).hexdigest()


def calculate_state_hash(tags: Dict[str, Any]) -> str:
    """Generate state_hash (T25) — full observation fingerprint."""
    payload = {
        k: _normalize(v)
        for k, v in tags.items()
        if k not in STATE_HASH_EXCLUDE and v is not None
    }
    return hashlib.sha256(canonicalize(payload)).hexdigest()
```

---

## 6. Test Vectors

These vectors MUST produce identical output in both PHP and Python. Any implementation that fails these vectors is non-compliant.

### 6.1 Number Normalization

| Input (PHP) | Expected Canonical | Expected SHA-256 prefix |
|---|---|---|
| `['v' => 1.0]` | `{"v":1}` | `5f9c4ab0...` |
| `['v' => 1.23]` | `{"v":1.23}` | — |
| `['v' => 0.0]` | `{"v":0}` | — |
| `['v' => 1000.0]` | `{"v":1000}` | — |
| `['v' => 0.5]` | `{"v":0.5}` | — |

### 6.2 Key Ordering

```
Input:  {"b":2,"a":1}
Output: {"a":1,"b":2}
```

### 6.3 Null Exclusion (AIIE)

```
Input:  {"t22_entropy":0.5,"t29_velocity":null}
Output: {"t22_entropy":0.5}
```

### 6.4 DateTime Normalization (AIIE)

```
Input:  {"t06_time_frame":"2026-04-15 10:00:00"}
Output: {"t06_time_frame":"2026-04-15T10:00:00Z"}

Input:  {"t06_time_frame":"2026-04-15T10:00:00"}
Output: {"t06_time_frame":"2026-04-15T10:00:00Z"}
```

### 6.5 Cross-Language Parity

The following PHP and Python calls MUST produce identical hex strings:

**PHP:**
```php
$hasher = new JcsHasher(new CanonicalJson());
$hash = $hasher->hash([
    't01_permanent_id' => 'gmn://20260415/abc12345',
    't22_entropy'      => 0.45,
    't06_time_frame'   => '2026-04-15T10:00:00',
]);
```

**Python:**
```python
hash_val = calculate_jcs_hash({
    't01_permanent_id': 'gmn://20260415/abc12345',
    't22_entropy':       0.45,
    't06_time_frame':   '2026-04-15T10:00:00',
})
```

**Expected:** Both MUST return the same 64-character hex string.  
Run this as a CI integration test before any production deployment.

---

## 7. Compliance Checklist

| Requirement | Source | Status |
|---|---|---|
| Object keys sorted by UTF-8 byte order | RFC 8785 §3.2.3 | Required |
| No exponent notation in numbers | RFC 8785 §3.2.2.3 | Required |
| No trailing zeros in floats | RFC 8785 §3.2.2.3 | Required |
| No whitespace between tokens | RFC 8785 §3.2 | Required |
| Array order preserved | RFC 8785 §3.2.1 | Required |
| `null`/`true`/`false` as literals | RFC 8785 §3.2.2 | Required |
| Minimal string escaping (UTF-8 preserved) | RFC 8785 §3.2.2.2 | Required |
| DateTime normalized to ISO 8601 UTC | AIIE §3.1 | Required |
| Null values excluded from payload | AIIE §3.2 | Required |
| `NaN`/`Infinity` raise exception | RFC 8785 §3.2.2.3 | Required |
| `jcs_hash` and `state_hash` fields excluded from `state_hash` | AIIE §4.2 | Required |
| PHP ↔ Python output byte-identical | AIIE §6.5 | Required |

---

## 8. Security Properties

### 8.1 Tamper Detection via `jcs_hash`

If `jcs_hash` in a stored record does not match the recomputed value from its own columns, the physical state has been tampered with. The detection query:

```sql
-- Run as a scheduled integrity check
SELECT state_hash, jcs_hash
FROM v31_states_core
WHERE jcs_hash != :recomputed_jcs_hash_for_this_row;
```

### 8.2 Why External `jcs_hash` Input Is Prohibited

An attacker who can supply `jcs_hash` can store any value for it, defeating tamper detection. Therefore:

- `EventWriter` always overwrites any externally supplied `jcs_hash` / `state_hash`.
- `EventController` does not accept `jcs_hash` or `state_hash` as request parameters.
- The validator explicitly omits these fields.

### 8.3 Uniqueness Guarantee

`UNIQUE KEY uk_jcs (jcs_hash)` on `v31_states_core` ensures that no two records can claim the same physical state identity. An `insertOrIgnore` on an existing `jcs_hash` is silently skipped (idempotent); an insert with a mismatched `jcs_hash` for the same `state_hash` is logged as a critical integrity violation.

---

## 9. Relationship to Existing RFCs

| RFC | Relationship |
|---|---|
| RFC-0001 (ΔV) | ΔV distances are computed from state vectors sealed by `jcs_hash` |
| RFC-0005 (T22 Entropy-Shift) | `t22_entropy` (float) is a JCS_KEY; its canonical form is defined here |
| RFC-0006 (QFOM) | `state_hash` (T25) is the QFOM crystallization anchor; its generation is defined here |
| RFC-0013 (Identity) | `jcs_hash` uniqueness guarantees physical identity across namespace transformations |

---

*Gemmina Intelligence LLC. — Pure Information Laboratory*  
*"A physical quantity is only a physical quantity if it hashes identically regardless of who observes it."*

*End of RFC-0015*
