import { DocHeader } from "../components/DocHeader";
import { DocPage, Section, SectionTitle, SubsectionTitle, Body, BulletList, CodeBlock, InlineCode, InfoBox } from "../components/DocPage";
import { Tag24Registry } from "../components/Tag24Registry";

const MONO = "'JetBrains Mono', monospace";

const JSON_SCHEMA = `{
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

export function Protocol24TAG() {
  return (
    <DocPage>
      <DocHeader
        title="AIIE Protocol 24TAG Schema Specification"
        subtitle="A framework that structures the entire process from information emergence to mathematical proof into a single immutable JSON object."
        canonicalHash="a9f3c2e4b8d1047e5c6f9a2b3d8e1f4a7c0b5d2e9f6a3c8b4d1e7f0a5c2b9d"
        status="Refined"
        version="v4.1.0"
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
            { label: "subject_origin", content: 'The geopolitical origin of the narrative. enum: ["jp", "cn", "us", "uk", "qa", "eu"]' },
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
        <SectionTitle>JSON Schema (Core Definition)</SectionTitle>
        <CodeBlock lang="JSON Schema · Draft-07">{JSON_SCHEMA}</CodeBlock>
      </Section>

      {/* 24TAG Visual Registry */}
      <Tag24Registry />

      <Section num="5.0">
        <SectionTitle>Implementation Obligations</SectionTitle>
        <Body>
          Developers must use the <InlineCode>selftest_vectors.json</InlineCode> provided in the specification repository to verify that their normalization engine passes all 49/49 test cases in their specific environment. An environment is only certified for "Crystallization" upon achieving a perfect pass rate.
        </Body>
        <InfoBox accent>
          <strong style={{ fontFamily: MONO, fontSize: "12px", color: "#38bdf8", fontWeight: 600 }}>Certification Requirement:</strong> All 49 selftest vectors must pass. Any failure indicates a non-compliant normalization implementation and will produce divergent state_hash values across systems.
        </InfoBox>
      </Section>
    </DocPage>
  );
}
