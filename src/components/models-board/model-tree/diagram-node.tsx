import { IconButton, TextField } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";
import MdiIcon from "components/common/mdi-icon";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { DiagramDeleteCommand } from "../command/diagram-delete-command";
import { NameChangeCommand } from "../command/name-change-command";
import { useModelsBoardStore } from "../store";
import { DiagramStore } from "../store/diagram";
import { NodeText } from "./node-text";
import { TreeNodeLabel } from "./tree-node-label";

export const DiagramNode = observer((props:{
  key?:string,
  diagramStore: DiagramStore
})=>{
  const {diagramStore} = props;
  const [editing, setEditing] = useState(false);
  const bordStore = useModelsBoardStore();
  const handleClick = ()=>{
    bordStore.setOpendDiagram(diagramStore);
  }
  const handleEdit = (event:React.MouseEvent)=>{
    setEditing(true);
    event.stopPropagation();
  }

  const handleNameChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const command = new NameChangeCommand(diagramStore, event.target.value as string);
    bordStore.excuteCommand(command);
  }

  const handleNameBlur = ()=>{
    setEditing(false);
  }

  const handleKeyEnter = (event:React.KeyboardEvent<HTMLElement>)=>{
    if(event.key === 'Enter') {
      setEditing(false);
    }
  }

  const handleDelete = (event:React.MouseEvent)=>{
    const command = new DiagramDeleteCommand(diagramStore, bordStore);
    bordStore.excuteCommand(command);
    event.stopPropagation();
  }

  return(
    <TreeItem nodeId= {diagramStore.id} label={
      <TreeNodeLabel
        action = {
          !editing &&
          <>
            <IconButton size = "small" onClick={handleEdit}>
              <MdiIcon className="mdi-pencil-outline" size="16" />
            </IconButton>
            <IconButton size = "small"
              onClick = {handleDelete}
            >
              <MdiIcon className="mdi-trash-can-outline" size="16" />
            </IconButton>
          </>
        }

        onClick = {handleClick}
      >
        <MdiIcon iconClass = "mdi-arrange-send-backward" size={15} />
        <NodeText>
          {
            editing
            ? <TextField 
                value = {diagramStore.name || ''} 
                size = "small" 
                onChange={handleNameChange}
                onBlur = {handleNameBlur}
                onKeyUp = {handleKeyEnter}
                autoFocus
              />
            : diagramStore.name
          }
        </NodeText>
      </TreeNodeLabel>
    }>
    </TreeItem>
  )
})
