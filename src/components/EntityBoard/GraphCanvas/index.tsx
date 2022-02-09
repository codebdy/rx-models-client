import React, { memo } from "react";
import { useExplorerScrollbarHide } from "./useExplorerScrollbarHide";
import { useEdgeLineDraw } from "./useEdgeLineDraw";
import { useEdgeChange } from "./useEdgeChange";
import { Graph } from "@antv/x6";

export const GraphCanvas = memo((props: { graph?: Graph }) => {
  const { graph } = props;
  useExplorerScrollbarHide();
  // useNodeSelect();
  // useEdgeSelect();
  // useNodesShow();
  useEdgeLineDraw(graph);
  // useEdgesShow();
  // useNodeChange();
  useEdgeChange(graph);
  // useNodeAdd();

  return <></>;
});
