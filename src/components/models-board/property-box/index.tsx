import React from 'react';
import { makeStyles, Theme, createStyles, TextField, Grid } from '@material-ui/core';
import ToolbarArea from './toolbar-area';
import ToolbarTitle from './toolbar-title';
import intl from 'react-intl-universal';
import { observer } from 'mobx-react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display:'flex',
      flexFlow:'column',
      borderLeft: `solid 1px ${theme.palette.divider}`,
      width:'260px',
    },
    propertiesArea:{
      padding:theme.spacing(2),
      flex:1,
      overflow:'auto'
    }
  }),
);

export const PropertyBox = observer(()=>{
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ToolbarArea>
        <ToolbarTitle>{intl.get('properties')}</ToolbarTitle>
      </ToolbarArea>
      <div className = {classes.propertiesArea}>
        <Grid container spacing = {2}>
          <Grid item>
            <TextField label ="名称" variant = "outlined" size="small"/>
          </Grid>
          <Grid item>
            <TextField label ="名称" variant = "outlined" size="small"/>
          </Grid>
        </Grid>
      </div>
    </div>
  )
})
