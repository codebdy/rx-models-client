import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import ModelTree from './model-tree';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display:'flex',
      flexFlow:'column',
      borderRight: `solid 1px ${theme.palette.divider}`,
      width:'220px',
    },
    modelTree:{
      flex:1,
    },
    miniMap:{
      height:'180px',
      borderTop: `solid 1px ${theme.palette.divider}`,
    }
  }),
);

export default function LeftArea(){
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className ={classes.modelTree}>
        <ModelTree />
      </div>
      <div className = {classes.miniMap} id="mini-map">

      </div>
    </div>
  )
}
