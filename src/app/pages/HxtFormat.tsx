import { DocHeader } from "../components/DocHeader";
import {
  DocPage,
  Section,
  SectionTitle,
  SubsectionTitle,
  Body,
  BulletList,
  CodeBlock,
  InlineCode,
  InfoBox,
} from "../components/DocPage";

/* ── Sample file content ─────────────────────────────────────────────── */

const SAMPLE_HXT = `# Q3 Business Review

This quarter we achieved significant milestones in our core product lines.
Initial market response has been positive, with user retention up 18% YoY.

Key findings:
- Revenue exceeded projections by 12%
- Customer acquisition cost decreased by 8%
- NPS score improved from 42 to 61

<!--hxt:begin-->
{
  "hxt_version": "0.1.0",
  "genesis": "2026-04-01T09:00:00Z",
  "ledger": [
    { "t": 1743498000, "type": "AI",    "delta": 512,  "hash": "a1b2c3d4e5f6a7b8" },
    { "t": 1743498600, "type": "HUMAN", "delta": -80,  "hash": "d4e5f6g7h8i9j0k1" },
    { "t": 1743499200, "type": "HUMAN", "delta": 44,   "hash": "g7h8i9j0k1l2m3n4" }
  ],
  "final_seal": {
    "sealed_at": "2026-04-01T10:30:00Z",
    "human_touch": 0.227,
    "state_hash": "sha256:3a5b7c9d1e2f4a6b8c0d2e4f6a8b0c2d3e4f5a6b",
    "step_count": 3
  }
}
<!--hxt:end-->`;

const JS_CRYSTALLIZE = `import { crystallize, inspect, verify } from "hxt.js";

// First save — genesis
const saved = await crystallize(documentText, "auto", null, {
  prevLength: 0,
  elapsedMs: 9999
});

// Subsequent save — chains to previous ledger
const parsed   = inspect(saved);
const updated  = await crystallize(newText, "auto", parsed.ledger, {
  prevLength: parsed.bodyText.length,
  elapsedMs:  45000
});`;

const PY_VERIFY = `from hxt import verify, summary

with open("document.hxt", "r") as f:
    content = f.read()

result = verify(content)
# { "valid": True, "status": "ok", "human_touch": 0.71, ... }

info = summary(content)
# { "label": "Sincere", "step_count": 7, "ai_steps": 1, "human_steps": 6 }`;

const PY_CLI = `# Verify integrity from the command line
python hxt.py verify my-document.hxt

# Summarize authorship
python hxt.py summary my-document.hxt`;

const HUMAN_TOUCH_ROWS = [
  { range: "0.70 – 1.00", label: "Sincere",       desc: "Predominantly human-authored. Significant editorial investment." },
  { range: "0.40 – 0.69", label: "Assisted",       desc: "Balanced AI + human collaboration with meaningful revision." },
  { range: "0.10 – 0.39", label: "AI-heavy",       desc: "AI-generated base with limited human refinement." },
  { range: "0.00 – 0.09", label: "AI-generated",   desc: "Minimal human intervention detected." },
];

const MONO = "'JetBrains Mono', monospace";

