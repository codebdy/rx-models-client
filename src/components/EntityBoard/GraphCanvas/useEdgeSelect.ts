import { useCallback, useEffect } from "react";
import { Edge, Graph } from "@antv/x6";
import { useRecoilState, useRecoilValue } from "recoil";
import { drawingLineState, selectedElementState } from "../recoil/atoms";
import { useSelectedRelation } from "../hooks/useSelectedRelation";

export function useEdgeSelect(graph?: Graph) {
  const drawingLine = useRecoilValue(drawingLineState);
  const [selectedElement, setSelectedElement] =
    useRecoilState(selectedElementState);
  const selectedRelation = useSelectedRelation();

  useEffect(() => {
    if (selectedRelation) {
      const edge = graph?.getCellById(selectedElement || "") as
        | Edge
        | undefined;
      edge?.addTools(["vertices", "boundary", "segments"]);
    }
    graph?.getEdges().forEach((edge) => {
      if (selectedElement !== edge.id) {
        edge.removeTools(["boundary", "vertices", "segments"]);
      }
    });
  }, [graph, selectedElement, selectedRelation]);

  const handleBlankClick = useCallback(() => {
    setSelectedElement(undefined);
  }, [setSelectedElement]);

  const handleEdgeClick = useCallback(
    (arg: { edge: Edge<Edge.Properties> }) => {
      const { edge } = arg;
      if (edge && edge.id !== drawingLine?.tempEdge?.id) {
        setSelectedElement(edge.id);
      }
    },
    [drawingLine?.tempEdge?.id, setSelectedElement]
  );

  useEffect(() => {
    graph?.on("blank:click", handleBlankClick);
    graph?.on("edge:click", handleEdgeClick);
    return () => {
      graph?.off("blank:click", handleBlankClick);
      graph?.off("edge:click", handleEdgeClick);
    };
  }, [graph, handleBlankClick, handleEdgeClick]);
}
