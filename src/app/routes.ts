import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { Protocol35TAG } from "./pages/Protocol35TAG";
import { MathStandardization } from "./pages/MathStandardization";
import { WhitepapersIndex } from "./pages/WhitepapersIndex";
import { NarrativeQuantification } from "./pages/NarrativeQuantification";
import { NarrativeObservation } from "./pages/NarrativeObservation";
import { JCSSDK } from "./pages/JCSSDK";
import { OrgStructure } from "./pages/OrgStructure";
import { HxtFormat } from "./pages/HxtFormat";
import { RFCIndex } from "./pages/RFCIndex";
import { ProtocolDefinition } from "./pages/ProtocolDefinition";
import { RFC0005 } from "./pages/RFC0005";
import { RFC0006 } from "./pages/RFC0006";
import { RFC0007 } from "./pages/RFC0007";
import { RFC0008 } from "./pages/RFC0008";
import { RFC0009, RFC0010, RFC0011, RFC0012, RFC0013, RFC0014 } from "./pages/RFC0009to0014";
import {
  RFC0015,
  RFC0016,
  RFC0017,
  RFC0018,
  RFC0019,
  RFC0020,
  RFC0021,
  RFC0022,
  RFC0023,
  RFC0024,
  RFC0025,
  RFC0026,
  RFC0027,
  RFC0028,
  RFC0029,
  RFC0030,
  RFC0031,
} from "./pages/RFC0015to0031";
import { NarrativeQM3 } from "./pages/NarrativeQM3";
import { AboutPage } from "./pages/AboutPage";
import { NomosPhysicalReasoning, SCMTValidationReport } from "./pages/WhitepaperPdfPages";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "protocol/24tag-schema", Component: Protocol35TAG },
      { path: "protocol/35tag-schema", Component: Protocol35TAG },
      { path: "protocol/definition", Component: ProtocolDefinition },
      { path: "protocol/mathematical-standardization", Component: MathStandardization },
      { path: "/protocol/hxt-format", Component: HxtFormat },
      { path: "whitepapers", Component: WhitepapersIndex },
      { path: "whitepapers/narrative-quantification", Component: NarrativeQuantification },
      { path: "whitepapers/narrative-observation", Component: NarrativeObservation },
      { path: "whitepapers/narrative-qm3", Component: NarrativeQM3 },
      { path: "whitepapers/nomos-physical-reasoning", Component: NomosPhysicalReasoning },
      { path: "whitepapers/scmt-validation-exp001", Component: SCMTValidationReport },
      { path: "sdk/crystallization-engine", Component: JCSSDK },
      { path: "org/structure", Component: OrgStructure },
      { path: "rfc", Component: RFCIndex },
      // RFC-0001〜0004: 既存（RFCIndex に統合）
      { path: "rfc/0001", Component: RFCIndex },
      { path: "rfc/0002", Component: RFCIndex },
      { path: "rfc/0003", Component: RFCIndex },
      { path: "rfc/0004", Component: RFCIndex },
      // RFC-0005〜0014: 個別ページ
      { path: "rfc/0005", Component: RFC0005 },
      { path: "rfc/0006", Component: RFC0006 },
      { path: "rfc/0007", Component: RFC0007 },
      { path: "rfc/0008", Component: RFC0008 },
      { path: "rfc/0009", Component: RFC0009 },
      { path: "rfc/0010", Component: RFC0010 },
      { path: "rfc/0011", Component: RFC0011 },
      { path: "rfc/0012", Component: RFC0012 },
      { path: "rfc/0013", Component: RFC0013 },
      { path: "rfc/0014", Component: RFC0014 },
      { path: "rfc/0015", Component: RFC0015 },
      { path: "rfc/0016", Component: RFC0016 },
      { path: "rfc/0017", Component: RFC0017 },
      { path: "rfc/0018", Component: RFC0018 },
      { path: "rfc/0019", Component: RFC0019 },
      { path: "rfc/0020", Component: RFC0020 },
      { path: "rfc/0021", Component: RFC0021 },
      { path: "rfc/0022", Component: RFC0022 },
      { path: "rfc/0023", Component: RFC0023 },
      { path: "rfc/0024", Component: RFC0024 },
      { path: "rfc/0025", Component: RFC0025 },
      { path: "rfc/0026", Component: RFC0026 },
      { path: "rfc/0027", Component: RFC0027 },
      { path: "rfc/0028", Component: RFC0028 },
      { path: "rfc/0029", Component: RFC0029 },
      { path: "rfc/0030", Component: RFC0030 },
      { path: "rfc/0031", Component: RFC0031 },
    ],
  },
]);
