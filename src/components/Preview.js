import React from "react";
import ReactMarkdown from "react-markdown";
import { makeStyles } from "@material-ui/core/styles";
import { debounce } from "lodash";
import { parseSourcePos } from "../utils/parseSourcePos";
import PrismCodeHighlight from "./PrismCodeHighlight";

const useStyles = makeStyles(theme => ({
  container: {
    maxHeight: "calc(100vh - 64px)",
    overflowY: "scroll"
  }
}));

const Preview = React.forwardRef(
  ({ input, editorRef, didScroll, setDidScroll, handleScroll }, ref) => {
    const classes = useStyles();

    // TODO add maping data structure to improve performance
    // Data structure should be constructed in handle Change and used in handleScroll
    // const handleScroll = debounce(e => {
    //   if (didScroll) {
    //     setDidScroll(false);
    //     return;
    //   }
    //   const allNodes = document.querySelectorAll("[data-sourcepos]");
    //   for (const node of allNodes) {
    //     if (node.offsetTop > ref.current.scrollTop + ref.current.offsetTop) {
    //       const sourcePosStr = node.getAttribute("data-sourcepos");
    //       const { startLineNum } = parseSourcePos(sourcePosStr);

    //       editorRef.current.editor.scrollToLine(startLineNum - 1, false, true);
    //       setDidScroll(true);
    //       break;
    //     }
    //   }
    // }, 500);

    return (
      <React.Fragment>
        <div
          className={classes.container}
          ref={ref}
          onScroll={() => handleScroll(1)}
        >
          <ReactMarkdown
            source={input}
            sourcePos
            rawSourcePos
            renderers={{ code: PrismCodeHighlight }}
          />
        </div>
      </React.Fragment>
    );
  }
);

export default Preview;
