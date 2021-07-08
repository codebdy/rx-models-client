import { IconButton } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";
import MdiIcon from "components/common/mdi-icon";
import { observer } from "mobx-react";
import { ColumnDeleteCommand } from "../command/column-delete-command";
import { useModelsBoardStore } from "../store";
import { ColumnStore } from "../store/column";
import { EntityStore } from "../store/entity-store";
import { NodeText } from "./node-text";
import { TreeNodeLabel } from "./tree-node-label";


export const ColumnNode = observer((props:{
  key?:string,
  columnStore: ColumnStore,
  entityStore: EntityStore,
})=>{
  const {columnStore, entityStore} = props;
  const bordStore = useModelsBoardStore();

  const handleClick = ()=>{
    bordStore.setSelectedElement(columnStore);
  }

  const handleDelete = ()=>{
    const command = new ColumnDeleteCommand(entityStore, columnStore.id);
    bordStore.excuteCommand(command);
  }
  return(
    <TreeItem nodeId= {columnStore.id} label={
      <TreeNodeLabel
        action = {
          columnStore.name !== 'id' &&
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
