import { useEffect } from "react";
import $bus from "../model-event/bus";
import { EVENT_BEGIN_LNIK } from "../model-event/events";
import { useModelsBoardStore } from "../store";
import { LinkAction } from "../store/link-action";

export function useDrawLink(){
  const modelStore = useModelsBoardStore();
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

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const p = modelStore.graph?.clientToLocal({x: clientX, y: clientY});
    if (modelStore.drawingLink?.tempEdge) {
      modelStore.drawingLink?.tempEdge.setTarget(p as any);
    }
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
}