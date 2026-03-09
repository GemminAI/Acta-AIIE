const MONO = "'JetBrains Mono', monospace";

interface DocHeaderProps {
  title: string;
  subtitle?: string;
  canonicalHash?: string;
  status: string;
  version: string;
  author?: string;
  editor?: string;
  compliance?: string;
  docId?: string;
}

export function DocHeader({
  title,
  subtitle,
  canonicalHash,
  status,
  version,
  author,
  editor,
  compliance,
  docId,
}: DocHeaderProps) {
  return (
    <div
      style={{
        borderBottom: "1px solid #1a2530",
        paddingBottom: "32px",
        marginBottom: "40px",
      }}
    >
      {/* Top metadata row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "24px",
        }}
      >
        {/* Left: Doc ID */}
        <div
          style={{
            fontFamily: MONO,
            fontSize: "10px",
            color: "#3d5a72",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {docId || "AIIE-DOC"} · {compliance || "RFC 8785"}
        </div>

        {/* Right: Version + Status */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: "10px",
              color: "#3d5a72",
              letterSpacing: "0.05em",
            }}
          >
            {version}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "3px 10px",
              border: "1px solid #38bdf8",
              background: "rgba(56,189,248,0.05)",
            }}
          >
            <div
              style={{
                width: "5px",
                height: "5px",
                background: "#38bdf8",
                borderRadius: "50%",
              }}
            />
            <span
              style={{
                fontFamily: MONO,
                fontSize: "9px",
                color: "#38bdf8",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {status}
            </span>
          </div>
        </div>
      </div>

      {/* Title */}
      <h1
        style={{
          fontFamily: MONO,
          fontSize: "26px",
          fontWeight: 600,
          color: "#ffffff",
          lineHeight: 1.35,
          letterSpacing: "-0.02em",
          marginBottom: subtitle ? "10px" : "20px",
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            fontFamily: MONO,
            fontSize: "13px",
            color: "#5a7a8e",
            lineHeight: 1.7,
            marginBottom: "20px",
            letterSpacing: "0.01em",
          }}
        >
          {subtitle}
        </p>
      )}

      {/* Author / Editor row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
          marginTop: "16px",
        }}
      >
        {author && <MetaItem label="Author" value={author} />}
        {editor && <MetaItem label="Editor" value={editor} />}
        {compliance && <MetaItem label="Standards" value={compliance} />}
      </div>

      {/* Canonical Hash */}
      {canonicalHash && (
        <div
          style={{
            marginTop: "20px",
            padding: "12px 16px",
            background: "#0a1018",
            border: "1px solid #1a2530",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: "9px",
              color: "#3d5a72",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            Canonical Hash
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: "10px",
              color: "#4a8fa8",
              letterSpacing: "0.04em",
              wordBreak: "break-all",
            }}
          >
            {canonicalHash}
          </div>
        </div>
      )}
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: MONO,
          fontSize: "9px",
          color: "#3d5a72",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "3px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: MONO,
          fontSize: "11px",
          color: "#8098ae",
        }}
      >
        {value}
      </div>
    </div>
  );
}
