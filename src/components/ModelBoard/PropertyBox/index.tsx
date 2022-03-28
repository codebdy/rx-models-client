import React from "react";
import { Grid, Box } from "@mui/material";
import ToolbarArea from "./ToolbarArea";
import ToolbarTitle from "./ToolbarTitle";
import intl from "react-intl-universal";
import { EntityPanel } from "./EntityPanel";
import { AttributePanel } from "./AttributePanel";
import { RelationPanel } from "./RelationPanel";
import { useRecoilValue } from "recoil";
import { selectedElementState } from "../recoil/atoms";
import { useClass } from "../hooks/useClass";
import { useColumn } from "../hooks/useColumn";
import { useRelation } from "../hooks/useRelation";
import { useServiceId } from "../hooks/useServiceId";
import { useScrollbarStyles } from "theme/useScrollbarStyles";

export const PropertyBox = () => {
  const serviceId = useServiceId();
  const selectedElement = useRecoilValue(selectedElementState(serviceId));
  const selectedEntity = useClass(selectedElement || "", serviceId);
  const { entity, column } = useColumn(selectedElement || "", serviceId);
  const relation = useRelation(selectedElement || "", serviceId);
  const scrollStyles = useScrollbarStyles(true);

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        borderLeft: (theme) => `solid 1px ${theme.palette.divider}`,
        width: "260px",
      }}
    >
      <ToolbarArea>
        <ToolbarTitle>{intl.get("properties")}</ToolbarTitle>
      </ToolbarArea>
      <Box
        sx={{
          padding: theme=>theme.spacing(2),
          flex: 1,
          overflow: "auto",
          color: theme=>theme.palette.text.secondary,
          ...scrollStyles,
        }}
      >
        <Grid container spacing={2}>
          {selectedEntity && <EntityPanel entity={selectedEntity} />}
          {column && entity && <AttributePanel column={column} entity={entity} />}
          {relation && <RelationPanel relation={relation} />}
          {!selectedElement && <Grid item>{intl.get("no-selected")}</Grid>}
        </Grid>
      </Box>
    </Box>
  );
};
