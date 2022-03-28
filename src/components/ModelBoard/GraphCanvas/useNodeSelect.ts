import { useCallback, useEffect } from "react";
import { Graph, Node } from "@antv/x6";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedDiagramState, selectedElementState } from "../recoil/atoms";
import { useGetDiagramNode } from "../hooks/useGetDiagramNode";
import { CONST_CANVAS_CLICK } from "../consts";

export function useNodeSelect(graph: Graph | undefined, serviceId: number) {
  const [selectedElement, setSelectedElement] =
    useRecoilState(selectedElementState(serviceId));
  const selectedDiagram = useRecoilValue(selectedDiagramState(serviceId));
  const getDiagramNode = useGetDiagramNode(serviceId);

  useEffect(() => {
    if (selectedElement) {
      graph?.cleanSelection();
      graph?.select(graph?.getCellById(selectedElement));
    }
  }, [graph, selectedElement]);

  const handleNodeSelected = useCallback(
    (arg: { node: Node<Node.Properties> }) => {
      setSelectedElement(arg.node.id);
    },
    [setSelectedElement]
  );

  const handleNodeUnselected = useCallback(() => {
    if (
      selectedElement &&
      selectedDiagram &&
      getDiagramNode(selectedElement, selectedDiagram)
    ) {
      const clickEnvent = new CustomEvent(CONST_CANVAS_CLICK);
      document.dispatchEvent(clickEnvent);
      setSelectedElement(undefined);
    }
  }, [getDiagramNode, selectedDiagram, selectedElement, setSelectedElement]);

  useEffect(() => {
    graph?.on("node:click", handleNodeSelected);
    graph?.on("node:selected", handleNodeSelected);
    graph?.on("node:unselected", handleNodeUnselected);
    graph?.on("blank:mouseup", handleNodeUnselected);
    return () => {
      graph?.off("node:click", handleNodeSelected);
      graph?.off("node:selected", handleNodeSelected);
      graph?.off("node:unselected", handleNodeUnselected);
      graph?.off("blank:mouseup", handleNodeUnselected);
    };
  }, [graph, handleNodeSelected, handleNodeUnselected]);
}
