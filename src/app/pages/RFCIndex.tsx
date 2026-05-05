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
  {
    id: "RFC-0015",
    title: "JSON Canonicalization for Physical State Hashing",
    status: "RATIFIED",
    statusColor: "#38bdf8",
    category: "Canonicalization",
    date: "2026-04-15",
    ref: "RFC-0001 · RFC-0006 · RFC 8785",
    summary: "Defines canonical JSON serialization for AIIE hash computation, including jcs_hash and state_hash in v31_states_core. Establishes RFC 8785 compliance so the same physical state always produces the same hash across languages and runtimes.",
    path: "/rfc/0015",
  },
  {
    id: "RFC-0016",
    title: "Continuous Narrative Dynamics and Worldline Optimization",
    status: "RATIFIED",
    statusColor: "#38bdf8",
    category: "Continuous Dynamics",
    date: "2026-04-22",
    ref: "RFC-0001 · RFC-0008 · RFC-0009 · RFC-0013",
    summary: "Elevates the discrete 35TAG state machine into a continuous-time ODE evolution system. Introduces the Worldline Axiom and a measure-theoretic Narrative Action integral for universe/state separation.",
    path: "/rfc/0016",
  },
  {
    id: "RFC-0017",
    title: "LINK+ — Relational Laws and Causal Constraints",
    status: "RATIFIED",
    statusColor: "#38bdf8",
    category: "Relational Laws",
    date: "2026-04-22",
    ref: "RFC-0016 · RFC-0024",
    summary: "Defines LINK+ as the relational connector layer binding TAG28 nodes into valid graph structures. Specifies directionality, bond strength, constraint force, and Universal Grammar constraints for causal and structural links.",
    path: "/rfc/0017",
  },
  {
    id: "RFC-0018",
    title: "CFI — Semantic Distance and Topological Curvature",
    status: "RATIFIED",
    statusColor: "#38bdf8",
    category: "Semantic Metric",
    date: "2026-04-22",
    ref: "RFC-0016 · RFC-0017 · RFC-0022 · RFC-0024",
    summary: "Defines CFI as the semantic distance and curvature metric for comparing structures against each other or against the Evidence Field. Models logical inconsistency as topological deformation in semantic space.",
    path: "/rfc/0018",
  },
  {
    id: "RFC-0019",
    title: "TAG↔NL Compiler — Semantic Reconstruction Engine",
    status: "RATIFIED",
    statusColor: "#38bdf8",
    category: "Compiler Architecture",
    date: "2026-04-22",
    ref: "RFC-0016 · RFC-0017 · RFC-0018",
    summary: "Defines the five-layer bidirectional architecture between natural language and TAG28 graphs. Replaces statistical plausibility with invariant structure extraction and energy-minimized reconstruction under UG constraints.",
    path: "/rfc/0019",
  },
  {
    id: "RFC-0020",
    title: "Evidence — Autonomous Knowledge Field",
    status: "RATIFIED",
    statusColor: "#38bdf8",
    category: "Evidence Field",
    date: "2026-05-04",
    ref: "RFC-0018 · RFC-0022 · RFC-0024",
    summary: "Transitions Evidence from human-assigned weighting to autonomous semantic mass emergence. Defines mass through orthogonality, predictive survival, and topological centrality within the knowledge field.",
    path: "/rfc/0020",
  },
  {
    id: "RFC-0021",
    title: "EGEM — Evidence-Guided Energy Minimization",
    status: "RATIFIED",
    statusColor: "#38bdf8",
    category: "Energy Minimization",
    date: "2026-05-04",
    ref: "RFC-0018 · RFC-0020 · RFC-0024",
    summary: "Defines the core inference Hamiltonian for NOMOS using UG, Valency, and Evidence Field energy. Introduces two-stage Evidence Field normalization so human-scale thresholds remain stable across database sizes.",
    path: "/rfc/0021",
  },
  {
    id: "RFC-0022",
    title: "CDR — Consistency Detection & Repair Dynamics",
    status: "RATIFIED",
    statusColor: "#38bdf8",
    category: "Repair Dynamics",
    date: "2026-05-04",
    ref: "RFC-0018 · RFC-0020 · RFC-0021 · RFC-0023 · RFC-0024",
    summary: "Defines consistency detection and surgical repair over TAG28 graphs. Replaces statistical regeneration with discrete operations selected by energy contribution and re-projected through Π.",
    path: "/rfc/0022",
  },
  {
    id: "RFC-0023",
    title: "Π — Deterministic Projection from Proto-Structure to TAG Graph",
    status: "RATIFIED",
    statusColor: "#38bdf8",
    category: "Projection Operator",
    date: "2026-05-04",
    ref: "RFC-0016 · RFC-0017 · RFC-0024",
    summary: "Defines Π as the deterministic projection from continuous Proto-Structure into valid TAG graph form. Formalizes node resolution, edge resolution, constraint repair, and projection collapse handling.",
    path: "/rfc/0023",
  },
  {
    id: "RFC-0024",
    title: "Valency — Probabilistic Slot Constraints from Evidence",
    status: "RATIFIED",
    statusColor: "#38bdf8",
    category: "Constraint Model",
    date: "2026-05-04",
    ref: "RFC-0016 · RFC-0017 · RFC-0023",
    summary: "Defines Valency as a two-layer constraint system: hard UG vessel constraints plus soft Evidence-derived probability distributions. Provides semantic naturalness and expected slot contents as energy potentials.",
    path: "/rfc/0024",
  },
  {
    id: "RFC-0025",
    title: "Error Handling & Meta-Diagnostics",
    status: "RATIFIED",
    statusColor: "#38bdf8",
    category: "Diagnostics",
    date: "2026-05-04",
    ref: "RFC-0019 · RFC-0020 · RFC-0021 · RFC-0022 · RFC-0023",
    summary: "Specifies NOMOS error states, threshold registry, and meta-diagnostic protocols. Anchors threshold interpretation to normalized Evidence Field scale and Experiment-001 empirical values.",
    path: "/rfc/0025",
  },
  {
    id: "RFC-0026",
    title: "Projection Operator Π — Discrete Realization of Continuous Semantic Dynamics",
    status: "STABLE",
    statusColor: "#a78bfa",
    category: "Projection Operator",
    date: "2026-05-05",
    ref: "RFC-0016 · RFC-0017 · RFC-0018 · RFC-0022 · RFC-0024 · RFC-0025",
    summary: "Revises Π for hybrid inference and learning modes. Maintains deterministic stability in production while allowing stochastic exploration and Valency placeholder insertion during learning.",
    path: "/rfc/0026",
  },
  {
    id: "RFC-0027",
    title: "Proto-Structure Learning — End-to-End Optimization",
    status: "DRAFT",
    statusColor: "#f59e0b",
    category: "Learning Framework",
    date: "2026-05-05",
    ref: "RFC-0016 · RFC-0018 · RFC-0020 · RFC-0021 · RFC-0022 · RFC-0024 · RFC-0025",
    summary: "Defines the learning framework for optimizing natural language to Proto-Structure mapping. Introduces sparse TAG attention, entropy regularization, and CDR loop learning toward anticipatory intelligence.",
    path: "/rfc/0027",
  },
  {
    id: "RFC-0028",
    title: "LoRA Lens — Adaptive Structural Calibration",
    status: "STABLE",
    statusColor: "#a78bfa",
    category: "Adaptive Calibration",
    date: "2026-05-05",
    ref: "RFC-0016 · RFC-0018 · RFC-0020 · RFC-0029 · RFC-0030",
    summary: "Specifies LoRA as geometric calibration rather than statistical fine-tuning. Defines Hessian-based low-rank updates, null-space preservation, and snap sealing for adaptive semantic learning.",
    path: "/rfc/0028",
  },
  {
    id: "RFC-0029",
    title: "Movement Algebra — Vectorized Structural Dynamics",
    status: "STABLE",
    statusColor: "#a78bfa",
    category: "Movement Algebra",
    date: "2026-05-05",
    ref: "RFC-0016 · RFC-0017 · RFC-0028 · RFC-0030",
    summary: "Formalizes Universal Grammar movement as displacement vectors in 35TAG geometric space. Connects traces, semantic friction, and context-driven focus shifts to energy minimization.",
    path: "/rfc/0029",
  },
  {
    id: "RFC-0030",
    title: "Semantic Groupoid Theory — Algebraic Learning of Structural Invariants",
    status: "STABLE",
    statusColor: "#a78bfa",
    category: "Algebraic Learning",
    date: "2026-05-05",
    ref: "RFC-0016 · RFC-0018 · RFC-0022 · RFC-0028 · RFC-0029",
    summary: "Models semantic transformations as groupoid morphisms over valid TAG graph states. Establishes CFI equivalence classes, algebraic learning, and CDR as recovery of broken symmetry.",
    path: "/rfc/0030",
  },
  {
    id: "RFC-0031",
    title: "Information Geometry of CFI Space",
    status: "DRAFT",
    statusColor: "#f59e0b",
    category: "Information Geometry",
    date: "2026-05-05",
    ref: "RFC-0018 · RFC-0020 · RFC-0021 · RFC-0028 · RFC-0030",
    summary: "Extends CFI from scalar distance into a Riemannian information-geometric manifold. Defines metric tensors, geodesics, natural gradients, and CDR as geodesic projection.",
    path: "/rfc/0031",
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
          Base: Acta AIIE Protocol v1.0.0 · 31 RFCs
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
├── RFC-0014 (Reality)
├── RFC-0015 (JCS Hashing) ──→ all state_hash consumers
├── RFC-0016 (Continuous Dynamics) ──→ RFC-0017…0031
├── RFC-0017 (LINK+)     ──→ RFC-0018, 0019, 0023, 0024, 0029
├── RFC-0018 (CFI)       ──→ RFC-0020, 0021, 0022, 0026, 0027, 0028, 0030, 0031
├── RFC-0019 (Compiler)  ──→ RFC-0025
├── RFC-0020 (Evidence)  ──→ RFC-0021, 0022, 0025, 0027, 0028, 0031
├── RFC-0021 (EGEM)      ──→ RFC-0022, 0025, 0027, 0031
├── RFC-0022 (CDR)       ──→ RFC-0023, 0025, 0026, 0027, 0030
├── RFC-0023 (Π)         ──→ RFC-0024, 0025, 0026
├── RFC-0024 (Valency)   ──→ RFC-0025, 0026, 0027
├── RFC-0025 (Diagnostics)
├── RFC-0026 (Π v2)
├── RFC-0027 (Learning)
├── RFC-0028 (LoRA Lens) ──→ RFC-0029, 0030, 0031
├── RFC-0029 (Movement)  ──→ RFC-0030
├── RFC-0030 (Groupoid)  ──→ RFC-0031
└── RFC-0031 (CFI Geometry)
Reading order: BASE → 0001…0015 → 0016 → 0017 → 0018 → 0019 → 0020 → 0021 → 0022 → 0023 → 0024 → 0025 → 0026 → 0027 → 0028 → 0029 → 0030 → 0031`}
        </pre>
      </div>

    </div>
  );
}