export function HxtFormat() {
  return (
    <DocPage>
      <DocHeader
        title=".hxt File Format Specification"
        subtitle="An open standard for tamper-evident authorship ledgers embedded in Markdown documents."
        canonicalHash="hxt-spec-v0.1.0"
        status="Draft"
        version="v0.1.0"
        author="Gemmina Intelligence LLC · HEXT AI"
        compliance="SHA-256 · ISO 8601 · MIT License"
        docId="HEXT-SPEC-001"
      />

      {/* ── § 1 What is .hxt ────────────────────────────────────────── */}
      <Section num="1.0">
        <SectionTitle>What is .hxt?</SectionTitle>
        <Body>
          <InlineCode>.hxt</InlineCode> is an open file format that embeds a{" "}
          <strong style={{ fontFamily: MONO, fontWeight: 600, color: "#c8d4e0" }}>
            tamper-evident authorship ledger
          </strong>{" "}
          into any Markdown document. It answers one question:
        </Body>
        <InfoBox accent>
          "Was this written by a human who thought, or an AI that generated?"
        </InfoBox>
        <Body>
          A <InlineCode>.hxt</InlineCode> file is 100% valid Markdown. The ledger lives in
          an HTML comment block at the end of the file — invisible to readers, verifiable
          by machines. No content is stored in the ledger: only timestamps, character
          deltas, and cryptographic hashes.
        </Body>
      </Section>

      {/* ── § 2 Core Design Principles ──────────────────────────────── */}
      <Section num="2.0">
        <SectionTitle>Core Design Principles</SectionTitle>
        <BulletList
          items={[
            { label: "Minimal payload",      content: "Only 3 things are recorded — genesis timestamp, edit ledger, and final seal. No content is duplicated." },
            { label: "No content storage",   content: "The ledger stores hashes and metadata only. The actual text is never retained in the ledger." },
            { label: "Tamper-evident",       content: "Each step chains to the previous via SHA-256. Any modification to the document body breaks the final seal." },
            { label: "Privacy-first",        content: "No user identity, no IP address, no file path. Only timestamps, deltas, and fingerprints." },
            { label: "Platform-agnostic",    content: "Works in any editor that saves Markdown files. Chrome Extension, Obsidian, VS Code, or plain text editors." },
          ]}
        />
      </Section>

      {/* ── § 3 File Structure ──────────────────────────────────────── */}
      <Section num="3.0">
        <SectionTitle>File Structure</SectionTitle>
        <Body>
          The <InlineCode>.hxt</InlineCode> ledger is appended at the end of any Markdown
          document between two required markers. Everything between the markers must be
          valid JSON.
        </Body>
        <CodeBlock lang="Markdown — .hxt canonical structure">{`[Standard Markdown content]

<!--hxt:begin-->
{
  "hxt_version": "0.1.0",
  "genesis":     "<ISO 8601 UTC>",
  "ledger":      [ <Step>, <Step>, ... ],
  "final_seal":  { <Seal> }
}
<!--hxt:end-->`}</CodeBlock>

        <Body>
          The markers <InlineCode>{"<!--hxt:begin-->"}</InlineCode> and{" "}
          <InlineCode>{"<!--hxt:end-->"}</InlineCode> are required. Content above{" "}
          <InlineCode>{"<!--hxt:begin-->"}</InlineCode> is treated as the document body
          and is the target of all integrity checks.
        </Body>
      </Section>

      {/* ── § 4 Data Schema ─────────────────────────────────────────── */}
      <Section num="4.0">
        <SectionTitle>Data Schema</SectionTitle>

        <SubsectionTitle>4.1  Root Object</SubsectionTitle>

        {/* Root schema table */}
        <div style={{ border: "1px solid #1a2530", overflow: "hidden", marginBottom: "24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "160px 80px 60px 1fr", borderBottom: "1px solid #1a2530", background: "#080c10" }}>
            {["Field", "Type", "Req.", "Description"].map((h) => (
              <div key={h} style={{ padding: "8px 14px", fontFamily: MONO, fontSize: "8px", color: "#2d4455", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
                {h}
              </div>
            ))}
          </div>
          {[
            { f: "hxt_version", t: "string",  r: "✅", d: "Spec version (semver). Current: \"0.1.0\"." },
            { f: "genesis",     t: "string",  r: "✅", d: "ISO 8601 UTC timestamp of first save." },
            { f: "ledger",      t: "Step[]",  r: "✅", d: "Ordered array of edit steps, one per save event." },
            { f: "final_seal",  t: "Seal",    r: "✅", d: "Integrity record of the last save." },
          ].map((row, i, arr) => (
            <div key={row.f} style={{ display: "grid", gridTemplateColumns: "160px 80px 60px 1fr", borderBottom: i < arr.length - 1 ? "1px solid #0d1a24" : "none" }}>
              <div style={{ padding: "8px 14px", fontFamily: MONO, fontSize: "10px", color: "#38bdf8" }}>{row.f}</div>
              <div style={{ padding: "8px 14px", fontFamily: MONO, fontSize: "10px", color: "#3d5a72" }}>{row.t}</div>
              <div style={{ padding: "8px 14px", fontFamily: MONO, fontSize: "10px", color: "#5a7a8e" }}>{row.r}</div>
              <div style={{ padding: "8px 14px", fontFamily: MONO, fontSize: "10px", color: "#5a7a8e", lineHeight: 1.65 }}>{row.d}</div>
            </div>
          ))}
        </div>

        <SubsectionTitle>4.2  Step Object</SubsectionTitle>
        <Body>
          One step is recorded per save event. Steps are append-only and ordered chronologically.
        </Body>

        <div style={{ border: "1px solid #1a2530", overflow: "hidden", marginBottom: "24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "80px 80px 60px 1fr", borderBottom: "1px solid #1a2530", background: "#080c10" }}>
            {["Field", "Type", "Req.", "Description"].map((h) => (
              <div key={h} style={{ padding: "8px 14px", fontFamily: MONO, fontSize: "8px", color: "#2d4455", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
                {h}
              </div>
            ))}
          </div>
          {[
            { f: "t",     t: "number", r: "✅", d: "Unix timestamp in seconds (UTC)." },
            { f: "type",  t: "string", r: "✅", d: "\"AI\" or \"HUMAN\" — authorship classification for this step." },
            { f: "delta", t: "number", r: "✅", d: "Character count change. Positive = added, negative = removed." },
            { f: "hash",  t: "string", r: "✅", d: "SHA-256 of the full document body at this step (first 16 hex chars)." },
          ].map((row, i, arr) => (
            <div key={row.f} style={{ display: "grid", gridTemplateColumns: "80px 80px 60px 1fr", borderBottom: i < arr.length - 1 ? "1px solid #0d1a24" : "none" }}>
              <div style={{ padding: "8px 14px", fontFamily: MONO, fontSize: "10px", color: "#38bdf8" }}>{row.f}</div>
              <div style={{ padding: "8px 14px", fontFamily: MONO, fontSize: "10px", color: "#3d5a72" }}>{row.t}</div>
              <div style={{ padding: "8px 14px", fontFamily: MONO, fontSize: "10px", color: "#5a7a8e" }}>{row.r}</div>
              <div style={{ padding: "8px 14px", fontFamily: MONO, fontSize: "10px", color: "#5a7a8e", lineHeight: 1.65 }}>{row.d}</div>
            </div>
          ))}
        </div>

        <Body>
          <strong style={{ fontFamily: MONO, fontWeight: 600, color: "#c8d4e0" }}>Type classification rules:</strong>
        </Body>
        <BulletList
          items={[
            { label: "AI",    content: "More than 500 characters added in under 2 seconds. Bulk paste or generation detected." },
            { label: "HUMAN", content: "Gradual edits over time, or explicit AI-assist rejection. Fine-grained keystroke editing." },
          ]}
        />

        <SubsectionTitle>4.3  Seal Object</SubsectionTitle>

        <div style={{ border: "1px solid #1a2530", overflow: "hidden", marginBottom: "24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "160px 80px 60px 1fr", borderBottom: "1px solid #1a2530", background: "#080c10" }}>
            {["Field", "Type", "Req.", "Description"].map((h) => (
              <div key={h} style={{ padding: "8px 14px", fontFamily: MONO, fontSize: "8px", color: "#2d4455", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
                {h}
              </div>
            ))}
          </div>
          {[
            { f: "sealed_at",   t: "string", r: "✅", d: "ISO 8601 UTC timestamp of the last save." },
            { f: "human_touch", t: "number", r: "✅", d: "Ratio of HUMAN steps weighted by |delta|. Range: 0.0 – 1.0." },
            { f: "state_hash",  t: "string", r: "✅", d: "sha256: + full SHA-256 of document body at sealing time." },
            { f: "step_count",  t: "number", r: "✅", d: "Must equal ledger.length. Mismatch = malformed." },
          ].map((row, i, arr) => (
            <div key={row.f} style={{ display: "grid", gridTemplateColumns: "160px 80px 60px 1fr", borderBottom: i < arr.length - 1 ? "1px solid #0d1a24" : "none" }}>
              <div style={{ padding: "8px 14px", fontFamily: MONO, fontSize: "10px", color: "#38bdf8" }}>{row.f}</div>
              <div style={{ padding: "8px 14px", fontFamily: MONO, fontSize: "10px", color: "#3d5a72" }}>{row.t}</div>
              <div style={{ padding: "8px 14px", fontFamily: MONO, fontSize: "10px", color: "#5a7a8e" }}>{row.r}</div>
              <div style={{ padding: "8px 14px", fontFamily: MONO, fontSize: "10px", color: "#5a7a8e", lineHeight: 1.65 }}>{row.d}</div>
            </div>
          ))}
        </div>

        <Body>
          <strong style={{ fontFamily: MONO, fontWeight: 600, color: "#c8d4e0" }}>human_touch formula:</strong>
        </Body>
        <CodeBlock lang="Formula">{`human_delta = Σ |delta| for all HUMAN steps
total_delta  = Σ |delta| for all steps

human_touch  = human_delta / total_delta   (0.0 if total_delta = 0)`}</CodeBlock>

        <SubsectionTitle>4.4  Human Touch Labels</SubsectionTitle>

        <div style={{ border: "1px solid #1a2530", overflow: "hidden", marginBottom: "8px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "140px 120px 1fr", borderBottom: "1px solid #1a2530", background: "#080c10" }}>
            {["Range", "Label", "Interpretation"].map((h) => (
              <div key={h} style={{ padding: "8px 14px", fontFamily: MONO, fontSize: "8px", color: "#2d4455", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
                {h}
              </div>
            ))}
          </div>
          {HUMAN_TOUCH_ROWS.map((row, i, arr) => (
            <div key={row.label} style={{ display: "grid", gridTemplateColumns: "140px 120px 1fr", borderBottom: i < arr.length - 1 ? "1px solid #0d1a24" : "none" }}>
              <div style={{ padding: "8px 14px", fontFamily: MONO, fontSize: "10px", color: "#4a8fa8" }}>{row.range}</div>
              <div style={{ padding: "8px 14px", fontFamily: MONO, fontSize: "10px", color: "#c8d4e0" }}>{row.label}</div>
              <div style={{ padding: "8px 14px", fontFamily: MONO, fontSize: "10px", color: "#5a7a8e", lineHeight: 1.65 }}>{row.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── § 5 Canonical Example ───────────────────────────────────── */}
      <Section num="5.0">
        <SectionTitle>Canonical Example</SectionTitle>
        <Body>
          A complete <InlineCode>.hxt</InlineCode> file with 3 steps: one AI generation followed
          by two human edits. The document body above the marker is the target of{" "}
          <InlineCode>final_seal.state_hash</InlineCode>.
        </Body>
        <CodeBlock lang=".hxt — Canonical example">{SAMPLE_HXT}</CodeBlock>
      </Section>

      {/* ── § 6 Reference Implementations ──────────────────────────── */}
      <Section num="6.0">
        <SectionTitle>Reference Implementations</SectionTitle>
        <Body>
          Two reference implementations are provided. Both are zero-dependency and run in
          their respective native environments. ESM and CommonJS exports are both supported
          in <InlineCode>hxt.js</InlineCode>.
        </Body>

        <SubsectionTitle>6.1  JavaScript / TypeScript (hxt.js)</SubsectionTitle>
        <Body>
          Runs in Node.js and modern browsers (Chrome Extensions, Obsidian plugins, VS Code
          extensions). Uses <InlineCode>crypto.subtle</InlineCode> in browser environments
          and Node's <InlineCode>crypto</InlineCode> module in server environments.
        </Body>
        <CodeBlock lang="JavaScript — hxt.js">{JS_CRYSTALLIZE}</CodeBlock>

        <SubsectionTitle>6.2  Python (hxt.py)</SubsectionTitle>
        <Body>
          Python 3.8+ with zero external dependencies. Includes a CLI for verification and
          summary from the command line.
        </Body>
        <CodeBlock lang="Python — verify and summary">{PY_VERIFY}</CodeBlock>
        <CodeBlock lang="CLI">{PY_CLI}</CodeBlock>

        <SubsectionTitle>6.3  Implementation Roadmap</SubsectionTitle>

        <div style={{ border: "1px solid #1a2530", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 120px", borderBottom: "1px solid #1a2530", background: "#080c10" }}>
            {["Platform", "Notes", "Status"].map((h) => (
              <div key={h} style={{ padding: "8px 14px", fontFamily: MONO, fontSize: "8px", color: "#2d4455", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
                {h}
              </div>
            ))}
          </div>
          {[
            { p: "JavaScript / Browser", n: "Chrome Extension, Obsidian, VS Code",      s: "Completed",      },
            { p: "Python 3.8+",          n: "CLI + library. pip install planned.",        s: "Completed",      },
            { p: "Chrome Extension",     n: "Doc Scanner integration via hxt.js",        s: "In Development", },
            { p: "Obsidian Plugin",      n: "Auto-crystallize on save",                  s: "Planned",        },
            { p: "VS Code Extension",    n: "Status bar Human Touch indicator",          s: "Planned",        },
          ].map((row, i, arr) => (
            <div key={row.p} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 120px", borderBottom: i < arr.length - 1 ? "1px solid #0d1a24" : "none", alignItems: "center" }}>
              <div style={{ padding: "10px 14px", fontFamily: MONO, fontSize: "10px", color: "#5a9ab8" }}>{row.p}</div>
              <div style={{ padding: "10px 14px", fontFamily: MONO, fontSize: "10px", color: "#4a6070" }}>{row.n}</div>
              <div style={{ padding: "10px 14px" }}>
                <span style={{
                  fontFamily: MONO, fontSize: "9px",
                  color: row.s === "Completed" ? "#38bdf8" : row.s === "In Development" ? "#7aafb8" : "#3d5a72",
                  border: `1px solid ${row.s === "Completed" ? "rgba(56,189,248,0.4)" : row.s === "In Development" ? "rgba(122,175,184,0.3)" : "#1a2530"}`,
                  padding: "2px 6px", letterSpacing: "0.06em", textTransform: "uppercase" as const,
                }}>
                  {row.s}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── § 7 Verification Protocol ───────────────────────────────── */}
      <Section num="7.0">
        <SectionTitle>Verification Protocol</SectionTitle>
        <Body>
          A <InlineCode>.hxt</InlineCode> file is <strong style={{ fontFamily: MONO, fontWeight: 600, color: "#c8d4e0" }}>valid</strong> if
          all of the following conditions hold:
        </Body>
        <BulletList
          items={[
            { label: "Rule 1", content: "The JSON between markers parses without error." },
            { label: "Rule 2", content: "hxt_version is present and follows semver." },
            { label: "Rule 3", content: "genesis is a valid ISO 8601 UTC string." },
            { label: "Rule 4", content: "ledger is a non-empty array of valid Step objects." },
            { label: "Rule 5", content: "final_seal.state_hash matches SHA-256 of the document body above <!--hxt:begin-->." },
            { label: "Rule 6", content: "final_seal.step_count equals ledger.length." },
          ]}
        />
        <InfoBox accent>
          A file that fails Rule 5 is <strong style={{ fontFamily: MONO, color: "#ff6b6b" }}>TAMPERED</strong>.
          A file that fails Rules 1–4 or 6 is <strong style={{ fontFamily: MONO, color: "#ffb74d" }}>MALFORMED</strong>.
          Both conditions are surfaced by <InlineCode>verify()</InlineCode> with a machine-readable status field.
        </InfoBox>
      </Section>

      {/* ── § 8 Repository ──────────────────────────────────────────── */}
      <Section num="8.0">
        <SectionTitle>Repository &amp; License</SectionTitle>
        <Body>
          The canonical specification and reference implementations are maintained in the{" "}
          <InlineCode>hextai/hxt-spec</InlineCode> repository under the MIT License.
          The format is open — any editor, plugin, or service may implement{" "}
          <InlineCode>.hxt</InlineCode> readers and writers. Implementations should link
          to this specification.
        </Body>
        <BulletList
          items={[
            { label: "SPEC.md",  content: "Canonical format definition (this document's source)." },
            { label: "hxt.js",   content: "JavaScript reference implementation. ESM + CJS." },
            { label: "hxt.py",   content: "Python reference implementation. CLI included." },
            { label: "examples/", content: "sample.hxt — annotated canonical example." },
          ]}
        />
        <InfoBox>
          MIT License © Gemmina Intelligence LLC · hextai.com
        </InfoBox>
      </Section>
    </DocPage>
  );
}
