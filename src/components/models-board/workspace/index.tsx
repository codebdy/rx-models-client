import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { Graph } from '@antv/x6';
import '@antv/x6-react-shape'
import { observer } from 'mobx-react';
import { getGraphConfig } from './get-grahp-config';
import { useModelsBoardStore } from '../store';
import { ClassView } from './class-view';

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

export const WorkSpace = observer(()=>{
  const classes = useStyles();
  const modelStore = useModelsBoardStore();

  //禁止浏览器滚动，解决x6会增加浏览器滚动条的bug
  useEffect(()=>{
    const oldValue = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return ()=>{
      document.body.style.overflow = oldValue;
    }
  },[])

  useEffect(()=>{
    const config = getGraphConfig();
    const graph =  new Graph(config as any);
    modelStore.setGraph(graph);
    const diagram = modelStore.rootStore.getDiagramById('999');
    const graphDiff = diagram?.getGraphDataDiff({
      nodes: [],
      edges:[]
    })
    graphDiff?.createdNodes && graph.addNodes(graphDiff?.createdNodes.map(node=>{
      return {...node, shape: 'react-shape', component: <ClassView/>}
    }));

    graph.on('node:added', ({ cell, index, options }) => {
      console.log('良善', cell);
    })

    return ()=>{
      graph?.dispose();
      modelStore.setGraph(undefined);
    }
  })
  return (
    <div className={classes.root} id="container">
    </div>
  )
})
