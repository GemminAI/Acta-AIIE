/**
 * 35TAG v6.0.0 — Category I–X visual registry (specs/35TAG_Standard_v6.0.0.md).
 * Hierarchical data grid: 35 semantic fields + T25 seal description.
 */
const MONO = "'JetBrains Mono', monospace";

type TagRow = { num: string; key: string; type: string; constraint: string; description: string };

type CategoryBlock = {
  id: string;
  roman: string;
  name: string;
  description: string;
  color: string;
  tags: TagRow[];
};

const CATEGORIES: CategoryBlock[] = [
  {
    id: "I",
    roman: "I",
    name: "Identification & Base Context",
    description: "Spatial and temporal boundaries of the observation",
    color: "#2563a8",
    tags: [
      { num: "01", key: "permanent_id", type: "string", constraint: "gmn://YYYYMMDD/[hash8]", description: "Persistent global identifier" },
      { num: "02", key: "subject_origin", type: "enum", constraint: "jp | cn | us | uk | qa | eu", description: "Initial observational bias vector" },
      { num: "03", key: "predicate_type", type: "string", constraint: "declare | sanction | invest | …", description: "Logical predicate classifier" },
      { num: "04", key: "object_entity", type: "array", constraint: "entities (states, corporations)", description: "Targets affected by the event" },
      { num: "05", key: "location", type: "object", constraint: "{ country, coord: [lat,lng] }", description: "Physical event coordinates" },
      { num: "06", key: "time_frame", type: "string", constraint: "ISO 8601 UTC/Z", description: "Temporal boundary for deterministic hashing" },
    ],
  },
  {
    id: "II",
    roman: "II",
    name: "Dynamics & Structure",
    description: "Causal relationships and potential energy vectors",
    color: "#1a6b5a",
    tags: [
      { num: "07", key: "actor_role", type: "enum", constraint: "state | corporation | individual | algo", description: "Kinetic variable of power structures" },
      { num: "08", key: "causality_direction", type: "enum", constraint: "upstream | midstream | downstream", description: "Position in the causal chain" },
      { num: "09", key: "strategic_interest_vector", type: "object", constraint: "6 dims ∈ [−1,1] — base for ΔV", description: "Security, Economy, Tech, Resource, Ideology, Environment" },
      { num: "10", key: "epistemic_confidence", type: "float", constraint: "[0.0, 1.0]", description: "Objective mass of evidence" },
    ],
  },
  {
    id: "III",
    roman: "III",
    name: "Bias & Audit",
    description: "Structural divergence and model fault lines",
    color: "#6b4a1a",
    tags: [
      { num: "11", key: "bias_component", type: "object", constraint: "emotional load & centroid", description: "Perspective load" },
      { num: "12", key: "model_differential", type: "object", constraint: "{ consensus, conflict }", description: "Tri-model epistemic fault lines" },
      { num: "13", key: "global_synthesis", type: "string", constraint: "max 400 chars", description: "Objective anatomical summary" },
      { num: "14", key: "n_o_variants", type: "object", constraint: "6 Narrative Origins", description: "Parallel dimensional descriptions" },
      { num: "15", key: "source_credibility", type: "float", constraint: "[0.0, 1.0]", description: "Primary source credibility" },
    ],
  },
  {
    id: "IV",
    roman: "IV",
    name: "Impact & Risk",
    description: "Ripple effects and physical contradictions",
    color: "#7a1a2e",
    tags: [
      { num: "16", key: "economic_transmission_path", type: "array", constraint: "sectors", description: "Affected economic sectors" },
      { num: "17", key: "silence_reasons", type: "array", constraint: "IVD / suppression analysis", description: "Information voids" },
      { num: "18", key: "precedent_audit", type: "array", constraint: "reference IDs", description: "Legal / historical precedents" },
      { num: "19", key: "conflict_factuality_index", type: "float", constraint: "[0.0, 1.0] CFI", description: "Repulsive force in T35 engine" },
    ],
  },
  {
    id: "V",
    roman: "V",
    name: "Content & Presentation",
    description: "Thermodynamic outputs → geometric rendering",
    color: "#2a1a6b",
    tags: [
      { num: "20", key: "backbone_history", type: "string", constraint: "max 1000 chars", description: "Continuous historical causality" },
      { num: "21", key: "deep_dive", type: "string", constraint: "max 1400 chars", description: "Structural deep analysis (λ₄)" },
      { num: "22", key: "epistemic_diffusion_state", type: "enum", constraint: "Crystallized | Diffused | Polarized", description: "Visual state from H and CFI" },
    ],
  },
  {
    id: "VI",
    roman: "VI",
    name: "Immutability & Base Crystallization",
    description: "Cryptographic sealing of base variables",
    color: "#5a4a2a",
    tags: [
      { num: "23", key: "provenance_hash", type: "string", constraint: "SHA-256", description: "Intermediate hash for TAGs 01–22" },
      { num: "24", key: "schema_version", type: "string", constraint: "6.0.0 semver", description: "Deterministic decryption logic" },
      { num: "25", key: "state_hash", type: "string", constraint: "64 hex (T25 anchor)", description: "Base Reality Anchor — see seal block below" },
    ],
  },
  {
    id: "VII",
    roman: "VII",
    name: "Kinetics & Branching",
    description: "Prediction, superposition, collapse",
    color: "#0e7490",
    tags: [
      { num: "26", key: "predictive_kinetic_metrics", type: "object", constraint: "v_t, a_t, P_risk", description: "Rupture probability & kinematics" },
      { num: "27", key: "branching_futures", type: "array", constraint: "Boltzmann worldline candidates", description: "Superposition generator" },
      { num: "28", key: "collapse_state", type: "object", constraint: "HARD | SOFT, ghost intensity", description: "Convergence & rejected branches" },
    ],
  },
  {
    id: "VIII",
    roman: "VIII",
    name: "Memory & Adaptation",
    description: "Rejected realities & autonomous optimization",
    color: "#6d28d9",
    tags: [
      { num: "29", key: "counterfactual_memory", type: "object", constraint: "Regret ∝ cos θ", description: "Rejected branches vs observations" },
      { num: "30", key: "self_correction_deltas", type: "object", constraint: "θ ← θ − η∇Regret", description: "Inertia α & weights λ" },
    ],
  },
  {
    id: "IX",
    roman: "IX",
    name: "Meta-Cognition & Relative Time",
    description: "Self-model and proper time",
    color: "#be185d",
    tags: [
      { num: "31", key: "meta_cognition_state", type: "object", constraint: "SAI, 3D bias vector", description: "Entropy & divergence" },
      { num: "32", key: "self_model_identity", type: "object", constraint: "timeline_id, parent_state_hash", description: "S = (P_t, M_t, Θ, C, H)" },
      { num: "33", key: "relative_time_field", type: "object", constraint: "dτ from v, a, delay", description: "Proper time — not absolute clock" },
      { num: "34", key: "time_reversal_forks", type: "array", constraint: "Regret → past state_hash", description: "Timeline forks to P_t′*" },
    ],
  },
  {
    id: "X",
    roman: "X",
    name: "Reality Selection",
    description: "Final mathematical closure",
    color: "#15803d",
    tags: [
      { num: "35", key: "worldline_optimization", type: "object", constraint: "∫dτ, Regret, ΔV, Value", description: "Final Closure — optimal sealed trajectory" },
    ],
  },
];

