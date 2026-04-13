import { DocPage, Section, SectionTitle, Body, BulletList, CodeBlock, Divider, InfoBox } from "../components/DocPage";
import { DocHeader } from "../components/DocHeader";

export function RFC0008() {
  return (
    <DocPage>
      <DocHeader
        docId="RFC-0008"
        title="PNLA — Principle of Narrative Least Action"
        subtitle="Computable Narrative Lagrangian over 35TAG state variables"
        status="STABLE"
        version="2026-04-12"
        author="Tomohiko Nakamura, Gemmina Intelligence LLC."
        compliance="Depends on RFC-0001 · RFC-0005 · RFC-0006 · RFC-0007"
      />

      <Section num="1">
        <SectionTitle>Purpose</SectionTitle>
        <Body>
          This RFC formalizes the Principle of Narrative Least Action (PNLA) as a fully computable inference mechanism. The Narrative Lagrangian is defined explicitly in terms of 35TAG state variables, transitioning PNLA from a conceptual analogy to an implementable algorithm for trajectory selection.
        </Body>
        <InfoBox accent>
          Empirical validation: Weibull hazard function fit over 37,817 narrative pairs confirms non-Markovian memory (ΔAIC=28,953 vs. Exponential; shape parameter β=0.78 &lt; 1), consistent with least-action path dynamics.
        </InfoBox>
      </Section>

      <Divider />

      <Section num="2">
        <SectionTitle>Narrative Lagrangian</SectionTitle>
        <CodeBlock lang="math">
{`Kinetic Term (Narrative Propagation Momentum):
  K_t = α · ‖T07_t − T07_{t−1}‖² / (Δt_t)²
  Interpretation: Rate at which actors shift strategic position.

Potential Term (Contextual Constraint Field):
  V_t = β·T22_t + γ·T19_t + δ·ΔV_t
  T22 ∈ [0,1]: informational entropy (RFC-0005)
  T19 ∈ [0,1]: Conflict Factuality Index penalty
  ΔV_t:         narrative divergence from attractor (RFC-0001)
  Interpretation: Friction from ambiguity, contradiction, structural inconsistency.

Full Narrative Lagrangian:
  ℒ_t = K_t − V_t`}
        </CodeBlock>
      </Section>

      <Divider />

      <Section num="3">
        <SectionTitle>Least Action Path Selection</SectionTitle>
        <CodeBlock lang="math">
{`Action Functional:
  S[Φ] = Σ_t ℒ_t · Δt_t

Least Action Path:
  Φ* = argmin_{Φ_k} S[Φ_k]

Causal Admissibility Constraint (QFOM coupling):
  |A_t|² = |⟨Ψ_total,t | Ô_t | Ψ_{i,t}⟩|² ≥ ε
  If |A_t|² < ε → trajectory pruned as physically inadmissible.

Entropy-Action Coupling:
  ∂S[Φ]/∂T22 > 0
  Higher entropy states necessarily increase total action → less likely to be selected.`}
        </CodeBlock>
      </Section>

      <Divider />

      <Section num="4">
        <SectionTitle>Equivalence with Boltzmann Selection</SectionTitle>
        <CodeBlock lang="math">
{`P(Φ) ∝ exp(−S[Φ] / ℏ_I)

Dual characterization:
  Dynamic formulation:    δS = 0  (stationary action)
  Statistical formulation: argmin ℱ  (Boltzmann free energy minimization)

Both formulations select the same realized trajectory Φ*.`}
        </CodeBlock>
        <InfoBox>
          <em>"The realized narrative is not chosen arbitrarily — it is the path of least resistance through the contextual field."</em>
          <br />— Gemmina Intelligence LLC.
        </InfoBox>
      </Section>
    </DocPage>
  );
}
