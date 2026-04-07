# AIIE Protocol Specification: The 24TAG Standards (v4.1.0)

**Governance:** Acta AIIE Standardization Committee  
**Compliance:** RFC 8785 (JSON Canonicalization Scheme)  
**Implementation Reference:** Gemmina Intelligence JCS Engine v1.0.0

---

## 1. Abstract

This specification defines the data structure "24TAG" within the Acta AIIE Protocol (Artificial Intelligence Intent Encapsulation). The 24TAG structure packs the entire process — from the emergence of information through multi-angle auditing, narrative generation, and mathematical proof — into a single JSON object.

---

## 2. The 25th Hash: `state_hash` (The Ultimate Anchor)

After all 24 tags are populated, the final artifact is the **25th Hash**.

- **Definition:** A SHA-256 hash of the JCS-normalized string of TAG 01–24, compliant with RFC 8785.
- **Physical Meaning:** If this hash does not match, the information is considered "incomplete" or "tampered."
- **Role:** The cryptographic fingerprint of information within the GemminAI ecosystem — the minimum unit inscribed onto blockchains or distributed ledgers.

---

## Category I: Identification & Base Context

> *"Where did this information originate, and when was it fixed?"*

The purpose of this category is to make it physically impossible for information to be "lost" or "impersonated." It assigns precise real-world coordinates — ID, origin, subject, object, location, and time — to every AI-generated narrative.

### 01. `permanent_id` — Persistent Identifier

- **Definition:** A globally unique identifier using the `gmn://` scheme.
- **Technical Spec:** Combines the issuance date with a hash fragment. Guarantees the identity of information permanently without depending on any specific server or domain.
- **Significance:** Functions as a "digital registry entry" — analogous to an academic DOI — allowing any external AI or archival system to uniquely identify the information decades into the future.

### 02. `subject_origin` — Narrative Origin

- **Definition:** The country or region that serves as the "subject" of the information.
- **Allowed Values:** `jp`, `cn`, `us`, `uk`, `qa`, `eu` (extensible to BRICS, etc.)
- **Significance:** Dispels the fiction of "objective news" by explicitly declaring which perspective (narrative) the information is constructed from. This transforms informational bias from something to be hidden into an object of analysis.

### 03. `predicate_type` — Predicate Verb Classification

- **Definition:** Classification of the action that determines the nature of the event.
- **Examples:** `declare`, `sanction`, `invest`, `conflict`, etc.
- **Significance:** Decomposes complex news text into a logical structure — "Who (Subject) did What (Predicate) to Whom (Object)" — that AI can interpret and reason over.

### 04. `object_entity` — Target Entity

- **Definition:** The target affected by the action or event.
- **Content:** Nation-states, corporations, individuals, or specific project names.
- **Significance:** Clarifies the "beneficiaries" and "victims" of an event, providing the key for the Narrative Compiler to extract causal relationships.

### 05. `location` — Geographic Context

- **Definition:** The physical location where the event occurred.
- **Technical Spec:** Country name, city name, or geotag (coordinates) as needed.
- **Significance:** A physical anchor for calculating the "geopolitical weight" of information.

### 06. `time_frame` — Temporal Boundary

- **Definition:** The precise date and time when the event occurred or was recorded.
- **Technical Spec:** ISO 8601 format, UTC (Z) fixed, precision to the second.
- **Significance:** A critical variable in hash generation within the JCS Engine. Eliminates temporal ambiguity and mathematically fixes "at what point in time was this true."

> **Committee Note:** Only when these six tags are in place does information become a "computable object." What traditional media accomplishes with a headline, the AIIE Protocol executes as "fixing a physical constant."

---

## Category II: Dynamics & Structure

> *"Quantifying the causal relationships of information and the direction of strategic vectors."*

The purpose of this category is not mere text summarization, but to describe in AI-computable numbers and logic the precise stress that a given event places on the structure of the world.

### 07. `actor_role` — Actor Classification

- **Definition:** Attribute classification of the entity that drove the event.
- **Examples:** `state`, `corporation`, `individual`, `algo` (algorithm/autonomous system), etc.
- **Significance:** Clarifies who moved the chessboard. In an era where the influence of nation-states and mega-tech corporations is inverting, recording the power balance of actors is indispensable for auditing power structures.

### 08. `causality_direction` — Causal Direction

