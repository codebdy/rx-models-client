import { Edge, Graph } from "@antv/x6";
import { useCallback, useEffect } from "react";
import _ from "lodash";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  drawingLineState,
  selectedDiagramState,
  x6EdgesState,
} from "../recoil/atoms";
import { useGetEdge } from "../hooks/useGetEdge";
import {
  MULTI_SOURCE_POSITION_CONST,
  MULTI_SOURCE_TARGET_CONST,
  ROLE_SOURCE_POSITION_CONST,
  ROLE_SOURCE_TARGET_CONST,
} from "./constLabelPosition";
import { useBackupSnapshot } from "../hooks/useBackupSnapshot";

export function useEdgeChange(graph: Graph | undefined, serviceId: number) {
  const selectedDiagram = useRecoilValue(selectedDiagramState(serviceId));
  const drawingLine = useRecoilValue(drawingLineState(serviceId));
  const setEdges = useSetRecoilState(x6EdgesState(serviceId));
  const getEdge = useGetEdge(serviceId);
  const backupSnapshot = useBackupSnapshot(serviceId);

  const handleEdgeChange = useCallback(
    (arg: { edge: Edge<Edge.Properties> }) => {
      const { edge } = arg;
      if (!selectedDiagram || !edge?.id) {
        return;
      }

      if (edge.id === drawingLine?.tempEdgeId) {
        return;
      }

      const edageData = getEdge(edge.id, selectedDiagram);

      const [
        roleOnSource,
        sourceMultiplicity,
        roleOnTarget,
        targetMultiplicity,
      ] = edge.getLabels();

      if (!edageData) {
        console.log("edageData没找到");
        return;
      }

      //如果是没有修改过的并且是新建的线
      if (
        !edageData &&
        edge.getVertices().length === 0 &&
        (!roleOnSource?.position ||
          _.isEqual(roleOnSource?.position, ROLE_SOURCE_POSITION_CONST)) &&
        (!sourceMultiplicity?.position ||
          _.isEqual(sourceMultiplicity?.position, MULTI_SOURCE_POSITION_CONST)) &&
        (!roleOnTarget?.position ||
          _.isEqual(roleOnTarget?.position, ROLE_SOURCE_TARGET_CONST)) &&
        (!targetMultiplicity?.position ||
          _.isEqual(targetMultiplicity?.position, MULTI_SOURCE_TARGET_CONST))
      ) {
        return;
      }

      //需要判断是否有修改
      if (
        _.isEqual(edageData?.vertices, edge.getVertices()) &&
        _.isEqual(edageData?.roleOnSourcePosition, roleOnSource?.position) &&
        _.isEqual(edageData?.sourceMultiplicityPosition, sourceMultiplicity?.position) &&
        _.isEqual(edageData?.roleOnTargetPosition, roleOnTarget?.position) &&
        _.isEqual(edageData?.targetMultiplicityPosition, targetMultiplicity?.position)
      ) {
        return;
      }

      backupSnapshot();
      setEdges((edages) =>
        edages.map((eg) =>
          eg.id === edageData?.id && eg.diagramUuid === edageData?.diagramUuid
            ? {
                id: edge.id,
                vertices: edge.getVertices(),
                roleOnSourcePosition: roleOnSource?.position as any,
                sourceMultiplicityPosition: sourceMultiplicity?.position as any,
                roleOnTargetPosition: roleOnTarget?.position as any,
                targetMultiplicityPosition: targetMultiplicity?.position as any,
                diagramUuid: edageData?.diagramUuid,
              }
            : eg
        )
      );
    },
    [
      backupSnapshot,
      drawingLine?.tempEdgeId,
      getEdge,
      selectedDiagram,
      setEdges,
    ]
  );

  useEffect(() => {
    graph?.on("edge:mouseup", handleEdgeChange);
    return () => {
      graph?.off("edge:mouseup", handleEdgeChange);
    };
  }, [graph, handleEdgeChange]);
}
