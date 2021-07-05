import { IconButton } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";
import MdiIcon from "components/common/mdi-icon";
import { observer } from "mobx-react";
import { RelationOfClass } from "../store/entity-store";
import { NodeText } from "./node-text";
import { TreeNodeLabel } from "./tree-node-label";


export const RelationNode = observer((props:{
  key?:string,
  relation: RelationOfClass
})=>{
  const {relation} = props;
  const handleClick = ()=>{
    
  }
  return(
    <TreeItem nodeId= {relation.id} label={
      <TreeNodeLabel
        action = {
          <IconButton size = "small">
            <MdiIcon className="mdi-trash-can-outline" size="16" />
          </IconButton>
        }
        onClick = {handleClick}
      >
        <MdiIcon iconClass = "mdi-relation-many-to-many" size={12} />
        <NodeText>{relation.name}</NodeText>
      </TreeNodeLabel>
    }>
    </TreeItem>
  )
})
