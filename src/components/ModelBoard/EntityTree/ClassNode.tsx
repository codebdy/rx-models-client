import React, { memo, useCallback, useEffect } from "react";
import { IconButton, SvgIcon, useTheme } from "@mui/material";
import { TreeItem } from "@mui/lab";
import { NodeText } from "./NodeText";
import { AttributeNode } from "./AttributeNode";
import { TreeNodeLabel } from "./TreeNodeLabel";
import intl from "react-intl-universal";
import { RelationNode } from "./RelationNode";
import { Addon, Graph } from "@antv/x6";
import { useClass } from "../hooks/useClass";
import { useSourceRelations } from "../hooks/useSourceRelations";
import { useTargetRelations } from "../hooks/useTargetRelations";
import { useSetRecoilState } from "recoil";
import { selectedElementState } from "../recoil/atoms";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { ClassView } from "../GraphCanvas/ClassView";
import { NODE_INIT_SIZE } from "../GraphCanvas/nodeInitSize";
import { useDeleteClass } from "../hooks/useDeleteClass";
import { useCreateClassAttribute } from "../hooks/useCreateClassAttribute";
import { useServiceId } from "../hooks/useServiceId";
const { Dnd } = Addon;

export const ClassNode = memo((props: { uuid: string; graph?: Graph }) => {
  const { uuid, graph } = props;
  const [dnd, setDnd] = React.useState<any>();
  const serviceId = useServiceId();
  const setSelectedElement = useSetRecoilState(selectedElementState(serviceId));
  const cls = useClass(uuid, serviceId);
  const sourceRelations = useSourceRelations(uuid, serviceId);
  const targetRelations = useTargetRelations(uuid, serviceId);
  const deleteEntity = useDeleteClass(serviceId);
  const createAttribute = useCreateClassAttribute(serviceId);
  const theme = useTheme();
  //解决不能拖放的bug
  const ref = useCallback((elt: Element) => {
    elt?.addEventListener("focusin", (e) => {
      // Disable Treeview focus system which make draggable on TreeIten unusable
      // see https://github.com/mui-org/material-ui/issues/29518
      e.stopImmediatePropagation();
    });
  }, []);

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

  const startDragHandle = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!graph) {
        return;
      }
      const node = graph.createNode({
        ...NODE_INIT_SIZE,
        height: 70 + (cls?.attributes.length || 0) * 26,
        isTempForDrag: true,
        shape: "react-shape",
        component: <ClassView />,
        data: { ...cls, isTempForDrag: true },
      });
      dnd?.start(node, e.nativeEvent as any);
    },
    [dnd, cls, graph]
  );

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      setSelectedElement(uuid);
      event.stopPropagation();
    },
    [setSelectedElement, uuid]
  );
  // const allScouceRelation = entityStore.getSourceRelations();
  // const sourceRelations = allScouceRelation.filter(
  //   (relation) => relation.relationType !== RelationType.INHERIT
  // );
  // const targetRelations = entityStore
  //   .getTargetRelations()
  //   .filter((relation) => relation.relationType !== RelationType.INHERIT);

  const handleDelete = useCallback(
    (event: React.MouseEvent) => {
      deleteEntity(uuid);
      event.stopPropagation();
    },
    [deleteEntity, uuid]
  );

  const handlePlusColumn = useCallback(
    (event: React.MouseEvent) => {
      if (cls) {
        createAttribute(cls);
      }
      event.stopPropagation();
    },
    [createAttribute, cls]
  );

  // const inherits = allScouceRelation.filter(
  //   (relation) => relation.relationType === RelationType.INHERIT
  // );

  return (
    <TreeItem
      nodeId={uuid}
      ref={ref}
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
              stroke={theme.palette.text.primary}
              strokeWidth="1"
              fill="transparent"
            ></path>
          </SvgIcon>
          <NodeText>
            <div style={{ marginLeft: "-8px" }}>{cls?.name}</div>
          </NodeText>
        </TreeNodeLabel>
      }
    >
      {cls?.attributes?.length && (
        <TreeItem
          nodeId={cls?.uuid + "columns"}
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
          {cls?.attributes.map((column) => {
            return <AttributeNode key={column.uuid} attribute={column} />;
          })}
        </TreeItem>
      )}
      {(sourceRelations.length > 0 || targetRelations.length > 0) && (
        <TreeItem
          nodeId={(cls?.uuid || "") + "relations"}
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
          nodeId={entityStore.uuid + "implements"}
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
