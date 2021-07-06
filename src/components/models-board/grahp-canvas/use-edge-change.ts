import { Edge } from '@antv/x6';
import { useEffect } from 'react';
import { useModelsBoardStore } from '../store';

export function useEdgeChange(){
  const modelStore = useModelsBoardStore();

  const handleEdgeChange = (arg: { edge: Edge<Edge.Properties> })=>{
    const { edge } = arg; 
    console.log('哈哈 Change', edge.getVertices())
  }

  useEffect(()=>{
    const graph =  modelStore.graph;
    graph?.on('edge:change:vertices', handleEdgeChange);
    return ()=>{
      graph?.off('edge:change:vertices', handleEdgeChange);
    }

  },[modelStore.graph])
}