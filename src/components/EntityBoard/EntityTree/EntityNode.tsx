import React, { memo, useEffect } from "react";
import { IconButton, SvgIcon } from "@mui/material";
import { TreeItem } from "@mui/lab";
import { NodeText } from "./NodeText";
import { ColumnNode } from "./ColumnNode";
import { TreeNodeLabel } from "./TreeNodeLabel";
import intl from "react-intl-universal";
import { RelationNode } from "./RelationNode";
import { Addon, Graph } from "@antv/x6";
import { useEntity } from "../hooks/useEntity";
import { useSourceRelations } from "../hooks/useSourceRelations";
import { useTargetRelations } from "../hooks/useTargetRelations";
import { useSetRecoilState } from "recoil";
import { selectedElementState } from "../recoil/atoms";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { EntityView } from "../GraphCanvas/EntityView";
import { NODE_INIT_SIZE } from "../GraphCanvas/nodeInitSize";
import { useDeleteEntity } from "../hooks/useDeleteEntity";
const { Dnd } = Addon;

export const EntityNode = memo((props: { uuid: string; graph?: Graph }) => {
  const { uuid, graph } = props;
  const [dnd, setDnd] = React.useState<any>();
  const setSelectedElement = useSetRecoilState(selectedElementState);
  const entity = useEntity(uuid);
  const sourceRelations = useSourceRelations(uuid);
  const targetRelations = useTargetRelations(uuid);
  const deleteEntity = useDeleteEntity();

  useEffect(() => {
    const theDnd = graph
      ? new Dnd({
          target: graph,
          scaled: false,
          animation: true,
        })
      : undefined;
    setDnd(theDnd);
  }, [graph]);

  const startDragHandle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!graph) {
      return;
    }
    const node = graph.createNode({
      ...NODE_INIT_SIZE,
      height: 70 + (entity?.columns.length || 0) * 26,
      isTempForDrag: true,
      shape: "react-shape",
      component: <EntityView />,
      data: { ...entity, isTempForDrag: true },
    });
    dnd?.start(node, e.nativeEvent as any);
  };

  const handleClick = (event: React.MouseEvent) => {
    setSelectedElement(uuid);
    // bordStore.setSelectedElement(entityStore);
    event.stopPropagation();
  };
  // const allScouceRelation = entityStore.getSourceRelations();
  // const sourceRelations = allScouceRelation.filter(
  //   (relation) => relation.relationType !== RelationType.INHERIT
  // );
  // const targetRelations = entityStore
  //   .getTargetRelations()
  //   .filter((relation) => relation.relationType !== RelationType.INHERIT);

  const handleDelete = (event: React.MouseEvent) => {
    deleteEntity(uuid);
    event.stopPropagation();
  };

  const handlePlusColumn = (event: React.MouseEvent) => {
    // const command = new ColumnCreateCommand(entityStore, createId());
    // bordStore.excuteCommand(command);
    event.stopPropagation();
  };

  // const inherits = allScouceRelation.filter(
  //   (relation) => relation.relationType === RelationType.INHERIT
  // );

  return (
    <TreeItem
      nodeId={uuid}
      label={
        <TreeNodeLabel
          action={
            <IconButton size="small" onClick={handleDelete}>
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
          }
          onClick={handleClick}
          onDragStart={startDragHandle}
        >
          <SvgIcon>
            <path
              d="
            M 1,6
            L 14,6
            L 14,19
            L 1,19
            L 1,6
            M 1,11
            L 14,11
          "
              stroke="#000"
              strokeWidth="1"
              fill="#fff"
            ></path>
          </SvgIcon>
          <NodeText>
            <div style={{ marginLeft: "-8px" }}>{entity?.name}</div>
          </NodeText>
        </TreeNodeLabel>
      }
    >
      {entity?.columns?.length && (
        <TreeItem
          nodeId={entity?.uuid + "columns"}
          label={
            <TreeNodeLabel
              action={
                <IconButton size="small" onClick={handlePlusColumn}>
                  <AddOutlinedIcon fontSize="small" />
                </IconButton>
              }
            >
              <NodeText>{intl.get("properties")}</NodeText>
            </TreeNodeLabel>
          }
        >
          {entity?.columns.map((column) => {
            return <ColumnNode key={column.uuid} column={column} />;
          })}
        </TreeItem>
      )}
      {(sourceRelations.length > 0 || targetRelations.length > 0) && (
        <TreeItem
          nodeId={(entity?.uuid || "") + "relations"}
          label={
            <TreeNodeLabel>
              <NodeText>{intl.get("relations")}</NodeText>
            </TreeNodeLabel>
          }
        >
          {sourceRelations.map((relation) => {
            return (
              <RelationNode key={relation.uuid} relation={relation} isSource />
            );
          })}
          {targetRelations.map((relation) => {
            return (
              <RelationNode
                key={relation.uuid}
                relation={relation}
                isSource={false}
              />
            );
          })}
        </TreeItem>
      )}
      {/* {inherits.length > 0 && (
        <TreeItem
          nodeId={entityStore.uuid + "inherit"}
          label={
            <TreeNodeLabel>
              <NodeText>{intl.get("parent-entity")}</NodeText>
            </TreeNodeLabel>
          }
        >
          {inherits.map((relation) => {
            return (
              <RelationNode
                key={relation.uuid}
                relation={relation}
                isSource
                entityStore={entityStore}
              />
            );
          })}
        </TreeItem>
      )} */}
    </TreeItem>
  );
});
