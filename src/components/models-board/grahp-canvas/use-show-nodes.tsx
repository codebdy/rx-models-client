import { useModelsBoardStore } from "../store";
import '@antv/x6-react-shape'
import { Node } from '@antv/x6';
import { useEffect } from "react";
import { EntityView } from "./entity-view";
import _ from "lodash";
import { ColumnStore } from "../store/column";
import { EntityHideCommand } from "../command/entity-hide-command";
import { ColumnDeleteCommand } from "../command/column-delete-command";
import { ColumnCreateCommand } from "../command/column-create-command";

export function useShowNodes(){
  const modelStore = useModelsBoardStore();
  const nodes = modelStore.openedDiagram?.getNodes(
    modelStore.selectedElement instanceof ColumnStore 
     ? (modelStore.selectedElement?.id)
     : undefined,
     !!modelStore.pressedLineType
  );

  const handleColumnSelect = (entityId:string, columnId:string)=>{
    const entity = modelStore.rootStore.getEntityById(entityId);
    modelStore.setSelectedElement(entity?.columns.find(column=>column.id === columnId));
  }

  const handleColumnDelete = (entityId:string, columnId:string)=>{
    const entity = modelStore.rootStore.getEntityById(entityId);
    if(entity){
      const command = new ColumnDeleteCommand(entity, columnId);
      modelStore.excuteCommand(command);
    }
  }

  const handleColumnCreate = (entityId:string)=>{
    const entity = modelStore.rootStore.getEntityById(entityId);
    if(entity){
      const command = new ColumnCreateCommand(entity);
      modelStore.excuteCommand(command);
    }
  }

  const handleHideEntity = (entityId:string)=>{
    if(!modelStore.openedDiagram){
      return;
    }

    const entityStore = modelStore.rootStore.getEntityById(entityId);
    const nodeMeta = modelStore.openedDiagram.getNodeById(entityId);
    if(!entityStore || !nodeMeta){
      return;
    }
    const command = new EntityHideCommand(modelStore.openedDiagram, nodeMeta, entityStore);

    modelStore.excuteCommand(command);
  }

  useEffect(()=>{
    nodes?.forEach(node=>{
      const grahpNode =  modelStore.graph?.getCellById(node.id) as Node<Node.Properties>;
      if(grahpNode) {
        //Update by diff
        if(!_.isEqual(node.data, grahpNode.data)){
          grahpNode.removeData();
          grahpNode.setData(node.data);
        }
        if(node.x !== grahpNode.getPosition().x 
          || node.y !== grahpNode.getPosition().y
          || node.width !== grahpNode.getSize().width
          || node.height !== grahpNode.getSize().height
        ){
          grahpNode.setSize(node as any);
          grahpNode.setPosition(node as any);
        }
      }
      else{
        modelStore.graph?.addNode({
          ...node, 
          shape: 'react-shape', 
          component: <EntityView 
            onColumnSelect = {handleColumnSelect}
            onColumnDelete = {handleColumnDelete}
            onColumnCreate = {handleColumnCreate}
            onHide = {handleHideEntity}
          />
        });
      }
    })
    modelStore.graph?.getNodes().forEach(node=>{
      if(!modelStore.openedDiagram?.getNodeById(node.id)){
        modelStore.graph?.removeNode(node.id);
      }
    })
  })

}