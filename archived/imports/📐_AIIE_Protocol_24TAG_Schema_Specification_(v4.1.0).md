### **AIIE Protocol 24TAG Schema Specification (v4.1.0)**

- **Version:** 4.1.0
    
- **Compliance:** RFC 8785 (JSON Canonicalization Scheme)
    
- **Governance:** Acta AIIE Standardization Committee
    

#### **1. Abstract**

This specification defines the data types, value ranges, and integrity rules for the **"24TAG"** system—a framework that structures the entire process from information emergence to mathematical proof into a single JSON object. Data generated in compliance with this schema is guaranteed to produce an identical `state_hash` regardless of the computing environment.

#### **2. Data Structure Definitions**

**2.1 Category I: Identification & Base Context**

- **permanent_id**: Persistent identifier using the `gmn://` scheme. Regex: `^gmn://[0-9]{8}/[a-f0-9]{8}$`.
    
- **subject_origin**: The origin of the narrative. `enum: ["jp", "cn", "us", "uk", "qa", "eu"]`.
    
- **time_frame**: UTC timestamp in ISO 8601 format, fixed to the second.
    

**2.2 Category II: Dynamics & Structure**

- **strategic_interest_vector**: A 6-dimensional numerical vector (security, economy, tech, resource, ideology, environment). Range: `-1.0` to `1.0`.
    
- **epistemic_confidence**: AI-evaluated certainty of the information. Range: `0.0` to `1.0`.
    

**2.3 Category IV: Spillover & Risk**

- **conflict_factuality_index (CFI)**: Reliability metric based on physical contradictions (e.g., weather, shadows, GPS data). Range: `0.0` to `1.0`.
    

#### **3. Crystallization Rules**

Processors compliant with this specification **must** execute the following normalization procedures as a "Mandatory Protocol" before generating the `state_hash`:

1. **UTF-16 Key Sorting**: Sort JSON object keys in lexicographical order (UTF-16 code unit order).
    
2. **Numeric Normalization**: Convert IEEE 754 double-precision floating-point numbers into decimal strings compliant with ECMA-262, including exponential notation switching rules.
    
3. **Timestamp Fixation**: Datetime objects must terminate with a `Z` suffix to eliminate environment-dependent offsets.
    

#### **4. JSON Schema (Core Definition)**

JSON

```
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "AIIE Protocol 24TAG Schema",
  "version": "4.1.0",
  "type": "object",
  "required": [
    "permanent_id", "subject_origin", "predicate_type", "object_entity", 
    "location", "time_frame", "actor_role", "causality_direction", 
    "strategic_interest_vector", "epistemic_confidence", "bias_component", 
    "model_differential", "global_synthesis", "n_o_variants", 
    "source_credibility", "economic_transmission_path", "silence_reasons", 
    "precedent_audit", "conflict_factuality_index", "backbone_history", 
    "deep_dive", "audit_aura", "provenance_hash", "schema_version", 
    "state_hash"
  ],
  "properties": {
    "strategic_interest_vector": {
      "type": "object",
      "properties": {
        "security": { "type": "number", "minimum": -1, "maximum": 1 },
        "economy": { "type": "number", "minimum": -1, "maximum": 1 }
      }
    },
    "state_hash": {
      "type": "string",
      "pattern": "^[a-f0-9]{64}$",
      "description": "25th TAG: SHA-256 hash of JCS-normalized TAG01-24"
    }
  }
}
```

#### **🛡️ Implementation Obligations**

Developers must use the `selftest_vectors.json` provided in this repository to verify that their normalization engine passes all 49/49 test cases in their specific environment.