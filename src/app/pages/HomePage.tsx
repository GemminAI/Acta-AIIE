import { Link } from "react-router";

const MONO = "'JetBrains Mono', monospace";

/* ─────────────────────────────────────────────
   CITATION REGISTRY
   ───────────────────────────────────────────── */
const REFS: Record<string, { label: string; href: string }> = {
  "01": { label: "JCS SDK — Crystallization Engine",              href: "/sdk/crystallization-engine" },
  "02": { label: "24TAG Schema Specification v4.1.0",            href: "/protocol/24tag-schema" },
  "03": { label: "Narrative Observation — Cross-Domain Corr.",   href: "/whitepapers/narrative-observation" },
  "04": { label: "Mathematical Standardization of Narrative Intent", href: "/protocol/mathematical-standardization" },
  "05": { label: "Whitepapers Archive",                          href: "/whitepapers" },
};

function Ref({ id }: { id: string }) {
  const ref = REFS[id];
  if (!ref) return null;
  return (
    <Link
      to={ref.href}
      title={ref.label}
      style={{
        fontFamily: MONO,
        fontSize: "8px",
        color: "#38bdf8",
        textDecoration: "none",
        padding: "0 2px",
        border: "1px solid rgba(56,189,248,0.3)",
        verticalAlign: "super",
        lineHeight: 1,
        marginLeft: "2px",
        letterSpacing: "0.03em",
        whiteSpace: "nowrap",
      }}
    >
      [*{id}]
    </Link>
  );
}

/* ─────────────────────────────────────────────
   TYPOGRAPHY PRIMITIVES
   ───────────────────────────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: MONO,
        fontSize: "9px",
        color: "#3d5a72",
        letterSpacing: "0.14em",
        textTransform: "uppercase" as const,
      }}
    >
      {children}
    </span>
  );
}

function W({ children }: { children: React.ReactNode }) {
  /* body paragraph */
  return (
    <p
      style={{
        fontFamily: MONO,
        fontSize: "12px",
        color: "#8098ae",
        lineHeight: 2.0,
        margin: "0 0 14px",
        letterSpacing: "0.01em",
      }}
    >
      {children}
    </p>
  );
}

function B({ children }: { children: React.ReactNode }) {
  return (
    <strong style={{ fontFamily: MONO, fontWeight: 600, color: "#c8d4e0" }}>
      {children}
    </strong>
  );
}

function IC({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        fontFamily: MONO,
        fontSize: "10px",
        color: "#38bdf8",
        background: "rgba(56,189,248,0.05)",
        padding: "0 4px",
        border: "1px solid rgba(56,189,248,0.2)",
      }}
    >
      {children}
    </code>
  );
}

function HR() {
  return <div style={{ height: "1px", background: "#ffffff", margin: "32px 0", opacity: 0.07 }} />;
}

