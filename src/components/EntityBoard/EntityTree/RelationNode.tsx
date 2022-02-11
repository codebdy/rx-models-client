import { IconButton, SvgIcon } from "@mui/material";
import { TreeItem } from "@mui/lab";
import { NodeText } from "./NodeText";
import { TreeNodeLabel } from "./TreeNodeLabel";
import { RelationMeta, RelationType } from "../meta/RelationMeta";
import { useEntity } from "../hooks/useEntity";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export const RelationNode = (props: {
  key?: string;
  relation: RelationMeta;
  isSource: boolean;
}) => {
  const { relation, isSource } = props;
  const handleClick = () => {
    // bordStore.setSelectedElement(relation);
  };

  const handleDelete = () => {
    // const command = new RelationDeleteCommand(relation);
    // bordStore.excuteCommand(command);
  };

  const isInherit = relation.relationType === RelationType.INHERIT;

  const targetEntity = useEntity(relation.targetId);

  return (
    <TreeItem
      nodeId={relation.uuid}
      label={
        <TreeNodeLabel
          action={
            <IconButton size="small" onClick={handleDelete}>
              <DeleteOutlineOutlinedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          }
          onClick={handleClick}
        >
          {isInherit ? (
            <SvgIcon style={{ width: 12, height: 12 }}>
              <path fill="currentColor" d="M12,2L1,21H23M12,6L19.53,19H4.47" />
            </SvgIcon>
          ) : (
            <SvgIcon sx={{ fontSize: 12 }}>
              <path
                fill="currentColor"
                d="M22 13V19H21L19 17H11V9H5L3 11H2V5H3L5 7H13V15H19L21 13Z"
              />
            </SvgIcon>
          )}

          <NodeText>
            <>
              {isInherit && targetEntity?.name}
              {isSource && !isInherit
                ? relation.roleOnSource
                : relation.roleOnTarget}
              {/* {relation.ownerId === entityStore.uuid && !isInherit && (
                <MdiIcon iconClass="mdi-account-outline" size={12} />
              )} */}
            </>
          </NodeText>
        </TreeNodeLabel>
      }
    ></TreeItem>
  );
};
