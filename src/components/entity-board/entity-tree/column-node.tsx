import { IconButton } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";
import MdiIcon from "components/common/mdi-icon";
import { observer } from "mobx-react";
import { ColumnDeleteCommand } from "../command/column-delete-command";
import { useEntityBoardStore } from "../store/helper";
import { ColumnStore } from "../store/column";
import { NodeText } from "./node-text";
import { TreeNodeLabel } from "./tree-node-label";
import { EntityType } from "../meta/entity-meta";

export const ColumnNode = observer((props:{
  key?:string,
  columnStore: ColumnStore,
})=>{
  const {columnStore} = props;
  const bordStore = useEntityBoardStore();

  const isId = columnStore.name === 'id' && columnStore.entityStore.entityType !== EntityType.INTERFACE;

  const handleClick = ()=>{
    bordStore.setSelectedElement(columnStore);
  }

  const handleDelete = ()=>{
    const command = new ColumnDeleteCommand(columnStore);
    bordStore.excuteCommand(command);
  }
  return(
    <TreeItem nodeId= {columnStore.uuid} label={
      <TreeNodeLabel
        action = {
          !isId &&
          <IconButton 
            size = "small"
            onClick = {handleDelete}
          >
            <MdiIcon className="mdi-trash-can-outline" size="16" />
          </IconButton>
        }
        onClick = {handleClick}
      >
        <MdiIcon iconClass = "mdi-rhombus-outline" size={12} />
        <NodeText>{columnStore.name}</NodeText>
      </TreeNodeLabel>
    }>
    </TreeItem>
  )
})
