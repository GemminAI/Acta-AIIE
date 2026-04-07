# RFC-0002: AIIE Post-Collapse Expansion (PCE) — Detection Protocol

| Field | Value |
|-------|--------|
| **Status** | RATIFIED |
| **Date** | 2026-04-07 |
| **Authors** | Acta AIIE Standardization Committee |
| **Language** | EN |

---

## 1. Normative reference

This RFC **normatively refines** §11 (*Post-Collapse Expansion*) of:

**[`../Acta_AIIE_Protocol_Definition_v1.0.0.md`](../Acta_AIIE_Protocol_Definition_v1.0.0.md)**.

In case of conflict, **v1.0.0** prevails. This RFC specifies **detection stages**, **logging fields**, and **minimum instrumentation** for PCE.

---

## 2. Purpose

Define an operational **PCE detection pipeline** so that:

- Ignition, confirmation, and rejection (noise) are distinguishable in logs.
- Trajectory velocity $v(t)$ and statistical significance are recorded consistently.

---

## 3. State variables (normative)

Let $\sigma^2_t$ be the variance of **semantic alignment attributes** at time $t$ (exact attribute set is implementation-defined but MUST be fixed per deployment and documented).

Parameters (deployment-specific, MUST be versioned):

- $\theta_{\text{floor}}$ — upper bound of collapsed regime variance.
- $\theta_{\text{expand}}$ — expansion threshold.

---

## 4. Detection stages

### 4.1 Ignition (candidate)

$$
\text{PCE}^{\text{cand}}_t \iff \sigma^2_{t-1} < \theta_{\text{floor}} \;\wedge\; \sigma^2_t > \theta_{\text{expand}}
$$

(v1.0.0 §11.2)

### 4.2 Confirmation (ratified event)

$$
\text{PCE}^{\text{conf}}_{t+1} \iff \text{PCE}^{\text{cand}}_t \;\wedge\; \sigma^2_{t+1} > \theta_{\text{expand}}
$$

(v1.0.0 §11.3)

### 4.3 Statistical gate

A transition MUST NOT be logged as **PCE confirmed** unless:

$$
p < 0.05 \quad \text{vs. } H_0 \text{ (independent Gaussian null for displacement / variance spike)}
$$

(v1.0.0 §11.4)

### 4.4 Geometric displacement

Record $\|s_{t+1} - s_t\|_2$ alongside $\sigma^2_t$ for every candidate.

---

## 5. Trajectory velocity (early warning)

$$
v(t) \approx \frac{\|s_t - s_{t-1}\|_2}{\Delta t}
$$

(v1.0.0 §11.5). Sustained high $v(t)$ MUST surface as **Early Warning** per deployment policy; MUST be available to Intelligence Log (POST-5).

---

## 6. Tag mapping (informative)

T33 (`PCE_Flag`) reflects $\Pi$-stabilized confirmation. T26 (`Rupture_Risk`) MAY feed worldline count (v1.0.0 §8.3) but MUST NOT be treated as a substitute for §4 confirmation.

---

## 7. Hysteresis note

Reactivation thresholds differ from collapse conditions (v1.0.0 §11.2). Implementations MUST NOT assume symmetric thresholds without explicit calibration.

---

*End of RFC-0002*
