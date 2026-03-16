import { DocHeader } from "../components/DocHeader";
import { DocPage, Section, SectionTitle, SubsectionTitle, Body, BulletList, CodeBlock, InlineCode, InfoBox } from "../components/DocPage";
import { Tag24Registry } from "../components/Tag24Registry";

const MONO = "'JetBrains Mono', monospace";

const JSON_SCHEMA_V4 = `{
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
        "security":     { "type": "number", "minimum": -1, "maximum": 1 },
        "economy":      { "type": "number", "minimum": -1, "maximum": 1 },
        "tech":         { "type": "number", "minimum": -1, "maximum": 1 },
        "resource":     { "type": "number", "minimum": -1, "maximum": 1 },
        "ideology":     { "type": "number", "minimum": -1, "maximum": 1 },
        "environment":  { "type": "number", "minimum": -1, "maximum": 1 }
      }
    },
    "state_hash": {
      "type": "string",
      "pattern": "^[a-f0-9]{64}$",
      "description": "25th TAG: SHA-256 hash of JCS-normalized TAG01-24"
    }
  }
}`;

const JSON_SCHEMA_V5 = `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://raw.githubusercontent.com/GemminAI/Acta-AIIE/main/schema/schema_v5.0.json",
  "title": "AIIE Protocol v5.0 — 24TAG Narrative Crystal Schema",
  "version": "5.0.0",
  "author": "Gemmina Intelligence LLC. — Tomohiko Nakamura",
  "license": "MIT",
  "type": "object",
  "properties": {
    "t01_epistemic_confidence": {
      "type": "number", "minimum": 0.0, "maximum": 1.0,
      "description": "Epistemic confidence. 1.0 = verified fact, 0.0 = unconfirmed."
    },
    "t02_subject_origin": {
      "type": "string",
      "enum": ["jp", "us", "cn", "gb", "eu", "qa"],
      "description": "§0 Perspective constraint. NOT language — narrative framing. GLOBAL forbidden."
    },
    "t03_predicate_type": {
      "type": "string",
      "enum": ["declare","sanction","invest","conflict","negotiate",
               "report","escalate","withdraw","accuse","cooperate"]
    },
    "t04_object_actor": {
      "type": ["string", "null"],
      "description": "§1 Source fidelity. null if not in source — inference forbidden."
    },
    "t05_location": {
      "type": "object",
      "properties": {
        "country": { "type": "string" },
        "city":    { "type": ["string", "null"] }
      },
      "required": ["country", "city"]
    },
    "t06_time_frame": {
      "type": "string",
      "pattern": "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$",
      "description": "§2 Temporal anchoring. ISO 8601 UTC/Z. Exactly 19 chars."
    },
    "t07_subject_actor": { "type": "string" },
    "t08_causality_direction": {
      "type": "string",
      "enum": ["upstream", "midstream", "downstream"],
      "description": "§3 Causal direction. upstream=trigger, midstream=event, downstream=effect."
    },
    "t09_strategic_interest_vector": {
      "type": "object",
      "properties": {
        "security":    { "type": "number", "minimum": -1.0, "maximum": 1.0 },
        "economy":     { "type": "number", "minimum": -1.0, "maximum": 1.0 },
        "tech":        { "type": "number", "minimum": -1.0, "maximum": 1.0 },
        "resource":    { "type": "number", "minimum": -1.0, "maximum": 1.0 },
        "ideology":    { "type": "number", "minimum": -1.0, "maximum": 1.0 },
        "environment": { "type": "number", "minimum": -1.0, "maximum": 1.0 }
      },
      "required": ["security","economy","tech","resource","ideology","environment"]
    },
    "t14_audit_aura": {
      "type": "string",
      "enum": ["White", "SkyBlue", "PaleGreen", "Amber", "Red"]
    },
    "state_hash": {
      "type": "string",
      "pattern": "^[a-f0-9]{64}$",
      "description": "SHA-256( JCS( T01..T24 ) ) per RFC 8785."
    },
    "schema_version": {
      "type": "string",
      "pattern": "^[0-9]+\\.[0-9]+\\.[0-9]+$"
    }
  },
  "required": [
    "t01_epistemic_confidence", "t02_subject_origin", "t03_predicate_type",
    "t05_location", "t06_time_frame", "t07_subject_actor",
    "t08_causality_direction", "t09_strategic_interest_vector",
    "t14_audit_aura", "state_hash", "schema_version"
  ],
  "additionalProperties": false,
  "x-crystallization-constitution": {
    "§0": "subject_origin ∈ {jp,us,cn,gb,eu,qa} — perspective, not language.",
    "§1": "Fact ∈ Source — unknown → null. Inference = forgery.",
    "§2": "T = published_at + Δt — ISO 8601 UTC/Z only.",
    "§3": "Direction ∈ {upstream,midstream,downstream} — 3-choice only."
  },
  "x-state-hash-formula": "state_hash = SHA-256( JCS( T01..T24 ) ) per RFC 8785",
  "x-implementation": {
    "verify_integrity": "https://raw.githubusercontent.com/GemminAI/Acta-AIIE/main/sdk/verify_integrity.py",
    "paper": "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6419019",
    "repository": "https://github.com/GemminAI/Acta-AIIE"
  }
}`;

