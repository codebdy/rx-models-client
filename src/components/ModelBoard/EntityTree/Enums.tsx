import TreeItem from "@mui/lab/TreeItem";
import { TREE_ROOT_ID } from "util/consts";
import { TreeNodeLabel } from "./TreeNodeLabel";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { useServiceId } from "../hooks/useServiceId";
import { NodeText } from "./NodeText";
import { ClassNode } from "./ClassNode";
import intl from "react-intl-universal";
import { memo } from "react";
import { Graph } from "@antv/x6";
import { useEnums } from "../hooks/useEnums";

export const Enums = memo((props: { graph?: Graph }) => {
  const { graph } = props;
  const serviceId = useServiceId();
  const enums = useEnums(serviceId);

  return enums.length > 0 ? (
    <TreeItem
      nodeId={TREE_ROOT_ID + "ENUMS"}
      label={
        <TreeNodeLabel>
          <FolderOutlinedIcon />
          <NodeText>{intl.get("enum-classes")}</NodeText>
        </TreeNodeLabel>
      }
    >
      {enums.map((entity) => {
        return <ClassNode key={entity.uuid} uuid={entity.uuid} graph={graph} />;
      })}
    </TreeItem>
  ) : (
    <></>
  );
});
