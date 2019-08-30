import React from "react";
import AceEditor from "react-ace";

import "brace/mode/markdown";
import "brace/theme/monokai";
import "brace/ext/searchbox";
import "brace/ext/language_tools";

const Editor = React.forwardRef(({ input, setInput, previewRef }, ref) => {
  const handleScroll = e => {
    const lineNum = ref.current.editor.getFirstVisibleRow();

    const allNodes = document.querySelectorAll("[data-sourcepos]");
    for (const node of allNodes) {
      const sourcePos = node.getAttribute("data-sourcepos");
      const firstDoubleDotIdx = sourcePos.indexOf(":");
      const startLineNum = parseInt(sourcePos.slice(0, firstDoubleDotIdx));

      const secondDoubleDotIdx = sourcePos.indexOf(":", firstDoubleDotIdx + 1);
      const dashIdx = sourcePos.indexOf("-");

      const endLineNum = parseInt(
        sourcePos.slice(dashIdx + 1, secondDoubleDotIdx)
      );
      if (lineNum >= startLineNum && lineNum <= endLineNum) {
        console.log(startLineNum, endLineNum, lineNum, node);
        previewRef.current.scroll(0, node.getBoundingClientRect().top);
        break;
      }
    }
  };

  const handleChange = newValue => {
    setInput(newValue);
    // const allNodes = document.querySelectorAll("[data-sourcepos]");
    // for (const node of allNodes) {
    //   console.log(node.offsetHeight);
    // }
  };

  return (
    <AceEditor
      style={{
        width: "100%",
        height: "calc(100vh - 64px)"
      }}
      ref={ref}
      mode="markdown"
      theme="monokai"
      onChange={handleChange}
      onScroll={handleScroll}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={input}
      editorProps={{ $blockScrolling: true }}
      enableBasicAutocompletion={true}
      enableLiveAutocompletion={true}
    />
  );
});

export default Editor;
