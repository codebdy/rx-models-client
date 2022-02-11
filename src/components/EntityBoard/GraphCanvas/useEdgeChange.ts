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
  ROLE_SOURCE_POSITION_CONST,
  ROLE_SOURCE_TARGET_CONST,
} from "./constLabelPosition";
import { useBackupSnapshot } from "../hooks/useBackupSnapshot";

export function useEdgeChange(graph?: Graph) {
  const selectedDiagram = useRecoilValue(selectedDiagramState);
  const drawingLine = useRecoilValue(drawingLineState);
  const setEdges = useSetRecoilState(x6EdgesState);
  const getEdge = useGetEdge();
  const backupSnapshot = useBackupSnapshot();

  const handleEdgeChange = useCallback(
    (arg: { edge: Edge<Edge.Properties> }) => {
      const { edge } = arg;
      if (!selectedDiagram || !edge?.id) {
        return;
      }

      if (edge.id === drawingLine?.tempEdgeId) {
        return;
      }

      const edageData = getEdge(edge.id);

      const [roleOnSource, roleOnTarget] = edge.getLabels();

      //##代码可能有问题
      if(!edageData){
        return;
      }

      //如果是没有修改过的并且是新建的线
      if (
        !edageData &&
        edge.getVertices().length === 0 &&
        (!roleOnSource?.position ||
          _.isEqual(roleOnSource?.position, ROLE_SOURCE_POSITION_CONST)) &&
        (!roleOnTarget?.position ||
          _.isEqual(roleOnTarget?.position, ROLE_SOURCE_TARGET_CONST))
      ) {
        return;
      }

      //需要判断是否有修改
      if (
        _.isEqual(edageData?.vertices, edge.getVertices()) &&
        _.isEqual(edageData?.roleOnSourcePosition, roleOnSource?.position) &&
        _.isEqual(edageData?.roleOnTargetPosition, roleOnTarget?.position)
      ) {
        return;
      }

      backupSnapshot();
      setEdges((edages) => [
        ...edages.filter((edage) => edage.id !== edageData?.id),
        {
          id: edge.id,
          vertices: edge.getVertices(),
          roleOnSourcePosition: roleOnSource?.position as any,
          roleOnTargetPosition: roleOnTarget?.position as any,
          diagramUuid: edageData?.diagramUuid,
        },
      ]);
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
    //由于拿不到mouseup事件，使用mouseleave代替
    graph?.on("edge:mouseup", handleEdgeChange);
    return () => {
      graph?.off("edge:mouseup", handleEdgeChange);
    };
  }, [graph, handleEdgeChange]);
}
