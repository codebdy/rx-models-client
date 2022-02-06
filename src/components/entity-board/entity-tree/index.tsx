import React from 'react';
import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import { EntityTreeView } from './entity-tree-view';
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
      overflow: 'auto',
    },
    miniMap:{
      borderTop: `solid 1px ${theme.palette.divider}`,
    }
  }),
);

export const EntityTree = observer(()=>{
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className ={classes.modelTree}>
        <EntityTreeView />
      </div>
      <div className = {classes.miniMap} id="mini-map">

      </div>
    </div>
  )
})
