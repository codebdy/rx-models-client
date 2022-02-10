import { Edge, Graph } from "@antv/x6";
import { useEffect } from "react";
import { getRelationGraphAttrs } from "./getRelationGraphAttrs";
import _ from "lodash";
import {
  ROLE_SOURCE_POSITION_CONST,
  ROLE_SOURCE_TARGET_CONST,
} from "./constLabelPosition";
import { RelationType } from "../meta/relation-meta";
import { useRecoilValue } from "recoil";
import { selectedDiagramState } from "../recoil/atoms";
import { useDiagramEdges } from "../hooks/useDiagramEdges";

export function useEdgesShow(graph?: Graph) {
  const selectedDiagram = useRecoilValue(selectedDiagramState);

  const edges = useDiagramEdges(selectedDiagram || "");

  useEffect(() => {
    edges?.forEach((edgeMeta) => {
      let grahpEdge = graph?.getCellById(edgeMeta.id) as
        | Edge<Edge.Properties>
        | undefined;
      if (grahpEdge) {
        if (
          !_.isEqual(grahpEdge.getVertices(), edgeMeta.vertices) &&
          edgeMeta.vertices
        ) {
          grahpEdge.setVertices(edgeMeta.vertices);
        }

        if (grahpEdge.data.relationType !== edgeMeta.relationType) {
          grahpEdge.setData({ relationType: edgeMeta.relationType });
          grahpEdge.setAttrs(getRelationGraphAttrs(edgeMeta.relationType));
        }
      } else {
        grahpEdge = graph?.addEdge({
          id: edgeMeta.id,
          source: edgeMeta.sourceId,
          target: edgeMeta.targetId,
          vertices: edgeMeta.vertices,
          connector: { name: "rounded" },
          //解决直连时，不能显示选中状态的bug
          tools:
            selectedElement === edgeMeta.id
              ? ["boundary", "vertices", "segments"]
              : [],
          attrs: getRelationGraphAttrs(edgeMeta.relationType),
          data: { relationType: edgeMeta.relationType },
        });
      }

      //如果是跟自己连接，那么需要增加2个中间点
      if (
        edgeMeta.sourceId === edgeMeta.targetId &&
        (!edgeMeta.vertices || edgeMeta.vertices?.length === 0)
      ) {
        grahpEdge?.appendVertex({
          x: grahpEdge?.getTargetPoint().x + 200,
          y: grahpEdge?.getTargetPoint().y - 150,
        });
        grahpEdge?.appendVertex({
          x: grahpEdge?.getTargetPoint().x + 200,
          y: grahpEdge?.getTargetPoint().y,
        });
      }

      if (edgeMeta.relationType !== RelationType.INHERIT) {
        grahpEdge?.setLabels([
          {
            attrs: {
              text: {
                text: edgeMeta.roleOnSource,
              },
            },
            position:
              edgeMeta.roleOnSourcePosition || ROLE_SOURCE_POSITION_CONST,
          },
          {
            attrs: {
              text: {
                text: edgeMeta.roleOnTarget,
              },
            },
            position: edgeMeta.roleOnTargetPosition || ROLE_SOURCE_TARGET_CONST,
          },
        ]);
      }
    });

    graph?.getEdges().forEach((edge) => {
      if (
        !edges?.find((aEdge) => aEdge.id === edge.id) &&
        edge.id !== drawingLine?.tempEdge?.id
      ) {
        graph?.removeEdge(edge.id);
      }
    });
  }, [edges, graph]);
}
