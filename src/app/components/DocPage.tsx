import { ReactNode } from "react";

const MONO = "'JetBrains Mono', monospace";

interface DocPageProps {
  children: ReactNode;
}

export function DocPage({ children }: DocPageProps) {
  return (
    <div
      style={{
        maxWidth: "880px",
        margin: "0 auto",
        padding: "48px 56px 80px",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}

export function Section({ id, num, children }: { id?: string; num?: string; children: ReactNode }) {
  return (
    <section id={id} style={{ marginBottom: "40px" }}>
      {num && (
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
          § {num}
        </div>
      )}
      {children}
    </section>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: MONO,
        fontSize: "15px",
        fontWeight: 600,
        color: "#ffffff",
        letterSpacing: "0.01em",
        marginBottom: "16px",
        paddingBottom: "10px",
        borderBottom: "1px solid #1a2530",
      }}
    >
      {children}
    </h2>
  );
}

export function SubsectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: MONO,
        fontSize: "12px",
        fontWeight: 600,
        color: "#c8d4e0",
        letterSpacing: "0.03em",
        marginBottom: "10px",
        marginTop: "24px",
      }}
    >
      {children}
    </h3>
  );
}

export function Body({ children }: { children: ReactNode }) {
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
}

export function BulletList({ items }: { items: { label?: string; content: string }[] }) {
  return (
    <ul style={{ margin: "8px 0 16px", paddingLeft: 0, listStyle: "none" }}>
      {items.map((item, i) => (
        <li
          key={i}
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
              marginTop: "3px",
            }}
          >
            ·
          </span>
          <span
            style={{
              fontFamily: MONO,
              fontSize: "12px",
              color: "#7a8f9e",
              lineHeight: 1.8,
            }}
          >
            {item.label && (
              <strong
                style={{
                  fontFamily: MONO,
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#c8d4e0",
                  marginRight: "6px",
                }}
              >
                {item.label}:
              </strong>
            )}
            {item.content}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function CodeBlock({ lang, children }: { lang?: string; children: string }) {
  return (
    <div
      style={{
        margin: "20px 0",
        border: "1px solid #1a2530",
        overflow: "hidden",
      }}
    >
      {lang && (
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
      )}
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
        <code>{children}</code>
      </pre>
    </div>
  );
}

export function InlineCode({ children }: { children: ReactNode }) {
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
}

export function Divider() {
  return (
    <div
      style={{
        height: "1px",
        background: "#1a2530",
        margin: "32px 0",
      }}
    />
  );
}

export function InfoBox({ children, accent }: { children: ReactNode; accent?: boolean }) {
  return (
    <div
      style={{
        padding: "14px 18px",
        border: `1px solid ${accent ? "#38bdf8" : "#1a2530"}`,
        background: accent ? "rgba(56,189,248,0.04)" : "#080c10",
        margin: "20px 0",
        borderLeft: `2px solid ${accent ? "#38bdf8" : "#2d4455"}`,
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: "12px",
          color: accent ? "#8098ae" : "#6b7f8e",
          lineHeight: 1.8,
        }}
      >
        {children}
      </div>
    </div>
  );
}
