import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReactMarkdown from "react-markdown";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    maxHeight: "calc(100vh - 64px)",
    position: "fixed",
    overflow: "scroll"
  }
}));

const Preview = React.forwardRef(({ input, editorRef }, ref) => {
  const classes = useStyles();

  const TextRenderer = props => {
    // console.log(props);
    return (
      <span
        onClick={() =>
          editorRef.current.editor.gotoLine(
            props.sourcePosition.start.line,
            0,
            true
          )
        }
      >
        {props.children}
      </span>
    );
  };

  return (
    <React.Fragment>
      <div className={classes.container} ref={ref}>
        <ReactMarkdown source={input} sourcePos rawSourcePos />
      </div>
    </React.Fragment>
  );
});

export default Preview;
