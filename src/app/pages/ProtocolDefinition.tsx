import { NavLink } from "react-router";
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
  CodeBlock,
} from "../components/DocPage";

const MONO = "'JetBrains Mono', monospace";
const SSRN_URL = "https://ssrn.com/abstract=6419019";
const SPEC_HREF =
  "https://github.com/GemminAI/Acta-AIIE/blob/main/specs/Acta_AIIE_Protocol_Definition_v1.0.0.md";

const HASH_FORMULA = `state_hash = SHA256( JCS( T01, …, T24, T26, …, T34 ) )

Preimage:  TAG 01–34  ∖  { state_hash }   (TAG 25 excluded)
Postimage: TAG 35 (worldline_optimization) excluded — NOT part of T25 payload
Algorithm: SHA-256  ·  Normalization: RFC 8785 JCS
Key sort:  UTF-16 lexicographic order
Numbers:   ECMA-262 shortest decimal representation`;

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

interface LineageRowProps {
  epoch: string;
  version: string;
  tagCount: string;
  status: string;
  title: string;
  bullets: string[];
  ssrnRef?: boolean;
  isCurrent?: boolean;
}

function LineageRow({
  epoch,
  version,
  tagCount,
  status,
  title,
  bullets,
  ssrnRef,
  isCurrent,
}: LineageRowProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "140px 1fr",
        gap: "1px",
        background: "#1a2530",
        marginBottom: "1px",
      }}
    >
      {/* Era column */}
      <div
        style={{
          background: isCurrent ? "rgba(56,189,248,0.06)" : "#070a0d",
          padding: "18px 14px",
          borderLeft: isCurrent ? "2px solid #38bdf8" : "2px solid #1a2530",
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: "8px",
            color: "#2d4455",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: "5px",
          }}
        >
          {epoch}
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: "12px",
            fontWeight: 600,
            color: isCurrent ? "#38bdf8" : "#5a7a8e",
            marginBottom: "4px",
            letterSpacing: "0.02em",
          }}
        >
          {version}
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: "9px",
            color: "#3d5a72",
            marginBottom: "4px",
          }}
        >
          {tagCount}
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: "8px",
            color: isCurrent ? "#38bdf8" : "#2d4455",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "2px 6px",
            border: `1px solid ${isCurrent ? "rgba(56,189,248,0.3)" : "#1a2530"}`,
            display: "inline-block",
          }}
        >
          {status}
        </div>
      </div>

      {/* Content column */}
      <div style={{ background: "#080c10", padding: "18px 20px" }}>
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
          {title}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: ssrnRef ? "12px" : "0" }}>
          {bullets.map((b, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: "9px",
                  color: "#38bdf8",
                  flexShrink: 0,
                  marginTop: "3px",
                }}
              >
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
                {b}
              </span>
            </div>
          ))}
        </div>
        {ssrnRef && (
          <div
            style={{
              marginTop: "10px",
              padding: "8px 12px",
              border: "1px solid #1a2530",
              background: "#050810",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontFamily: MONO,
                fontSize: "8px",
                color: "#2d4455",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Mathematical Origin
            </span>
            <ExternalLink href={SSRN_URL}>
              SSRN Abstract ID: 6419019 ↗
            </ExternalLink>
          </div>
        )}
      </div>
    </div>
  );
}

