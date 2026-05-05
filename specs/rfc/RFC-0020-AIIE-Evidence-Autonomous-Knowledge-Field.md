# RFC-0020: Evidence — Autonomous Knowledge Field (v4.1)

| Field | Value |
|-------|-------|
| **ID** | RFC-0020 |
| **Version** | 4.1 |
| **Status** | Canonical |
| **Date** | 2026-05-04 |
| **Authors** | Gemmina Intelligence LLC. — Pure Information Laboratory |
| **Language** | EN |
| **Supersedes** | RFC-0020 v4.0 |
| **Updates** | RFC-0000 (Constitution §10), RFC-0018 (CFI) |
| **Updated by** | RFC-0021 v4.0 (EGEM), RFC-0025 v4.0 (Error Handling) |
| **Dependencies** | 35TAG Standards v6.0, RFC-0022 (CDR), RFC-0024 (Valency) |
| **Experiment** | Experiment-001 Minimal Pair Validation (N=50, 2026-05-04) |

---

## 0. Design Philosophy: Acquisition of Sovereign Autonomy

Through v3.0, the Evidence Field delegated the determination of mass $M_i$ to **human approval**. Version 4.1 fully dissolves this dependency, transitioning to a design where the system **autonomously emerges mass** from internal dynamics.

> **"The authority of Evidence does not arise from human approval. Gravity resides in structures where opposing observers converge on the same skeleton, where future reality does not contradict, and where the structure functions as the hub of the knowledge graph."**

This design directly corresponds to RFC-0000 Article 10 (Learning as Field Adaptation). The TAGs themselves do not change; what adapts autonomously is the shape of the field — which Evidence holds how much mass.

| Role | v3.0 | v4.1 |
|------|------|------|
| Determining $M_i$ | Human assigns $w_i$ directly | System computes autonomously |
| Geopolitical Frame dictionary | None | **Annual maintenance (Slow HITL)** |
| Quality verification | Full approval | Sampling verification (amplification only, non-mandatory) |
| Shadow result merge | Human judgment | Automatic (CDR minimum-cost survivor) |

---

## 1. Emergent Semantic Mass

### 1.1 Mass Equation

The mass $M_i$ of each evidence $e_i \in \mathcal{E}$ is defined as the **geometric mean** of three autonomously computed factors:

$$\boxed{M_i = \left[\, \mathrm{Orth}(e_i)^{\,\alpha} \cdot \mathrm{PredSurv}(e_i,\,\Delta\tau)^{\,\beta} \cdot \mathrm{Topo}(e_i)^{\,\gamma} \,\right]^{\!\frac{1}{\alpha+\beta+\gamma}}}$$

| Parameter | Initial Value | Meaning |
|-----------|--------------|---------|
| $\alpha$ | 1.0 | Weight of orthogonality |
| $\beta$ | 1.5 | Weight of predictive survival (highest priority) |
| $\gamma$ | 1.0 | Weight of topological centrality |

**Why geometric mean (not simple product):** The three factors correlate (high Topo → more source references → high Orth). Simple product $A \times B \times C$ produces double-counting of correlated information. Geometric mean takes the average of the log-sum of each factor, structurally suppressing over-estimation from correlation.

---

### 1.2 Factor 1: Orthogonality (Observational Basis Orthogonality)

$$\mathrm{Orth}(e_i) = 1 - \exp\!\left(-\kappa \cdot N_{\perp}(e_i)\right)$$

- $N_{\perp}(e_i)$: Count of sources that converge on the same TAG28/LINK+ skeleton (invariant hash) as $e_i$, belonging to **different T20 Frames**
- $\kappa$: Sensitivity parameter (initial value = 0.7)

#### T20 Frame Dictionary (Backbone Media Registry)

A dictionary classifying media outlets by nationality, capital affiliation, and political stance:

| Frame ID | Classification | Representative Media |
|----------|----------------|---------------------|
| `F_WEST_LIBERAL` | Western liberal democracy | BBC, Reuters, AP, NYT |
| `F_WEST_CONSERVATIVE` | Western conservative | Fox News, The Telegraph |
| `F_GLOBAL_SOUTH` | Global South / Non-aligned | Al Jazeera, CGTN (independent bracket) |
| `F_RUSSIA_STATE` | Russian state media | RT, TASS, Sputnik |
| `F_CHINA_STATE` | Chinese state media | Xinhua, People's Daily |
| `F_GULF_STATE` | Gulf state media | Al Arabiya, Gulf News |
| `F_LATAM` | Latin American independent | Telesur, Folha de S.Paulo |

**Slow HITL (annual update) design philosophy:** Media geopolitical stance is a "structural plate" that does not shift daily. Annual human updates prevent runtime performance impact, noise-induced orthogonality judgment drift, and realize RFC-0000 §10 "field adaptation" through the dictionary rather than TAG changes.

