import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { observer } from 'mobx-react';
import { useShowNodes } from './use-show-nodes';
import { useHideExplorerScrollbar } from './use-hide-explorer-scrollbar';
import { useSelectNode } from './use-select-node';
import { useCreateGraph } from './use-create-grahp';
import { useDrawLink } from './use-draw-link';
import { useShowEdges } from './use-show-edges';
import { useNodeMoveOrResize } from './use-node-move-or-resize';
import { useAddNode } from './use-add-node';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:1,
      display:'flex',
      flexFlow:'column',
      overflow:'auto',
    },
  }),
);

export const GraphCanvas = observer(()=>{
  const classes = useStyles();
  useHideExplorerScrollbar();
  useSelectNode();
  useCreateGraph();
  useShowNodes();
  useDrawLink();
  useShowEdges();
  useNodeMoveOrResize();
  useAddNode();

  return (
    <div className={classes.root} id="container">
    </div>
  )
})
