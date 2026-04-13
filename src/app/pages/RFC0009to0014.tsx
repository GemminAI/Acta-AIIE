import { DocPage, Section, SectionTitle, Body, BulletList, CodeBlock, Divider, InfoBox } from "../components/DocPage";
import { DocHeader } from "../components/DocHeader";

// ─── RFC-0009 (Revised 2026-04-13) ────────────────────────────────────────
export function RFC0009() {
  return (
    <DocPage>
      <DocHeader
        docId="RFC-0009"
        title="Narrative Curvature and Information Statistical Mechanics"
        subtitle="Hybrid framework: least-action geodesics modulated by Information Temperature and Boltzmann distribution"
        status="STABLE (Revised)"
        version="2026-04-13"
        author="Tomohiko Nakamura, Gemmina Intelligence LLC."
        compliance="Depends on RFC-0001 · RFC-0007 · RFC-0008"
      />

      <Section num="1">
        <SectionTitle>Abstract</SectionTitle>
        <Body>
          This RFC formalizes Narrative Curvature κ and its integration with Information Statistical Mechanics. While curvature defines the deterministic path (geodesic) of a narrative in state space 𝓜, real-world social systems exhibit stochastic fluctuations driven by information influx. By introducing Information Temperature (T) and the Boltzmann Distribution, we establish a hybrid framework where narrative trajectories are the result of a least-action principle modulated by thermal noise. This allows for the formal calculation of Prediction Error (ε) not as a failure of the model, but as a measurable thermodynamic property of the information field.
        </Body>
      </Section>

      <Divider />

      <Section num="2">
        <SectionTitle>Mathematical Definition of Curvature</SectionTitle>
        <CodeBlock lang="math">
{`Narrative Curvature:
  κ(t) = d²/dt² · d(s_a(t), s_b(t))

Equation of Motion:
  d̈(t) = −κ(t) · d(t)

  κ < 0  →  Convergent: "Information Gravity" (consensus attractor)
  κ = 0  →  Flat: independent narrative evolution
  κ > 0  →  Divergent: "Excited States" (PCE ignition)

Discrete Curvature Estimation:
  κ̂_t = (d_{t+1} − 2d_t + d_{t-1}) / (Δt)²`}
        </CodeBlock>
      </Section>

      <Divider />

      <Section num="3">
        <SectionTitle>Narrative Statistical Mechanics</SectionTitle>
        <Body>
          We define Information Temperature as the rate of information volatility — the variance of the narrative field. In a high-temperature state, narratives are highly susceptible to fluctuations and deviate from their deterministic geodesics.
        </Body>
        <CodeBlock lang="math">
{`Information Temperature:
  T ∝ d/dt |ℐ(t)|
  where |ℐ| is the interaction strength (RFC-0003)

Boltzmann Distribution of Narrative States:
  P(s) = (1/Z) · exp(−E(s) / k_B · T)

  E(s):  Potential energy of state s — divergence from consensus baseline (RFC-0001)
  k_B:   Gemmina-Boltzmann constant (calibrated empirical constant)
  Z:     Partition function — ensures Σ P(s) = 1

Interpretation:
  Low T   →  Narratives settle into "ground state" (consensus)
  High T  →  Distribution flattens; "excited states" (PCE ignition) become probable`}
        </CodeBlock>
      </Section>

      <Divider />

      <Section num="4">
        <SectionTitle>Fluctuation-Dissipation Theorem for Narratives</SectionTitle>
        <Body>
          The Prediction Error (ε) observed in the Analyzer (Main.py) is formally linked to narrative curvature κ via the Fluctuation-Dissipation relation.
        </Body>
        <CodeBlock lang="math">
{`⟨ε²⟩ ~ 2 k_B T / γ

  γ:  Narrative Viscosity — resistance of the field to change

Physical Insight:
  The "noise" observed in tagging is not random — it is a reflection of the
  underlying temperature of the event.
  High-curvature events (κ ≪ 0) effectively "cool" the system by forcing
  consensus, reducing the prediction error ε.`}
        </CodeBlock>
      </Section>

      <Divider />

      <Section num="5">
        <SectionTitle>Narrative Entropy and Relaxation</SectionTitle>
        <CodeBlock lang="math">
{`Narrative Entropy:
  S = −k_B Σ P(s) ln P(s)
  Measures disorder / uncertainty within a narrative cluster.

Relaxation Process (post massive information injection):
  dS/dt ≤ 0   (toward equilibrium)

  1. Entropy spikes on high-mass event injection (chaos phase)
  2. System cools as narrative converges toward new geodesic
  3. Confirms "Gravitational Collapse" (T28) tendency over time`}
        </CodeBlock>
      </Section>

      <Divider />

      <Section num="6">
        <SectionTitle>Implementation Guidelines for Analyzer (Main.py)</SectionTitle>
        <BulletList items={[
          { label: "Calculate ε (Prediction Error)", content: "Treat ε as the \"Thermal Residual\" — a thermodynamic property, not a model failure." },
          { label: "Assign Temperature T", content: "Use the density of incoming articles per unit time (T06) to estimate local field temperature." },
          { label: "Boltzmann Weighting (RAG)", content: "When performing RAG on the Knowledge Base, weight results by exp(−ΔSIV/T) to prioritize energetically stable states within the current context." },
        ]} />
      </Section>

      <Divider />

      <Section num="7">
        <SectionTitle>Connection to RFC-0008 (PNLA)</SectionTitle>
        <Body>
          The Lagrangian ℒ of RFC-0008 is now interpreted as a Free Energy functional. Minimizing the action S[Φ] is equivalent to minimizing the Free Energy F.
        </Body>
        <CodeBlock lang="math">
{`Free Energy:
  F = E − T·S

  Minimizing S[Φ]  ≡  Minimizing F

The realized narrative path is the one that balances:
  - Energy minimization (following the deterministic curvature field)
  - Entropy maximization (incorporating new information)`}
        </CodeBlock>
        <InfoBox>
          <em>"The deterministic path is the skeleton; the thermal fluctuation is the breath. To understand the narrative, one must calculate both the gravity of the past and the heat of the present."</em>
          <br />— Gemmina Intelligence LLC., Pure Information Laboratory
        </InfoBox>
      </Section>
    </DocPage>
  );
}

