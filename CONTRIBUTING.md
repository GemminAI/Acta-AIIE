Contributing to the Acta AIIE Protocol

Thank you for your interest in contributing. This document defines the standards and process for proposing changes to the Acta AIIE Protocol specification and its reference implementation.

Theoretical Lineage & Academic Foundation

The Acta AIIE Protocol is an engineering realization of the "Narrative Physics" theory. Its mathematical foundation was established in the following work:

Original Paper: Narrative Crystallization: A Deterministic Framework for Measuring Global Narrative States (SSRN Abstract Id: 6419019).

Core Contributor: Tomohiko Nakamura (ORCID: 0009-0005-5136-1218)

Evolution from 24TAG to 35TAG:
The initial specification (described in the SSRN paper) utilized a 24TAG structure for deterministic state extraction. The current standard has evolved into the 35TAG (v6.x) architecture, integrating the $T_{35}$ Thermodynamic Engine and QFOM (Quantum-Formalism Observation Model). Contributors are expected to respect the foundational principles of "Crystallization" while advancing the geometric dynamics of the 35TAG standard.

Spec / Implementation Separation

Before contributing, understand this distinction:

specs/ — Protocol rules. Changes here affect all compliant implementations worldwide.

sdk/ — Reference implementation by Gemmina Intelligence LLC. Other implementations may differ in technology stack, but must produce identical state_hash outputs.

A contribution to specs/ is a protocol change. A contribution to sdk/ is an implementation improvement.

Crystallization Compliance is Non-Negotiable

Any code that touches hash generation must:

Pass all 49 vectors in sdk/selftest_vectors.json

Produce output identical to the Official Implementation Hash: 3a5a3a9d1b13367621b5b34cc25a0d886a7da39ef91015a3f757ae37908602b8

Implement UTF-16 key sorting (not lexicographic)

Implement ECMA-262 numeric serialization

Raise an error (not silently handle) on NaN, Infinity, or lone surrogates

A pull request that breaks any of these is rejected regardless of other merits.

How to Propose a Protocol Change

Open an Issue describing the problem and proposed change

Reference the specific TAG number(s) or layer(s) affected

Provide a concrete example showing current vs. proposed behavior

If the change affects state_hash generation, it is a MAJOR version change

Version Bump Rules

Change Type

Version Bump

Example

New TAG or structural change

MAJOR

4.x.x → 5.0.0

New enum value or field constraint

MINOR

4.1.x → 4.2.0

Clarification or documentation fix

PATCH

4.1.0 → 4.1.1

Pull Request Requirements

Branch from main

One concern per PR

Update CHANGELOG.md under [Unreleased]

If modifying specs/, update the corresponding section in README.md

If modifying sdk/, confirm selftest_vectors.json still passes 49/49

Code Style (SDK)

Python: PEP 8, type hints on all public functions

No assert statements in production code (use if not isinstance + logger.critical)

All exceptions must be explicit — no bare except:

Timestamps: always ISO 8601 UTC/Z, YYYY-MM-DDTHH:mm:ssZ

Governance

The Acta AIIE Protocol is maintained by the Acta AIIE Standardization Committee at Gemmina Intelligence LLC.

Final decisions on protocol changes rest with the Committee. This follows the model of IETF working groups: open discussion, but a designated authority holds the pen on the official specification.

© 2026 Gemmina Intelligence LLC. — Acta AIIE Standardization Committee
