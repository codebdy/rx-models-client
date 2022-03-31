import React from "react";
import { Grid, Box } from "@mui/material";
import ToolbarArea from "./ToolbarArea";
import ToolbarTitle from "./ToolbarTitle";
import intl from "react-intl-universal";
import { ClassPanel } from "./ClassPanel";
import { AttributePanel } from "./AttributePanel";
import { RelationPanel } from "./RelationPanel";
import { useRecoilValue } from "recoil";
import { selectedElementState } from "../recoil/atoms";
import { useClass } from "../hooks/useClass";
import { useAttribute } from "../hooks/useAttribute";
import { useRelation } from "../hooks/useRelation";
import { useServiceId } from "../hooks/useServiceId";
import { useScrollbarStyles } from "theme/useScrollbarStyles";
import { useMethod } from "../hooks/useMethod";
import { MethodPanel } from "./MethodPanel";

export const PropertyBox = () => {
  const serviceId = useServiceId();
  const selectedElement = useRecoilValue(selectedElementState(serviceId));
  const selectedEntity = useClass(selectedElement || "", serviceId);
  const { cls: attributeCls, attribute } = useAttribute(
    selectedElement || "",
    serviceId
  );
  const { cls: methodCls, method } = useMethod(
    selectedElement || "",
    serviceId
  );
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
          p: 2,
          flex: 1,
          overflow: "auto",
          color: (theme) => theme.palette.text.secondary,
          ...scrollStyles,
        }}
      >
        <Grid container spacing={2}>
          {selectedEntity && <ClassPanel cls={selectedEntity} />}
          {attribute && attributeCls && (
            <AttributePanel attribute={attribute} cls={attributeCls} />
          )}
          {method && methodCls && (
            <MethodPanel method={method} cls={methodCls} />
          )}
          {relation && <RelationPanel relation={relation} />}
          {!selectedElement && <Grid item>{intl.get("no-selected")}</Grid>}
        </Grid>
      </Box>
    </Box>
  );
};
