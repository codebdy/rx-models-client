import React, { useEffect, useState } from "react";
import { Box, Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import { EntityTree } from "./entity-tree";
import { GraphCanvas } from "./grahp-canvas";
import classNames from "classnames";
import { EntityBoardStore } from "./store/entity-board-store";
import { EntityStoreProvider } from "./store/helper";
import { Toolbox } from "./toolbox";
import { PropertyBox } from "./property-box";
import { EntityToolbar } from "./entity-toolbar";
import Loading from "components/common/loading";
import EmpertyCanvas from "./emperty-canvas";

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
  })
);

export const ModelsBoard = () => {
  const classes = useStyles();
  const [modelStore, setModelStore] = useState(new EntityBoardStore([]));
  // const { data, error, loading } = useMagicQuery<PackageMeta[]>(
  //   new MagicQueryBuilder("RxPackage")
  // );

  // useShowServerError(error);

  useEffect(() => {
    setModelStore(new EntityBoardStore([]));
  }, []);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexFlow: "row",
        height: "0",
      }}
    >
      {false ? (
        <Loading />
      ) : (
        <>
          <EntityTree></EntityTree>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexFlow: "column",
            }}
          >
            <EntityToolbar />
            <div className={classNames(classes.content, "dragit-scrollbar")}>
              {modelStore.openedDiagram ? (
                <>
                  <Toolbox></Toolbox>
                  <div className={classes.canvasShell}>
                    <GraphCanvas></GraphCanvas>
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
};
