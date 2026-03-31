import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { Protocol24TAG } from "./pages/Protocol24TAG";
import { MathStandardization } from "./pages/MathStandardization";
import { WhitepapersIndex } from "./pages/WhitepapersIndex";
import { NarrativeQuantification } from "./pages/NarrativeQuantification";
import { NarrativeObservation } from "./pages/NarrativeObservation";
import { JCSSDK } from "./pages/JCSSDK";
import { OrgStructure } from "./pages/OrgStructure";
import { HxtFormat } from "./pages/HxtFormat";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "protocol/24tag-schema", Component: Protocol24TAG },
      { path: "protocol/mathematical-standardization", Component: MathStandardization },
      { path: "/protocol/hxt-format", Component: HxtFormat },
      { path: "whitepapers", Component: WhitepapersIndex },
      { path: "whitepapers/narrative-quantification", Component: NarrativeQuantification },
      { path: "whitepapers/narrative-observation", Component: NarrativeObservation },
      { path: "sdk/crystallization-engine", Component: JCSSDK },
      { path: "org/structure", Component: OrgStructure },
    ],
  },
]);
