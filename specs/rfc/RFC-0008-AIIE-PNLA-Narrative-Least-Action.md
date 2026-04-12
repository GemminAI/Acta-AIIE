# RFC-0008: PNLA — Principle of Narrative Least Action

| Field | Value |
|-------|-------|
| **ID** | RFC-0008 |
| **Status** | STABLE |
| **Date** | 2026-04-12 |
| **Authors** | Tomohiko Nakamura, Gemmina Intelligence LLC. |
| **Language** | EN |
| **Depends on** | RFC-0001 (ΔV), RFC-0005 (T22), RFC-0006 (QFOM), RFC-0007 (MIFT) |

---

## 1. Purpose

This RFC formalizes the **Principle of Narrative Least Action (PNLA)** as a fully computable inference mechanism. The Narrative Lagrangian is defined explicitly in terms of 35TAG state variables, transitioning PNLA from a conceptual analogy to an implementable algorithm for trajectory selection.

Empirical validation: Weibull hazard function fit over 37,817 narrative pairs confirms non-Markovian memory ($\Delta AIC = 28{,}953$ vs. Exponential; shape parameter $\beta = 0.78 < 1$), consistent with least-action path dynamics.

---

## 2. Discrete-Time State Representation

Let the narrative state at time step $t$ be:

$$S_t = (T01, T02, \ldots, T35)_t$$

A trajectory $\Phi$ over a finite time horizon $[0, T]$:

$$\Phi = \{S_0, S_1, \ldots, S_T\}$$

with discrete time increments derived from T06: $\Delta t_t = T06_t(\text{elapsed})$.

---

## 3. Narrative Lagrangian

### 3.1 Kinetic Term — Narrative Propagation Momentum

$$K_t = \alpha \cdot \frac{\|T07_t - T07_{t-1}\|^2}{(\Delta t_t)^2}$$

where $T07 \in \mathbb{R}^n$ ($n \leq 7$), $\alpha > 0$ is a scaling constant.  
**Interpretation:** Measures the rate at which actors shift their strategic position.

### 3.2 Potential Term — Contextual Constraint Field

$$V_t = \beta \cdot T22_t + \gamma \cdot T19_t + \delta \cdot \Delta V_t$$

where:
- $T22 \in [0,1]$: informational entropy (RFC-0005)
- $T19 \in [0,1]$: Conflict Factuality Index penalty
- $\Delta V_t$: narrative divergence from attractor (RFC-0001)
- $\beta, \gamma, \delta > 0$: weighting parameters

**Interpretation:** Encodes friction from ambiguity, contradiction, and structural inconsistency.

### 3.3 Full Narrative Lagrangian

$$\mathcal{L}_t = K_t - V_t = \alpha \cdot \frac{\|T07_t - T07_{t-1}\|^2}{(\Delta t_t)^2} - \left(\beta T22_t + \gamma T19_t + \delta \Delta V_t\right)$$

---

## 4. Discrete Action Functional

$$S[\Phi] = \sum_{t=1}^{T} \mathcal{L}_t \cdot \Delta t_t$$

---

## 5. Least Action Path Selection

Given initial state $S_0$ and a set of candidate trajectories $\{\Phi_k\}$:

$$\Phi^* = \arg\min_{\Phi_k} S[\Phi_k]$$

---

## 6. Causal Admissibility Constraint (QFOM Coupling)

Each transition must satisfy:

$$|A_t|^2 = \left|\langle \Psi_{\text{total},t} | \hat{O}_t | \Psi_{i,t} \rangle\right|^2 \geq \epsilon$$

If $|A_t|^2 < \epsilon$, the trajectory is **pruned** as physically inadmissible (orthogonal state).

---

## 7. Entropy-Action Coupling

$$\frac{\partial S[\Phi]}{\partial T22} > 0$$

Higher entropy states necessarily increase total action — making them less likely to be selected as the realized trajectory.

---

## 8. Equivalence with Boltzmann Selection

The least-action formulation is consistent with probabilistic selection (RFC-0014):

$$P(\Phi) \propto \exp\left(-\frac{S[\Phi]}{\hbar_I}\right)$$

where $\hbar_I$ is the information quantum constant controlling resolution. This establishes equivalence between:

- **Dynamic formulation:** $\delta S = 0$ (stationary action)
- **Statistical formulation:** Boltzmann free energy minimization

---

## 9. Integration with MIFT (RFC-0007)

The Lagrangian $\mathcal{L} = K - V$ serves as the **field action density** of the MIFT framework. The Action functional $S[\Phi] = \sum_t \mathcal{L}_t \cdot \Delta t_t$ is the discrete form of $S[\Phi] = \int \mathcal{L}\, d^4x$.

---

*Gemmina Intelligence LLC. — Pure Information Laboratory*

*"The realized narrative is not chosen arbitrarily — it is the path of least resistance through the contextual field."*

*End of RFC-0008*