const CONSTITUTION = `§0  subject_origin ∈ {jp, us, cn, gb, eu, qa}
    Perspective, not language. GLOBAL is forbidden.

§1  Fact ∈ Source
    No entity generated beyond source. Unknown → null. Inference = forgery.

§2  T = published_at + Δt
    ISO 8601 UTC/Z only (19 chars). Relative expressions forbidden.

§3  Direction ∈ {upstream, midstream, downstream}
    3-choice enum only. "Complex correlation" is not an answer.`;

const PYDANTIC = `from pydantic import BaseModel, Field

class _SIV(BaseModel):
    security:    float = Field(ge=-1.0, le=1.0)
    economy:     float = Field(ge=-1.0, le=1.0)
    tech:        float = Field(ge=-1.0, le=1.0)
    resource:    float = Field(ge=-1.0, le=1.0)
    ideology:    float = Field(ge=-1.0, le=1.0)
    environment: float = Field(ge=-1.0, le=1.0)

class _Tag(BaseModel):
    t02_subject_origin:          str   = Field(pattern="^(jp|us|cn|gb|eu|qa)$")
    t06_time_frame:              str   = Field(pattern=r"^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$")
    t08_causality_direction:     str   = Field(pattern="^(upstream|midstream|downstream)$")
    t01_epistemic_confidence:    float = Field(ge=0.0, le=1.0)
    t09_strategic_interest_vector: _SIV

# Enforce at API level — invalid outputs rejected, not retried
response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=prompt,
    config=GenerateContentConfig(
        response_mime_type="application/json",
        response_schema=_Tag,  # ← philosophy becomes type
        temperature=0.1,
    ),
)`;

