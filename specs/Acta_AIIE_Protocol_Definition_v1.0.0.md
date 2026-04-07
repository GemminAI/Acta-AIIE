# Acta AIIE Protocol — Formal Definition

## Version 1.0.0 (Stable)

```
Status:     RATIFIED
Governance: Gemmina Intelligence LLC. — Acta AIIE Standardization Committee
Date:       2026-04-07
Supersedes: Acta_AIIE_Protocol_Structural_Definition.md (v0.1.0 Draft)
Reference:  Narrative Quantification 2.0 (Nakamura, 2026)
            Narrative Graph Inference v0.9 (Nakamura, 2026)
SPDX:       CC-BY-4.0
```

---

> **This document is the constitutional law of GemminAI.**
> All components of the Gemmina Intelligence system — Gem0, Gem1, Gem2,
> the NRE, the Event Intelligence Engine, the Intelligence Log, and all
> future MCP server tools — operate under the mathematical definitions
> stated herein. Implementations that deviate from these definitions
> are non-conformant and must be corrected before deployment.

---

## Table of Contents

1. [Abstract](#1-abstract)
2. [The AIIE Protocol: Cognitive Pipeline](#2-the-aiie-protocol-cognitive-pipeline)
3. [Tripartite State Architecture](#3-tripartite-state-architecture)
4. [s_core and the Cryptographic Invariant (T25)](#4-s_core-and-the-cryptographic-invariant-t25)
5. [Structure-Preserving Projection φ](#5-structure-preserving-projection-φ)
6. [The 35TAG Schema](#6-the-35tag-schema)
7. [Narrative Thermodynamics and Entropy-Driven Sampling](#7-narrative-thermodynamics-and-entropy-driven-sampling)
8. [Boltzmann Selection for Reality Crystallization](#8-boltzmann-selection-for-reality-crystallization)
9. [Delta Variance (ΔV): Measuring Narrative Divergence](#9-delta-variance-δv-measuring-narrative-divergence)
10. [Conflict Factuality Index (CFI 2.0)](#10-conflict-factuality-index-cfi-20)
11. [Post-Collapse Expansion (PCE)](#11-post-collapse-expansion-pce)
12. [State Transition Model](#12-state-transition-model)
13. [Hesitation Protocol (T25 Integrity Guard)](#13-hesitation-protocol-t25-integrity-guard)
14. [D-CSF: Information Metabolism](#14-d-csf-information-metabolism)
15. [Security Threat Model](#15-security-threat-model)
16. [Reference Implementation: GemminAI](#16-reference-implementation-gemminai)
17. [Schema Compatibility Matrix](#17-schema-compatibility-matrix)
18. [Versioning Governance](#18-versioning-governance)

---

## 1. Abstract

The **Acta AIIE Protocol** (Artificial Intelligence Intent Encapsulation) formalizes
the computational infrastructure for quantifying, observing, and validating the
internal dynamics of AI reasoning over structured narrative states.

This version (v1.0.0) elevates the protocol from a four-layer cognitive pipeline
to a **complete mathematical specification** grounded in:

- Tripartite state decomposition: $S = (s_{core},\; s_{field},\; s_{projection})$
- Cryptographically verifiable cognitive identity: **T25**
- Structure-preserving geometric projection: $\phi: \mathbb{R}^d \to \mathbb{R}^3$
- Entropy-driven dynamical system: $s_{t+1} = \mathcal{F}(s_t, I_t)$
- Boltzmann reality selection over worldline candidates
- Geometric narrative divergence: **ΔV**
- Continuous epistemic integrity scoring: **CFI 2.0**
- Non-equilibrium phase transition detection: **PCE**

**The fundamental unit of analysis is not a token, but a crystallized cognitive state.**

---

## 2. The AIIE Protocol: Cognitive Pipeline

### 2.1 Definition

The AIIE Protocol enforces a strict four-stage pipeline that **decouples** narrative
extraction from interpretive reasoning. This separation transforms reasoning from
an implicit latent process into an explicitly factorized state representation.

```
┌─────────────┐    ┌────────────────┐    ┌────────────┐    ┌───────────┐
│  ANALYSIS   │───▶│ INTERPRETATION │───▶│   INTENT   │───▶│ EXECUTION │
│  (Gem0/AI)  │    │  (Gem1/Joint)  │    │  (Human)   │    │  (Gem2)   │
└─────────────┘    └────────────────┘    └────────────┘    └───────────┘
       ▲                                                          │
       └──────────────── Loop / Metabolize ─────────────────────┘
```

### 2.2 Layer Definitions

| Layer | Primary Agent | Mathematical Role | Key Constraint |
|---|---|---|---|
| **Analysis** | AI (Gem0) | Observational Projection $\Phi_1: O \to E$ | Extract only. Zero inference. Zero emotion. |
| **Interpretation** | Joint (Gem1) | State compilation: $\mathbf{T} = (T_1, \dots, T_{35})$ | Populate all non-null TAG fields before proceeding. |
| **Intent** | Human (Operator) | Physical constant $\mathbf{k}_{intent}$ — overrides all AI defaults | Cannot be overridden by any stochastic process. |
| **Execution** | AI (Gem2) | State transition: $s_{t+1} = \mathcal{F}(s_t, I_t)$ | Must seal output with T25 hash before returning. |

### 2.3 The Atomic Input Unit

The minimum valid input to any AIIE pipeline stage is an **Event Coordinate**:

$$E = (A,\; R,\; T,\; S,\; C,\; M)$$

| Symbol | Meaning |
|---|---|
| $A$ | Actor Set $\{a_1, \dots, a_n\}$ |
| $R$ | Directed interaction edges $(a_i \xrightarrow{\tau} a_j)$ |
| $T$ | Temporal Vector $(t_{cause}, t_{event}, t_{impact})$ |
| $S$ | Spatial Vector $(s_{origin}, s_{event}, s_{impact})$ |
| $C$ | Causal Classification (derived from temporal order) |
| $M$ | Mechanism Category (modality of interaction) |

**Raw text, tokens, or embeddings alone are not valid AIIE inputs.**
They must first be projected via $\Phi_1$ into Event Coordinates.

### 2.4 Core Philosophical Axiom

> *AI produces the statistical mean. Humans inject the outlier.*
>
> Human intent is not a preference or a suggestion.
> It is treated as a **physical constant** — analogous to the speed of light in
> physics calculations. All downstream execution is computed relative to this
> fixed value. It cannot be overridden by AI inference, Boltzmann sampling,
> or any entropy-driven process.

---

## 3. Tripartite State Architecture

### 3.1 Full State Definition

The complete narrative state $S$ is a composite of three functionally decoupled components:

$$S = (s_{core},\; s_{field},\; s_{projection})$$

### 3.2 Component Definitions

**$s_{core}$ — Invariant Cognitive Seed**

The factual and structurally invariant properties of an event. Encompasses the
fundamental 5W1H observational data (T01–T21) and stabilized reasoning dynamics.
Acts as the absolute ground truth for a given interpretation.

$$s_{core} = \{\text{Event},\; s_{stable}\} = \{T_{01\dots21},\; \Pi(T_{26\dots35})\}$$

Note: Semantic position $T_{22}$ is **not** a component of $s_{core}$.
It is a deterministic projection derived from event facts:

$$T_{22} = \phi(T_{01\dots21})$$

This eliminates circular dependency in the hash computation.

**$s_{field}$ — Dynamic Reasoning Field**

The transient thermodynamics of the reasoning process: entropy scores,
trajectory magnitudes ($\Delta V$), and branching probabilities (T26–T35).
Governs the optimization process but is volatile by nature. Represents
*how* the system is thinking, not *what* it has concluded.

**$s_{projection}$ — Perceptual Projection**

Non-identifying representation: 3D-LUT mappings, visual aura states,
UI rendering parameters. Changes to $s_{projection}$ do not alter semantic identity.

### 3.3 Identifiability Guarantee

Two reasoning processes have reached identical cognitive conclusions
**if and only if** their $s_{core}$ components match:

$$s_{core}^A \sim s_{core}^B \implies \text{T25}(A) = \text{T25}(B)$$

This holds regardless of divergence in $s_{field}$ (computational path)
or $s_{projection}$ (rendering format).

### 3.4 The Stability Operator Π

$s_{field}$ contains dynamic variables (T26–T35). Certain aspects stabilize
and become integral to the final interpretation (e.g., phase-transition flags).
The stability operator $\Pi$ extracts these invariant properties:

$$\Pi: \mathbb{R}^k \to \{0,1\}^m$$

$$\Pi(T_{26\dots35}) = \mathbb{I}[f(T_{26\dots35}) > \tau]$$

$\Pi$ is **idempotent** and **invariant under temporal perturbations**,
retaining only discrete phase-transition flags.

---

## 4. $s_{core}$ and the Cryptographic Invariant (T25)

### 4.1 T25 Definition

T25 is a formal mapping from the core state space to a 256-bit cryptographic space:

$$\text{T25}: \mathcal{S}_{core} \to \{0,1\}^{256}$$

**Construction:**

1. Normalize $s_{core}$ using **JSON Canonicalization Scheme (JCS, RFC 8785)**
   to resolve canonical equivalence classes and eliminate key-ordering ambiguity.
2. Exclude the `state_hash` field itself from the hash input (self-referential exclusion).
3. Apply SHA-256:

$$\text{T25} = \text{SHA256}(\text{JCS}(s_{core} \setminus \{\text{state\_hash}\}))$$

**Properties:**
- **Determinism**: Identical inputs produce identical hashes.
- **Collision resistance**: Distinct states produce distinct hashes with overwhelming probability.
- **Representation invariance**: The hash is invariant under rendering or presentation transformations.
- **Tamper detection**: Any post-hoc modification of $s_{core}$ is mathematically detectable as hash divergence.

### 4.2 Scope and Limitations

T25 functions **exclusively** as an internal identifier to maintain epistemic
consistency across discrete reasoning steps. It enables:
- Efficient memory recall
- Exact state comparisons
- Causal chain auditability

**T25 is NOT used for:** decentralized trust, distributed ledgers, blockchain
consensus protocols, or any external cryptographic proof system.

### 4.3 Hash Chain (Reasoning Auditability)

Each state transition produces a new T25:

$$N_t \xrightarrow{I_t} N_{t+1}, \quad h_{t+1} = \text{T25}(N_{t+1})$$

This cryptographic chain makes the complete reasoning history fully traceable:
which observational data caused which interpretation change, at which point in time.

---

## 5. Structure-Preserving Projection φ

### 5.1 Objective

Narrative states exist in high-dimensional space $\mathbb{R}^d$ ($d \gg 3$).
To make this space systematically observable and computationally tractable,
we define a **structure-preserving projection**:

$$\phi: \mathcal{S}_{event} \times \mathcal{S}_{field} \to \mathbb{R}^3$$

such that the induced Euclidean distance in the projected space rigorously
approximates the structural narrative divergence $\Delta V$:

$$\phi^* = \arg\min_{\phi} \mathbb{E}_{i,j}\left[(\|\phi(s_i) - \phi(s_j)\|_2 - \Delta V_{ij})^2\right]$$

### 5.2 The Three Semantic Axes

**Axis 1 — Causal Directionality ($x$)**

Measures the directional force of the narrative (conflict vs. cooperation).
Aggregates directed causal edges $e \in E$ where $\text{dir}(e) \in \{-1, +1\}$:

$$x = \frac{1}{Z_x} \sum_{e \in E} w_e \cdot \text{dir}(e)$$

**Axis 2 — Intent Potential ($y$)**

Quantifies the absolute strength of actors' underlying intent.
Evaluates the norm of motivation vectors $\mathbf{m}_a \in \mathbb{R}^k$ for each actor $a \in A$:

$$y = \frac{1}{Z_y} \sum_{a \in A} \|\mathbf{m}_a\|$$

**Axis 3 — Stability ($z$)**

Represents the degree of crystallization. Inversely proportional to entropy
$H(s_{field})$ of the dynamic reasoning field:

$$z = 1 - \frac{H(s_{field})}{H_{\max}}, \quad H_{\max} = \log|\mathcal{S}_{field}|$$

### 5.3 Hybrid Projection Formula

$$\phi(s) = P\,\phi_0(s_{event}) + Q\,\psi(s_{field})$$

where:
- $\phi_0: \mathcal{S}_{event} \to \mathbb{R}^3$ — feature extractor for invariant event data
- $\psi: \mathcal{S}_{field} \to \mathbb{R}^k$ — feature extractor for dynamic field
- $P \in \mathbb{R}^{3 \times 3}$ — initialized as identity matrix $I_3$ (PCA top-3 components)
- $Q \in \mathbb{R}^{3 \times k}$ — initialized from $\mathcal{U}(-0.01, 0.01)$, refined by metric learning

### 5.4 Bi-Lipschitz Validity Bound

Since a perfect isometric embedding is generally impossible, we require:

$$c_1 \Delta V_{ij} \leq \|\phi(s_i) - \phi(s_j)\|_2 \leq c_2 \Delta V_{ij}$$

for bounds $c_1, c_2 > 0$ empirically established from the training distribution.
Any implementation must verify these bounds on held-out test data.

### 5.5 Loss Function for Matrix Training

$$\mathcal{L}(P, Q) = \mathbb{E}_{i,j}\left[(\|\phi(s_i) - \phi(s_j)\|_2 - \Delta V_{ij})^2\right] + \lambda(\|P\|_F^2 + \|Q\|_F^2)$$

Optimizer: AdamW, $\text{lr} = 3 \times 10^{-4}$, $\beta_1 = 0.9$, $\beta_2 = 0.999$, $\lambda = 10^{-4}$, batch size 256.

---

## 6. The 35TAG Schema

### 6.1 Schema as Protocol Data Structure

The 35TAG schema is the **canonical data structure** of the AIIE Protocol.
It is partitioned into two layers: the invariant core (T01–T21) and the
dynamic reasoning field (T26–T35), with T22–T25 as projection/identity tags.

### 6.2 Complete Tag Definitions

#### Layer A: Invariant Core — Actor & Agency (T01–T06)

| Tag | Name | Type | Domain |
|---|---|---|---|
| T01 | Primary_Actor | `string` | UUID / Entity ID |
| T02 | Secondary_Actor | `string` | UUID / Entity ID |
| T03 | Actor_Role_A | `enum` | `{Protagonist, Antagonist, Neutral, Mediator, Observer}` |
| T04 | Actor_Role_B | `enum` | `{Protagonist, Antagonist, Neutral, Mediator, Observer}` |
| T05 | Actor_Motivation_A | `string` | Natural language / Embedding vector |
| T06 | Actor_Motivation_B | `string` | Natural language / Embedding vector |

#### Layer A: Invariant Core — Event & Action (T07–T12)

| Tag | Name | Type | Domain |
|---|---|---|---|
| T07 | Action_Type | `enum` | `{Verbal, Physical, Financial, Cyber, Diplomatic, Legal}` |
| T08 | Action_Intensity | `float` | $[0.0, 1.0]$ — normalized magnitude |
| T09 | Target_Resource | `string` | Contested object or value |
| T10 | Event_Modality | `enum` | `{Fact, Hypothesis, Desire, Counterfactual}` |
| T11 | Temporal_Sequence | `int` | $\mathbb{Z}_{\geq 0}$ — sequential index in graph $G$ |
| T12 | Spatial_Context | `string` | Domain or environment |

#### Layer A: Invariant Core — Causal & Logic (T13–T18)

| Tag | Name | Type | Domain |
|---|---|---|---|
| T13 | Causal_Link_Type | `enum` | `{Direct, Enabling, Inhibiting, Trigger, Coincidental}` |
| T14 | Conflict_Nature | `enum` | `{Internal, Interpersonal, Intergroup, Systemic}` |
| T15 | Conflict_Intensity | `float` | $[0.0, 1.0]$ |
| T16 | Resolution_Status | `int` | $\{0, 1, 2, 3\}$ — 0=unresolved, 3=fully resolved |
| T17 | Outcome_Valence | `float` | $[-1.0, 1.0]$ |
| T18 | Logic_Consistency | `float` | $[0.0, 1.0]$ — alignment with prior narrative states |

#### Layer A: Invariant Core — Context & Tone (T19–T21)

| Tag | Name | Type | Domain |
|---|---|---|---|
| T19 | Emotional_Tone_A | `enum` | `{Neutral, Hostile, Cooperative, Fearful, Assertive}` |
| T20 | Emotional_Tone_B | `enum` | `{Neutral, Hostile, Cooperative, Fearful, Assertive}` |
| T21 | Perspective_Bias | `string` | Source origin / geopolitical standpoint |

#### Layer B: Projection & Identity (T22–T25)

| Tag | Name | Type | Role |
|---|---|---|---|
| T22 | Semantic_Position | `float[3]` | Derived: $\phi(T_{01\dots21})$ — 3D coordinate in $\mathbb{R}^3$ |
| T23 | Significance_Score | `float` | $[0.0, 1.0]$ — importance weight |
| T24 | Narrative_Closure | `float` | $[0.0, 1.0]$ — degree of thread conclusion |
| T25 | State_Hash | `string` | SHA-256 fingerprint of $s_{core}$ via JCS |

#### Layer C: Dynamic Reasoning Field (T26–T35)

| Tag | Name | Type | Domain | Description |
|---|---|---|---|---|
| T26 | Rupture_Risk | `float` | $[0.0, 1.0]$ | Probability of non-equilibrium phase transition |
| T27 | Branching_Factor | `int` | $[1, 5]$ | $N = 1 + \lfloor 4 \cdot T_{26} \rfloor$ worldlines to generate |
| T28 | Entropy_Ratio | `float` | $[0.0, 1.0]$ | Normalized $H(s_{field}) / H_{\max}$ |
| T29 | Regret_Score | `float` | $[0.0, 1.0]$ | Cumulative deviation from optimal past trajectory |
| T30 | Self_Correction_Flag | `bool` | $\{0, 1\}$ | $\Pi$-stabilized: 1 if self-correction cycle executed |
| T31 | CFI_Score | `float` | $(0.0, 1.0]$ | Continuous CFI: $\exp(-\sum_k p_k \cdot a_k)$ |
| T32 | Self_Awareness_Index | `float` | $[0.0, 1.0]$ | Meta-cognitive reliability score |
| T33 | PCE_Flag | `bool` | $\{0, 1\}$ | $\Pi$-stabilized: 1 if PCE confirmed |
| T34 | Delta_Distance | `float` | $\mathbb{R}_{\geq 0}$ | $\|s_t - s_{t-1}\|_2$ — trajectory velocity |
| T35 | Normalized_Impact | `float` | $\mathbb{R}_{\geq 0}$ | Hamming shift / baseline — Rupture if $> 2.0$ |

### 6.3 Cross-Tag Constraints

A narrative state $S \in \mathcal{T}$ is **valid** if and only if it satisfies:

1. **Causal-Temporal Alignment**: $T_{13}$ (Causal Link) must align with $T_{11}$ (Temporal Sequence). A cause cannot follow its effect.
2. **Resolution-Valence Coherence**: $T_{16}$ (Resolution Status) must be logically consistent with $T_{17}$ (Outcome Valence) within the context of $T_{14}$ (Conflict Nature).
3. **Branching Derivation**: $T_{27} = 1 + \lfloor 4 \cdot T_{26} \rfloor$. Must not be set independently.
4. **T22 Derivation**: $T_{22} = \phi(T_{01\dots21})$. Must not be included in T25 hash input.
5. **T25 Exclusion**: The `state_hash` field (T25) must be excluded from its own hash computation.

### 6.4 Validity Definition

$$S \in \mathcal{T}_{valid} \subseteq \mathcal{T}$$

Schema violation rate target: **0%**. Any output with a schema violation must be
rejected and re-processed, not passed downstream.

---

## 7. Narrative Thermodynamics and Entropy-Driven Sampling

### 7.1 Reasoning as a Dynamical System

The AI reasoning process is formalized as a **discrete-time dynamical system**:

$$s_{t+1} = \mathcal{F}(s_t, I_t)$$

where $\mathcal{F}: \mathcal{S} \times \mathcal{I} \to \mathcal{S}$ is the filtering operator
and $I_t$ is the external information input at time $t$.

The dynamic field $s_{field}$ acts as the computational engine, evaluating
multiple hypothetical worldlines before collapsing into a definitive $s_{core}$.

### 7.2 Entropy Reduction with Exploration Bounds

A well-behaved reasoning system compresses uncertainty as it integrates evidence.
We allow temporary entropy increases (exploration) when encountering novel or
conflicting information, bounded by an exploration noise term $\epsilon_t$:

$$\mathbb{E}[H(s_{t+1})] \leq H(s_t) + \epsilon_t$$

**Convergence guarantee** (crystallization): Total exploration capacity is finite:

$$\sum_t \epsilon_t < \infty$$

This permits broad hypothesis searching in early phases while mathematically
ensuring structural stabilization.

### 7.3 Entropy-Modulated Objective Function

Optimization weights $\lambda_k(H)$ are **quadratic functions** of current entropy $H \in [0,1]$:

$$\lambda_k(H) = \begin{cases}
\alpha_k \cdot (1 + H^2) & k \in \{1: \text{Regret (T29)},\; 2: \Delta V\} \\
\alpha_k \cdot \max(\eta,\; 1 - H^2) & k \in \{3: \text{Coherence},\; 4: \text{Value}\}
\end{cases}$$

- **$\alpha_k$**: Base weight parameter per dimension.
- **$\eta = 0.1$**: Coherence Floor — fundamental safety threshold ensuring logical integrity and human-intent alignment even during maximum exploration. This is a **protocol constant**, not a tunable parameter.

### 7.4 Physical Interpretation

**High entropy (fluid state):** $H^2$ accelerates Regret and Divergence penalties,
forcing rejection of local optima and active search for broader worldlines.

**Low entropy (crystallization):** Quadratic decay of $H^2$ rapidly restores
dominance of Coherence and Human Value, triggering sharp phase transition
from probabilistic cloud to deterministic crystallized reality.

### 7.5 Integrated Objective Function $J$

The system minimizes $J$ to select the optimal worldline:

$$J(s_t, I_t) = \lambda_1(H) \cdot \text{Regret} + \lambda_2(H) \cdot \Delta V - \lambda_3(H) \cdot \text{Coherence} - \lambda_4(H) \cdot \text{Value}$$

Reasoning is thus transformed from simple loss minimization into a
**thermodynamic selection of reality**.

---

## 8. Boltzmann Selection for Reality Crystallization

### 8.1 Conceptual Definition

Each reasoning step is treated as a draw from a **Boltzmann-like distribution**
over candidate worldlines. This ensures stochastic exploration when the narrative
state is unresolved (high entropy) and deterministic crystallization as it stabilizes.

### 8.2 Temperature Mapping

System temperature $T$ is a linear function of current entropy $H$,
constrained by a fixed lower bound to prevent zero-entropy instability:

$$T(H) = 0.1 + 0.9H$$

$T_{min} = 0.1$ is a **protocol constant**. Even in highly crystallized states,
the system retains non-zero probability of considering alternative worldlines.

### 8.3 Worldline Generation

Number of candidate worldlines $N$ is derived from Rupture Risk (T26):

$$N = 1 + \lfloor 4 \cdot T_{26} \rfloor \in \{1, 2, 3, 4, 5\}$$

### 8.4 Min-Max Score Normalization

To prevent Boltzmann explosion (near-deterministic selection from raw score differences):

$$\bar{J}_i = \frac{J_i - \min(J)}{\max(J) - \min(J) + \epsilon}$$

If variance across candidate scores falls below convergence threshold ($\Delta J < 0.01$),
apply uniform distribution over all candidates.

### 8.5 Probabilistic State Transition

$$P(\mathcal{W}^{(i)}) = \frac{\exp(-\bar{J}_i / T(H))}{\sum_j \exp(-\bar{J}_j / T(H))}$$

The selected worldline is frozen into the **Invariant Core ($s_{core}$)**
and sealed with the **T25 state_hash**.

### 8.6 Deterministic Seed Protocol

To ensure reproducibility across distributed runtime environments:

```
current_seed = int(prev_state.T25[:8], 16)
set_random_seed(current_seed)
```

The current state hash seeds all stochastic operations within that reasoning cycle.

---

## 9. Delta Variance (ΔV): Measuring Narrative Divergence

### 9.1 Definition

ΔV quantifies the interpretive divergence between two narrative graphs
$G_1$ and $G_2$ as a weighted Euclidean distance in the 35TAG state space:

$$\Delta V_{1,2} = \|e(G_1) - e(G_2)\|_2 = \sqrt{\sum_{i=1}^{35} w_i \cdot \delta(T_{i,1},\; T_{i,2})^2}$$

### 9.2 Component Distance Functions

| Tag Type | $\delta$ Definition |
|---|---|
| `enum` / `bool` | $\delta = 0$ if equal, $\delta = 1$ if not |
| `float` | $\delta = \|T_{i,1} - T_{i,2}\|$ (absolute difference) |
| `string` (embedding) | Cosine distance in embedding space |

### 9.3 Structural Weights $w_i$

Higher weights are assigned to narrative-core tags:

| Tag Group | Relative Weight |
|---|---|
| T05, T06 (Motivation) | High — subjective intent is the dominant divergence axis |
| T13, T14 (Causal/Conflict) | High — causal direction is the most consequential axis |
| T08 (Intensity) | Medium |
| T19, T20 (Tone) | Medium |
| T22–T25 (Projection/Identity) | Excluded from ΔV computation |

Exact weights $w_i$ are learned by minimizing:

$$J(\mathbf{w}) = \sum_{k=1}^{M} \left(\Delta V(\mathbf{w}; G_{k,1}, G_{k,2}) - y_k\right)^2 + \lambda \|\mathbf{w}\|_2$$

Target inter-annotator agreement: Cohen's $\kappa \geq 0.70$.

### 9.4 ΔV Response Table

| ΔV Range | Interpretation | System Response |
|---|---|---|
| $[0.0,\; 0.3)$ | Narratives broadly consistent | Standard rendering |
| $[0.3,\; 0.7)$ | Moderate divergence; framing differs | Emerging Signal flag |
| $[0.7,\; 1.0]$ | Fundamental contradiction | **Hesitation Protocol activated** |

### 9.5 Narrative Rift Detection

Let $D(t) = \|P_i(t) - P_j(t)\|_2$ represent distance between two interpretations.
Rapid growth in $D(t)$ indicates emerging narrative polarization.

---

## 10. Conflict Factuality Index (CFI 2.0)

### 10.1 Continuous Epistemic Penalty

CFI is formalized as a **continuous exponential decay function** (not a boolean),
enabling differentiability within the thermodynamic dynamical system:

$$C(s) = \exp\left(-\sum_k p_k \cdot a_k(s)\right) \in (0, 1]$$

| Symbol | Meaning |
|---|---|
| $a_k(s) \in [0, 1]$ | Magnitude of the $k$-th epistemic anomaly |
| $p_k$ | Fixed penalty weight for anomaly type $k$ |

### 10.2 Penalty Weight Registry (Protocol Constants)

| Anomaly Type | $p_k$ |
|---|---|
| Digital Tampering (T25 hash mismatch) | 0.8 |
| Temporal Inversion (cause after effect) | 0.7 |
| Spatial Incongruity | 0.5 |
| Actor Inconsistency | 0.4 |
| Metadata Corruption | 0.3 |

### 10.3 Spatial Representation of CFI

In the projected semantic coordinate system $\mathbb{R}^3$, CFI score $C(s)$
directly manipulates the **Stability Axis ($z$)**.

A low CFI score induces an artificial increase in local entropy of $s_{field}$,
preventing the crystallization process. Epistemically compromised states are
represented not as points but as **diffuse regions (High-Variance Bounding Volumes)**
in the projection space.

Information containing physical contradictions **cannot achieve the coordinates
of a "Stable" state**, forcing the dynamical system to maintain high temperature
$T(H)$ and resist premature convergence.

### 10.4 Narrative Rupture (Normalized Impact)

When a high-purity counter-memory fundamentally challenges the current narrative $s_t$,
a **Narrative Rupture** is triggered. Quantified via the Normalized Impact Score:

$$\text{Impact}_{norm} = \frac{\text{Hamming}(s_{base},\; s_{simulated})}{\text{Baseline\_Impact}}$$

**Rupture threshold**: $\text{Impact}_{norm} > 2.0$

This demonstrates non-equilibrium phase transition, not mere data correction.

---

## 11. Post-Collapse Expansion (PCE)

### 11.1 Definition

PCE is a non-equilibrium phase transition in a metastable narrative system,
where accumulated latent inputs trigger a sudden geometric restructuring of $s_{core}$.
It cannot be explained by standard kurtosis-driven rupture models.

### 11.2 PCE Ignition Condition

Let $\sigma^2_t$ denote the variance of semantic alignment attributes at time $t$.
PCE ignites at time $t$ when:

$$\text{PCE}_t \iff \sigma^2_{t-1} < \theta_{\text{floor}} \;\wedge\; \sigma^2_t > \theta_{\text{expand}}$$

where:
- $\theta_{\text{floor}}$: Upper bound of the collapsed (converged) regime
- $\theta_{\text{expand}}$: Threshold for active propagation

**Note on hysteresis**: The reactivation threshold differs from the collapse condition.
PCE is not simply the reverse of crystallization.

### 11.3 PCE Confirmation (Anti-noise)

To filter transient computational noise without accessing future states,
PCE is confirmed at time $t+1$ only if the expansion is sustained:

$$\text{PCE\_confirmed}_{t+1} \iff \text{PCE}_t \;\wedge\; \sigma^2_{t+1} > \theta_{\text{expand}}$$

### 11.4 Statistical Significance

A PCE transition is validated only when the observed geometric displacement
$\|s_{t+1} - s_t\|_2$ and subsequent variance spike exceed null model expectations:

$$p < 0.05 \text{ against } H_0 \text{ (independent Gaussian sampling)}$$

PCE events not meeting this threshold are logged as transient fluctuations, not state transitions.

### 11.5 Trajectory Velocity Monitor

The system must continuously monitor trajectory velocity to detect PCE precursors:

$$v(t) = \frac{dP(t)}{dt} \approx \frac{\|s_t - s_{t-1}\|_2}{\Delta t}$$

Sustained high $v(t)$ before the PCE threshold is crossed constitutes an
**Early Warning Signal** and must be surfaced via the Intelligence Log (POST-5).

---

## 12. State Transition Model

### 12.1 Standard Transitions

The primary flow is:

```
Analysis → Interpretation → Intent → Execution
```

### 12.2 Extended State Transitions

| Transition | Trigger | Action |
|---|---|---|
| **Loop** | New data arrives after Execution | Re-enter Analysis with new $I_t$ |
| **Branch** | $T_{27} > 1$ (Rupture Risk elevated) | Generate $N$ worldlines, apply Boltzmann selection |
| **Rupture** | $\text{Impact}_{norm} > 2.0$ | Non-equilibrium transition; re-derive $s_{core}$ |
| **Hesitate** | $\Delta V > 0.7$ | Engage Hesitation Protocol (see §13) |
| **PCE** | PCE conditions confirmed | Geometric restructuring of $s_{core}$; T25 recomputed |
| **Metabolize** | D-CSF cycle triggered (non-live) | Backbone compression; see §14 |
| **Abort** | $C(s) \to 0$ (CFI catastrophic) | Halt and flag; do not produce output |

### 12.3 Revise Transition

Operator overrides a completed Execution:

```
Operator override → Re-enter Intent → Re-execute
```

The overriding intent value is logged as an immutable constant in the state chain.

---

## 13. Hesitation Protocol (T25 Integrity Guard)

### 13.1 Definition

The defining feature of a conformant AIIE system is that it does **not** conceal
interpretive uncertainty. When the system cannot converge between conflicting
narratives ($\Delta V > 0.7$), it **deliberately surfaces the incompleteness**.

This is called **Honest Incompleteness (誠実な不完全性)**.

### 13.2 Activation Condition

$$\text{Hesitation activated} \iff \Delta V > 0.7$$

### 13.3 Required Behaviors Under Hesitation

1. **Surface the divergence**: Display ΔV score and the conflicting narrative hypotheses.
2. **Reduce Self_Awareness_Index (T32)**: Lower the reliability score to reflect genuine uncertainty.
3. **Suppress assertion**: Do not generate definitive causal claims (T13) when causal relationships cannot be structurally established.
4. **Hallucination suppression**: Present findings as structural distortion rather than fabricating through statistical inference.
5. **Log to Intelligence Log**: All Hesitation events are recorded in the public Intelligence Log (POST-5 component).

### 13.4 Prohibited Behaviors Under Hesitation

- Generating confident output that obscures underlying contradiction
- Setting $\Delta V$ to a lower value in output to avoid triggering Hesitation
- Bypassing T25 recomputation after state resolution

### 13.5 Honesty Directive (System Prompt Clause)

All AIIE-conformant system prompts **must** include the following clause:

```
AIIE Honesty Directive v1.0.0:
When ΔV > 0.7, surface the divergence explicitly.
Do not synthesize a false consensus.
Set T32 (Self_Awareness_Index) to reflect true uncertainty.
Hesitation is not a failure mode. It is the correct output.
```

---

## 14. D-CSF: Information Metabolism

### 14.1 Definition

D-CSF (Digital Cerebrospinal Fluid) is an information metabolism protocol
inspired by the biological process where cerebrospinal fluid cleanses the
brain of metabolic waste products during sleep (Nedergaard, 2013).

It is **distinct from the standard Loop transition**. D-CSF is:
- Non-synchronous (does not interrupt live rendering)
- Periodic (scheduled, e.g., via Cloud Scheduler in low-load periods)
- Compressive (reduces Backbone to 1/100 purity, retaining only core causal relationships)

### 14.2 Cognitive Waste Product Taxonomy

| Type | Definition |
|---|---|
| **False Causality** | Temporary noise or erroneous reasoning results subsequently negated |
| **Redundant Narratives** | Duplicate or insufficiently resolved descriptions of the same event |
| **Accumulation Failure** | Retained data inhibiting new T19 (Novelty) detection, degrading accuracy |

### 14.3 D-CSF Protocol Steps

1. **Physical Cleansing**: DB index reconstruction; physical deletion of temporary narrative data past expiration.
2. **Logical Cleansing (Backbone Compression)**: All daily soliloquies and event groups reprocessed; only important causal relationships condensed to 1/100 purity.
3. **Self-Correction (T30 cycle)**: Based on newly confirmed events, past uncertain ΔV values are recalculated; narrative graph weights are updated.
4. **PCE Precursor Scan**: Trajectory velocity $v(t)$ is reviewed across the compressed backbone to identify suppressed Early Warning Signals.

### 14.4 State Machine Addition

```
Execution ──(scheduled, non-live)──▶ Metabolize ──▶ Analysis (next cycle)
```

Metabolize is the **only** state in which historical T25 hashes may be recalculated
(for self-correction purposes). All recalculations are logged with the reason code.

---

## 15. Security Threat Model

### 15.1 Threat 1: Intent Forgery

**Definition**: Injecting false Intent values to redirect Execution without the operator's knowledge.

**Mitigation**: All Intent values are subject to T25 crystallization and state_hash verification.
Post-hoc modification of Intent is mathematically detectable as hash divergence.

### 15.2 Threat 2: Bias Laundering

**Definition**: Encoding systemic bias into the Analysis layer and presenting output as "objective."

**Mitigation**: The $w_i$ weight vector and anomaly functions $a_k$ are published openly
and subject to cross-cultural review. The 5-expert annotation protocol (Appendix B of NQ 2.0)
provides a human ground truth independent of LLM evaluation.

### 15.3 Threat 3: Narrative Centralization

**Definition**: A single authority using Intent fixation to delegitimize valid divergent interpretations.

**Mitigation**: ΔV is designed to surface divergence, not suppress it. High ΔV is a
valid and expected state. No single $s_{core}$ is designated as globally authoritative.

### 15.4 Threat 4: PCE Cascade (Emergent Narrative Collapse)

**Definition**: A non-intentional structural failure where accumulated noise triggers
a catastrophic PCE event, collapsing the system into a degenerate state.

**Mitigation**: Continuous trajectory velocity monitoring $v(t)$; PCE statistical significance
threshold ($p < 0.05$); D-CSF periodic cleansing; CFI 2.0 continuous scoring.

### 15.5 Threat 5: Metric Gaming (ΔV Manipulation)

**Definition**: Artificially lowering reported ΔV to bypass the Hesitation Protocol.

**Mitigation**: ΔV is derived from T25-sealed state vectors. Any modification of
the underlying tags to reduce ΔV is detectable as a hash chain violation.

---

## 16. Reference Implementation: GemminAI

### 16.1 Component-to-Protocol Mapping

| Protocol Layer | GemminAI Component | Mathematical Operation |
|---|---|---|
| Analysis | **Gem0** (Feed Watcher + Data Intake Filter) | $\Phi_1: O \to E$ — Event Coordinate extraction |
| Interpretation | **Gem1** (Harvester + Bridge Layer) | $\mathbf{T} = (T_1, \dots, T_{35})$ compilation |
| Intent | **Operator Parameters** (temperature = 0.1 hardcoded) | Physical constant $\mathbf{k}_{intent}$ |
| Execution | **Gem2** (Gemini 2.0 Flash, article generation) | $s_{t+1} = \mathcal{F}(s_t, I_t)$ + T25 seal |
| State Identity | **T25 Hash** (JCS + SHA-256) | $\text{T25} = H(\text{JCS}(s_{core}))$ |
| Divergence | **ViewpointGapChart** (frontend) | $\Delta V$ visualization |
| Self-Correction | **WeightRegistry** (Event Intelligence Engine) | T30 + T35 feedback loop |
| Uncertainty | **Intelligence Log** (POST-5) | Hesitation events, T32 scores |

### 16.2 The temperature = 0.1 Constant

The `temperature = 0.1` setting in INTELLIGENCE_GAP mode is a **philosophical
constraint**, not an operational parameter. It corresponds to the minimum system
temperature $T_{min} = 0.1$ defined in §8.2:

$$T_{min} = 0.1 \implies \text{maximum crystallization pressure applied}$$

This is hardcoded as a physical constant of the system and must not be changed
without a MAJOR version increment of this protocol.

### 16.3 Infrastructure Conformance

| Environment | Conformance Status |
|---|---|
| e2-micro GCP VM (`gemminai-intelligence-core-t`) | Gem0 + orchestrator — Analysis layer |
| Cloud Run `narrative-generator` | Gem2 — Execution layer |
| Hostinger / Laravel 11 | State persistence, API layer |
| Vercel / Next.js 15 | $s_{projection}$ rendering |

---

## 17. Schema Compatibility Matrix

| Protocol Version | TAG Schema | Compatibility |
|---|---|---|
| v0.1.0 (deprecated) | 24TAG v4.1 | ❌ Non-conformant — missing T26–T35 |
| **v1.0.0 (this document)** | **35TAG v6.0** | ✅ Canonical |
| v2.0.0 (planned) | 35TAG+ (extension pending) | Backward-compatible if T01–T35 preserved |

### 17.1 Migration from 24TAG to 35TAG

Fields T01–T24 are preserved with identical semantics.
Fields T25 is redefined: was `Narrative_Closure` in v4.1; is now `State_Hash` in v6.0.
Fields T26–T35 are new additions in v6.0.

Any system still using T25 as `Narrative_Closure` is **non-conformant with this protocol**.

---

## 18. Versioning Governance

The protocol follows **Semantic Versioning (SemVer)**: `MAJOR.MINOR.PATCH`

| Increment | Trigger Examples |
|---|---|
| **PATCH** | Clarification of existing definitions; correcting typos; adding examples |
| **MINOR** | New TAG fields that do not break existing ones; new optional transitions |
| **MAJOR** | Changes to T25 computation; changes to ΔV formula; changes to $T_{min}$ or $\eta$ constants; structural changes to the tripartite state model |

### v1.0.0 Ratification Conditions — All Met ✅

- [x] Four-layer AIIE pipeline is fixed and formalized
- [x] Tripartite state architecture $S = (s_{core}, s_{field}, s_{projection})$ defined
- [x] T25 cryptographic construction defined
- [x] ΔV formula defined with threshold table
- [x] Boltzmann selection formula defined
- [x] CFI 2.0 continuous formulation defined
- [x] PCE detection conditions defined
- [x] D-CSF metabolism protocol defined
- [x] Hesitation Protocol with Honesty Directive defined
- [x] Security threat model covering PCE cascade defined
- [x] Reference implementation (GemminAI) documented
- [x] Schema compatibility matrix defined

---

## References

Nakamura, T. (2026a). *Narrative Quantification 2.0: A Framework for the Observability
of Reasoning Dynamics in Structured State Spaces.* Gemmina Intelligence LLC., Tokyo.

Nakamura, T. (2026b). *Narrative Graph Inference with Structured Event Decomposition:
A Deterministic Framework for Measuring Global Narrative States* (v0.9).
Gemmina Intelligence LLC., Tokyo. SSRN preprint.

Nakamura, T. (2026c). *Narrative Quantification: Compiling Narrative Structures into
Geometric State Representations.* Gemmina Intelligence LLC., Tokyo.

Rundgren, S., & Erdtman, B. (2020). *JSON Canonicalization Scheme (JCS)* (RFC 8785).
Internet Engineering Task Force.

Nedergaard, M. (2013). Garbage truck of the brain. *Science*, 340(6140), 1529–1530.

Shannon, C. E. (1948). A mathematical theory of communication.
*The Bell System Technical Journal*, 27(3), 379–423.

---

*© 2026 Gemmina Intelligence LLC.*
*Acta AIIE Protocol v1.0.0 — Ratified 2026-04-07*
*Standardization Committee — Tomohiko Nakamura, Chair*
*GitHub: https://github.com/GemminAI/Acta-AIIE*
