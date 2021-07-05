import React, { useEffect } from "react";
import { useModelsBoardStore } from "../store";
import { LineAction } from "../store/line-action";
import { INHERIT_ATTRS } from "./consts";
import { Node } from '@antv/x6';

export function useDrawLine(){
  const modelStore = useModelsBoardStore();

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const p = modelStore.graph?.clientToLocal({x: clientX, y: clientY});
    if (modelStore.drawingLine?.tempEdge) {
      modelStore.drawingLine?.tempEdge.setTarget(p as any);
    }
  }

  const handleMouseUp = (e: MouseEvent)=>{
    const { clientX, clientY } = e;
    const p = modelStore.graph?.clientToLocal({x: clientX, y: clientY});
    const [targetNode] = modelStore.graph?.getNodesFromPoint(p?.x||0, p?.y||0)||[];
    if(modelStore.drawingLine && targetNode){
      if(modelStore.drawingLine.sourceNodeId !== targetNode.id){
        //modelStore.rootStore.getClassById(modelStore.drawingLink.sourceNode.id)?.setInheritId(targetNode.id);
        modelStore.setPressRelation(undefined);
      }
    }
    modelStore.drawingLine?.tempEdge && modelStore.graph?.removeEdge(modelStore.drawingLine?.tempEdge);
    modelStore.setDrawingLine(undefined);
    //modelStore.setPressInherit(false);
  }

  const handleMouseDown = (arg: { e:React.MouseEvent, node: Node<Node.Properties> })=>{
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
    e.stopPropagation();
  }

  useEffect(()=>{
    //$bus.on(EVENT_BEGIN_LNIK, handleStratLink);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return ()=>{
      //$bus.off(EVENT_BEGIN_LNIK, handleStratLink);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{
    const graph =  modelStore.graph;

    graph?.on('node:mousedown', handleMouseDown);
    return ()=>{
      graph?.off('node:mousedown', handleMouseDown);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[modelStore.graph])
}