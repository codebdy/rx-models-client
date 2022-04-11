import { Edge, Graph } from "@antv/x6";
import { useEffect } from "react";
import { getRelationGraphAttrs } from "./getRelationGraphAttrs";
import _ from "lodash";
import {
  MULTI_SOURCE_POSITION_CONST,
  MULTI_SOURCE_TARGET_CONST,
  ROLE_SOURCE_POSITION_CONST,
  ROLE_SOURCE_TARGET_CONST,
} from "./constLabelPosition";
import { RelationType } from "../meta/RelationMeta";
import { useRecoilValue } from "recoil";
import {
  drawingLineState,
  selectedDiagramState,
  selectedElementState,
} from "../recoil/atoms";
import { useDiagramEdges } from "../hooks/useDiagramEdges";
import { useTheme } from "@mui/material";

export function useEdgesShow(graph: Graph | undefined, serviceId: number) {
  const selectedDiagram = useRecoilValue(selectedDiagramState(serviceId));
  const selectedElement = useRecoilValue(selectedElementState(serviceId));
  const drawingLine = useRecoilValue(drawingLineState(serviceId));
  const theme = useTheme();

  const edges = useDiagramEdges(selectedDiagram || "", serviceId);

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
          grahpEdge.setAttrs(
            getRelationGraphAttrs(theme, edgeMeta.relationType)
          );
        }
      } else {
        grahpEdge = graph?.addEdge({
          id: edgeMeta.id,
          source: edgeMeta.sourceId,
          target: edgeMeta.targetId,
          vertices: edgeMeta.vertices,
          args: {
            stopPropagation: false,
          },
          //connector: { name: "rounded" },
          //解决直连时，不能显示选中状态的bug
          tools:
            selectedElement === edgeMeta.id
              ? [
                  "boundary",
                  {
                    name: "vertices",
                    args: {
                      stopPropagation: false,
                    },
                  },
                  {
                    name: "segments",
                    args: {
                      stopPropagation: false,
                    },
                  },
                ]
              : [],
          attrs: getRelationGraphAttrs(theme, edgeMeta.relationType),
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
                text: edgeMeta.roleOfSource||"",
                fill: theme.palette.text.primary,
              },
              rect: {
                fill: "transparent",
              },
            },
            position:
              edgeMeta.roleOnSourcePosition || ROLE_SOURCE_POSITION_CONST,
          },
          {
            attrs: {
              text: {
                text: edgeMeta.sourceMutiplicity,
                fill: theme.palette.text.primary,
              },
              rect: {
                fill: "transparent",
              },
            },
            position:
              edgeMeta.sourceMultiplicityPosition || MULTI_SOURCE_POSITION_CONST,
          },
          {
            attrs: {
              text: {
                text: edgeMeta.roleOfTarget,
                fill: theme.palette.text.primary,
              },
              rect: {
                fill: "transparent",
              },
            },
            position: edgeMeta.roleOnTargetPosition || ROLE_SOURCE_TARGET_CONST,
          },
          {
            attrs: {
              text: {
                text: edgeMeta.targetMultiplicity,
                fill: theme.palette.text.primary,
              },
              rect: {
                fill: "transparent",
              },
            },
            position: edgeMeta.targetMultiplicityPosition || MULTI_SOURCE_TARGET_CONST,
          },
        ]);
      }
    });

    graph?.getEdges().forEach((edge) => {
      if (
        !edges?.find((aEdge) => aEdge.id === edge.id) &&
        edge.id !== drawingLine?.tempEdgeId
      ) {
        graph?.removeEdge(edge.id);
      }
    });
  }, [drawingLine?.tempEdgeId, edges, graph, selectedElement, theme]);
}