// ─── RFC-0010 ──────────────────────────────────────────────────────────────
export function RFC0010() {
  return (
    <DocPage>
      <DocHeader
        docId="RFC-0010"
        title="Quantum Narrative Entanglement (QNE)"
        subtitle="Actor-Based Model — Bell-CHSH Criterion for non-local actor synchronization"
        status="HYPOTHESIS"
        version="2026-04-12"
        author="Tomohiko Nakamura, Gemmina Intelligence LLC."
        compliance="Depends on RFC-0006 · RFC-0008 · RFC-0009"
      />

      <Section num="1">
        <SectionTitle>Abstract</SectionTitle>
        <Body>
          This RFC proposes the hypothesis of Quantum Narrative Entanglement (QNE) at the Actor Level (T07). We define entanglement as the non-separability of state vectors belonging to distinct, causally disconnected actors across T01 Namespaces. By adapting the Bell-CHSH Inequality to the discrete state space of T07, we provide a testable criterion for detecting non-classical, non-local synchronization of actor-states.
        </Body>
        <InfoBox accent>
          Status: HYPOTHESIS. Empirical validation (Bell-AIIE test) required before ratification. Predicted threshold: |S_CHSH| &gt; 2 in at least one geopolitically correlated actor pair.
        </InfoBox>
      </Section>

      <Divider />

      <Section num="2">
        <SectionTitle>Bell-AIIE Criterion (T07-Based CHSH)</SectionTitle>
        <CodeBlock lang="math">
{`Actor-State Non-Separability:
  |Ψ_AB⟩ ≠ |ψ_A⟩ ⊗ |ψ_B⟩

Binarized Observables:
  σ_A(â) = sign(T07_A · â − θ) ∈ {−1, +1}
  σ_B(b̂) = sign(T07_B · b̂ − θ) ∈ {−1, +1}

CHSH Parameter:
  S_CHSH = E(â,b̂) − E(â,b̂') + E(â',b̂) + E(â',b̂')

Bell-AIIE Criterion:
  |S_CHSH| ≤ 2     →  Classical correlation (shared context sufficient)
  |S_CHSH| > 2     →  QNE confirmed (non-local actor synchronization)
  |S_CHSH| = 2√2   →  Maximum quantum entanglement (Tsirelson bound)`}
        </CodeBlock>
      </Section>

      <Divider />

      <Section num="3">
        <SectionTitle>Validation Protocol (v3.2 Target)</SectionTitle>
        <BulletList items={[
          { label: "Actor pair selection", content: "Identify pairs (A, B) in disconnected namespaces with no direct information channel." },
          { label: "Observable definition", content: "Define four settings (â, â', b̂, b̂') from T07 dimensions." },
          { label: "Binarization", content: "Apply threshold θ = τ* = 0.02 (RFC §2.8 objective threshold)." },
          { label: "Predicted outcome", content: "US Federal Reserve ↔ Bank of Japan during synchronized rate decisions expected to show |S_CHSH| > 2." },
        ]} />
        <InfoBox>
          <em>"When two actors are entangled, the collapse of one narrative wavefunction is felt instantaneously across namespaces — not through information transfer, but through the structure of the field itself."</em>
          <br />— Gemmina Intelligence LLC.
        </InfoBox>
      </Section>
    </DocPage>
  );
}

