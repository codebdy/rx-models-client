import { Edge } from "@antv/x6";
import { useEffect } from "react";
import { useModelsBoardStore } from "../store";
import { getRelationGraphAttrs } from "./get-relation-graph-attrs";
import _ from 'lodash';

export function useEdgesShow(){
  const modelStore = useModelsBoardStore();
  const edges = modelStore.openedDiagram?.getAndMakeEdges();
  
  useEffect(()=>{
    edges?.forEach((edgeMeta)=>{
      let grahpEdge =  modelStore.graph?.getCellById(edgeMeta.id) as Edge<Edge.Properties>|undefined;
      if(grahpEdge){
        if(!_.isEqual(grahpEdge.getVertices(), edgeMeta.vertices) && edgeMeta.vertices){
          grahpEdge.setVertices(edgeMeta.vertices);
        }

        if(grahpEdge.data.relationType !== edgeMeta.relationType){
          grahpEdge.setData({relationType:edgeMeta.relationType});
          grahpEdge.setAttrs(getRelationGraphAttrs(edgeMeta.relationType));
        }
      }
      else{
        grahpEdge = modelStore.graph?.addEdge({
          id: edgeMeta.id,
          source: edgeMeta.sourceId,
          target: edgeMeta.targetId,
          vertices: edgeMeta.vertices,
          connector: { name: 'rounded' },
          //解决直连时，不能显示选中状态的bug
          tools: modelStore.selectedElement?.id === edgeMeta.id? ['boundary', 'vertices', 'segments'] : [],
          attrs: getRelationGraphAttrs(edgeMeta.relationType),
          data:{relationType:edgeMeta.relationType}
        })
      }

      //如果是跟自己连接，那么需要增加2个中间点
      if(edgeMeta.sourceId === edgeMeta.targetId && (!edgeMeta.vertices || edgeMeta.vertices?.length === 0)){
        grahpEdge?.appendVertex({x:grahpEdge?.getTargetPoint().x + 200, y:grahpEdge?.getTargetPoint().y -150});
        grahpEdge?.appendVertex({x:grahpEdge?.getTargetPoint().x + 200, y:grahpEdge?.getTargetPoint().y});
      }

      grahpEdge?.setLabels(
        [
          {
            attrs: {
              text: {
                text: edgeMeta.roleOnSource,
              },
            },
            position: edgeMeta.roleOnSourcePosition || {
              distance: 40,
              offset: 20,
            },
          },
          {
            attrs: {
              text: {
                text: edgeMeta.roleOnTarget,
              },
            },
            position: edgeMeta.roleOnTargetPosition || {
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