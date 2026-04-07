import { DocHeader } from "../components/DocHeader";
import { DocPage, Section, SectionTitle, SubsectionTitle, Body, BulletList, InlineCode, InfoBox, Divider } from "../components/DocPage";

const MONO = "'JetBrains Mono', monospace";

export function MathStandardization() {
  return (
    <DocPage>
      <DocHeader
        title="The AIIE Protocol: Mathematical Standardization of Narrative Intent"
        subtitle="Technical architecture for packing the entire process — from information emergence to mathematical proof — into a single, immutable JSON object."
        canonicalHash="b7e2a1d4c9f3e8a2b5d0c7f4e9a3b6d1c8f5e2a9b4d7c0f3e6a1b8d5c2f9e4"
        status="Refined"
        version="v4.1.1"
        editor="Acta AIIE Standardization Committee"
        compliance="RFC 8785 · ECMA-262"
        docId="AIIE-PROTO-002"
      />

      <Section num="1.0">
        <SectionTitle>Abstract</SectionTitle>
        <Body>
          This specification defines the technical structure of the <strong>35TAG v6.0.0</strong> data schema within the Acta AIIE Protocol (Artificial Intelligence Intent Encapsulation). The protocol is designed to pack the entire process — from the emergence of information to its mathematical proof — into a single, immutable JSON object. This ensures the{" "}
          <strong style={{ fontFamily: MONO, fontSize: "13px", color: "#c8d4e0", fontWeight: 600 }}>"Crystallization of Information,"</strong>{" "}
          where even a 1-bit alteration is detectable, thereby fixing the original intent against posterior manipulation.
        </Body>
        <InfoBox accent>
          The Acta AIIE Protocol defines "Crystallization" as the mathematical process of transitioning a narrative object from a mutable state into a provably immutable one. Once crystallized, the narrative's original form is preserved with absolute mathematical certainty.
        </InfoBox>
      </Section>

      <Section num="2.0">
        <SectionTitle>The 35TAG v6.0.0 Taxonomy: Structural Definitions</SectionTitle>
        <Body>
          Information is multidimensionally described through <strong>thirty-five semantic fields</strong> in <strong>ten categories (I–X)</strong>, plus the <InlineCode>state_hash</InlineCode> (T25) anchor. These fields transform subjective narratives into computable structures — fixed points that can be compared, analyzed, and verified across any computational environment.
        </Body>

        <SubsectionTitle>Category I: Identification & Base Context</SubsectionTitle>
        <Body>
          Establishes the "Digital Registry" of information — the immutable identity signature of every AIIE object.
        </Body>
        <BulletList
          items={[
            { label: "01. permanent_id", content: "A persistent identifier using the gmn:// scheme. Provides global uniqueness across all AIIE registries." },
            { label: "02. subject_origin", content: "The geopolitical or systemic origin of the narrative (e.g., JP, CN, US). Encodes the source domain for cross-domain correlation analysis." },
            { label: "06. time_frame", content: "Precise timestamping in ISO 8601 (UTC/Z) format. The Z suffix is mandatory — no timezone offset is permitted." },
          ]}
        />

        <SubsectionTitle>Category II: Dynamics & Structure</SubsectionTitle>
        <Body>
          Quantifies causal relationships and strategic intent through rigorous mathematical structures.
        </Body>
        <BulletList
          items={[
            { label: "09. strategic_interest_vector", content: "Represents impact across six dimensions (Security, Economy, Technology, Resource, Ideology, Environment) on a scale of -1.0 to 1.0. This 6D vector constitutes the \"Physics of Information\" — a quantitative mapping of events in multi-dimensional geopolitical space." },
            { label: "22. epistemic_diffusion_state", content: "Crystallized | Diffused | Polarized — visual state derived from entropy and CFI (Category V)." },
          ]}
        />

        <Divider />

        <SubsectionTitle>The Strategic Interest Vector: Physics of Information</SubsectionTitle>
        <Body>
          The <InlineCode>strategic_interest_vector</InlineCode> is the mathematical core of the AIIE Protocol's analytical power. By mapping narratives onto a 6-dimensional space, the protocol enables objective comparison of information events across domains, cultures, and time periods. The vector's six dimensions are defined as:
        </Body>
        <BulletList
          items={[
            { label: "security", content: "Impact on military, territorial, and sovereignty dimensions. Negative values indicate destabilizing effects." },
            { label: "economy", content: "Economic pressure, trade implications, and financial market impact." },
            { label: "tech", content: "Technology transfer, innovation competition, and infrastructure implications." },
            { label: "resource", content: "Natural resource access, energy security, and supply chain dynamics." },
            { label: "ideology", content: "Political system framing, cultural narrative, and values projection." },
            { label: "environment", content: "Ecological impact, climate policy, and environmental governance framing." },
          ]}
        />
      </Section>

      <Section num="3.0">
        <SectionTitle>Integrity through JCS (JSON Canonicalization Schema)</SectionTitle>
        <Body>
          To ensure the "Crystallization" of the protocol, every AIIE object must be hashed using the JCS standard (RFC 8785). This mathematical lock ensures that the observer's intent and the observed data are inseparable and tamper-proof. The process is irreversible: once the <InlineCode>state_hash</InlineCode> is generated, any modification to the underlying data produces a completely different hash.
        </Body>
        <InfoBox accent>
          The JCS Crystallization Engine is the implementation of this specification. It provides the normalization logic required to transition <strong>35TAG v6.0.0</strong> JSON data into an immutable state, enabling the generation of a <InlineCode>state_hash</InlineCode> (T25) with zero-bit variance across all compliant systems.
        </InfoBox>

        <SubsectionTitle>CFI Score — Conflict-of-Fact Index</SubsectionTitle>
        <Body>
          The CFI Score is a metric that automatically detects contradictions between physical evidence (e.g., shadow angles, GPS coordinates, timestamps) and narrative claims. By cross-referencing physical observables with stated facts, the AIIE Protocol can deductively evaluate information reliability without relying on subjective judgment.
        </Body>
        <BulletList
          items={[
            { label: "CFI = 1.0", content: "Perfect physical consistency. All verifiable physical evidence aligns with the narrative claims." },
            { label: "CFI = 0.5", content: "Moderate inconsistency. Some physical evidence contradicts narrative claims, requiring further investigation." },
            { label: "CFI = 0.0", content: "Complete physical contradiction. Physical evidence systematically contradicts narrative claims." },
          ]}
        />
      </Section>

      <Section num="4.0">
        <SectionTitle>T25 — state_hash: The Cryptographic Seal</SectionTitle>
        <Body>
          The <InlineCode>state_hash</InlineCode> is generated from, but not included in, its own input. Per the reference verifier, it is <strong>SHA-256</strong> of <strong>RFC 8785 (JCS)</strong> over <strong>TAG 01–34</strong> excluding <InlineCode>state_hash</InlineCode>. TAG 35 (<InlineCode>worldline_optimization</InlineCode>) is not part of the JCS payload for T25.
        </Body>
        <Body>
          Given the same sealed payload keys and values in any compliant environment, the same 64-character hexadecimal <InlineCode>state_hash</InlineCode> results. Any alteration to a participating field produces a different hash.
        </Body>
        <InfoBox accent>
          The <InlineCode>state_hash</InlineCode> is the T25 anchor — the cryptographic seal over the canonical narrative state prior to final worldline closure (TAG 35).
        </InfoBox>
      </Section>
    </DocPage>
  );
}
