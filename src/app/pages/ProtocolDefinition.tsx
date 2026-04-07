import { Link } from "react-router";

const MONO = "'JetBrains Mono', monospace";
const SPEC_HREF =
  "https://github.com/GemminAI/Acta-AIIE/blob/main/specs/Acta_AIIE_Protocol_Definition_v1.0.0.md";

/** Portal landing for v1.0.0 constitution; full text lives in the repository spec file. */
export function ProtocolDefinition() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 56px 100px", width: "100%" }}>
      <div
        style={{
          border: "1px solid #1a2530",
          padding: "40px 40px 36px",
          background: "#070a0d",
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: "9px",
            color: "#2d4455",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Acta AIIE · Protocol Standard
        </div>
        <h1
          style={{
            fontFamily: MONO,
            fontSize: "22px",
            fontWeight: 600,
            color: "#ffffff",
            letterSpacing: "-0.01em",
            lineHeight: 1.25,
            marginBottom: "16px",
          }}
        >
          Acta AIIE Protocol Definition
        </h1>
        <p style={{ fontFamily: MONO, fontSize: "11px", color: "#6b8090", lineHeight: 1.9, margin: "0 0 20px" }}>
          v1.0.0 — RATIFIED. The canonical mathematical specification is maintained in the
          repository as Markdown. This page will host an in-portal render in a future release.
        </p>
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
          Open spec on GitHub ↗
        </a>
        <div style={{ marginTop: "24px" }}>
          <Link
            to="/"
            style={{ fontFamily: MONO, fontSize: "9px", color: "#3d5a72", textDecoration: "none" }}
          >
            ← Home
          </Link>
        </div>
      </div>
    </div>
  );
}
