import React from 'react';
import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
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
