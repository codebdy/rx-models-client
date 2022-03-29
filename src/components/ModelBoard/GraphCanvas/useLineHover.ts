import { Graph } from "@antv/x6";
import { useCallback, useEffect } from "react";
export const HOVER_COLOR = "rgba(115,103,240,0.3)";

export function useLineHover(graph?: Graph) {

  const handleEdgeMouseEnter = useCallback(
    ({ edge }) => {
      if(edge){
        edge.attr({
          line: {
            strokeWidth: 2,
          },
        })
      }
    },
    []
  );

  const handleEdgeMouseLeave = useCallback(
    ({ edge }) => {
      if(edge){
        edge.attr({
          outline: {
            stroke: 'rgba(0,0,0,0)',
          },
          line: {
            strokeWidth: 1,
          },
        })
      }
    },
    []
  );

  useEffect(() => {
    graph?.on("edge:mouseenter", handleEdgeMouseEnter);
    graph?.on("edge:mouseleave", handleEdgeMouseLeave);
    return () => {
      graph?.off("edge:mouseenter", handleEdgeMouseEnter);
      graph?.off("edge:mouseleave", handleEdgeMouseLeave);
    };
  }, [graph, handleEdgeMouseEnter, handleEdgeMouseLeave]);
}
