# **Narrative Quantification:** 
### **Compiling Narrative Structures into Computable Representations for Large Cognitive Models**

**Tomohiko Nakamura**\
Independent Researcher, Japan

------------------------------------------------------------------------

## Abstract

Human societies interpret events primarily through narrative structures
rather than isolated data points. This paper proposes **Narrative
Quantification**, a framework for transforming narrative information
into structured cognitive data. By decomposing narratives into actors,
events, conflicts, resolutions, emotional context, and causal
relationships, narratives can be stored as structured datasets and
analyzed computationally.

To operationalize this transformation, the paper introduces the concept
of a **Narrative Compiler**, a system that converts narrative text into
structured cognitive representations such as the **24TAG structure**.
These representations enable the creation of narrative databases that
may serve as the foundation for **Large Cognitive Models
(LCM)**---systems designed to reason over structured representations of
human narratives rather than purely probabilistic language tokens.

This work suggests that narrative quantification may function as a new
layer of cognitive infrastructure for future AI systems.

------------------------------------------------------------------------

## 1. Introduction

Most contemporary AI systems rely on probabilistic language modeling.
Large Language Models (LLMs) generate text by predicting token
probabilities within massive corpora. While effective for language
generation, these systems do not explicitly represent narrative
structure, causal relationships, or long‑term narrative dynamics.

Human cognition, however, rarely processes information as isolated
tokens. Instead, humans organize knowledge through **narratives**:
structured relationships between actors, events, motivations, and
outcomes.

This paper proposes that quantifying narrative structures can provide an
alternative computational representation of human cognition. By
decomposing narratives into structured components, it becomes possible
to construct databases of collective narrative patterns.

------------------------------------------------------------------------

## 2. Narrative Cognition

**2. Narrative Cognition** Human cognition frequently follows a narrative processing loop:

**Event → Meaning → Narrative → Memory**

Experiences are rarely stored as raw data. 
Instead, individuals interpret events through causal explanations and emotional context, forming narratives that are later stored in memory. 

This mechanism allows humans to compress complex experiences into structured stories that **predict future outcomes and guide subsequent decisions.** Narrative cognition therefore represents a fundamental cognitive process rather than a mere cultural artifact.

------------------------------------------------------------------------

## 3. Narrative Quantification

Narrative Quantification is the process of converting narrative
structures into analyzable data.

Narratives can be decomposed into structural components such as:

-   Actors
-   Events
-   Conflict
-   Resolution
-   Emotional context
-   Causal relationships

Once extracted, these components can be represented through structured
tags and stored within databases. This enables large‑scale analysis of
narrative dynamics across media, politics, economics, and culture.

#### **3.1 Decomposition**

The first stage of quantification is **Decomposition**, where raw narrative text is segmented into its primary semantic units. Rather than treating a story as a continuous stream of words, we identify discrete entities and their roles. By isolating **Actors** (the agents of change), **Events** (the actions taken), and **Causal Relationships** (the 'why' behind the actions), we transform linguistic ambiguity into a set of distinct variables. This step is crucial for transitioning from a subjective reading of a text to an objective, computational representation.

### **3.2 Event Formation**

The second stage of quantification is **Event Formation**, where continuous occurrences are discretized into logical structures. Within this framework, **an event is defined as the minimum causal interaction unit between actors unfolding over time.**

Unlike traditional data processing, which might treat an action and its subsequent response as separate entries, event formation recognizes their inherent unity. An "action" without a "reaction" (or a state change) is incomplete in the context of narrative cognition. Therefore, we cluster these temporal sequences into a single atomic unit.

A typical event unit is structured as follows:

- **Actors:** The agents initiating or receiving the interaction.
- **Action-Reaction Pair:** The core causal loop (e.g., _Actor A_ exerts influence, _Actor B_ undergoes a transition or retaliates).
- **Temporal Boundary:** The specific window from the trigger to the resulting outcome.

By defining the event as the _minimum causal interaction unit_, we enable Large Cognitive Models (LCM) to perform reasoning not just on what happened, but on the **logic of the interaction itself**. This is the prerequisite for moving from linguistic probability to true causal understanding.

#### **3.2.1 Eventualization: Entropy Suppression through Gravitational Convergence**

