import React from "react";
import intl from "react-intl-universal";
import {
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
} from "@mui/material";
import LazyTextField from "components/EntityBoard/PropertyBox/LazyTextField";
import { EntityMeta, EntityType } from "../meta/EntityMeta";
import { JsonInput } from "./JsonInput";
import { useChangeEntity } from "../hooks/useChangeEntity";

export const EntityPanel = (props: { entity: EntityMeta }) => {
  const { entity } = props;
  const changeEntity = useChangeEntity();

  const handleNameChange = (value: string) => {
    changeEntity({ ...entity, name: value });
  };

  const handleTableNameChange = (value: string) => {
    changeEntity({ ...entity, tableName: value });
  };

  const handleTypeChange = (event: SelectChangeEvent<EntityType>) => {
    const entityType = event.target.value as EntityType;
    changeEntity({ ...entity, entityType: entityType });
  };

  const handleEnumValuesChange = (value: any) => {
    changeEntity({ ...entity, enumValues: value });
  };

  const handleEventableChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    changeEntity({ ...entity, eventable: event.target.checked });
  };

  return (
    <>
      <Grid item xs={12}>
        <LazyTextField
          label={intl.get("name")}
          value={entity.name || ""}
          onChange={handleNameChange}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="outlined" fullWidth size="small">
          <InputLabel>{intl.get("type")}</InputLabel>
          <Select
            value={entity.entityType || EntityType.NORMAL}
            onChange={handleTypeChange}
            label={intl.get("type")}
          >
            <MenuItem value={EntityType.NORMAL}>
              {intl.get("normal-class")}
            </MenuItem>
            <MenuItem value={EntityType.ENUM}>{intl.get("enum")}</MenuItem>
            <MenuItem value={EntityType.ABSTRACT}>
              {intl.get("abstract-class")}
            </MenuItem>
            <MenuItem value={EntityType.INTERFACE}>
              {intl.get("interface")}
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {entity.entityType !== EntityType.ENUM &&
        entity.entityType !== EntityType.INTERFACE && (
          <>
            <Grid item xs={12}>
              <LazyTextField
                label={intl.get("table-name")}
                value={entity.tableName || ""}
                onChange={handleTableNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={entity.eventable || false}
                    onChange={handleEventableChange}
                    color="primary"
                  />
                }
                label={intl.get("eventable")}
              />
            </Grid>
          </>
        )}

      {entity.entityType === EntityType.ENUM && (
        <Grid item xs={12}>
          <JsonInput
            label={intl.get("enum-values")}
            value={entity.enumValues}
            onChange={handleEnumValuesChange}
            title={intl.get("edit-enum")}
          />
        </Grid>
      )}
    </>
  );
};
