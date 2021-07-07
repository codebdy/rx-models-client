import { Graph } from '@antv/x6';
import { useEffect } from 'react';
import { useModelsBoardStore } from '../store';
import { getGraphConfig } from './get-grahp-config';

export function useGraphCreate(){
  const modelStore = useModelsBoardStore();

  useEffect(()=>{
    const config = getGraphConfig();
    const graph =  new Graph(config as any);
    modelStore.setGraph(graph);
    return ()=>{
      graph?.dispose();
      modelStore.setGraph(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[modelStore.openedDiagram])

}