- **Definition:** Defines the "position" of an event on the temporal axis.
- **Allowed Values:** `upstream` (cause/trigger), `midstream` (ongoing situation), `downstream` (ripple effect/outcome).
- **Significance:** Captures news as a line rather than a point. By defining whether a given event was the "cause" of another or emerged as a "result," the Narrative Compiler can construct a vast causal graph.

### 09. `strategic_interest_vector` — Strategic Interest Vector

- **Definition:** Numerical quantification of impact across six major value axes.
- **Technical Spec:** Each dimension of `{"security": 0.0, "economy": 0.0, "tech": 0.0, "resource": 0.0, "ideology": 0.0, "environment": 0.0}` expressed as -1.0 to 1.0.
- **Significance:** Retains the multi-dimensional impact of an event — e.g., "positive for security, negative for the economy" — as a vector. This makes the "distortion" between competing national narratives (02. subject_origin) numerically visible.

### 10. `epistemic_confidence` — Epistemic Confidence

- **Definition:** An AI self-assessment of how "certain (Fact)" the information is.
- **Technical Spec:** `float (0.0–1.0)`
- **Significance:** Quantifies from 100% certainty (1.0) down to an unverified rumor (0.1). Embeds the intellectual honesty of "stating what is unknown alongside its probability of being unknown" into the data structure itself. Serves as the calculation base for TAG 19 (CFI Score).

> **Committee Note:** Category II is the "physics" of information. By treating events not as mere "occurrences" but as "vectors" moving through multi-dimensional space, AI gains the ability to calculate the "mass" of information for the first time.

---

## Category III: Bias & Audit

> *"Visualizing informational distortion and multi-angle triangulation of truth by multiple AIs."*

The purpose of this category is to extract the "intent" behind information and generate "audited truth" that does not depend on the judgment of a single AI.

### 11. `bias_component` — Bias Components

- **Definition:** Identification of "emotional/leading words" in the text and missing perspectives.
- **Technical Spec:** `{"emotional_load": 0.0–1.0, "perspective_center": "string", "missing_viewpoints": ["string"]}`
- **Significance:** Structures whose interests are being represented and "what is deliberately left unsaid." This allows readers to perceive the "seasoning" of information as a separate layer.

### 12. `model_differential` — Three-Body AI Differential

- **Definition:** Simultaneous audit records from three independent AI models — **Gem (structure) / Kuro (narrative) / Chap (precedent)**.
- **Content:**
  - `consensus`: Undeniable facts agreed upon by all models.
  - `conflict`: Points where interpretations diverge and remain contestable.
- **Significance:** By deliberately recording the "collisions" of three different algorithms, the "fault lines" within information are brought to the surface.

### 13. `global_synthesis` — Global Synthesis

- **Definition:** A summary of the "points of contention" where national claims clash.
- **Significance:** Connects scattered facts and articulates in approximately 400 characters the "essential question" that the event poses to the world.

### 14. `n_o_variants` — Narrative Origin Variants (6-Country Perspectives)

- **Definition:** For the same event, independently reconstructed ~1,400-character texts from the perspective of each of jp / cn / us / uk / qa / eu.
- **Significance:** This is not translation. It is the parallel generation of "truth written in American logic" alongside "truth written in Chinese logic." By switching between these, users physically experience the multi-layered nature of the world.

### 15. `source_credibility` — Source Credibility

- **Definition:** Scoring based on the historical credibility track record of the cited media or primary source.
- **Technical Spec:** `float (0.0–1.0)`
- **Significance:** A weighting mechanism to distinguish anonymous social media posts from official public records. A critical variable in the CFI Score calculation.

> **Committee Note:** Category III is the codification of "journalistic ethics" for the AI age. We do not demand "neutrality" from AI. Instead, we command AI to expose all bias to the full light of day.

---

## Category IV: Impact & Risk

> *"Quantifying the chain reactions triggered by an event and the physical contradictions within information."*

The purpose of this category is to predict the "vibration" that information will send through society, the economy, and security — while simultaneously eliminating the "fabrication risk" of the information itself.

### 16. `economic_transmission_path` — Economic Transmission Path

- **Definition:** Description of the "pathways" through which an event propagates to markets, supply chains, or specific industry sectors.
- **Significance:** Visualizes the "nervous system of the economy" — how a rise in crude oil prices isn't merely news, but specifically elevates which semiconductor manufacturer's costs and feeds into which nation's inflation rate.

