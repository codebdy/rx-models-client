import React from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import intl from 'react-intl-universal';
import {observer} from 'mobx-react';
import { useAppStore } from '../../store/app-store';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const SuccessAlertBar = observer(()=>{

  const appStore = useAppStore();

   
  const handleClose = (event?: any, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    appStore.showSuccessAlert(false);
  };  
  
  return (
    <Snackbar 
      anchorOrigin = {{ vertical: 'top', horizontal: 'center' }}
      open={!!appStore.successAlert} 
      autoHideDuration={700} 
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="success">
        {intl.get('operate-success')}
      </Alert>
    </Snackbar>
  )
})
