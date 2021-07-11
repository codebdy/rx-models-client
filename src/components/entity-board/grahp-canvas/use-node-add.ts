import { useModelsBoardStore } from "../store";
import { Node } from '@antv/x6';
import { EntityCreateCommand } from "../command/entity-create-command";
import { EntityAddCommand } from "../command/entity-add-command";
import { useEffect } from "react";
import { EntityMeta } from "../meta/entity-meta";

export function useNodeAdd(){
  const modelStore = useModelsBoardStore();
  
  const nodeAdded = (arg: { node: Node<Node.Properties>; })=>{
    const node = arg.node;
    const {isTempForNew, isTempForDrag, packageName, ...rest} = arg.node.data;
    const entityMeta = rest as EntityMeta;
    if(!modelStore.openedDiagram){
      return;
    }

    if(isTempForNew){
      node.remove({disconnectEdges:true});
      const command = new EntityCreateCommand(modelStore.openedDiagram, entityMeta, 
        {
          //拖放时有Clone动作，ID被改变，所以取Data里面的ID使用
          id:entityMeta.uuid||'', 
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
      if(modelStore.graph?.getCellById(entityMeta.uuid)){
        return;
      }
      const command = new EntityAddCommand(modelStore.openedDiagram, modelStore?.getEntityById(entityMeta.uuid),
      {
        //拖放时有Clone动作，ID被改变，所以取Data里面的ID使用
        id:entityMeta.uuid||'', 
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