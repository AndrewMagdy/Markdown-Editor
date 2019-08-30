import React, { useState, useRef } from "react";
import { Grid } from "@material-ui/core/";

import Editor from "./components/Editor";
import Preview from "./components/Preview";
import AppTopBar from "./components/AppTopBar";

function App() {
  const editorRef = useRef(null);
  const previewRef = useRef(null);

  const defaultInput = "# This is a header\n\nAnd this is a paragraph";
  const [input, setInput] = useState(defaultInput);

  return (
    <React.Fragment>
      <AppTopBar editorRef={editorRef} />
      <Grid container>
        <Grid item xs>
          <Editor
            ref={editorRef}
            input={input}
            setInput={setInput}
            previewRef={previewRef}
          />
        </Grid>
        <Grid item xs>
          <Preview ref={previewRef} input={input} editorRef={editorRef} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default App;
