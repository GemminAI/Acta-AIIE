import { DocPage, Section, SectionTitle, Body, BulletList, CodeBlock, Divider, InfoBox, InlineCode } from "../components/DocPage";
import { DocHeader } from "../components/DocHeader";

export function RFC0005() {
  return (
    <DocPage>
      <DocHeader
        docId="RFC-0005"
        title="T22 Entropy-Shift"
        subtitle="Phase Transition from epistemic_diffusion_state to informational_entropy (H₀)"
        status="RATIFIED"
        version="2026-04-12"
        author="Tomohiko Nakamura, Gemmina Intelligence LLC."
        compliance="RFC 8785 · 35TAG v6.0.1"
      />

      <Section num="1">
        <SectionTitle>Motivation</SectionTitle>
        <Body>
          A full cross-document audit on 2026-04-12 revealed a breaking inconsistency in the T22 slot. The 35TAG_Standard_v6.0.0 definition retained the legacy field epistemic_diffusion_state (enum), while narrative_compiler.py and 01_data_layer_v2.md were already consistent with informational_entropy (float).
        </Body>
        <InfoBox accent>
          Breaking inconsistency: presentation-layer enum cannot serve as input to the T35 v2 Thermodynamic Decision Engine, which requires a continuous float value.
        </InfoBox>
      </Section>

      <Divider />

      <Section num="2">
        <SectionTitle>Breaking Change</SectionTitle>
        <Body>
          The following transition is normative and supersedes T22 in 35TAG_Standard_v6.0.0.
        </Body>
        <CodeBlock lang="diff">
{`DEPRECATED
  T22: epistemic_diffusion_state
  Type:   enum (Crystallized | Diffused | Polarized | ...)
  Role:   UI color / state label
  Reason: Presentation-layer concepts must not be embedded in the data layer (T01–T25)

ADOPTED
  T22: informational_entropy
  Type:   float (0.0 – 1.0)
  Role:   Initial informational entropy H₀ of the source text
  Reason: T(H) = 0.1 + 0.9·H₀ requires a continuous value`}
        </CodeBlock>
      </Section>

      <Divider />

      <Section num="3">
        <SectionTitle>Physical Rationale</SectionTitle>
        <Body>
          The temperature variable of the T35 v2 Thermodynamic Decision Engine is defined as:
        </Body>
        <CodeBlock lang="math">
{`T(H) = 0.1 + 0.9 · H₀

This formula mandates that T22 be a continuous value (float).
A qualitative enum label cannot serve as input to the thermodynamic engine.`}
        </CodeBlock>
        <Body>
          In the context of RFC-0006 (QFOM): T22 represents sensor sensitivity that measures the spread of the wave function (uncertainty), quantifying the resolution of the observation.
        </Body>
      </Section>

      <Divider />

      <Section num="4">
        <SectionTitle>Migration Protocol "Entropy-Shift"</SectionTitle>
        <BulletList items={[
          { label: "Legacy (schema_version < 6.0.0)", content: "epistemic_diffusion_state (enum) accepted. Existing hashes preserved." },
          { label: "Current (schema_version = 6.0.0)", content: "informational_entropy (float) required. New hashes generated." },
          { label: "audit_aura", content: "Retained as non-hashed independent column in narrative_articles for UI rendering. MUST NOT appear in the JCS preimage." },
          { label: "DB migration", content: "narrative_states.t22_audit_aura → t22_informational_entropy (float) deferred to PHASE D." },
          { label: "Existing records", content: "8,192 records will NOT be retroactively re-hashed (immutability preserved)." },
        ]} />
      </Section>

      <Divider />

      <Section num="5">
        <SectionTitle>Implementation Impact</SectionTitle>
        <BulletList items={[
          { label: "35TAG_Standard_v6.0.1.md", content: "T22 updated to informational_entropy (this RFC applied)." },
          { label: "narrative_compiler.py", content: "No change required (already consistent)." },
          { label: "sdk/tag_v6.py", content: "Updated to informational_entropy: 0.5" },
          { label: "gemminai-next tag35FieldOrder.ts", content: "Updated." },
          { label: "laravelV1Events.ts", content: "informational_entropy priority with legacy enum fallback." },
          { label: "generate_24tag() prompt", content: "Entropy calculation instruction to be added (PHASE A)." },
        ]} />
      </Section>

      <Divider />

      <Section num="6">
        <SectionTitle>Definition of Success</SectionTitle>
        <BulletList items={[
          { content: "New articles generated with schema_version = 6.0.0 carry informational_entropy (float) in aiie_tags." },
          { content: "narrative_compiler.py generates state_hash using informational_entropy as part of BASE_TAG_KEYS." },
          { content: "The state_hash of existing 8,192 records remains unchanged (immutability preserved across migration)." },
        ]} />
        <InfoBox>
          <em>"To resist the heat death of information, measure entropy."</em>
          <br />— Gemmina Intelligence LLC., Pure Information Laboratory
        </InfoBox>
      </Section>
    </DocPage>
  );
}
