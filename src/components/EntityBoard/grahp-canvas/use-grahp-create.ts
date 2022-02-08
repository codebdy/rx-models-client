import { Graph } from '@antv/x6';
import { useEffect } from 'react';
import { useEntityBoardStore } from '../store/helper';
import { getGraphConfig } from './get-grahp-config';

export function useGraphCreate(){
  const modelStore = useEntityBoardStore();

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