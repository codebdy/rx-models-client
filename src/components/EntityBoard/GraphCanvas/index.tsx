import React, { memo, useEffect } from "react";
import { useExplorerScrollbarHide } from "./useExplorerScrollbarHide";
import { useEdgeLineDraw } from "./useEdgeLineDraw";
import { useEdgeChange } from "./useEdgeChange";
import { Graph } from "@antv/x6";
import { Box } from "@mui/material";
import { getGraphConfig } from "./getGraphConfig";
import { useNodesShow } from "./useNodesShow";
import { useNodeAdd } from "./useNodeAdd";

export const GraphCanvas = memo(
  (props: { graph?: Graph; onSetGraph: (graph?: Graph) => void }) => {
    const { graph, onSetGraph } = props;
    useEffect(() => {
      const config = getGraphConfig();
      const aGraph = new Graph(config as any);
      onSetGraph(aGraph);
      return () => {
        aGraph?.dispose();
        onSetGraph(undefined);
      };
    }, [onSetGraph]);

    useExplorerScrollbarHide();
    // useNodeSelect();
    // useEdgeSelect();
    useNodesShow(graph);
    useEdgeLineDraw(graph);
    // useEdgesShow();
    // useNodeChange();
    useEdgeChange(graph);
    useNodeAdd(graph);

    return (
      <Box
        id="container"
        sx={{
          display: "flex",
          flex: 1,
          flexFlow: "column",
          overflow: "auto",
        }}
      ></Box>
    );
  }
);
