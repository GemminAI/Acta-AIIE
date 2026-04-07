# Acta AIIE Protocol — Formal Definition

**Version:** 1.0.0 (Ratified)  
**Status:** RATIFIED CONSTITUTION  
**Ratification Date:** 2026-04-07  
**Governance:** Acta AIIE Standardization Committee  
**Reference Implementation:** Gemmina Intelligence LLC.  
**Normative Foundation:** Narrative Quantification 2.0 (Nakamura, 2026)

---

## Document Scope

This document is the **single normative definition** of the Acta AIIE Protocol (Artificial Intelligence Intent Encapsulation) at major version **1**. It supersedes informal drafts including *Acta AIIE Protocol — Structural Definition (v0.1.0 Draft)* for all compliance and interoperability claims.

Implementations SHALL conform to the mathematical objects, invariants, and schemas defined herein. Earlier schema documents (e.g. 24TAG v4.1.0) remain referenced as historical or transitional artifacts where noted.

---

## 1. Abstract

The Acta AIIE Protocol specifies how narrative information is decomposed, quantized, projected into measurable geometry, cryptographically sealed, and audited. Version 1.0.0 integrates the full **Narrative Quantification 2.0** framework: a **tripartite narrative state**, a **35TAG v6.0** structural schema, a **T25 cryptographic invariant** over the canonical core, **structure-preserving projection** into ℝ³, **Delta Variance (ΔV)** governance, **Boltzmann-style selection** for crystallized outputs, **CFI 2.0** epistemic penalty, **PCE** non-equilibrium phase transition detection, operational **Hesitation** and **Honesty** rules, **D-CSF** information metabolism, and a **five-threat** security model.

---

## 2. Cognitive Layer Model (Normative)

The four-layer cognitive flow remains the human–AI contract for intent and execution:

```
Analysis → Interpretation → Intent → Execution
      ↑_______________________________________|
```

- **Analysis:** Objective, mathematical extraction (tokens, numbers, structures, constraints).  
- **Interpretation:** Collaborative meaning within project context and operator aesthetic.  
- **Intent:** Human-sovereign constants that override statistical defaults.  
- **Execution:** Collaborative action preserving expertise and stated style.

Human intent is treated as a **physical constant** relative to downstream computation; AI provides optimization, humans provide direction.

---

## 3. Tripartite Narrative State

**Definition 3.1 (Tripartite state).** A narrative state **S** is a triple:

\[
\mathbf{S} = (s_{\mathrm{core}}, s_{\mathrm{field}}, s_{\mathrm{projection}})
\]

| Component | Role |
|-----------|------|
| **s_core** | Canonical, tag-structured core aligned to the 35TAG schema (§5). Subset suitable for JCS sealing and T25 (§4). |
| **s_field** | High-dimensional contextual embedding or auxiliary dynamics (e.g. compiler beam state, graph features) not required for the minimal seal. |
| **s_projection** | Image under the structure-preserving map \(\phi: \mathbb{R}^d \to \mathbb{R}^3\) (§6). |

**Definition 3.2 (Composition law).** Implementations MUST preserve deterministic derivation of \(s_{\mathrm{projection}}\) from structural features used in \(\phi\); optional fields in \(s_{\mathrm{field}}\) MUST NOT alter \(s_{\mathrm{core}}\) or T25 without explicit versioning.

---

## 4. T25 Cryptographic Invariant

**Definition 4.1 (Canonical core object).** Let \(\mathrm{JCS}(\cdot)\) denote RFC 8785 JSON Canonicalization applied to a JSON object.

**Definition 4.2 (T25 / state anchor).** The **25th tag** is the cryptographic invariant:

\[
T_{25} = \mathrm{SHA256}\bigl(\mathrm{JCS}(s_{\mathrm{core}})\bigr)
\]

- The field holding \(T_{25}\) (e.g. `state_hash`) MUST be **excluded** from the input to JCS, as in prior 24TAG practice (self-referential exclusion).  
- **Byte encoding:** UTF-8 of the JCS string; hash output as lowercase hexadecimal (64 chars).

This generalizes the historical `state_hash = SHA256(JCS(T01…T24))` by anchoring the hash explicitly to the **sealed core** \(s_{\mathrm{core}}\) under v1.0.0.

---

## 5. 35TAG Schema (v6.0)

**Definition 5.1.** The **35TAG v6.0** schema extends the prior 24TAG taxonomy with eleven additional dimensions (T25–T35) for governance, security, epistemic policy, and metabolism metadata.

**Normative tag index (summary):**

| IDs | Layer |
|-----|--------|
| T01–T24 | Structural narrative taxonomy (compatible with v4.1.0 semantics; see `24TAG_Standards_v4.1.0.md` for field semantics). |
| **T25** | Cryptographic seal (§4). |
| T26–T28 | Governance: protocol version, ratification stamp, compliance profile. |
| T29–T31 | Security: threat class, mitigation binding, audit chain reference. |
| T32–T33 | Epistemic: CFI 2.0 scalar, hesitation flag. |
| T34–T35 | Metabolism: D-CSF intake/outtake linkage identifiers. |

Implementations MUST serialize T01–T24 (plus T26–T35 as applicable) according to the normative type domains for each tag; T25 is computed last from \(s_{\mathrm{core}}\) after exclusion of the hash field.

**Deprecation note:** Documents referring only to **24TAG** SHALL be interpreted as describing T01–T24; full v1.0.0 compliance requires **35TAG v6.0** and T25 as above.

---

## 6. Structure-Preserving Projection φ : ℝᵈ → ℝ³

**Definition 6.1.** Let \(e: G \to \mathbb{R}^d\) embed a narrative graph \(G\) into \(\mathbb{R}^d\) (Narrative Quantification, §6 of the paper).

