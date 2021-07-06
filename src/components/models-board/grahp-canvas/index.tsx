import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { observer } from 'mobx-react';
import { useShowNodes } from './use-show-nodes';
import { useHideExplorerScrollbar } from './use-hide-explorer-scrollbar';
import { useSelectNode } from './use-select-node';
import { useCreateGraph } from './use-create-grahp';
import { useDrawLine } from './use-draw-line';
import { useShowEdges } from './use-show-edges';
import { useNodeChange } from './use-node-change';
import { useAddNode } from './use-add-node';
import { useSelectEdge } from './use-select-edge';
import { useEdgeChange } from './use-edge-change';

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
  useSelectEdge();
  useCreateGraph();
  useShowNodes();
  useDrawLine();
  useShowEdges();
  useNodeChange();
  useEdgeChange();
  useAddNode();

  return (
    <div className={classes.root} id="container">
    </div>
  )
})