// ─── RFC-0011 ──────────────────────────────────────────────────────────────
export function RFC0011() {
  return (
    <DocPage>
      <DocHeader
        docId="RFC-0011"
        title="Narrative Field Control"
        subtitle="External Control Inputs for PCE suppression and structural stability guidance"
        status="DRAFT"
        version="2026-04-12"
        author="AIIE Standardization Committee, Gemmina Intelligence LLC."
        compliance="Depends on RFC-0001 · RFC-0002 · RFC-0003 · RFC-0004"
      />

      <Section num="1">
        <SectionTitle>Non-Manipulation Constraint (Foundational Axiom)</SectionTitle>
        <Body>
          Control MUST NOT determine the direction of a narrative. Control acts only upon the energy distribution and interaction structure.
        </Body>
        <CodeBlock lang="Permitted vs Prohibited Operations">
{`PERMITTED:
  - Suppression of excessive ΔV amplification
  - Shortening of φ (phase lag)
  - Reconnection of ℐ (interaction graph)
  - Mitigation of entropy gradients ∇H

PROHIBITED:
  - Forced selection of specific narratives
  - Intentional generation of bias
  - Artificial rewriting of s_core`}
        </CodeBlock>
      </Section>

      <Divider />

      <Section num="2">
        <SectionTitle>Control Field Definition</SectionTitle>
        <CodeBlock lang="math">
{`Base equation:
  ℐ'_ij = ℐ_ij + 𝒰_ij

Field decomposition:
  𝒰_ij = u_A · Δ𝒜_ij + u_φ · Δφ_ij + u_V · ΔV_ij

Objective:
  min(∇H + λ₁ΔV + λ₂φ)

Field Energy Budget Constraint:
  Σ|𝒰_ij| / Σ|ℐ_ij| ≤ ε
  External intervention MUST remain infinitesimal relative to intrinsic field energy.`}
        </CodeBlock>
      </Section>

      <Divider />

      <Section num="3">
        <SectionTitle>Stabilization Policies</SectionTitle>
        <BulletList items={[
          { label: "Anti-Divergence Control", content: "If ΔV_ij ≥ 0.7: dampen 𝒜_ij and shorten φ_ij." },
          { label: "Anti-Resonance Control", content: "If ΔV_ij ≈ 0 ∧ φ_external ≫ 0: forcibly increase 𝒜 with external nodes (echo chamber suppression)." },
          { label: "Phase Unlock Control", content: "If φ_ij > θ_lag: compress the lag to release the system from stale states." },
          { label: "Pre-Ignition Damping (PCE)", content: "If PCE ignition conditions are met: dampen ∇H and lower 𝒯 below critical threshold." },
          { label: "Post-PCE Guided Relaxation", content: "Dampen v(t) and assist convergence toward stable path 𝒲*." },
        ]} />
      </Section>
    </DocPage>
  );
}

