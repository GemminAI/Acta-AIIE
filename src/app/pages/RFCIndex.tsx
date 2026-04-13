import { Link } from "react-router";
const MONO = "'JetBrains Mono', monospace";

const RFCS = [
  {
    id: "RFC-0001",
    title: "Standard Definition of Delta Variance (ΔV)",
    status: "RATIFIED",
    statusColor: "#38bdf8",
    category: "Metric Specification",
    date: "2026-04-07",
    ref: "v1.0.0 §9 · NQ 2.0 §5.2",
    summary: "Defines ΔV as the canonical weighted L₂ distance between two 35TAG narrative states. Specifies the three-tier response table (Standard / Emerging Signal / Critical Divergence) and the mandatory Hesitation Protocol clause for ΔV ≥ 0.7.",
    path: "/rfc/0001",
  },
  {
    id: "RFC-0002",
    title: "PCE Detection Protocol",
    status: "RATIFIED",
    statusColor: "#38bdf8",
    category: "Monitoring Specification",
    date: "2026-04-07",
    ref: "v1.0.0 §11 · NQ 2.0 §6.4",
    summary: "Formalizes Post-Collapse Expansion detection via discontinuous variance jump: PCE_t ⟺ σ²_{t-1} < θ_floor ∧ σ²_t > θ_expand. Defines two-step confirmation gate, trajectory velocity monitor, and Critical Structural Alert protocol.",
    path: "/rfc/0002",
  },
  {
    id: "RFC-0003",
    title: "Narrative Graph Interaction Model",
    status: "DRAFT",
    statusColor: "#f59e0b",
    category: "Protocol Specification",
    date: "2026-04-07",
    ref: "v1.0.0 · NQ 2.0",
    summary: "Defines the N×N complex interaction matrix ℐ_ij(t) = 𝒜_ij · exp(iφ_ij) · σ(ΔV_ij) for multi-actor narrative networks. Classifies three structural pathologies: Divergence, Resonance (echo chamber), and Phase Lag Lock.",
    path: "/rfc/0003",
  },
  {
    id: "RFC-0004",
    title: "Narrative Relaxation Dynamics",
    status: "DRAFT",
    statusColor: "#f59e0b",
    category: "Thermodynamic Specification",
    date: "2026-04-07",
    ref: "v1.0.0 §7, §11 · RFC-0002",
    summary: "Specifies post-PCE quenching conditions, Narrative Annealing via Boltzmann path integration, formation of a new s_core′ with T25 recomputation, and Power Realignment dynamics of the actor graph following a phase transition.",
    path: "/rfc/0004",
  },
  {
    id: "RFC-0005",
    title: "T22 Entropy-Shift (H₀)",
    status: "RATIFIED",
    statusColor: "#38bdf8",
    category: "Schema Migration",
    date: "2026-04-12",
    ref: "35TAG_Standard_v6.0.1 · RFC-0006",
    summary: "Supersedes T22 epistemic_diffusion_state (enum) with informational_entropy (float [0,1]). Required by the T35 v2 Thermodynamic Decision Engine formula T(H) = 0.1 + 0.9·H₀. Defines Phase D migration protocol preserving 8,192 existing state hashes.",
    path: "/rfc/0005",
  },
  {
    id: "RFC-0006",
    title: "Quantum-Formalism Observation Model (QFOM)",
    status: "RATIFIED",
    statusColor: "#38bdf8",
    category: "Theoretical Framework",
    date: "2026-04-12",
    ref: "35TAG_Standard_v6.0.1 · RFC-0001 · RFC-0005",
    summary: "Introduces quantum-mechanical formalism as descriptive language for the information observation process. Maps T01–T07 and T22 to quantum analogues (basis, operator, interference image, wave function spread). Defines Observational Namespace via T01 prefix and unitary transformation U between namespaces. Zero field changes — pure interpretation layer extension.",
    path: "/rfc/0006",
  },
  {
    id: "RFC-0007",
    title: "MIFT — Magnetic Information Field Theory",
    status: "STABLE",
    statusColor: "#a78bfa",
    category: "Field Theory",
    date: "2026-04-12",
    ref: "RFC-0001 (ΔV) · RFC-0006 (QFOM)",
    summary: "Extends QFOM to collective narrative flow using a framework isomorphic to classical electromagnetism. Defines Narrative Current Density J, Context Spin B, and four Narrative Maxwell Equations governing field evolution. Enables quantitative simulation of macro-level narrative currents and induced EMF prediction.",
    path: "/rfc/0007",
  },
  {
    id: "RFC-0008",
    title: "PNLA — Principle of Narrative Least Action",
    status: "STABLE",
    statusColor: "#a78bfa",
    category: "Variational Principle",
    date: "2026-04-12",
    ref: "RFC-0001 · RFC-0005 · RFC-0006 · RFC-0007",
    summary: "Formalizes the Narrative Lagrangian ℒ = K − V over 35TAG state variables. Trajectory selection Φ* = argmin S[Φ] with QFOM causal admissibility constraint |A_t|² ≥ ε. Empirically validated: Weibull ΔAIC=28,953 vs Exponential (β=0.78<1), confirming non-Markovian least-action path dynamics.",
    path: "/rfc/0008",
  },
  {
    id: "RFC-0009",
    title: "Narrative Curvature and Information Statistical Mechanics",
    status: "STABLE",
    statusColor: "#a78bfa",
    category: "Statistical Mechanics",
    date: "2026-04-13",
    ref: "RFC-0001 · RFC-0007 · RFC-0008",
    summary: "Hybrid framework integrating Narrative Curvature κ with Information Statistical Mechanics. Defines Information Temperature T ∝ d|ℐ|/dt and Boltzmann Distribution P(s) = exp(−E(s)/k_BT)/Z over narrative states. Prediction Error ε formally derived via Fluctuation-Dissipation: ⟨ε²⟩ ~ 2k_BT/γ. Minimizing action S[Φ] ≡ minimizing Free Energy F = E − TS.",
    path: "/rfc/0009",
  },
  {
    id: "RFC-0010",
    title: "Quantum Narrative Entanglement (QNE)",
    status: "HYPOTHESIS",
    statusColor: "#fb923c",
    category: "Quantum Extension",
    date: "2026-04-12",
    ref: "RFC-0006 · RFC-0008 · RFC-0009",
    summary: "Proposes non-separability of actor-state vectors across causally disconnected T01 Namespaces. Adapts Bell-CHSH Inequality to discrete T07 state space for testable QNE criterion |S_CHSH| > 2. Predicted threshold: geopolitically correlated actor pairs (e.g., Fed ↔ BoJ). Requires empirical Bell-AIIE test before ratification.",
    path: "/rfc/0010",
  },
  {
    id: "RFC-0011",
    title: "Narrative Field Control",
    status: "DRAFT",
    statusColor: "#f59e0b",
    category: "Control System",
    date: "2026-04-12",
    ref: "RFC-0001 · RFC-0002 · RFC-0003 · RFC-0004",
    summary: "Defines External Control Field 𝒰 for PCE suppression and structural stability guidance. Non-Manipulation Constraint: control acts only on energy distribution and interaction structure — never determines narrative direction. Field energy budget constraint ‖𝒰‖/‖ℐ‖ ≤ ε enforces infinitesimal intervention.",
    path: "/rfc/0011",
  },
  {
    id: "RFC-0012",
    title: "Control Governance Layer",
    status: "DRAFT",
    statusColor: "#f59e0b",
    category: "Governance",
    date: "2026-04-12",
    ref: "RFC-0011",
    summary: "Defines three-layer authority model (C0: Autonomous Stabilizer / C1: Human-in-the-Loop / C2: Systemic Override). All control operations must satisfy ΔS > 0 (stability increase). Includes weaponization signal detection, narrative authoritarianism prevention, and reality hijacking defense via T25 audit trail.",
    path: "/rfc/0012",
  },
  {
    id: "RFC-0013",
    title: "Narrative Identity and Persistence",
    status: "DRAFT",
    statusColor: "#f59e0b",
    category: "Identity Model",
    date: "2026-04-12",
    ref: "RFC-0001 · RFC-0003",
    summary: "Defines events as attractors in state space. Identity condition ΔV(s_a, s_b) < θ_identity (θ=0.15). Introduces proper time τ for narrative-relative temporal dynamics. PCE formally characterized as v > v_critical. Validates linguistic independence via T25 state_hash consistency across JP/EN (production, April 2026).",
    path: "/rfc/0013",
  },
  {
    id: "RFC-0014",
    title: "Narrative Reality Selection",
    status: "DRAFT",
    statusColor: "#f59e0b",
    category: "Reality Model",
    date: "2026-04-12",
    ref: "RFC-0004 · RFC-0008 · RFC-0013",
    summary: "Defines reality selection as Boltzmann minimization of Free Energy ℱ(s) = 𝒯(s) + λH(s). Dual characterization: Dynamic (δS=0, PNLA) ≡ Statistical (argmin ℱ, Boltzmann). Reality lock-in as T→0 approaches delta function. Security mechanisms against ℱ distortion (reality hijacking) via RFC-0006 namespace auditing and RFC-0012 governance.",
    path: "/rfc/0014",
  },
];

