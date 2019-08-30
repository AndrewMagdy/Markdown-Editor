import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  grow: {
    flexGrow: 1
  }
}));

const AppTopBar = ({ editorRef }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <IconButton
            color="inherit"
            aria-label="undo"
            onClick={() => editorRef.current.editor.undo()}
          >
            <UndoIcon />
          </IconButton>

          <IconButton
            color="inherit"
            aria-label="undo"
            onClick={() => editorRef.current.editor.redo()}
          >
            <RedoIcon />
          </IconButton>

          <div className={classes.grow} />

          <Typography variant="h6">MarkDown Editor</Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default AppTopBar;
