import { TreeItem } from "@material-ui/lab";
import MdiIcon from "components/common/mdi-icon";
import { observer } from "mobx-react";
import React from "react";
import { useModelsBoardStore } from "../store";
import { PackageStore } from "../store/package";
import { EntityNode } from "./entity-node";
import { DiagramNode } from "./diagram-node";
import { NodeText } from "./node-text";
import PackageAction from "./package-action";
import { TreeNodeLabel } from "./tree-node-label";
import { createId } from "util/creat-id";
import { EntityCreateOnTreeCommand } from "../command/entity-create-on-tree-command";
import { PackageCreateCommand } from "../command/package-create-command";
import { creatNewEntityMeta } from "../store/create-new-entity-meta";
import { getNewPackageName } from "../store/get-new-package-name";
import { DiagramCreateCommand } from "../command/diagram-create-command";
import { getNewDiagramName } from "../store/get-new-diagram-name";
import { PackageDeleteCommand } from "../command/package-delete-command";

export const PackageNode = observer((props:{
  key?:string,
  packageStore: PackageStore
})=>{
  const {packageStore} = props;
  const bordStore = useModelsBoardStore();
  const rootStore = bordStore.rootStore;

  const handleClick = (event:React.MouseEvent)=>{
    bordStore.setSelectedElement(packageStore);
    event.stopPropagation();
  }

  const handleAddPackage = ()=>{
    const command = new PackageCreateCommand(
      new PackageStore({
        id:createId(), 
        name: getNewPackageName(rootStore),
      }, packageStore, rootStore), 
      packageStore
    )
    bordStore.excuteCommand(command);
  } 
  
  const handleAddEntity = ()=>{
    const command = new EntityCreateOnTreeCommand(packageStore, creatNewEntityMeta(bordStore.rootStore))
    bordStore.excuteCommand(command);
  }

  const handleAddDiagram = ()=>{
    const command = new DiagramCreateCommand({
      id: createId(),
      name: getNewDiagramName(rootStore),
      nodes:[],
      edges:[]
    }, packageStore, bordStore);
    bordStore.excuteCommand(command);
  }

  const handleDelete = ()=>{
    const command = new PackageDeleteCommand(packageStore);
    bordStore.excuteCommand(command);
  }

  return(
    <TreeItem nodeId= {packageStore.id} label={
      <TreeNodeLabel
        action = {
          <PackageAction 
            onAddPackage = {handleAddPackage} 
            onAddClass = {handleAddEntity}
            onAddDiagram = {handleAddDiagram}
            onDelete = {handleDelete}          
          />
        }
        onClick = {handleClick}
      >
        <MdiIcon iconClass = "mdi-folder-outline" size={18} />
        <NodeText>{packageStore.name}</NodeText>
      </TreeNodeLabel>
    }>
      {
        packageStore.packages.map(aPackage=>{
          return (
            <PackageNode key={aPackage.id} packageStore = {aPackage} />
          )
        })
      }
      {
        packageStore.entities.map(aClass=>{
          return (
            <EntityNode key={aClass.id} entityStore = {aClass} />
          )
        })
      }
      {
        packageStore.diagrams.map(diagram=>{
          return (
            <DiagramNode key={diagram.id} diagramStore = {diagram} />
          )
        })
      }
    </TreeItem>
  )
})
