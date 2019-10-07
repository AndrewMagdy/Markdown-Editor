import React, { useState, useRef } from "react";
import { Grid } from "@material-ui/core/";
import { debounce } from "lodash";

import Editor from "./components/Editor";
import Preview from "./components/Preview";
import AppTopBar from "./components/AppTopBar";

import { markdownSample1 } from "./assets/markdownSamples";

function App() {
  const [input, setInput] = useState(markdownSample1);
  const [didScroll, setDidScroll] = useState(false);
  const editorRef = useRef(null);
  const previewRef = useRef(null);
  const [hashMap, setHashMap] = useState(new Map());
  const [rHashMap, setRHashMap] = useState(new Map());

  // Get First Non Empty Line in visible text
  const getFirstVisibleLine = () => {
    const firstVisibleLine = editorRef.current.editor.getFirstVisibleRow();
    const lastVisibleLine = editorRef.current.editor.getLastVisibleRow();
    let lineNum = firstVisibleLine;
    for (let i = firstVisibleLine; i <= lastVisibleLine; ++i) {
      const line = editorRef.current.editor.env.document.getLine(i);
      if (line !== "") {
        lineNum = i + 1; // Preview lines start from 1 not 0
        break;
      }
    }
    return lineNum;
  };

  const handleScroll = debounce(source => {
    const previewCurrScrollPos =
      previewRef.current.scrollTop + previewRef.current.offsetTop;
    const previewNodeStartLineNum = rHashMap.get(previewCurrScrollPos);
    const previewNode = hashMap.get(previewNodeStartLineNum);
    const editorFirstvisibleLine = getFirstVisibleLine();

    if (editorFirstvisibleLine === previewNodeStartLineNum) {
      console.log("Blocked");
      return;
    }

    if (source === 0) {
      if (previewNode) {
        previewNode.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      editorRef.current.editor.scrollToLine(
        previewNodeStartLineNum - 1,
        false,
        true
      );
      editorRef.current.editor.gotoLine(previewNodeStartLineNum, 0, true);
    }
  }, 500);

  return (
    <React.Fragment>
      <AppTopBar editorRef={editorRef} setInput={setInput} />
      <Grid container>
        <Grid item xs={6}>
          <Editor
            ref={editorRef}
            input={input}
            setInput={setInput}
            didScroll={didScroll}
            handleScroll={handleScroll}
            hashMap={hashMap}
            rHashMap={rHashMap}
          />
        </Grid>
        <Grid item xs={6}>
          <Preview
            ref={previewRef}
            input={input}
            editorRef={editorRef}
            didScroll={didScroll}
            setDidScroll={setDidScroll}
            handleScroll={handleScroll}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default App;
