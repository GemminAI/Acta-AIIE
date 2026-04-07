import { Link } from "react-router";
const MONO = "'JetBrains Mono', monospace";

const RFCS = [
  {
    id: "RFC-0001",
    title: "Standard Definition of Delta Variance (ΔV)",
    status: "RATIFIED",
    category: "Metric Specification",
    ref: "v1.0.0 §9 · NQ 2.0 §5.2",
    summary: "Defines ΔV as the canonical weighted L₂ distance between two 35TAG narrative states. Specifies the three-tier response table (Standard / Emerging Signal / Critical Divergence) and the mandatory Hesitation Protocol clause for ΔV ≥ 0.7.",
    path: "/rfc/0001",
    statusColor: "#38bdf8",
  },
  {
    id: "RFC-0002",
    title: "Thermodynamic PCE Detection",
    status: "RATIFIED",
    category: "Monitoring Specification",
    ref: "v1.0.0 §11 · NQ 2.0 §6.4",
    summary: "Formalizes Phase-Change Event detection via discontinuous variance jump: PCE_t ⟺ σ²_{t-1} < θ_floor ∧ σ²_t > θ_expand. Defines the two-step confirmation gate, trajectory velocity monitor, and Critical Structural Alert protocol.",
    path: "/rfc/0002",
    statusColor: "#38bdf8",
  },
  {
    id: "RFC-0003",
    title: "Narrative Graph Interaction Model",
    status: "DRAFT",
    category: "Protocol Specification",
    ref: "v1.0.0 · NQ 2.0",
    summary: "Defines the N×N complex interaction matrix ℐ_ij(t) = 𝒜_ij · exp(iφ_ij) · σ(ΔV_ij) for multi-actor narrative networks. Classifies three structural pathologies: Divergence, Resonance (echo chamber), and Phase Lag Lock.",
    path: "/rfc/0003",
    statusColor: "#f59e0b",
  },
  {
    id: "RFC-0004",
    title: "Narrative Relaxation Dynamics",
    status: "DRAFT",
    category: "Thermodynamic Specification",
    ref: "v1.0.0 §7, §11 · RFC-0002",
    summary: "Specifies post-PCE quenching conditions, Narrative Annealing via Boltzmann path integration, formation of a new s_core′ with T25 recomputation, and Power Realignment dynamics of the actor graph following a phase transition.",
    path: "/rfc/0004",
    statusColor: "#f59e0b",
  },
];

export function RFCIndex() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 56px 100px", width: "100%" }}>

      {/* Header bar */}
      <div style={{ borderBottom: "1px solid #1a2530", borderLeft: "1px solid #1a2530", borderRight: "1px solid #1a2530", padding: "10px 16px", background: "#050810", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <span style={{ fontFamily: MONO, fontSize: "9px", color: "#3d5a72", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Acta AIIE · RFC Series
          </span>
          <span style={{ fontFamily: MONO, fontSize: "9px", color: "#3d5a72", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Standard Track
          </span>
        </div>
        <span style={{ fontFamily: MONO, fontSize: "8px", color: "#3d5a72", letterSpacing: "0.1em" }}>
          Base: Acta AIIE Protocol v1.0.0
        </span>
      </div>

      {/* Title block */}
      <div style={{ border: "1px solid #1a2530", borderTop: "none", padding: "40px 40px 36px" }}>
        <div style={{ fontFamily: MONO, fontSize: "9px", color: "#2d4455", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "12px" }}>
          Request for Comments — Index
        </div>
        <h1 style={{ fontFamily: MONO, fontSize: "24px", fontWeight: 600, color: "#ffffff", letterSpacing: "-0.01em", lineHeight: 1.2, marginBottom: "16px" }}>
          AIIE RFC Series
        </h1>
        <p style={{ fontFamily: MONO, fontSize: "11px", color: "#6b8090", lineHeight: 1.9, margin: 0 }}>
          RFCs extend and operationalize the Acta AIIE Protocol v1.0.0. Each RFC addresses
          a specific technical domain. RATIFIED documents are normative; DRAFT documents
          are under active development pending empirical validation.
        </p>
      </div>

      {/* RFC cards */}
      <div style={{ border: "1px solid #1a2530", borderTop: "none", padding: "8px 24px 40px" }}>
        {RFCS.map((rfc, i) => (
          <div
            key={rfc.id}
            style={{
              borderTop: i === 0 ? "none" : "1px solid #1a2530",
              padding: "28px 16px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
              <div style={{ display: "flex", gap: "16px", alignItems: "baseline" }}>
                <span style={{ fontFamily: MONO, fontSize: "11px", color: "#4a8fa8", letterSpacing: "0.04em" }}>
                  {rfc.id}
                </span>
                <h2 style={{ fontFamily: MONO, fontSize: "14px", fontWeight: 600, color: "#ffffff", margin: 0, letterSpacing: "0.005em" }}>
                  {rfc.title}
                </h2>
              </div>
              <span style={{ fontFamily: MONO, fontSize: "8px", color: rfc.statusColor, letterSpacing: "0.12em", padding: "2px 8px", border: `1px solid ${rfc.statusColor}40`, flexShrink: 0 }}>
                {rfc.status}
              </span>
            </div>
            <div style={{ display: "flex", gap: "20px", marginBottom: "10px" }}>
              <span style={{ fontFamily: MONO, fontSize: "8px", color: "#2d4455", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {rfc.category}
              </span>
              <span style={{ fontFamily: MONO, fontSize: "8px", color: "#2d4455", letterSpacing: "0.06em" }}>
                Ref: {rfc.ref}
              </span>
            </div>
            <p style={{ fontFamily: MONO, fontSize: "11px", color: "#6b8090", lineHeight: 1.85, margin: "0 0 12px" }}>
              {rfc.summary}
            </p>
            <Link to={rfc.path} style={{ fontFamily: MONO, fontSize: "9px", color: "#38bdf8", textDecoration: "none", letterSpacing: "0.06em" }}>
              View RFC ↗
            </Link>
          </div>
        ))}
      </div>

      {/* Dependency note */}
      <div style={{ border: "1px solid #1a2530", borderTop: "none", padding: "20px 40px" }}>
        <div style={{ fontFamily: MONO, fontSize: "8px", color: "#2d4455", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}>
          Dependency Graph
        </div>
        <pre style={{ fontFamily: MONO, fontSize: "9px", color: "#3d5a72", lineHeight: 1.8, margin: 0, letterSpacing: "0.02em" }}>
{`Acta AIIE Protocol v1.0.0
├── RFC-0001 (ΔV) ──────────── referenced by RFC-0002, 0003, 0004
├── RFC-0002 (PCE) ──────────── prerequisite for RFC-0004
├── RFC-0003 (Graph) ─────────── 𝒯 referenced by RFC-0002
└── RFC-0004 (Relaxation) ────── depends on RFC-0002, RFC-0003`}
        </pre>
      </div>

    </div>
  );
}