Without event formation, information entropy increases monotonically over time. A single real-world occurrence typically generates dozens of articles across different media outlets — each carrying its own framing, emphasis, and omissions. Left unstructured, this proliferation of fragments causes the informational representation of a single event to *diverge*, consuming disproportionate computational and cognitive resources.

**Eventualization** is the process by which the **Event Builder** counteracts this divergence. Rather than treating each article as an independent data point, the Event Builder applies a gravitational model: semantically related articles are attracted toward a shared `event_id`, collapsing the high-entropy cloud of fragments into a single, stable coordinate in Narrative Space.

Formally, given a set of $n$ articles $\{a_1, a_2, \ldots, a_n\}$ referencing the same real-world occurrence, Eventualization assigns them to a common event object $E$:

$$E = \text{EventBuilder}(\{a_1, \ldots, a_n\}), \quad \text{sim}(e(a_i),\, e(a_j)) \geq \theta$$

where $e(\cdot)$ is the embedding function mapping an article to its vector representation in Narrative Space, and $\theta$ is the similarity threshold above which two articles are considered to reference the same event. This operation is the narrative analogue of entropy reduction: the $n$ fragments are compressed into one canonical object whose informational content is greater than the sum of its parts.

#### **3.2.2 The Centroid Vector and Crystallization Completeness**

A direct consequence of Eventualization is the emergence of the **centroid vector** $\bar{v}$. Each article $a_i$ assigned to event $E$ contributes a 6-dimensional `strategic_interest_vector` $v_i \in [-1, 1]^6$, representing its narrative perspective across the dimensions of security, economy, technology, resource, ideology, and environment. The centroid is defined as the arithmetic mean across all contributing perspectives:

$$\bar{v} = \frac{1}{n} \sum_{i=1}^{n} v_i$$

The centroid represents the **gravitational center of the event** — the best available approximation of the event's objective geopolitical weight, computed from the ensemble of all contributing narrative perspectives. As more articles converge on the same `event_id`, the centroid stabilizes and the estimate becomes progressively more reliable.

This gives rise to a natural measure of **crystallization completeness**. When all six canonical narrative perspectives (jp, us, cn, gb, eu, qa) have been compiled for a given event, the `source_count` reaches 6. At this point the event is considered *fully crystallized*. The distance between any individual narrative vector $v_i$ and the centroid $\bar{v}$,

$$\text{CDC}_i = \| v_i - \bar{v} \|_2$$

functions as the **Cross-Domain Correlation (CDC)** metric: a quantitative measure of how far a given national narrative deviates from the ensemble center of gravity. High CDC values indicate narrative outliers — perspectives that are structurally distant from the consensus — and serve as the primary signal for the `audit_aura` indicator in the presentation layer.

### **3.3 Narrative Compression**

The final stage of quantification is **Narrative Compression**, the process by which structured narrative data is refined into a high-density cognitive representation. This operation can be understood as an **active entropy reduction** within the information space.

Raw, real-world data is inherently high-entropy—it is noisy, continuous, and lacks explicit meaning. By applying the processes of decomposition and event formation, we filter out irrelevant details and retain only the causal, emotional, and structural core. This allows for a massive reduction in the volume of data required to represent a situation while simultaneously increasing its semantic value.

In this framework, narrative compression provides several key advantages:

- **Computational Efficiency:** Reasoning over discrete, compressed event units is far more efficient than processing raw linguistic tokens.
    
- **Long-Term Coherence:** By stripping away noise, the "narrative arc" becomes visible, allowing for the tracking of long-term dynamics that LLMs often lose.
    
- **Storage and Retrieval:** Much like human memory, which stores experiences as "structured stories" rather than raw sensory logs, this compression enables the construction of vast, searchable Narrative Databases.
    

Ultimately, narrative compression is what transforms "text" into "knowledge." It is this compressed, structured format that serves as the fundamental input for the **Large Cognitive Model (LCM)**.

------------------------------------------------------------------------

## **4. The Narrative Compiler: Search and Optimization**

The Narrative Compiler does not merely extract data; it explores a vast space of potential interpretations to find the most probable narrative structures. Given that a single text can yield an exponential number of event connections, the Compiler employs specific **Search Constraints** to manage this complexity and generate the final probability distribution $P(N \mid \text{text})$.

#### **4.1 Generating Possible Narrative Graphs**

