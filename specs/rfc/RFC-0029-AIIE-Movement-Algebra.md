# RFC-0029: Movement Algebra — Vectorized Structural Dynamics (v2.0)

| Field | Value |
|-------|-------|
| **ID** | RFC-0029 |
| **Version** | 2.0 |
| **Status** | Pre-Canonical |
| **Date** | 2026-05-05 |
| **Authors** | Gemmina Intelligence LLC. — Pure Information Laboratory |
| **Language** | EN |
| **Updates** | RFC-0029 v1.0 (Deprecated) |
| **Depends on** | RFC-0016 (TAG28), RFC-0017 (LINK+), RFC-0028 (LoRA Lens), RFC-0030 (Groupoid) |

---

## 0. Abstract

This document formalizes "Movement" in Universal Grammar (UG) as a **Displacement Vector** $\vec{m}$ in the 35TAG geometric space.

By positioning the movement operator as a "Morphism" in the RFC-0030 Groupoid, and defining the conservation law of information under movement and "Semantic Friction," this RFC enables context-driven focus shift to be computed as a physical energy minimization process.

---

## 1. Mathematical Definition of Displacement Vector $\vec{m}$

The operation of node $v$ in a TAG28 graph moving from base position (Deep Structure) to surface position (Surface Structure) is described by displacement vector $\vec{m}$:

### 1.1 State Transition Equation

$$\Psi_{surface} = \Psi_{deep} + \sum_{i} D(g_i) \cdot \vec{m}_i$$

where $D(g)$ is the transformation matrix in RFC-0030 Groupoid.

| Component | Definition |
|-----------|-----------|
| **Displacement** | $\vec{m}$ encodes the displacement of node role (T07) and strategic interest (T09) |
| **Trace** | The original position of the moved node retains an empty node ($t$) sharing backbone history (T20), physically bound via LINK:identity |

---

## 2. Movement Dynamics: Inertia and Friction

Movement is not free — it is constrained by the system's energy state.

### 2.1 Semantic Friction

When movement operator $g$ is applied, energy loss from information compression or distortion is defined as "Friction $F$":

$$F(g) = \mu \cdot d_{CFI}(S_{src}, g \cdot S_{src})$$

| Component | Meaning |
|-----------|---------|
| $\mu$ | Universe-specific viscosity coefficient |
| $d_{CFI}$ | CFI distance between source and transformed state (RFC-0018) |

**Physical interpretation:**
- Natural paraphrase (passivization, etc.) → **low friction**
- Logically discontinuous movement → **high friction (CFI spike)**

### 2.2 Informational Mass and Topical Focus

Nodes moved by topicalization or inversion experience an increase in information mass $M_{node}$, exerting stronger gravitational pull in subsequent inference.

This corresponds to the empirical observation that topicalized elements carry higher information weight — RFC-0020's $\mathrm{Topo}$ factor captures this dynamic.

---

## 3. Binding Constraint

The relationship between a moved node (Antecedent) and its Trace must satisfy the following physical constraints:

### 3.1 Locality Constraint

If movement distance $\|\vec{m}\|$ exceeds threshold $\tau_{move}$, the movement is judged as structural "tearing," and SAI (Self-Awareness Index) drops sharply.

$$\|\vec{m}\| > \tau_{move} \implies \Delta SAI < -\epsilon_{tear}$$

### 3.2 C-Command Constraint

Based on government relations, Antecedent must always be in a geometric configuration that "physically dominates" Trace:

$$\text{C-Command}(Antecedent, Trace) = \text{true}$$

Violations of C-Command are detected during Π₃ Constraint Repair (RFC-0026 §2) and trigger `re-wire_complement` operations.

---

## 4. Learning Method: Equivariant Movement

LoRA Lens (RFC-0028) learns the "preferred movement trajectories" in a specific Universe:

**Learning Target:** The sequence of Morphisms that reaches the target state with minimum friction $F(g)$.

**Anticipatory Intelligence:** When analyzing input, the system "pre-computes" the displacement vector $\vec{m}$ that will yield the lowest energy in future projection Π — resolving structural ambiguity before it becomes a CDR repair problem.

```python
def anticipatory_movement(proto_G, lora_lens, valency):
    # Pre-compute minimum-friction movement trajectory
    candidates = generate_movement_candidates(proto_G)
    costs = [friction(g, proto_G) + energy(apply(g, proto_G)) 
             for g in candidates]
    return candidates[argmin(costs)]
```

---

## 5. Integration into NOMOS Inference Loop

This protocol integrates into the NOMOS Core inference loop as follows:

```
1. Parse: Generate initial Proto-Structure from input
2. Movement Search: Synthesize displacement vector m 
                    along Groupoid orbit (RFC-0030)
3. Optimization: Crystallize surface structure G* 
                 minimizing E_field + F(g)
```

---

## 6. Movement vs. CDR: Complementary Repair Mechanisms

| Dimension | Movement (RFC-0029) | CDR (RFC-0022) |
|-----------|---------------------|----------------|
| Timing | **Pre-crystallization** (during Proto-Structure) | **Post-crystallization** (after TAG graph) |
| Mechanism | Continuous displacement in semantic space | Discrete surgical operations on graph |
| Energy | Minimizes $F(g) = \mu \cdot d_{CFI}$ | Minimizes $E_{total}$ via local gradient |
| Scope | Global structural repositioning | Local spike repair |

Movement and CDR are complementary: Movement prevents structural problems from arising; CDR repairs problems that slip through.

---

## 7. Conclusion

> **"Through RFC-0029 v2.0, the dynamic transformation of language evolves from a static 'snapshot of points' to a dynamic 'film of vectors.' GemminAI physically tracks how words 'flow' through structure and where they leave 'traces' — precisely capturing the deep-layer intent within context."**

---

*Gemmina Intelligence LLC. — Pure Information Laboratory*
*RFC-0029 | Pre-Canonical v2.0 | 2026-05-05*
*Acta AIIE Protocol v6.1*
