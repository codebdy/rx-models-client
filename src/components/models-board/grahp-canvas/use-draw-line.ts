import React, { useEffect } from "react";
import { useModelsBoardStore } from "../store";
import { LineAction } from "../store/line-action";
import { INHERIT_ATTRS } from "./consts";
import { Edge, Node } from '@antv/x6';

export function useDrawLine(){
  const modelStore = useModelsBoardStore();

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const p = modelStore.graph?.clientToLocal({x: clientX, y: clientY});
    if (modelStore.drawingLine?.tempEdge) {
      modelStore.drawingLine?.tempEdge.setTarget(p as any);
    }
  }

  const addVertex = (p:{x:number,y:number})=>{
    if(modelStore.drawingLine){
      modelStore.drawingLine.tempEdge?.appendVertex(p);
    }
  }

  const handleEdgeMouseUp = (arg: { x:number, y:number, edge:Edge})=>{
    const{edge, x, y} = arg;
    const [targetNode] = modelStore.graph?.getNodesFromPoint(x,y)||[];
    if(targetNode){
      modelStore.setPressRelation(undefined);
      modelStore.setDrawingLine(undefined);
      return;
    }
    if(edge?.id === modelStore.drawingLine?.tempEdge?.id){
      addVertex({x,y});      
    }
  }

  const handleNodeMouseUp = (arg: { node:Node})=>{
    const {node} = arg;
    const verticesLength = modelStore.drawingLine?.tempEdge?.getVertices()?.length;
    console.log('吼吼', verticesLength);
    if(node && verticesLength ){
      modelStore.setPressRelation(undefined);
      modelStore.setDrawingLine(undefined);
    }
  }

  const handleEdgeDbclick =  (arg: { edge:Edge})=>{
    if(arg.edge?.id === modelStore.drawingLine?.tempEdge?.id){
      modelStore.setPressRelation(undefined);
      modelStore.setDrawingLine(undefined);  
      arg.edge.remove();         
    }
  }

  const handleMouseUp = (e: MouseEvent)=>{
    const { clientX, clientY } = e;
    const p = modelStore.graph?.clientToLocal({x: clientX, y: clientY});
    console.log('哈哈 mouse up', p)
    if(!p){
      return;
    }
    const [targetNode] = modelStore.graph?.getNodesFromPoint(p?.x||0, p?.y||0)||[];
    if(modelStore.drawingLine){
      
      if(targetNode){
        if(modelStore.drawingLine.sourceNodeId !== targetNode.id){
          //modelStore.rootStore.getClassById(modelStore.drawingLink.sourceNode.id)?.setInheritId(targetNode.id);
          modelStore.setPressRelation(undefined);
        }        
      }
      else{
        console.log('哈哈', p)
        modelStore.drawingLine.tempEdge?.appendVertex(p);
      }
    }
    modelStore.drawingLine?.tempEdge && modelStore.graph?.removeEdge(modelStore.drawingLine?.tempEdge);
    modelStore.setDrawingLine(undefined);
    //modelStore.setPressInherit(false);
  }

  const handleNodeClick = (arg: { e:React.MouseEvent, node: Node<Node.Properties> })=>{
    console.log('handleNodeClick');
    const{e, node} = arg;
    if(!modelStore.pressedLineType){
      return;
    }
    const p = modelStore.graph?.clientToLocal({x: e.clientX, y: e.clientY});
    const lineAction:LineAction = {
      sourceNodeId: node.id,
      relationType: modelStore.pressedLineType,
      tempEdge: modelStore.graph?.addEdge({
        source: node.id,
        target: p,
        attrs: INHERIT_ATTRS,
      })
    }
    modelStore.setDrawingLine(lineAction);
    //e.stopPropagation();
  }

  useEffect(()=>{
    document.addEventListener('mousemove', handleMouseMove);
    return ()=>{
      document.removeEventListener('mousemove', handleMouseMove);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{
    const graph =  modelStore.graph;

    graph?.on('node:click', handleNodeClick);
    graph?.on('edge:mouseup', handleEdgeMouseUp);
    graph?.on('node:mouseup', handleNodeMouseUp);
    graph?.on('edge:dblclick', handleEdgeDbclick);
    return ()=>{
      graph?.off('node:click', handleNodeClick);
      graph?.off('edge:mouseup', handleEdgeMouseUp);
      graph?.off('node:mouseup', handleNodeMouseUp);
      graph?.off('edge:dblclick', handleEdgeDbclick);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[modelStore.graph])
}