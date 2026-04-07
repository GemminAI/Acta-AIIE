import { DocHeader } from "../components/DocHeader";
import { DocPage, Section, SectionTitle, SubsectionTitle, Body, BulletList, CodeBlock, InlineCode, InfoBox } from "../components/DocPage";
import { Tag35Registry } from "../components/Tag35Registry";

const MONO = "'JetBrains Mono', monospace";

const JSON_SCHEMA_V4 = `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "AIIE Protocol — historical 24-field draft (superseded)",
  "version": "4.1.0",
  "description": "Archived. Canonical schema: 35TAG v6.0.0 — see specs/35TAG_Standard_v6.0.0.md",
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
      "description": "T25: SHA-256(JCS(TAG 01–34 except state_hash)) — v6.0.0 verifier"
    }
  }
}`;

const JSON_SCHEMA_V5 = `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://raw.githubusercontent.com/GemminAI/Acta-AIIE/main/schema/schema_v5.0.json",
  "title": "AIIE Protocol v5.0 — legacy crystal schema (migrate to 35TAG v6.0.0)",
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
      "description": "T25: SHA-256(JCS(TAG 01–34 except state_hash)) per RFC 8785 — 35TAG v6.0.0."
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
  "x-state-hash-formula": "state_hash = SHA-256( JCS( TAG 01..34 except state_hash ) ) — 35TAG v6.0.0 / verify_integrity.py",
  "x-implementation": {
    "verify_integrity": "https://raw.githubusercontent.com/GemminAI/Acta-AIIE/main/sdk/verify_integrity.py",
    "tag_v6": "https://raw.githubusercontent.com/GemminAI/Acta-AIIE/main/sdk/tag_v6.py",
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

export function Protocol35TAG() {
  return (
    <DocPage>
      <DocHeader
        title="AIIE Protocol 35TAG v6.0.0 Schema Specification"
        subtitle="Thirty-five semantic fields (Categories I–X) from identification to worldline closure; T25 anchor via RFC 8785 JCS."
        canonicalHash="a9f3c2e4b8d1047e5c6f9a2b3d8e1f4a7c0b5d2e9f6a3c8b4d1e7f0a5c2b9d"
        status="RATIFIED"
        version="v6.0.0"
        editor="Acta AIIE Standardization Committee"
        compliance="RFC 8785 (JSON Canonicalization Scheme)"
        docId="AIIE-SPEC-035-v6"
      />

      <Section num="1.0">
        <SectionTitle>Abstract</SectionTitle>
        <Body>
          This page summarizes the <strong style={{ fontFamily: MONO, fontSize: "13px", color: "#c8d4e0", fontWeight: 600 }}>35TAG v6.0.0</strong>{" "}
          standard — the canonical data structure of the AIIE Protocol. It structures the thermodynamic and geometric lifecycle of information
          into thirty-five fields plus the <InlineCode>state_hash</InlineCode> (T25) anchor. Normative definitions:{" "}
          <InlineCode>specs/35TAG_Standard_v6.0.0.md</InlineCode>.
        </Body>
        <InfoBox accent>
          Production systems SHALL implement the field registry in <strong>35TAG v6.0.0</strong> (Categories I–X). The
          <InlineCode>state_hash</InlineCode> is <strong>SHA-256</strong> of <strong>JCS</strong> over TAG 01–34 excluding the hash field itself;
          TAG 35 (<InlineCode>worldline_optimization</InlineCode>) seals the narrative closure and is not part of the T25 payload.
        </InfoBox>
      </Section>

      <Section num="2.0">
        <SectionTitle>Data Structure Definitions</SectionTitle>

        <SubsectionTitle>2.1 Category I — Identification & Base Context</SubsectionTitle>
        <Body>
          Establishes the digital registry: <InlineCode>permanent_id</InlineCode>, <InlineCode>subject_origin</InlineCode>,{" "}
          <InlineCode>predicate_type</InlineCode>, <InlineCode>object_entity</InlineCode>, <InlineCode>location</InlineCode>,{" "}
          <InlineCode>time_frame</InlineCode>.
        </Body>
        <BulletList
          items={[
            { label: "permanent_id", content: "gmn://YYYYMMDD/[hash8] — persistent global identifier." },
            { label: "subject_origin", content: "enum: jp | cn | us | uk | qa | eu — observational bias vector." },
            { label: "time_frame", content: "ISO 8601 UTC/Z — strict temporal boundary for deterministic hashing." },
          ]}
        />

        <SubsectionTitle>2.2 Category II — Dynamics & Structure</SubsectionTitle>
        <Body>
          <InlineCode>actor_role</InlineCode>, <InlineCode>causality_direction</InlineCode>,{" "}
          <InlineCode>strategic_interest_vector</InlineCode> (six dimensions, base for ΔV), <InlineCode>epistemic_confidence</InlineCode>.
        </Body>
        <BulletList
          items={[
            { label: "strategic_interest_vector", content: "Six dimensions (security … environment) in [−1.0, 1.0] — Protocol §9 ΔV base." },
            { label: "epistemic_confidence", content: "[0.0, 1.0] — objective mass of evidence." },
          ]}
        />

        <SubsectionTitle>2.3 Categories III–V · VI–X</SubsectionTitle>
        <BulletList
          items={[
            { label: "III–V", content: "Bias & audit, impact & risk, content & presentation — see registry table below." },
            { label: "VI", content: "provenance_hash, schema_version, state_hash (T25)." },
            { label: "VII–X", content: "Kinetics, memory, meta-cognition & relative time, reality selection — TAG 26–35." },
          ]}
        />
      </Section>

      <Section num="3.0">
        <SectionTitle>Crystallization Rules</SectionTitle>
        <Body>
          Processors compliant with this specification{" "}
          <strong style={{ fontFamily: MONO, fontSize: "13px", color: "#c8d4e0", fontWeight: 600 }}>must</strong>{" "}
          execute RFC 8785 normalization before computing <InlineCode>state_hash</InlineCode>:
        </Body>
        <BulletList
          items={[
            { label: "UTF-16 Key Sorting", content: "Sort JSON object keys in lexicographical order (UTF-16 code unit order)." },
            { label: "Numeric Normalization", content: "ECMA-262 shortest decimal representation per RFC 8785." },
            { label: "Timestamp Fixation", content: "Datetime strings UTC/Z where applicable." },
          ]}
        />
        <InfoBox>
          Without strict JCS adherence, recomputed T25 diverges across environments — invalidating tamper-evident guarantees.
        </InfoBox>
      </Section>

      <Section num="4.0">
        <SectionTitle>JSON Schema (v4.1.0 — Historical reference)</SectionTitle>
        <Body>
          Legacy excerpt retained for migration studies. <strong>Normative field list: 35TAG v6.0.0</strong> (see Section 3.0 registry and repository spec file).
        </Body>
        <CodeBlock lang="JSON Schema · Draft-07 · v4.1.0 (archived)">{JSON_SCHEMA_V4}</CodeBlock>
      </Section>

      <Tag35Registry />

      <Section num="5.0">
        <SectionTitle>Schema v5.0 — Legacy production excerpt</SectionTitle>
        <Body>
          Earlier <strong>Crystallization Constitution</strong> pipelines used <InlineCode>response_schema</InlineCode> constraints.
          New deployments align field names and cardinality with <strong>35TAG v6.0.0</strong> and <InlineCode>sdk/tag_v6.py</InlineCode>.
        </Body>

        <InfoBox accent>
          <strong style={{ fontFamily: MONO, fontSize: "12px", color: "#38bdf8", fontWeight: 600 }}>Note:</strong>{" "}
          v5.0 JSON below uses legacy <InlineCode>t01_</InlineCode> prefixes; v6.0.0 uses semantic snake_case keys from the normative spec.
        </InfoBox>

        <SubsectionTitle>5.1 The Crystallization Constitution (§0–§3)</SubsectionTitle>
        <Body>
          Injected as the preamble of <InlineCode>TAG_GENERATION_PROMPT</InlineCode> to constrain the LLM from &quot;reasoning engine&quot; to &quot;strict compiler&quot;:
        </Body>
        <CodeBlock lang="Crystallization Constitution">{CONSTITUTION}</CodeBlock>

        <SubsectionTitle>5.2 Pydantic Implementation (illustrative)</SubsectionTitle>
        <Body>
          Type-level enforcement example — map to v6.0.0 field names in production.
        </Body>
        <CodeBlock lang="Python · Pydantic + google-genai SDK">{PYDANTIC}</CodeBlock>

        <SubsectionTitle>5.3 Full Schema Definition (v5.0 file)</SubsectionTitle>
        <Body>
          Raw JSON Schema:{" "}
          <a
            href="https://raw.githubusercontent.com/GemminAI/Acta-AIIE/main/schema/schema_v5.0.json"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#4a7fa5", fontFamily: MONO, fontSize: "12px" }}
          >
            github.com/GemminAI/Acta-AIIE/schema/schema_v5.0.json
          </a>
        </Body>
        <CodeBlock lang="JSON Schema · Draft-07 · v5.0.0 (legacy)">{JSON_SCHEMA_V5}</CodeBlock>
      </Section>

      <Section num="6.0">
        <SectionTitle>Implementation Obligations</SectionTitle>
        <Body>
          Use <InlineCode>sdk/verify_integrity.py</InlineCode> selftest (49/49) and the <strong>35TAG v6.0.0</strong> key list in{" "}
          <InlineCode>sdk/tag_v6.py</InlineCode> for T25 verification.
        </Body>
        <InfoBox accent>
          <strong style={{ fontFamily: MONO, fontSize: "12px", color: "#38bdf8", fontWeight: 600 }}>Certification:</strong> RFC 8785 vectors must pass;
          <InlineCode>state_hash</InlineCode> must match JCS over TAG 01–34 (excluding <InlineCode>state_hash</InlineCode>).
        </InfoBox>
        <Body>
          Reference:{" "}
          <a
            href="https://github.com/GemminAI/Acta-AIIE/blob/main/sdk/verify_integrity.py"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#4a7fa5", fontFamily: MONO, fontSize: "12px" }}
          >
            sdk/verify_integrity.py
          </a>
          {" "}·{" "}
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