// ─── RFC-0012 ──────────────────────────────────────────────────────────────
export function RFC0012() {
  return (
    <DocPage>
      <DocHeader
        docId="RFC-0012"
        title="Control Governance Layer"
        subtitle="Authority model and security constraints for RFC-0011 control inputs"
        status="DRAFT"
        version="2026-04-12"
        author="AIIE Standardization Committee, Gemmina Intelligence LLC."
        compliance="Depends on RFC-0011"
      />

      <Section num="1">
        <SectionTitle>Foundational Axiom</SectionTitle>
        <InfoBox accent>
          "Control without Governance = Weapon."
        </InfoBox>
      </Section>

      <Divider />

      <Section num="2">
        <SectionTitle>Control Authority Model</SectionTitle>
        <CodeBlock lang="Authority Layers">
{`C0 — Autonomous Stabilizer (GemminAI SDK)
  Authority:   PCE suppression only
  Constraint:  ‖𝒰‖ ≤ ε_auto

C1 — Human-in-the-Loop (Certified Operator)
  Authority:   Structural anomaly mitigation
  Constraint:  ‖𝒰‖ ≤ ε_human; requires ΔV report + pre-simulation

C2 — Systemic Override (AIIE Governance Body)
  Authority:   Prevent system collapse
  Constraint:  ‖𝒰‖ ≤ ε_max; requires multi-sig approval + full disclosure`}
        </CodeBlock>
      </Section>

      <Divider />

      <Section num="3">
        <SectionTitle>Stability Function and Permission Protocol</SectionTitle>
        <CodeBlock lang="math">
{`Stability Function:
  𝒮 = −(α𝒯 + βH + γΔV)
  Maximum 𝒮 = maximum stability.

All control operations MUST satisfy:
  Δ𝒮 > 0  (stability must increase)

Control Permission Gate:
  1. Pre-Check:    Verify ΔV, PCE status, evaluate the option of doing nothing.
  2. Simulation:   Output predicted changes in ΔV, 𝒯, and H.
  3. Decision Gate: Execute only if Δ𝒮 > 0.`}
        </CodeBlock>
      </Section>

      <Divider />

      <Section num="4">
        <SectionTitle>Abuse Detection and Security</SectionTitle>
        <BulletList items={[
          { label: "Weaponization Signal", content: "If ΔT > 0 while control is applied → trigger 'Malicious Control Suspected' alert." },
          { label: "Narrative Authoritarianism Prevention", content: "If ΔV_diversity < −θ_suppress following a control event → flag as potential authoritarianism." },
          { label: "Reality Hijacking Defense", content: "If ℱ distortion is detected without Δ𝒮 > 0 outcome → invalidate control action and log to T25 audit trail." },
        ]} />
      </Section>
    </DocPage>
  );
}

