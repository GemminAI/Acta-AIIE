const MONO = "'JetBrains Mono', monospace";

const CATEGORIES = [
  {
    id: "I",
    name: "Identification & Base Context",
    description: "Establishes the Digital Registry of information",
    color: "#2563a8",
    tags: [
      { num: "01", key: "permanent_id", type: "string", constraint: "gmn://YYYYMMDD/[a-f0-9]{8}", description: "Persistent identifier using the gmn:// scheme" },
      { num: "02", key: "subject_origin", type: "enum", constraint: "jp | cn | us | uk | qa | eu", description: "Geopolitical or systemic origin of the narrative" },
      { num: "03", key: "predicate_type", type: "enum", constraint: "statement | action | omission | denial", description: "Structural type of the narrative predicate" },
      { num: "04", key: "object_entity", type: "string", constraint: "Named entity or concept", description: "Target entity or concept of the narrative" },
      { num: "05", key: "location", type: "string", constraint: "ISO 3166-1 alpha-2 or GeoJSON", description: "Geographic or systemic location context" },
      { num: "06", key: "time_frame", type: "string", constraint: "ISO 8601 (UTC/Z), fixed to second", description: "Precise timestamp eliminating timezone ambiguity" },
    ],
  },
  {
    id: "II",
    name: "Dynamics & Structure",
    description: "Quantifies causal relationships and strategic intent",
    color: "#1a6b5a",
    tags: [
      { num: "07", key: "actor_role", type: "enum", constraint: "initiator | responder | mediator | observer", description: "Role classification of the primary actor" },
      { num: "08", key: "causality_direction", type: "enum", constraint: "forward | backward | bidirectional", description: "Direction of causal chain in the narrative" },
      { num: "09", key: "strategic_interest_vector", type: "object[6]", constraint: "security, economy, tech, resource, ideology, environment ∈ [-1.0, 1.0]", description: "6-dimensional quantification of strategic impact" },
      { num: "10", key: "epistemic_confidence", type: "number", constraint: "[0.0, 1.0]", description: "AI-evaluated certainty of the information source" },
      { num: "11", key: "model_differential", type: "number", constraint: "[0.0, 1.0]", description: "Variance in interpretation across analytical models" },
      { num: "12", key: "narrative_viscosity", type: "number", constraint: "[0.0, 1.0]", description: "Resistance of narrative to external corrective information" },
    ],
  },
  {
    id: "III",
    name: "Bias & Epistemics",
    description: "Detects systematic distortion in information framing",
    color: "#6b4a1a",
    tags: [
      { num: "13", key: "bias_component", type: "object", constraint: "framing | selection | omission | emphasis", description: "Detected bias indicators in narrative construction" },
      { num: "14", key: "global_synthesis", type: "number", constraint: "[0.0, 1.0]", description: "Cross-domain synthesis coherence score" },
      { num: "15", key: "n_o_variants", type: "integer", constraint: "≥ 0", description: "Count of distinct narrative variants observed" },
      { num: "16", key: "source_credibility", type: "number", constraint: "[0.0, 1.0]", description: "Composite credibility rating of the information source" },
    ],
  },
  {
    id: "IV",
    name: "Spillover & Risk",
    description: "Measures cross-domain contamination and information voids",
    color: "#7a1a2e",
    tags: [
      { num: "17", key: "economic_transmission_path", type: "array", constraint: "Ordered sequence of economic vectors", description: "Economic impact propagation chain" },
      { num: "18", key: "silence_reasons", type: "array", constraint: "IVD indicator categories", description: "Classified reasons for strategic informational silence" },
      { num: "19", key: "precedent_audit", type: "array", constraint: "gmn:// reference URIs", description: "Linked historical precedent references" },
      { num: "20", key: "conflict_factuality_index", type: "number", constraint: "[0.0, 1.0]", description: "CFI: physical evidence vs. narrative contradiction metric" },
      { num: "21", key: "backbone_history", type: "object", constraint: "Temporal event chain", description: "Structured historical backbone of the narrative event" },
    ],
  },
  {
    id: "V",
    name: "Expression & Provenance",
    description: "Encodes presentation layer and cryptographic lineage",
    color: "#2a1a6b",
    tags: [
      { num: "22", key: "deep_dive", type: "object", constraint: "Extended analysis container", description: "Deep analytical structure for extended narrative dissection" },
      { num: "23", key: "audit_aura", type: "object", constraint: "color: HSL, luminosity: [0.0, 1.0]", description: "Visual integrity signal encoding data purity" },
      { num: "24", key: "provenance_hash", type: "string", constraint: "^[a-f0-9]{64}$", description: "SHA-256 hash of source metadata and raw content" },
      { num: "—", key: "schema_version", type: "string", constraint: "Semantic versioning (e.g., 4.1.0)", description: "Declares the AIIE schema version for this object" },
    ],
  },
];

