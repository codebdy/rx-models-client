import { useEffect, useState } from "react";
import { useModelsBoardStore } from "../store";
import { Edge } from '@antv/x6';
import { RelationStore } from "../store/relation";

export function useSelectEdge(){
  const modelStore = useModelsBoardStore();
  const [selectedRelation, setSelectedRelation] = useState<RelationStore>();
  useEffect(()=>{
    if(modelStore.selectedCell && modelStore.selectedCell instanceof RelationStore)
    {
      setSelectedRelation(modelStore.selectedCell as RelationStore);
      const edge = modelStore.graph?.getCellById(modelStore.selectedCell.id) as Edge;
      edge?.addTools(['vertices', 'boundary', 'segments']);
    }
    modelStore.graph?.getEdges().forEach(edge=>{
      if(modelStore.selectedCell?.id !== edge.id){
        edge.removeTools(['boundary', 'vertices', 'segments']);
      }
    })

  },[modelStore.graph, modelStore.selectedCell, selectedRelation])

  const handleBlankClick = ()=>{
    modelStore.setSelectedCell(undefined);
  }

  const handleEdgeClick = (arg: { edge: Edge<Edge.Properties> })=>{
    const { edge } = arg; 
    if(edge && edge.id !== modelStore?.drawingLine?.tempEdge?.id){
      modelStore.setSelectedCell(modelStore.rootStore.getRelationById(edge.id));
    }
  }

  useEffect(()=>{
    const graph =  modelStore.graph;
    graph?.on('blank:click', handleBlankClick);
    graph?.on('edge:click', handleEdgeClick);
    return ()=>{
      graph?.off('blank:click', handleBlankClick);
      graph?.off('edge:click', handleEdgeClick);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[modelStore.graph])
}