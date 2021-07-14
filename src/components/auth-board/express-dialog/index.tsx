import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import intl from "react-intl-universal";
import { Tooltip, IconButton, createStyles, makeStyles, Theme, Grid, TextField } from '@material-ui/core';
import MdiIcon from 'components/common/mdi-icon';
import SubmitButton from 'components/common/submit-button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      minWidth:'600px',
      minHeight:'260px',
    },
    list:{
      border:` ${theme.palette.divider} solid 1px`,
      display:'flex',
      flexFlow:'column',
      padding:0,
      height:'100%'
    },
    plus:{
      textAlign:'center',
      marginTop: theme.spacing(1),
    },
    actions:{
      padding:theme.spacing(2),
      paddingRight:theme.spacing(3),
    }

  }),
);


export default function ExpressDialog(
  props:{
    expression:string,
    onExpressionChange:(exp:string)=>void,
  }
) {
  const {expression, onExpressionChange} = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [exp, setExp] = useState(expression);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleExpressionChange = (event: React.ChangeEvent<{value:string}>)=>{
    setExp(event.target.value);
  }

  const handleConfirm = ()=>{
    onExpressionChange(exp);
    handleClose();
  }

  return (
    <div>
      <Tooltip title={intl.get('express-tip')}>
        <IconButton size = "small" onClick={handleClickOpen}>
          <MdiIcon iconClass = "mdi-function-variant" size={18}></MdiIcon>
        </IconButton>
      </Tooltip>  
      <Dialog
        open={open}
        onClose={handleClose}
        scroll = "paper"
        maxWidth ="lg"
      >
        <DialogTitle>{intl.get('express-tip')}</DialogTitle>
        <DialogContent>
          <div className = {classes.content}>
            <Grid container>
              <Grid item xs = {12}>
                <TextField 
                  multiline 
                  fullWidth 
                  rows = {16} 
                  variant="outlined" 
                  size = "small"
                  value = {exp||''} 
                  onChange = {handleExpressionChange}
                />
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions className = {classes.actions}>
          <Button onClick={handleClose} >
            {intl.get('cancel')}
          </Button>
          <SubmitButton 
            onClick={handleConfirm} 
            variant = "contained" 
            color="primary"
          >
            {intl.get('confirm')}
          </SubmitButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
