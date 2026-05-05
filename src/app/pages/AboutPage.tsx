import { DocHeader } from "../components/DocHeader";
import {
  DocPage,
  Section,
  SectionTitle,
  SubsectionTitle,
  Body,
  BulletList,
  InlineCode,
  InfoBox,
  Divider,
} from "../components/DocPage";
import { NavLink } from "react-router";

const MONO = "'JetBrains Mono', monospace";

const SSRN_URL = "https://ssrn.com/abstract=6419019";
const ORCID_URL = "https://orcid.org/0009-0005-5136-1218";

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontFamily: MONO,
        fontSize: "12px",
        color: "#38bdf8",
        textDecoration: "none",
        borderBottom: "1px solid rgba(56,189,248,0.25)",
      }}
    >
      {children}
    </a>
  );
}

function LineageNode({
  era,
  version,
  label,
  status,
  items,
  isCurrent,
}: {
  era: string;
  version: string;
  label: string;
  status: string;
  items: string[];
  isCurrent?: boolean;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr",
        gap: "1px",
        background: "#1a2530",
        marginBottom: "1px",
      }}
    >
      {/* Left: Era marker */}
      <div
        style={{
          background: isCurrent ? "rgba(56,189,248,0.06)" : "#070a0d",
          padding: "16px 14px",
          borderLeft: isCurrent ? "2px solid #38bdf8" : "2px solid #1a2530",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: "4px",
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: "8px",
            color: "#2d4455",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          {era}
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: "11px",
            fontWeight: 600,
            color: isCurrent ? "#38bdf8" : "#5a7a8e",
            letterSpacing: "0.02em",
          }}
        >
          {version}
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: "8px",
            color: isCurrent ? "#1e7baf" : "#2d4455",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {status}
        </div>
      </div>

      {/* Right: Content */}
      <div style={{ background: "#080c10", padding: "16px 18px" }}>
        <div
          style={{
            fontFamily: MONO,
            fontSize: "12px",
            fontWeight: 600,
            color: "#c8d4e0",
            marginBottom: "10px",
            letterSpacing: "0.01em",
          }}
        >
          {label}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <span style={{ fontFamily: MONO, fontSize: "9px", color: "#38bdf8", flexShrink: 0, marginTop: "3px" }}>
                ·
              </span>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: "11px",
                  color: "#5a7a8e",
                  lineHeight: 1.7,
                  letterSpacing: "0.01em",
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AboutPage() {
  return (
    <DocPage>
      <DocHeader
        title="About — Acta AIIE Protocol"
        subtitle="The official standardization repository for the AIIE Protocol and its theoretical foundations."
        status="Active"
        version="v6.0.1"
        editor="Acta AIIE Standardization Committee"
        compliance="RFC 8785 / JCS"
        docId="AIIE-ABOUT-001"
      />

      {/* ── §1 Overview ──────────────────────── */}
      <Section num="1.0">
        <SectionTitle>Overview</SectionTitle>
        <Body>
          The Acta AIIE Protocol is an open engineering standard for transforming narrative
          information into deterministic, cryptographically-sealed cognitive data structures.
          It is maintained by the{" "}
          <strong style={{ fontFamily: MONO, color: "#c8d4e0" }}>
            Acta AIIE Standardization Committee
          </strong>{" "}
          at Gemmina Intelligence LLC. and follows the governance model of IETF working groups:
          open discussion, with a designated authority holding the canonical specification.
        </Body>
        <Body>
          The current canonical standard is{" "}
          <NavLink
            to="/protocol/35tag-schema"
            style={{ fontFamily: MONO, fontSize: "13px", color: "#38bdf8", textDecoration: "none" }}
          >
            35TAG v6.0.1
          </NavLink>
          {" "}— a 35-dimensional structural schema integrating the T35 v2 Thermodynamic Engine,
          QFOM (Quantum-Formalism Observation Model), and PNLA (Principle of Narrative Least Action),
          sealed by a JCS/RFC 8785-compliant <InlineCode>state_hash</InlineCode>.
        </Body>
        <InfoBox>
          Governance: Changes to the core 35TAG schema require formal review by the Acta AIIE
          Standardization Committee. Hash-breaking modifications constitute a MAJOR version increment
          per the versioning convention defined in{" "}
          <NavLink
            to="/protocol/definition"
            style={{ fontFamily: MONO, fontSize: "12px", color: "#4a8fa8", textDecoration: "none" }}
          >
            CONTRIBUTING.md
          </NavLink>.
        </InfoBox>
      </Section>

      <Divider />

      {/* ── §2 Theoretical Foundation ─────────── */}
      <Section num="2.0" id="theoretical-foundation">
        <SectionTitle>Theoretical Foundation</SectionTitle>
        <Body>
          The mathematical underpinning of the Acta AIIE Protocol was established in the following
          peer-reviewed work, which serves as the{" "}
          <strong style={{ fontFamily: MONO, color: "#c8d4e0" }}>数理的原典 (mathematical archetype)</strong>{" "}
          of the entire specification lineage.
        </Body>

        {/* SSRN paper card */}
        <div
          style={{
            border: "1px solid #1a2530",
            borderLeft: "2px solid #38bdf8",
            background: "rgba(56,189,248,0.03)",
            padding: "20px 22px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: "8px",
              color: "#2d4455",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            Primary Academic Reference · SSRN Pre-Print · Abstract ID: 6419019
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: "14px",
              fontWeight: 600,
              color: "#ffffff",
              marginBottom: "8px",
              lineHeight: 1.4,
              letterSpacing: "0.005em",
            }}
          >
            <ExternalLink href={SSRN_URL}>
              Narrative Crystallization: A Deterministic Framework for Measuring Global Narrative States ↗
            </ExternalLink>
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: "11px",
              color: "#5a7a8e",
              marginBottom: "12px",
              letterSpacing: "0.01em",
            }}
          >
            Tomohiko Nakamura — Independent Researcher, Japan ·{" "}
            <ExternalLink href={ORCID_URL}>ORCID: 0009-0005-5136-1218</ExternalLink>
          </div>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {[
              { k: "Platform", v: "SSRN" },
              { k: "Abstract ID", v: "6419019" },
              { k: "Status", v: "Formally Approved" },
              { k: "Role in Protocol", v: "Mathematical Archetype" },
            ].map((m) => (
              <div key={m.k}>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: "8px",
                    color: "#2d4455",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "2px",
                  }}
                >
                  {m.k}
                </div>
                <div style={{ fontFamily: MONO, fontSize: "10px", color: "#5a9ab8" }}>
                  {m.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        <SubsectionTitle>2.1 The Crystallization Model — Original Contribution (24TAG)</SubsectionTitle>
        <Body>
          The SSRN paper established the foundational principle of{" "}
          <strong style={{ fontFamily: MONO, color: "#c8d4e0" }}>Narrative Crystallization</strong>
          {" "}— the deterministic reduction of multi-dimensional narrative states into a single,
          immutable <InlineCode>state_hash</InlineCode>. The original framework operated over a{" "}
          <strong style={{ fontFamily: MONO, color: "#c8d4e0" }}>24TAG structure</strong>, mapping
          narrative events to a crystallized base state through Categories I–VI (Identification,
          Dynamics, Bias, Impact, Content, and Immutability).
        </Body>
        <Body>
          Within this original model, the epistemic state of a narrative was classified via the
          deterministic enum <InlineCode>epistemic_diffusion_state</InlineCode> (
          <InlineCode>Crystallized</InlineCode> / <InlineCode>Diffused</InlineCode> /{" "}
          <InlineCode>Polarized</InlineCode>), providing the first mathematically rigorous
          language for describing{" "}
          <strong style={{ fontFamily: MONO, color: "#c8d4e0" }}>認知不協和 (Cognitive Dissonance — CDC)</strong>
          {" "}within a narrative information field.
        </Body>

        <SubsectionTitle>2.2 Evolution to 35TAG — Thermodynamic Integration (v6.x)</SubsectionTitle>
        <Body>
          Grounded in the crystallization principles proven in SSRN 6419019, the current standard
          has evolved into a full thermodynamic engine. This evolution represents a principled
          extension — not a revision — of the original deterministic framework:
        </Body>

        {/* Lineage table */}
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: "8px",
              color: "#2d4455",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            Figure 1 — Protocol Theoretical Lineage · 24TAG → 35TAG
          </div>

          <LineageNode
            era="Legacy"
            version="v1.x · 24TAG"
            label="Deterministic Crystallization Model"
            status="Archived"
            items={[
              "Mathematical proof established in SSRN Abstract ID: 6419019",
              "24 structural fields (Categories I–VI): Identification → Immutability",
              "Deterministic state_hash via SHA-256 / JCS over TAG 01–24",
              "Epistemic state encoded as enum: Crystallized | Diffused | Polarized (CDC)",
              "Proved that narrative states can be uniquely and reproducibly sealed as a cryptographic hash",
            ]}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px 0",
              background: "#050810",
              border: "1px solid #1a2530",
              borderTop: "none",
              borderBottom: "none",
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: "9px", color: "#2d4455", letterSpacing: "0.08em" }}>
              ↓  thermodynamic extension  ↓
            </span>
          </div>

          <LineageNode
            era="Current"
            version="v6.x · 35TAG"
            label="T35 v2 Thermodynamic Engine + QFOM + PNLA"
            status="Ratified"
            isCurrent
            items={[
              "35 structural fields (Categories I–X): adds Kinetics, Memory, Meta-Cognition, Reality Selection",
              "T22: epistemic_diffusion_state (enum) superseded by informational_entropy H₀ ∈ [0,1] — RFC-0005",
              "QFOM (RFC-0006): object_entity modeled as Interference Image I(x) = |Ψ_total|² — quantum superposition",
              "PNLA (RFC-0008): Principle of Narrative Least Action — trajectory minimizes ∫dτ of Regret × ΔV",
              "TAG 35 worldline_optimization: final reality selection via time-integral closure — excluded from T25 preimage",
              "state_hash preimage: SHA-256( JCS( TAG 01–34 ∖ {state_hash} ) ) — RFC 8785 compliant",
            ]}
          />
        </div>

        <InfoBox accent>
          <strong style={{ fontFamily: MONO, fontSize: "12px", color: "#38bdf8", fontWeight: 600 }}>
            Compliance Note:
          </strong>{" "}
          The <InlineCode>state_hash</InlineCode> generation logic (JCS/RFC 8785) derives its
          theoretical legitimacy from the crystallization determinism proven in SSRN 6419019.
          Any implementation claiming protocol compliance must pass all 49 selftest vectors in{" "}
          <InlineCode>sdk/selftest_vectors.json</InlineCode> and reproduce the Official
          Implementation Hash: <InlineCode>3a5a3a9d…908602b8</InlineCode>.
        </InfoBox>
      </Section>

      <Divider />

      {/* ── §3 Design Principles ──────────────── */}
      <Section num="3.0">
        <SectionTitle>Design Principles</SectionTitle>
        <BulletList
          items={[
            {
              label: "結晶化 (Crystallization)",
              content:
                "Every narrative state can be reduced to a single, deterministic, reproducible state_hash. This is the invariant core principle inherited from SSRN 6419019 and preserved across all protocol versions.",
            },
            {
              label: "Thermodynamic Completeness",
              content:
                "The 35TAG schema tracks the full lifecycle of information: from base crystallization (TAGs 01–24) through kinetic prediction, memory adaptation, meta-cognition, and final worldline selection (TAG 35).",
            },
            {
              label: "認知不協和検出 (CDC — Cognitive Dissonance Detection)",
              content:
                "Divergence between two state_hash values over the same event constitutes a measurable Narrative Rift. The CFI (Conflict Factuality Index, TAG 19) quantifies this as a repulsive force in the T35 decision engine.",
            },
            {
              label: "Quantum-Formalism Observation (QFOM)",
              content:
                "Object entities emerge as interference patterns from superposed narrative wavefunctions — not pre-assigned labels. High informational_entropy H₀ (TAG 22) diffuses the image; low H₀ crystallizes it.",
            },
            {
              label: "RFC 8785 / JCS Determinism",
              content:
                "UTF-16 key sorting, ECMA-262 numeric serialization, and strict state_hash self-exclusion ensure that identical narrative inputs produce identical 64-character hex outputs across all compliant implementations.",
            },
          ]}
        />
      </Section>

      <Divider />

      {/* ── §4 Governance ────────────────────── */}
      <Section num="4.0">
        <SectionTitle>Governance & Standardization</SectionTitle>
        <Body>
          The Acta AIIE Protocol is governed by the{" "}
          <strong style={{ fontFamily: MONO, color: "#c8d4e0" }}>
            Acta AIIE Standardization Committee
          </strong>{" "}
          at Gemmina Intelligence LLC. The governance model follows IETF working group conventions:
          open contribution, formal RFC process, and a designated authority holding the pen on the
          official specification.
        </Body>
        <BulletList
          items={[
            {
              label: "specs/",
              content:
                "Protocol rules. Changes here affect all compliant implementations worldwide.",
            },
            {
              label: "sdk/",
              content:
                "Reference implementation by Gemmina Intelligence LLC. Other implementations may differ in technology stack but must produce identical state_hash outputs.",
            },
            {
              label: "rfc/",
              content:
                "RFC-0001 through RFC-0015 define protocol extensions. RATIFIED RFCs are normative; DRAFT and STABLE are informational.",
            },
          ]}
        />
        <div
          style={{
            marginTop: "24px",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <NavLink
            to="/protocol/definition"
            style={{
              fontFamily: MONO,
              fontSize: "10px",
              color: "#38bdf8",
              textDecoration: "none",
              letterSpacing: "0.06em",
              border: "1px solid rgba(56,189,248,0.35)",
              padding: "8px 14px",
              display: "inline-block",
            }}
          >
            Protocol Definition v1.0.0 →
          </NavLink>
          <NavLink
            to="/rfc"
            style={{
              fontFamily: MONO,
              fontSize: "10px",
              color: "#5a7a8e",
              textDecoration: "none",
              letterSpacing: "0.06em",
              border: "1px solid #1a2530",
              padding: "8px 14px",
              display: "inline-block",
            }}
          >
            RFC Index (RFC-0001–0015) →
          </NavLink>
          <a
            href={SSRN_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: MONO,
              fontSize: "10px",
              color: "#5a7a8e",
              textDecoration: "none",
              letterSpacing: "0.06em",
              border: "1px solid #1a2530",
              padding: "8px 14px",
              display: "inline-block",
            }}
          >
            SSRN #6419019 ↗
          </a>
        </div>
      </Section>

      {/* End seal */}
      <div
        style={{
          marginTop: "40px",
          paddingTop: "16px",
          borderTop: "1px solid #1a2530",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: "8px", color: "#1e3040", letterSpacing: "0.08em" }}>
          AIIE-ABOUT-001 · Acta AIIE Standardization Committee · RFC 8785 Compliant
        </div>
        <div style={{ fontFamily: MONO, fontSize: "8px", color: "#1e3040", letterSpacing: "0.06em" }}>
          © 2026 Gemmina Intelligence LLC.
        </div>
      </div>
    </DocPage>
  );
}
