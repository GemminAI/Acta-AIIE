import { NavLink, useLocation } from "react-router";
const MONO = "'JetBrains Mono', monospace";

const NAV = [
  {
    section: "00. About",
    items: [
      { label: "About — Acta AIIE Protocol", sub: "Theoretical Foundation · SSRN 6419019", path: "/about" },
    ],
  },
  {
    section: "01. Protocol Standard",
    items: [
      { label: "Acta AIIE Protocol Definition", sub: "v1.0.0 — RATIFIED · Protocol Lineage", path: "/protocol/definition" },
      { label: "35TAG Schema Specification", sub: "v6.0.1", path: "/protocol/35tag-schema" },
      { label: "Mathematical Standardization of Narrative Intent", sub: "v4.1.1", path: "/protocol/mathematical-standardization" },
      { label: ".hxt Format", sub: "", path: "/protocol/hxt-format" },
    ],
  },
  {
    section: "02. RFC Series",
    items: [
      { label: "RFC Index", sub: "All RFCs · RFC-0001–0031", path: "/rfc" },
      { label: "RFC-0001: Delta Variance (ΔV)", sub: "RATIFIED", path: "/rfc/0001" },
      { label: "RFC-0002: PCE Detection", sub: "RATIFIED", path: "/rfc/0002" },
      { label: "RFC-0003: Graph Interaction Model", sub: "DRAFT", path: "/rfc/0003" },
      { label: "RFC-0004: Relaxation Dynamics", sub: "DRAFT", path: "/rfc/0004" },
      { label: "RFC-0005: T22 Entropy-Shift", sub: "RATIFIED", path: "/rfc/0005" },
      { label: "RFC-0006: QFOM", sub: "RATIFIED", path: "/rfc/0006" },
      { label: "RFC-0007: MIFT", sub: "STABLE", path: "/rfc/0007" },
      { label: "RFC-0008: PNLA", sub: "STABLE", path: "/rfc/0008" },
      { label: "RFC-0009: Narrative Curvature", sub: "STABLE", path: "/rfc/0009" },
      { label: "RFC-0010: QNE", sub: "HYPOTHESIS", path: "/rfc/0010" },
      { label: "RFC-0011: Narrative Field Control", sub: "DRAFT", path: "/rfc/0011" },
      { label: "RFC-0012: Control Governance Layer", sub: "DRAFT", path: "/rfc/0012" },
      { label: "RFC-0013: Narrative Identity", sub: "DRAFT", path: "/rfc/0013" },
      { label: "RFC-0014: Reality Selection", sub: "DRAFT", path: "/rfc/0014" },
      { label: "RFC-0015: JCS Canonical Hashing", sub: "RATIFIED", path: "/rfc/0015" },
      { label: "RFC-0016: Continuous Dynamics", sub: "RATIFIED", path: "/rfc/0016" },
      { label: "RFC-0017: LINK+ Relational Laws", sub: "RATIFIED", path: "/rfc/0017" },
      { label: "RFC-0018: CFI Semantic Distance", sub: "RATIFIED", path: "/rfc/0018" },
      { label: "RFC-0019: TAG↔NL Compiler", sub: "RATIFIED", path: "/rfc/0019" },
      { label: "RFC-0020: Evidence Field", sub: "RATIFIED", path: "/rfc/0020" },
      { label: "RFC-0021: EGEM", sub: "RATIFIED", path: "/rfc/0021" },
      { label: "RFC-0022: CDR Repair", sub: "RATIFIED", path: "/rfc/0022" },
      { label: "RFC-0023: Π Projection", sub: "RATIFIED", path: "/rfc/0023" },
      { label: "RFC-0024: Valency", sub: "RATIFIED", path: "/rfc/0024" },
      { label: "RFC-0025: Diagnostics", sub: "RATIFIED", path: "/rfc/0025" },
      { label: "RFC-0026: Projection Operator Π", sub: "STABLE", path: "/rfc/0026" },
      { label: "RFC-0027: Proto-Structure Learning", sub: "DRAFT", path: "/rfc/0027" },
      { label: "RFC-0028: LoRA Lens", sub: "STABLE", path: "/rfc/0028" },
      { label: "RFC-0029: Movement Algebra", sub: "STABLE", path: "/rfc/0029" },
      { label: "RFC-0030: Semantic Groupoid", sub: "STABLE", path: "/rfc/0030" },
      { label: "RFC-0031: Information Geometry", sub: "DRAFT", path: "/rfc/0031" },
    ],
  },
  {
    section: "03. Whitepapers",
    items: [
      { label: "Whitepapers Index", sub: "Overview", path: "/whitepapers" },
      { label: "Narrative Quantification as Cognitive Infrastructure", sub: "WP-1 v1.1", path: "/whitepapers/narrative-quantification" },
      { label: "Narrative Observation", sub: "WP-3 v1.3", path: "/whitepapers/narrative-observation" },
      { label: "QMNSO v3.1 — Narrative Quantum Mechanics", sub: "NarrativeQM3 · peer-review", path: "/whitepapers/narrative-qm3" },
      { label: "From Probabilistic Generation to Physical Reasoning", sub: "Working Paper · NOMOS", path: "/whitepapers/nomos-physical-reasoning" },
      { label: "SCMT Inter-Rater Validation", sub: "EXP-001 · κ = 1.000", path: "/whitepapers/scmt-validation-exp001" },
    ],
  },
  {
    section: "04. SDK / Implementations",
    items: [
      { label: "Acta AIIE JCS SDK", sub: "Crystallization Engine v1.0", path: "/sdk/crystallization-engine" },
      { label: "Organization Structure", sub: "Repository Index", path: "/org/structure" },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside
      style={{
        width: "280px",
        minWidth: "280px",
        background: "#070a0d",
        borderRight: "1px solid #1a2530",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        zIndex: 50,
      }}
    >
      {/* Logo Header */}
      <NavLink
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "20px 24px",
          borderBottom: "1px solid #1a2530",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            flexShrink: 0,
            border: "1px solid #1a2530",
            padding: "4px",
            background: "#080c10",
          }}
        >
          <svg viewBox="0 0 28 28" fill="none" style={{ width: "100%", height: "100%" }}>
            <rect x="1" y="1" width="26" height="26" stroke="#2d4455" strokeWidth="1" />
            <line x1="1" y1="14" x2="27" y2="14" stroke="#2d4455" strokeWidth="1" />
            <line x1="14" y1="1" x2="14" y2="27" stroke="#2d4455" strokeWidth="1" />
            <circle cx="14" cy="14" r="4" stroke="#38bdf8" strokeWidth="1" fill="none" />
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: MONO, fontSize: "12px", fontWeight: 600, color: "#ffffff", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Acta AIIE
          </div>
          <div style={{ fontFamily: MONO, fontSize: "9px", color: "#2d4455", letterSpacing: "0.05em", marginTop: "2px" }}>
            Documentation Portal
          </div>
        </div>
      </NavLink>

      {/* Navigation */}
      <nav
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "8px 0",
          scrollbarWidth: "thin",
          scrollbarColor: "#1a2530 transparent",
        }}
      >
        {NAV.map((group) => (
          <div key={group.section} style={{ marginBottom: "4px" }}>
            <div style={{ fontFamily: MONO, fontSize: "8px", fontWeight: 600, color: "#2d4455", letterSpacing: "0.14em", textTransform: "uppercase", padding: "12px 24px 6px" }}>
              {group.section}
            </div>
            {group.items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    borderLeft: `2px solid ${isActive ? "#38bdf8" : "transparent"}`,
                    background: isActive ? "rgba(56,189,248,0.04)" : "transparent",
                    transition: "all 0.1s ease",
                  }}
                >
                  <div style={{ padding: "8px 24px 8px 22px" }}>
                    <div style={{ fontFamily: MONO, fontSize: "11px", fontWeight: isActive ? 500 : 400, color: isActive ? "#38bdf8" : "#6b8090", lineHeight: 1.5, letterSpacing: "0.01em" }}>
                      {item.label}
                    </div>
                    <div style={{ fontFamily: MONO, fontSize: "9px", color: isActive ? "#1e7baf" : "#2d4455", marginTop: "2px", letterSpacing: "0.04em" }}>
                      {item.sub}
                    </div>
                  </div>
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: "14px 24px", borderTop: "1px solid #1a2530" }}>
        <div style={{ fontFamily: MONO, fontSize: "8px", color: "#2d4455", letterSpacing: "0.06em" }}>
          AIIE Protocol v1.0.0 · RFC 8785 Compliant
        </div>
        <div style={{ fontFamily: MONO, fontSize: "8px", color: "#1a2f40", marginTop: "3px", letterSpacing: "0.04em" }}>
          © Acta AIIE Standardization Committee
        </div>
      </div>
    </aside>
  );
}
