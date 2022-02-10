import { useEntityBoardStore } from "../store/helper";
import "@antv/x6-react-shape";
import { Graph, Node } from "@antv/x6";
import { useEffect } from "react";
import { EntityView } from "./EntityView";
import _ from "lodash";
import { ColumnStore } from "../store/column";
import { EntityHideCommand } from "../command/entity-hide-command";
import { ColumnDeleteCommand } from "../command/column-delete-command";
import { ColumnCreateCommand } from "../command/column-create-command";
import { createId } from "util/creat-id";

export function useNodesShow(graph?: Graph) {
  const modelStore = useEntityBoardStore();
  const nodes = modelStore.openedDiagram?.getNodes(
    modelStore.selectedElement instanceof ColumnStore
      ? modelStore.selectedElement?.uuid
      : undefined,
    !!modelStore.pressedLineType
  );

  const handleColumnSelect = (entityId: string, columnId: string) => {
    const entity = modelStore.getEntityById(entityId);
    modelStore.setSelectedElement(
      entity?.columns.find((column) => column.uuid === columnId)
    );
  };

  const handleColumnDelete = (entityId: string, columnId: string) => {
    const entity = modelStore.getEntityById(entityId);
    const columnStore = entity?.getColumnById(columnId);
    if (entity && columnStore) {
      const command = new ColumnDeleteCommand(columnStore);
      modelStore.excuteCommand(command);
    }
  };

  const handleColumnCreate = (entityId: string) => {
    const entity = modelStore.getEntityById(entityId);
    if (entity) {
      const command = new ColumnCreateCommand(entity, createId());
      modelStore.excuteCommand(command);
    }
  };

  const handleHideEntity = (entityId: string) => {
    if (!modelStore.openedDiagram) {
      return;
    }

    const entityStore = modelStore.getEntityById(entityId);
    const nodeMeta = modelStore.openedDiagram.getNodeById(entityId);
    if (!entityStore || !nodeMeta) {
      return;
    }
    const command = new EntityHideCommand(
      modelStore.openedDiagram,
      nodeMeta,
      entityStore
    );

    modelStore.excuteCommand(command);
  };

  useEffect(() => {
    nodes?.forEach((node) => {
      const grahpNode = modelStore.graph?.getCellById(
        node.id
      ) as Node<Node.Properties>;
      if (grahpNode) {
        //Update by diff
        if (!_.isEqual(node.data, grahpNode.data)) {
          grahpNode.removeData();
          grahpNode.setData(node.data);
        }
        if (
          node.x !== grahpNode.getPosition().x ||
          node.y !== grahpNode.getPosition().y ||
          node.width !== grahpNode.getSize().width ||
          node.height !== grahpNode.getSize().height
        ) {
          grahpNode.setSize(node as any);
          grahpNode.setPosition(node as any);
        }
      } else {
        modelStore.graph?.addNode({
          ...node,
          shape: "react-shape",
          component: (
            <EntityView
              onColumnSelect={handleColumnSelect}
              onColumnDelete={handleColumnDelete}
              onColumnCreate={handleColumnCreate}
              onHide={handleHideEntity}
            />
          ),
        });
      }
    });
    modelStore.graph?.getNodes().forEach((node) => {
      //如果diagram上没有
      if (!modelStore.openedDiagram?.getNodeById(node.id)) {
        modelStore.graph?.removeNode(node.id);
      }
      //如果实体已被删除
      //if(!modelStore.getEntityById(node.id)){
      //  modelStore.graph?.removeNode(node.id);
      //}
    });
  });
}
