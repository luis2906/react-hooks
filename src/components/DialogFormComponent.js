import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DialogFormComponent(props) {


  function handleClose() {
    setModal(false);
  }

  const { children, titulo, btnAction, showModal, setModal, handleActionDialogForm, maxWidth } = props;
  const renderData = children;

  return (
    <div>

      <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={maxWidth}
      >
        <DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
        <DialogContent dividers>
        {renderData}
        <br></br>
        <br></br>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleActionDialogForm} color="primary" autoFocus>
            {btnAction}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}