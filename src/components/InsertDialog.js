import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const InsertDialog = ({ title, icon, action }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    action(value);
    handleClose(value);
  };

  return (
    <React.Fragment>
      <IconButton
        color="inherit"
        aria-label={`Insert ${title}`}
        onClick={handleClickOpen}
      >
        {icon}
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby={`insert${title}-dialog`}
      >
        <DialogTitle id={`insert${title}-dialog`}>Add {title} </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={title}
            value={value}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Add Link
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default InsertDialog;
