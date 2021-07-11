import { useEffect, useState } from "react";
import { useModelsBoardStore } from "../store";
import { Edge } from '@antv/x6';
import { RelationStore } from "../store/relation";

export function useEdgeSelect(){
  const modelStore = useModelsBoardStore();
  const [selectedRelation, setSelectedRelation] = useState<RelationStore>();
  useEffect(()=>{
    if(modelStore.selectedElement && modelStore.selectedElement instanceof RelationStore)
    {
      setSelectedRelation(modelStore.selectedElement as RelationStore);
      const edge = modelStore.graph?.getCellById(modelStore.selectedElement.uuid) as Edge;
      edge?.addTools(['vertices', 'boundary', 'segments']);
    }
    modelStore.graph?.getEdges().forEach(edge=>{
      if(modelStore.selectedElement?.uuid !== edge.id){
        edge.removeTools(['boundary', 'vertices', 'segments']);
      }
    })

  },[modelStore.graph, modelStore.selectedElement, selectedRelation])

  const handleBlankClick = ()=>{
    modelStore.setSelectedElement(undefined);
  }

  const handleEdgeClick = (arg: { edge: Edge<Edge.Properties> })=>{
    const { edge } = arg; 
    if(edge && edge.id !== modelStore?.drawingLine?.tempEdge?.id){
      modelStore.setSelectedElement(modelStore.getRelationById(edge.id));
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