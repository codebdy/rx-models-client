import { Cell, Node, Graph } from '@antv/x6';
import { useEffect } from 'react';
import { AddClassCommand } from '../command/add-class-command';
import { CreateClassCommand } from '../command/create-class-command';
import { NodeChangeCommand } from '../command/node-change-command';
import { useModelsBoardStore } from '../store';
import { getGraphConfig } from './get-grahp-config';

export function useCreateGraph(){
  const modelStore = useModelsBoardStore();
  const nodeSelectedClickHandle = (arg: { node: Cell<Cell.Properties>; })=>{
    modelStore.selectClass(arg.node.id);
  }

  const unselectedClickHandle = ()=>{
    if(modelStore.openedDiagram?.getNodeById(modelStore.selectedNode?.id||'')){
      modelStore.setSelectedNode(undefined);      
    }
  }

  const nodeAdded = (arg: { node: Node<Node.Properties>; })=>{
    const node = arg.node;
    const {isTempForNew, isTempForDrag, packageName, ...classMeta} = arg.node.data;
    if(!modelStore.openedDiagram){
      return;
    }

    if(isTempForNew){
      node.remove({disconnectEdges:true});
      const command = new CreateClassCommand(modelStore.openedDiagram, classMeta, 
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
      const command = new AddClassCommand(modelStore.openedDiagram, modelStore?.rootStore.getClassById(classMeta.id),
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
    const config = getGraphConfig();
    const graph =  new Graph(config as any);
    //graph?.enableSelection();
    modelStore.setGraph(graph);
    graph.on('node:selected', nodeSelectedClickHandle);
    graph.on('node:unselected', unselectedClickHandle);
    graph.on('node:added', nodeAdded);
    graph.on('node:move', nodeChangeHandle);
    graph.on('node:moved', nodeChangedHandle);
    graph.on('node:resize', nodeChangeHandle);
    graph.on('node:resized', nodeChangedHandle);
    return ()=>{
      graph.off('node:selected', nodeSelectedClickHandle);
      graph.off('node:unselected', unselectedClickHandle);
      graph.off('node:added', nodeAdded);
      graph.off('node:move', nodeChangeHandle);
      graph.off('node:moved', nodeChangedHandle);
      graph.off('node:resize', nodeChangeHandle);
      graph.off('node:resized', nodeChangedHandle);
      graph?.dispose();
      modelStore.setGraph(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[modelStore.openedDiagram])
}