The Compiler treats narrative construction as a graph-search problem. From a set of extracted events, it attempts to build a **Narrative Graph ($G$)** where nodes represent events and edges represent causal or temporal transitions. To prevent the "hallucination" of connections, the following optimization techniques are applied:

#### **4.2 Beam Search for Hypothesis Management**

To maintain a manageable "hash set" of narrative states, the Compiler utilizes **Beam Search**. Rather than exploring every possible graph configuration, the Compiler keeps only the **top-$k$** most plausible narrative hypotheses at each step of the construction.

- **Top-k Survival:** At each stage of event linking, only the graphs with the highest cumulative probability scores are retained.
    
- **Diversity Maintenance:** The beam search is tuned to preserve divergent narrative paths if their probabilities are sufficiently high, ensuring that the final distribution $P(N \mid \text{text})$ captures legitimate ambiguity.
    

#### **4.3 Graph Pruning and Information Entropy**

**Graph Pruning** is the active removal of low-probability or redundant branches in the narrative tree.

- **Redundancy Filtering:** If multiple paths lead to the same structural state with lower efficiency, they are pruned to reduce computational overhead.
    
- **Entropy Thresholding:** Branches that increase the conditional entropy of the narrative without adding significant semantic value are eliminated, facilitating the **Narrative Compression** described in Section 3.3.
    

#### **4.4 Causal Constraints: The Logical Filter**

The most critical constraint is the **Causal Constraint**, which acts as the "physics" of the Narrative Space. The Compiler applies a set of logical rules to validate every proposed edge in the graph:

- **Temporal Precedence:** A cause must strictly precede its effect in the temporal dimension of the event unit.
    
- **Actor Consistency:** Actions must align with the capabilities and known motivations of the involved actors, or the probability of that graph is penalized.
    
- **Interaction Logic:** The "Action-Reaction" loop defined in Section 3.2 must maintain a coherent flow; a reaction cannot occur without a preceding action within the same minimum causal unit.
    

#### **4.5 Final State Synthesis**

Through these constraints, the Narrative Compiler collapses the near-infinite possibilities of prose into a refined **hash set**. This set represents the "State" of the narrative—a weighted distribution of graphs that have survived the beam search and passed all causal filters.


---

## **5. The 24TAG Taxonomy**

To ensure universal compatibility and deterministic hashing, the Narrative Quantification protocol defines a fixed schema of 24 structured tags. These tags are categorized into four primary layers, representing the essential dimensions of human narrative cognition.

#### **Table 1: The 24TAG Framework Definitions**

| **Layer**          | **Tag ID** | **Tag Name**       | **Description**                                                |
| ------------------ | ---------- | ------------------ | -------------------------------------------------------------- |
| **Actor & Agency** | T01        | Primary_Actor      | The main entity initiating the interaction.                    |
|                    | T02        | Secondary_Actor    | The entity receiving or responding to the action.              |
|                    | T03        | Actor_Role_A       | The functional role of the primary actor (e.g., Protagonist).  |
|                    | T04        | Actor_Role_B       | The functional role of the secondary actor (e.g., Antagonist). |
|                    | T05        | Actor_Motivation_A | The underlying goal or "Why" for Actor A.                      |
|                    | T06        | Actor_Motivation_B | The underlying goal or "Why" for Actor B.                      |
| **Event & Action** | T07        | Action_Type        | The category of the event (e.g., Verbal, Physical, Financial). |
|                    | T08        | Action_Intensity   | The magnitude of the action (Scaled 0.0 to 1.0).               |
|                    | T09        | Target_Resource    | The specific object or value being contested.                  |
|                    | T10        | Event_Modality     | Whether the event is factual, hypothetical, or desired.        |
|                    | T11        | Temporal_Sequence  | The relative order of the event within the narrative arc.      |
|                    | T12        | Spatial_Context    | The domain or environment where the event occurs.              |
| **Causal & Logic** | T13        | Causal_Link_Type   | The nature of the connection (e.g., Direct Cause, Enabling).   |
|                    | T14        | Conflict_Nature    | The type of opposition (e.g., Internal, Interpersonal).        |
|                    | T15        | Conflict_Intensity | The severity of the friction between actors.                   |
|                    | T16        | Resolution_Status  | The degree to which the conflict has been settled.             |
|                    | T17        | Outcome_Valence    | The positive or negative impact on the narrative state.        |
|                    | T18        | Logic_Consistency  | The degree of alignment with prior narrative states.           |
| **Context & Tone** | T19        | Emotional_Tone_A   | The emotional state of Actor A during the event.               |
|                    | T20        | Emotional_Tone_B   | The emotional state of Actor B during the event.               |
|                    | T21        | Perspective_Bias   | The point of view from which the narrative is told.            |
|                    | T22        | Info_Asymmetry     | The gap in knowledge between the actors involved.              |
|                    | T23        | Significance_Score | The relative importance of this event to the overall arc.      |
|                    | T24        | Narrative_Closure  | The extent to which this event concludes a specific thread.    |

