import { IconButton, SvgIcon } from "@mui/material";
import { TreeItem } from "@mui/lab";
import { NodeText } from "./NodeText";
import { TreeNodeLabel } from "./TreeNodeLabel";
import { RelationMeta } from "../meta/RelationMeta";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useSetRecoilState } from "recoil";
import { selectedElementState } from "../recoil/atoms";
import { useServiceId } from "../hooks/useServiceId";
import { useGetClass } from "../hooks/useGetClass";

export const RelationNode = (props: {
  key?: string;
  relation: RelationMeta;
  isSource: boolean;
}) => {
  const { relation, isSource } = props;
  const serviceId = useServiceId();
  const setSelectedElement = useSetRecoilState(selectedElementState(serviceId));
  const getClass = useGetClass(serviceId);
  const handleClick = () => {
    setSelectedElement(relation.uuid);
  };

  const handleDelete = () => {
    // const command = new RelationDeleteCommand(relation);
    // bordStore.excuteCommand(command);
  };

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
          <SvgIcon sx={{ fontSize: 12 }}>
            <path
              fill="currentColor"
              d="M22 13V19H21L19 17H11V9H5L3 11H2V5H3L5 7H13V15H19L21 13Z"
            />
          </SvgIcon>

          <NodeText>
            {isSource ? relation.roleOfTarget : relation.roleOfSource}:
            {isSource
              ? getClass(relation.targetId)?.name
              : getClass(relation.sourceId)?.name}
          </NodeText>
        </TreeNodeLabel>
      }
    ></TreeItem>
  );
};
