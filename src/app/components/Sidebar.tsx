import { NavLink, useLocation } from "react-router";
const MONO = "'JetBrains Mono', monospace";

const NAV = [
  {
    section: "01. Protocol Standard",
    items: [
      { label: "AIIE 24TAG Schema Specification", sub: "v4.1.0", path: "/protocol/24tag-schema" },
      { label: "Mathematical Standardization of Narrative Intent", sub: "v4.1.1", path: "/protocol/mathematical-standardization" },
    ],
  },
  {
    section: "02. Whitepapers",
    items: [
      { label: "Whitepapers Index", sub: "Overview", path: "/whitepapers" },
      { label: "Narrative Quantification as Cognitive Infrastructure", sub: "WP-1 v1.1", path: "/whitepapers/narrative-quantification" },
      { label: "Narrative Observation", sub: "WP-3 v1.3", path: "/whitepapers/narrative-observation" },
    ],
  },
  {
    section: "03. SDK / Implementations",
    items: [
      { label: "Acta AIIE JCS SDK", sub: "Crystallization Engine v1.0", path: "/sdk/crystallization-engine" },
      { label: "Organization Structure", sub: "Repository Index", path: "/org/structure" },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside
      style={{
        width: "280px",
        minWidth: "280px",
        background: "#070a0d",
        borderRight: "1px solid #1a2530",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        zIndex: 50,
      }}
      >
      {/* Logo Header */}
      <NavLink
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "20px 24px",
          borderBottom: "1px solid #1a2530",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            flexShrink: 0,
            border: "1px solid #1a2530",
            padding: "4px",
            background: "#080c10",
          }}
        >
          <svg
            viewBox="0 0 28 28"
            fill="none"
            style={{ width: "100%", height: "100%" }}
          >
            <rect
              x="1"
              y="1"
              width="26"
              height="26"
              stroke="#2d4455"
              strokeWidth="1"
            />
            <line
              x1="1"
              y1="14"
              x2="27"
              y2="14"
              stroke="#2d4455"
              strokeWidth="1"
            />
            <line
              x1="14"
              y1="1"
              x2="14"
              y2="27"
              stroke="#2d4455"
              strokeWidth="1"
            />
            <circle
              cx="14"
              cy="14"
              r="4"
              stroke="#38bdf8"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>
        <div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: "12px",
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Acta AIIE
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: "9px",
              color: "#2d4455",
              letterSpacing: "0.05em",
              marginTop: "2px",
            }}
          >
            Documentation Portal
          </div>
        </div>
      </NavLink>

      {/* Navigation */}
      <nav
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "8px 0",
          scrollbarWidth: "thin",
          scrollbarColor: "#1a2530 transparent",
        }}
      >
        {NAV.map((group) => (
          <div key={group.section} style={{ marginBottom: "4px" }}>
            {/* Section Header */}
            <div
              style={{
                fontFamily: MONO,
                fontSize: "8px",
                fontWeight: 600,
                color: "#2d4455",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "12px 24px 6px",
              }}
            >
              {group.section}
            </div>

            {/* Items */}
            {group.items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    borderLeft: `2px solid ${isActive ? "#38bdf8" : "transparent"}`,
                    background: isActive ? "rgba(56,189,248,0.04)" : "transparent",
                    transition: "all 0.1s ease",
                  }}
                >
                  <div
                    style={{
                      padding: "8px 24px 8px 22px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: MONO,
                        fontSize: "11px",
                        fontWeight: isActive ? 500 : 400,
                        color: isActive ? "#38bdf8" : "#6b8090",
                        lineHeight: 1.5,
                        letterSpacing: "0.01em",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontFamily: MONO,
                        fontSize: "9px",
                        color: isActive ? "#1e7baf" : "#2d4455",
                        marginTop: "2px",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {item.sub}
                    </div>
                  </div>
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: "14px 24px",
          borderTop: "1px solid #1a2530",
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: "8px",
            color: "#2d4455",
            letterSpacing: "0.06em",
          }}
        >
          AIIE Protocol · RFC 8785 Compliant
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: "8px",
            color: "#1a2f40",
            marginTop: "3px",
            letterSpacing: "0.04em",
          }}
        >
          © Acta AIIE Standardization Committee
        </div>
      </div>
    </aside>
  );
}