---

### **5.1 Data Structure and Compilation**

Each tag ($T_{01 \dots 24}$) is populated by the Narrative Compiler using the **Beam Search** and **Causal Constraints** defined in Section 4. The resulting data structure is a JSON object.

As specified in the **Crystallization Protocol**, the `state_hash` is calculated by applying SHA-256 to the JCS-normalized string of these 24 tags.

JSON

```
{
  "T01": "Actor_A",
  "T02": "Actor_B",
  ...
  "T24": "Closure_Value",
  "state_hash": "6b86b273ff34fce19d6b804eff5a3f57..." // EXCLUDED FROM INPUT
}
```

---

- **Normalization (JCS):** Following **RFC 8785**, the Compiler sorts the 24 structured tags into a canonical JSON format. This ensures that variations in whitespace or key ordering do not affect the output.
    
- **Self-Referential Exclusion:** **The `state_hash` field itself is strictly excluded from the hash input.** This prevents circular dependencies and ensures that the hash remains a pure representation of the underlying narrative data ($TAG_{01 \dots 24}$).
    
- **Hashing (SHA-256):** The Compiler applies the SHA-256 algorithm to the canonical byte-stream of the 24 tags.
    

The mathematical definition of the state is:

$$state\_hash = SHA256(JCS(\{TAG_{01 \dots 24}\} \setminus \{state\_hash\}))$$

### **5.2 Integrity and Verification**

By excluding the `state_hash` from its own input, we create a **One-Way Cognitive Seal**. A receiver can verify the integrity of a narrative state by:

1. Temporarily removing the `state_hash` value from the received data.
    
2. Re-running the JCS and SHA-256 process on the remaining 24 tags.
    
3. Comparing the re-calculated hash with the original `state_hash` field.
    

Any **divergence** discovered during this verification process indicates that the narrative structure has been modified or corrupted post-compilation.


------------------------------------------------------------------------

## **6. Narrative Observation and the Narrative Space**

Once narratives are compiled into distributions of narrative states, we can formalize the landscape in which they exist.

#### **6.1 Defining Narrative Space**

**Narrative Space is defined as the multi-dimensional space formed by the set of possible narrative states.** Each specific state is represented as a point within this space.

#### **6.2 The Mathematical Foundation: Graph Embedding**

To operationalize the Narrative Space, we must map the discrete, structural information of a Narrative Graph ($G$) into a continuous vector space. This is achieved through a **Graph Embedding** function, $e$:

$$G \rightarrow \text{vector}$$

Specifically, each narrative graph $G$ is projected into a $d$-dimensional real-valued space:

$$e(G) \in \mathbb{R}^d$$

This embedding ensures that the structural and causal logic of the narrative is preserved as a set of coordinates. By transforming graphs into vectors, we can apply rigorous geometric analysis to human interpretations.

#### **6.3 Quantifying Divergence through Distance**

In this vectorized Narrative Space, the similarity or conflict between two interpretations can be calculated using standard metric functions. The **divergence** between two narrative states, $G_1$ and $G_2$, is defined by the distance between their corresponding embeddings:

$$\text{distance} = \| e(G_1) - e(G_2) \|$$

- **Low Distance (Convergence):** Indicates that the underlying narrative graphs are structurally and logically similar, reflecting a cognitive consensus.
    
- **High Distance (Divergence):** Indicates a fundamental split in the narrative tag structure, revealing competing interpretations or "Narrative Rifts."
    

#### **6.4 Mapping the Narrative Ecosystem**