export function Tag35Registry() {
  return (
    <div style={{ marginTop: "40px" }}>
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            fontFamily: MONO,
            fontSize: "9px",
            color: "#3d5a72",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          § 3.0 · Visual Registry · 35TAG v6.0.0
        </div>
        <h2
          style={{
            fontFamily: MONO,
            fontSize: "15px",
            fontWeight: 600,
            color: "#ffffff",
            letterSpacing: "0.01em",
          }}
        >
          35次元の構造診断（35TAG v6.0.0）
        </h2>
        <p
          style={{
            fontFamily: MONO,
            fontSize: "12px",
            color: "#5a7a8e",
            marginTop: "8px",
            lineHeight: 1.8,
            letterSpacing: "0.01em",
          }}
        >
          Ten categories (I–X) describe thirty-five semantic fields plus the T25 anchor. The lattice maps thermodynamic narrative
          lifecycle from identification through kinetics, memory, meta-cognition, to sealed worldline closure.
        </p>
      </div>

      {CATEGORIES.map((category) => (
        <div
          key={category.id}
          style={{
            marginBottom: "24px",
            border: "1px solid #1a2530",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 16px",
              borderBottom: "1px solid #1a2530",
              background: "#080c10",
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: "9px",
                fontWeight: 600,
                color: category.color,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "2px 8px",
                border: `1px solid ${category.color}`,
                opacity: 0.9,
              }}
            >
              Category {category.roman}
            </div>
            <div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#c8d4e0",
                  letterSpacing: "0.03em",
                }}
              >
                {category.name}
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: "9px",
                  color: "#3d5a72",
                  marginTop: "2px",
                  letterSpacing: "0.02em",
                }}
              >
                {category.description}
              </div>
            </div>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1a2530" }}>
                {["#", "Field Key", "Type", "Constraint / Range", "Description"].map((h) => (
                  <th
                    key={h}
                    style={{
                      fontFamily: MONO,
                      fontSize: "8px",
                      color: "#2d4455",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      textAlign: "left",
                      padding: "7px 12px",
                      fontWeight: 600,
                      background: "#070a0d",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {category.tags.map((tag, i) => (
                <tr
                  key={`${category.id}-${tag.key}`}
                  style={{
                    borderBottom: i < category.tags.length - 1 ? "1px solid #0d1a24" : "none",
                    background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.012)",
                  }}
                >
                  <td style={{ padding: "9px 12px", fontFamily: MONO, fontSize: "10px", color: "#2d4455", whiteSpace: "nowrap" }}>{tag.num}</td>
                  <td style={{ padding: "9px 12px", fontFamily: MONO, fontSize: "11px", color: "#5a9ab8", whiteSpace: "nowrap" }}>{tag.key}</td>
                  <td style={{ padding: "9px 12px", fontFamily: MONO, fontSize: "9px", color: "#3d6b4a", whiteSpace: "nowrap" }}>{tag.type}</td>
                  <td style={{ padding: "9px 12px", fontFamily: MONO, fontSize: "9px", color: "#4a7a6b", maxWidth: "220px" }}>{tag.constraint}</td>
                  <td style={{ padding: "9px 12px", fontFamily: MONO, fontSize: "11px", color: "#6b7f8e", lineHeight: 1.6 }}>{tag.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <div
        style={{
          border: "1px solid #38bdf8",
          background: "rgba(56,189,248,0.03)",
          marginBottom: "40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent, #38bdf8, transparent)",
            opacity: 0.7,
          }}
        />

        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid rgba(56,189,248,0.2)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: "9px",
              fontWeight: 700,
              color: "#38bdf8",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "3px 10px",
              border: "1px solid #38bdf8",
              background: "rgba(56,189,248,0.08)",
            }}
          >
            TAG 25 · T25 ANCHOR
          </div>
          <div style={{ fontFamily: MONO, fontSize: "11px", fontWeight: 600, color: "#38bdf8", letterSpacing: "0.04em" }}>
            state_hash — Base Reality Seal
          </div>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ padding: "16px 20px", fontFamily: MONO, fontSize: "10px", color: "#2d8aaf", verticalAlign: "top", width: "40px" }}>25</td>
              <td style={{ padding: "16px 20px", fontFamily: MONO, fontSize: "14px", color: "#38bdf8", verticalAlign: "top", fontWeight: 600 }}>state_hash</td>
              <td style={{ padding: "16px 20px", fontFamily: MONO, fontSize: "10px", color: "#2d8aaf", verticalAlign: "top" }}>string</td>
              <td style={{ padding: "16px 20px", fontFamily: MONO, fontSize: "10px", color: "#2d8aaf", verticalAlign: "top" }}>^[a-f0-9]{"{64}"}$</td>
              <td style={{ padding: "16px 20px", verticalAlign: "top" }}>
                <p style={{ fontFamily: MONO, fontSize: "12px", color: "#8098ae", lineHeight: 1.8, marginBottom: "10px" }}>
                  <strong>T25</strong> is the cryptographic terminus:{" "}
                  <strong>SHA-256</strong> over <strong>RFC 8785 (JCS)</strong> serialization of <strong>TAG 01–34</strong>{" "}
                  excluding this field (<code style={{ color: "#38bdf8" }}>state_hash</code>). TAG 35 (
                  <code>worldline_optimization</code>) is not an input to the anchor hash. Reference:{" "}
                  <code>sdk/verify_integrity.py</code> + <code>sdk/tag_v6.py</code> (<code>STATE_HASH_JCS_KEYS</code>).
                </p>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: "9px",
                    color: "#1e7baf",
                    padding: "6px 10px",
                    background: "rgba(56,189,248,0.05)",
                    border: "1px solid rgba(56,189,248,0.15)",
                    display: "inline-block",
                    letterSpacing: "0.03em",
                  }}
                >
                  state_hash = SHA-256( JCS( canonical TAG 01…34 except state_hash ) ) · RFC 8785
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