export function Protocol24TAG() {
  return (
    <DocPage>
      <DocHeader
        title="AIIE Protocol 24TAG Schema Specification"
        subtitle="A framework that structures the entire process from information emergence to mathematical proof into a single immutable JSON object."
        canonicalHash="a9f3c2e4b8d1047e5c6f9a2b3d8e1f4a7c0b5d2e9f6a3c8b4d1e7f0a5c2b9d"
        status="Refined"
        version="v5.0.0"
        editor="Acta AIIE Standardization Committee"
        compliance="RFC 8785 (JSON Canonicalization Scheme)"
        docId="AIIE-SPEC-001"
      />

      <Section num="1.0">
        <SectionTitle>Abstract</SectionTitle>
        <Body>
          This specification defines the data types, value ranges, and integrity rules for the{" "}
          <strong style={{ fontFamily: MONO, fontSize: "13px", color: "#c8d4e0", fontWeight: 600 }}>24TAG</strong>{" "}
          system — a framework that structures the entire process from information emergence to mathematical proof into a single JSON object. Data generated in compliance with this schema is guaranteed to produce an identical <InlineCode>state_hash</InlineCode> regardless of the computing environment.
        </Body>
        <InfoBox accent>
          The 24TAG schema is the canonical data structure of the AIIE Protocol. Every object compliant with this specification is a self-contained, mathematically sealed unit of narrative information — a "Crystallized" fact that cannot be altered without detection.
        </InfoBox>
      </Section>

      <Section num="2.0">
        <SectionTitle>Data Structure Definitions</SectionTitle>

        <SubsectionTitle>2.1 Category I — Identification & Base Context</SubsectionTitle>
        <Body>
          Establishes the "Digital Registry" of information. These fields form the immutable identity fingerprint of every AIIE object.
        </Body>
        <BulletList
          items={[
            { label: "permanent_id", content: "Persistent identifier using the gmn:// scheme. Regex: ^gmn://[0-9]{8}/[a-f0-9]{8}$" },
            { label: "subject_origin", content: 'The geopolitical origin of the narrative. enum: ["jp", "cn", "us", "gb", "qa", "eu"]' },
            { label: "time_frame", content: "UTC timestamp in ISO 8601 format, fixed to the second. Must terminate with a Z suffix." },
          ]}
        />

        <SubsectionTitle>2.2 Category II — Dynamics & Structure</SubsectionTitle>
        <Body>
          Quantifies causal relationships and strategic intent through mathematical vectors and confidence scores.
        </Body>
        <BulletList
          items={[
            { label: "strategic_interest_vector", content: "A 6-dimensional numerical vector (security, economy, tech, resource, ideology, environment). Range: -1.0 to 1.0." },
            { label: "epistemic_confidence", content: "AI-evaluated certainty of the information. Range: 0.0 to 1.0." },
            { label: "narrative_viscosity", content: "Measures the resistance of a narrative to external corrective information. Range: 0.0 to 1.0." },
          ]}
        />

        <SubsectionTitle>2.3 Category IV — Spillover & Risk</SubsectionTitle>
        <BulletList
          items={[
            { label: "conflict_factuality_index (CFI)", content: "Reliability metric based on physical contradictions (e.g., weather, shadows, GPS data). Range: 0.0 to 1.0." },
            { label: "silence_reasons", content: "IVD indicators — classified reasons for strategic informational silence or omission." },
          ]}
        />
      </Section>

      <Section num="3.0">
        <SectionTitle>Crystallization Rules</SectionTitle>
        <Body>
          Processors compliant with this specification{" "}
          <strong style={{ fontFamily: MONO, fontSize: "13px", color: "#c8d4e0", fontWeight: 600 }}>must</strong>{" "}
          execute the following normalization procedures as a "Mandatory Protocol" before generating the <InlineCode>state_hash</InlineCode>:
        </Body>
        <BulletList
          items={[
            { label: "UTF-16 Key Sorting", content: "Sort JSON object keys in lexicographical order (UTF-16 code unit order)." },
            { label: "Numeric Normalization", content: "Convert IEEE 754 double-precision floating-point numbers into decimal strings compliant with ECMA-262, including exponential notation switching rules." },
            { label: "Timestamp Fixation", content: "Datetime objects must terminate with a Z suffix to eliminate environment-dependent offsets." },
          ]}
        />
        <InfoBox>
          These three normalization rules constitute the mathematical foundation of the "Crystallization" mechanism. Without strict adherence to all three rules, the generated state_hash will differ between environments — invalidating the core promise of zero-bit variance.
        </InfoBox>
      </Section>

      <Section num="4.0">
        <SectionTitle>JSON Schema (v4.1.0 — Reference)</SectionTitle>
        <Body>
          The original schema definition. For the current production implementation, see Section 5.0.
        </Body>
        <CodeBlock lang="JSON Schema · Draft-07 · v4.1.0">{JSON_SCHEMA_V4}</CodeBlock>
      </Section>

      {/* 24TAG Visual Registry */}
      <Tag24Registry />

      <Section num="5.0">
        <SectionTitle>Schema v5.0 — Production Implementation</SectionTitle>
        <Body>
          v5.0 introduces the <strong style={{ fontFamily: MONO, fontSize: "13px", color: "#c8d4e0", fontWeight: 600 }}>Crystallization Constitution</strong> — four absolute equations injected directly into the LLM generation process as <InlineCode>response_schema</InlineCode>. Invalid outputs are rejected at the API level, not retried in software.
        </Body>

        <InfoBox accent>
          <strong style={{ fontFamily: MONO, fontSize: "12px", color: "#38bdf8", fontWeight: 600 }}>Key result:</strong> Processing time reduced from ~2 min (3× retry) to ~4 sec (1-pass). Schema violation rate: 0%. Corpus: 64/64 articles crystallized without failure.
        </InfoBox>

        <SubsectionTitle>5.1 The Crystallization Constitution (§0–§3)</SubsectionTitle>
        <Body>
          Injected as the preamble of <InlineCode>TAG_GENERATION_PROMPT</InlineCode> to constrain the LLM from "reasoning engine" to "strict compiler":
        </Body>
        <CodeBlock lang="Crystallization Constitution">{CONSTITUTION}</CodeBlock>

        <SubsectionTitle>5.2 Pydantic Implementation</SubsectionTitle>
        <Body>
          The constitution is enforced at the type level. Each constraint maps directly to a Pydantic field validator — philosophy becomes type:
        </Body>
        <CodeBlock lang="Python · Pydantic + google-genai SDK">{PYDANTIC}</CodeBlock>

        <SubsectionTitle>5.3 Full Schema Definition</SubsectionTitle>
        <Body>
          Raw schema available at:{" "}
          <a
            href="https://raw.githubusercontent.com/GemminAI/Acta-AIIE/main/schema/schema_v5.0.json"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#4a7fa5", fontFamily: MONO, fontSize: "12px" }}
          >
            github.com/GemminAI/Acta-AIIE/schema/schema_v5.0.json
          </a>
        </Body>
        <CodeBlock lang="JSON Schema · Draft-07 · v5.0.0">{JSON_SCHEMA_V5}</CodeBlock>
      </Section>

      <Section num="6.0">
        <SectionTitle>Implementation Obligations</SectionTitle>
        <Body>
          Developers must use the <InlineCode>selftest_vectors.json</InlineCode> provided in the specification repository to verify that their normalization engine passes all 49/49 test cases in their specific environment. An environment is only certified for "Crystallization" upon achieving a perfect pass rate.
        </Body>
        <InfoBox accent>
          <strong style={{ fontFamily: MONO, fontSize: "12px", color: "#38bdf8", fontWeight: 600 }}>Certification Requirement:</strong> All 49 selftest vectors must pass. Any failure indicates a non-compliant normalization implementation and will produce divergent state_hash values across systems.
        </InfoBox>
        <Body>
          Reference implementation:{" "}
          <a
            href="https://github.com/GemminAI/Acta-AIIE/blob/main/sdk/verify_integrity.py"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#4a7fa5", fontFamily: MONO, fontSize: "12px" }}
          >
            sdk/verify_integrity.py
          </a>
          {" "}·{" "}
          Paper:{" "}
          <a
            href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6419019"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#4a7fa5", fontFamily: MONO, fontSize: "12px" }}
          >
            SSRN #6419019
          </a>
        </Body>
      </Section>
    </DocPage>
  );
}
