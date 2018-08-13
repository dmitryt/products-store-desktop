// @flow
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type IProps = {|
  open: boolean,
  content: string,
  onClose: () => void,
  onAccept: () => void
|};

const AlertDialog = ({ open, content, onClose, onAccept }: IProps) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Warning</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {content}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onAccept} color="primary" autoFocus>
        OK
      </Button>
    </DialogActions>
  </Dialog>
);

export default AlertDialog;
