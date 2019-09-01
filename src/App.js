import React, { useState, useRef } from "react";
import { Grid } from "@material-ui/core/";

import Editor from "./components/Editor";
import Preview from "./components/Preview";
import AppTopBar from "./components/AppTopBar";

function App() {
  const defaultInput = "# This is a header\n\nAnd this is a paragraph";
  const [input, setInput] = useState(defaultInput);
  const [didScroll, setDidScroll] = useState(false);
  const editorRef = useRef(null);
  const previewRef = useRef(null);

  return (
    <React.Fragment>
      <AppTopBar editorRef={editorRef} setInput={setInput} />
      <Grid container>
        <Grid item xs={6}>
          <Editor
            ref={editorRef}
            input={input}
            setInput={setInput}
            previewRef={previewRef}
            didScroll={didScroll}
            setDidScroll={setDidScroll}
          />
        </Grid>
        <Grid item xs={6}>
          <Preview
            ref={previewRef}
            input={input}
            editorRef={editorRef}
            didScroll={didScroll}
            setDidScroll={setDidScroll}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default App;
