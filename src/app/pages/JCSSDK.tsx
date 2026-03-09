import { DocHeader } from "../components/DocHeader";
import { DocPage, Section, SectionTitle, SubsectionTitle, Body, BulletList, CodeBlock, InlineCode, InfoBox } from "../components/DocPage";

const MONO = "'JetBrains Mono', monospace";

const PYTHON_EXAMPLE = `import hashlib
from acta_aiie_jcs import jcs_engine_serialize

def generate_state_hash(tags_dict):
    """
    Generates a 'Cryptographic Fingerprint' with zero-bit tolerance.
    
    Args:
        tags_dict: A dictionary containing TAG 01 through TAG 24.
    
    Returns:
        A 64-character hexadecimal SHA-256 hash string.
    
    Raises:
        ValueError: If any field contains invalid data types
                    (NaN, Infinity, lone surrogates).
    """
    # 1. Ensure Data Integrity
    #    - Convert floats to ECMA-262 compliant decimals
    #    - Format dates to ISO 8601 (UTC/Z)
    #    - Validate all 24 required fields are present
    normalized_data = prepare_data(tags_dict)
    
    # 2. RFC 8785 Compliant Serialization (Crystallization)
    #    - Sort keys by UTF-16 code unit order
    #    - Apply ECMA-262 numeric serialization
    #    - Enforce Z-suffixed timestamps
    jcs_string = jcs_engine_serialize(normalized_data)
    
    # 3. SHA-256 Hashing — The Crystallization Seal
    return hashlib.sha256(jcs_string.encode('utf-8')).hexdigest()`;

const SELFTEST_EXAMPLE = `# Verify compliance with the AIIE Crystallization Specification
# All 49 test vectors must pass for certification.

from acta_aiie_jcs import run_selftest

results = run_selftest('selftest_vectors.json')

print(f"Tests passed: {results.passed}/49")
print(f"Tests failed: {results.failed}/49")

if results.passed == 49:
    print("✓ ENVIRONMENT CERTIFIED FOR CRYSTALLIZATION")
    print(f"  Certification hash: {results.certification_hash}")
else:
    print("✗ NON-COMPLIANT ENVIRONMENT")
    print("  state_hash output will diverge from reference implementation")
    for failure in results.failures:
        print(f"  FAIL [{failure.vector_id}]: {failure.description}")`;

const ROADMAP_ITEMS = [
  { lang: "Python SDK", desc: "Reference Implementation", status: "Completed", note: "Available via pip install acta-aiie-jcs" },
  { lang: "TypeScript SDK", desc: "Front-end verification layer", status: "In Development", note: "Browser-compatible implementation for UI-level integrity checks" },
  { lang: "PHP/Laravel SDK", desc: "Storage-layer immutability checks", status: "In Development", note: "Middleware integration for server-side crystallization validation" },
  { lang: "Go SDK", desc: "High-performance backend implementation", status: "Planned", note: "Optimized for high-throughput data pipeline crystallization" },
  { lang: "Rust SDK", desc: "Systems-level implementation", status: "Planned", note: "Zero-overhead crystallization for embedded and edge environments" },
];

