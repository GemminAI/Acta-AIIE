import { NavLink } from "react-router";
import { DocHeader } from "../components/DocHeader";
import { DocPage, Section, SectionTitle, Body, Divider } from "../components/DocPage";

const MONO = "'JetBrains Mono', monospace";

const PAPERS = [
  {
    num: "WP-1",
    path: "/whitepapers/narrative-quantification",
    title: "Narrative Quantification as Cognitive Infrastructure",
    version: "v1.1",
    status: "Refined",
    author: "Tomohiko Nakamura (Founder, Gemmina Intelligence LLC)",
    thesis: "Definition of the theoretical foundation for the protocol.",
    abstract:
      "Focuses on the human cognitive trait of interpreting events as 'Narratives' rather than isolated data points. Proposes a framework to convert these subjective structures into computable data.",
    keyTopics: [
      { label: "Narrative Compiler", content: "Defines the process of parsing narrative texts to extract Actors, Conflicts, and Causality, converting them into structured Cognitive Data." },
      { label: "Large Cognitive Model (LCM)", content: "An AI architecture that transcends probabilistic token prediction (LLM) to perform reasoning upon structured narrative representations." },
    ],
    hash: "3a5a3a9d1b13367621b5b34cc25a0d886a7da39ef91015a3f757ae37908602b8",
  },
  {
    num: "WP-2",
    path: "/protocol/mathematical-standardization",
    title: "The AIIE Protocol Standard (v4.1.0)",
    version: "v4.1.1",
    status: "Refined",
    author: "Acta AIIE Standardization Committee",
    thesis: "Definition of data structures and the specifications for 'Crystallization.'",
    abstract:
      "Rigorous technical definition of the 24TAG schema, the Physics of Information mapping, JCS Crystallization Engine, and CFI Score — the complete mathematical architecture of the AIIE Protocol.",
    keyTopics: [
      { label: "24TAG Definition", content: "Rigorous definition of structured fields across five categories: Identification, Dynamics, Bias, Spillover Risk, and Expression." },
      { label: "JCS Crystallization Engine", content: "Mathematical proof of immutability using SHA-256 and the 25th Tag: state_hash, compliant with RFC 8785." },
      { label: "CFI Score", content: "A metric that automatically detects contradictions between physical evidence and narrative claims." },
    ],
    hash: "b7e2a1d4c9f3e8a2b5d0c7f4e9a3b6d1c8f5e2a9b4d7c0f3e6a1b8d5c2f9e4",
  },
  {
    num: "WP-3",
    path: "/whitepapers/narrative-observation",
    title: "Narrative Observation: Cross-Domain Correlation and Information Voids",
    version: "v1.3",
    status: "Final Polish",
    author: "Gemmina Intelligence LLC.",
    thesis: "Definition of methodologies for measuring and communicating informational 'Distortion.'",
    abstract:
      "A methodology for quantifying the collisions and distribution of information within a social system, utilizing physical analogies to maintain mathematical rigor.",
    keyTopics: [
      { label: "CDC (Pressure Difference) Logic", content: "A mathematical model that calculates the semantic distance between narratives from different domains as a physical energy differential." },
      { label: "IVD (Information Void Density)", content: "An analytical method to highlight 'Strategic Silence' — what specific powers intentionally omit." },
      { label: "Integrity-Driven UI", content: "Interface requirements utilizing audit_aura (color and luminosity) to intuitively convey data purity." },
    ],
    hash: "c4d8f2a6e1b9c3f7a2d5e8b4c0f6a3d9e2b7c1f4a8d3e6b0c5f2a7d4e9b3c8",
  },
];

