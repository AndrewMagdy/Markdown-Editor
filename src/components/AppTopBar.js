import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import InsertDialog from "./InsertDialog";

import MenuIcon from "@material-ui/icons/Menu";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import CodeIcon from "@material-ui/icons/Code";
import BoldIcon from "@material-ui/icons/FormatBold";
import ItalicIcon from "@material-ui/icons/FormatItalic";
import HeaderIcon from "@material-ui/icons/TextRotateUp";
import StrikeThroughIcon from "@material-ui/icons/StrikethroughS";
import InsertLinkIcon from "@material-ui/icons/InsertLink";
import InsertImageIcon from "@material-ui/icons/AddPhotoAlternate";

import {
  markdownSample1,
  markdownSample2,
  markdownSample3
} from "../assets/markdownSamples";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  grow: {
    flexGrow: 1
  }
}));

const AppTopBar = ({ editorRef, setInput }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeMarkDownSample = sample => {
    setInput(sample);
    handleClose();
  };

  const modifySelectedText = (
    beforeStr,
    afterStr,
    emptyStr = "No text",
    atLineStart = false
  ) => {
    let selectionRange = editorRef.current.editor.getSelectionRange();
    const isEmpty =
      selectionRange.start.row === selectionRange.end.row &&
      selectionRange.start.column === selectionRange.end.column;

    if (atLineStart) {
      editorRef.current.editor.session.insert(
        { ...selectionRange.start, column: 0 },
        beforeStr
      );
      return;
    }
    editorRef.current.editor.session.insert(selectionRange.start, beforeStr);
    selectionRange = editorRef.current.editor.getSelectionRange();

    if (isEmpty) {
      editorRef.current.editor.session.insert(
        selectionRange.start,
        emptyStr + afterStr
      );
    } else {
      editorRef.current.editor.session.insert(selectionRange.end, afterStr);
    }
  };

  const makeBold = () => modifySelectedText("**", "**", "Bold Text");
  const makeItalic = () => modifySelectedText("*", "*", "Italic Text");
  const makeStrikeThrough = () =>
    modifySelectedText("~~", "~~", "StrikeThrough Text");
  const makeHeading = () => modifySelectedText("# ", "", "Header Text", true);
  const makeLink = link => modifySelectedText("[", `](${link})`, "Link Text");
  const makeImage = link =>
    modifySelectedText("![", `](${link})`, "Image Text");

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
            edge="start"
            onClick={handleClick}
            color="inherit"
            aria-label="open sample codes menu"
            aria-controls="sample-codes-menu"
            aria-haspopup="true"
          >
            <CodeIcon />
          </IconButton>

          <Menu
            id="sample-codes-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              <ListItemText
                onClick={() => {
                  changeMarkDownSample(markdownSample1);
                }}
                primary="React Read Me"
              />
            </MenuItem>
            <MenuItem>
              <ListItemText
                onClick={() => {
                  changeMarkDownSample(markdownSample2);
                }}
                primary="Sample Markdown"
              />
            </MenuItem>
            <MenuItem>
              <ListItemText
                onClick={() => {
                  changeMarkDownSample(markdownSample3);
                }}
                primary="Project Read Me"
              />
            </MenuItem>
          </Menu>

          <IconButton
            color="inherit"
            aria-label="undo"
            onClick={() => editorRef.current.editor.undo()}
          >
            <UndoIcon />
          </IconButton>

          <IconButton
            color="inherit"
            aria-label="redo"
            onClick={() => editorRef.current.editor.redo()}
          >
            <RedoIcon />
          </IconButton>

          <IconButton color="inherit" aria-label="Bold" onClick={makeBold}>
            <BoldIcon />
          </IconButton>

          <IconButton color="inherit" aria-label="Italic" onClick={makeItalic}>
            <ItalicIcon />
          </IconButton>

          <IconButton color="inherit" aria-label="Header" onClick={makeHeading}>
            <HeaderIcon />
          </IconButton>

          <IconButton
            color="inherit"
            aria-label="Strike Through"
            onClick={makeStrikeThrough}
          >
            <StrikeThroughIcon />
          </IconButton>

          <InsertDialog
            title={"Link"}
            icon={<InsertLinkIcon />}
            action={makeLink}
          />
          <InsertDialog
            title={"Image"}
            icon={<InsertImageIcon />}
            action={makeImage}
          />

          <div className={classes.grow} />

          <Typography variant="h6">MarkDown Editor</Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default AppTopBar;
