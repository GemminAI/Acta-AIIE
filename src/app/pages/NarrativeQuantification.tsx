import { ReactNode } from "react";
import { Link } from "react-router";
import { DocHeader } from "../components/DocHeader";
import { DocPage } from "../components/DocPage";

const MONO = "'JetBrains Mono', monospace";

/* ── Inline citation link ─────────────────────────────────────────────── */
function Cite({ href, label }: { href: string; label: string }) {
  return (
    <Link
      to={href}
      style={{
        fontFamily: MONO,
        fontSize: "8px",
        color: "#38bdf8",
        letterSpacing: "0.04em",
        textDecoration: "none",
        padding: "0 3px",
        border: "1px solid rgba(56,189,248,0.25)",
        verticalAlign: "super",
        lineHeight: 1,
        marginLeft: "2px",
        whiteSpace: "nowrap",
        opacity: 0.85,
      }}
    >
      {label}
    </Link>
  );
}

/* ── Block-level components ───────────────────────────────────────────── */
function Wall({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontFamily: MONO,
        fontSize: "13px",
        color: "#8098ae",
        lineHeight: 2.0,
        marginBottom: "18px",
        letterSpacing: "0.01em",
      }}
    >
      {children}
    </p>
  );
}

function Em({ children }: { children: ReactNode }) {
  return (
    <strong
      style={{
        fontFamily: MONO,
        fontWeight: 600,
        color: "#c8d4e0",
      }}
    >
      {children}
    </strong>
  );
}

function SH({ children }: { children: ReactNode }) {
  /* state_hash / inline code highlight */
  return (
    <code
      style={{
        fontFamily: MONO,
        fontSize: "11px",
        color: "#38bdf8",
        background: "rgba(56,189,248,0.05)",
        padding: "1px 5px",
        border: "1px solid rgba(56,189,248,0.2)",
      }}
    >
      {children}
    </code>
  );
}

function IC({ children }: { children: ReactNode }) {
  return (
    <code
      style={{
        fontFamily: MONO,
        fontSize: "11px",
        color: "#4a8fa8",
        background: "#0a1018",
        padding: "1px 5px",
        border: "1px solid #1a2530",
      }}
    >
      {children}
    </code>
  );
}

