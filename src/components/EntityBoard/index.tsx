import React, { memo, useState } from "react";
import { Box, Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import { EntityTree } from "./EntityTree";
import { GraphCanvas } from "./GraphCanvas";
import classNames from "classnames";
import { Toolbox } from "./Toolbox";
import { PropertyBox } from "./PropertyBox";
import { EntityToolbar } from "./EntityToolbar";
import Loading from "components/common/loading";
import EmpertyCanvas from "./EmpertyCanvas";
import { useRecoilValue } from "recoil";
import { selectedDiagramState } from "./recoil/atoms";
import { Graph } from "@antv/x6";
import "@antv/x6-react-shape";
import { useQueryOne } from "do-ents/useQueryOne";
import { Meta } from "./meta/Meta";
import { useShowServerError } from "recoil/hooks/useShowServerError";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      width: "100%",
      flex: 1,
      display: "flex",
      height: "0",
    },
    canvasShell: {
      flex: 1,
      display: "flex",
    },
    canvas: {
      flex: 1,
      display: "flex",
      flexFlow: "column",
      overflow: "auto",
    },
  })
);

export const ModelsBoard = memo(() => {
  const classes = useStyles();
  const [graph, setGraph] = useState<Graph>();
  const selectedDiagram = useRecoilValue(selectedDiagramState);
  const { data, error, loading } = useQueryOne<Meta>("Meta");
  useShowServerError(error);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexFlow: "row",
        height: "0",
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <EntityTree graph={graph}></EntityTree>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexFlow: "column",
            }}
          >
            <EntityToolbar />
            <div className={classNames(classes.content)}>
              {selectedDiagram ? (
                <>
                  <Toolbox graph={graph}></Toolbox>
                  <div
                    className={classNames(
                      classes.canvasShell,
                      "dragit-scrollbar"
                    )}
                  >
                    <div className={classes.canvas} id="container">
                      <GraphCanvas
                        graph={graph}
                        onSetGraph={setGraph}
                      ></GraphCanvas>
                    </div>
                  </div>
                </>
              ) : (
                <EmpertyCanvas></EmpertyCanvas>
              )}
              <PropertyBox></PropertyBox>
            </div>
          </Box>
        </>
      )}
    </Box>
  );
});
