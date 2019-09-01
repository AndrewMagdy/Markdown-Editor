import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import prism from "react-syntax-highlighter/dist/esm/styles/prism/prism";

const PrismCodeHighlighter = ({ language, value }) => (
  <SyntaxHighlighter language={language} style={prism}>
    {value}
  </SyntaxHighlighter>
);

export default PrismCodeHighlighter;