const STATUS_ORDER: Record<string, number> = { RATIFIED: 0, STABLE: 1, DRAFT: 2, HYPOTHESIS: 3 };

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
          Base: Acta AIIE Protocol v1.0.0 · 14 RFCs
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
        <p style={{ fontFamily: MONO, fontSize: "11px", color: "#6b8090", lineHeight: 1.9, margin: "0 0 20px" }}>
          RFCs extend and operationalize the Acta AIIE Protocol v1.0.0. Each RFC addresses
          a specific technical domain. RATIFIED documents are normative; STABLE documents
          are complete and implementation-ready pending final ratification; DRAFT documents
          are under active development; HYPOTHESIS documents require empirical validation.
        </p>
        {/* Status legend */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {[
            { s: "RATIFIED", c: "#38bdf8", d: "Normative · Changes require new RFC" },
            { s: "STABLE", c: "#a78bfa", d: "Complete · Ratification pending empirical validation" },
            { s: "DRAFT", c: "#f59e0b", d: "Proposal · Not yet compliance requirement" },
            { s: "HYPOTHESIS", c: "#fb923c", d: "Theoretical · Requires Bell-test validation" },
          ].map(({ s, c, d }) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontFamily: MONO, fontSize: "8px", color: c, letterSpacing: "0.1em", padding: "1px 6px", border: `1px solid ${c}40` }}>{s}</span>
              <span style={{ fontFamily: MONO, fontSize: "9px", color: "#3d5a72", letterSpacing: "0.02em" }}>{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RFC cards */}
      <div style={{ border: "1px solid #1a2530", borderTop: "none", padding: "8px 24px 40px" }}>
        {RFCS.map((rfc, i) => (
          <div key={rfc.id} style={{ borderTop: i === 0 ? "none" : "1px solid #1a2530", padding: "28px 16px" }}>
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
            <div style={{ display: "flex", gap: "20px", marginBottom: "10px", flexWrap: "wrap" }}>
              <span style={{ fontFamily: MONO, fontSize: "8px", color: "#2d4455", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {rfc.category}
              </span>
              <span style={{ fontFamily: MONO, fontSize: "8px", color: "#2d4455", letterSpacing: "0.06em" }}>
                {rfc.date}
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

      {/* Dependency graph */}
      <div style={{ border: "1px solid #1a2530", borderTop: "none", padding: "20px 40px" }}>
        <div style={{ fontFamily: MONO, fontSize: "8px", color: "#2d4455", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "14px" }}>
          Dependency Graph
        </div>
        <pre style={{ fontFamily: MONO, fontSize: "9px", color: "#3d5a72", lineHeight: 1.9, margin: 0, letterSpacing: "0.02em", overflowX: "auto" }}>
{`Acta AIIE Protocol v1.0.0
├── RFC-0001 (ΔV)        ──→ RFC-0003, 0004, 0006, 0007, 0009, 0013
├── RFC-0002 (PCE)       ──→ RFC-0004, 0011
├── RFC-0003 (Graph)     ──→ RFC-0004, 0011, 0013
├── RFC-0004 (Relax)     ──→ RFC-0011, 0014
├── RFC-0005 (T22/H₀)   ──→ RFC-0006, 0008
├── RFC-0006 (QFOM)     ──→ RFC-0007, 0008, 0010
├── RFC-0007 (MIFT)     ──→ RFC-0008, 0009
├── RFC-0008 (PNLA)     ──→ RFC-0009, 0010, 0014
├── RFC-0009 (Curvature+StatMech) ──→ RFC-0010  [Revised 2026-04-13]
├── RFC-0010 (QNE)       HYPOTHESIS
├── RFC-0011 (Control)   ──→ RFC-0012
├── RFC-0012 (Governance)
├── RFC-0013 (Identity)  ──→ RFC-0014
└── RFC-0014 (Reality)
Reading order: BASE → 0001 → 0002 → 0003 → 0004 → 0005 → 0006 → 0007 → 0008 → 0009 → 0010 → 0013 → 0014 → 0011 → 0012`}
        </pre>
      </div>

    </div>
  );
}