// ─── RFC-0013 ──────────────────────────────────────────────────────────────
export function RFC0013() {
  return (
    <DocPage>
      <DocHeader
        docId="RFC-0013"
        title="Narrative Identity and Persistence"
        subtitle="Event attractors, proper time, and linguistic independence of state_hash"
        status="DRAFT"
        version="2026-04-12"
        author="AIIE Standardization Committee, Gemmina Intelligence LLC."
        compliance="Depends on RFC-0001 · RFC-0003"
      />

      <Section num="1">
        <SectionTitle>Event as Attractor</SectionTitle>
        <CodeBlock lang="math">
{`Event definition:
  E_k = Attractor(𝒮)
  lim_{τ→∞} s(τ) = E_k  (in proper time τ derived from T06)

Identity Condition:
  Two states s_a, s_b belong to the same event if:
  ΔV(s_a, s_b) < θ_identity   (recommended: θ = 0.15)

Narrative Speed:
  v = ΔV / Δτ_proper
  v high → rapid change (viral escalation, structural collapse)
  v low  → stable evolution (long-term geopolitical drift)`}
        </CodeBlock>
      </Section>

      <Divider />

      <Section num="2">
        <SectionTitle>Identity Persistence and Forking</SectionTitle>
        <CodeBlock lang="math">
{`Drift (Identity Maintained):
  d(ΔV)/dτ_proper < ε  →  slow change, same identity

Fork (New Event Generated):
  d(ΔV)/dτ_proper ≫ 0  →  rapid change, fork occurs

PCE as Velocity Runaway:
  v > v_critical

Temporal Relativity:
  dτ = √(1 + 0.5v² + 0.2a²) · √(max(0.1, 1 − U_total))
  Different narratives experience different rates of time.`}
        </CodeBlock>
      </Section>

      <Divider />

      <Section num="3">
        <SectionTitle>Linguistic Independence and Lineage</SectionTitle>
        <Body>
          Identity is verified by the system's ability to maintain the same T25 state_hash across JP/EN representations — validated in GemminAI production (JP/EN switch, April 2026).
        </Body>
        <CodeBlock lang="json">
{`{
  "event_id": "evt_YYYYMMDD_XXXX",
  "parent": "evt_YYYYMMDD_PREV",
  "children": ["evt_YYYYMMDD_A", "evt_YYYYMMDD_B"],
  "merge_from": null,
  "fork_reason": "delta_v_exceeded_theta_split",
  "proper_time_elapsed": 3.42
}`}
        </CodeBlock>
      </Section>
    </DocPage>
  );
}

// ─── RFC-0014 ──────────────────────────────────────────────────────────────
export function RFC0014() {
  return (
    <DocPage>
      <DocHeader
        docId="RFC-0014"
        title="Narrative Reality Selection"
        subtitle="Boltzmann selection of realized narrative via Free Energy minimization"
        status="DRAFT"
        version="2026-04-12"
        author="AIIE Standardization Committee, Gemmina Intelligence LLC."
        compliance="Depends on RFC-0004 · RFC-0008 · RFC-0013"
      />

      <Section num="1">
        <SectionTitle>Reality as Emergent Minimum</SectionTitle>
        <Body>
          The system selects the narrative that minimizes Free Energy. The state with the least structural strain becomes reality.
        </Body>
        <CodeBlock lang="math">
{`Free Energy:
  ℱ(s) = 𝒯(s) + λH(s)

Boltzmann Selection:
  P(s) = exp(−ℱ(s)/T) / Z
  Z = Σ_s exp(−ℱ(s)/T)

Reality Lock-in (T → 0):
  P(s) → δ(s − s*)
  The realized narrative becomes nearly irreversible (crystallization).`}
        </CodeBlock>
      </Section>

      <Divider />

      <Section num="2">
        <SectionTitle>Equivalence with PNLA (RFC-0008)</SectionTitle>
        <CodeBlock lang="Dual Characterization">
{`Dynamic (PNLA):    δS = 0          →  Path of stationary action
Statistical:       argmin ℱ        →  State of minimum free energy

P(Φ) ∝ exp(−S[Φ] / ℏ_I)

Both formulations select the same realized trajectory Φ*.`}
        </CodeBlock>
      </Section>

      <Divider />

      <Section num="3">
        <SectionTitle>Security: Reality Hijacking Defense</SectionTitle>
        <BulletList items={[
          { label: "Risk", content: "Artificial distortion of ℱ to favor a specific narrative." },
          { label: "RFC-0006 Governance", content: "QFOM namespace auditing." },
          { label: "Control Budget Limits", content: "RFC-0012: ‖𝒰‖ ≤ ε." },
          { label: "T25 Full Auditing", content: "SHA-256/JCS seal on all state transitions." },
          { label: "Stability Function Gate", content: "RFC-0012 §3: Δ𝒮 > 0 required for all control operations." },
        ]} />
      </Section>
    </DocPage>
  );
}
