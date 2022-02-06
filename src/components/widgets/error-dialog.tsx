import React from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Dialog, Theme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import {observer} from 'mobx-react';
import { useAppStore } from '../../store/app-store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth:'300px',
      display:'flex',
      justifyContent:'space-between'
    },

    details:{
      padding:theme.spacing(2),
    }

  }),
);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} square />;
}

export const ErrorDialog = observer(()=>{
  const classes = useStyles();
  const appStore = useAppStore();
  const error = appStore.error;
  const handleClose = () => {
    appStore.clearError();
  };  

  return (
    <Dialog
      open={!!error.message}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Alert onClose={handleClose} severity="error" className={classes.root}>
        {error.message}
      </Alert>
      {
        error.details && 
        <div className = {classes.details}>{error.details}</div>        
      }

    </Dialog>
  )
})
