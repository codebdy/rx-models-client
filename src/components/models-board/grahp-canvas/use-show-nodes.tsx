import { useModelsBoardStore } from "../store";
import '@antv/x6-react-shape'
import { Node } from '@antv/x6';
import { useEffect } from "react";
import { ClassView } from "./class-view";
import _ from "lodash";

export function useShowNodes(){
  const modelStore = useModelsBoardStore();
  const nodes = modelStore.openedDiagram?.getNodes();
  useEffect(()=>{
    nodes?.forEach(node=>{
      const grahpNode =  modelStore.graph?.getCellById(node.id) as Node<Node.Properties>;
      if(grahpNode) {
        //Update by diff
        if(!_.isEqual(node.data, grahpNode.data)){
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
          component: <ClassView />
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