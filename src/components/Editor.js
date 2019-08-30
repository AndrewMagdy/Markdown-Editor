import React from "react";
import AceEditor from "react-ace";
import { debounce } from "lodash";
import "brace/mode/markdown";
import "brace/theme/monokai";
import "brace/ext/searchbox";
import "brace/ext/language_tools";

const Editor = React.forwardRef(({ input, setInput, previewRef }, ref) => {
  // Get First Non Empty Line in visible text
  const getFirstVisibleLine = () => {
    const firstVisibleLine = ref.current.editor.getFirstVisibleRow();
    const lastVisibleLine = ref.current.editor.getLastVisibleRow();
    let lineNum = firstVisibleLine;

    for (let i = firstVisibleLine; i <= lastVisibleLine; ++i) {
      const line = ref.current.editor.env.document.getLine(i);
      if (line !== "") {
        lineNum = i + 1; // Preview lines start from 1 not 0
        break;
      }
    }
    return lineNum;
  };

  // TODO add maping data structure to improve performance
  const handleScroll = debounce(e => {
    const currLineNum = getFirstVisibleLine();

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

      if (currLineNum >= startLineNum && currLineNum <= endLineNum) {
        node.scrollIntoView({ behavior: "smooth" });
        break;
      }
    }
  }, 500);

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
