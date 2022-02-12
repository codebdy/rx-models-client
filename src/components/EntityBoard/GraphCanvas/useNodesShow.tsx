import "@antv/x6-react-shape";
import { Graph, Node } from "@antv/x6";
import { useCallback, useEffect, useRef } from "react";
import { EntityView } from "./EntityView";
import _ from "lodash";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  pressedLineTypeState,
  selectedDiagramState,
  selectedElementState,
  x6NodesState,
} from "../recoil/atoms";
import { useDiagramNodes } from "../hooks/useDiagramNodes";
import { useGetEntity } from "../hooks/useGetEntity";
import { useGetDiagramNode } from "../hooks/useGetDiagramNode";
import { useGetNode } from "../hooks/useGetNode";
import { useGetParentUuid } from "./useGetParentUuid";
import { RelationType } from "../meta/RelationMeta";
import { useChangeEntity } from "../hooks/useChangeEntity";
import { useCreateEntityColumn } from "../hooks/useCreateEntityColumn";

export function useNodesShow(graph?: Graph) {
  const selectedDiagram = useRecoilValue(selectedDiagramState);
  const [selectedElement, setSelectedElement] =
    useRecoilState(selectedElementState);
  const setNodes = useSetRecoilState(x6NodesState);
  const nodes = useDiagramNodes(selectedDiagram || "");
  const getEntity = useGetEntity();
  const getNode = useGetNode();
  const getDiagramNode = useGetDiagramNode();
  const pressedLineType = useRecoilValue(pressedLineTypeState);
  const getParentUuid = useGetParentUuid();
  const changeEntity = useChangeEntity();
  const createColumn = useCreateEntityColumn();

  const getEntityRef = useRef(getEntity);
  getEntityRef.current = getEntity;

  const changeEntityRef = useRef(changeEntity);
  changeEntityRef.current = changeEntity;

  const createColumnRef = useRef(createColumn);
  createColumnRef.current = createColumn;

  const handleColumnSelect = useCallback(
    (columnId: string) => {
      setSelectedElement(columnId);
    },
    [setSelectedElement]
  );

  const handleColumnDelete = useCallback(
    (entityId: string, columnId: string) => {
      const entity = getEntityRef.current(entityId);
      if (!entity) {
        console.error("Entity not exist: " + entityId);
        return;
      }
      changeEntityRef.current({
        ...entity,
        columns: entity.columns.filter((ent) => ent.uuid !== columnId),
      });
    },
    []
  );

  const handleColumnCreate = useCallback((entityId: string) => {
    const entity = getEntityRef.current(entityId);
    if (!entity) {
      console.error("Entity not exist: " + entityId);
      return;
    }
    changeEntityRef.current(createColumnRef.current(entity));
  }, []);

  const handleHideEntity = useCallback(
    (entityId: string) => {
      if (!selectedDiagram) {
        return;
      }

      setNodes((nodes) => nodes.filter((node) => node.id !== entityId));
    },
    [selectedDiagram, setNodes]
  );

  useEffect(() => {
    nodes?.forEach((node) => {
      const grahpNode = graph?.getCellById(node.id) as Node<Node.Properties>;
      const entity = getEntity(node.id);
      const data = {
        ...entity,
        ...node,
        selectedId: selectedElement,
        isPressedRelation:
          (pressedLineType !== RelationType.INHERIT && !!pressedLineType) ||
          (pressedLineType === RelationType.INHERIT && !getParentUuid(node.id)),
      };
      if (grahpNode) {
        //Update by diff
        if (!_.isEqual(data, grahpNode.data)) {
          grahpNode.replaceData(data);
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
        graph?.addNode({
          ...node,
          shape: "react-shape",
          data,
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
    graph?.getNodes().forEach((node) => {
      //如果diagram上没有
      if (!getDiagramNode(node.id, selectedDiagram || "")) {
        graph?.removeNode(node.id);
      }
      //如果实体已被删除
      if (!getNode(node.id)) {
        graph?.removeNode(node.id);
      }
    });
  }, [
    getDiagramNode,
    getEntity,
    getNode,
    getParentUuid,
    graph,
    handleColumnCreate,
    handleColumnDelete,
    handleColumnSelect,
    handleHideEntity,
    nodes,
    pressedLineType,
    selectedDiagram,
    selectedElement,
    setSelectedElement,
  ]);
}
