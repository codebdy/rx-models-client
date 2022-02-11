import React from "react";
import { observer } from "mobx-react";
import { EntityStore } from "../store/entity-store";
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
import { useEntityBoardStore } from "../store/helper";
import LazyTextField from "components/EntityBoard/PropertyBox/LazyTextField";
import { NameChangeCommand } from "../command/name-change-command";
import { EntityTableNameChangeCommand } from "../command/entity-table-name-change-command";
import { EntityType } from "../meta/EntityMeta";
import { EntityTypeChangeCommand } from "../command/entity-type-change-command";
import { JsonInput } from "./JsonInput";
import { EntityEnumValuesChangeCommand } from "../command/entity-enum-values-change-command";
import { EntityMoveCommand } from "../command/entity-move-command";
import { EntityEventableChangeCommand } from "../command/entity-eventable-change-command copy";

export const EntityPanel = (props: { entityStore: EntityStore }) => {
  const { entityStore } = props;
  const bordStore = useEntityBoardStore();
  const handleNameChange = (value: string) => {
    const command = new NameChangeCommand(entityStore, value);
    bordStore.excuteCommand(command);
  };

  const handleTableNameChange = (value: string) => {
    const command = new EntityTableNameChangeCommand(entityStore, value);
    bordStore.excuteCommand(command);
  };

  const handleTypeChange = (event: SelectChangeEvent<EntityType>) => {
    const type = event.target.value;
    const command = new EntityTypeChangeCommand(entityStore, type as any);
    bordStore.excuteCommand(command);
  };

  const handleEnumValuesChange = (value: any) => {
    const command = new EntityEnumValuesChangeCommand(entityStore, value);
    bordStore.excuteCommand(command);
  };

  const handlePackageChange = (event: SelectChangeEvent<string>) => {
    const command = new EntityMoveCommand(entityStore, event.target.value);
    bordStore.excuteCommand(command);
  };

  const handleEventableChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const command = new EntityEventableChangeCommand(
      entityStore,
      event.target.checked
    );
    bordStore.excuteCommand(command);
  };

  return (
    <>
      <Grid item xs={12}>
        <LazyTextField
          label={intl.get("name")}
          value={entityStore.name || ""}
          onChange={handleNameChange}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="outlined" fullWidth size="small">
          <InputLabel>{intl.get("belongs-to-package")}</InputLabel>
          <Select
            value={entityStore.package?.uuid || ""}
            onChange={handlePackageChange}
            label={intl.get("belongs-to-package")}
          >
            {entityStore.getRootStore().packages.map((pkg) => {
              return (
                <MenuItem key={pkg.uuid} value={pkg.uuid}>
                  {pkg.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="outlined" fullWidth size="small">
          <InputLabel>{intl.get("type")}</InputLabel>
          <Select
            value={entityStore.entityType || EntityType.NORMAL}
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
      {entityStore.entityType !== EntityType.ENUM &&
        entityStore.entityType !== EntityType.INTERFACE && (
          <>
            <Grid item xs={12}>
              <LazyTextField
                label={intl.get("table-name")}
                value={entityStore.tableName || ""}
                onChange={handleTableNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={entityStore.eventable || false}
                    onChange={handleEventableChange}
                    color="primary"
                  />
                }
                label={intl.get("eventable")}
              />
            </Grid>
          </>
        )}

      {entityStore.entityType === EntityType.ENUM && (
        <Grid item xs={12}>
          <JsonInput
            label={intl.get("enum-values")}
            value={entityStore.enumValues}
            onChange={handleEnumValuesChange}
            title={intl.get("edit-enum")}
          />
        </Grid>
      )}
    </>
  );
};