export function JCSSDK() {
  return (
    <DocPage>
      <DocHeader
        title="Acta AIIE JCS SDK — The Crystallization Engine"
        subtitle="Reference implementation of the JCS normalization engine for generating state_hash with zero-bit variance across all compliant environments."
        canonicalHash="3a5a3a9d1b13367621b5b34cc25a0d886a7da39ef91015a3f757ae37908602b8"
        status="Candidate"
        version="v1.0.0"
        author="Acta AIIE Standardization Committee"
        compliance="RFC 8785 · ECMA-262 · SHA-256"
        docId="AIIE-SDK-001"
      />

      <Section num="1.0">
        <SectionTitle>Objective</SectionTitle>
        <Body>
          Within the AIIE Protocol, information reliability is anchored by mathematical immutability. This SDK provides the normalization logic required to transition 24TAG JSON data into an immutable state, enabling the generation of a <InlineCode>state_hash</InlineCode> with zero-bit variance across all compliant systems.
        </Body>
        <Body>
          The JCS Crystallization Engine eliminates the subtle ambiguities that arise when different programming languages, JSON libraries, and numeric representations produce slightly different serializations of the same data. By enforcing a single canonical form — defined by RFC 8785 — the SDK guarantees that the same 24 tags will always produce the same <InlineCode>state_hash</InlineCode>, on any machine, in any environment.
        </Body>
        <InfoBox accent>
          The fundamental guarantee of the Crystallization Engine: given identical TAG 01–24 values, the <InlineCode>state_hash</InlineCode> output will be bit-for-bit identical across Python, TypeScript, PHP, and any other compliant SDK implementation. This cross-language consistency is the mathematical foundation of the AIIE Protocol's verifiability.
        </InfoBox>
      </Section>

      <Section num="2.0">
        <SectionTitle>Technical Specifications</SectionTitle>
        <Body>
          To eliminate the ambiguities inherent in standard libraries (such as Python's default JSON encoder), this SDK implements the following rigorous processing rules:
        </Body>
        <BulletList
          items={[
            { label: "UTF-16 Key Sorting", content: "Sorts dictionary keys based on their binary (UTF-16 code unit) order — not Unicode code point order, not locale-aware alphabetical order. This matches the specification of RFC 8785 exactly." },
            { label: "Numeric Serialization", content: "Executes numeric conversion in compliance with ECMA-262 (JavaScript standards) to eliminate floating-point representation errors. For example, 0.1 is serialized as '0.1', not '0.10000000000000001'." },
            { label: "Data Integrity Enforcement", content: "Immediately raises a ValueError upon detecting invalid data types — such as NaN, Infinity, or lone surrogates — to ensure the absolute purity of the output." },
            { label: "Timestamp Normalization", content: "All datetime objects are serialized with a mandatory Z suffix, eliminating timezone offset ambiguity across execution environments." },
          ]}
        />
      </Section>

      <Section num="3.0">
        <SectionTitle>Implementation Example (Python)</SectionTitle>
        <Body>
          Standard implementation for generating a <InlineCode>state_hash</InlineCode> within environments such as GCP Cloud Functions, AWS Lambda, or on-premises compute:
        </Body>
        <CodeBlock lang="Python · acta_aiie_jcs">{PYTHON_EXAMPLE}</CodeBlock>

        <SubsectionTitle>3.1 Self-Test & Certification</SubsectionTitle>
        <Body>
          Before deploying any implementation to production, all 49 self-test vectors must pass. This repository includes <InlineCode>selftest_vectors.json</InlineCode> containing 49 precisely crafted test cases that cover all edge cases in the normalization specification:
        </Body>
        <CodeBlock lang="Python · Certification Workflow">{SELFTEST_EXAMPLE}</CodeBlock>
      </Section>

      <Section num="4.0">
        <SectionTitle>Implementation Roadmap</SectionTitle>
        <Body>
          The Crystallization Engine is being implemented across all major programming platforms to ensure universal verifiability of AIIE Protocol objects.
        </Body>

        <div style={{ border: "1px solid #1a2530", overflow: "hidden" }}>
          {/* Table Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 2fr",
              borderBottom: "1px solid #1a2530",
              background: "#080c10",
            }}
          >
            {["Language / Platform", "Component", "Status", "Notes"].map((h) => (
              <div
                key={h}
                style={{
                  padding: "8px 14px",
                  fontFamily: MONO,
                  fontSize: "8px",
                  color: "#2d4455",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {h}
              </div>
            ))}
          </div>

          {/* Table Rows */}
          {ROADMAP_ITEMS.map((item, i) => (
            <div
              key={item.lang}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 2fr",
                borderBottom: i < ROADMAP_ITEMS.length - 1 ? "1px solid #0d1a24" : "none",
                background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.012)",
              }}
            >
              <div
                style={{
                  padding: "10px 14px",
                  fontFamily: MONO,
                  fontSize: "11px",
                  color: "#5a9ab8",
                  letterSpacing: "0.01em",
                }}
              >
                {item.lang}
              </div>
              <div
                style={{
                  padding: "10px 14px",
                  fontFamily: MONO,
                  fontSize: "11px",
                  color: "#5a7a8e",
                  letterSpacing: "0.01em",
                }}
              >
                {item.desc}
              </div>
              <div style={{ padding: "10px 14px", display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: "9px",
                    color: item.status === "Completed" ? "#38bdf8" : item.status === "In Development" ? "#7aafb8" : "#3d5a72",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "2px 6px",
                    border: `1px solid ${item.status === "Completed" ? "rgba(56,189,248,0.4)" : item.status === "In Development" ? "rgba(122,175,184,0.3)" : "#1a2530"}`,
                  }}
                >
                  {item.status}
                </span>
              </div>
              <div
                style={{
                  padding: "10px 14px",
                  fontFamily: MONO,
                  fontSize: "10px",
                  color: "#4a6070",
                  lineHeight: 1.7,
                  letterSpacing: "0.01em",
                }}
              >
                {item.note}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section num="5.0">
        <SectionTitle>Integrity Verification Protocol</SectionTitle>
        <Body>
          This repository includes <InlineCode>selftest_vectors.json</InlineCode> to verify compliance with the specification. An environment is only certified for "Crystallization" once it passes all 49 test vectors. These vectors are designed to expose edge cases in:
        </Body>
        <BulletList
          items={[
            { label: "Key Ordering", content: "Edge cases in UTF-16 code unit ordering, including keys with mixed ASCII/Unicode characters and keys with identical prefixes." },
            { label: "Numeric Precision", content: "IEEE 754 floating-point edge cases including values that require exponential notation switching under ECMA-262 rules." },
            { label: "String Handling", content: "Unicode normalization, surrogate pair handling, and special character escaping rules." },
            { label: "Timestamp Formats", content: "Various input timestamp formats that must all normalize to the same ISO 8601 UTC/Z representation." },
          ]}
        />
        <InfoBox accent>
          <strong style={{ fontFamily: MONO, fontSize: "12px", color: "#38bdf8", fontWeight: 600 }}>49/49 is the only acceptable result.</strong> A score of 48/49 indicates a non-compliant implementation that will produce divergent <InlineCode>state_hash</InlineCode> values in at least one edge case — invalidating the cross-environment integrity guarantee of the AIIE Protocol.
        </InfoBox>
      </Section>
    </DocPage>
  );
}
