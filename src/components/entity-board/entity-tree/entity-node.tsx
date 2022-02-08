import React, { memo } from "react";
import { IconButton, SvgIcon } from "@mui/material";
import { TreeItem } from "@mui/lab";
import MdiIcon from "components/common/mdi-icon";
import { NodeText } from "./node-text";
import { ColumnNode } from "./column-node";
import { TreeNodeLabel } from "./tree-node-label";
import intl from "react-intl-universal";
import { RelationNode } from "./relation-node";
import { Addon } from "@antv/x6";
import { useEntity } from "../recoil/hooks/useEntity";
import { useSourceRelations } from "../recoil/hooks/useSourceRelations";
import { useTargetRelations } from "../recoil/hooks/useTargetRelations";
const { Dnd } = Addon;

export const EntityNode = memo((props: { uuid: string }) => {
  const { uuid } = props;
  const [dnd, setDnd] = React.useState<any>();
  const entity = useEntity(uuid);
  const sourceRelations = useSourceRelations(uuid);
  const targetRelations = useTargetRelations(uuid);
  // useEffect(() => {
  //   const theDnd = bordStore.graph
  //     ? new Dnd({
  //         target: bordStore.graph,
  //         scaled: false,
  //         animation: true,
  //       })
  //     : undefined;
  //   setDnd(theDnd);
  // }, [bordStore.graph]);

  const startDragHandle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // if (!bordStore.graph) {
    //   return;
    // }
    // const node = bordStore.graph.createNode({
    //   ...NODE_INIT_SIZE,
    //   height: 70 + entityStore.columns.length * 26,
    //   isTempForDrag: true,
    //   shape: "react-shape",
    //   component: <EntityView />,
    //   data: { ...entityStore.toMeta(), isTempForDrag: true },
    // });
    // dnd?.start(node, e.nativeEvent as any);
  };

  const handleClick = (event: React.MouseEvent) => {
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

  const handleDelete = () => {
    // const command = new EntityDeleteCommand(entityStore);
    // bordStore.excuteCommand(command);
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
              <MdiIcon className="mdi-trash-can-outline" size="16" />
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
                  <MdiIcon className="mdi-plus" size="16" />
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
          nodeId={entity?.uuid || "" + "relations"}
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