| Source Combination | Judgment | $N_{\perp}$ Contribution |
|-------------------|----------|--------------------------|
| BBC + Reuters | Same Frame (`F_WEST_LIBERAL`) | **0** (not counted) |
| BBC + RT | Different Frames | **+1** |
| BBC + Al Jazeera + CGTN | 3 Different Frames | **+3** (maximum acceleration) |

---

### 1.3 Factor 2: PredictiveSurvival (Causal Predictive Grounding)

*"Truth is the structure that generates the fewest contradictions (CFI spikes) against future observations."*

$$\mathrm{PredSurv}(e_i, \Delta\tau) = \begin{cases} \mathrm{Coherence}_0(e_i,\,\mathcal{E}) & \text{if } \Delta\tau < \tau_{min} \quad\text{(cold start)} \\[6pt] \exp\!\!\left(-\dfrac{E_{CDR}^{absorbed}(e_i)}{E_{CDR}^{expected}(e_i)}\right) & \text{if } \Delta\tau \geq \tau_{min} \quad\text{(operational)} \end{cases}$$

- $\tau_{min}$: Minimum observation window for predictive evaluation (initial = 24 hours)
- $E_{CDR}^{absorbed}$: CDR repair energy required when $e_i$'s prediction graph absorbs new articles
- $E_{CDR}^{expected}$: Baseline repair cost expected from Valency (RFC-0024)

**Cold-start solution:** New $e_i$ has no prediction history. Until $\tau_{min}$ is satisfied, structural coherence serves as a substitute:

$$\mathrm{Coherence}_0(e_i,\,\mathcal{E}) = \exp\!\left(-\frac{1}{|\mathcal{E}|}\sum_{j \neq i} d_{CFI}(e_i, e_j)\right)$$

**Shadow Observatory (lazy evaluation):** Maintaining parallel universes for all Evidence ($O(N \times K)$) is impractical. Shadow deployment is triggered **only where CFI spikes occur** (lazy evaluation):

```python
def should_spawn_shadow(e_candidate: Evidence) -> bool:
    cfi = compute_D_link(e_candidate)
    return cfi > TAU["spike"]  # RFC-0025 v4.0: τ_spike = 0.7
```

---

### 1.4 Factor 3: TopologicalCentrality (Network Hub Centrality)

*"Truth is the node that cannot be removed from the knowledge graph without causing collapse."*

$$\mathrm{Topo}(e_i) = 1 - \exp\!\left(-\mu \cdot \frac{E(G \setminus \{e_i\}) - E(G)}{E(G)}\right)$$

- $E(G)$: Total energy of current Evidence graph (RFC-0018)
- $E(G \setminus \{e_i\})$: Graph energy after removing $e_i$
- $\mu$: Centrality sensitivity (initial = 1.0)

This directly applies RFC-0018's energy attribution to the Evidence Field: the more graph energy increases upon removal of $e_i$ (the more contexts collapse), the greater the autonomous mass $e_i$ has acquired.

---

## 2. Evidence Field Dynamics

### 2.1 Gravity Field Equation

The Evidence Field exerts a gravitational pull on incoming structures:

$$\mathbf{F}_{evidence}(G) = -\nabla_{G} \sum_{i} M_i \cdot d_{CFI}(G, e_i)^{-2}$$

High-mass Evidence pulls candidate structures toward minimum-energy configurations via CDR.

### 2.2 Field Update Cycle

```
New article arrives
  → TAG28 crystallization (RFC-0019)
  → CFI computation against Evidence Field
  → If CFI > τ_spike: spawn shadow_observatory
  → CDR repair (RFC-0022)
  → Recompute M_i for affected Evidence
  → Merge survivor to Evidence Field
```

---

## 3. Relationship to Existing RFCs

| RFC | Relation |
|-----|---------|
| RFC-0018 (CFI) | $d_{CFI}$ is the distance metric in mass equations |
| RFC-0019 (Compiler) | Layer 4 (Evidence Alignment) grounds TAG graphs in this field |
| RFC-0021 (EGEM) | Extends mass equation with gradient-driven updates |
| RFC-0022 (CDR) | Surgical repair engine triggered by Evidence Field gradients |
| RFC-0024 (Valency) | $E_{CDR}^{expected}$ computed from Evidence-derived valency distributions |
| RFC-0025 (Error Handling) | τ thresholds (τ_spike, τ_crystal, τ_reject) standardized |

---

## 4. Conclusion

> **"Evidence mass is not granted — it is earned. Through orthogonal observation, predictive survival, and topological centrality, truth crystallizes autonomously from the dynamics of the Knowledge Field."**

RFC-0020 v4.1 completes the transition from human-curated knowledge to **sovereign autonomous intelligence**: a system that discovers, weighs, and crystallizes truth without requiring explicit human approval of each evidence item.

---

*Gemmina Intelligence LLC. — Pure Information Laboratory*
*RFC-0020 | Canonical v4.1 | 2026-05-04*
*Acta AIIE Protocol v6.1*