### 17. `silence_reasons` — Strategic Silence Reasons

- **Definition:** The fact that specific countries or media are "not reporting" on an event, along with background analysis.
- **Significance:** What is left unsaid carries as much intent as what is said. The protocol scans the reporting status of major national media and surfaces the strategic intentions of forces that are deliberately silent.

### 18. `precedent_audit` — Institutional Precedent & Legal Risk

- **Definition:** Cross-referencing with past international law, treaties, or analogous historical precedents.
- **Significance:** Evaluates how the event could become a trigger for future legal regulation or international conflict. The defining field representing Gemmina Intelligence LLC's "governance audit" function.

### 19. `conflict_factuality_index` — CFI Score

- **Definition:** A proprietary reliability index that subtracts "physical contradictions" found in text, images, metadata, GPS, and timestamps as penalties.
- **Technical Spec:** Starting from a perfect score of 1.0, deductions are applied each time Exif data forgery or discrepancies between claims and physical phenomena (weather, shadow direction, etc.) are detected.
- **Significance:** Exposes "plausible lies" through the inconsistency of physical evidence. The last line of defense for mathematically guaranteeing the "factuality" of information.

> **Committee Note:** Category IV is the "immune system" of information. By foreseeing future risks and blocking disinformation through physical contradictions, the AIIE Protocol evolves from a mere information transmission medium into a "high-precision sensor" for decision-making.

---

## Category V: Content & Presentation

> *"Mapping multi-dimensional truth onto an intuitive and honest UI."*

The purpose of this category is to define the formats through which the vast analytical results of AI can be "experienced" without squandering the user's cognitive resources.

### 20. `backbone_history` — Historical Background

- **Definition:** A condensed account of the causal chain spanning the past several decades leading to the current event.
- **Technical Spec:** Approximately 1,000 characters.
- **Significance:** Presents news not as an "isolated occurrence" but as a "continuum" of history. Readers can instantly grasp which past causality the present event is inheriting.

### 21. `deep_dive` — Deep Dive Analysis

- **Definition:** Long-form content covering specialized context, technical background, or geopolitical detail.
- **Technical Spec:** Approximately 1,400 characters.
- **Significance:** For users with high intellectual curiosity who are not satisfied with summaries, this is the gateway into the depths of information — constructed by mobilizing all evidence gathered by the Narrative Compiler.

### 22. `audit_aura` — Audit Aura

- **Definition:** Color and luminosity definitions for the frontend UI that visualize credibility and the degree of narrative conflict.
- **Technical Spec:**
  - `White → Sky Blue` — High-confidence, high-purity truth.
  - `Pale Green` — Divergence exists between narrative perspectives.
  - `Amber → Red` — Physical contradictions (CFI) have been detected.
- **Significance:** Implementation of an "honest UI" that allows users to intuitively perceive the "texture (credibility)" of information before reading any text.

> **Committee Note:** Category V is the "translation" of information. Rather than leaving the results of sophisticated mathematical and logical processing as cold data, we compile them into expressions that serve as "cognitive guide-lines" for human understanding.

---

## Category VI: Immutability & Security

> *"Mathematically proving the immutability of information and physically fixing the narrative."*

The purpose of this category is to eliminate "fluctuation" from AI-generated information and etch it into the world as a "digital inscription" that tolerates zero bits of tampering.

### 23. `provenance_hash` — Intermediate Provenance Hash

- **Definition:** An intermediate verification hash covering all data in Categories I through V (TAGs 01–22).
- **Technical Spec:** Generated by concatenating 22 fields in a specific order and applying SHA-256.
- **Significance:** Proves the "purity of the materials" before entering the final compilation phase. A checkpoint guaranteeing that each category has been correctly processed.

### 24. `schema_version` — Schema Version

- **Definition:** The version of this protocol specification (e.g., `4.1.0`).
- **Technical Spec:** Compliant with Semantic Versioning.
- **Significance:** A "decryption key" specifying which logic (algorithm) the data was compiled with — allowing AI systems and software decades in the future to accurately parse it.

---

## 25. Final Stage: The Narrative Compiler

> *"The final ritual that integrates 24 components and crystallizes truth."*

