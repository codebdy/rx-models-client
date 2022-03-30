import React, { memo, useEffect } from "react";
import { useExplorerScrollbarHide } from "./useExplorerScrollbarHide";
import { useEdgeLineDraw } from "./useEdgeLineDraw";
import { useEdgeChange } from "./useEdgeChange";
import { Graph } from "@antv/x6";
import { Box, useTheme } from "@mui/material";
import { getGraphConfig } from "./getGraphConfig";
import { useNodesShow } from "./useNodesShow";
import { useNodeAdd } from "./useNodeAdd";
import { useNodeChange } from "./useNodeChange";
import { useNodeSelect } from "./useNodeSelect";
import { useEdgesShow } from "./useEdgesShow";
import { useEdgeSelect } from "./useEdgeSelect";
import { useServiceId } from "../hooks/useServiceId";
import { useTriggerSelectedEvent } from "./useTriggerSelectedEvent";
import { useEdgeHover } from "./useEdgeHover";
import { useTriggerPressedLineTypeEvent } from "./useTriggerPressedLineTypeEvent";

export const GraphCanvas = memo(
  (props: { graph?: Graph; onSetGraph: (graph?: Graph) => void }) => {
    const { graph, onSetGraph } = props;
    const serviceId = useServiceId();
    const theme = useTheme();
    useEffect(() => {
      const config = getGraphConfig(theme);
      const aGraph = new Graph(config as any);
      onSetGraph(aGraph);
      return () => {
        aGraph?.dispose();
        onSetGraph(undefined);
      };
    }, [onSetGraph, theme]);

    useExplorerScrollbarHide();
    useTriggerSelectedEvent(serviceId);
    useTriggerPressedLineTypeEvent(serviceId);
    useNodeSelect(graph, serviceId);
    useEdgeSelect(graph, serviceId);
    useNodesShow(graph, serviceId);
    useEdgeLineDraw(graph, serviceId);
    useEdgesShow(graph, serviceId);
    useNodeChange(graph, serviceId);
    useEdgeChange(graph, serviceId);
    useNodeAdd(graph, serviceId);
    useEdgeHover(graph, serviceId);

    return (
      <Box
        id="container"
        sx={{
          display: "flex",
          flex: 1,
          flexFlow: "column",
          overflow: "auto",
          position: "relative",
        }}
      ></Box>
    );
  }
);
