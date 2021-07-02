import { IconButton } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";
import MdiIcon from "components/common/mdi-icon";
import { PackageStore } from "../store/package";
import { ClassNode } from "./class-node";
import { DiagramNode } from "./diagram-node";
import { NodeText } from "./node-text";
import { TreeNodeLabel } from "./tree-node-label";

export function PackageNode(props:{
  key?:string,
  packageStore: PackageStore
}){
const {packageStore} = props;

return(
  <TreeItem nodeId= {packageStore.id} label={
    <TreeNodeLabel
      action = {
        <IconButton size = "small">
          <MdiIcon className="mdi-dots-horizontal" size="16" />
        </IconButton>
      }
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
}
