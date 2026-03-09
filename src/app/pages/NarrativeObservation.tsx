import { DocHeader } from "../components/DocHeader";
import { DocPage, Section, SectionTitle, SubsectionTitle, Body, BulletList, InlineCode, InfoBox, Divider } from "../components/DocPage";

const MONO = "'JetBrains Mono', monospace";

export function NarrativeObservation() {
  return (
    <DocPage>
      <DocHeader
        title="Narrative Observation: Cross-Domain Correlation and Information Voids"
        subtitle="Methodologies for measuring and communicating informational distortion using physical analogy metrics."
        canonicalHash="c4d8f2a6e1b9c3f7a2d5e8b4c0f6a3d9e2b7c1f4a8d3e6b0c5f2a7d4e9b3c8"
        status="Final Polish"
        version="WP-3 v1.3"
        author="Gemmina Intelligence LLC."
        compliance="AIIE Protocol · CDC · IVD Metrics"
        docId="AIIE-WP-003"
      />

      <Section num="1.0">
        <SectionTitle>Introduction: The Principle of Non-Intervention</SectionTitle>
        <Body>
          The AIIE Protocol serves as an independent observation system, prioritizing the objective recording of information dynamics over subjective truth-arbitration. "Narrative Observation," as defined herein, is a methodology for quantifying the collisions and distribution of information within a social system, utilizing physical analogies to maintain mathematical rigor.
        </Body>
        <Body>
          This whitepaper does not arbitrate truth. It does not declare which narrative is "correct." Instead, it provides the mathematical apparatus for measuring the distance between narratives, the density of strategic silences, and the pressure differential between competing information domains.
        </Body>
        <InfoBox accent>
          The core innovation of Narrative Observation is the application of physical systems theory to information dynamics. Information behaves analogously to physical fluids: it flows from high-pressure to low-pressure zones, creates turbulence at domain boundaries, and leaves measurable voids where strategic silence has evacuated content.
        </InfoBox>
      </Section>

      <Section num="2.0">
        <SectionTitle>Structural Analysis via CDC (Cross-Domain Correlation)</SectionTitle>
        <Body>
          Differences in informational potential between distinct narrative domains are observed as "Pressure Differences" (P∆). Just as atmospheric pressure differentials drive weather systems, narrative pressure differentials drive information flows between geopolitical domains.
        </Body>

        {/* Formula Block */}
        <div
          style={{
            margin: "24px 0",
            padding: "20px 24px",
            border: "1px solid #1a2530",
            background: "#080c10",
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: "9px",
              color: "#3d5a72",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Calculation Formula · CDC Pressure Differential
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: "16px",
              color: "#5a9ab8",
              letterSpacing: "0.03em",
              marginBottom: "8px",
            }}
          >
            P∆ = √(Σ(V_A − V_B)²) × (1 + IVD)
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: "11px",
              color: "#4a6070",
              marginTop: "8px",
              lineHeight: 1.8,
              letterSpacing: "0.01em",
            }}
          >
            Where V_A and V_B are the strategic_interest_vectors of domains A and B, and IVD is the Information Void Density of the observed context. The IVD multiplier amplifies pressure differentials in areas of strategic silence.
          </div>
        </div>

        <SubsectionTitle>2.1 Stable Zone</SubsectionTitle>
        <Body>
          A state where narrative deviation between domains is minimal and informational equilibrium is maintained. In stable zones, competing narratives coexist without acute pressure differential — information is exchanged freely and without significant strategic filtering.
        </Body>

        <SubsectionTitle>2.2 Unstable Zone (Discontinuity Surface)</SubsectionTitle>
        <Body>
          A boundary where strategic interest vectors collide acutely, and information asymmetry reaches a critical threshold. Discontinuity surfaces are the primary sites of narrative warfare — where competing geopolitical actors deploy information as strategic instruments.
        </Body>
        <BulletList
          items={[
            { label: "Narrative Storm", content: "Rapid, turbulent information flow across a discontinuity surface, characterized by high P∆ and multiple competing high-viscosity narratives." },
            { label: "Information Fog", content: "A region of high IVD surrounding a discontinuity surface — strategic silence deployed to prevent external narrative inflow." },
            { label: "Atmospheric Distortion", content: "Systematic warping of information as it crosses domain boundaries, caused by structural bias in transmission channels." },
          ]}
        />
      </Section>

      <Divider />

      <Section num="3.0">
        <SectionTitle>Measurement of IVD (Information Void Density)</SectionTitle>
        <Body>
          Beyond "what is being communicated," we define and measure "Information Voids" (IVD) — the density of elements intentionally omitted within a specific context. IVD is not the absence of information; it is the structured, intentional removal of information that would otherwise be expected to appear.
        </Body>

        <SubsectionTitle>3.1 Observational Significance</SubsectionTitle>
        <Body>
          High-density IVDs possess extreme potential for external narrative inflow. These voids serve as primary indicators for predicting abrupt shifts in the informational landscape. When a domain systematically avoids certain topics — measured against the baseline expectation of coverage — the resulting void creates pressure that external narratives rush to fill.
        </Body>
        <InfoBox>
          IVD is measured by overlaying multiple information sources from different domains and identifying systematic gaps. A "Strategic Silence" is distinguished from random information absence by its structural consistency: the same absence appears across multiple independent sources within the same domain, suggesting coordinated omission rather than random coverage gaps.
        </InfoBox>

        <SubsectionTitle>3.2 IVD Classification</SubsectionTitle>
        <BulletList
          items={[
            { label: "IVD = 0.0 – 0.2", content: "Low Void Density. Normal information coverage with minimal strategic omission. Information flows relatively freely through this domain." },
            { label: "IVD = 0.2 – 0.6", content: "Moderate Void Density. Selective omission present. Specific topic clusters show systematic underrepresentation relative to domain baseline." },
            { label: "IVD = 0.6 – 1.0", content: "High Void Density. Pervasive strategic silence. This domain is characterized by active, coordinated suppression of specific information categories, creating significant inflow pressure." },
          ]}
        />
      </Section>

      <Section num="4.0">
        <SectionTitle>Observational Interface (Gem2): Meteorological Metaphors</SectionTitle>
        <Body>
          The Gem2 Observational Interface is a representational theory that reconfigures cold physical parameters into intuitive "Meteorological Metaphors" for human comprehension. Rather than presenting raw P∆ values and IVD scores, Gem2 translates these metrics into a phenomenological vocabulary that leverages human intuitive understanding of atmospheric systems.
        </Body>
        <BulletList
          items={[
            { label: "Narrative Storm", content: "High P∆ (> 0.7) at a discontinuity surface, indicating acute narrative collision with significant information turbulence." },
            { label: "Information Fog", content: "High IVD (> 0.6) surrounding a domain, indicating dense strategic silence creating navigational uncertainty for external observers." },
            { label: "Atmospheric Distortion", content: "Progressive warping of information across domain boundaries, measured by comparing the strategic_interest_vector of the same event across different subject_origin domains." },
            { label: "Clear Atmosphere", content: "Low P∆ (< 0.2) and low IVD (< 0.2), indicating transparent information flow and narrative equilibrium between domains." },
          ]}
        />

        <SubsectionTitle>4.1 Integrity-Driven UI: audit_aura</SubsectionTitle>
        <Body>
          The AIIE Protocol's <InlineCode>audit_aura</InlineCode> TAG (TAG 23) encodes visual integrity information directly into the data object. This enables interface implementations to communicate data purity through color and luminosity — minimizing the user's cognitive load by making data integrity a perceptual rather than analytical experience.
        </Body>
        <InfoBox accent>
          The <InlineCode>audit_aura</InlineCode> system transforms the abstract concept of "data reliability" into an immediate perceptual experience. High-integrity data (high CFI, low IVD) presents with bright, saturated luminosity. Compromised or uncertain data presents with desaturated, low-luminosity visual signals — intuitively communicating epistemic status without requiring explicit analytical engagement from the user.
        </InfoBox>
      </Section>
    </DocPage>
  );
}
