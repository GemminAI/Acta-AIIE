# AIIE Protocol Specification: The 35TAG Standards (v6.0.0)

**Governance:** Acta AIIE Standardization Committee

**Compliance:** RFC 8785 (JSON Canonicalization Scheme)

**Architecture:** T35 v2 Thermodynamic Engine / GemminAI LCM

---

## 1. Abstract

This specification defines the ultimate data structure "35TAG" within the Acta AIIE Protocol (v6.0.0). The 35TAG structure encapsulates the entire thermodynamic and geometric lifecycle of information. It transitions non-structural data streams into crystallized base state (TAGs 01–24), seals the normative JCS preimage at TAG 25 (`state_hash`; TAGs 01–34 excluding TAG 25 itself; TAG 35 excluded from the preimage), subjects the state to kinetic prediction, superposition, and collapse (TAGs 26–28), integrates memory and self-correction (TAGs 29–30), establishes meta-cognition and relative time (TAGs 31–34), and finalizes the mathematical crystallization of a single, immutable worldline (TAG 35).

---

## Category I: Identification & Base Context

Defines the spatial and temporal boundaries of the observation.

|**TAG**|**Field Name**|**Type**|**Definition / Range**|
|---|---|---|---|
|**01**|`permanent_id`|`string`|`gmn://YYYYMMDD/[hash8]`. Persistent global identifier ensuring absolute traceability.|
|**02**|`subject_origin`|`enum`|`jp`, `cn`, `us`, `uk`, `qa`, `eu`. Defines the initial observational bias vector.|
|**03**|`predicate_type`|`string`|Logical predicate classifier (e.g., `declare`, `sanction`, `invest`).|
|**04**|`object_entity`|`array`|Target entities (states, corporations) affected by the event.|
|**05**|`location`|`object`|`{"country": "string", "coord": [lat, lng]}`. Physical event coordinates.|
|**06**|`time_frame`|`string`|ISO 8601 (UTC/Z). Strict temporal boundary for deterministic hashing.|

---

## Category II: Dynamics & Structure

Quantifies the causal relationships and potential energy vectors acting upon the system.

|**TAG**|**Field Name**|**Type**|**Definition / Range**|
|---|---|---|---|
|**07**|`actor_role`|`enum`|`state`, `corporation`, `individual`, `algo`. Kinetic variable of power structures.|
|**08**|`causality_direction`|`enum`|`upstream`, `midstream`, `downstream`. Relative position in the causal chain.|
|**09**|`strategic_interest_vector`|`object`|6 dimensions (Security, Economy, Tech, Resource, Ideology, Environment) from `-1.0` to `1.0`. Base for calculating structural divergence ($\Delta V$).|
|**10**|`epistemic_confidence`|`float`|`0.0` to `1.0`. Objective mass of evidence. Modulates the effective mass in kinetic calculations.|

---

## Category III: Bias & Audit

Records structural divergence and the fault lines across multiple inference models.

|**TAG**|**Field Name**|**Type**|**Definition / Range**|
|---|---|---|---|
|**11**|`bias_component`|`object`|Extracted emotional load and perspective centroid.|
|**12**|`model_differential`|`object`|`{"consensus": [], "conflict": []}`. Tri-model differential capturing epistemic fault lines.|
|**13**|`global_synthesis`|`string`|Max 400 chars. Objective anatomical summary of the event.|
|**14**|`n_o_variants`|`object`|Parallel dimensional descriptions based on the 6 Narrative Origins (N.O.).|
|**15**|`source_credibility`|`float`|`0.0` to `1.0`. Historical credibility score of the primary source.|

---

## Category IV: Impact & Risk

Calculates projected ripple effects and subtracts physical contradictions.

|**TAG**|**Field Name**|**Type**|**Definition / Range**|
|---|---|---|---|
|**16**|`economic_transmission_path`|`array`|Vectorized list of affected economic sectors.|
|**17**|`silence_reasons`|`array`|Structural analysis of targeted information voids and suppression.|
|**18**|`precedent_audit`|`array`|Reference IDs for historical or legal precedents.|
|**19**|`conflict_factuality_index`|`float`|`0.0` to `1.0`. CFI penalty score. Functions as a repulsive force in the T35 decision engine.|

---

## Category V: Content & Presentation

Maps thermodynamic outputs to geometric rendering standards.