export function WhitepapersIndex() {
  return (
    <DocPage>
      <DocHeader
        title="Whitepapers — Research Index"
        subtitle="A structured index of all research whitepapers published under the Acta AIIE framework."
        status="Active"
        version="Index"
        editor="Acta AIIE Standardization Committee"
        docId="AIIE-WP-INDEX"
        compliance="RFC 8785"
      />

      <Section num="0.0">
        <SectionTitle>Overview</SectionTitle>
        <Body>
          The Acta AIIE research corpus comprises three foundational whitepapers that together define the theoretical, technical, and methodological framework of the AIIE Protocol. Each paper builds upon the others, forming a coherent intellectual architecture from cognitive theory to cryptographic implementation.
        </Body>
      </Section>

      <Divider />

      {PAPERS.map((paper, i) => (
        <div key={paper.num} style={{ marginBottom: "40px" }}>
          {/* Paper Card */}
          <div
            style={{
              border: "1px solid #1a2530",
              background: "#080c10",
            }}
          >
            {/* Card Header */}
            <div
              style={{
                padding: "12px 18px",
                borderBottom: "1px solid #1a2530",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: "9px",
                    color: "#3d5a72",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "3px 8px",
                    border: "1px solid #1a2530",
                  }}
                >
                  {paper.num}
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: "9px",
                    color: "#2d4455",
                    letterSpacing: "0.03em",
                  }}
                >
                  {paper.version}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "3px 8px",
                  border: "1px solid rgba(56,189,248,0.3)",
                }}
              >
                <div
                  style={{
                    width: "4px",
                    height: "4px",
                    background: "#38bdf8",
                    borderRadius: "50%",
                  }}
                />
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: "8px",
                    color: "#38bdf8",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {paper.status}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div style={{ padding: "20px" }}>
              <NavLink
                to={paper.path}
                style={{
                  fontFamily: MONO,
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#ffffff",
                  textDecoration: "none",
                  lineHeight: 1.45,
                  display: "block",
                  marginBottom: "8px",
                  letterSpacing: "0.0em",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#38bdf8"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
              >
                {paper.title}
              </NavLink>

              <div
                style={{
                  fontFamily: MONO,
                  fontSize: "10px",
                  color: "#3d5a72",
                  letterSpacing: "0.02em",
                  marginBottom: "14px",
                }}
              >
                Core Thesis: {paper.thesis}
              </div>

              <p
                style={{
                  fontFamily: MONO,
                  fontSize: "12px",
                  color: "#5a7a8e",
                  lineHeight: 1.85,
                  marginBottom: "16px",
                  letterSpacing: "0.01em",
                }}
              >
                {paper.abstract}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1px", marginBottom: "16px", background: "#1a2530" }}>
                {paper.keyTopics.map((topic) => (
                  <div
                    key={topic.label}
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "flex-start",
                      padding: "8px 12px",
                      background: "#070a0d",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: "9px",
                        color: "#38bdf8",
                        flexShrink: 0,
                        marginTop: "3px",
                      }}
                    >
                      →
                    </span>
                    <div>
                      <span
                        style={{
                          fontFamily: MONO,
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#5a9ab8",
                          marginRight: "6px",
                          letterSpacing: "0.01em",
                        }}
                      >
                        {topic.label}:
                      </span>
                      <span
                        style={{
                          fontFamily: MONO,
                          fontSize: "11px",
                          color: "#4a6070",
                          letterSpacing: "0.01em",
                        }}
                      >
                        {topic.content}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hash + Author */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  paddingTop: "12px",
                  borderTop: "1px solid #1a2530",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: "8px",
                      color: "#2d4455",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: "3px",
                    }}
                  >
                    Author
                  </div>
                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: "11px",
                      color: "#5a7a8e",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {paper.author}
                  </div>
                </div>
                {paper.hash && (
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontFamily: MONO,
                        fontSize: "8px",
                        color: "#2d4455",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: "3px",
                      }}
                    >
                      Canonical Hash
                    </div>
                    <div
                      style={{
                        fontFamily: MONO,
                        fontSize: "9px",
                        color: "#2d5a72",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {paper.hash.slice(0, 32)}…
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {i < PAPERS.length - 1 && <Divider />}
        </div>
      ))}
    </DocPage>
  );
}
