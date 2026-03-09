import { DocHeader } from "../components/DocHeader";
import { DocPage, Section, SectionTitle, Body, InlineCode, InfoBox } from "../components/DocPage";
import { NavLink } from "react-router";

const MONO = "'JetBrains Mono', monospace";

const REPOS = [
  {
    name: "spec",
    fullName: "Acta-AIIE / spec",
    description: "AIIE Protocol 24TAG Schema (v4.1.0) — The canonical specification repository.",
    docPath: "/protocol/24tag-schema",
    docLabel: "AIIE Protocol 24TAG Schema Specification",
    tags: ["Protocol Standard", "RFC 8785", "JSON Schema"],
    status: "Active",
    version: "v4.1.0",
  },
  {
    name: "whitepapers",
    fullName: "Acta-AIIE / whitepapers",
    description: "Research whitepapers: Narrative Quantification as Cognitive Infrastructure, Narrative Observation, and The AIIE Protocol Standard.",
    docPath: "/whitepapers",
    docLabel: "Whitepapers Index",
    tags: ["Research", "Whitepaper", "Theory"],
    status: "Active",
    version: "WP-3",
  },
  {
    name: "jcs-sdk",
    fullName: "Acta-AIIE / jcs-sdk",
    description: "Multi-language JCS normalization library — the reference implementation of the Crystallization Engine.",
    docPath: "/sdk/crystallization-engine",
    docLabel: "Acta AIIE JCS SDK Documentation",
    tags: ["SDK", "Python", "TypeScript", "RFC 8785"],
    status: "v1.0.0 Candidate",
    version: "v1.0.0",
  },
];

export function OrgStructure() {
  return (
    <DocPage>
      <DocHeader
        title="Acta AIIE — Organization Structure"
        subtitle="GitHub organization layout and primary repository index for the AIIE Protocol ecosystem."
        status="Active"
        version="Index"
        editor="Acta AIIE Standardization Committee"
        docId="AIIE-ORG-001"
        compliance="RFC 8785"
      />

      <Section num="1.0">
        <SectionTitle>Organization Overview</SectionTitle>
        <Body>
          The Acta AIIE GitHub Organization hosts all canonical repositories for the AIIE Protocol ecosystem. The organization is structured to separate concerns clearly: specification, research, and implementation are maintained in distinct repositories, each with its own versioning lifecycle.
        </Body>
        <InfoBox>
          Organization Name: <InlineCode>Acta-AIIE</InlineCode> — All repositories within this organization are maintained by the Acta AIIE Standardization Committee and follow the protocol versioning conventions defined in AIIE-SPEC-001.
        </InfoBox>
      </Section>

      <Section num="2.0">
        <SectionTitle>Primary Repositories</SectionTitle>

        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "#1a2530" }}>
          {REPOS.map((repo) => (
            <div
              key={repo.name}
              style={{
                border: "none",
                background: "#080c10",
              }}
            >
              {/* Repo Header */}
              <div
                style={{
                  padding: "12px 18px",
                  borderBottom: "1px solid #1a2530",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {/* Git icon */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3d5a72" strokeWidth="1.5">
                    <circle cx="18" cy="18" r="3" />
                    <circle cx="6" cy="6" r="3" />
                    <circle cx="6" cy="18" r="3" />
                    <path d="M6 9v6M9 6h6M15.5 7.5l-9 9" />
                  </svg>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: "12px",
                      color: "#5a9ab8",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {repo.fullName}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: "9px",
                      color: "#2d4455",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {repo.version}
                  </span>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: "8px",
                      color: "#38bdf8",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "2px 6px",
                      border: "1px solid rgba(56,189,248,0.3)",
                    }}
                  >
                    {repo.status}
                  </span>
                </div>
              </div>

              {/* Repo Body */}
              <div style={{ padding: "16px 18px" }}>
                <p
                  style={{
                    fontFamily: MONO,
                    fontSize: "12px",
                    color: "#5a7a8e",
                    lineHeight: 1.85,
                    marginBottom: "14px",
                    letterSpacing: "0.01em",
                  }}
                >
                  {repo.description}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", gap: "1px", flexWrap: "wrap", marginBottom: "14px", background: "#1a2530" }}>
                  {repo.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: MONO,
                        fontSize: "8px",
                        color: "#3d5a72",
                        letterSpacing: "0.06em",
                        padding: "3px 8px",
                        border: "none",
                        background: "#070a0d",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link to doc */}
                <NavLink
                  to={repo.docPath}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontFamily: MONO,
                    fontSize: "11px",
                    color: "#38bdf8",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                  }}
                >
                  <span>→</span>
                  <span>{repo.docLabel}</span>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section num="3.0">
        <SectionTitle>Repository Versioning Convention</SectionTitle>
        <Body>
          All repositories within the Acta AIIE organization follow semantic versioning (MAJOR.MINOR.PATCH). Protocol specifications use the MAJOR version to indicate breaking schema changes. The current canonical protocol version is <InlineCode>4.1.0</InlineCode>.
        </Body>
        <Body>
          SDK implementations track the protocol specification version they implement. A JCS SDK marked <InlineCode>v1.0.0</InlineCode> implements the <InlineCode>4.1.x</InlineCode> protocol specification. Minor SDK updates (bug fixes, performance improvements) do not change the protocol version they target.
        </Body>
        <InfoBox accent>
          Governance Note: Changes to the core 24TAG schema require formal review by the Acta AIIE Standardization Committee and must be accompanied by an updated set of selftest vectors in <InlineCode>selftest_vectors.json</InlineCode>. Backward-incompatible changes increment the MAJOR protocol version.
        </InfoBox>
      </Section>
    </DocPage>
  );
}
