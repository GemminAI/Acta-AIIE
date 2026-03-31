import React, { useMemo, useState } from "react";

const MONO = "'JetBrains Mono', monospace";
const PANEL_BORDER = "#1a2530";
const PANEL_BG = "#0a0e14";
const TEXT_PRIMARY = "#c8d4e0";
const TEXT_SECONDARY = "#8098ae";
const TEXT_TERTIARY = "#5a7a8e";

function pillStyle(background: string, color: string): React.CSSProperties {
  return {
    display: "inline-block",
    fontSize: "11px",
    fontWeight: 500,
    padding: "2px 8px",
    borderRadius: "4px",
    background,
    color,
    fontFamily: MONO,
  };
}

export function LCMInferenceFigure() {
  const [confidence, setConfidence] = useState(87);
  const [conflict, setConflict] = useState(72);

  const model = useMemo(() => {
    const conf = confidence / 100;
    const conf2 = conflict / 100;
    const raw = [
      0.12 + (1 - conf) * 0.08,
      0.16 + (1 - conf) * 0.05,
      0.2 + conf * 0.04,
      0.28 + conf * 0.28 + conf2 * 0.08,
      0.14 + conf2 * 0.03,
      0.1 - conf * 0.04,
    ].map((value) => Math.max(0.02, value));
    const z = raw.reduce((sum, value) => sum + value, 0);
    const probabilities = raw.map((value) => value / z);
    const dominantIndex = probabilities.indexOf(Math.max(...probabilities));
    const labels = ["S1", "S2", "S3", "S4", "S5", "S6"];
    const drift = Math.abs(conf - 0.87) + Math.abs(conf2 - 0.72);

    return {
      conf,
      conf2,
      z,
      dominantLabel: labels[dominantIndex],
      dominantProbability: probabilities[dominantIndex],
      anomaly: drift > 0.4,
      s1Height: Math.round(probabilities[0] * 200),
      s4Height: Math.round(probabilities[3] * 200),
    };
  }, [confidence, conflict]);

  return (
    <div style={{ margin: "24px 0" }}>
      <svg viewBox="0 0 680 480" style={{ width: "100%", display: "block", background: PANEL_BG, border: `1px solid ${PANEL_BORDER}` }}>
        <defs>
          <marker id="lcm-ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        <text x="340" y="24" textAnchor="middle" style={{ fill: TEXT_PRIMARY, font: `600 13px ${MONO}` }}>
          LCM inference as distribution transformation
        </text>

        <g>
          <rect x="30" y="44" width="170" height="44" rx="8" fill="rgba(29,158,117,0.10)" stroke="#1D9E75" strokeWidth="0.5" />
          <text x="115" y="62" textAnchor="middle" dominantBaseline="central" style={{ fill: TEXT_PRIMARY, font: `600 13px ${MONO}` }}>
            Prior P(S_t | T_t)
          </text>
          <text x="115" y="79" textAnchor="middle" dominantBaseline="central" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>
            current narrative belief
          </text>
        </g>

        <rect x="42" y="100" width="18" height="52" rx="2" fill="#1D9E75" opacity="0.35" />
        <rect x="64" y="112" width="18" height="40" rx="2" fill="#1D9E75" opacity="0.55" />
        <rect x="86" y={152 - model.s1Height} width="18" height={model.s1Height} rx="2" fill="#1D9E75" opacity="0.8" />
        <rect x="108" y="108" width="18" height="44" rx="2" fill="#1D9E75" opacity="0.45" />
        <rect x="130" y="118" width="18" height="34" rx="2" fill="#1D9E75" opacity="0.30" />
        <rect x="152" y="126" width="18" height="26" rx="2" fill="#1D9E75" opacity="0.20" />
        <text x="115" y="165" textAnchor="middle" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>
          S1 S2 S3 S4 S5 S6
        </text>
        <text x="115" y="178" textAnchor="middle" opacity="0.5" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>
          narrative state candidates
        </text>

        <line x1="200" y1="120" x2="248" y2="120" stroke="#1D9E75" strokeWidth="1.2" markerEnd="url(#lcm-ar)" />
        <text x="224" y="112" textAnchor="middle" fill="#0F6E56" style={{ font: `12px ${MONO}` }}>
          I_t arrives
        </text>

        <g>
          <rect x="252" y="44" width="176" height="44" rx="8" fill="rgba(186,117,23,0.10)" stroke="#BA7517" strokeWidth="0.5" />
          <text x="340" y="62" textAnchor="middle" dominantBaseline="central" style={{ fill: TEXT_PRIMARY, font: `600 13px ${MONO}` }}>
            New information I_t
          </text>
          <text x="340" y="79" textAnchor="middle" dominantBaseline="central" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>
            structured event input
          </text>
        </g>

        <rect x="252" y="100" width="176" height="78" rx="6" fill="none" stroke={TEXT_TERTIARY} strokeWidth="0.5" />
        <text x="266" y="118" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>event_id: evt_20260330</text>
        <text x="266" y="134" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>T07 (action): sanction</text>
        <text x="266" y="150" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>T10 (epistemic): {model.conf.toFixed(2)}</text>
        <text x="266" y="166" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>T15 (conflict): {model.conf2.toFixed(2)}</text>
        <text x="340" y="192" textAnchor="middle" opacity="0.55" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>
          P(I_t | S_t+1) - likelihood
        </text>

        <line x1="428" y1="120" x2="476" y2="120" stroke="#BA7517" strokeWidth="1.2" markerEnd="url(#lcm-ar)" />
        <text x="452" y="112" textAnchor="middle" fill="#854F0B" style={{ font: `12px ${MONO}` }}>
          Bayes
        </text>

        <g>
          <rect x="480" y="44" width="170" height="44" rx="8" fill="rgba(216,90,48,0.10)" stroke="#D85A30" strokeWidth="0.5" />
          <text x="565" y="62" textAnchor="middle" dominantBaseline="central" style={{ fill: TEXT_PRIMARY, font: `600 13px ${MONO}` }}>
            Posterior P(S_t+1)
          </text>
          <text x="565" y="79" textAnchor="middle" dominantBaseline="central" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>
            updated belief
          </text>
        </g>

        <rect x="492" y="120" width="18" height="32" rx="2" fill="#D85A30" opacity="0.25" />
        <rect x="514" y="110" width="18" height="42" rx="2" fill="#D85A30" opacity="0.40" />
        <rect x="536" y="96" width="18" height="56" rx="2" fill="#D85A30" opacity="0.65" />
        <rect x="558" y={152 - model.s4Height} width="18" height={model.s4Height} rx="2" fill="#D85A30" opacity="0.90" />
        <rect x="580" y="112" width="18" height="40" rx="2" fill="#D85A30" opacity="0.38" />
        <rect x="602" y="128" width="18" height="24" rx="2" fill="#D85A30" opacity="0.18" />
        <text x="565" y="165" textAnchor="middle" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>
          S1 S2 S3 S4 S5 S6
        </text>
        <text x="565" y="178" textAnchor="middle" opacity="0.5" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>
          S4 becomes dominant
        </text>

        <rect x="30" y="206" width="620" height="52" rx="8" fill="none" stroke={TEXT_TERTIARY} strokeWidth="0.5" />
        <text x="340" y="226" textAnchor="middle" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>
          Bayesian update:
        </text>
        <text x="340" y="245" textAnchor="middle" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>
          P(S_t+1) = (1/Z) * P(I_t | S_t+1) * Sigma P(S_t+1 | S_t) * P(S_t)
        </text>

        <rect x="30" y="276" width="190" height="76" rx="8" fill="rgba(29,158,117,0.10)" stroke="#1D9E75" strokeWidth="0.5" />
        <text x="125" y="296" textAnchor="middle" dominantBaseline="central" style={{ fill: TEXT_PRIMARY, font: `600 13px ${MONO}` }}>
          Trajectory prediction
        </text>
        <text x="125" y="314" textAnchor="middle" dominantBaseline="central" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>
          compute S_hat_t+1
        </text>
        <text x="125" y="332" textAnchor="middle" dominantBaseline="central" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>
          in geometric space
        </text>

        <line x1="220" y1="314" x2="243" y2="314" stroke={TEXT_TERTIARY} strokeWidth="0.8" strokeDasharray="3 2" markerEnd="url(#lcm-ar)" />

        <rect x="245" y="276" width="190" height="76" rx="8" fill="rgba(186,117,23,0.10)" stroke="#BA7517" strokeWidth="0.5" />
        <text x="340" y="296" textAnchor="middle" dominantBaseline="central" style={{ fill: TEXT_PRIMARY, font: `600 13px ${MONO}` }}>
          Consistency check
        </text>
        <text x="340" y="314" textAnchor="middle" dominantBaseline="central" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>
          d(S_hat, S_obs) vs epsilon
        </text>
        <text x="340" y="332" textAnchor="middle" dominantBaseline="central" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>
          detect structural drift
        </text>

        <line x1="435" y1="314" x2="458" y2="314" stroke={TEXT_TERTIARY} strokeWidth="0.8" strokeDasharray="3 2" markerEnd="url(#lcm-ar)" />

        <rect x="460" y="276" width="190" height="76" rx="8" fill="rgba(216,90,48,0.10)" stroke="#D85A30" strokeWidth="0.5" />
        <text x="555" y="296" textAnchor="middle" dominantBaseline="central" style={{ fill: TEXT_PRIMARY, font: `600 13px ${MONO}` }}>
          Distribution update
        </text>
        <text x="555" y="314" textAnchor="middle" dominantBaseline="central" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>
          refine P(S) via Bayes
        </text>
        <text x="555" y="332" textAnchor="middle" dominantBaseline="central" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>
          update candidate set
        </text>

        <rect x="30" y="372" width="620" height="88" rx="8" fill="none" stroke={TEXT_TERTIARY} strokeWidth="0.5" />
        <text x="50" y="392" opacity="0.55" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>
          Parallel hypothesis set (S_i, h_i, P(S_i))
        </text>

        <rect x="50" y="402" width="110" height="44" rx="6" fill="none" stroke="#1D9E75" strokeWidth="0.5" />
        <text x="105" y="420" textAnchor="middle" fill="#0F6E56" style={{ font: `12px ${MONO}` }}>
          S4 h: a3f2...
        </text>
        <text x="105" y="436" textAnchor="middle" fill="#085041" style={{ font: `12px ${MONO}` }}>
          P = 0.61
        </text>

        <rect x="174" y="402" width="110" height="44" rx="6" fill="none" stroke="#534AB7" strokeWidth="0.5" />
        <text x="229" y="420" textAnchor="middle" fill="#3C3489" style={{ font: `12px ${MONO}` }}>
          S3 h: 7c19...
        </text>
        <text x="229" y="436" textAnchor="middle" fill="#26215C" style={{ font: `12px ${MONO}` }}>
          P = 0.24
        </text>

        <rect x="298" y="402" width="110" height="44" rx="6" fill="none" stroke="#888780" strokeWidth="0.5" />
        <text x="353" y="420" textAnchor="middle" fill="#5F5E5A" style={{ font: `12px ${MONO}` }}>
          S5 h: 2d88...
        </text>
        <text x="353" y="436" textAnchor="middle" fill="#444441" style={{ font: `12px ${MONO}` }}>
          P = 0.10
        </text>

        <rect x="422" y="402" width="110" height="44" rx="6" fill="none" stroke="#888780" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.5" />
        <text x="477" y="420" textAnchor="middle" opacity="0.4" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>
          S2 h: ...
        </text>
        <text x="477" y="436" textAnchor="middle" opacity="0.4" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>
          P = 0.05
        </text>

        <text x="570" y="424" textAnchor="middle" opacity="0.35" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>
          pruned
        </text>
        <text x="570" y="440" textAnchor="middle" opacity="0.35" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>
          (below epsilon)
        </text>

        <text x="340" y="469" textAnchor="middle" opacity="0.5" style={{ fill: TEXT_SECONDARY, font: `12px ${MONO}` }}>
          if d(S_t+1, E[S_t+1]) &gt; epsilon -&gt; structurally inconsistent transition detected
        </text>
      </svg>

      <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "14px 0 6px", fontSize: "13px", color: TEXT_SECONDARY, fontFamily: MONO }}>
        <label style={{ minWidth: "130px" }}>Epistemic confidence (T10)</label>
        <input
          type="range"
          min="0"
          max="100"
          value={confidence}
          onChange={(event) => setConfidence(Number(event.target.value))}
          style={{ flex: 1, accentColor: "#38bdf8" }}
        />
        <span style={{ minWidth: "36px", textAlign: "right", fontSize: "13px", color: TEXT_PRIMARY }}>
          {model.conf.toFixed(2)}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "6px 0", fontSize: "13px", color: TEXT_SECONDARY, fontFamily: MONO }}>
        <label style={{ minWidth: "130px" }}>Conflict intensity (T15)</label>
        <input
          type="range"
          min="0"
          max="100"
          value={conflict}
          onChange={(event) => setConflict(Number(event.target.value))}
          style={{ flex: 1, accentColor: "#38bdf8" }}
        />
        <span style={{ minWidth: "36px", textAlign: "right", fontSize: "13px", color: TEXT_PRIMARY }}>
          {model.conf2.toFixed(2)}
        </span>
      </div>

      <div style={{ marginTop: "10px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <span style={pillStyle("rgba(29,158,117,0.15)", "#9fe3cc")}>
          dominant: {model.dominantLabel} · P={model.dominantProbability.toFixed(2)}
        </span>
        <span style={pillStyle("rgba(26,37,48,0.9)", TEXT_SECONDARY)}>
          Z (normalisation): {model.z.toFixed(2)}
        </span>
        <span
          style={pillStyle(
            model.anomaly ? "rgba(216,90,48,0.18)" : "rgba(26,37,48,0.9)",
            model.anomaly ? "#ffb19b" : TEXT_SECONDARY,
          )}
        >
          consistency: {model.anomaly ? "anomaly detected" : "ok"}
        </span>
      </div>
    </div>
  );
}
