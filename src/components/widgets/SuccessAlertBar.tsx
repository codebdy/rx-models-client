import React from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import intl from 'react-intl-universal';
import {observer} from 'mobx-react';
import { useRecoilState } from 'recoil';
import { successAlertState } from 'recoil/atoms';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const SuccessAlertBar = observer(()=>{

  const [successAlert, setSuccessAlert] = useRecoilState(successAlertState);

   
  const handleClose = (event?: any, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessAlert(false);
  };  
  
  return (
    <Snackbar 
      anchorOrigin = {{ vertical: 'top', horizontal: 'center' }}
      open={!!successAlert} 
      autoHideDuration={700} 
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="success">
        {successAlert !== true || intl.get('operate-success')}
      </Alert>
    </Snackbar>
  )
})