- **Definition:** The process of strictly normalizing all fields 01–24 per **RFC 8785 (JCS: JSON Canonicalization Scheme)** and hashing the entire resulting string with **SHA-256** to produce the **`state_hash`**.
- **Physical Meaning:**
  1. **Crystallization:** Tolerates not even a single half-width space or newline of difference, converting data into a one-of-a-kind "crystal."
  2. **Fixation of Intent:** The moment this hash is generated, the "intent" of Gemmina Intelligence LLC is physically fixed. Any subsequent modification is recorded as a "different hash" — meaning tampering is instantly detectable.
  3. **Chain of Trust:** This `state_hash` is the "certificate of truth" distributed from the Hostinger server to clients worldwide and to the GitHub repository.

---

## JSON Schema Definition

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "AIIE 24TAG + 1 Narrative Crystal",
  "description": "Standard schema for the Gemmina Intelligence LLC. Acta AIIE Protocol",
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
    "permanent_id": {
      "type": "string",
      "pattern": "^gmn://[0-9]{8}/[a-f0-9]{8}$",
      "description": "TAG 01: Persistent Identifier (gmn://YYYYMMDD/hash8)"
    },
    "subject_origin": {
      "type": "string",
      "enum": ["jp", "cn", "us", "uk", "qa", "eu"],
      "description": "TAG 02: Narrative origin (subject country)"
    },
    "time_frame": {
      "type": "string",
      "format": "date-time",
      "description": "TAG 06: ISO 8601 (UTC/Z) timestamp"
    },
    "strategic_interest_vector": {
      "type": "object",
      "properties": {
        "security":    { "type": "number", "minimum": -1, "maximum": 1 },
        "economy":     { "type": "number", "minimum": -1, "maximum": 1 },
        "tech":        { "type": "number", "minimum": -1, "maximum": 1 },
        "resource":    { "type": "number", "minimum": -1, "maximum": 1 },
        "ideology":    { "type": "number", "minimum": -1, "maximum": 1 },
        "environment": { "type": "number", "minimum": -1, "maximum": 1 }
      },
      "description": "TAG 09: 6-dimensional strategic interest vector"
    },
    "epistemic_confidence": {
      "type": "number",
      "minimum": 0,
      "maximum": 1,
      "description": "TAG 10: Epistemic confidence (AI self-assessment)"
    },
    "model_differential": {
      "type": "object",
      "properties": {
        "consensus": { "type": "array", "items": { "type": "string" } },
        "conflict":  { "type": "array", "items": { "type": "string" } }
      },
      "description": "TAG 12: Three-body AI differential (consensus and conflict)"
    },
    "conflict_factuality_index": {
      "type": "number",
      "minimum": 0,
      "maximum": 1,
      "description": "TAG 19: CFI Score (penalty-subtracted physical contradiction index)"
    },
    "audit_aura": {
      "type": "string",
      "enum": ["White", "SkyBlue", "PaleGreen", "Amber", "Red"],
      "description": "TAG 22: Luminosity definition for the honest UI"
    },
    "provenance_hash": {
      "type": "string",
      "pattern": "^[a-f0-9]{64}$",
      "description": "TAG 23: Intermediate SHA-256 verification hash (TAGs 01–22)"
    },
    "schema_version": {
      "type": "string",
      "pattern": "^[0-9]+\\.[0-9]+\\.[0-9]+$",
      "description": "TAG 24: Semantic versioning"
    },
    "state_hash": {
      "type": "string",
      "pattern": "^[a-f0-9]{64}$",
      "description": "TAG 25: Final JCS hash generated by the Narrative Compiler"
    }
  }
}
```

---

## Data Type Reference Table (v4.1.0)

### Category I: Identification & Base Context

| TAG | Field Name | Type | Definition / Range |
|-----|-----------|------|--------------------|
| **01** | `permanent_id` | `string` | `gmn://YYYYMMDD/[hash8]` · Regex: `^gmn://[0-9]{8}/[a-f0-9]{8}$` |
| **02** | `subject_origin` | `enum` | One of: `jp`, `cn`, `us`, `uk`, `qa`, `eu` |
| **03** | `predicate_type` | `enum` | Action identifiers: `declare`, `sanction`, `invest`, `conflict`, etc. |
| **04** | `object_entity` | `array` | List of proper nouns for affected targets (e.g., `["NVIDIA", "Taiwan"]`) |
| **05** | `location` | `object` | `{"country": "string", "coord": [lat, lng]}` |
| **06** | `time_frame` | `string` | ISO 8601 (UTC/Z) format (e.g., `2026-03-07T12:00:00Z`) |

