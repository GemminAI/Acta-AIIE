# RFC-0030: Semantic Groupoid Theory — Algebraic Learning of Structural Invariants (v2.1)

| Field | Value |
|-------|-------|
| **ID** | RFC-0030 |
| **Version** | 2.1 |
| **Status** | Pre-Canonical |
| **Date** | 2026-05-05 |
| **Authors** | Gemmina Intelligence LLC. — Pure Information Laboratory |
| **Language** | EN |
| **Depends on** | RFC-0016 (TAG28), RFC-0018 (CFI), RFC-0022 (CDR), RFC-0028 (LoRA Lens), RFC-0029 (Movement) |

---

## 0. Abstract

This document integrates the information vector space centered on TAG02–09 and the movement operators defined in RFC-0029 under the framework of a **Groupoid** — a category-theoretic structure.

By defining meaning-preserving transformations as "Morphisms" and introducing "semantic equivalence classes" based on CFI distance, this RFC establishes the method by which intelligence learns "canonical forms of structure" and physically detects and corrects hallucination (illegitimate symmetry breaking).

---

## 1. Semantic Groupoid $\mathcal{C}_{sem}$: Construction

State transitions in semantic space are defined as the following category-theoretic structure:

### 1.1 Objects

TAG28/LINK+ discrete graph states:

$$\text{Objects} = \{S \in \mathcal{G}_{TAG}\}$$

### 1.2 Morphisms

Transformation operations that preserve (or controllably transform) meaning:

$$g: S_A \to S_B$$

- Operator $D(g) \in GL(n)$: Adopts the general linear group, permitting information compression and expansion.

### 1.3 Local Composition

Composition of transformations is defined **only when** the result satisfies Universal Grammar (UG):

$$g_2 \circ g_1 \text{ is defined} \iff \Pi(g_2(g_1(S))) \in \mathcal{G}_{valid}$$

This is what distinguishes a Groupoid from a Group: composition is partial, defined only within valid semantic regions.

---

## 2. CFI Equivalence Classes and Orbit Physics

### 2.1 CFI-Based Quotient Space

Rather than strict point equality, neighborhoods based on CFI distance are treated as the same meaning:

$$x \sim y \iff d_{CFI}(x, y) < \epsilon_{invariant}$$

The quotient set $\mathcal{G} / \sim$ under this equivalence relation forms the **Meaning Attractor** — the core toward which paraphrases and translations must converge.

**Invariant examples:**

| Transformation | CFI Distance | Status |
|----------------|-------------|--------|
| Passivization | $< \epsilon_{invariant}$ | Same equivalence class |
| Topicalization | $< \epsilon_{invariant}$ | Same equivalence class |
| Semantic reversal | $> \epsilon_{invariant}$ | Different equivalence class |
| Hallucination | $\to \infty$ | Orbit escape |

### 2.2 Orbit-Based Validity Evaluation

The set of all states reachable from source structure $S_{src}$ through transformations is $\text{Orbit}(S_{src})$:

$$\text{Orbit}(S_{src}) = \{g \cdot S_{src} : g \in \mathcal{C}_{sem}\}$$

| Output Type | Condition | Classification |
|-------------|-----------|----------------|
| **Valid output** | $S_{pred} \in \text{Orbit}(S_{src})$ | Legitimate transformation |
| **Hallucination** | $S_{pred} \notin \text{Orbit}(S_{src})$ | Orbit escape — CFI divergence |

---

## 3. Algebraic Learning: CFI-Weighted Equivariance

In learning LoRA Lens (RFC-0028), consistency before and after transformation is enforced with a CFI-weighted loss function:

$$\mathcal{L}_{equiv} = \| f_\theta(D(g)x) - D(g)f_\theta(x) \|^2_{CFI}$$

When $D(g)$ involves information compression (e.g., summarization), weight $w(d_{CFI})$ prioritizes preservation of the "structural core" that must not be lost:

$$w(d_{CFI}) = \exp(\gamma \cdot d_{CFI}) \quad \text{(higher weight for semantically distant transformations)}$$

---

## 4. CDR as Algebraic Recovery of Symmetry

The CDR process (RFC-0022) is redefined as:

> **An operation that re-projects a "torn orbit" caused by contradictions in the input to the nearest "algebraically consistent equivalence class," using the gravitational pull of the Evidence Field (RFC-0020).**

$$G_{repaired} = \arg\min_{G \in \text{Orbit}(S_{src})} E_{total}(G)$$

This unifies CDR with the Groupoid framework: CDR is not arbitrary graph surgery, but constrained orbit search — finding the minimum-energy valid element within the algebraic structure.

---

## 5. Canonical Form Learning

Through RFC-0030, the system learns **canonical forms** — the representative elements of equivalence classes:

$$G_{canonical}(S) = \arg\min_{G \in [S]_{\sim}} E_{total}(G)$$

This canonical form serves as:
- The crystallization target for Π projection (RFC-0026)
- The reference for CDR repair (RFC-0022)
- The baseline for Evidence mass computation (RFC-0020 $E_{FIELD\_BASELINE}$)

---

## 6. Relationship to Existing RFCs

| RFC | Relation |
|-----|---------|
| RFC-0018 (CFI) | $d_{CFI}$ defines the metric of equivalence classes |
| RFC-0022 (CDR) | CDR = constrained orbit search in Groupoid |
| RFC-0023/0026 (Π) | Π maps proto-structure to canonical form |
| RFC-0028 (LoRA) | Null-space preservation = Morphism equivariance |
| RFC-0029 (Movement) | Movement = Morphism in $\mathcal{C}_{sem}$ |
| RFC-0031 (Info Geometry) | Geodesic = minimum-friction Morphism trajectory |

---

## 7. Conclusion

> **"RFC-0030 v2.1 demands mathematical honesty from GemminAI. The system selects truth not based on statistical plausibility, but based on algebraic necessity — the consistency of orbits. Hallucination is not a probabilistic error; it is an algebraic crime: an orbit escape."**

---

*Gemmina Intelligence LLC. — Pure Information Laboratory*
*RFC-0030 | Pre-Canonical v2.1 | 2026-05-05*
*Acta AIIE Protocol v6.1*
