import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DocHeader } from "../components/DocHeader";
import { DocPage } from "../components/DocPage";

import rfc0015 from "../../../specs/rfc/RFC-0015-AIIE-JCS-Canonical-Hashing.md?raw";
import rfc0016 from "../../../specs/rfc/RFC-0016-AIIE-Continuous-Narrative-Dynamics.md?raw";
import rfc0017 from "../../../specs/rfc/RFC-0017-AIIE-LINK-Relational-Laws.md?raw";
import rfc0018 from "../../../specs/rfc/RFC-0018-AIIE-CFI-Semantic-Distance.md?raw";
import rfc0019 from "../../../specs/rfc/RFC-0019-AIIE-TAGNL-Compiler.md?raw";
import rfc0020 from "../../../specs/rfc/RFC-0020-AIIE-Evidence-Autonomous-Knowledge-Field.md?raw";
import rfc0021 from "../../../specs/rfc/RFC-0021-AIIE-EGEM-Energy-Minimization.md?raw";
import rfc0022 from "../../../specs/rfc/RFC-0022-AIIE-CDR-Consistency-Detection-Repair.md?raw";
import rfc0023 from "../../../specs/rfc/RFC-0023-AIIE-Pi-Projection-Operator.md?raw";
import rfc0024 from "../../../specs/rfc/RFC-0024-AIIE-Valency-Probabilistic-Slot-Constraints.md?raw";
import rfc0025 from "../../../specs/rfc/RFC-0025-AIIE-Error-Handling-Meta-Diagnostics.md?raw";
import rfc0026 from "../../../specs/rfc/RFC-0026-AIIE-Projection-Operator-Pi.md?raw";
import rfc0027 from "../../../specs/rfc/RFC-0027-AIIE-Proto-Structure-Learning.md?raw";
import rfc0028 from "../../../specs/rfc/RFC-0028-AIIE-LoRA-Lens-Adaptive-Calibration.md?raw";
import rfc0029 from "../../../specs/rfc/RFC-0029-AIIE-Movement-Algebra.md?raw";
import rfc0030 from "../../../specs/rfc/RFC-0030-AIIE-Semantic-Groupoid-Theory.md?raw";
import rfc0031 from "../../../specs/rfc/RFC-0031-AIIE-Information-Geometry-CFI-Space.md?raw";

const MONO = "'JetBrains Mono', monospace";

type RFCMarkdownPageProps = {
  docId: string;
  title: string;
  status: string;
  version: string;
  compliance: string;
  content: string;
};

