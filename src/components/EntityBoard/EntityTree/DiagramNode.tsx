import { IconButton, OutlinedInput } from "@mui/material";
import { TreeItem } from "@mui/lab";
import React, { memo, useState } from "react";
import { NodeText } from "./NodeText";
import { TreeNodeLabel } from "./TreeNodeLabel";
import { DiagramMeta } from "../meta/DiagramMeta";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { useSetRecoilState } from "recoil";
import { selectedDiagramState } from "../recoil/atoms";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export const DiagramNode = memo(
  (props: { key?: string; diagram: DiagramMeta }) => {
    const { diagram } = props;
    const [editing, setEditing] = useState(false);
    const setSelectedDiagram = useSetRecoilState(selectedDiagramState);

    const handleClick = () => {
      setSelectedDiagram(diagram.uuid);
    };
    const handleEdit = (event: React.MouseEvent) => {
      setEditing(true);
      event.stopPropagation();
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      // const command = new NameChangeCommand(
      //   diagram,
      //   event.target.value as string
      // );
      // bordStore.excuteCommand(command);
    };

    const handleNameBlur = () => {
      setEditing(false);
    };

    const handleKeyEnter = (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === "Enter") {
        setEditing(false);
      }
    };

    const handleDelete = (event: React.MouseEvent) => {
      // const command = new DiagramDeleteCommand(diagram, bordStore);
      // bordStore.excuteCommand(command);
      event.stopPropagation();
    };

    return (
      <TreeItem
        nodeId={diagram.uuid}
        label={
          <TreeNodeLabel
            action={
              !editing && (
                <>
                  <IconButton size="small" onClick={handleEdit}>
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={handleDelete}>
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </IconButton>
                </>
              )
            }
            onClick={handleClick}
          >
            <InsertDriveFileOutlinedIcon fontSize="small" sx={{ ml: -0.2 }} />
            <NodeText>
              {editing ? (
                <OutlinedInput
                  value={diagram.name || ""}
                  size="small"
                  onChange={handleNameChange}
                  onBlur={handleNameBlur}
                  onKeyUp={handleKeyEnter}
                  sx={{ height: 20, fontSize: 13 }}
                  autoFocus
                />
              ) : (
                diagram.name
              )}
            </NodeText>
          </TreeNodeLabel>
        }
      ></TreeItem>
    );
  }
);