By observing the distribution and trajectory of these vectors ($e(G)$) within the Narrative Space, researchers can identify:

- **Attractors:** Regions in $\mathbb{R}^d$ where narrative vectors cluster, indicating dominant societal beliefs.
    
- **Bifurcation Points:** Moments where a single event causes the distribution $P(N \mid \text{text})$ to split into two distant clusters in the vector space.
    
- **Narrative Velocity:** The rate at which the vector $e(G)$ moves through the space as new information is integrated, capturing the speed of societal change.

------------------------------------------------------------------------


## **7. Cognitive Infrastructure**

If narrative data can be systematically compiled and structured, it functions as a foundational **Cognitive Infrastructure**. Unlike traditional data infrastructures that focus on the storage of raw facts, this new layer is designed to manage the **structure of interpretation**.

#### **7.1 From Knowledge Bases to Narrative Databases**

Traditional knowledge bases (e.g., Wikidata, Knowledge Graphs) are effective at storing "what" happened—discrete facts such as dates, locations, and actors. However, they lack the capacity to store "how" those facts are interpreted. A **Narrative Database**, powered by the Narrative Compiler, stores **Crystallized Narrative States**. It preserves not just the event, but the causal logic, emotional weight, and conflict dynamics as understood by a specific system at a specific time. This shifts the focus from "Data Storage" to "Cognitive State Storage."

#### **7.2 Information Integrity and the State Hash**

The deterministic nature of the `state hash` provides a revolutionary mechanism for **Information Integrity**.

- **Proof of Interpretation:** By attaching a state hash to a news report or an official statement, the author provides a "Cognitive Seal."
    
- **Divergence Detection:** If two different media outlets report on the same event, their respective `state hash` outputs can be compared instantly. Any **divergence** in the hash acts as an objective indicator that the underlying narrative structures differ, allowing for the mathematical mapping of bias or misinformation.
    

#### **7.3 Applications of the Infrastructure**

This infrastructure supports a wide range of critical applications:

- **Media & Information Integrity:** Automated detection of narrative manipulation or divergent reporting.
    
- **Geopolitical Narrative Mapping:** Real-time observation of how different nations or cultures interpret the same international event, identifying "Narrative Rifts" before they escalate into physical conflict.
    
- **Corporate & Economic Intelligence:** Tracking the evolution of market narratives and investor sentiment through structured event formation.

------------------------------------------------------------------------

## **8. Reasoning over Narrative Distributions (LCM)**

By defining a state as $P(N \mid \text{text})$, the **Large Cognitive Model (LCM)** gains the ability to perform "superpositional" reasoning.

#### **8.1 Inference as Distribution Transformation**

While LLMs predict tokens, the LCM performs inference by transforming one probability distribution into another. The reasoning core evaluates how the current distribution $P(N_t \mid \text{text}_t)$ evolves into a future distribution $P(N_{t+1})$ when a new event occurs.

#### **8.2 Handling Ambiguity and Divergence**

This probabilistic approach allows the LCM to handle **Narrative Divergence** natively. When a text is highly ambiguous, the Compiler produces a broad "hash set" with distributed probabilities. The LCM can track these multiple "possible worlds" simultaneously, collapsing them only when subsequent information makes one narrative significantly more probable.
    

#### **8.3 Reasoning over Causal Trajectories**

Because an event is defined as the _minimum causal interaction unit_, the LCM can track long-term narrative arcs without the "forgetting" or "hallucination" common in LLMs. Reasoning in an LCM is not a search for the next word, but a calculation of **state transitions**:

$$\text{State } A (\text{Hash}_1) \xrightarrow{\text{Causal Logic}} \text{State } B (\text{Hash}_2)$$

This allows the model to identify logical inconsistencies—where a proposed "next event" is mathematically distant from the current state in the Narrative Space.

------------------------------------------------------------------------

## **9. Human Memory and Narrative Cognition**

Human memory does not function as a raw sensory log; rather, it operates through a sophisticated process of **narrative compression**. This section explores how the Narrative Quantification framework mirrors the biological reality of human cognition.

#### **9.1 Memory as a Compiled Distribution**

When humans experience an event, the brain does not store every frame of visual or auditory data. Instead, it acts as a biological **Narrative Compiler**, transforming continuous experience into a discrete set of structured narrative units.

