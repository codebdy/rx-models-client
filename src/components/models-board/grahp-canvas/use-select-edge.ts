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
      edge.addTools(['vertices', 'boundary']);
    }
    else{
      if(selectedRelation){
        const edge = modelStore.graph?.getCellById(selectedRelation.id) as Edge;
        edge.removeTool('boundary');
        edge.removeTool('vertices');
      }
      setSelectedRelation(undefined);
    }

  },[modelStore.graph, modelStore.selectedCell, selectedRelation])

  const handleEdgeClick = (arg: { edge: Edge<Edge.Properties>; })=>{
    //modelStore.selectClass(arg.node.id);
  }

  useEffect(()=>{
    //const graph =  modelStore.graph;
    //graph?.on('node:selected', handleEdgeClick);
    return ()=>{
      //graph?.off('node:selected', handleEdgeClick);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[modelStore.graph])
}