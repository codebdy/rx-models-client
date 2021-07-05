import { useEffect } from "react";
import { useModelsBoardStore } from "../store";
import { getRelationGraphAttrs } from "./get-relation-graph-attrs";

export function useShowEdges(){
  const modelStore = useModelsBoardStore();
  const edges = modelStore.openedDiagram?.getAndMakeEdges();
  useEffect(()=>{
    edges?.forEach((edgeMeta)=>{
      const relation = modelStore.rootStore.getRelationById(edgeMeta.id)
      relation && modelStore.graph?.addEdge({
          id: relation.id,
          source: relation.sourceId,
          target: relation.targetId,
          vertices: edgeMeta.vertices,
          tools: ['vertices', 'boundary'],
          attrs: getRelationGraphAttrs(relation.relationType),
        })
      }
    )
  },[edges, modelStore.graph, modelStore.rootStore])
}