import React from "react";
import { Theme, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import ToolbarArea from "./ToolbarArea";
import ToolbarTitle from "./ToolbarTitle";
import intl from "react-intl-universal";
import { useEntityBoardStore } from "../store/helper";
import { EntityStore } from "../store/entity-store";
import { EntityPanel } from "./EntityPanel";
import { ColumnStore } from "../store/column";
import { ColumnPanel } from "./ColumnPanel";
import { RelationStore } from "../store/relation";
import { RelationPanel } from "./RelationPanel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexFlow: "column",
      borderLeft: `solid 1px ${theme.palette.divider}`,
      width: "260px",
    },
    propertiesArea: {
      padding: theme.spacing(2),
      flex: 1,
      overflow: "auto",
    },
  })
);

export const PropertyBox = () => {
  const classes = useStyles();
  const boardStore = useEntityBoardStore();

  return (
    <div className={classes.root}>
      <ToolbarArea>
        <ToolbarTitle>{intl.get("properties")}</ToolbarTitle>
      </ToolbarArea>
      <div className={classes.propertiesArea}>
        <Grid container spacing={2}>
          {boardStore?.selectedElement instanceof EntityStore && (
            <EntityPanel entityStore={boardStore.selectedElement} />
          )}
          {boardStore?.selectedElement instanceof ColumnStore && (
            <ColumnPanel columnStore={boardStore.selectedElement} />
          )}
          {boardStore?.selectedElement instanceof RelationStore && (
            <RelationPanel relationStore={boardStore.selectedElement} />
          )}

          {!boardStore?.selectedElement && (
            <Grid item>{intl.get("no-selected")}</Grid>
          )}
        </Grid>
      </div>
    </div>
  );
};
