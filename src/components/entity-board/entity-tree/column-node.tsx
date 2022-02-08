import { IconButton } from "@mui/material";
import { TreeItem } from "@mui/lab";
import MdiIcon from "components/common/mdi-icon";
import { NodeText } from "./node-text";
import { TreeNodeLabel } from "./tree-node-label";
import { ColumnMeta } from "../meta/column-meta";

export const ColumnNode = (props: { key?: string; column: ColumnMeta }) => {
  const { column } = props;

  const isId = column.name === "id"; /*&&
    column.entityStore.entityType !== EntityType.INTERFACE*/

  const handleClick = () => {
    // bordStore.setSelectedElement(column);
  };

  const handleDelete = () => {
    // const command = new ColumnDeleteCommand(column);
    // bordStore.excuteCommand(command);
  };
  return (
    <TreeItem
      nodeId={column.uuid}
      label={
        <TreeNodeLabel
          action={
            !isId && (
              <IconButton size="small" onClick={handleDelete}>
                <MdiIcon className="mdi-trash-can-outline" size="16" />
              </IconButton>
            )
          }
          onClick={handleClick}
        >
          <MdiIcon iconClass="mdi-rhombus-outline" size={12} />
          <NodeText>{column.name}</NodeText>
        </TreeNodeLabel>
      }
    ></TreeItem>
  );
};
