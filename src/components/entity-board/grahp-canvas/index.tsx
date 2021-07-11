import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { observer } from 'mobx-react';
import { useNodesShow } from './use-nodes-show';
import { useExplorerScrollbarHide } from './use-explorer-scrollbar-hide';
import { useNodeSelect } from './use-node-select';
import { useGraphCreate } from './use-grahp-create';
import { useEdgeLineDraw } from './use-edge-line-draw';
import { useEdgesShow } from './use-edges-show';
import { useNodeChange } from './use-node-change';
import { useNodeAdd } from './use-node-add';
import { useEdgeSelect } from './use-edge-select';
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
  useGraphCreate();
  useExplorerScrollbarHide();
  useNodeSelect();
  useEdgeSelect();
  useNodesShow();
  useEdgeLineDraw();
  useEdgesShow();
  useNodeChange();
  useEdgeChange();
  useNodeAdd();

  return (
    <div className={classes.root} id="container">
    </div>
  )
})
