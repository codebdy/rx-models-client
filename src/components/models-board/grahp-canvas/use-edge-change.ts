import { Edge } from '@antv/x6';
import { useEffect } from 'react';
import { EdgeChangeCommand } from '../command/edge-change-command';
import { useModelsBoardStore } from '../store';
import _ from 'lodash';

export function useEdgeChange(){
  const modelStore = useModelsBoardStore();

  const handleEdgeChange = (arg: { edge: Edge<Edge.Properties>})=>{
    const { edge } = arg; 

    if(!modelStore.openedDiagram || !edge?.id){
      return;
    }

    if(edge.id === modelStore.drawingLine?.tempEdge?.id){
      return;
    } 
    
    const edageData = modelStore.openedDiagram?.getEdgeById(edge.id);

    //如果是新建或者没有节点的线，不需要记录
    if(!edageData?.vertices && !edageData?.roleOnSourcePosition && !edageData?.roleOnTargetPosition){
      return;
    }

    const [roleOnSource, roleOnTarget] = edge.getLabels();

    //使用mouseleave代替完成事件，需要判断是否有修改
    if(
      _.isEqual(edageData?.vertices, edge.getVertices()) 
      && _.isEqual(edageData?.roleOnSourcePosition, roleOnSource.position)
      && _.isEqual(edageData?.roleOnTargetPosition, roleOnTarget.position)
    ){
      return;
    }

    const command = new EdgeChangeCommand(modelStore.openedDiagram, 
      {
        id:edge.id,
        vertices: edge.getVertices(),
        roleOnSourcePosition: roleOnSource.position as any,
        roleOnTargetPosition: roleOnTarget.position as any
      },
      modelStore.rootStore.getRelationById(edge.id)
    );

    modelStore.excuteCommand(command);
  }

  useEffect(()=>{
    const graph =  modelStore.graph;
    //由于拿不到mouseup事件，使用mouseleave代替
    graph?.on('edge:mouseleave', handleEdgeChange);
    return ()=>{
      graph?.off('edge:mouseleave', handleEdgeChange);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[modelStore.graph])
}