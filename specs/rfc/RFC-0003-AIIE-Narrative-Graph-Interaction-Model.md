# RFC-0003: Narrative Graph Interaction Model

| Field | Value |
|-------|--------|
| **Status** | **DRAFT** |
| **Date** | 2026-04-07 |
| **Authors** | Acta AIIE Standardization Committee |
| **Language** | EN |

---

## 1. Normative reference

This draft **extends** the narrative-graph and compiler narrative of:

**[`../Acta_AIIE_Protocol_Definition_v1.0.0.md`](../Acta_AIIE_Protocol_Definition_v1.0.0.md)** (Analysis pipeline, Event Coordinates, 35TAG, Boltzmann branching).

Until ratified, this document is **non-normative** for compliance claims.

---

## 2. Scope (draft)

Specify a **typed interaction model** for edges in the narrative graph $G$:

- **Edge types:** causal, temporal, rhetorical, sanction, alliance (extensible enum).
- **Interaction strength:** scalar in $[0,1]$ derived from T08, T15, and alignment features.
- **Multi-agent coupling:** pairwise and higher-order cliques for coalition events.

---

## 3. Relation to RFC-0001 (ΔV)

Graph-level divergence remains summarized by ΔV between crystallized tag vectors (RFC-0001). This draft proposes **additional** graph-level metrics (e.g., edit distance on minimal spanning causal trees) for research and diagnostics only.

---

## 4. Open questions

- Canonical mapping from LLM-extracted relations to edge types.
- Convergence with Narrative Graph Inference v0.9 (Nakamura, 2026) terminology.

---

## 5. Next steps

Promote to **RATIFIED** after: two independent reference implementations, annotation study, and committee vote.

---

*End of RFC-0003 (DRAFT)*
