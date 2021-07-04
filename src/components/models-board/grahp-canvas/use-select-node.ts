import { useEffect } from "react";
import { useModelsBoardStore } from "../store";

export function useSelectNode(){
  const modelStore = useModelsBoardStore();
  useEffect(()=>{
    if(modelStore.selectedNode)
    {
      const selectionId = modelStore.selectedNode?.id;
      modelStore.graph?.cleanSelection();
      modelStore.graph?.select( modelStore.graph?.getCellById(selectionId));
    }

  },[ modelStore.graph, modelStore.selectedNode])
}