function SectionHeader({
  num,
  title,
}: {
  num: string;
  title: string;
}) {
  return (
    <div style={{ marginTop: "40px", marginBottom: "18px" }}>
      <div
        style={{
          fontFamily: MONO,
          fontSize: "9px",
          color: "#3d5a72",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: "7px",
        }}
      >
        § {num}
      </div>
      <h2
        style={{
          fontFamily: MONO,
          fontSize: "15px",
          fontWeight: 600,
          color: "#ffffff",
          letterSpacing: "0.01em",
          paddingBottom: "10px",
          borderBottom: "1px solid #1a2530",
          margin: 0,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

function SubHeader({ title }: { title: string }) {
  return (
    <h3
      style={{
        fontFamily: MONO,
        fontSize: "12px",
        fontWeight: 600,
        color: "#c8d4e0",
        letterSpacing: "0.03em",
        marginTop: "26px",
        marginBottom: "12px",
      }}
    >
      {title}
    </h3>
  );
}

function BulletItem({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        marginBottom: "10px",
        alignItems: "flex-start",
        borderLeft: "1px solid #1a2530",
        paddingLeft: "14px",
      }}
    >
      <span
        style={{
          fontFamily: MONO,
          fontSize: "10px",
          color: "#38bdf8",
          flexShrink: 0,
          marginTop: "4px",
        }}
      >
        ·
      </span>
      <span
        style={{
          fontFamily: MONO,
          fontSize: "12px",
          color: "#7a8f9e",
          lineHeight: 1.85,
        }}
      >
        {label && (
          <strong
            style={{
              fontFamily: MONO,
              fontWeight: 600,
              color: "#c8d4e0",
              marginRight: "6px",
            }}
          >
            {label}:
          </strong>
        )}
        {children}
      </span>
    </div>
  );
}

function MathBlock({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        margin: "18px 0",
        padding: "14px 20px",
        border: "1px solid #1a2530",
        background: "#050810",
        fontFamily: MONO,
        fontSize: "12px",
        color: "#5a9ab8",
        letterSpacing: "0.04em",
        lineHeight: 1.6,
        overflowX: "auto",
      }}
    >
      {children}
    </div>
  );
}

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  return (
    <div
      style={{
        margin: "20px 0",
        border: "1px solid #1a2530",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "6px 14px",
          background: "#0a1018",
          borderBottom: "1px solid #1a2530",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          <div style={{ width: "6px", height: "6px", background: "#1a2530" }} />
          <div style={{ width: "6px", height: "6px", background: "#1a2530" }} />
          <div style={{ width: "6px", height: "6px", background: "#1a2530" }} />
        </div>
        <span
          style={{
            fontFamily: MONO,
            fontSize: "9px",
            color: "#3d5a72",
            letterSpacing: "0.08em",
          }}
        >
          {lang}
        </span>
      </div>
      <pre
        style={{
          margin: 0,
          padding: "20px",
          background: "#050810",
          overflowX: "auto",
          fontFamily: MONO,
          fontSize: "12px",
          color: "#5a9ab8",
          lineHeight: 1.7,
          letterSpacing: "0.02em",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ── 24TAG Table ──────────────────────────────────────────────────────── */
const TAG_DATA: { layer: string; id: string; name: string; desc: string }[] = [
  { layer: "Actor & Agency", id: "T01", name: "Primary_Actor",      desc: "The main entity initiating the interaction." },
  { layer: "",               id: "T02", name: "Secondary_Actor",    desc: "The entity receiving or responding to the action." },
  { layer: "",               id: "T03", name: "Actor_Role_A",       desc: "The functional role of the primary actor (e.g., Protagonist)." },
  { layer: "",               id: "T04", name: "Actor_Role_B",       desc: "The functional role of the secondary actor (e.g., Antagonist)." },
  { layer: "",               id: "T05", name: "Actor_Motivation_A", desc: "The underlying goal or \"Why\" for Actor A." },
  { layer: "",               id: "T06", name: "Actor_Motivation_B", desc: "The underlying goal or \"Why\" for Actor B." },
  { layer: "Event & Action", id: "T07", name: "Action_Type",        desc: "The category of the event (e.g., Verbal, Physical, Financial)." },
  { layer: "",               id: "T08", name: "Action_Intensity",   desc: "The magnitude of the action (Scaled 0.0 to 1.0)." },
  { layer: "",               id: "T09", name: "Target_Resource",    desc: "The specific object or value being contested." },
  { layer: "",               id: "T10", name: "Event_Modality",     desc: "Whether the event is factual, hypothetical, or desired." },
  { layer: "",               id: "T11", name: "Temporal_Sequence",  desc: "The relative order of the event within the narrative arc." },
  { layer: "",               id: "T12", name: "Spatial_Context",    desc: "The domain or environment where the event occurs." },
  { layer: "Causal & Logic", id: "T13", name: "Causal_Link_Type",   desc: "The nature of the connection (e.g., Direct Cause, Enabling)." },
  { layer: "",               id: "T14", name: "Conflict_Nature",    desc: "The type of opposition (e.g., Internal, Interpersonal)." },
  { layer: "",               id: "T15", name: "Conflict_Intensity", desc: "The severity of the friction between actors." },
  { layer: "",               id: "T16", name: "Resolution_Status",  desc: "The degree to which the conflict has been settled." },
  { layer: "",               id: "T17", name: "Outcome_Valence",    desc: "The positive or negative impact on the narrative state." },
  { layer: "",               id: "T18", name: "Logic_Consistency",  desc: "The degree of alignment with prior narrative states." },
  { layer: "Context & Tone", id: "T19", name: "Emotional_Tone_A",   desc: "The emotional state of Actor A during the event." },
  { layer: "",               id: "T20", name: "Emotional_Tone_B",   desc: "The emotional state of Actor B during the event." },
  { layer: "",               id: "T21", name: "Perspective_Bias",   desc: "The point of view from which the narrative is told." },
  { layer: "",               id: "T22", name: "Info_Asymmetry",     desc: "The gap in knowledge between the actors involved." },
  { layer: "",               id: "T23", name: "Significance_Score", desc: "The relative importance of this event to the overall arc." },
  { layer: "",               id: "T24", name: "Narrative_Closure",  desc: "The extent to which this event concludes a specific thread." },
];

function Tag24Table() {
  return (
    <div
      style={{
        margin: "24px 0",
        border: "1px solid #1a2530",
        overflow: "hidden",
      }}
    >
      {/* table header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "160px 52px 180px 1fr",
          borderBottom: "1px solid #1a2530",
          background: "#0a1018",
          padding: "8px 12px",
          gap: "12px",
        }}
      >
        {["Layer", "ID", "Tag Name", "Description"].map((h) => (
          <span
            key={h}
            style={{
              fontFamily: MONO,
              fontSize: "9px",
              color: "#3d5a72",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {h}
          </span>
        ))}
      </div>
      {TAG_DATA.map((row, i) => {
        const isLayerStart = row.layer !== "";
        const isLast = i === TAG_DATA.length - 1;
        return (
          <div
            key={row.id}
            style={{
              display: "grid",
              gridTemplateColumns: "160px 52px 180px 1fr",
              padding: "6px 12px",
              gap: "12px",
              borderBottom: isLast ? "none" : "1px solid #0e1820",
              background: isLayerStart ? "rgba(255,255,255,0.01)" : "transparent",
              alignItems: "start",
            }}
          >
            <span
              style={{
                fontFamily: MONO,
                fontSize: "10px",
                color: isLayerStart ? "#5a7a8e" : "transparent",
                letterSpacing: "0.02em",
                userSelect: "none",
              }}
            >
              {row.layer || "·"}
            </span>
            <span
              style={{
                fontFamily: MONO,
                fontSize: "10px",
                color: "#4a8fa8",
                letterSpacing: "0.04em",
              }}
            >
              {row.id}
            </span>
            <span
              style={{
                fontFamily: MONO,
                fontSize: "10px",
                color: "#c8d4e0",
                letterSpacing: "0.01em",
              }}
            >
              {row.name}
            </span>
            <span
              style={{
                fontFamily: MONO,
                fontSize: "10px",
                color: "#5a7a8e",
                lineHeight: 1.65,
              }}
            >
              {row.desc}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Main Page ────────────────────────────────────────────────────────── */
export function NarrativeQuantification() {
  return (
    <DocPage>
      <DocHeader
        title="Narrative Quantification as Cognitive Infrastructure"
        subtitle="Compiling Narrative Structures into Computable Representations for Large Cognitive Models"
        canonicalHash="3a5a3a9d1b13367621b5b34cc25a0d886a7da39ef91015a3f757ae37908602b8"
        status="Verified"
        version="WP-1 v1.1"
        author="Tomohiko Nakamura — Independent Researcher, Japan"
        compliance="AIIE Protocol · 24TAG Schema · RFC 8785"
        docId="AIIE-WP-001"
      />

      {/* ── Abstract ────────────────────────────────────────────────── */}
      <div
        style={{
          padding: "16px 20px",
          border: "1px solid #1a2530",
          background: "#080c10",
          marginBottom: "36px",
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: "9px",
            color: "#3d5a72",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}
        >
          Abstract
        </div>
        <p
          style={{
            fontFamily: MONO,
            fontSize: "12px",
            color: "#6b7f8e",
            lineHeight: 1.95,
            margin: "0 0 12px",
            letterSpacing: "0.01em",
          }}
        >
          Human societies interpret events primarily through narrative structures rather than isolated data points. This paper proposes{" "}
          <Em>Narrative Quantification</Em>, a framework for transforming narrative information into structured cognitive data. By decomposing narratives into actors, events, conflicts, resolutions, emotional context, and causal relationships, narratives can be stored as structured datasets and analyzed computationally.
        </p>
        <p
          style={{
            fontFamily: MONO,
            fontSize: "12px",
            color: "#6b7f8e",
            lineHeight: 1.95,
            margin: "0 0 12px",
            letterSpacing: "0.01em",
          }}
        >
          To operationalize this transformation, the paper introduces the concept of a <Em>Narrative Compiler</Em>, a system that converts narrative text into structured cognitive representations such as the{" "}
          <Em>24TAG structure</Em>
          <Cite href="/protocol/24tag-schema" label="24TAG" />. These representations enable the creation of narrative databases that may serve as the foundation for{" "}
          <Em>Large Cognitive Models (LCM)</Em> — systems designed to reason over structured representations of human narratives rather than purely probabilistic language tokens.
        </p>
        <p
          style={{
            fontFamily: MONO,
            fontSize: "12px",
            color: "#6b7f8e",
            lineHeight: 1.95,
            margin: 0,
            letterSpacing: "0.01em",
          }}
        >
          This work suggests that narrative quantification may function as a new layer of cognitive infrastructure for future AI systems.
        </p>
      </div>

      {/* ── § 1 ─────────────────────────────────────────────────────── */}
      <SectionHeader num="1" title="Introduction" />
      <Wall>
        Most contemporary AI systems rely on probabilistic language modeling. Large Language Models (LLMs) generate text by predicting token probabilities within massive corpora. While effective for language generation, these systems do not explicitly represent narrative structure, causal relationships, or long-term narrative dynamics.
      </Wall>
      <Wall>
        Human cognition, however, rarely processes information as isolated tokens. Instead, humans organize knowledge through <Em>narratives</Em>: structured relationships between actors, events, motivations, and outcomes.
      </Wall>
      <Wall>
        This paper proposes that quantifying narrative structures can provide an alternative computational representation of human cognition. By decomposing narratives into structured components, it becomes possible to construct databases of collective narrative patterns.
      </Wall>

      {/* ── § 2 ─────────────────────────────────────────────────────── */}
      <SectionHeader num="2" title="Narrative Cognition" />
      <Wall>
        Human cognition frequently follows a narrative processing loop:
      </Wall>

      {/* Processing loop diagram */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          margin: "24px 0 28px",
          border: "1px solid #1a2530",
          padding: "22px 20px",
          background: "#080c10",
        }}
      >
        {[
          { label: "Event",     desc: "Raw sensory input" },
          { label: "Meaning",   desc: "Contextual framing" },
          { label: "Narrative", desc: "Structural encoding" },
          { label: "Memory",    desc: "Compressed retrieval" },
        ].map((step, i, arr) => (
          <div key={step.label} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#c8d4e0",
                  padding: "8px 16px",
                  border: "1px solid #2a3f52",
                  background: "#070a0d",
                  marginBottom: "6px",
                  letterSpacing: "0.02em",
                }}
              >
                {step.label}
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: "8px",
                  color: "#2d4455",
                  letterSpacing: "0.05em",
                }}
              >
                {step.desc}
              </div>
            </div>
            {i < arr.length - 1 && (
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: "14px",
                  color: "#38bdf8",
                  margin: "0 10px",
                  marginBottom: "18px",
                  opacity: 0.55,
                }}
              >
                →
              </div>
            )}
          </div>
        ))}
      </div>

      <Wall>
        Experiences are rarely stored as raw data. Instead, individuals interpret events through causal explanations and emotional context, forming narratives that are later stored in memory. This mechanism allows humans to compress complex experiences into structured stories that <Em>predict future outcomes and guide subsequent decisions</Em>. Narrative cognition therefore represents a fundamental cognitive process rather than a mere cultural artifact.
      </Wall>

      {/* ── § 3 ─────────────────────────────────────────────────────── */}
      <SectionHeader num="3" title="Narrative Quantification" />
      <Wall>
        Narrative Quantification is the process of converting narrative structures into analyzable data. Narratives can be decomposed into structural components:
      </Wall>
      <div style={{ marginBottom: "18px" }}>
        {["Actors", "Events", "Conflict", "Resolution", "Emotional context", "Causal relationships"].map((item) => (
          <BulletItem key={item}>{item}</BulletItem>
        ))}
      </div>
      <Wall>
        Once extracted, these components can be represented through structured tags
        <Cite href="/protocol/24tag-schema" label="24TAG" /> and stored within databases. This enables large-scale analysis of narrative dynamics across media, politics, economics, and culture.
      </Wall>

      <SubHeader title="3.1  Decomposition" />
      <Wall>
        The first stage of quantification is <Em>Decomposition</Em>, where raw narrative text is segmented into its primary semantic units. Rather than treating a story as a continuous stream of words, we identify discrete entities and their roles. By isolating <Em>Actors</Em> (the agents of change), <Em>Events</Em> (the actions taken), and <Em>Causal Relationships</Em> (the "why" behind the actions), we transform linguistic ambiguity into a set of distinct variables. This step is crucial for transitioning from a subjective reading of a text to an objective, computational representation.
      </Wall>

      <SubHeader title="3.2  Event Formation" />
      <Wall>
        The second stage of quantification is <Em>Event Formation</Em>, where continuous occurrences are discretized into logical structures. Within this framework,{" "}
        <Em>an event is defined as the minimum causal interaction unit between actors unfolding over time.</Em>
      </Wall>
      <Wall>
        Unlike traditional data processing, which might treat an action and its subsequent response as separate entries, event formation recognizes their inherent unity. An "action" without a "reaction" (or a state change) is incomplete in the context of narrative cognition. Therefore, we cluster these temporal sequences into a single atomic unit.
      </Wall>
      <div style={{ marginBottom: "18px" }}>
        <BulletItem label="Actors">The agents initiating or receiving the interaction.</BulletItem>
        <BulletItem label="Action-Reaction Pair">The core causal loop (e.g., Actor A exerts influence, Actor B undergoes a transition or retaliates).</BulletItem>
        <BulletItem label="Temporal Boundary">The specific window from the trigger to the resulting outcome.</BulletItem>
      </div>
      <Wall>
        By defining the event as the <Em>minimum causal interaction unit</Em>, we enable Large Cognitive Models (LCM) to perform reasoning not just on what happened, but on the <Em>logic of the interaction itself</Em>. This is the prerequisite for moving from linguistic probability to true causal understanding.
      </Wall>

      <SubHeader title="3.3  Narrative Compression" />
      <Wall>
        The final stage of quantification is <Em>Narrative Compression</Em>, the process by which structured narrative data is refined into a high-density cognitive representation. This operation can be understood as an <Em>active entropy reduction</Em> within the information space.
      </Wall>
      <Wall>
        Raw, real-world data is inherently high-entropy — it is noisy, continuous, and lacks explicit meaning. By applying the processes of decomposition and event formation, we filter out irrelevant details and retain only the causal, emotional, and structural core. This allows for a massive reduction in the volume of data required to represent a situation while simultaneously increasing its semantic value.
      </Wall>
      <div style={{ marginBottom: "18px" }}>
        <BulletItem label="Computational Efficiency">Reasoning over discrete, compressed event units is far more efficient than processing raw linguistic tokens.</BulletItem>
        <BulletItem label="Long-Term Coherence">By stripping away noise, the "narrative arc" becomes visible, allowing for the tracking of long-term dynamics that LLMs often lose.</BulletItem>
        <BulletItem label="Storage and Retrieval">Much like human memory, which stores experiences as "structured stories" rather than raw sensory logs, this compression enables the construction of vast, searchable Narrative Databases.</BulletItem>
      </div>
      <Wall>
        Ultimately, narrative compression is what transforms "text" into "knowledge." It is this compressed, structured format that serves as the fundamental input for the <Em>Large Cognitive Model (LCM)</Em>.
      </Wall>

      {/* ── § 4 ─────────────────────────────────────────────────────── */}
      <SectionHeader num="4" title="The Narrative Compiler: Search and Optimization" />
      <Wall>
        The Narrative Compiler does not merely extract data; it explores a vast space of potential interpretations to find the most probable narrative structures. Given that a single text can yield an exponential number of event connections, the Compiler employs specific <Em>Search Constraints</Em> to manage this complexity and generate the final probability distribution P(N | text).
      </Wall>

      <SubHeader title="4.1  Generating Possible Narrative Graphs" />
      <Wall>
        The Compiler treats narrative construction as a graph-search problem. From a set of extracted events, it attempts to build a <Em>Narrative Graph (G)</Em> where nodes represent events and edges represent causal or temporal transitions. To prevent the "hallucination" of connections, the following optimization techniques are applied.
      </Wall>

      <SubHeader title="4.2  Beam Search for Hypothesis Management" />
      <Wall>
        To maintain a manageable "hash set" of narrative states, the Compiler utilizes <Em>Beam Search</Em>. Rather than exploring every possible graph configuration, the Compiler keeps only the <Em>top-k</Em> most plausible narrative hypotheses at each step of the construction.
      </Wall>
      <div style={{ marginBottom: "18px" }}>
        <BulletItem label="Top-k Survival">At each stage of event linking, only the graphs with the highest cumulative probability scores are retained.</BulletItem>
        <BulletItem label="Diversity Maintenance">The beam search is tuned to preserve divergent narrative paths if their probabilities are sufficiently high, ensuring that the final distribution P(N | text) captures legitimate ambiguity.</BulletItem>
      </div>

      <SubHeader title="4.3  Graph Pruning and Information Entropy" />
      <Wall>
        <Em>Graph Pruning</Em> is the active removal of low-probability or redundant branches in the narrative tree.
      </Wall>
      <div style={{ marginBottom: "18px" }}>
        <BulletItem label="Redundancy Filtering">If multiple paths lead to the same structural state with lower efficiency, they are pruned to reduce computational overhead.</BulletItem>
        <BulletItem label="Entropy Thresholding">Branches that increase the conditional entropy of the narrative without adding significant semantic value are eliminated, facilitating the Narrative Compression described in §3.3.</BulletItem>
      </div>

      <SubHeader title="4.4  Causal Constraints: The Logical Filter" />
      <Wall>
        The most critical constraint is the <Em>Causal Constraint</Em>, which acts as the "physics" of the Narrative Space. The Compiler applies a set of logical rules to validate every proposed edge in the graph:
      </Wall>
      <div style={{ marginBottom: "18px" }}>
        <BulletItem label="Temporal Precedence">A cause must strictly precede its effect in the temporal dimension of the event unit.</BulletItem>
        <BulletItem label="Actor Consistency">Actions must align with the capabilities and known motivations of the involved actors, or the probability of that graph is penalized.</BulletItem>
        <BulletItem label="Interaction Logic">The "Action-Reaction" loop defined in §3.2 must maintain a coherent flow; a reaction cannot occur without a preceding action within the same minimum causal unit.</BulletItem>
      </div>

      <SubHeader title="4.5  Final State Synthesis" />
      <Wall>
        Through these constraints, the Narrative Compiler collapses the near-infinite possibilities of prose into a refined <Em>hash set</Em>. This set represents the "State" of the narrative — a weighted distribution of graphs that have survived the beam search and passed all causal filters.
      </Wall>

      {/* ── § 5 ─────────────────────────────────────────────────────── */}
      <SectionHeader num="5" title="The 24TAG Taxonomy" />
      <Wall>
        To ensure universal compatibility and deterministic hashing, the Narrative Quantification protocol defines a fixed schema of 24 structured tags
        <Cite href="/protocol/24tag-schema" label="24TAG" />. These tags are categorized into four primary layers, representing the essential dimensions of human narrative cognition.
      </Wall>

      <div
        style={{
          fontFamily: MONO,
          fontSize: "9px",
          color: "#3d5a72",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "10px",
        }}
      >
        Table 1 — The 24TAG Framework Definitions
      </div>
      <Tag24Table />

      <SubHeader title="5.1  Data Structure and Compilation" />
      <Wall>
        Each tag (T₀₁…T₂₄) is populated by the Narrative Compiler using the Beam Search and Causal Constraints defined in §4. The resulting data structure is a JSON object. As specified in the <Em>Crystallization Protocol</Em>
        <Cite href="/sdk/crystallization-engine" label="JCS-SDK" />, the{" "}
        <SH>state_hash</SH> is calculated by applying SHA-256 to the JCS-normalized string of these 24 tags.
      </Wall>

      <CodeBlock
        lang="JSON — Crystallized Narrative State"
        code={`{
  "T01": "Actor_A",
  "T02": "Actor_B",
  ...
  "T24": "Closure_Value",
  "state_hash": "6b86b273ff34fce19d6b804eff5a3f57..."  // EXCLUDED FROM INPUT
}`}
      />

      <div style={{ marginBottom: "18px" }}>
        <BulletItem label="Normalization (JCS)">
          Following <Em>RFC 8785</Em>
          <Cite href="/sdk/crystallization-engine" label="JCS-SDK" />, the Compiler sorts the 24 structured tags into a canonical JSON format. This ensures that variations in whitespace or key ordering do not affect the output.
        </BulletItem>
        <BulletItem label="Self-Referential Exclusion">
          <Em>The <IC>state_hash</IC> field itself is strictly excluded from the hash input.</Em> This prevents circular dependencies and ensures that the hash remains a pure representation of the underlying narrative data (TAG₀₁…T₂₄).
        </BulletItem>
        <BulletItem label="Hashing (SHA-256)">
          The Compiler applies the SHA-256 algorithm to the canonical byte-stream of the 24 tags.
        </BulletItem>
      </div>

      <Wall>The mathematical definition of the state is:</Wall>
      <MathBlock>
        {"state_hash = SHA256( JCS( { TAG₀₁…₂₄ } ∖ { state_hash } ) )"}
      </MathBlock>

      <SubHeader title="5.2  Integrity and Verification" />
      <Wall>
        By excluding the <SH>state_hash</SH>
        <Cite href="/sdk/crystallization-engine" label="JCS-SDK" /> from its own input, we create a <Em>One-Way Cognitive Seal</Em>. A receiver can verify the integrity of a narrative state by:
      </Wall>
      <div style={{ marginBottom: "18px" }}>
        <BulletItem label="Step 1">Temporarily removing the <IC>state_hash</IC> value from the received data.</BulletItem>
        <BulletItem label="Step 2">Re-running the JCS and SHA-256 process on the remaining 24 tags.</BulletItem>
        <BulletItem label="Step 3">Comparing the re-calculated hash with the original <IC>state_hash</IC> field.</BulletItem>
      </div>
      <Wall>
        Any <Em>divergence</Em> discovered during this verification process indicates that the narrative structure has been modified or corrupted post-compilation.
      </Wall>

      {/* ── § 6 ─────────────────────────────────────────────────────── */}
      <SectionHeader num="6" title="Narrative Observation and the Narrative Space" />
      <Wall>
        Once narratives are compiled into distributions of narrative states, we can formalize the landscape in which they exist.
        <Cite href="/whitepapers/narrative-observation" label="NARR-OBS" />
      </Wall>

      <SubHeader title="6.1  Defining Narrative Space" />
      <Wall>
        <Em>Narrative Space is defined as the multi-dimensional space formed by the set of possible narrative states.</Em> Each specific state is represented as a point within this space.
      </Wall>

      <SubHeader title="6.2  The Mathematical Foundation: Graph Embedding" />
      <Wall>
        To operationalize the Narrative Space, we must map the discrete, structural information of a Narrative Graph (G) into a continuous vector space. This is achieved through a <Em>Graph Embedding</Em> function, e:
      </Wall>
      <MathBlock>G → vector</MathBlock>
      <Wall>
        Specifically, each narrative graph G is projected into a d-dimensional real-valued space:
      </Wall>
      <MathBlock>e(G) ∈ ℝ^d</MathBlock>
      <Wall>
        This embedding ensures that the structural and causal logic of the narrative is preserved as a set of coordinates. By transforming graphs into vectors, we can apply rigorous geometric analysis to human interpretations.
      </Wall>

      <SubHeader title="6.3  Quantifying Divergence through Distance" />
      <Wall>
        In this vectorized Narrative Space, the similarity or conflict between two interpretations can be calculated using standard metric functions. The <Em>divergence</Em> between two narrative states, G₁ and G₂, is defined by the distance between their corresponding embeddings:
      </Wall>
      <MathBlock>distance = ‖ e(G₁) − e(G₂) ‖</MathBlock>
      <div style={{ marginBottom: "18px" }}>
        <BulletItem label="Low Distance (Convergence)">Indicates that the underlying narrative graphs are structurally and logically similar, reflecting a cognitive consensus.</BulletItem>
        <BulletItem label="High Distance (Divergence)">Indicates a fundamental split in the narrative tag structure
          <Cite href="/protocol/24tag-schema" label="24TAG" />, revealing competing interpretations or "Narrative Rifts."</BulletItem>
      </div>

      <SubHeader title="6.4  Mapping the Narrative Ecosystem" />
      <Wall>
        By observing the distribution and trajectory of these vectors e(G) within the Narrative Space
        <Cite href="/whitepapers/narrative-observation" label="NARR-OBS" />, researchers can identify:
      </Wall>
      <div style={{ marginBottom: "18px" }}>
        <BulletItem label="Attractors">Regions in ℝ^d where narrative vectors cluster, indicating dominant societal beliefs.</BulletItem>
        <BulletItem label="Bifurcation Points">Moments where a single event causes the distribution P(N | text) to split into two distant clusters in the vector space.</BulletItem>
        <BulletItem label="Narrative Velocity">The rate at which the vector e(G) moves through the space as new information is integrated, capturing the speed of societal change.</BulletItem>
      </div>

      {/* ── § 7 ─────────────────────────────────────────────────────── */}
      <SectionHeader num="7" title="Cognitive Infrastructure" />
      <Wall>
        If narrative data can be systematically compiled and structured, it functions as a foundational <Em>Cognitive Infrastructure</Em>. Unlike traditional data infrastructures that focus on the storage of raw facts, this new layer is designed to manage the <Em>structure of interpretation</Em>.
      </Wall>

      <SubHeader title="7.1  From Knowledge Bases to Narrative Databases" />
      <Wall>
        Traditional knowledge bases (e.g., Wikidata, Knowledge Graphs) are effective at storing "what" happened — discrete facts such as dates, locations, and actors. However, they lack the capacity to store "how" those facts are interpreted. A <Em>Narrative Database</Em>, powered by the Narrative Compiler, stores <Em>Crystallized Narrative States</Em>
        <Cite href="/sdk/crystallization-engine" label="JCS-SDK" />. It preserves not just the event, but the causal logic, emotional weight, and conflict dynamics as understood by a specific system at a specific time. This shifts the focus from "Data Storage" to "Cognitive State Storage."
      </Wall>

      <SubHeader title="7.2  Information Integrity and the State Hash" />
      <Wall>
        The deterministic nature of the <SH>state_hash</SH>
        <Cite href="/sdk/crystallization-engine" label="JCS-SDK" /> provides a revolutionary mechanism for <Em>Information Integrity</Em>.
      </Wall>
      <div style={{ marginBottom: "18px" }}>
        <BulletItem label="Proof of Interpretation">By attaching a state hash to a news report or an official statement, the author provides a "Cognitive Seal."</BulletItem>
        <BulletItem label="Divergence Detection">If two different media outlets report on the same event, their respective <IC>state_hash</IC> outputs can be compared instantly. Any divergence in the hash acts as an objective indicator that the underlying narrative structures differ, allowing for the mathematical mapping of bias or misinformation.</BulletItem>
      </div>

      <SubHeader title="7.3  Applications of the Infrastructure" />
      <Wall>This infrastructure supports a wide range of critical applications:</Wall>
      <div style={{ marginBottom: "18px" }}>
        <BulletItem label="Media & Information Integrity">Automated detection of narrative manipulation or divergent reporting.</BulletItem>
        <BulletItem label="Geopolitical Narrative Mapping">Real-time observation
          <Cite href="/whitepapers/narrative-observation" label="NARR-OBS" /> of how different nations or cultures interpret the same international event, identifying "Narrative Rifts" before they escalate into physical conflict.</BulletItem>
        <BulletItem label="Corporate & Economic Intelligence">Tracking the evolution of market narratives and investor sentiment through structured event formation.</BulletItem>
      </div>

      {/* ── § 8 ─────────────────────────────────────────────────────── */}
      <SectionHeader num="8" title="Reasoning over Narrative Distributions (LCM)" />
      <Wall>
        By defining a state as P(N | text), the <Em>Large Cognitive Model (LCM)</Em> gains the ability to perform "superpositional" reasoning.
      </Wall>

      <SubHeader title="8.1  Inference as Distribution Transformation" />
      <Wall>
        While LLMs predict tokens, the LCM performs inference by transforming one probability distribution into another. The reasoning core evaluates how the current distribution P(N_t | text_t) evolves into a future distribution {"P(N_{t+1})"} when a new event occurs.
      </Wall>

      <SubHeader title="8.2  Handling Ambiguity and Divergence" />
      <Wall>
        This probabilistic approach allows the LCM to handle <Em>Narrative Divergence</Em> natively. When a text is highly ambiguous, the Compiler produces a broad "hash set" with distributed probabilities. The LCM can track these multiple "possible worlds" simultaneously, collapsing them only when subsequent information makes one narrative significantly more probable.
      </Wall>

      <SubHeader title="8.3  Reasoning over Causal Trajectories" />
      <Wall>
        Because an event is defined as the <Em>minimum causal interaction unit</Em>, the LCM can track long-term narrative arcs without the "forgetting" or "hallucination" common in LLMs. Reasoning in an LCM is not a search for the next word, but a calculation of <Em>state transitions</Em>:
      </Wall>
      <MathBlock>
        State A (Hash₁) ──[Causal Logic]──→ State B (Hash₂)
      </MathBlock>
      <Wall>
        This allows the model to identify logical inconsistencies — where a proposed "next event" is mathematically distant from the current state in the Narrative Space
        <Cite href="/whitepapers/narrative-observation" label="NARR-OBS" />.
      </Wall>

      {/* ── § 9 ─────────────────────────────────────────────────────── */}
      <SectionHeader num="9" title="Human Memory and Narrative Cognition" />
      <Wall>
        Human memory does not function as a raw sensory log; rather, it operates through a sophisticated process of <Em>narrative compression</Em>. This section explores how the Narrative Quantification framework mirrors the biological reality of human cognition.
      </Wall>

      <SubHeader title="9.1  Memory as a Compiled Distribution" />
      <Wall>
        When humans experience an event, the brain does not store every frame of visual or auditory data. Instead, it acts as a biological <Em>Narrative Compiler</Em>, transforming continuous experience into a discrete set of structured narrative units.
      </Wall>
      <Wall>
        In the context of our framework, human memory can be viewed as the storage of the probability distribution:
      </Wall>
      <MathBlock>P(N | Experience)</MathBlock>
      <Wall>
        What we "remember" is not the raw text of reality, but the <Em>hash set</Em> of the most probable narrative structures. This explains why human memory is reconstructive; "recalling" a memory is effectively a process of <Em>re-compiling</Em> the stored distribution back into a coherent story.
      </Wall>

      <SubHeader title="9.2  The Primitives of Biological Storage" />
      <Wall>
        To achieve efficient storage, the human cognitive system captures only the essential semantic primitives:
      </Wall>
      <div style={{ marginBottom: "18px" }}>
        <BulletItem label="Key Actors">Identifying who was involved.</BulletItem>
        <BulletItem label="Causal Interpretations">Assigning a "why" to the sequence of events.</BulletItem>
        <BulletItem label="Emotional Evaluation">Tagging the event with a valence that determines its priority in the Narrative Space.</BulletItem>
        <BulletItem label="Outcomes">The final state after the interaction is resolved.</BulletItem>
      </div>

      <SubHeader title="9.3  Biomimetic Validation" />
      <Wall>
        The approach of Narrative Quantification is fundamentally <Em>biomimetic</Em>. By using the{" "}
        <SH>state_hash</SH>
        <Cite href="/sdk/crystallization-engine" label="JCS-SDK" /> to represent a "crystallized" interpretation, we emulate the way human synapses consolidate complex experiences into stable, retrievable "concepts."
      </Wall>
      <Wall>
        Just as a Narrative Compiler identifies <Em>divergence</Em> in hashes, human cognitive dissonance occurs when a new experience generates a narrative state that is mathematically distant from our existing "memory manifold." Our intelligence grows by constantly updating these distributions to minimize the surprise (entropy) of the world.
      </Wall>

      {/* ── § 10 ────────────────────────────────────────────────────── */}
      <SectionHeader num="10" title="Limitations" />
      <Wall>
        While the framework of Narrative Quantification offers a revolutionary path toward structured cognitive reasoning, several significant limitations must be addressed to ensure its scientific validity and ethical implementation.
      </Wall>

      <SubHeader title="10.1  Subjectivity and Algorithmic Bias" />
      <Wall>
        The primary challenge in narrative quantification is the inherent subjectivity of human interpretation. While the Narrative Compiler calculates a probability distribution P(N | text), the "priors" used to assign these probabilities are often derived from the training data of the underlying models. This can introduce systemic biases, where the compiler favors Western-centric causal logic or specific cultural tropes, leading to a{" "}
        <SH>state_hash</SH>
        <Cite href="/sdk/crystallization-engine" label="JCS-SDK" /> that reflects a biased "crystallization" of reality.
      </Wall>

      <SubHeader title="10.2  Computational Complexity of Graph Generation" />
      <Wall>
        Constructing <Em>possible narrative graphs</Em> is a non-trivial computational task. In complex, multi-actor texts, the number of potential causal connections grows exponentially. Managing the trade-off between the granularity of event extraction and the computational cost of maintaining a high-fidelity{" "}
        <Em>hash set</Em> remains a significant hurdle for real-time applications.
      </Wall>

      <SubHeader title="10.3  Cultural and Linguistic Heterogeneity" />
      <Wall>
        Narrative structures are not universal. Different cultures employ different storytelling archetypes — such as the circular narratives found in some Eastern philosophies versus the linear, conflict-driven arcs prevalent in Western traditions. A{" "}
        <Em>24TAG framework</Em>
        <Cite href="/protocol/24tag-schema" label="24TAG" /> optimized for one may fail to capture the nuances of the other, resulting in a high degree of <Em>divergence</Em> that is cultural rather than factual.
      </Wall>

      <SubHeader title="10.4  Data Sovereignty and 'Narrative Warfare'" />
      <Wall>
        As we build <Em>Cognitive Infrastructure</Em>, the question of who controls the <Em>Narrative Databases</Em> becomes paramount. If a centralized authority can define the "standard"{" "}
        <SH>state_hash</SH>
        <Cite href="/sdk/crystallization-engine" label="JCS-SDK" /> for a global event, they possess the power to delegitimize divergent but valid interpretations. The risk of using this infrastructure for "narrative warfare" — mathematically suppressing opposing viewpoints by labeling them as "divergent noise" — is a serious ethical concern.
      </Wall>

      <SubHeader title="10.5  Semantic Loss during Compression" />
      <Wall>
        Narrative compression is an active entropy reduction process. By definition, some information must be discarded to reach a crystallized state. There is a persistent risk that subtle but crucial "soft" data — such as irony, subtext, or poetic ambiguity — may be lost during the transition from raw text to a structured{" "}
        <SH>state_hash</SH>.
      </Wall>

      {/* ── § 11 ────────────────────────────────────────────────────── */}
      <SectionHeader num="11" title="Conclusion" />
      <Wall>
        Despite these limitations, Narrative Quantification represents a necessary evolution in Artificial Intelligence. By moving beyond the probabilistic prediction of language tokens and toward the{" "}
        <Em>structured reasoning of narrative states</Em>, we provide a framework that more closely mirrors human cognition.
      </Wall>
      <Wall>
        The transition from <Em>Narrative Structures to Large Cognitive Models (LCM)</Em> offers more than just technical efficiency; it provides a way to map the "Narrative Space" of our society, making the invisible structures of our interpretations visible, measurable, and verifiable. Future research will focus on mitigating bias through diverse "compiler ensembles" and exploring the decentralized governance of narrative hashes to ensure that this cognitive infrastructure serves as a tool for clarity, not control.
      </Wall>
      <Wall>
        The path toward <Em>Artificial General Intelligence (AGI)</Em> lies not in bigger models, but in deeper structures. Narrative Quantification is the first step in building an AI that doesn't just talk like a human, but understands like one.
      </Wall>

      {/* closing seal */}
      <div
        style={{
          marginTop: "48px",
          paddingTop: "20px",
          borderTop: "1px solid #1a2530",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <div style={{ fontFamily: MONO, fontSize: "9px", color: "#3d5a72", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
            Cross-References
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {[
              { href: "/protocol/24tag-schema",              label: "24TAG Schema Specification" },
              { href: "/sdk/crystallization-engine",         label: "JCS SDK — Crystallization Engine" },
              { href: "/whitepapers/narrative-observation",  label: "Narrative Observation" },
              { href: "/protocol/mathematical-standardization", label: "Mathematical Standardization" },
              { href: "/whitepapers",                        label: "Whitepapers Archive" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                style={{
                  fontFamily: MONO,
                  fontSize: "9px",
                  color: "#38bdf8",
                  textDecoration: "none",
                  letterSpacing: "0.03em",
                  opacity: 0.75,
                }}
              >
                ↗ {label}
              </Link>
            ))}
          </div>
        </div>
        <div style={{ fontFamily: MONO, fontSize: "9px", color: "#1e3040", letterSpacing: "0.08em", textAlign: "right" }}>
          AIIE-WP-001 · end of document
        </div>
      </div>
    </DocPage>
  );
}