/// <reference types="vite/client" />

declare module "*.md?raw" {
  const content: string;
  export default content;
}

declare module "../../../paper/narrative_quantification.md?raw" {
  const content: string;
  export default content;
}
