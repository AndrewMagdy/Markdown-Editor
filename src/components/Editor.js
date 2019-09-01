import React from "react";
import AceEditor from "react-ace";
import { debounce } from "lodash";
import "brace/mode/markdown";
import "brace/theme/monokai";
import "brace/ext/searchbox";
import "brace/ext/language_tools";
import { parseSourcePos } from "../utils/parseSourcePos";

const Editor = React.forwardRef(({ input, setInput, setDidScroll }, ref) => {
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
  // Data structure should be constructed in handle Change and used in handleScroll
  const handleScroll = debounce(e => {
    const currLineNum = getFirstVisibleLine();

    const allNodes = document.querySelectorAll("[data-sourcepos]");
    for (const node of allNodes) {
      const sourcePosStr = node.getAttribute("data-sourcepos");
      const { startLineNum, endLineNum } = parseSourcePos(sourcePosStr);

      if (currLineNum >= startLineNum && currLineNum <= endLineNum) {
        node.scrollIntoView({ behavior: "smooth" });
        setDidScroll(true);
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