|**TAG**|**Field Name**|**Type**|**Definition / Range**|
|---|---|---|---|
|**20**|`backbone_history`|`string`|Max 1000 chars. Description of continuous historical causality.|
|**21**|`deep_dive`|`string`|Max 1400 chars. Structural deep analysis governed by external intent variable ($\lambda_4$).|
|**22**|`epistemic_diffusion_state`|`enum`|`Crystallized`, `Diffused`, `Polarized`. Visual state definition derived from entropy ($H$) and CFI.|

---

## Category VI: Immutability & Base Crystallization

Secures the base variables via cryptographic sealing.

|**TAG**|**Field Name**|**Type**|**Definition / Range**|
|---|---|---|---|
|**23**|`provenance_hash`|`string`|SHA-256 intermediate verification hash for TAGs 01–22.|
|**24**|`schema_version`|`string`|`6.0.0` (Semantic Versioning). Ensures deterministic decryption logic.|
|**25**|`state_hash`|`string`|**Base Reality Anchor.** *Definition:* JCS-normalized SHA-256 hash of TAG 01–34 (excluding TAG 25 itself). *Normative formula:* below.|

### TAG 25 (`state_hash`) — Normative preimage

**Definition.** JCS-normalized SHA-256 hash of TAG 01–34 (excluding TAG 25 itself).

**Formula.**

$$state\_hash = \text{SHA256}(\text{JCS}(T_{01}, \dots, T_{24}, T_{26}, \dots, T_{34}))$$

**Conformance.** The ordered set of field keys in the JCS object MUST equal `STATE_HASH_JCS_KEYS` in `sdk/tag_v6.py` (canonical `TAG_FIELD_ORDER` with `state_hash` and `worldline_optimization` omitted). TAG 35 (`worldline_optimization`) is never an input to the anchor hash.

---

## Category VII: Kinetics & Branching

Executes physical calculations for prediction, probabilistic superposition, and spatial collapse.

|**TAG**|**Field Name**|**Type**|**Definition / Range**|
|---|---|---|---|
|**26**|`predictive_kinetic_metrics`|`object`|Contains initial velocity $v_t$, acceleration $a_t$, and calculated rupture probability $P_{risk}$.|
|**27**|`branching_futures`|`array`|Superposition state generator. Outputs multiple worldline candidate objects $\{ \hat{P}_{t+1}^{(i)}, E^{(i)}, P^{(i)} \}$ using Boltzmann sampling.|
|**28**|`collapse_state`|`object`|Records the convergence logic (`HARD` or `SOFT`), final coordinates $P_{t+1}$, and the ghost intensity of rejected branches.|

---

## Category VIII: Memory & Adaptation

Manages the retention of rejected realities and autonomous system optimization.

|**TAG**|**Field Name**|**Type**|**Definition / Range**|
|---|---|---|---|
|**29**|`counterfactual_memory`|`object`|Retains rejected branches. Generates a $Regret$ score based on normalized cosine alignment ($\cos\theta$) with new observations.|
|**30**|`self_correction_deltas`|`object`|Records adjustments to internal parameters ($\theta \leftarrow \theta - \eta \cdot \nabla_\theta Regret$), specifically shifts in inertia ($\alpha$) and weights ($\lambda$).|

---

## Category IX: Meta-Cognition & Relative Time

Describes the system's internal state self-referentially and governs proper time progression.

|**TAG**|**Field Name**|**Type**|**Definition / Range**|
|---|---|---|---|
|**31**|`meta_cognition_state`|`object`|Quantifies system entropy and divergence into a Self-Awareness Index ($SAI$) and a 3D Bias Vector.|
|**32**|`self_model_identity`|`object`|Defines system identity $S = (P_t, M_t, \Theta, C, H)$. Binds `timeline_id` and `parent_state_hash` to prove continuity.|
|**33**|`relative_time_field`|`object`|Calculates proper time interval $d\tau$ based on state displacement ($v, a$) and potential field delay, abandoning absolute time.|
|**34**|`time_reversal_forks`|`array`|Logs instances where $Regret$ thresholds trigger a loop to a past `state_hash`, executing a timeline fork to generate $P_{t'}^*$.|

---

## Category X: Reality Selection

Integrates all preceding modules to mathematically seal the final trajectory.

|**TAG**|**Field Name**|**Type**|**Definition / Range**|
|---|---|---|---|
|**35**|`worldline_optimization`|`object`|**The Final Closure**. Extracts the optimal trajectory by evaluating the time integral ($\int d\tau$) of $Regret$, $\Delta V$, Coherence, and human Value. Determines the final reality selection.|

---

_© 2026 Gemmina Intelligence LLC. — Protocol Standard v6.0.0_ _Acta AIIE Standardization Committee_
