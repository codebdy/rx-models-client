import { useEffect } from "react";
import { EdgeType } from "../meta/edge-type";
import { useModelsBoardStore } from "../store";
import { INHERIT_ATTRS } from "./consts";

export function useShowEdges(){
  const modelStore = useModelsBoardStore();
  const edges = modelStore.openedDiagram?.getAndMakeEdges();
  useEffect(()=>{
    edges?.forEach((edgeMeta)=>{
      if(edgeMeta.edgeType === EdgeType.inherit){
        const[soureId, targetId] = edgeMeta.id.split('&');
        modelStore.graph?.addEdge({
          source: soureId,
          target: targetId,
          attrs: INHERIT_ATTRS,
        })
      }
    })
  })
}