# RFC-0001: AIIE Delta Variance (ΔV) — Standard Definition

| Field | Value |
|-------|--------|
| **Status** | RATIFIED |
| **Date** | 2026-04-07 |
| **Authors** | Acta AIIE Standardization Committee |
| **Language** | EN |

---

## 1. Normative reference

This RFC **normatively refines** §9 (*Delta Variance*) of:

**[`../Acta_AIIE_Protocol_Definition_v1.0.0.md`](../Acta_AIIE_Protocol_Definition_v1.0.0.md)** — *Acta AIIE Protocol — Formal Definition v1.0.0*.

In case of conflict, **v1.0.0** prevails. This RFC adds implementation identifiers, normalization rules, and testability criteria without altering the core formula.

---

## 2. Purpose

Provide a single, auditable **ΔV standard** so that:

- Independent implementations compute comparable divergence scores between two 35TAG narrative states derived from graphs $G_1$, $G_2$.
- Hesitation thresholds (notably $\Delta V > 0.7$) apply consistently to the same scalar definition.

---

## 3. Standard definition (normative)

Let $\mathbf{T}^{(a)} = (T_{1}^{(a)}, \ldots, T_{35}^{(a)})$ be the tag vector for graph $G_a$, $a \in \{1,2\}$.

**Excluded indices for ΔV:** $\mathcal{E} = \{22, 23, 24, 25\}$ (projection, significance, closure, state hash), per v1.0.0 §9.3.

For each $i \in \{1,\ldots,35\} \setminus \mathcal{E}$, define component distance $\delta_i$ per v1.0.0 §9.2. For $i \in \mathcal{E}$, set $w_i \delta_i = 0$ (equivalently exclude from sum).

The **ΔV standard score** is:

$$
\Delta V(G_1, G_2) = \sqrt{\sum_{i \notin \mathcal{E}} w_i \cdot \delta(T_{i,1}, T_{i,2})^2}
$$

subject to:

- $w_i \geq 0$, $\sum_{i \notin \mathcal{E}} w_i = 1$ after normalization (recommended) or fixed documented scale.
- Weights $w_i$ are **learned or calibrated** to minimize $J(\mathbf{w})$ in v1.0.0 §9.3 with Cohen’s $\kappa \geq 0.70$ on held-out pairs.

---

## 4. Response table (binding)

| ΔV range | Interpretation | System response |
|----------|----------------|-----------------|
| $[0.0, 0.3)$ | Broadly consistent | Standard rendering |
| $[0.3, 0.7)$ | Moderate divergence | Emerging Signal flag |
| $[0.7, 1.0]$ | Fundamental contradiction | Hesitation Protocol (v1.0.0 §13) |

**Note:** If $\Delta V$ is reported on an unbounded training scale, implementations MUST apply a **documented calibration map** to $[0,1]$ before applying this table, or MUST publish raw scores alongside calibrated scores.

---

## 5. Narrative rift (informative)

$D(t) = \|P_i(t) - P_j(t)\|_2$ in projected space (v1.0.0 §9.5) is a **separate** geometric indicator; correlation with ΔV SHOULD be logged in analytics but MUST NOT replace the §3 formula for compliance checks.

---

## 6. Security note

Metric gaming (artificially lowering ΔV) is Threat 5 in v1.0.0 §15.5. Implementations MUST verify tag vectors against T25-sealed state before reporting ΔV for policy decisions.

---

*End of RFC-0001*
