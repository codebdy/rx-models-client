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
    onOpenChange?:(open:boolean)=>void,
  }
) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleExpressionChange = (event: React.ChangeEvent<{value:string}>)=>{

  }

  const handleConfirm = ()=>{
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
                  value = {''} 
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
