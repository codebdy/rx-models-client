import React from "react";
import { Theme, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import ToolbarArea from "./ToolbarArea";
import ToolbarTitle from "./ToolbarTitle";
import intl from "react-intl-universal";
import { EntityPanel } from "./EntityPanel";
import { ColumnPanel } from "./ColumnPanel";
import { RelationPanel } from "./RelationPanel";
import { useRecoilValue } from "recoil";
import { selectedElementState } from "../recoil/atoms";
import { useEntity } from "../hooks/useEntity";
import { useColumn } from "../hooks/useColumn";
import { useRelation } from "../hooks/useRelation";
import { useServiceId } from "../hooks/useServiceId";

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
      color: theme.palette.text.secondary,
    },
  })
);

export const PropertyBox = () => {
  const classes = useStyles();
  const serviceId = useServiceId();
  const selectedElement = useRecoilValue(selectedElementState(serviceId));
  const selectedEntity = useEntity(selectedElement || "", serviceId);
  const { entity, column } = useColumn(selectedElement || "", serviceId);
  const relation = useRelation(selectedElement || "", serviceId);

  return (
    <div className={classes.root}>
      <ToolbarArea>
        <ToolbarTitle>{intl.get("properties")}</ToolbarTitle>
      </ToolbarArea>
      <div className={classes.propertiesArea}>
        <Grid container spacing={2}>
          {selectedEntity && <EntityPanel entity={selectedEntity} />}
          {column && entity && <ColumnPanel column={column} entity={entity} />}
          {relation && <RelationPanel relation={relation} />}
          {!selectedElement && <Grid item>{intl.get("no-selected")}</Grid>}
        </Grid>
      </div>
    </div>
  );
};
