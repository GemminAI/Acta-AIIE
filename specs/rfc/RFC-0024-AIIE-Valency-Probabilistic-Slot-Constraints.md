# RFC-0024: Valency — Probabilistic Slot Constraints from Evidence (v3.0)

| Field | Value |
|-------|-------|
| **ID** | RFC-0024 |
| **Version** | 3.0 |
| **Status** | Canonical |
| **Date** | 2026-05-04 |
| **Authors** | Gemmina Intelligence LLC. — Pure Information Laboratory |
| **Language** | EN |
| **Updates** | RFC-0016 (TAG28), RFC-0017 (LINK+), RFC-0023 (Π Engineer Spec) |
| **Core Logic** | "Universal Grammar determines the vessel; Valency determines the density of its contents." |

---

## 1. Conceptual Definition: Two-Layer Constraints

Valency in this system is defined as a two-layer structure:

**Layer 1: Hard Constraints (Π Layer / UG)**
- Absolute constraints based on Universal Grammar (e.g., `agent` must always be T01 series)
- Guarantees physical "shape" compatibility

**Layer 2: Soft Constraints (Valency Layer / Evidence)**
- Typed probability distributions estimated from the Evidence Field
- Provides semantic "naturalness" and "expected values" as potentials

---

## 2. Formal Definition

The valency $\mathcal{V}(h)$ for predicate (Head) $h$ is described as a tuple per role $r$:

$$\mathcal{V}(h) = \{ r \mapsto (\mathcal{T}_r, \pi_r(k), \rho_r) \}$$

- $\mathcal{T}_r$ **(Target Types):** Set of permissible TAG28 types
- $\pi_r(k)$ **(Cardinality Distribution):** Probability distribution of occurrence count $k$ for that role
- $\rho_r$ **(Optionality):** Required or optional

---

## 3. Statistical Estimation from Evidence

From evidence set $\mathcal{E} = \{(G_i, w_i)\}$, the following metrics are computed and tabulated:

### 3.1 Role Existence Probability and Necessity

$$P(r|h) = \frac{\sum_i w_i \cdot \mathbb{I}[(h,r) \in G_i]}{\sum_i w_i \cdot \mathbb{I}[h \in G_i]}$$

$$P(r|h) > \tau_{req} \implies \rho_r = \text{required}$$

where $\tau_{req} = 0.7$ (default).

### 3.2 Selectional Preference

$$P(t|h, r) = \frac{\sum_i w_i \cdot \mathbb{I}[(h,r,t) \in G_i]}{\sum_i w_i \cdot \mathbb{I}[(h,r) \in G_i]}$$

### 3.3 Cardinality Distribution

$$\pi_r(k) = P(\#(r) = k \mid h)$$

---

## 4. Integration with CDR (Consistency Detection & Repair)

Valency acts as energy function $E_{val}(G)$ that generates "gradients" for repair:

### 4.1 Energy Term

$$E_{val}(G) = \sum_{h \in G} \left[ \sum_{r \in R_h} \text{Penalty}_{miss} + D_{KL}(\hat{\pi}_r \| \pi_r) + \text{Penalty}_{type\_mismatch} \right]$$

### 4.2 Local Gradient and Edit Proposals

Upon spike detection, an `Operation Ranking` is generated:

| Violation | Proposed Operation |
|-----------|-------------------|
| Missing (Required, k=0) | `add_edge(h, r, v_candidate)` |
| Excess (k > mode(π_r)) | `remove_edge(h, r, v_worst)` |
| Type mismatch (P(t\|h,r) < τ_type) | `change_type(v)` or `replace_node` |

---

## 5. Connection to Proto-Structure Layer

Based on X-bar theory, slot initialization in the Proto stage:

1. **Fix Head (h):** Expand slots centered on $X^0$
2. **Slot initialization:**
   - Count from $\pi_r$ sample
   - Type from $P(t|h,r)$ sample
3. **Π₂ Projection:** Adjust deficiencies/excesses to minimum edit distance when binding to real nodes

---

## 6. Implementation Notes

**Data Sparsity:** For low-frequency predicates, back-off to the upper-level concept cluster statistics of TAG28 (e.g., all T05 clusters).

**Polysemy (Sense):** For verbs with identical spelling but different frames, manage separately as $\mathcal{V}(h, sense)$ through clustering.

**Self-Consistency:** Reflect Evidence quality (Mass Integrity) to prevent Valency distortion by noisy corpora.

---

## 7. Conclusion

> **"Valency is the dynamics that attaches the flesh of reality to the skeleton of Universal Grammar."**

Without Valency, the Π operator would know the shape of the vessel but not what it should contain. Valency bridges Universal Grammar (structural constraint) and the Evidence Field (empirical distribution), enabling the system to make probabilistically informed decisions within hard structural boundaries.

---

*Gemmina Intelligence LLC. — Pure Information Laboratory*
*RFC-0024 | Canonical v3.0 | 2026-05-04*
*Acta AIIE Protocol v6.1*