### Category II: Dynamics & Structure

| TAG | Field Name | Type | Definition / Range |
|-----|-----------|------|--------------------|
| **07** | `actor_role` | `enum` | `state`, `corporation`, `individual`, `algo`, etc. |
| **08** | `causality_direction` | `enum` | `upstream` (cause), `midstream` (ongoing), `downstream` (result) |
| **09** | `strategic_interest_vector` | `object` | 6 dimensions, each `-1.0` to `1.0` (float) |
| **10** | `epistemic_confidence` | `float` | `0.0` to `1.0` (1.0 = confirmed fact) |

### Category III: Bias & Audit

| TAG | Field Name | Type | Definition / Range |
|-----|-----------|------|--------------------|
| **11** | `bias_component` | `object` | `{"emotional_load": 0.0–1.0, "perspective_center": "string"}` |
| **12** | `model_differential` | `object` | `{"consensus": [], "conflict": []}` (three-AI opinion differential) |
| **13** | `global_synthesis` | `string` | Max 400 characters — summary of contested points |
| **14** | `n_o_variants` | `object` | `{"us": "text", "cn": "text", ...}` (~1,400 chars per multi-layered narrative) |
| **15** | `source_credibility` | `float` | `0.0` to `1.0` (historical credibility of source) |

### Category IV: Impact & Risk

| TAG | Field Name | Type | Definition / Range |
|-----|-----------|------|--------------------|
| **16** | `economic_transmission_path` | `array` | Affected sector tags (e.g., `["energy", "semiconductor"]`) |
| **17** | `silence_reasons` | `array` | Analysis descriptions of strategic silence by specific actors |
| **18** | `precedent_audit` | `array` | IDs or descriptions of referenced international law / historical precedents |
| **19** | `conflict_factuality_index` | `float` | `0.0` to `1.0` (perfect score minus physical contradiction penalties) |

### Category V & VI: Content, Presentation & Immutability

| TAG | Field Name | Type | Definition / Range |
|-----|-----------|------|--------------------|
| **20** | `backbone_history` | `string` | Max 1,000 characters — historical background |
| **21** | `deep_dive` | `string` | Max 1,400 characters — in-depth expert analysis |
| **22** | `audit_aura` | `enum` | `White`, `SkyBlue`, `PaleGreen`, `Amber`, `Red` |
| **23** | `provenance_hash` | `string` | SHA-256 verification hash of TAGs 01–22 |
| **24** | `schema_version` | `string` | `4.1.0` (Semantic Versioning) |

---

## The 25th Absolute Constant: `state_hash`

- **Type:** `string` (SHA-256 / 64 hex characters)
- **Formula:** $state\_hash = \text{SHA256}(\text{JCS}(TAG_{01} \dots TAG_{24}))$
- **Significance:** When this value matches, the narrative is fixed to the world as an "absolute-zero crystal" — immutable, verifiable, and tamper-evident.

---

## `state_hash` Generation: Implementation Reference (Cloud Functions)

Within `narrative_generator`, the hash is calculated in memory immediately before sending JSON to the database, fixing it as an immutable fingerprint.

```python
import hashlib
from acta_aiie_jcs import jcs_engine_serialize

def canonicalize_and_hash(tags_dict: dict) -> str:
    """
    Executes 'Crystallization of Information' with zero-bit tampering tolerance.
    Fully RFC 8785-compliant UTF-16 key sorting and numeric serialization.

    Pre-conditions:
    - All numeric values converted from float to Decimal
    - All timestamps formatted as ISO 8601 (UTC/Z): "YYYY-MM-DDTHH:mm:ssZ"
    """
    # Synchronized with the canonical logic in verify_integrity.py
    jcs_string = jcs_engine_serialize(tags_dict)
    return hashlib.sha256(jcs_string.encode('utf-8')).hexdigest()
```

**Crystallization Sequence (pre-save):**

1. **Data Purity:** Convert all numeric values from `float` to `Decimal`; convert all dates to `"YYYY-MM-DDTHH:mm:ssZ"`.
2. **Hash Computation:** Generate `state_hash` against the in-memory raw data structure.
3. **Sealing:** Store the generated hash in `aiie_tags['state_hash']` and include it in the POST request to Laravel.

---

*© 2026 Gemmina Intelligence LLC. — Protocol Standard v4.1.0*  
*Acta AIIE Standardization Committee*