export function Tag24Registry() {
  return (
    <div style={{ marginTop: "40px" }}>
      {/* Header */}
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
          § 3.0 · Visual Registry
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
          The 24TAG Taxonomy
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
          Information is multidimensionally described through 24 specific tags across 5 categories. These tags transform subjective narratives into computable vectors.
        </p>
      </div>

      {/* Categories */}
      {CATEGORIES.map((category) => (
        <div
          key={category.id}
          style={{
            marginBottom: "24px",
            border: "1px solid #1a2530",
          }}
        >
          {/* Category Header */}
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
              Cat. {category.id}
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

          {/* Tags Table */}
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
                  key={tag.key}
                  style={{
                    borderBottom: i < category.tags.length - 1 ? "1px solid #0d1a24" : "none",
                    background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.012)",
                  }}
                >
                  <td
                    style={{
                      padding: "9px 12px",
                      fontFamily: MONO,
                      fontSize: "10px",
                      color: "#2d4455",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tag.num}
                  </td>
                  <td
                    style={{
                      padding: "9px 12px",
                      fontFamily: MONO,
                      fontSize: "11px",
                      color: "#5a9ab8",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tag.key}
                  </td>
                  <td
                    style={{
                      padding: "9px 12px",
                      fontFamily: MONO,
                      fontSize: "9px",
                      color: "#3d6b4a",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tag.type}
                  </td>
                  <td
                    style={{
                      padding: "9px 12px",
                      fontFamily: MONO,
                      fontSize: "9px",
                      color: "#4a7a6b",
                      maxWidth: "220px",
                    }}
                  >
                    {tag.constraint}
                  </td>
                  <td
                    style={{
                      padding: "9px 12px",
                      fontFamily: MONO,
                      fontSize: "11px",
                      color: "#6b7f8e",
                      lineHeight: 1.6,
                    }}
                  >
                    {tag.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* The 25th TAG — The Seal */}
      <div
        style={{
          border: "1px solid #38bdf8",
          background: "rgba(56,189,248,0.03)",
          marginBottom: "40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top accent line */}
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
            TAG 25 · THE SEAL
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: "11px",
              fontWeight: 600,
              color: "#38bdf8",
              letterSpacing: "0.04em",
            }}
          >
            Cryptographic Terminus — The Ultimate Protocol Seal
          </div>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td
                style={{
                  padding: "16px 20px",
                  fontFamily: MONO,
                  fontSize: "10px",
                  color: "#2d8aaf",
                  whiteSpace: "nowrap",
                  verticalAlign: "top",
                  width: "40px",
                }}
              >
                25
              </td>
              <td
                style={{
                  padding: "16px 20px",
                  fontFamily: MONO,
                  fontSize: "14px",
                  color: "#38bdf8",
                  whiteSpace: "nowrap",
                  verticalAlign: "top",
                  fontWeight: 600,
                }}
              >
                state_hash
              </td>
              <td
                style={{
                  padding: "16px 20px",
                  fontFamily: MONO,
                  fontSize: "10px",
                  color: "#2d8aaf",
                  whiteSpace: "nowrap",
                  verticalAlign: "top",
                }}
              >
                string
              </td>
              <td
                style={{
                  padding: "16px 20px",
                  fontFamily: MONO,
                  fontSize: "10px",
                  color: "#2d8aaf",
                  verticalAlign: "top",
                }}
              >
                ^[a-f0-9]{"{64}"}$
              </td>
              <td
                style={{
                  padding: "16px 20px",
                  verticalAlign: "top",
                }}
              >
                <p
                  style={{
                    fontFamily: MONO,
                    fontSize: "12px",
                    color: "#8098ae",
                    lineHeight: 1.8,
                    marginBottom: "10px",
                    letterSpacing: "0.01em",
                  }}
                >
                  SHA-256 cryptographic hash of the JCS-normalized union of TAG 01 through TAG 24. This hash constitutes the mathematical proof of the object's immutability — any single-bit alteration will produce a completely different hash, making posterior manipulation detectable with absolute certainty.
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
                  "SHA-256 hash of JCS-normalized TAG01–24" · RFC 8785 · ECMA-262
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
