import { useEffect } from "react";
import { useModelsBoardStore } from "../store";
import { Node } from '@antv/x6';

export function useSelectNode(){
  const modelStore = useModelsBoardStore();
  useEffect(()=>{
    if(modelStore.selectedNode)
    {
      const selectionId = modelStore.selectedNode?.id;
      modelStore.graph?.cleanSelection();
      modelStore.graph?.select( modelStore.graph?.getCellById(selectionId));
    }

  },[ modelStore.graph, modelStore.selectedNode])

  const nodeSelectedClickHandle = (arg: { node: Node<Node.Properties>; })=>{
    modelStore.selectClass(arg.node.id);
  }

  const unselectedClickHandle = ()=>{
    if(modelStore.openedDiagram?.getNodeById(modelStore.selectedNode?.id||'')){
      modelStore.setSelectedNode(undefined);      
    }
  }

  useEffect(()=>{
    const graph =  modelStore.graph;
    modelStore.setGraph(graph);
    graph?.on('node:selected', nodeSelectedClickHandle);
    graph?.on('node:unselected', unselectedClickHandle);
    return ()=>{
      graph?.off('node:selected', nodeSelectedClickHandle);
      graph?.off('node:unselected', unselectedClickHandle);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[modelStore.graph])
}