function RFCMarkdownPage({ docId, title, status, version, compliance, content }: RFCMarkdownPageProps) {
  return (
    <DocPage>
      <DocHeader
        docId={docId}
        title={title}
        subtitle="Rendered from the canonical Markdown specification in specs/rfc."
        status={status}
        version={version}
        author="Gemmina Intelligence LLC. — Pure Information Laboratory"
        compliance={compliance}
      />
      <div
        style={{
          border: "1px solid #1a2530",
          background: "#070a0d",
          padding: "28px",
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 style={{ fontFamily: MONO, fontSize: "20px", color: "#ffffff", lineHeight: 1.4, margin: "0 0 20px" }}>
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 style={{ fontFamily: MONO, fontSize: "15px", color: "#ffffff", borderBottom: "1px solid #1a2530", paddingBottom: "10px", margin: "34px 0 16px" }}>
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 style={{ fontFamily: MONO, fontSize: "12px", color: "#c8d4e0", margin: "24px 0 10px" }}>
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 style={{ fontFamily: MONO, fontSize: "11px", color: "#9fc1d6", margin: "20px 0 8px" }}>
                {children}
              </h4>
            ),
            p: ({ children }) => (
              <p style={{ fontFamily: MONO, fontSize: "12px", color: "#7a8f9e", lineHeight: 1.9, margin: "0 0 16px" }}>
                {children}
              </p>
            ),
            a: ({ children, href }) => (
              <a href={href} style={{ color: "#38bdf8", textDecoration: "none" }} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                {children}
              </a>
            ),
            ul: ({ children }) => (
              <ul style={{ fontFamily: MONO, fontSize: "12px", color: "#7a8f9e", lineHeight: 1.8, paddingLeft: "22px", margin: "0 0 16px" }}>
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol style={{ fontFamily: MONO, fontSize: "12px", color: "#7a8f9e", lineHeight: 1.8, paddingLeft: "22px", margin: "0 0 16px" }}>
                {children}
              </ol>
            ),
            li: ({ children }) => <li style={{ marginBottom: "6px" }}>{children}</li>,
            blockquote: ({ children }) => (
              <blockquote style={{ borderLeft: "2px solid #38bdf8", margin: "18px 0", padding: "10px 16px", background: "rgba(56,189,248,0.04)" }}>
                {children}
              </blockquote>
            ),
            table: ({ children }) => (
              <div style={{ overflowX: "auto", margin: "18px 0" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: MONO, fontSize: "11px", color: "#7a8f9e" }}>
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th style={{ border: "1px solid #1a2530", padding: "8px 10px", color: "#c8d4e0", background: "#0a1018", textAlign: "left" }}>
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td style={{ border: "1px solid #1a2530", padding: "8px 10px", verticalAlign: "top" }}>
                {children}
              </td>
            ),
            code: ({ children, className }) => {
              const isBlock = Boolean(className);
              if (!isBlock) {
                return (
                  <code style={{ fontFamily: MONO, fontSize: "11px", color: "#4a8fa8", background: "#0a1018", padding: "1px 5px", border: "1px solid #1a2530" }}>
                    {children}
                  </code>
                );
              }
              return <code className={className}>{children}</code>;
            },
            pre: ({ children }) => (
              <pre style={{ fontFamily: MONO, fontSize: "11px", color: "#5a9ab8", lineHeight: 1.7, background: "#050810", border: "1px solid #1a2530", padding: "18px", overflowX: "auto", margin: "20px 0" }}>
                {children}
              </pre>
            ),
            hr: () => <div style={{ height: "1px", background: "#1a2530", margin: "28px 0" }} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </DocPage>
  );
}

export function RFC0015() {
  return <RFCMarkdownPage docId="RFC-0015" title="JSON Canonicalization for Physical State Hashing" status="RATIFIED" version="2026-04-15" compliance="RFC 8785 · RFC-0001 · RFC-0006" content={rfc0015} />;
}

export function RFC0016() {
  return <RFCMarkdownPage docId="RFC-0016" title="Continuous Narrative Dynamics and Worldline Optimization" status="RATIFIED" version="2026-04-22" compliance="RFC-0001 · RFC-0008 · RFC-0009 · RFC-0013" content={rfc0016} />;
}

export function RFC0017() {
  return <RFCMarkdownPage docId="RFC-0017" title="LINK+ — Relational Laws and Causal Constraints" status="RATIFIED" version="2026-04-22" compliance="RFC-0016 · RFC-0024" content={rfc0017} />;
}

export function RFC0018() {
  return <RFCMarkdownPage docId="RFC-0018" title="CFI — Semantic Distance and Topological Curvature" status="RATIFIED" version="2026-04-22" compliance="RFC-0016 · RFC-0017 · RFC-0024 · RFC-0022" content={rfc0018} />;
}

export function RFC0019() {
  return <RFCMarkdownPage docId="RFC-0019" title="TAG↔NL Compiler — Semantic Reconstruction Engine" status="RATIFIED" version="2026-04-22" compliance="RFC-0016 · RFC-0017 · RFC-0018" content={rfc0019} />;
}

export function RFC0020() {
  return <RFCMarkdownPage docId="RFC-0020" title="Evidence — Autonomous Knowledge Field" status="RATIFIED" version="2026-05-04" compliance="RFC-0018 · RFC-0022 · RFC-0024" content={rfc0020} />;
}

export function RFC0021() {
  return <RFCMarkdownPage docId="RFC-0021" title="EGEM — Evidence-Guided Energy Minimization" status="RATIFIED" version="2026-05-04" compliance="RFC-0018 · RFC-0020 · RFC-0024" content={rfc0021} />;
}

export function RFC0022() {
  return <RFCMarkdownPage docId="RFC-0022" title="CDR — Consistency Detection & Repair Dynamics" status="RATIFIED" version="2026-05-04" compliance="RFC-0018 · RFC-0020 · RFC-0021 · RFC-0023 · RFC-0024" content={rfc0022} />;
}

export function RFC0023() {
  return <RFCMarkdownPage docId="RFC-0023" title="Π — Deterministic Projection from Proto-Structure to TAG Graph" status="RATIFIED" version="2026-05-04" compliance="RFC-0016 · RFC-0017 · RFC-0024" content={rfc0023} />;
}

export function RFC0024() {
  return <RFCMarkdownPage docId="RFC-0024" title="Valency — Probabilistic Slot Constraints from Evidence" status="RATIFIED" version="2026-05-04" compliance="RFC-0016 · RFC-0017 · RFC-0023" content={rfc0024} />;
}

export function RFC0025() {
  return <RFCMarkdownPage docId="RFC-0025" title="Error Handling & Meta-Diagnostics" status="RATIFIED" version="2026-05-04" compliance="RFC-0019 · RFC-0020 · RFC-0021 · RFC-0022 · RFC-0023" content={rfc0025} />;
}

export function RFC0026() {
  return <RFCMarkdownPage docId="RFC-0026" title="Projection Operator Π — Discrete Realization of Continuous Semantic Dynamics" status="STABLE" version="2026-05-05" compliance="RFC-0016 · RFC-0017 · RFC-0018 · RFC-0022 · RFC-0024 · RFC-0025" content={rfc0026} />;
}

export function RFC0027() {
  return <RFCMarkdownPage docId="RFC-0027" title="Proto-Structure Learning — End-to-End Optimization" status="DRAFT" version="2026-05-05" compliance="RFC-0016 · RFC-0018 · RFC-0020 · RFC-0021 · RFC-0022 · RFC-0024 · RFC-0025" content={rfc0027} />;
}

export function RFC0028() {
  return <RFCMarkdownPage docId="RFC-0028" title="LoRA Lens — Adaptive Structural Calibration" status="STABLE" version="2026-05-05" compliance="RFC-0016 · RFC-0018 · RFC-0020 · RFC-0029 · RFC-0030" content={rfc0028} />;
}

export function RFC0029() {
  return <RFCMarkdownPage docId="RFC-0029" title="Movement Algebra — Vectorized Structural Dynamics" status="STABLE" version="2026-05-05" compliance="RFC-0016 · RFC-0017 · RFC-0028 · RFC-0030" content={rfc0029} />;
}

export function RFC0030() {
  return <RFCMarkdownPage docId="RFC-0030" title="Semantic Groupoid Theory — Algebraic Learning of Structural Invariants" status="STABLE" version="2026-05-05" compliance="RFC-0016 · RFC-0018 · RFC-0022 · RFC-0028 · RFC-0029" content={rfc0030} />;
}

export function RFC0031() {
  return <RFCMarkdownPage docId="RFC-0031" title="Information Geometry of CFI Space" status="DRAFT" version="2026-05-05" compliance="RFC-0018 · RFC-0020 · RFC-0021 · RFC-0028 · RFC-0030" content={rfc0031} />;
}
