import { useModelsBoardStore } from "../store";
import { Node } from '@antv/x6';
import { CreateEntityCommand } from "../command/create-entity-command";
import { AddClassCommand } from "../command/add-class-command";
import { useEffect } from "react";

export function useAddNode(){
  const modelStore = useModelsBoardStore();
  
  const nodeAdded = (arg: { node: Node<Node.Properties>; })=>{
    const node = arg.node;
    const {isTempForNew, isTempForDrag, packageName, ...classMeta} = arg.node.data;
    if(!modelStore.openedDiagram){
      return;
    }

    if(isTempForNew){
      node.remove({disconnectEdges:true});
      const command = new CreateEntityCommand(modelStore.openedDiagram, classMeta, 
        {
          //拖放时有Clone动作，ID被改变，所以取Data里面的ID使用
          id:classMeta.id||'', 
          x:node.getPosition().x, 
          y:node.getPosition().y, 
          width: node.getSize().width, 
          height: node.getSize().height,
        }
      )
      modelStore.excuteCommand(command);
    }
    if(isTempForDrag){
      node.remove({disconnectEdges:true});
      if(modelStore.graph?.getCellById(classMeta.id)){
        return;
      }
      const command = new AddClassCommand(modelStore.openedDiagram, modelStore?.rootStore.getEntityById(classMeta.id),
      {
        //拖放时有Clone动作，ID被改变，所以取Data里面的ID使用
        id:classMeta.id||'', 
        x:node.getPosition().x, 
        y:node.getPosition().y, 
        width: node.getSize().width, 
        height: node.getSize().height,
      }
      )
      modelStore.excuteCommand(command);
    }
  }

  useEffect(()=>{
    const graph =  modelStore.graph;
    graph?.on('node:added', nodeAdded);
    return ()=>{
      graph?.off('node:added', nodeAdded);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[modelStore.graph])
}