In the context of our framework, human memory can be viewed as the storage of the probability distribution:

$$P(N \mid \text{Experience})$$

What we "remember" is not the raw text of reality, but the **hash set** of the most probable narrative structures. This explains why human memory is reconstructive; "recalling" a memory is effectively a process of **re-compiling** the stored distribution back into a coherent story.

#### **9.2 The Primitives of Biological Storage**

To achieve efficient storage, the human cognitive system captures only the essential semantic primitives:

- **Key Actors:** Identifying who was involved.
    
- **Causal Interpretations:** Assigning a "why" to the sequence of events.
    
- **Emotional Evaluation:** Tagging the event with a valence that determines its priority in the Narrative Space.
    
- **Outcomes:** The final state after the interaction is resolved.
    

#### **9.3 Biomimetic Validation**

The approach of Narrative Quantification is fundamentally **biomimetic**. By using the **state hash** to represent a "crystallized" interpretation, we emulate the way human synapses consolidate complex experiences into stable, retrievable "concepts."

Just as a Narrative Compiler identifies **divergence** in hashes, human cognitive dissonance occurs when a new experience generates a narrative state that is mathematically distant from our existing "memory manifold." Our intelligence grows by constantly updating these distributions to minimize the surprise (entropy) of the world.

------------------------------------------------------------------------

## While the framework of **Narrative Quantification** offers a revolutionary path toward structured cognitive reasoning, several significant limitations must be addressed to ensure its scientific validity and ethical implementation.

---

## **10. Limitations**

#### **10.1 Subjectivity and Algorithmic Bias**

The primary challenge in narrative quantification is the inherent subjectivity of human interpretation. While the Narrative Compiler calculates a probability distribution $P(N \mid \text{text})$, the "priors" used to assign these probabilities are often derived from the training data of the underlying models. This can introduce systemic biases, where the compiler favors Western-centric causal logic or specific cultural tropes, leading to a **state hash** that reflects a biased "crystallization" of reality.

#### **10.2 Computational Complexity of Graph Generation**

Constructing **possible narrative graphs** is a non-trivial computational task. In complex, multi-actor texts, the number of potential causal connections grows exponentially. Managing the trade-off between the granularity of event extraction and the computational cost of maintaining a high-fidelity **hash set** remains a significant hurdle for real-time applications.

#### **10.3 Cultural and Linguistic Heterogeneity**

Narrative structures are not universal. Different cultures employ different storytelling archetypes—such as the circular narratives found in some Eastern philosophies versus the linear, conflict-driven arcs prevalent in Western traditions. A 24TAG framework optimized for one may fail to capture the nuances of the other, resulting in a high degree of **divergence** that is cultural rather than factual.

#### **10.4 Data Sovereignty and "Narrative Warfare"**

As we build **Cognitive Infrastructure**, the question of who controls the **Narrative Databases** becomes paramount. If a centralized authority can define the "standard" state hash for a global event, they possess the power to delegitimize divergent but valid interpretations. The risk of using this infrastructure for "narrative warfare"—mathematically suppressing opposing viewpoints by labeling them as "divergent noise"—is a serious ethical concern.

#### **10.5 Semantic Loss during Compression**

Narrative compression is an active entropy reduction process. By definition, some information must be discarded to reach a crystallized state. There is a persistent risk that subtle but crucial "soft" data—such as irony, subtext, or poetic ambiguity—may be lost during the transition from raw text to a structured **state hash**.

---

## **11. Conclusion**

Despite these limitations, Narrative Quantification represents a necessary evolution in Artificial Intelligence. By moving beyond the probabilistic prediction of language tokens and toward the **structured reasoning of narrative states**, we provide a framework that more closely mirrors human cognition.

The transition from **Narrative Structures to Large Cognitive Models (LCM)** offers more than just technical efficiency; it provides a way to map the "Narrative Space" of our society, making the invisible structures of our interpretations visible, measurable, and verifiable. Future research will focus on mitigating bias through diverse "compiler ensembles" and exploring the decentralized governance of narrative hashes to ensure that this cognitive infrastructure serves as a tool for clarity, not control.

The path toward **Artificial General Intelligence (AGI)** lies not in bigger models, but in deeper structures. Narrative Quantification is the first step in building an AI that doesn't just talk like a human, but understands like one.
