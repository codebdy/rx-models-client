import { Edge } from "@antv/x6";
import { useEffect } from "react";
import { useModelsBoardStore } from "../store";
import { getRelationGraphAttrs } from "./get-relation-graph-attrs";
import _ from 'lodash';

export function useShowEdges(){
  const modelStore = useModelsBoardStore();
  const edges = modelStore.openedDiagram?.getAndMakeEdges();
  useEffect(()=>{
    edges?.forEach((edgeMeta)=>{
      const relation = modelStore.rootStore.getRelationById(edgeMeta.id);
      const grahpEdge =  modelStore.graph?.getCellById(edgeMeta.id) as Edge<Edge.Properties>;
      if(grahpEdge){
        if(!_.isEqual(grahpEdge.getVertices(), edgeMeta.vertices) && edgeMeta.vertices){
          grahpEdge.setVertices(edgeMeta.vertices);
        }
      }
      else{
        relation && modelStore.graph?.addEdge({
          id: relation.id,
          source: relation.sourceId,
          target: relation.targetId,
          vertices: edgeMeta.vertices,
          connector: { name: 'rounded' },
          tools: [],
          attrs: getRelationGraphAttrs(relation.relationType),
        })
      }
    })
  },[edges, modelStore.graph, modelStore.rootStore])
}