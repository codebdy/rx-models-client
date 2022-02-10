import { useEffect } from "react";
import { useEntityBoardStore } from "../store/helper";
import { Node } from '@antv/x6';
import { NodeChangeCommand } from "../command/node-change-command";

export function useNodeChange(){
  const modelStore = useEntityBoardStore();

  const handleNodeChanged = (arg: { node: Node<Node.Properties> })=>{
    const {node} = arg;
    if(!modelStore.openedDiagram || !node.id){
      return;
    }
    const command = new NodeChangeCommand(modelStore.openedDiagram,
      modelStore.getEntityById(node.id),
    )

    // command.setNewNodeMeta({
    //   id:node.id,
    //   x:node.getPosition().x, 
    //   y:node.getPosition().y, 
    //   width: node.getSize().width, 
    //   height: node.getSize().height,
    // });
    modelStore.excuteCommand(command);
  }

  useEffect(()=>{
    const graph =  modelStore.graph;

    graph?.on('node:moved', handleNodeChanged);
    graph?.on('node:resized', handleNodeChanged);
    return ()=>{
      graph?.off('node:moved', handleNodeChanged);
      graph?.off('node:resized', handleNodeChanged);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[modelStore.graph])
}