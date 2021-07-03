import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { ModelTreeView } from './model-tree-view';
import { observer } from 'mobx-react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display:'flex',
      flexFlow:'column',
      borderRight: `solid 1px ${theme.palette.divider}`,
      width:'280px',
    },
    modelTree:{
      flex:1,
    },
    miniMap:{
      borderTop: `solid 1px ${theme.palette.divider}`,
    }
  }),
);

export const ModelTree = observer(()=>{
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className ={classes.modelTree}>
        <ModelTreeView />
      </div>
      <div className = {classes.miniMap} id="mini-map">

      </div>
    </div>
  )
})
