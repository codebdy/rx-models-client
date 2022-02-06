import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import intl from 'react-intl-universal';
import {observer} from 'mobx-react';
import { useAppStore } from '../../store/app-store';

export const ConfirmDialog = observer(() => {
  const confirmStore = useAppStore().confirm;
  
  const handelCancel = ()=>{
    confirmStore.close();
  }

  const handleConfirm = ()=>{
    confirmStore.callbackFn && confirmStore.callbackFn();
    confirmStore.close();
  }

  return (
    <Dialog
      open={!!confirmStore.message}
      onClose={handelCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{intl.get('operation-confirm')}</DialogTitle>
      <DialogContent style={{minWidth:"400px"}}>
        <DialogContentText id="alert-dialog-description">
          {confirmStore.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handelCancel}>
        {intl.get('cancel')}
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          {intl.get('confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
})
