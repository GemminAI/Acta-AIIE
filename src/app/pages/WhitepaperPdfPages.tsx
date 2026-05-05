import { DocHeader } from "../components/DocHeader";
import { DocPage, Section, SectionTitle, Body, InfoBox } from "../components/DocPage";

const MONO = "'JetBrains Mono', monospace";

type PdfWhitepaperPageProps = {
  docId: string;
  title: string;
  subtitle: string;
  status: string;
  version: string;
  pdfPath: string;
  summary: string;
};

function PdfWhitepaperPage({
  docId,
  title,
  subtitle,
  status,
  version,
  pdfPath,
  summary,
}: PdfWhitepaperPageProps) {
  return (
    <DocPage>
      <DocHeader
        docId={docId}
        title={title}
        subtitle={subtitle}
        status={status}
        version={version}
        author="Gemmina Intelligence LLC. — Pure Information Laboratory"
        compliance="Acta AIIE · RFC 8785"
      />

      <Section num="0.0">
        <SectionTitle>Document Access</SectionTitle>
        <Body>{summary}</Body>
        <InfoBox accent>
          If the embedded viewer is unavailable in your browser, use the download link below to open the canonical PDF.
        </InfoBox>
        <a
          href={pdfPath}
          download
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            margin: "8px 0 24px",
            padding: "10px 14px",
            border: "1px solid #38bdf8",
            color: "#38bdf8",
            fontFamily: MONO,
            fontSize: "10px",
            letterSpacing: "0.08em",
            textDecoration: "none",
            textTransform: "uppercase",
          }}
        >
          Download PDF ↗
        </a>
      </Section>

      <div
        style={{
          border: "1px solid #1a2530",
          background: "#050810",
          height: "78vh",
          minHeight: "640px",
        }}
      >
        <iframe
          title={title}
          src={pdfPath}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            background: "#050810",
          }}
        />
      </div>
    </DocPage>
  );
}

export function NomosPhysicalReasoning() {
  return (
    <PdfWhitepaperPage
      docId="AIIE-WP-NOMOS"
      title="From Probabilistic Generation to Physical Reasoning"
      subtitle="Geometric Stability via Energy-Based Consistency Repair"
      status="Working Paper"
      version="2026-05"
      pdfPath="/papers/nomos-physical-reasoning.pdf"
      summary="This working paper introduces the NOMOS transition from probabilistic generation to physical reasoning, grounding inference in geometric stability and energy-based consistency repair."
    />
  );
}

export function SCMTValidationReport() {
  return (
    <PdfWhitepaperPage
      docId="EXP-001"
      title="Structure-Constrained Machine Translation (SCMT): Inter-Rater Validation"
      subtitle="EXP-001 Final Report — Cohen's κ = 1.000"
      status="Empirical Report"
      version="2026-05-05"
      pdfPath="/papers/scmt-validation-exp001.pdf"
      summary="This empirical report documents the EXP-001 human evaluation of Structure-Constrained Machine Translation, including inter-rater validation and perfect Cohen's kappa agreement."
    />
  );
}
