import { Edge, Graph } from "@antv/x6";
import { useCallback, useEffect } from "react";
import _ from "lodash";
import { useRecoilValue } from "recoil";
import { drawingLineState, selectedDiagramState } from "../recoil/atoms";

export function useEdgeChange(graph?: Graph) {
  const selectedDiagram = useRecoilValue(selectedDiagramState);
  const drawingLine = useRecoilValue(drawingLineState);

  const handleEdgeChange = useCallback(
    (arg: { edge: Edge<Edge.Properties> }) => {
      const { edge } = arg;
      if (!selectedDiagram || !edge?.id) {
        return;
      }

      if (edge.id === drawingLine?.tempEdgeId) {
        return;
      }

      // const edageData = modelStore.openedDiagram?.getEdgeById(edge.id);

      const [roleOnSource, roleOnTarget] = edge.getLabels();

      //如果是没有修改过的并且是新建的线
      // if (
      //   !edageData &&
      //   edge.getVertices().length === 0 &&
      //   (!roleOnSource?.position ||
      //     _.isEqual(roleOnSource?.position, ROLE_SOURCE_SOURCE_CONST)) &&
      //   (!roleOnTarget?.position ||
      //     _.isEqual(roleOnTarget?.position, ROLE_SOURCE_TARGET_CONST))
      // ) {
      //   return;
      // }

      //使用mouseleave代替完成事件，需要判断是否有修改
      // if (
      //   _.isEqual(edageData?.vertices, edge.getVertices()) &&
      //   _.isEqual(edageData?.roleOnSourcePosition, roleOnSource?.position) &&
      //   _.isEqual(edageData?.roleOnTargetPosition, roleOnTarget?.position)
      // ) {
      //   return;
      // }

      // const command = new EdgeChangeCommand(
      //   modelStore.openedDiagram,
      //   {
      //     id: edge.id,
      //     vertices: edge.getVertices(),
      //     roleOnSourcePosition: roleOnSource?.position as any,
      //     roleOnTargetPosition: roleOnTarget?.position as any,
      //   },
      //   modelStore.getRelationById(edge.id)
      // );

      // modelStore.excuteCommand(command);
    },
    [drawingLine?.tempEdge?.id, selectedDiagram]
  );

  useEffect(() => {
    //由于拿不到mouseup事件，使用mouseleave代替
    graph?.on("edge:mouseleave", handleEdgeChange);
    return () => {
      graph?.off("edge:mouseleave", handleEdgeChange);
    };
  }, [graph, handleEdgeChange]);
}

function ROLE_SOURCE_SOURCE_CONST(
  position: Edge.LabelPosition | undefined,
  ROLE_SOURCE_SOURCE_CONST: any
) {
  throw new Error("Function not implemented.");
}
