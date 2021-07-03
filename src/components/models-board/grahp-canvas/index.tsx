import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { Cell, Graph } from '@antv/x6';
import '@antv/x6-react-shape'
import { observer } from 'mobx-react';
import { getGraphConfig } from './get-grahp-config';
import { useModelsBoardStore } from '../store';
import { ClassView } from './class-view';
import { LinkAction } from '../store/link-action';
import $bus from '../model-event/bus';
import { EVENT_BEGIN_LNIK } from '../model-event/events';
import _ from "lodash";

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
  const modelStore = useModelsBoardStore();
  const graph = modelStore.graph;

  //禁止浏览器滚动，解决x6会增加浏览器滚动条的bug
  useEffect(()=>{
    const oldValue = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return ()=>{
      document.body.style.overflow = oldValue;
    }
  },[])

  useEffect(()=>{
    if(modelStore.selectedNode)
    {
      graph?.select(graph?.getCellById(modelStore.selectedNode.id));
    }

  },[graph, modelStore.selectedNode])

  const nodeSelectedClickHandle = (arg: { node: Cell<Cell.Properties>; })=>{
    modelStore.selectClass(arg.node.id);
  }

  const unselectedClickHandle = ()=>{
    modelStore.setSelectedNode(undefined);
  }

  useEffect(()=>{
    const config = getGraphConfig();
    const graph =  new Graph(config as any);
    //graph?.enableSelection();
    modelStore.setGraph(graph);
    graph.on('node:selected', nodeSelectedClickHandle);
    graph.on('node:unselected', unselectedClickHandle);
    return ()=>{
      graph.off('node:selected', nodeSelectedClickHandle);
      graph.off('node:unselected', unselectedClickHandle);
      graph?.dispose();
      modelStore.setGraph(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[modelStore.openedDiagram])

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const p = modelStore.graph?.clientToLocal({x: clientX, y: clientY});
    if (modelStore.drawingLink?.tempEdge) {
      modelStore.drawingLink?.tempEdge.setTarget(p as any);
    }
  }

  const nodes = modelStore.openedDiagram?.getNodes();
  useEffect(()=>{
    nodes?.forEach(node=>{
      const grahpNode = graph?.getCellById(node.id);
      if(grahpNode) {
        //Update by diff
        if(!_.isEqual(node.data, grahpNode.data)){
          grahpNode.setData(node.data);
        }
      }
      else{
        graph?.addNode({...node, shape: 'react-shape', component: <ClassView />});
      }
    })
  })

  const handleStratLink = (linkAction:LinkAction)=>{
    const p = modelStore.graph?.clientToLocal(linkAction.initPoint);
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
