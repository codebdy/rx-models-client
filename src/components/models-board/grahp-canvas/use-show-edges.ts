import { useEffect } from "react";
import { useModelsBoardStore } from "../store";
import { INHERIT_ATTRS } from "./consts";

export function useShowEdges(){
  const modelStore = useModelsBoardStore();
  const edges = modelStore.openedDiagram?.getAndMakeEdges();
  useEffect(()=>{
    edges?.forEach((edgeMeta)=>{
      /*if(edgeMeta.edgeType === EdgeType.inherit){
        const[soureId, targetId] = edgeMeta.id.split('&');
        modelStore.graph?.addEdge({
          source: soureId,
          target: targetId,
          vertices: [],
          tools: ['vertices', 'boundary'],
          attrs: INHERIT_ATTRS,
        })
      }*/
    })
  })
}