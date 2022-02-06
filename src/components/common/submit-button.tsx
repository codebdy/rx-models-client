import React from 'react';
import { Theme, Button, CircularProgress, ButtonProps } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      position: 'relative',
      display:'inline',
    },
    
    buttonProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },  
  }),
);

export default function SubmitButton(
  props:{
    submitting?:boolean,
  }&ButtonProps
){
  const {submitting = false, onClick, children, disabled, ...rest} = props;
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Button
        onClick = {onClick} 
        disabled = {submitting || disabled}
        {...rest}
      >
        {children}
      </Button>
      {submitting && <CircularProgress color = "primary" size={24} className={classes.buttonProgress} />}
  </div>
  )
}
