import TreeItem from "@mui/lab/TreeItem";
import { useRecoilValue } from "recoil";
import { TREE_ROOT_ID } from "util/consts";
import { classesState } from "../recoil/atoms";
import { TreeNodeLabel } from "./TreeNodeLabel";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { useServiceId } from "../hooks/useServiceId";
import { NodeText } from "./NodeText";
import { ClassNode } from "./ClassNode";
import intl from "react-intl-universal";
import { memo } from "react";
import { Graph } from "@antv/x6";

export const Entities = memo((props: { graph?: Graph }) => {
  const { graph } = props;
  const serviceId = useServiceId();
  const entities = useRecoilValue(classesState(serviceId));

  return entities.length > 0 ? (
    <TreeItem
      nodeId={TREE_ROOT_ID + "ENTITIES"}
      label={
        <TreeNodeLabel>
          <FolderOutlinedIcon />
          <NodeText>{intl.get("entity-classes")}</NodeText>
        </TreeNodeLabel>
      }
    >
      {entities.map((entity) => {
        return <ClassNode key={entity.uuid} uuid={entity.uuid} graph={graph} />;
      })}
    </TreeItem>
  ) : (
    <></>
  );
});
