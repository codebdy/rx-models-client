import React, { useCallback, useEffect } from "react";
import { LineAction } from "../recoil/LineAction";
import { Edge, Graph, Node } from "@antv/x6";
import { getRelationGraphAttrs } from "./getRelationGraphAttrs";
import { createId } from "util/createId";
import { seedId } from "util/seed-id";
import { RelationType } from "../meta/RelationMeta";
import { StereoType } from "../meta/ClassMeta";
import {
  drawingLineState,
  pressedLineTypeState,
  relationsState,
  selectedDiagramState,
  x6EdgesState,
} from "../recoil/atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useGetClass } from "../hooks/useGetClass";
import { useBackupSnapshot } from "../hooks/useBackupSnapshot";
import { useCreateRelationInnerId } from "../hooks/useCreateRelationInnerId";
import { useTheme } from "@mui/material";

export function useEdgeLineDraw(graph: Graph | undefined, serviceId: number) {
  const [drawingLine, setDrawingLine] = useRecoilState(
    drawingLineState(serviceId)
  );
  const selectedDiagram = useRecoilValue(selectedDiagramState(serviceId));
  const [relations, setRelations] = useRecoilState(relationsState(serviceId));
  const setEdges = useSetRecoilState(x6EdgesState(serviceId));
  const getEntity = useGetClass(serviceId);
  const backupSnapshot = useBackupSnapshot(serviceId);
  const [pressedLineType, setPressedLineType] = useRecoilState(
    pressedLineTypeState(serviceId)
  );
  const theme = useTheme();
  const createRelationInnerId = useCreateRelationInnerId(serviceId);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const p = graph?.clientToLocal({ x: clientX, y: clientY });
      const tempEdge = graph?.getCellById(drawingLine?.tempEdgeId || "") as
        | Edge
        | undefined;
      if (tempEdge) {
        tempEdge.setTarget(p as any);
      }
    },
    [drawingLine?.tempEdgeId, graph]
  );

  const addVertex = useCallback(
    (p: { x: number; y: number }) => {
      const tempEdge = graph?.getCellById(drawingLine?.tempEdgeId || "") as
        | Edge
        | undefined;
      if (tempEdge) {
        tempEdge?.appendVertex(p);
      }
    },
    [drawingLine?.tempEdgeId, graph]
  );

  const handleEdgeMouseUp = useCallback(
    (arg: { x: number; y: number; edge: Edge }) => {
      const { edge, x, y } = arg;
      const [targetNode] = graph?.getNodesFromPoint(x, y) || [];

      if (!selectedDiagram) {
        return;
      }

      if (drawingLine && targetNode && drawingLine?.tempEdgeId) {
        const relationId = createId();
        const source = getEntity(drawingLine.sourceNodeId);
        const target = getEntity(targetNode.id);
        const isInherit = drawingLine.relationType === RelationType.INHERIT;

        if (!source || !target) {
          return;
        }

        //只能从接口继承
        if (
          (target.stereoType === StereoType.Enum ||
            target.stereoType === StereoType.Entity) &&
          isInherit
        ) {
          return;
        }

        //不能自身继承
        if (isInherit && source.uuid === target.uuid) {
          return;
        }

        //继承不能重复
        for (const relation of relations) {
          if (
            relation.targetId === target.uuid &&
            relation.sourceId === source.uuid &&
            relation.relationType === RelationType.INHERIT &&
            isInherit
          ) {
            return;
          }
        }

        let ownerId = source.uuid;
        if (drawingLine.relationType === RelationType.TWO_WAY_AGGREGATION) {
          ownerId = target.uuid;
        }

        backupSnapshot();
        setRelations((relations) => [
          ...relations,
          {
            uuid: relationId,
            innerId:
              drawingLine.relationType !== RelationType.INHERIT
                ? createRelationInnerId()
                : 0,
            relationType: drawingLine.relationType,
            sourceId: source.uuid,
            targetId: target.uuid,
            roleOfTarget: isInherit
              ? undefined
              : target.name.toLowerCase() + seedId(),
            roleOfSource: isInherit
              ? undefined
              : source.name.toLowerCase() + seedId(),
            ownerId: ownerId,
          },
        ]);

        const tempEdge = graph?.getCellById(drawingLine?.tempEdgeId || "") as
          | Edge
          | undefined;
        setEdges((edges) => [
          ...edges,
          {
            id: relationId,
            vertices: tempEdge?.getVertices(),
            diagramUuid: selectedDiagram,
          },
        ]);
        tempEdge?.remove();
        setPressedLineType(undefined);
        setDrawingLine(undefined);
        return;
      }
      if (edge?.id === drawingLine?.tempEdgeId) {
        addVertex({ x, y });
      }
    },
    [
      addVertex,
      backupSnapshot,
      createRelationInnerId,
      drawingLine,
      getEntity,
      graph,
      relations,
      selectedDiagram,
      setDrawingLine,
      setEdges,
      setPressedLineType,
      setRelations,
    ]
  );

  const handleEdgeDbclick = useCallback(
    (arg: { edge: Edge }) => {
      if (arg.edge?.id === drawingLine?.tempEdgeId) {
        setPressedLineType(undefined);
        setDrawingLine(undefined);
        arg.edge.remove();
      }
    },
    [drawingLine?.tempEdgeId, setDrawingLine, setPressedLineType]
  );

  //创建临时线条
  const handleNodeClick = useCallback(
    (arg: { e: React.MouseEvent; node: Node<Node.Properties> }) => {
      const { e, node } = arg;
      if (!pressedLineType) {
        return;
      }

      //已经有继承关系了
      //if (pressedLineType === RelationType.IMPLEMENTS && getParentUuid(node.id)) {
      //  return;
      //}

      const p = graph?.clientToLocal({ x: e.clientX, y: e.clientY });
      const lineAction: LineAction = {
        sourceNodeId: node.id,
        relationType: pressedLineType,
        tempEdgeId: graph?.addEdge({
          source: node.id,
          target: p,
          connector: { name: "rounded" },
          attrs: getRelationGraphAttrs(theme, pressedLineType),
        }).id,
      };
      setDrawingLine(lineAction);
    },
    [graph, pressedLineType, setDrawingLine, theme]
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    graph?.on("node:click", handleNodeClick);
    graph?.on("edge:mouseup", handleEdgeMouseUp);
    graph?.on("edge:dblclick", handleEdgeDbclick);
    return () => {
      graph?.off("node:click", handleNodeClick);
      graph?.off("edge:mouseup", handleEdgeMouseUp);
      graph?.off("edge:dblclick", handleEdgeDbclick);
    };
  }, [graph, handleEdgeDbclick, handleEdgeMouseUp, handleNodeClick]);
}
