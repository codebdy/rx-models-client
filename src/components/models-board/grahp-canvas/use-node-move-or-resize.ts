import { useEffect } from "react";
import { useModelsBoardStore } from "../store";
import { Node } from '@antv/x6';
import { NodeChangeCommand } from "../command/node-change-command";

export function useNodeMoveOrResize(){
  const modelStore = useModelsBoardStore();
  const nodeChangeHandle = (arg: { node: Node<Node.Properties>; })=>{
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

  const nodeChangedHandle = (arg: { node: Node<Node.Properties>; })=>{
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
    modelStore.setGraph(graph);
    graph?.on('node:move', nodeChangeHandle);
    graph?.on('node:moved', nodeChangedHandle);
    graph?.on('node:resize', nodeChangeHandle);
    graph?.on('node:resized', nodeChangedHandle);
    return ()=>{
      graph?.off('node:move', nodeChangeHandle);
      graph?.off('node:moved', nodeChangedHandle);
      graph?.off('node:resize', nodeChangeHandle);
      graph?.off('node:resized', nodeChangedHandle);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[modelStore.graph])
}