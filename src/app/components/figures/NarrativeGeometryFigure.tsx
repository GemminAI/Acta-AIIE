import React, { useEffect, useMemo, useRef, useState } from "react";

const MONO = "'JetBrains Mono', monospace";
const PANEL_BORDER = "#1a2530";
const PANEL_BG = "#0a0e14";
const TEXT_PRIMARY = "#c8d4e0";
const TEXT_SECONDARY = "#8098ae";
const TEXT_TERTIARY = "#5a7a8e";

type PointKey = "us" | "cn" | "jp" | "eu";

type Point = {
  cx: number;
  cy: number;
  label: string;
  fill: string;
  textFill: string;
};

const CENTROID = { cx: 160, cy: 130 };
const BOUNDS = { minX: 48, maxX: 272, minY: 28, maxY: 232 };

const INITIAL_POINTS: Record<PointKey, Point> = {
  us: { cx: 120, cy: 100, label: "US", fill: "#378ADD", textFill: "#0C447C" },
  cn: { cx: 200, cy: 155, label: "CN", fill: "#D85A30", textFill: "#712B13" },
  jp: { cx: 145, cy: 170, label: "JP", fill: "#534AB7", textFill: "#3C3489" },
  eu: { cx: 175, cy: 95, label: "EU", fill: "#639922", textFill: "#3B6D11" },
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function formatDistance(point: Point) {
  const distance = Math.sqrt((point.cx - CENTROID.cx) ** 2 + (point.cy - CENTROID.cy) ** 2);
  return (distance / 100).toFixed(2);
}

export function NarrativeGeometryFigure() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [points, setPoints] = useState<Record<PointKey, Point>>(INITIAL_POINTS);
  const [dragging, setDragging] = useState<{
    key: PointKey;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const metrics = useMemo(() => {
    const values = Object.fromEntries(
      Object.entries(points).map(([key, point]) => [key, formatDistance(point)]),
    ) as Record<PointKey, string>;

    const max = Math.max(...Object.values(points).map((point) => Number(formatDistance(point))));
    return { values, max };
  }, [points]);

  useEffect(() => {
    if (!dragging) return;

    const updatePoint = (clientX: number, clientY: number) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const viewBox = svg.viewBox.baseVal;
      const x = ((clientX - rect.left) * viewBox.width) / rect.width - dragging.offsetX;
      const y = ((clientY - rect.top) * viewBox.height) / rect.height - dragging.offsetY;

      setPoints((current) => ({
        ...current,
        [dragging.key]: {
          ...current[dragging.key],
          cx: clamp(x, BOUNDS.minX, BOUNDS.maxX),
          cy: clamp(y, BOUNDS.minY, BOUNDS.maxY),
        },
      }));
    };

    const handlePointerMove = (event: PointerEvent) => updatePoint(event.clientX, event.clientY);
    const handlePointerUp = () => setDragging(null);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dragging]);

  const startDrag = (key: PointKey, event: React.PointerEvent<SVGCircleElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const viewBox = svg.viewBox.baseVal;
    const cursorX = ((event.clientX - rect.left) * viewBox.width) / rect.width;
    const cursorY = ((event.clientY - rect.top) * viewBox.height) / rect.height;
    const point = points[key];

    setDragging({
      key,
      offsetX: cursorX - point.cx,
      offsetY: cursorY - point.cy,
    });
  };

  return (
    <div style={{ margin: "24px 0" }}>
      <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "280px" }}>
          <p style={{ margin: "0 0 8px", color: TEXT_PRIMARY, fontSize: "13px", fontWeight: 500, fontFamily: MONO }}>
            Narrative divergence - CDC = ||v_i - v_bar||_2
          </p>
          <p style={{ margin: "0 0 10px", color: TEXT_SECONDARY, fontSize: "12px", lineHeight: 1.5, fontFamily: MONO }}>
            Each point is a narrative state P(x,y,z) projected onto the plane. Distance between
            points indicates semantic disagreement between observers.
          </p>
          <svg ref={svgRef} viewBox="0 0 300 280" style={{ display: "block", width: "100%", background: PANEL_BG, border: `1px solid ${PANEL_BORDER}` }}>
            <defs>
              <marker id="arr-d" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </marker>
            </defs>
            <line x1="40" y1="240" x2="280" y2="240" stroke={TEXT_TERTIARY} strokeWidth="0.5" markerEnd="url(#arr-d)" />
            <line x1="40" y1="240" x2="40" y2="20" stroke={TEXT_TERTIARY} strokeWidth="0.5" markerEnd="url(#arr-d)" />
            <text x="284" y="244" fontSize="11" fill={TEXT_SECONDARY} style={{ fontFamily: MONO }}>
              x (T10)
            </text>
            <text x="44" y="16" fontSize="11" fill={TEXT_SECONDARY} style={{ fontFamily: MONO }}>
              y (SIV)
            </text>

            <circle cx={CENTROID.cx} cy={CENTROID.cy} r="4" fill="#1D9E75" opacity="0.7" />
            <text x="168" y="128" fontSize="10" fill="#0F6E56" style={{ fontFamily: MONO }}>
              v_bar (consensus)
            </text>

            {(Object.entries(points) as [PointKey, Point][]).map(([key, point]) => (
              <g key={key}>
                <line
                  x1={point.cx}
                  y1={point.cy}
                  x2={CENTROID.cx}
                  y2={CENTROID.cy}
                  stroke={point.fill}
                  strokeWidth="0.8"
                  strokeDasharray="3 2"
                  opacity="0.5"
                />
                <circle
                  cx={point.cx}
                  cy={point.cy}
                  r="7"
                  fill={point.fill}
                  opacity="0.85"
                  style={{ cursor: "grab", touchAction: "none" }}
                  onPointerDown={(event) => startDrag(key, event)}
                />
                <text x={point.cx + 10} y={point.cy - 2} fontSize="10" fill={point.textFill} style={{ fontFamily: MONO }}>
                  {point.label}
                </text>
              </g>
            ))}

            <text x="50" y="258" fontSize="10" fill={INITIAL_POINTS.us.textFill} style={{ fontFamily: MONO }}>
              US: {metrics.values.us}
            </text>
            <text x="120" y="258" fontSize="10" fill={INITIAL_POINTS.cn.textFill} style={{ fontFamily: MONO }}>
              CN: {metrics.values.cn}
            </text>
            <text x="190" y="258" fontSize="10" fill={INITIAL_POINTS.jp.textFill} style={{ fontFamily: MONO }}>
              JP: {metrics.values.jp}
            </text>
            <text x="50" y="270" fontSize="10" fill={INITIAL_POINTS.eu.textFill} style={{ fontFamily: MONO }}>
              EU: {metrics.values.eu}
            </text>
            <text
              x="160"
              y="270"
              fontSize="10"
              fill="#D85A30"
              textAnchor="middle"
              opacity={metrics.max > 1.1 ? 1 : 0}
              style={{ fontFamily: MONO }}
            >
              Narrative rift detected
            </text>
          </svg>
          <p style={{ margin: "6px 0 0", color: TEXT_TERTIARY, fontSize: "12px", fontFamily: MONO }}>
            drag points to measure divergence
          </p>
        </div>

        <div style={{ flex: 1, minWidth: "280px" }}>
          <p style={{ margin: "0 0 8px", color: TEXT_PRIMARY, fontSize: "13px", fontWeight: 500, fontFamily: MONO }}>
            Narrative trajectory - v(t) = dP(t)/dt
          </p>
          <p style={{ margin: "0 0 10px", color: TEXT_SECONDARY, fontSize: "12px", lineHeight: 1.5, fontFamily: MONO }}>
            A single observer's state P(t) evolves over time as new events arrive. Velocity is the
            rate of narrative change. Anomalous jumps signal phase transitions (PCE).
          </p>
          <svg viewBox="0 0 300 280" style={{ display: "block", width: "100%", background: PANEL_BG, border: `1px solid ${PANEL_BORDER}` }}>
            <defs>
              <marker id="arr-t" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </marker>
            </defs>
            <line x1="40" y1="240" x2="280" y2="240" stroke={TEXT_TERTIARY} strokeWidth="0.5" markerEnd="url(#arr-t)" />
            <line x1="40" y1="240" x2="40" y2="20" stroke={TEXT_TERTIARY} strokeWidth="0.5" markerEnd="url(#arr-t)" />
            <text x="284" y="244" fontSize="11" fill={TEXT_SECONDARY} style={{ fontFamily: MONO }}>
              x (T10)
            </text>
            <text x="44" y="16" fontSize="11" fill={TEXT_SECONDARY} style={{ fontFamily: MONO }}>
              y (SIV)
            </text>

            <polyline fill="none" stroke="#1D9E75" strokeWidth="1.5" points="70,200 95,185 118,170 138,158 155,148" />
            <line x1="155" y1="148" x2="210" y2="90" stroke="#D85A30" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#arr-t)" />
            <polyline fill="none" stroke="#1D9E75" strokeWidth="1.5" points="210,90 228,84 245,80" />

            <text x="58" y="210" fontSize="10" fill="#0F6E56" style={{ fontFamily: MONO }}>
              t1
            </text>
            <text x="148" y="145" fontSize="10" fill="#0F6E56" style={{ fontFamily: MONO }}>
              t4
            </text>
            <text x="248" y="78" fontSize="10" fill="#0F6E56" style={{ fontFamily: MONO }}>
              t6
            </text>

            <line x1="155" y1="148" x2="155" y2="110" stroke={TEXT_TERTIARY} strokeWidth="0.5" strokeDasharray="2 2" />
            <text x="158" y="108" fontSize="10" fill="#993C1D" style={{ fontFamily: MONO }}>
              PCE
            </text>
            <text x="158" y="120" fontSize="10" fill="#993C1D" style={{ fontFamily: MONO }}>
              phase transition
            </text>

            <line x1="95" y1="185" x2="118" y2="170" stroke="#BA7517" strokeWidth="1" markerEnd="url(#arr-t)" opacity="0.7" />
            <text x="100" y="172" fontSize="10" fill="#854F0B" style={{ fontFamily: MONO }}>
              v(t)
            </text>

            {[["70", "200"], ["95", "185"], ["118", "170"], ["138", "158"], ["210", "90"], ["228", "84"], ["245", "80"]].map(
              ([cx, cy], index) => (
                <circle key={`${cx}-${cy}-${index}`} cx={cx} cy={cy} r="4" fill="#1D9E75" opacity="0.7" />
              ),
            )}
            <circle cx="155" cy="148" r="5" fill="#D85A30" opacity="0.9" />

            <text x="150" y="258" fontSize="10" fill="#993C1D" textAnchor="middle" style={{ fontFamily: MONO }}>
              ||P(t5)-P(t4)||_2 &gt;&gt; epsilon -&gt; rift detected
            </text>
          </svg>
          <p style={{ margin: "6px 0 0", color: TEXT_TERTIARY, fontSize: "12px", fontFamily: MONO }}>
            green = stable drift · red dashed = anomalous jump
          </p>
        </div>
      </div>

      <div style={{ marginTop: "14px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <span style={{ fontSize: "12px", color: TEXT_SECONDARY, fontFamily: MONO }}>
          <svg width="20" height="10" style={{ verticalAlign: "middle", marginRight: "6px" }}>
            <line x1="0" y1="5" x2="20" y2="5" stroke="#1D9E75" strokeWidth="1.5" />
          </svg>
          stable trajectory
        </span>
        <span style={{ fontSize: "12px", color: TEXT_SECONDARY, fontFamily: MONO }}>
          <svg width="20" height="10" style={{ verticalAlign: "middle", marginRight: "6px" }}>
            <line x1="0" y1="5" x2="20" y2="5" stroke="#D85A30" strokeWidth="1.5" strokeDasharray="4 2" />
          </svg>
          phase transition (PCE)
        </span>
        <span style={{ fontSize: "12px", color: TEXT_SECONDARY, fontFamily: MONO }}>
          <svg width="12" height="12" style={{ verticalAlign: "middle", marginRight: "6px" }}>
            <line x1="0" y1="6" x2="12" y2="6" stroke="#888780" strokeWidth="0.8" strokeDasharray="2 2" />
          </svg>
          CDC distance to consensus
        </span>
      </div>
    </div>
  );
}
