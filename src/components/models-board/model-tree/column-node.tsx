import { IconButton } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";
import MdiIcon from "components/common/mdi-icon";
import { observer } from "mobx-react";
import { useModelsBoardStore } from "../store";
import { ColumnStore } from "../store/column";
import { NodeText } from "./node-text";
import { TreeNodeLabel } from "./tree-node-label";


export const ColumnNode = observer((props:{
  key?:string,
  columnStore: ColumnStore
})=>{
  const {columnStore} = props;
  const bordStore = useModelsBoardStore();

  const handleClick = ()=>{
    bordStore.setSelectedNode(columnStore);
  }
  return(
    <TreeItem nodeId= {columnStore.id} label={
      <TreeNodeLabel
        action = {
          <IconButton size = "small">
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
