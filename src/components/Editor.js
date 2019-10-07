import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import { debounce } from "lodash";
import "brace/mode/markdown";
import "brace/theme/monokai";
import "brace/ext/searchbox";
import "brace/ext/language_tools";
import { parseSourcePos } from "../utils/parseSourcePos";

const Editor = React.forwardRef(
  ({ input, setInput, hashMap, rHashMap, handleScroll }, ref) => {
    // const handleScroll = debounce(e => {
    //   const currLineNum = getFirstVisibleLine();
    //   const node = hashMap.get(currLineNum);

    //   if (node) {
    //     node.scrollIntoView({ behavior: "smooth" });
    //   }
    // }, 500);

    const handleChange = newValue => {
      hashMap.clear();
      const allNodes = document.querySelectorAll("[data-sourcepos]");
      for (const node of allNodes) {
        const sourcePosStr = node.getAttribute("data-sourcepos");
        const { startLineNum, endLineNum } = parseSourcePos(sourcePosStr);

        for (let i = startLineNum; i <= endLineNum; ++i) {
          hashMap.set(i, node);
        }
      }

      let lastNodeOffset = 0;
      for (const node of allNodes) {
        const sourcePosStr = node.getAttribute("data-sourcepos");
        const { startLineNum } = parseSourcePos(sourcePosStr);

        for (let i = lastNodeOffset; i < node.offsetTop; ++i) {
          rHashMap.set(i, startLineNum);
        }
        lastNodeOffset = node.offsetTop;
      }

      setInput(newValue);
    };

    useEffect(() => {
      handleChange(input);
    }, []);

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
        onScroll={() => handleScroll(0)}
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
  }
);

export default Editor;
