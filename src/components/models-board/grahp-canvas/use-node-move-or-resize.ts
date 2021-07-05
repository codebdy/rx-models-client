import { useEffect } from "react";
import { useModelsBoardStore } from "../store";
import { Node } from '@antv/x6';
import { NodeChangeCommand } from "../command/node-change-command";

export function useNodeMoveOrResize(){
  const modelStore = useModelsBoardStore();
  const HandleNodeChange = (arg: { node: Node<Node.Properties>; })=>{
    const node = arg.node;
    if(!modelStore.openedDiagram){
      return;
    }
    const command = new NodeChangeCommand(modelStore.openedDiagram,
      {
        id:node.id,
        x:node.getPosition().x, 
        y:node.getPosition().y, 
        width: node.getSize().width, 
        height: node.getSize().height,
      },
      modelStore.rootStore.getClassById(node.id),
    )
    modelStore.setChangingCommand(command);
  }

  const handleNodeChanged = (arg: { node: Node<Node.Properties>; })=>{
    const node = arg.node;
    if(!modelStore.openedDiagram || !modelStore.changingCommand){
      modelStore.setChangingCommand(undefined);
      return;
    }
    modelStore.changingCommand.setNewNodeMeta({
      id:node.id,
      x:node.getPosition().x, 
      y:node.getPosition().y, 
      width: node.getSize().width, 
      height: node.getSize().height,
    });
    modelStore.excuteCommand(modelStore.changingCommand);
    modelStore.setChangingCommand(undefined);
  }

  useEffect(()=>{
    const graph =  modelStore.graph;

    graph?.on('node:move', HandleNodeChange);
    graph?.on('node:moved', handleNodeChanged);
    graph?.on('node:resize', HandleNodeChange);
    graph?.on('node:resized', handleNodeChanged);
    return ()=>{
      graph?.off('node:move', HandleNodeChange);
      graph?.off('node:moved', handleNodeChanged);
      graph?.off('node:resize', HandleNodeChange);
      graph?.off('node:resized', handleNodeChanged);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[modelStore.graph])
}