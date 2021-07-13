import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import intl from "react-intl-universal";
import { Tooltip, IconButton } from '@material-ui/core';
import MdiIcon from 'components/common/mdi-icon';

export default function ExpressDialog(
  props:{
    onOpenChange:(open:boolean)=>void,
  }
) {
  const {onOpenChange} = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    onOpenChange(true);
  };

  const handleClose = () => {
    setOpen(false);
    onOpenChange(false);
  };

  return (
    <div>
      <Tooltip title={intl.get('express-tip')}>
        <IconButton size = "small" onClick={handleClickOpen}>
          <MdiIcon iconClass = "mdi-regex" size={18}></MdiIcon>
        </IconButton>
      </Tooltip>  
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >
            {intl.get('cancel')}
          </Button>
          <Button onClick={handleClose} variant = "contained" color="primary" autoFocus>
          {intl.get('confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
