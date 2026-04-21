# **Contributing to the Acta AIIE Protocol**

Thank you for your interest in contributing. This document defines the standards and process for proposing changes to the Acta AIIE Protocol specification and its reference implementation.

## **Theoretical Lineage & Academic Foundation**

The Acta AIIE Protocol is an engineering realization of the "Narrative Physics" theory. Its mathematical foundation was established in the following work:

* **Original Paper**: [*Narrative Crystallization: A Deterministic Framework for Measuring Global Narrative States*](https://www.google.com/search?q=https://ssrn.com/abstract%3D6419019) (SSRN Abstract Id: 6419019).  
* **Core Contributor**: [Tomohiko Nakamura (ORCID: 0009-0005-5136-1218)](https://www.google.com/search?q=https://orcid.org/0009-0005-5136-1218)

**Evolution from 24TAG to 35TAG**:

The initial specification (described in the SSRN paper) utilized a **24TAG** structure for deterministic state extraction. The current standard has evolved into the **35TAG (v6.x)** architecture, integrating the ![][image1] Thermodynamic Engine and QFOM (Quantum-Formalism Observation Model). Contributors are expected to respect the foundational principles of "Crystallization" while advancing the geometric dynamics of the 35TAG standard.

## **Spec / Implementation Separation**

Before contributing, understand this distinction:

* **specs/** — Protocol rules. Changes here affect all compliant implementations worldwide.  
* **sdk/** — Reference implementation by Gemmina Intelligence LLC. Other implementations may differ in technology stack, but must produce identical state\_hash outputs.

A contribution to specs/ is a protocol change. A contribution to sdk/ is an implementation improvement.

## **Crystallization Compliance is Non-Negotiable**

Any code that touches hash generation must:

1. Pass all 49 vectors in sdk/selftest\_vectors.json  
2. Produce output identical to the Official Implementation Hash: 3a5a3a9d1b13367621b5b34cc25a0d886a7da39ef91015a3f757ae37908602b8  
3. Implement UTF-16 key sorting (not lexicographic)  
4. Implement ECMA-262 numeric serialization  
5. Raise an error (not silently handle) on NaN, Infinity, or lone surrogates

A pull request that breaks any of these is rejected regardless of other merits.

## **How to Propose a Protocol Change**

1. **Open an Issue** describing the problem and proposed change  
2. Reference the specific TAG number(s) or layer(s) affected  
3. Provide a concrete example showing current vs. proposed behavior  
4. If the change affects state\_hash generation, it is a **MAJOR** version change

### **Version Bump Rules**

| Change Type | Version Bump | Example |
| :---- | :---- | :---- |
| New TAG or structural change | MAJOR | 4.x.x → 5.0.0 |
| New enum value or field constraint | MINOR | 4.1.x → 4.2.0 |
| Clarification or documentation fix | PATCH | 4.1.0 → 4.1.1 |

## **Pull Request Requirements**

* Branch from main  
* One concern per PR  
* Update CHANGELOG.md under \[Unreleased\]  
* If modifying specs/, update the corresponding section in README.md  
* If modifying sdk/, confirm selftest\_vectors.json still passes 49/49

## **Code Style (SDK)**

* Python: PEP 8, type hints on all public functions  
* No assert statements in production code (use if not isinstance \+ logger.critical)  
* All exceptions must be explicit — no bare except:  
* Timestamps: always ISO 8601 UTC/Z, YYYY-MM-DDTHH:mm:ssZ

## **Governance**

The Acta AIIE Protocol is maintained by the **Acta AIIE Standardization Committee** at Gemmina Intelligence LLC.

Final decisions on protocol changes rest with the Committee. This follows the model of IETF working groups: open discussion, but a designated authority holds the pen on the official specification.

*© 2026 Gemmina Intelligence LLC. — Acta AIIE Standardization Committee*

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAYCAYAAADkgu3FAAABZ0lEQVR4Xu1UPS8FURDdlyeEUIgsyX5/xSaPQkVCgeQlSqJS+Sc6hT+gF4VCoRQa/oFOrXh+gkYQziR3ZN689XatreSdZLJzz7kzc2fuzVrWCCNohGH4UWLvsBfYk+/7yzq+EoIgOIPdSA4JP8kkx7zmKqMouPFC6KSL4DvNDyn0prlKQGAvy7IJRbepCA5xq3griqJLzdUG3ZfpZkxrjeKnsTWKTqczbgpda42BjpeSJFlU3Kxt29O8xoj3pD4AFDiiQnEcr2qNAO0VWo5Ea7JrrHd4EmR5ns/IuAGUjY00nP6QfRTYNf42+I3+3UNQVghos6M62my6EO15pD0Y4QJzVITj8N0vvCNOXmR6L8PzvEmlt4Tf120tOI4zxT6SXXBC87/sCo3ub4XXvwI9X3lS+Fe8NhN4ENrfOkKCZ3xaaZrOy2Q4/QHWp2bPPWz9O6gukOQYiU8s8QIJruvOQTuHtiX5/4kvTNJ3qSpw3bcAAAAASUVORK5CYII=>
