declare module "*.md" {
  const content: string;
  export default content;
}

// declare module "*.md" {
//   const markdown: string;
//   //   const attributes: Record<string, unknown>;

//   //   const toc: { level: string; content: string }[];

//   //   const html: string;

//   //   const raw: string;

//   //   const markdown: string;

//   //   import React from "react";
//   //   const ReactComponent: React.VFC;

//   //   // Modify below per your usage
//   //   export { attributes, markdown, toc, html, ReactComponent };
//   export { markdown };
// }
