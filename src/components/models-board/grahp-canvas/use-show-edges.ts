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
      let grahpEdge =  modelStore.graph?.getCellById(edgeMeta.id) as Edge<Edge.Properties>|undefined;
      if(grahpEdge){
        if(!_.isEqual(grahpEdge.getVertices(), edgeMeta.vertices) && edgeMeta.vertices){
          grahpEdge.setVertices(edgeMeta.vertices);
        }
      }
      else{
        grahpEdge = relation && modelStore.graph?.addEdge({
          id: relation.id,
          source: relation.sourceId,
          target: relation.targetId,
          vertices: edgeMeta.vertices,
          connector: { name: 'rounded' },
          tools: [],
          attrs: getRelationGraphAttrs(relation.relationType),
        })
      }

      grahpEdge?.setLabels(
        [
          {
            attrs: {
              text: {
                text: relation?.roleOnSource,
              },
            },
            position: {
              distance: 40,
              offset: 20,
            },
          },
          {
            attrs: {
              text: {
                text: relation?.roleOnTarget,
              },
            },
            position: {
              distance: -40,
              offset: 20,
            },
          }
        ]
      )
    })
    modelStore.graph?.getEdges().forEach(edge=>{
      if(!edges?.find(aEdge=>aEdge.id === edge.id) && edge.id !== modelStore.drawingLine?.tempEdge?.id){
        modelStore.graph?.removeEdge(edge.id);
      }
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[edges, modelStore.graph, modelStore.rootStore])
}