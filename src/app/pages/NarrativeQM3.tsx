import { DocPage, Section, SectionTitle, Body, BulletList, CodeBlock, Divider, InfoBox } from "../components/DocPage";
import { DocHeader } from "../components/DocHeader";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const MONO = "'JetBrains Mono', monospace";

function StatTable({ rows }: { rows: { label: string; value: string; note: string }[] }) {
  return (
    <div style={{ margin: "16px 0", border: "1px solid #1a2530", overflow: "hidden" }}>
      {rows.map((row, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 2fr", background: i % 2 === 0 ? "#070a0d" : "#080c10", borderTop: i > 0 ? "1px solid #1a2530" : "none" }}>
          <div style={{ padding: "8px 14px", fontFamily: MONO, fontSize: "11px", color: "#8098ae" }}>{row.label}</div>
          <div style={{ padding: "8px 14px", fontFamily: MONO, fontSize: "11px", color: "#38bdf8", borderLeft: "1px solid #1a2530" }}>{row.value}</div>
          <div style={{ padding: "8px 14px", fontFamily: MONO, fontSize: "10px", color: "#3d5a72", borderLeft: "1px solid #1a2530" }}>{row.note}</div>
        </div>
      ))}
    </div>
  );
}

export function NarrativeQM3() {
  return (
    <DocPage>
      <DocHeader
        docId="QMNSO-v3.1"
        title="Narrative Quantum Mechanics 3.1"
        subtitle="Quantum-Formalism Narrative State Observation: Empirical Causal Inference in Geopolitical Information Fields"
        status="PEER-REVIEW"
        version="2026-04-12"
        author="Tomohiko Nakamura — Gemmina Intelligence LLC. / Pure Information Laboratory"
        compliance="35TAG v6.0.1 · RFC-0005 · RFC-0006 · RFC-0007 · RFC-0008"
      />

      <Section num="0">
        <SectionTitle>Abstract</SectionTitle>
        <Body>
          We propose QMNSO v3.1 (Quantum-Formalism Narrative State Observation), a unified framework refining narrative analysis from stochastic generation to empirical causal inference. The formalism is used strictly as a mathematical language — not as a physical claim.
        </Body>
        <InfoBox accent>
          Dataset: 4,729 narratives · 854 geopolitical events · 2026-03-05 to 2026-04-12 · Validated against T25 state hashes · github.com/GemminAI/GemminAI_Public
        </InfoBox>
        <BulletList items={[
          { label: "V3", content: "Non-Markovian memory (Weibull ΔAIC=28,953; β=0.78) after explicit removal of platform-induced propagation delays." },
          { label: "F4", content: "Structured interference (p=0.0002; H_pair > H_noise) — a result classical models cannot reproduce without an interference term." },
          { label: "§2.8", content: "Objective core extraction via information-theoretic threshold τ* derived from mutual information maximization (τ*=0.02)." },
        ]} />
      </Section>

      <Divider />

      <Section num="2.1">
        <SectionTitle>Quantum-Formalism Mapping</SectionTitle>
        <CodeBlock lang="35TAG v6.0.1 → QFOM (RFC-0006 RATIFIED)">
{`T01  permanent_id          →  Observational namespace (prefix = coordinate system)
T02  subject_origin        →  Initial observation basis |Ψᵢ⟩
T03  predicate_type        →  Transition operator Ô
T04  object_entity         →  Interference Image I(x) = |Ψ_total|²
T06  time_frame            →  Spacetime coordinate (t, Δt)
T22  informational_entropy →  Wave function spread H₀ ∈ [0,1]`}
        </CodeBlock>
      </Section>

      <Divider />

      <Section num="2.6">
        <SectionTitle>Computable Lagrangian — 35TAG Expansion</SectionTitle>
        <CodeBlock lang="math">
{`K_t = α · ‖T07_t − T07_{t-1}‖² / (Δt)²
V_t = β·T22 + γ·T19 + δ·ΔV

S[Φ] = argmin Σ_t ℒ_t · Δt_t   with |A_t|² ≥ ε

P(Φ) ∝ exp(−S[Φ] / ℏ_I)  [Boltzmann equivalence]

Φ* minimizes S[Φ] = 0.94. Φ_bad pruned (|A|² < ε).
Bifurcation point shows T22 spike.`}
        </CodeBlock>
        <Body>
          This contrasts with stochastic token sampling: the system evaluates entire trajectories before selecting a physically admissible minimum-action path.
        </Body>
      </Section>

      <Divider />

      <Section num="2.8">
        <SectionTitle>Objective Core Extraction — Threshold τ Derivation</SectionTitle>
        <Body>
          The stability operator threshold τ for extracting s_core is defined as the solution to an information-theoretic optimization problem — eliminating subjectivity entirely.
        </Body>
        <CodeBlock lang="math">
{`τ* = argmax_τ [ I(s_core(τ); S) − λ · Collision(τ) ]

where I(·) is mutual information, S is the full state distribution.
Implemented as: I = H(S) − H(S | s_core(τ))`}
        </CodeBlock>
        <StatTable rows={[
          { label: "Optimal threshold τ*", value: "0.02", note: "4,729 narratives, 7 numeric dimensions" },
          { label: "State hash stability", value: "0.74", note: "Plateau region confirms robustness" },
          { label: "Hash collision rate", value: "0.26", note: "" },
          { label: "Information retention", value: "0.92", note: "" },
        ]} />
        <figure style={{ margin: "20px 0 0" }}>
          <ImageWithFallback
            variant="docDark"
            src="/figures/figure6_tau_sensitivity.png"
            alt="Figure 6: mutual information and collision trade-off versus τ (sensitivity around τ*=0.02)"
            style={{ width: "100%", height: "auto", display: "block", border: "1px solid #1a2530", borderRadius: "4px" }}
          />
          <figcaption style={{ marginTop: "10px", fontFamily: MONO, fontSize: "11px", color: "#6b8fa3" }}>
            Figure 6 — Threshold τ sensitivity: mutual information vs. collision trade-off (plateau near τ*=0.02).
          </figcaption>
        </figure>
      </Section>

      <Divider />

      <Section num="2.9">
        <SectionTitle>Necessity of Quantum Formalism Beyond Classical Models</SectionTitle>
        <CodeBlock lang="Classical vs. Empirical">
{`Classical model prediction (independent or weakly correlated states):
  H_pair ≤ H_noise

Empirical observation:
  H_pair > H_noise  (p=0.0002)  ← classical prediction VIOLATED

This violation requires an interference term absent in classical models:
  |Ψ_total|² = |Ψ_1|² + |Ψ_2|² + 2·Re(Ψ_1* Ψ_2)

The cross-term 2Re(Ψ_1*Ψ_2) is the origin of the Excited State — no classical analogue.`}
        </CodeBlock>
        <InfoBox accent>
          The quantum formalism is therefore not an analogy, but a necessary extension to represent cross-narrative coupling.
        </InfoBox>
      </Section>

      <Divider />

      <Section num="3.1">
        <SectionTitle>V3: Non-Markovian Memory — Weibull Hazard Function</SectionTitle>
        <StatTable rows={[
          { label: "Weibull (k=2)", value: "AIC 796,189", note: "Non-Markovian — BEST FIT" },
          { label: "Log-Normal (k=2)", value: "AIC 805,486", note: "ΔAIC = 9,297" },
          { label: "Exponential (k=1)", value: "AIC 825,141", note: "ΔAIC = 28,953 — Memoryless — REJECTED" },
        ]} />
        <Body>
          After removing platform-induced delays (RSS ~15min, news aggregators ~1–4hr), the Weibull shape parameter β=0.78 &lt; 1 persists — confirming that the decaying memory is an intrinsic property of the narrative field, not an artifact of distribution infrastructure.
        </Body>
        <figure style={{ margin: "20px 0 0" }}>
          <ImageWithFallback
            variant="docDark"
            src="/figures/figure3_hazard.png"
            alt="Figure 3: Weibull hazard and survival curves for inter-event gaps (non-Markovian memory)"
            style={{ width: "100%", height: "auto", display: "block", border: "1px solid #1a2530", borderRadius: "4px" }}
          />
          <figcaption style={{ marginTop: "10px", fontFamily: MONO, fontSize: "11px", color: "#6b8fa3" }}>
            Figure 3 — Weibull hazard function: non-Markovian memory (β&lt;1) after deconfounding platform delays.
          </figcaption>
        </figure>
      </Section>

      <Divider />

      <Section num="3.2">
        <SectionTitle>F4: Excited State — Structured Interference</SectionTitle>
        <StatTable rows={[
          { label: "Pair mean (SIV variance)", value: "0.0501", note: "Higher divergence in co-observed events" },
          { label: "Noise mean (SIV variance)", value: "0.0357", note: "Random baseline" },
          { label: "Difference", value: "+0.0143", note: "Systematic amplification" },
          { label: "p-value (permutation, n=5,000)", value: "0.0002", note: "Highly significant" },
          { label: "Effect size (Cliff's delta)", value: "0.12 (small)", note: "Robust across 854 events" },
        ]} />
        <figure style={{ margin: "20px 0 0" }}>
          <ImageWithFallback
            variant="docDark"
            src="/figures/figure4_entropy.png"
            alt="Figure 4: pair vs noise entropy distributions (structured interference)"
            style={{ width: "100%", height: "auto", display: "block", border: "1px solid #1a2530", borderRadius: "4px" }}
          />
          <figcaption style={{ marginTop: "10px", fontFamily: MONO, fontSize: "11px", color: "#6b8fa3" }}>
            Figure 4 — Excited state (F4): structured interference (H_pair &gt; H_noise; p=0.0002).
          </figcaption>
        </figure>
      </Section>

      <Divider />

      <Section num="4">
        <SectionTitle>System Architecture</SectionTitle>
        <BulletList items={[
          { label: "Stage 1", content: "RSS ingestion, T09 cosine deduplication." },
          { label: "Stage 2 — Read Before Write", content: "Prior state_hash + T06 injected. Non-Markovian transitions enforced at system level." },
          { label: "Stage 3", content: "T25 = SHA-256(JCS(T01-T34)). Immutable anchor. τ*=0.02 applied to NUM_COLS for core extraction." },
          { label: "Stage 4", content: "Boltzmann selection P(Φ) ∝ exp(−S[Φ]/ℏ_I), collapse, counterfactual memory (T29-T30)." },
        ]} />
      </Section>

      <Divider />

      <Section num="6">
        <SectionTitle>Conclusion</SectionTitle>
        <BulletList items={[
          { label: "1", content: "Non-Markovian memory (post-deconfounding; ΔAIC=28,953; β=0.78)." },
          { label: "2", content: "Structured interference (p=0.0002; H_pair > H_noise — classical models falsified)." },
          { label: "3", content: "Objective core extraction (τ*=0.02 from mutual information maximization)." },
          { label: "4", content: "Computable Lagrangian (§2.6) — PNLA as discrete sum over 35TAG variables." },
          { label: "5", content: "Least-action path selection — physically admissible trajectory crystallization." },
        ]} />
        <InfoBox accent>
          QMNSO does not merely analyze narratives — it defines the coordinate system in which narrative reality becomes computable.
        </InfoBox>
        <InfoBox>
          <em>"Observation is the sovereign computational process of generating an interference image from overlapping waves of possibility using a unique reference frame."</em>
          <br />— Gemmina Intelligence LLC., Pure Information Laboratory
        </InfoBox>
      </Section>
    </DocPage>
  );
}
