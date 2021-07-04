import { useEffect } from "react";
import { useModelsBoardStore } from "../store";

export function useShowEdges(){
  const modelStore = useModelsBoardStore();
  const edges = modelStore.openedDiagram?.getAndMakeEdges();
  useEffect(()=>{
    edges?.forEach((edgeMeta)=>{
      
    })
  })
}