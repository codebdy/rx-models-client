import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import intl from "react-intl-universal";
import { Tooltip, IconButton, createStyles, makeStyles, Theme, Grid, TextField } from '@material-ui/core';
import MdiIcon from 'components/common/mdi-icon';
import { ExpressItem } from './express-item';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      minWidth:'600px',
      minHeight:'300px',
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
    }

  }),
);


export default function ExpressDialog(
  props:{
    onOpenChange:(open:boolean)=>void,
  }
) {
  const {onOpenChange} = props;
  const classes = useStyles();
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
        scroll = "paper"
        maxWidth ="lg"
      >
        <DialogTitle>{intl.get('express-manage')}</DialogTitle>
        <DialogContent>
          <div className = {classes.content}>
            <Grid container spacing = {2}>
              <Grid item xs={6} >
                <div className = {classes.list}>
                  <ExpressItem/>
                  <ExpressItem/>
                  <div className = {classes.plus}>
                    <IconButton size = 'small'>
                      <MdiIcon iconClass ="mdi-plus" size = {20}></MdiIcon>
                    </IconButton>
                  </div>
                </div>
              </Grid>
              <Grid item container xs={6}>
                <Grid item xs = {12}>
                  <TextField fullWidth label={intl.get('name')} variant="outlined" size = "small" />
                </Grid>
                <Grid item xs = {12} style={{marginTop:'16px'}}>
                  <TextField multiline fullWidth rows = {10} label={intl.get('express-tip')} variant="outlined" size = "small" />
                </Grid>
              </Grid>
            </Grid>
          </div>
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