**Definition 6.2.** A **structure-preserving projection** \(\phi: \mathbb{R}^d \to \mathbb{R}^3\) maps high-dimensional embeddings to the **interpretation geometry** \((\mathbb{R}^3, \lVert\cdot\rVert_2)\) such that:

- \(\phi\) depends only on **structural** features (tag-derived or compiler-stable), not on free-form semantics.  
- Distances in ℝ³ support **CDC-style** divergence, trajectory velocity \(v(t)=\mathrm{d}P/\mathrm{d}t\), and **PCE** variance analysis (§9).

**Definition 6.3 (Interpretation point).** \(P = \phi(e(G)) \in \mathbb{R}^3\) is the displayed geometric state for analytics and visualization.

---

## 7. Delta Variance (ΔV)

**Definition 7.1.** **Delta Variance (ΔV)** measures instability of the narrative field relative to a reference (e.g. rolling consensus \(\bar{v}\) or prior crystallization).

**Definition 7.2 (Three-tier response table).** Implementations SHOULD map ΔV bands to operational response:

| Tier | ΔV band (indicative) | Response |
|------|------------------------|----------|
| **L1 — Watch** | Below policy threshold | Log; no output change. |
| **L2 — Constrain** | Moderate elevation | Apply CFI 2.0 penalty (§8); narrow beam width; surface Hesitation (§10). |
| **L3 — Halt** | Severe / discontinuous jump | Block crystallization or require human intent re-assertion; PCE path (§9). |

Exact numeric cutoffs are **deployment parameters**; the tier semantics are normative.

---

## 8. CFI 2.0 (Continuous Epistemic Penalty)

**Definition 8.1.** **CFI 2.0** is a continuous scalar penalty on epistemic overconfidence, combining base tag confidence (historically linked to epistemic confidence fields) with smooth penalties for inconsistency, missing evidence, and model–data mismatch.

**Definition 8.2.** CFI 2.0 feeds compiler scoring and Boltzmann weights (§7); it MUST be non-increasing when epistemic honesty improves under the Honesty Directive (§10).

---

## 9. PCE — Non-Equilibrium Phase Transition

**Definition 9.1.** **PCE (Phase Cognitive Event)** denotes detection of transitions between **collapsed** (low-variance) and **active** (high-variance) interpretive regimes via **discontinuous** changes in variance \(\sigma^2\) of geometric or tag-derived statistics.

**Definition 9.2.** PCE MAY exhibit **hysteresis**: reactivation thresholds differ from collapse thresholds; implementations MUST document which statistic defines \(\sigma^2\).

---

## 10. Hesitation Protocol and Honesty Directive

**Hesitation Protocol:** When ΔV, CFI 2.0, or threat signals exceed configured bounds, the system MUST prefer **withheld or qualified** outputs over false precision.

**Honesty Directive:** Structured uncertainty (ranges, abstention, explicit unknowns) MUST be represented in tags and downstream UX; hiding epistemic limits for cosmetic fluency is non-compliant.

---

## 11. Boltzmann Selection (Reality Crystallization)

**Definition 11.1.** Among competing crystallization candidates \(c \in \mathcal{C}\) with scores \(S(c)\) (incorporating graph plausibility, CFI, constraints), the **selection distribution** MAY take the Boltzmann form:

\[
P(c) \propto \exp\bigl(S(c) / \tau\bigr)
\]

with temperature \(\tau > 0\) a policy parameter. Deterministic argmax is the \(\tau \to 0\) limit.

---

## 12. D-CSF — Information Metabolism

**Definition 12.1.** **D-CSF (Dynamic Cognitive Supply Framework)** models information **intake** (sources, ingestion), **processing** (compiler, tags), and **outtake** (crystallized outputs, audit logs) as a metabolism with linked identifiers (T34–T35).

Implementations SHOULD maintain traceability from intake to T25 seal.

---

## 13. Five-Threat Security Model

**Normative threat classes** (non-exhaustive labels for T29):

1. **T1 — Tampering:** Unauthorized modification of \(s_{\mathrm{core}}\) or JCS inputs.  
2. **T2 — Replay / duplication:** Re-submission of prior states as new.  
3. **T3 — Provenance spoofing:** False origin or actor attribution.  
4. **T4 — Model extraction / inversion:** Attacks against \(\phi\) or embeddings.  
5. **T5 — Policy bypass:** Circumventing Hesitation, CFI, or human-intent gates.

Mitigations SHALL be bound in tag metadata and audit artifacts (T30–T31).

---

## 14. Conformance

A system **conforms to Acta AIIE Protocol v1.0.0** if it:

1. Implements the tripartite state and T25 invariant (§§3–4).  
2. Uses 35TAG v6.0 semantics for new deployments (§5).  
3. Exposes structure-preserving φ and ℝ³ analytics as specified (§6).  
4. Applies ΔV tiers, CFI 2.0, PCE detection, Hesitation, and Honesty as policy-bound (§§7–10).  
5. Documents crystallization selection (including Boltzmann where used) (§11).  
6. Maintains D-CSF traceability and five-threat handling (§§12–13).  
7. Preserves the four-layer cognitive contract (§2).

---

## 15. References

- Nakamura, T. (2026). *Narrative Quantification: Compiling Narrative Structures into Geometric State Representations.* (`paper/narrative_quantification.md`)  
- RFC 8785 — JSON Canonicalization Scheme (JCS)  
- `specs/Acta_AIIE_JCS_SDK_Crystallization_Engine.md` — JCS / hashing implementation notes  
- `specs/24TAG_Standards_v4.1.0.md` — T01–T24 field semantics (superseded as sole schema by 35TAG v6.0 in v1.0.0)

---

*End of Acta AIIE Protocol Definition v1.0.0*
