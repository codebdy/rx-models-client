import React, { memo, useEffect, useState } from "react";
import { Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import { useNodesShow } from "./use-nodes-show";
import { useExplorerScrollbarHide } from "./use-explorer-scrollbar-hide";
import { useNodeSelect } from "./use-node-select";
import { useEdgeLineDraw } from "./use-edge-line-draw";
import { useEdgesShow } from "./use-edges-show";
import { useNodeChange } from "./use-node-change";
import { useNodeAdd } from "./use-node-add";
import { useEdgeSelect } from "./use-edge-select";
import { useEdgeChange } from "./useEdgeChange";
import { getGraphConfig } from "./getGraphConfig";
import { Graph } from "@antv/x6";
import { useRecoilValue } from "recoil";
import { selectedDiagramState } from "../recoil/atoms";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: "flex",
      flexFlow: "column",
      overflow: "auto",
    },
  })
);

export const GraphCanvas = memo(() => {
  const [graph, setGraph] = useState<Graph>();
  const selectedDiagram = useRecoilValue(selectedDiagramState);
  const classes = useStyles();
  useEffect(() => {
    const config = getGraphConfig();
    const aGraph = new Graph(config as any);
    setGraph(aGraph);
    return () => {
      graph?.dispose();
      setGraph(undefined);
    };
  }, [graph, selectedDiagram]);

  useExplorerScrollbarHide();
  useNodeSelect();
  useEdgeSelect();
  useNodesShow();
  useEdgeLineDraw();
  useEdgesShow();
  useNodeChange();
  useEdgeChange(graph);
  useNodeAdd();

  return <div className={classes.root} id="container"></div>;
});