function SectionNum({ n, title }: { n: string; title: string }) {
  return (
    <div style={{ marginTop: "36px", marginBottom: "14px" }}>
      <div style={{ display: "flex", gap: "16px", alignItems: "baseline", borderBottom: "1px solid #1a2530", paddingBottom: "8px" }}>
        <span
          style={{
            fontFamily: MONO,
            fontSize: "9px",
            color: "#3d5a72",
            letterSpacing: "0.1em",
            flexShrink: 0,
          }}
        >
          §{n}
        </span>
        <span
          style={{
            fontFamily: MONO,
            fontSize: "13px",
            fontWeight: 600,
            color: "#ffffff",
            letterSpacing: "0.01em",
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}

function SubNum({ n, title }: { n: string; title: string }) {
  return (
    <div style={{ marginTop: "22px", marginBottom: "10px" }}>
      <span
        style={{
          fontFamily: MONO,
          fontSize: "9px",
          color: "#3d5a72",
          letterSpacing: "0.08em",
          marginRight: "12px",
        }}
      >
        {n}
      </span>
      <span
        style={{
          fontFamily: MONO,
          fontSize: "11px",
          fontWeight: 600,
          color: "#c8d4e0",
          letterSpacing: "0.02em",
        }}
      >
        {title}
      </span>
    </div>
  );
}

function Bullet({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "8px",
        alignItems: "flex-start",
        paddingLeft: "12px",
        borderLeft: "1px solid #1a2530",
      }}
    >
      <span style={{ fontFamily: MONO, fontSize: "9px", color: "#38bdf8", flexShrink: 0, marginTop: "3px" }}>·</span>
      <span style={{ fontFamily: MONO, fontSize: "11px", color: "#6b8090", lineHeight: 1.85 }}>
        {label && <strong style={{ fontFamily: MONO, fontWeight: 600, color: "#a0b8c8", marginRight: "6px" }}>{label}:</strong>}
        {children}
      </span>
    </div>
  );
}

function Math({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        margin: "16px 0",
        padding: "12px 16px",
        border: "1px solid #1a2530",
        background: "#050810",
        fontFamily: MONO,
        fontSize: "11px",
        color: "#4a8fa8",
        letterSpacing: "0.04em",
        lineHeight: 1.6,
        overflowX: "auto" as const,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   24TAG TABLE (Technical Drawing Style)
   ───────────────────────────────────────────── */
const TAGS = [
  { layer: "Actor & Agency", id: "T01", name: "Primary_Actor",      type: "string",  desc: "Main entity initiating the interaction." },
  { layer: "",               id: "T02", name: "Secondary_Actor",    type: "string",  desc: "Entity receiving or responding to the action." },
  { layer: "",               id: "T03", name: "Actor_Role_A",       type: "enum",    desc: "Functional role of primary actor (Protagonist / Antagonist / Neutral)." },
  { layer: "",               id: "T04", name: "Actor_Role_B",       type: "enum",    desc: "Functional role of secondary actor." },
  { layer: "",               id: "T05", name: "Actor_Motivation_A", type: "string",  desc: "Underlying goal or 'Why' for Actor A." },
  { layer: "",               id: "T06", name: "Actor_Motivation_B", type: "string",  desc: "Underlying goal or 'Why' for Actor B." },
  { layer: "Event & Action", id: "T07", name: "Action_Type",        type: "enum",    desc: "Category of event — Verbal | Physical | Financial | Symbolic." },
  { layer: "",               id: "T08", name: "Action_Intensity",   type: "float",   desc: "Magnitude of the action. Scale: 0.0 → 1.0." },
  { layer: "",               id: "T09", name: "Target_Resource",    type: "string",  desc: "Specific object or value being contested." },
  { layer: "",               id: "T10", name: "Event_Modality",     type: "enum",    desc: "Factual | Hypothetical | Desired." },
  { layer: "",               id: "T11", name: "Temporal_Sequence",  type: "integer", desc: "Relative order of event within the narrative arc." },
  { layer: "",               id: "T12", name: "Spatial_Context",    type: "string",  desc: "Domain or environment where the event occurs." },
  { layer: "Causal & Logic", id: "T13", name: "Causal_Link_Type",   type: "enum",    desc: "Direct Cause | Enabling | Correlating." },
  { layer: "",               id: "T14", name: "Conflict_Nature",    type: "enum",    desc: "Internal | Interpersonal | Institutional | Systemic." },
  { layer: "",               id: "T15", name: "Conflict_Intensity", type: "float",   desc: "Severity of friction between actors. Scale: 0.0 → 1.0." },
  { layer: "",               id: "T16", name: "Resolution_Status",  type: "enum",    desc: "Unresolved | Partial | Resolved." },
  { layer: "",               id: "T17", name: "Outcome_Valence",    type: "float",   desc: "Positive/negative impact. Scale: −1.0 → +1.0." },
  { layer: "",               id: "T18", name: "Logic_Consistency",  type: "float",   desc: "Alignment with prior narrative states. Scale: 0.0 → 1.0." },
  { layer: "Context & Tone", id: "T19", name: "Emotional_Tone_A",   type: "enum",    desc: "Emotional state of Actor A during the event." },
  { layer: "",               id: "T20", name: "Emotional_Tone_B",   type: "enum",    desc: "Emotional state of Actor B during the event." },
  { layer: "",               id: "T21", name: "Perspective_Bias",   type: "float",   desc: "Point-of-view bias of the narrative. Scale: −1.0 → +1.0." },
  { layer: "",               id: "T22", name: "Info_Asymmetry",     type: "float",   desc: "Knowledge gap between actors. Scale: 0.0 → 1.0." },
  { layer: "",               id: "T23", name: "Significance_Score", type: "float",   desc: "Relative importance of event to the overall arc. Scale: 0.0 → 1.0." },
  { layer: "",               id: "T24", name: "Narrative_Closure",  type: "float",   desc: "Extent to which this event concludes a specific thread." },
  { layer: "Protocol Seal",  id: "T25", name: "state_hash",         type: "sha256",  desc: "SHA-256 of JCS-normalised T01–T24. Excluded from its own input. One-Way Cognitive Seal.", seal: true },
];

function Tag24Registry() {
  const COL = "1px solid #ffffff";
  const COL_DIM = "1px solid rgba(255,255,255,0.12)";

  return (
    <div style={{ border: COL, overflowX: "auto" as const }}>
      {/* Header row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "100px 52px 190px 70px 1fr",
          borderBottom: COL,
          background: "#000000",
        }}
      >
        {["Layer", "ID", "Tag Name", "Type", "Definition"].map((h, i) => (
          <div
            key={h}
            style={{
              fontFamily: MONO,
              fontSize: "8px",
              color: "#ffffff",
              letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
              padding: "7px 10px",
              borderRight: i < 4 ? COL : "none",
            }}
          >
            {h}
          </div>
        ))}
      </div>

      {/* Data rows */}
      {TAGS.map((row, i) => {
        const isLayerStart = row.layer !== "";
        const isSeal = "seal" in row && row.seal;
        const rowBorder = i === TAGS.length - 1 ? "none" : isSeal ? COL : COL_DIM;

        return (
          <div
            key={row.id}
            style={{
              display: "grid",
              gridTemplateColumns: "100px 52px 190px 70px 1fr",
              borderBottom: rowBorder,
              background: isSeal
                ? "rgba(56,189,248,0.04)"
                : isLayerStart
                ? "rgba(255,255,255,0.015)"
                : "transparent",
            }}
          >
            {/* Layer */}
            <div
              style={{
                fontFamily: MONO,
                fontSize: "8px",
                color: isSeal ? "#38bdf8" : isLayerStart ? "rgba(255,255,255,0.5)" : "transparent",
                letterSpacing: "0.05em",
                padding: "6px 10px",
                borderRight: isSeal ? "1px solid rgba(56,189,248,0.4)" : COL_DIM,
                display: "flex",
                alignItems: "center",
              }}
            >
              {row.layer || "·"}
            </div>
            {/* ID */}
            <div
              style={{
                fontFamily: MONO,
                fontSize: "9px",
                color: isSeal ? "#38bdf8" : "#4a8fa8",
                letterSpacing: "0.04em",
                padding: "6px 10px",
                borderRight: isSeal ? "1px solid rgba(56,189,248,0.4)" : COL_DIM,
                display: "flex",
                alignItems: "center",
              }}
            >
              {row.id}
            </div>
            {/* Name */}
            <div
              style={{
                fontFamily: MONO,
                fontSize: "9px",
                color: isSeal ? "#38bdf8" : "#c8d4e0",
                letterSpacing: "0.01em",
                padding: "6px 10px",
                borderRight: isSeal ? "1px solid rgba(56,189,248,0.4)" : COL_DIM,
                display: "flex",
                alignItems: "center",
                fontWeight: isSeal ? 600 : 400,
              }}
            >
              {row.name}
            </div>
            {/* Type */}
            <div
              style={{
                fontFamily: MONO,
                fontSize: "8px",
                color: isSeal ? "#38bdf8" : "#3d5a72",
                letterSpacing: "0.06em",
                padding: "6px 10px",
                borderRight: isSeal ? "1px solid rgba(56,189,248,0.4)" : COL_DIM,
                display: "flex",
                alignItems: "center",
              }}
            >
              {row.type}
            </div>
            {/* Definition */}
            <div
              style={{
                fontFamily: MONO,
                fontSize: "9px",
                color: isSeal ? "#5ab8e8" : "#5a7a8e",
                lineHeight: 1.65,
                padding: "6px 10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {row.desc}
              {isSeal && <Ref id="01" />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────── */
export function HomePage() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "0 56px 100px",
        width: "100%",
      }}
    >

      {/* ══════════════════════════════════════════
          ARCHIVE SEAL BAR
      ══════════════════════════════════════════ */}
      <div
        style={{
          borderBottom: "1px solid #1a2530",
          borderLeft: "1px solid #1a2530",
          borderRight: "1px solid #1a2530",
          padding: "10px 16px",
          background: "#050810",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          marginBottom: "0",
        }}
      >
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <Label>Acta AIIE · Primary Archive</Label>
          <Label>RFC 8785 · SHA-256</Label>
          <Label>v4.1.0</Label>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontFamily: MONO, fontSize: "8px", color: "#3d5a72", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Archive Hash
          </span>
          <span style={{ fontFamily: MONO, fontSize: "9px", color: "#38bdf8", letterSpacing: "0.04em" }}>
            3a5a3a9d1b13367621b5b34cc25a0d88
          </span>
          <span
            style={{
              fontFamily: MONO,
              fontSize: "7px",
              color: "#38bdf8",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "1px 5px",
              border: "1px solid rgba(56,189,248,0.35)",
            }}
          >
            Verified
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          HERO / MANIFESTO
      ══════════════════════════════════════════ */}
      <div
        style={{
          border: "1px solid #1a2530",
          borderTop: "none",
          padding: "48px 40px 40px",
          marginBottom: "0",
        }}
      >
        {/* Document ID strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            background: "#1a2530",
            border: "1px solid #1a2530",
            marginBottom: "40px",
          }}
        >
          {[
            { k: "Document Class",   v: "Protocol Repository" },
            { k: "Compliance",       v: "RFC 8785 / JCS" },
            { k: "Status",           v: "Active" },
            { k: "Issued",           v: "2025-Q2" },
          ].map((m) => (
            <div key={m.k} style={{ background: "#070a0d", padding: "10px 14px" }}>
              <div style={{ fontFamily: MONO, fontSize: "8px", color: "#2d4455", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
                {m.k}
              </div>
              <div style={{ fontFamily: MONO, fontSize: "10px", color: "#5a9ab8", letterSpacing: "0.02em" }}>
                {m.v}
              </div>
            </div>
          ))}
        </div>

        {/* Title block */}
        <div
          style={{
            fontFamily: MONO,
            fontSize: "9px",
            color: "#2d4455",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "18px",
          }}
        >
          Acta AIIE · Official Standardization Repository
        </div>

        <h1
          style={{
            fontFamily: MONO,
            fontSize: "30px",
            fontWeight: 600,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: "28px",
          }}
        >
          Narrative Quantification<br />
          <span style={{ color: "#38bdf8" }}>as Cognitive Infrastructure</span>
        </h1>

        {/* Manifesto quote */}
        <div
          style={{
            borderLeft: "2px solid #ffffff",
            paddingLeft: "20px",
            marginBottom: "32px",
          }}
        >
          <p
            style={{
              fontFamily: MONO,
              fontSize: "15px",
              color: "#ffffff",
              lineHeight: 1.7,
              letterSpacing: "0.01em",
              margin: 0,
            }}
          >
            "The path toward Artificial General Intelligence (AGI) lies not in bigger models,
            but in deeper structures. Narrative Quantification is the first step in building an
            AI that doesn't just talk like a human, but understands like one."
          </p>
          <div
            style={{
              fontFamily: MONO,
              fontSize: "9px",
              color: "#3d5a72",
              letterSpacing: "0.1em",
              marginTop: "12px",
            }}
          >
            — Tomohiko Nakamura, Independent Researcher, Japan · AIIE-WP-001
          </div>
        </div>

        {/* Abstract */}
        <div
          style={{
            padding: "16px 20px",
            border: "1px solid #1a2530",
            background: "#050810",
          }}
        >
          <div style={{ fontFamily: MONO, fontSize: "8px", color: "#2d4455", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}>
            Abstract
          </div>
          <p style={{ fontFamily: MONO, fontSize: "11px", color: "#6b8090", lineHeight: 1.9, margin: "0 0 10px", letterSpacing: "0.01em" }}>
            Human societies interpret events primarily through narrative structures rather than isolated data points.
            This paper proposes <B>Narrative Quantification</B>, a framework for transforming narrative information
            into structured cognitive data — decomposing narratives into actors, events, conflicts, resolutions,
            emotional context, and causal relationships.
          </p>
          <p style={{ fontFamily: MONO, fontSize: "11px", color: "#6b8090", lineHeight: 1.9, margin: 0, letterSpacing: "0.01em" }}>
            To operationalize this transformation, the paper introduces the <B>Narrative Compiler</B>, a system
            converting narrative text into structured cognitive representations such as the{" "}
            <B>24TAG structure</B><Ref id="02" />. These representations serve as the foundation for{" "}
            <B>Large Cognitive Models (LCM)</B> — systems that reason over structured narrative representations
            rather than purely probabilistic language tokens.
          </p>
        </div>
      </div>

      <div style={{ height: "1px", background: "#1a2530", marginBottom: "0" }} />

      {/* ══════════════════════════════════════════
          24TAG SCHEMA REGISTRY
      ══════════════════════════════════════════ */}
      <div
        style={{
          border: "1px solid #1a2530",
          borderTop: "none",
          padding: "40px 40px 36px",
        }}
      >
        {/* Section header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "6px" }}>
          <div>
            <Label>Registry</Label>
            <h2
              style={{
                fontFamily: MONO,
                fontSize: "16px",
                fontWeight: 600,
                color: "#ffffff",
                letterSpacing: "0.01em",
                margin: "6px 0 4px",
              }}
            >
              24TAG Schema Specification
            </h2>
            <div style={{ fontFamily: MONO, fontSize: "9px", color: "#2d4455", letterSpacing: "0.08em" }}>
              AIIE Protocol v4.1.0 · Compliance: RFC 8785 · Governance: Acta AIIE Standardization Committee
            </div>
          </div>
          <Link
            to="/protocol/24tag-schema"
            style={{
              fontFamily: MONO,
              fontSize: "9px",
              color: "#38bdf8",
              textDecoration: "none",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            Full Spec ↗
          </Link>
        </div>

        <div style={{ marginTop: "20px" }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: "8px",
              color: "#2d4455",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            Figure 1 — 24TAG Framework · Technical Specification Table
          </div>
          <Tag24Registry />
        </div>

        {/* Crystallization rule note */}
        <div
          style={{
            marginTop: "16px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "1px",
            background: "#1a2530",
            border: "1px solid #1a2530",
          }}
        >
          {[
            { n: "Rule I",   t: "UTF-16 Key Sorting",     d: "Sort JSON keys in lexicographic UTF-16 order before hashing." },
            { n: "Rule II",  t: "Numeric Normalization",  d: "IEEE 754 floats → ECMA-262 decimal strings." },
            { n: "Rule III", t: "state_hash Exclusion",   d: "The state_hash field is strictly excluded from its own SHA-256 input." },
          ].map((r) => (
            <div key={r.n} style={{ background: "#070a0d", padding: "12px 14px" }}>
              <div style={{ fontFamily: MONO, fontSize: "8px", color: "#2d4455", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "4px" }}>
                {r.n}
              </div>
              <div style={{ fontFamily: MONO, fontSize: "9px", color: "#5a7a8e", lineHeight: 1.7 }}>
                <span style={{ color: "#8098ae", fontWeight: 600 }}>{r.t} — </span>{r.d}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "14px" }}>
          <Math>
            {"state_hash = SHA256( JCS( { T01 … T24 } ) )   ·   T25 excluded from its own input"}
          </Math>
        </div>
      </div>

      <div style={{ height: "1px", background: "#1a2530" }} />

      {/* ══════════════════════════════════════════
          FULL PAPER — 11 SECTIONS
      ══════════════════════════════════════════ */}
      <div
        style={{
          border: "1px solid #1a2530",
          borderTop: "none",
          padding: "40px 40px 48px",
        }}
      >
        {/* Paper header */}
        <div style={{ marginBottom: "32px", paddingBottom: "20px", borderBottom: "1px solid #1a2530" }}>
          <Label>Whitepaper · AIIE-WP-001 · Canonical Record</Label>
          <h2
            style={{
              fontFamily: MONO,
              fontSize: "18px",
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "0.005em",
              margin: "8px 0 6px",
            }}
          >
            Narrative Quantification as Cognitive Infrastructure
          </h2>
          <div style={{ fontFamily: MONO, fontSize: "9px", color: "#3d5a72", letterSpacing: "0.06em" }}>
            Compiling Narrative Structures into Computable Representations for Large Cognitive Models
          </div>
          <div style={{ marginTop: "12px", display: "flex", gap: "24px" }}>
            <div>
              <div style={{ fontFamily: MONO, fontSize: "8px", color: "#2d4455", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2px" }}>Author</div>
              <div style={{ fontFamily: MONO, fontSize: "10px", color: "#5a7a8e" }}>Tomohiko Nakamura — Independent Researcher, Japan</div>
            </div>
            <div>
              <div style={{ fontFamily: MONO, fontSize: "8px", color: "#2d4455", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2px" }}>Version</div>
              <div style={{ fontFamily: MONO, fontSize: "10px", color: "#5a7a8e" }}>WP-1 v1.1</div>
            </div>
            <div>
              <div style={{ fontFamily: MONO, fontSize: "8px", color: "#2d4455", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2px" }}>Canonical Hash</div>
              <div style={{ fontFamily: MONO, fontSize: "10px", color: "#38bdf8" }}>3a5a3a9d…908602b8</div>
            </div>
          </div>
        </div>

        {/* ── §1 Introduction ─────────────────── */}
        <SectionNum n="1" title="Introduction" />
        <W>
          Most contemporary AI systems rely on probabilistic language modeling. Large Language Models (LLMs)
          generate text by predicting token probabilities within massive corpora. While effective for language
          generation, these systems do not explicitly represent narrative structure, causal relationships,
          or long-term narrative dynamics.
        </W>
        <W>
          Human cognition, however, rarely processes information as isolated tokens. Instead, humans organize
          knowledge through <B>narratives</B>: structured relationships between actors, events, motivations,
          and outcomes.
        </W>
        <W>
          This paper proposes that quantifying narrative structures can provide an alternative computational
          representation of human cognition. By decomposing narratives into structured components, it becomes
          possible to construct databases of collective narrative patterns.
        </W>

        {/* ── §2 Narrative Cognition ──────────── */}
        <SectionNum n="2" title="Narrative Cognition" />
        <W>
          Human cognition frequently follows an irreversible narrative processing loop:
        </W>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
            margin: "20px 0 24px",
            border: "1px solid #1a2530",
            padding: "18px 0",
            background: "#050810",
          }}
        >
          {[
            { l: "Event",     d: "Raw sensory input" },
            { l: "Meaning",   d: "Contextual framing" },
            { l: "Narrative", d: "Structural encoding" },
            { l: "Memory",    d: "Compressed retrieval" },
          ].map((s, i, arr) => (
            <div key={s.l} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ textAlign: "center" as const }}>
                <div style={{ fontFamily: MONO, fontSize: "10px", fontWeight: 600, color: "#c8d4e0", padding: "6px 14px", border: "1px solid rgba(255,255,255,0.15)", background: "#070a0d", marginBottom: "5px", letterSpacing: "0.02em" }}>
                  {s.l}
                </div>
                <div style={{ fontFamily: MONO, fontSize: "8px", color: "#2d4455", letterSpacing: "0.05em" }}>
                  {s.d}
                </div>
              </div>
              {i < arr.length - 1 && (
                <div style={{ fontFamily: MONO, fontSize: "12px", color: "#38bdf8", margin: "0 10px", marginBottom: "16px", opacity: 0.5 }}>→</div>
              )}
            </div>
          ))}
        </div>

        <W>
          Experiences are rarely stored as raw data. Instead, individuals interpret events through causal
          explanations and emotional context, forming narratives that are later stored in memory. This mechanism
          allows humans to compress complex experiences into structured stories that{" "}
          <B>predict future outcomes and guide subsequent decisions</B>. Narrative cognition therefore represents
          a fundamental cognitive process rather than a mere cultural artifact.
        </W>

        {/* ── §3 Narrative Quantification ─────── */}
        <SectionNum n="3" title="Narrative Quantification" />
        <W>
          Narrative Quantification is the process of converting narrative structures into analyzable data.
          Narratives can be decomposed into structural components which are represented through structured
          tags<Ref id="02" /> and stored within databases, enabling large-scale analysis across media,
          politics, economics, and culture.
        </W>

        <SubNum n="§ 3.1" title="Decomposition" />
        <W>
          The first stage of quantification is <B>Decomposition</B>, where raw narrative text is segmented
          into primary semantic units. By isolating <B>Actors</B> (agents of change), <B>Events</B> (actions
          taken), and <B>Causal Relationships</B> (the "why"), we transform linguistic ambiguity into a set
          of distinct, computable variables.
        </W>

        <SubNum n="§ 3.2" title="Event Formation" />
        <W>
          The second stage is <B>Event Formation</B>, where continuous occurrences are discretized into logical
          structures. <B>An event is defined as the minimum causal interaction unit between actors unfolding
          over time.</B>
        </W>
        <div style={{ marginBottom: "14px" }}>
          <Bullet label="Actors">The agents initiating or receiving the interaction.</Bullet>
          <Bullet label="Action-Reaction Pair">The core causal loop; a reaction cannot occur without a preceding action within the same minimum causal unit.</Bullet>
          <Bullet label="Temporal Boundary">The specific window from the trigger to the resulting outcome.</Bullet>
        </div>

        <SubNum n="§ 3.3" title="Narrative Compression" />
        <W>
          The final stage is <B>Narrative Compression</B> — an <B>active entropy reduction</B> within the
          information space. Raw data is high-entropy; by applying decomposition and event formation, we filter
          irrelevant details and retain only the causal, emotional, and structural core. This is what transforms
          "text" into "knowledge," and serves as the fundamental input for the{" "}
          <B>Large Cognitive Model (LCM)</B>.
        </W>
        <div style={{ marginBottom: "14px" }}>
          <Bullet label="Computational Efficiency">Reasoning over discrete, compressed event units is far more efficient than processing raw tokens.</Bullet>
          <Bullet label="Long-Term Coherence">Stripping noise makes the narrative arc visible — tracking long-term dynamics that LLMs often lose.</Bullet>
          <Bullet label="Storage and Retrieval">Enables construction of vast, searchable Narrative Databases — mirroring biological memory.</Bullet>
        </div>

        {/* ── §4 Narrative Compiler ────────────── */}
        <SectionNum n="4" title="The Narrative Compiler: Search and Optimization" />
        <W>
          The Narrative Compiler explores a vast space of potential interpretations to find the most probable
          narrative structures, employing specific <B>Search Constraints</B> to generate the final probability
          distribution P(N | text).
        </W>

        <SubNum n="§ 4.1" title="Generating Possible Narrative Graphs" />
        <W>
          The Compiler treats narrative construction as a graph-search problem, building a{" "}
          <B>Narrative Graph (G)</B> where nodes represent events and edges represent causal or temporal
          transitions.
        </W>

        <SubNum n="§ 4.2" title="Beam Search for Hypothesis Management" />
        <W>
          The Compiler utilizes <B>Beam Search</B>, keeping only the <B>top-k</B> most plausible narrative
          hypotheses at each step. Diversity maintenance preserves divergent paths if probabilities are
          sufficiently high, ensuring P(N | text) captures legitimate ambiguity.
        </W>

        <SubNum n="§ 4.3" title="Graph Pruning and Information Entropy" />
        <W>
          <B>Graph Pruning</B> actively removes low-probability or redundant branches. Entropy Thresholding
          eliminates branches that increase conditional entropy without adding semantic value, facilitating
          Narrative Compression described in §3.3.
        </W>

        <SubNum n="§ 4.4" title="Causal Constraints: The Logical Filter" />
        <W>
          The <B>Causal Constraint</B> acts as the "physics" of Narrative Space, validating every proposed
          edge: Temporal Precedence (cause must precede effect), Actor Consistency (actions must align with
          known motivations), and Interaction Logic (Action-Reaction coherence).
        </W>

        <SubNum n="§ 4.5" title="Final State Synthesis" />
        <W>
          Through these constraints, the Compiler collapses near-infinite prose possibilities into a refined{" "}
          <B>hash set</B> — a weighted distribution of graphs that have survived beam search and passed all
          causal filters.
        </W>

        {/* ── §5 24TAG Taxonomy ────────────────── */}
        <SectionNum n="5" title="The 24TAG Taxonomy" />
        <W>
          To ensure universal compatibility and deterministic hashing, the protocol defines a fixed schema
          of 24 structured tags<Ref id="02" />, categorized into four primary layers. Each tag (T₀₁…T₂₄)
          is populated by the Narrative Compiler. As specified in the{" "}
          <B>Crystallization Protocol</B><Ref id="01" />, the{" "}
          <IC>state_hash</IC> is calculated by applying SHA-256 to the JCS-normalized string of these 24 tags.
        </W>

        <SubNum n="§ 5.1" title="Data Structure and Compilation" />
        <W>
          The resulting data structure is a JSON object. Following <B>RFC 8785</B><Ref id="01" />, the
          Compiler sorts the 24 structured tags into a canonical format. The{" "}
          <IC>state_hash</IC> field itself is strictly excluded from the hash input, preventing circular
          dependencies.
        </W>
        <Math>
          {"state_hash = SHA256( JCS( { TAG₀₁…₂₄ } ∖ { state_hash } ) )"}
        </Math>
        <div style={{ marginBottom: "14px" }}>
          <Bullet label="Normalization (JCS)">Compiler sorts 24 tags into canonical JSON — variations in whitespace or key ordering do not affect output.</Bullet>
          <Bullet label="Self-Referential Exclusion">state_hash field is strictly excluded from the hash input — preventing circular dependencies.</Bullet>
          <Bullet label="Hashing (SHA-256)">Algorithm applied to the canonical byte-stream of the 24 tags to produce a 64-character hex digest.</Bullet>
        </div>

        <SubNum n="§ 5.2" title="Integrity and Verification" />
        <W>
          By excluding <IC>state_hash</IC><Ref id="01" /> from its own input, we create a{" "}
          <B>One-Way Cognitive Seal</B>. A receiver verifies integrity by: (1) temporarily removing the
          state_hash; (2) re-running JCS + SHA-256 on the remaining 24 tags; (3) comparing the re-calculated
          hash with the original. Any <B>divergence</B> indicates the narrative structure has been modified
          or corrupted post-compilation.
        </W>

        {/* ── §6 Narrative Space ───────────────── */}
        <SectionNum n="6" title="Narrative Observation and the Narrative Space" />
        <W>
          Once narratives are compiled into distributions of narrative states, we can formalize the landscape
          in which they exist.<Ref id="03" />
        </W>

        <SubNum n="§ 6.1" title="Defining Narrative Space" />
        <W>
          <B>Narrative Space is defined as the multi-dimensional space formed by the set of possible narrative
          states.</B> Each specific state is represented as a point within this space.
        </W>

        <SubNum n="§ 6.2" title="Graph Embedding" />
        <W>
          Each narrative graph G is projected into a d-dimensional real-valued space via a Graph Embedding
          function e. This ensures that structural and causal logic of the narrative is preserved as a set of
          coordinates.
        </W>
        <Math>e(G) ∈ ℝ^d</Math>

        <SubNum n="§ 6.3" title="Quantifying Divergence through Distance" />
        <W>
          The <B>divergence</B> between two narrative states G₁ and G₂ is defined by the distance between
          their embeddings. Low distance = cognitive consensus. High distance = fundamental split in the
          narrative tag structure<Ref id="02" /> — "Narrative Rifts."
        </W>
        <Math>distance = ‖ e(G₁) − e(G₂) ‖</Math>

        <SubNum n="§ 6.4" title="Mapping the Narrative Ecosystem" />
        <div style={{ marginBottom: "14px" }}>
          <Bullet label="Attractors">Regions in ℝ^d where narrative vectors cluster — indicating dominant societal beliefs.</Bullet>
          <Bullet label="Bifurcation Points">Moments where a single event splits P(N | text) into two distant clusters.</Bullet>
          <Bullet label="Narrative Velocity">Rate at which e(G) moves through space as new information is integrated — capturing speed of societal change.</Bullet>
        </div>

        {/* ── §7 Cognitive Infrastructure ─────── */}
        <SectionNum n="7" title="Cognitive Infrastructure" />
        <W>
          If narrative data can be systematically compiled and structured, it functions as a foundational{" "}
          <B>Cognitive Infrastructure</B> — a layer designed not to store raw facts, but to manage the{" "}
          <B>structure of interpretation</B>.
        </W>

        <SubNum n="§ 7.1" title="From Knowledge Bases to Narrative Databases" />
        <W>
          Traditional knowledge bases (Wikidata, Knowledge Graphs) store "what" happened. A{" "}
          <B>Narrative Database</B>, powered by the Narrative Compiler, stores{" "}
          <B>Crystallized Narrative States</B><Ref id="01" /> — preserving not just the event, but the causal
          logic, emotional weight, and conflict dynamics. This shifts focus from "Data Storage" to
          "Cognitive State Storage."
        </W>

        <SubNum n="§ 7.2" title="Information Integrity and the State Hash" />
        <W>
          The deterministic <IC>state_hash</IC><Ref id="01" /> provides a revolutionary mechanism for{" "}
          <B>Information Integrity</B>:
        </W>
        <div style={{ marginBottom: "14px" }}>
          <Bullet label="Proof of Interpretation">Attaching a state_hash to a news report provides a cryptographic "Cognitive Seal."</Bullet>
          <Bullet label="Divergence Detection">Two outlets reporting the same event can have their state_hash outputs compared instantly — any divergence objectively indicates differing narrative structures.</Bullet>
        </div>

        <SubNum n="§ 7.3" title="Applications" />
        <div style={{ marginBottom: "14px" }}>
          <Bullet label="Media & Information Integrity">Automated detection of narrative manipulation or divergent reporting.</Bullet>
          <Bullet label="Geopolitical Narrative Mapping">Real-time observation<Ref id="03" /> of how different nations interpret the same event — identifying "Narrative Rifts" before physical escalation.</Bullet>
          <Bullet label="Corporate & Economic Intelligence">Tracking evolution of market narratives and investor sentiment through structured event formation.</Bullet>
        </div>

        {/* ── §8 LCM ──────────────────────────── */}
        <SectionNum n="8" title="Reasoning over Narrative Distributions (LCM)" />
        <W>
          By defining a state as P(N | text), the <B>Large Cognitive Model (LCM)</B> gains the ability to
          perform "superpositional" reasoning.
        </W>

        <SubNum n="§ 8.1" title="Inference as Distribution Transformation" />
        <W>
          While LLMs predict tokens, the LCM transforms one probability distribution into another. The
          reasoning core evaluates how the current distribution P(N_t | text_t) evolves into a future
          distribution {"P(N_{t+1})"} when a new event occurs.
        </W>

        <SubNum n="§ 8.2" title="Handling Ambiguity and Divergence" />
        <W>
          When a text is highly ambiguous, the Compiler produces a broad hash set with distributed
          probabilities. The LCM tracks multiple "possible worlds" simultaneously, collapsing them only when
          subsequent information makes one narrative significantly more probable.
        </W>

        <SubNum n="§ 8.3" title="Reasoning over Causal Trajectories" />
        <W>
          Because an event is the <B>minimum causal interaction unit</B>, the LCM tracks long-term narrative
          arcs without the "forgetting" common in LLMs. Reasoning is a calculation of <B>state transitions</B>:
        </W>
        <Math>State A (Hash₁) ──[Causal Logic]──→ State B (Hash₂)</Math>

        {/* ── §9 Human Memory ─────────────────── */}
        <SectionNum n="9" title="Human Memory and Narrative Cognition" />
        <W>
          Human memory operates through a sophisticated process of <B>narrative compression</B>. When humans
          experience an event, the brain acts as a biological <B>Narrative Compiler</B>, transforming
          continuous experience into discrete structured narrative units.
        </W>
        <Math>P(N | Experience)</Math>
        <W>
          What we "remember" is not raw data, but the <B>hash set</B> of the most probable narrative
          structures. "Recalling" is effectively <B>re-compiling</B> a stored distribution back into
          coherent story.
        </W>

        <SubNum n="§ 9.3" title="Biomimetic Validation" />
        <W>
          Narrative Quantification is fundamentally <B>biomimetic</B>. Using the{" "}
          <IC>state_hash</IC><Ref id="01" /> to represent a "crystallized" interpretation emulates the way
          human synapses consolidate experiences into stable, retrievable concepts. Human cognitive dissonance
          occurs when a new experience generates a narrative state mathematically distant from the existing
          "memory manifold."
        </W>

        {/* ── §10 Limitations ─────────────────── */}
        <SectionNum n="10" title="Limitations" />

        <SubNum n="§ 10.1" title="Subjectivity and Algorithmic Bias" />
        <W>
          The "priors" used to assign probabilities are often derived from model training data, potentially
          introducing systemic biases — where the compiler favors Western-centric causal logic or specific
          cultural tropes, leading to a <IC>state_hash</IC><Ref id="01" /> that reflects a biased
          "crystallization" of reality.
        </W>

        <SubNum n="§ 10.2" title="Computational Complexity of Graph Generation" />
        <W>
          In complex, multi-actor texts, the number of potential causal connections grows exponentially.
          Managing the trade-off between event extraction granularity and the computational cost of maintaining
          a high-fidelity <B>hash set</B> remains a significant hurdle for real-time applications.
        </W>

        <SubNum n="§ 10.3" title="Cultural and Linguistic Heterogeneity" />
        <W>
          Narrative structures are not universal. A <B>24TAG framework</B><Ref id="02" /> optimized for
          one culture may fail to capture the nuances of another — circular narratives vs. linear
          conflict-driven arcs — resulting in <B>divergence</B> that is cultural rather than factual.
        </W>

        <SubNum n="§ 10.4" title="Data Sovereignty and Narrative Warfare" />
        <W>
          If a centralized authority can define the "standard" <IC>state_hash</IC><Ref id="01" /> for a
          global event, they possess the power to delegitimize divergent but valid interpretations. The risk
          of using this infrastructure for "narrative warfare" — mathematically suppressing opposing
          viewpoints by labeling them "divergent noise" — is a serious ethical concern.
        </W>

        <SubNum n="§ 10.5" title="Semantic Loss during Compression" />
        <W>
          Narrative compression is an active entropy reduction process. Subtle but crucial "soft" data —
          irony, subtext, poetic ambiguity — may be lost during the transition from raw text to a structured
          <IC>state_hash</IC>.
        </W>

        {/* ── §11 Conclusion ──────────────────── */}
        <SectionNum n="11" title="Conclusion" />
        <W>
          Despite these limitations, Narrative Quantification represents a necessary evolution in Artificial
          Intelligence. By moving beyond the probabilistic prediction of language tokens and toward the{" "}
          <B>structured reasoning of narrative states</B>, we provide a framework that more closely mirrors
          human cognition.
        </W>
        <W>
          The transition from <B>Narrative Structures to Large Cognitive Models (LCM)</B> offers more than
          technical efficiency: it provides a way to map the "Narrative Space" of our society, making the
          invisible structures of our interpretations visible, measurable, and verifiable. Future research
          will focus on mitigating bias through diverse "compiler ensembles" and exploring decentralized
          governance of narrative hashes.
        </W>
        <W>
          The path toward <B>Artificial General Intelligence (AGI)</B> lies not in bigger models, but in
          deeper structures. Narrative Quantification is the first step in building an AI that doesn't just
          talk like a human, but understands like one.
        </W>

        <HR />

        {/* Citation footnotes */}
        <div>
          <div style={{ fontFamily: MONO, fontSize: "8px", color: "#2d4455", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}>
            Reference Index
          </div>
          {Object.entries(REFS).map(([id, ref]) => (
            <div key={id} style={{ display: "flex", gap: "12px", marginBottom: "6px", alignItems: "baseline" }}>
              <span style={{ fontFamily: MONO, fontSize: "9px", color: "#38bdf8", letterSpacing: "0.03em", flexShrink: 0 }}>
                [*{id}]
              </span>
              <Link
                to={ref.href}
                style={{ fontFamily: MONO, fontSize: "9px", color: "#5a7a8e", textDecoration: "none", letterSpacing: "0.02em" }}
              >
                {ref.label} ↗
              </Link>
            </div>
          ))}
        </div>

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
            AIIE-WP-001 · Acta AIIE Standardization Committee · RFC 8785 Compliant
          </div>
          <div style={{ fontFamily: MONO, fontSize: "8px", color: "#1e3040", letterSpacing: "0.06em" }}>
            end of document
          </div>
        </div>
      </div>
    </div>
  );
}
