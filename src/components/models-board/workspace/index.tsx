import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { Graph } from '@antv/x6';
import '@antv/x6-react-shape'
import { observer } from 'mobx-react';
import { getGraphConfig } from './get-grahp-config';
import { useModelsBoardStore } from '../store';
import { ClassView } from './class-view';
import { LinkAction } from '../store/link-action';
import $bus from '../model-event/bus';
import { EVENT_BEGIN_LNIK } from '../model-event/events';

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

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const p = modelStore.graph?.clientToLocal({x: clientX, y: clientY});
    if (modelStore.drawingLink?.tempEdge) {
      modelStore.drawingLink?.tempEdge.setTarget(p as any);
    }
  }

  const handleTest = ()=>{
    console.log('哈哈2 handleTest')
  }

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
      return {...node, shape: 'react-shape', component: <ClassView onHidden = {modelStore.onClassChange}/>}
    }));

    graph.on('node:added', ({ cell, index, options }) => {
      console.log('良善', cell);
    })

    return ()=>{
      graph?.dispose();
      modelStore.setGraph(undefined);
    }
  })
  const handleStratLink = (linkAction:LinkAction)=>{
    const p = modelStore.graph?.clientToLocal(linkAction.initPoint);
    console.log('哈哈', linkAction.sourceNode);
    linkAction.tempEdge = modelStore.graph?.addEdge({
      source: linkAction.sourceNode,
      target: p,
      attrs: {
        line: {
          stroke: '#000',
          strokeWidth: 1,
        }
      }
    })
    linkAction.tempEdge?.attr({
      line: {
        targetMarker: {
          tagName: 'path',
          fill: '#FFF',  
          stroke: '#000', 
          strokeWidth: 1,
          d: 'M 18 -9 0 0 18 9 Z',
        },
      },
    })
    modelStore.setDrawingLink(linkAction);
  }

  const handleMouseUp = ()=>{
    modelStore.drawingLink?.tempEdge && modelStore.graph?.removeEdge(modelStore.drawingLink?.tempEdge);
    modelStore.setDrawingLink(undefined);
    //modelStore.setPressInherit(false);
  }

  useEffect(()=>{
    $bus.on(EVENT_BEGIN_LNIK, handleStratLink);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return ()=>{
      $bus.off(EVENT_BEGIN_LNIK, handleStratLink);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  return (
    <div className={classes.root} id="container">
    </div>
  )
})
