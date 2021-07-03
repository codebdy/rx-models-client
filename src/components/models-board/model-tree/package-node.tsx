import { TreeItem } from "@material-ui/lab";
import MdiIcon from "components/common/mdi-icon";
import { observer } from "mobx-react";
import React from "react";
import { useModelsBoardStore } from "../store";
import { PackageStore } from "../store/package";
import { ClassNode } from "./class-node";
import { DiagramNode } from "./diagram-node";
import { NodeText } from "./node-text";
import PackageAction from "./package-action";
import { TreeNodeLabel } from "./tree-node-label";

export const PackageNode = observer((props:{
  key?:string,
  packageStore: PackageStore
})=>{
  const {packageStore} = props;
  const bordStore = useModelsBoardStore();

  const handleClick = (event:React.MouseEvent)=>{
    bordStore.setSelectedNode(packageStore);
    event.stopPropagation();
  }

  const handleAddPackage = ()=>{

  }

  const handleAddClass = ()=>{

  }

  const handleAddDiagram = ()=>{

  }

  const handleDelete = ()=>{

  }

  return(
    <TreeItem nodeId= {packageStore.id} label={
      <TreeNodeLabel
        action = {
          <PackageAction 
            canEdit 
            onAddPackage = {handleAddPackage} 
            onAddClass = {handleAddClass}
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
        packageStore.classes.map(aClass=>{
          return (
            <ClassNode key={aClass.id} classStore = {aClass} />
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