export function ProtocolDefinition() {
  return (
    <DocPage>
      <DocHeader
        title="Acta AIIE Protocol Definition"
        subtitle="Constitutional specification for the AIIE Protocol — v1.0.0 RATIFIED. Theoretical lineage from SSRN 6419019 (24TAG) to 35TAG v6.x."
        status="RATIFIED"
        version="v1.0.0"
        editor="Acta AIIE Standardization Committee"
        compliance="RFC 8785 / JCS"
        docId="AIIE-SPEC-001"
      />

      {/* ── §1 Constitutional Status ──────────── */}
      <Section num="1.0">
        <SectionTitle>Constitutional Status</SectionTitle>
        <Body>
          The Acta AIIE Protocol Definition (v1.0.0) is the ratified constitutional document
          governing the AIIE Protocol ecosystem. It defines the separation between specification
          and implementation, the versioning authority, and the non-negotiable crystallization
          compliance requirements that all implementations must satisfy.
        </Body>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "8px" }}>
          <a
            href={SPEC_HREF}
            target="_blank"
            rel="noopener noreferrer"
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
            Full Spec on GitHub ↗
          </a>
          <NavLink
            to="/about#theoretical-foundation"
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
            Theoretical Foundation →
          </NavLink>
        </div>
      </Section>

      <Divider />

      {/* ── §2 Protocol Lineage ───────────────── */}
      <Section num="2.0" id="protocol-lineage">
        <SectionTitle>Protocol Lineage</SectionTitle>
        <Body>
          The AIIE Protocol has evolved through two major architectural eras. The theoretical
          foundation was established by the peer-reviewed crystallization model in{" "}
          <ExternalLink href={SSRN_URL}>
            SSRN Abstract ID: 6419019
          </ExternalLink>
          , which mathematically proved that global narrative states can be deterministically
          sealed. All subsequent versions preserve this invariant while extending the schema
          into full thermodynamic completeness.
        </Body>

        {/* Lineage table */}
        <div style={{ margin: "20px 0 8px" }}>
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
            Figure 1 — Protocol Version History · AIIE-SPEC-001
          </div>

          <LineageRow
            epoch="Legacy"
            version="v1.x"
            tagCount="24TAG"
            status="Archived"
            title="Deterministic Crystallization Model"
            ssrnRef
            bullets={[
              "Mathematical basis: SSRN Abstract ID 6419019 — Narrative Crystallization: A Deterministic Framework for Measuring Global Narrative States",
              "24-field schema (Categories I–VI): Identification → Dynamics → Bias → Impact → Content → Immutability",
              "Epistemic state classified as deterministic enum: Crystallized | Diffused | Polarized (CDC detection)",
              "state_hash = SHA-256( JCS( TAG 01–24 ) ) — first cryptographic cognitive seal",
              "Proved: identical narrative inputs yield identical, reproducible 64-char hex state_hash across all environments",
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
            <span
              style={{
                fontFamily: MONO,
                fontSize: "9px",
                color: "#2d4455",
                letterSpacing: "0.08em",
              }}
            >
              ↓  thermodynamic extension  ↓  QFOM + PNLA integration
            </span>
          </div>

          <LineageRow
            epoch="Current"
            version="v6.x"
            tagCount="35TAG"
            status="Ratified"
            title="T35 v2 Thermodynamic Engine — QFOM + PNLA"
            isCurrent
            bullets={[
              "35-field schema (Categories I–X): extends 24TAG base with Kinetics (TAGs 26–28), Memory (29–30), Meta-Cognition (31–34), Reality Selection (35)",
              "T22 migration (RFC-0005): epistemic_diffusion_state (enum) → informational_entropy H₀ ∈ [0,1] — continuous thermodynamic quantity",
              "QFOM (RFC-0006): object_entity modeled as interference image I(x) = |Ψ_total|² — narrative superposition before crystallization",
              "PNLA (RFC-0008): trajectory selection minimizes time-integral ∫dτ of Regret × ΔV — Principle of Narrative Least Action",
              "TAG 35 worldline_optimization: final reality closure, excluded from T25 JCS preimage",
              "state_hash preimage extended: SHA-256( JCS( TAG 01–34 ∖ {state_hash} ) ) — RFC 8785 compliant",
            ]}
          />
        </div>

        <InfoBox accent>
          <strong style={{ fontFamily: MONO, fontSize: "12px", color: "#38bdf8", fontWeight: 600 }}>
            Crystallization Invariant:
          </strong>{" "}
          The <InlineCode>state_hash</InlineCode> generation logic is theoretically grounded in
          the deterministic crystallization model proven in SSRN 6419019. The extension from 24TAG
          to 35TAG does not alter this invariant — it expands the preimage domain from TAG 01–24
          to TAG 01–34 (excluding <InlineCode>state_hash</InlineCode> itself), while preserving
          the RFC 8785 JCS normalization contract. Any implementation that diverges from this
          formula is non-compliant, regardless of other merits.
        </InfoBox>
      </Section>

      <Divider />

      {/* ── §3 state_hash Generation ─────────── */}
      <Section num="3.0">
        <SectionTitle>state_hash Generation — Normative Formula</SectionTitle>
        <Body>
          The <InlineCode>state_hash</InlineCode> (TAG 25) is the{" "}
          <strong style={{ fontFamily: MONO, color: "#c8d4e0" }}>Base Reality Anchor</strong> of
          every AIIE Protocol record. Its correctness is non-negotiable: a mismatch constitutes
          either tampering or non-compliant serialization.
        </Body>

        <CodeBlock lang="state_hash · Normative Formula · RFC 8785 / JCS">{HASH_FORMULA}</CodeBlock>

        <SubsectionTitle>3.1 Academic Grounding (SSRN 6419019)</SubsectionTitle>
        <Body>
          The cryptographic determinism of the <InlineCode>state_hash</InlineCode> is not an
          arbitrary engineering choice — it is the operationalization of{" "}
          <strong style={{ fontFamily: MONO, color: "#c8d4e0" }}>
            結晶化 (Crystallization)
          </strong>
          , as proven in{" "}
          <ExternalLink href={SSRN_URL}>
            SSRN Abstract ID: 6419019
          </ExternalLink>
          . The paper demonstrated that:
        </Body>
        <BulletList
          items={[
            {
              label: "Narrative Determinism",
              content:
                "A given set of structured narrative fields (now TAG 01–34) uniquely and reproducibly maps to a single canonical hash — regardless of the implementation language, operating system, or time of computation.",
            },
            {
              label: "Divergence as Signal",
              content:
                "Two hash values over the same real-world event objectively represent Narrative Rifts — measurable 認知不協和 (Cognitive Dissonance — CDC). The CFI penalty (TAG 19) quantifies this as a repulsive force in the T35 engine.",
            },
            {
              label: "RFC 8785 as Crystallization Medium",
              content:
                "JCS normalization (UTF-16 key sort, ECMA-262 numerics) is the physical mechanism that eliminates all serialization degrees of freedom, ensuring the hash reflects only narrative semantics — not representation artifacts.",
            },
          ]}
        />

        <SubsectionTitle>3.2 Compliance Requirements</SubsectionTitle>
        <Body>
          All implementations touching <InlineCode>state_hash</InlineCode> generation must satisfy
          every item below. A pull request that breaks any of these is rejected regardless of
          other merits.
        </Body>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1px",
            background: "#1a2530",
            border: "1px solid #1a2530",
            margin: "16px 0",
          }}
        >
          {[
            { n: "C-1", t: "Selftest Vectors", d: "Pass all 49 vectors in sdk/selftest_vectors.json" },
            { n: "C-2", t: "Official Hash", d: "Output matches 3a5a3a9d1b13367621b5b34cc25a0d886a7da39ef91015a3f757ae37908602b8" },
            { n: "C-3", t: "UTF-16 Key Sort", d: "JSON keys sorted in UTF-16 code unit order (not lexicographic byte order)" },
            { n: "C-4", t: "ECMA-262 Numerics", d: "IEEE 754 floats serialized as shortest decimal representation" },
            { n: "C-5", t: "Error on NaN/Infinity", d: "Raise explicit error — do not silently handle or substitute" },
            { n: "C-6", t: "self-exclusion", d: "state_hash (T25) strictly excluded from its own SHA-256 input" },
          ].map((r) => (
            <div key={r.n} style={{ background: "#070a0d", padding: "12px 14px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "5px",
                }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: "8px",
                    color: "#38bdf8",
                    letterSpacing: "0.1em",
                    padding: "1px 5px",
                    border: "1px solid rgba(56,189,248,0.25)",
                  }}
                >
                  {r.n}
                </span>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: "9px",
                    color: "#8098ae",
                    fontWeight: 600,
                  }}
                >
                  {r.t}
                </span>
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: "10px",
                  color: "#4a6070",
                  lineHeight: 1.6,
                  letterSpacing: "0.01em",
                }}
              >
                {r.d}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* ── §4 Spec / SDK Separation ──────────── */}
      <Section num="4.0">
        <SectionTitle>Specification / Implementation Separation</SectionTitle>
        <BulletList
          items={[
            {
              label: "specs/",
              content:
                "Protocol rules. Changes here affect all compliant implementations worldwide. A contribution to specs/ is a protocol change.",
            },
            {
              label: "sdk/",
              content:
                "Reference implementation by Gemmina Intelligence LLC. Other implementations may differ in technology stack but must produce identical state_hash outputs.",
            },
            {
              label: "rfc/",
              content:
                "RFC-0001 through RFC-0015 extend the protocol. RATIFIED RFCs are normative. DRAFT and STABLE are informational pending ratification.",
            },
          ]}
        />
        <InfoBox>
          Version Bump Rule: Any change that alters the <InlineCode>state_hash</InlineCode> output
          for an existing valid record is a <strong style={{ fontFamily: MONO, color: "#c8d4e0" }}>MAJOR</strong>{" "}
          version increment. New TAG additions without hash-impact are MINOR. Documentation fixes
          are PATCH.
        </InfoBox>
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
          AIIE-SPEC-001 · v1.0.0 RATIFIED · Acta AIIE Standardization Committee · RFC 8785 Compliant
        </div>
        <div style={{ fontFamily: MONO, fontSize: "8px", color: "#1e3040", letterSpacing: "0.06em" }}>
          © 2026 Gemmina Intelligence LLC.
        </div>
      </div>
    </DocPage>
  );
}
