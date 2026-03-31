import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DocHeader } from "../components/DocHeader";
import { DocPage } from "../components/DocPage";
import { LCMInferenceFigure } from "../components/figures/LCMInferenceFigure";
import { NarrativeGeometryFigure } from "../components/figures/NarrativeGeometryFigure";
// @ts-ignore Vite resolves this raw import from the workspace root.
import paperContent from "../../../paper/narrative_quantification.md?raw";

const MONO = "'JetBrains Mono', monospace";

const renderedPaperContent = paperContent
  .replace(/^---\n[\s\S]*?\n---\n+/, "")
  .replace(/\]\((figures\/[^)]+)\)/g, "](/$1)");

export function NarrativeQuantification() {
  return (
    <DocPage>
      <DocHeader
        title="Narrative Quantification: Compiling Narrative Structures into Geometric State Representations"
        subtitle="Extends SSRN 6419019"
        canonicalHash="3a5a3a9d1b13367621b5b34cc25a0d886a7da39ef91015a3f757ae37908602b8"
        status="Verified"
        version="WP-1 v1.2"
        author="Tomohiko Nakamura — Independent Researcher, Japan"
        compliance="AIIE Protocol · 24TAG Schema · RFC 8785"
        docId="AIIE-WP-001"
      />
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => {
            const childArray = React.Children.toArray(children);
            const hasOnlyFigure =
              childArray.length === 1 &&
              React.isValidElement(childArray[0]) &&
              (childArray[0].type === NarrativeGeometryFigure ||
                childArray[0].type === LCMInferenceFigure ||
                childArray[0].type === "img");

            if (hasOnlyFigure) {
              return <div style={{ margin: "24px 0" }}>{children}</div>;
            }

            return (
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: "13px",
                  color: "#7a8f9e",
                  lineHeight: 1.9,
                  marginBottom: "16px",
                  letterSpacing: "0.01em",
                }}
              >
                {children}
              </p>
            );
          },
          h2: ({ children }) => (
            <h2
              style={{
                fontFamily: MONO,
                fontSize: "15px",
                fontWeight: 600,
                color: "#ffffff",
                letterSpacing: "0.01em",
                marginTop: "40px",
                marginBottom: "18px",
                paddingBottom: "10px",
                borderBottom: "1px solid #1a2530",
              }}
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
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
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4
              style={{
                fontFamily: MONO,
                fontSize: "11px",
                fontWeight: 600,
                color: "#9fc1d6",
                letterSpacing: "0.02em",
                marginTop: "22px",
                marginBottom: "10px",
              }}
            >
              {children}
            </h4>
          ),
          strong: ({ children }) => (
            <strong
              style={{
                fontFamily: MONO,
                fontWeight: 600,
                color: "#c8d4e0",
              }}
            >
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em
              style={{
                color: "#9fc1d6",
                fontStyle: "italic",
              }}
            >
              {children}
            </em>
          ),
          ul: ({ children }) => (
            <ul
              style={{
                margin: "8px 0 16px",
                paddingLeft: "22px",
                color: "#7a8f9e",
              }}
            >
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol
              style={{
                margin: "8px 0 16px",
                paddingLeft: "22px",
                color: "#7a8f9e",
              }}
            >
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li
              style={{
                fontFamily: MONO,
                fontSize: "12px",
                lineHeight: 1.85,
                marginBottom: "8px",
              }}
            >
              {children}
            </li>
          ),
          hr: () => (
            <div
              style={{
                height: "1px",
                background: "#1a2530",
                margin: "32px 0",
              }}
            />
          ),
          code: ({ children, className }) => {
            const isBlock = Boolean(className);
            if (isBlock) {
              return (
                <code
                  className={className}
                  style={{
                    fontFamily: MONO,
                    fontSize: "12px",
                    color: "#5a9ab8",
                    lineHeight: 1.7,
                    letterSpacing: "0.02em",
                  }}
                >
                  {children}
                </code>
              );
            }

            return (
              <code
                style={{
                  fontFamily: MONO,
                  fontSize: "11px",
                  color: "#4a8fa8",
                  background: "#0a1018",
                  padding: "1px 6px",
                  border: "1px solid #1a2530",
                }}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre
              style={{
                margin: "20px 0",
                padding: "20px",
                background: "#050810",
                border: "1px solid #1a2530",
                overflowX: "auto",
              }}
            >
              {children}
            </pre>
          ),
          img: ({ src, alt }) => {
            if (typeof src === "string" && src.includes("fig3")) {
              return <NarrativeGeometryFigure />;
            }
            if (typeof src === "string" && src.includes("fig4")) {
              return <LCMInferenceFigure />;
            }
            return (
              <img
                src={typeof src === "string" && src.startsWith("figures/") ? `/${src}` : src}
                alt={alt ?? ""}
                style={{
                  display: "block",
                  width: "100%",
                  margin: "24px 0",
                  border: "1px solid #1a2530",
                  background: "#080c10",
                }}
              />
            );
          },
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#38bdf8",
                textDecoration: "none",
              }}
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote
              style={{
                margin: "18px 0",
                padding: "14px 18px",
                border: "1px solid #1a2530",
                borderLeft: "2px solid #38bdf8",
                background: "rgba(56,189,248,0.04)",
                color: "#8098ae",
              }}
            >
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div style={{ overflowX: "auto", margin: "20px 0" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  border: "1px solid #1a2530",
                  fontFamily: MONO,
                }}
              >
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th
              style={{
                border: "1px solid #1a2530",
                background: "#0a1018",
                color: "#c8d4e0",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.04em",
                padding: "10px 12px",
                textAlign: "left",
              }}
            >
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td
              style={{
                border: "1px solid #1a2530",
                color: "#7a8f9e",
                fontSize: "11px",
                lineHeight: 1.7,
                padding: "10px 12px",
                verticalAlign: "top",
              }}
            >
              {children}
            </td>
          ),
        }}
      >
        {renderedPaperContent}
      </ReactMarkdown>
    </DocPage>
  );
}
