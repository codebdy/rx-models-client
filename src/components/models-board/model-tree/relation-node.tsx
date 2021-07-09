import { IconButton } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";
import MdiIcon from "components/common/mdi-icon";
import { observer } from "mobx-react";
import { RelationDeleteCommand } from "../command/relation-delete-command";
import { useModelsBoardStore } from "../store";
import { RelationStore } from "../store/relation";
import { NodeText } from "./node-text";
import { TreeNodeLabel } from "./tree-node-label";


export const RelationNode = observer((props:{
  key?:string,
  relation: RelationStore,
  isSource: boolean,
})=>{
  const {relation, isSource} = props;
  const bordStore = useModelsBoardStore();
  const handleClick = ()=>{
    bordStore.setSelectedElement(relation);
  }

  const handleDelete = ()=>{
    const command = new RelationDeleteCommand(relation, bordStore.rootStore);
    bordStore.excuteCommand(command);
  }

  return(
    <TreeItem nodeId= {relation.uuid} label={
      <TreeNodeLabel
        action = {
          <IconButton 
            size = "small"
            onClick = {handleDelete}
          >
            <MdiIcon className="mdi-trash-can-outline" size="16" />
          </IconButton>
        }
        onClick = {handleClick}
      >
        <MdiIcon iconClass = "mdi-relation-many-to-many" size={12} />
        <NodeText>{
          isSource 
            ? relation.roleOnSource
            : relation.roleOnTarget
        }</NodeText>
      </TreeNodeLabel>
    }>
    </TreeItem>
  )
})
