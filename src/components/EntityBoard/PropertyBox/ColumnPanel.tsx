import React from "react";
import { ColumnStore } from "../store/column";
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
import { useEntityBoardStore } from "../store/helper";
import { ColumnMeta, ColumnType } from "../meta/ColumnMeta";
import { ColumnChangeCommand } from "../command/column-change-command";
import { EntityMeta, EntityType } from "../meta/EntityMeta";

export const ColumnPanel = (props: {
  column: ColumnMeta;
  entity: EntityMeta;
}) => {
  const { column } = props;
  const bordStore = useEntityBoardStore();

  const handleStringChange = (prop: any) => (value: string) => {
    const command = new ColumnChangeCommand(columnStore, {
      ...column,
      [prop]: value,
    });
    bordStore.excuteCommand(command);
  };

  //默认值以后要改成一个单独控件
  const handleDefaultChange = (value: string) => {
    const command = new ColumnChangeCommand(columnStore, {
      ...allValues,
      default: value === "" ? undefined : value,
    });
    bordStore.excuteCommand(command);
  };

  //不设置allValues， 类型改变会清空所有旧设置，保留nullable
  const handleTypeChange = (event: SelectChangeEvent<ColumnType>) => {
    const type = event.target.value;
    let generated = columnStore.generated;
    if (type !== ColumnType.String && type !== ColumnType.Number) {
      generated = undefined;
    }
    const command = new ColumnChangeCommand(columnStore, {
      type,
      generated,
      nullable: allValues.nullable,
    });
    bordStore.excuteCommand(command);
  };

  const handleEnumEntiyChange = (event: SelectChangeEvent<string>) => {
    const command = new ColumnChangeCommand(columnStore, {
      ...allValues,
      typeEnityUuid: event.target.value,
    });
    bordStore.excuteCommand(command);
  };

  const handleInterfaceEntiyChange = (event: SelectChangeEvent<string>) => {
    const command = new ColumnChangeCommand(columnStore, {
      ...allValues,
      typeEnityUuid: event.target.value,
    });
    bordStore.excuteCommand(command);
  };

  const handleGeneratedChange = (event: SelectChangeEvent<string>) => {
    let value: any = event.target.value;
    if (value === "true") {
      value = true;
    }
    if (!value) {
      value = undefined;
    }
    const command = new ColumnChangeCommand(columnStore, {
      ...allValues,
      generated: value,
    });
    bordStore.excuteCommand(command);
  };

  const handleBooleanChange =
    (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const command = new ColumnChangeCommand(columnStore, {
        ...allValues,
        [prop]: event.target.checked,
      });
      bordStore.excuteCommand(command);
    };

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked ? false : undefined;
    const command = new ColumnChangeCommand(columnStore, {
      ...allValues,
      select: value,
    });
    bordStore.excuteCommand(command);
  };

  const isId =
    columnStore.name === "id" &&
    columnStore.entityStore.entityType !== EntityType.INTERFACE;
  return (
    <>
      <Grid item xs={12}>
        <LazyTextField
          label={intl.get("name")}
          value={columnStore.name || ""}
          onChange={handleStringChange("name")}
          disabled={isId}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="outlined" fullWidth size="small" disabled={isId}>
          <InputLabel>{intl.get("data-type")}</InputLabel>
          <Select
            value={columnStore.type}
            onChange={handleTypeChange}
            label={intl.get("data-type")}
          >
            <MenuItem value={ColumnType.String}>String</MenuItem>
            <MenuItem value={ColumnType.Number}>Number</MenuItem>
            <MenuItem value={ColumnType.Text}>Text</MenuItem>
            <MenuItem value={ColumnType.MediumText}>MediumText</MenuItem>
            <MenuItem value={ColumnType.LongText}>LongText</MenuItem>
            <MenuItem value={ColumnType.Boolean}>Boolean</MenuItem>
            <MenuItem value={ColumnType.Date}>Date</MenuItem>
            <MenuItem value={ColumnType.Enum}>Enum</MenuItem>
            <MenuItem value={ColumnType.SimpleJson}>
              {intl.get("simple-json")}
            </MenuItem>
            <MenuItem value={ColumnType.SimpleArray}>
              {intl.get("simple-array")}
            </MenuItem>
            <MenuItem value={ColumnType.JsonArray}>
              {intl.get("json-array")}
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {columnStore.type === ColumnType.Enum && (
        <Grid item xs={12}>
          <FormControl
            variant="outlined"
            fullWidth
            size="small"
            disabled={isId}
          >
            <InputLabel>{intl.get("enum-class")}</InputLabel>
            <Select
              value={columnStore.typeEnityUuid || ""}
              onChange={handleEnumEntiyChange}
              label={intl.get("enum-class")}
            >
              {bordStore.getEnumEntities().map((enumStore) => {
                return (
                  <MenuItem key={enumStore.uuid} value={enumStore.uuid}>
                    {enumStore.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      )}
      {(columnStore.type === ColumnType.SimpleJson ||
        columnStore.type === ColumnType.JsonArray) && (
        <Grid item xs={12}>
          <FormControl
            variant="outlined"
            fullWidth
            size="small"
            disabled={isId}
          >
            <InputLabel>{intl.get("interface-class")}</InputLabel>
            <Select
              value={columnStore.typeEnityUuid || ""}
              onChange={handleInterfaceEntiyChange}
              label={intl.get("interface-class")}
            >
              {bordStore.getInterfaceEntities().map((enumStore) => {
                return (
                  <MenuItem key={enumStore.uuid} value={enumStore.uuid}>
                    {enumStore.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      )}
      {isId && (
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={columnStore.primary || false}
                onChange={handleBooleanChange("primary")}
                color="primary"
              />
            }
            disabled
            label={intl.get("primary-key")}
          />
        </Grid>
      )}
      {!isId && (
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Switch
                checked={columnStore.nullable || false}
                onChange={handleBooleanChange("nullable")}
                color="primary"
              />
            }
            label={intl.get("nullable")}
          />
        </Grid>
      )}
      {!isId && (
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Switch
                checked={columnStore.unique || false}
                onChange={handleBooleanChange("unique")}
                color="primary"
              />
            }
            label={intl.get("unique")}
          />
        </Grid>
      )}
      {!isId && (
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Switch
                checked={columnStore.index || false}
                onChange={handleBooleanChange("index")}
                color="primary"
              />
            }
            label={intl.get("index")}
          />
        </Grid>
      )}

      {columnStore.type === ColumnType.Date && (
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Switch
                checked={columnStore.createDate || false}
                onChange={handleBooleanChange("createDate")}
                color="primary"
              />
            }
            label={intl.get("create-date")}
          />
        </Grid>
      )}
      {columnStore.type === ColumnType.Date && (
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Switch
                checked={columnStore.updateDate || false}
                onChange={handleBooleanChange("updateDate")}
                color="primary"
              />
            }
            label={intl.get("update-date")}
          />
        </Grid>
      )}
      {columnStore.type === ColumnType.Date && (
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={columnStore.deleteDate || false}
                onChange={handleBooleanChange("deleteDate")}
                color="primary"
              />
            }
            label={intl.get("delete-date")}
          />
        </Grid>
      )}
      {!isId && (
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={columnStore.select === false ? true : false}
                onChange={handleSelectChange}
                color="primary"
              />
            }
            label={intl.get("hide-field")}
          />
        </Grid>
      )}

      {!isId && (
        <Grid item xs={12}>
          <LazyTextField
            label={intl.get("default-value")}
            value={columnStore.default || ""}
            onChange={handleDefaultChange}
          />
        </Grid>
      )}

      {!isId && columnStore.type === ColumnType.String && (
        <Grid item xs={12}>
          <LazyTextField
            label={intl.get("length")}
            value={columnStore.default || ""}
            onChange={handleStringChange("length")}
          />
        </Grid>
      )}

      {(columnStore.type === ColumnType.Number ||
        columnStore.type === ColumnType.String) && (
        <Grid item xs={12}>
          <FormControl
            variant="outlined"
            fullWidth
            size="small"
            disabled={isId}
          >
            <InputLabel>{intl.get("generated")}</InputLabel>
            <Select
              value={
                (columnStore.generated === true
                  ? "true"
                  : columnStore.generated) || ""
              }
              onChange={handleGeneratedChange}
              label={intl.get("generated")}
            >
              <MenuItem value={""}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={"true"}>True</MenuItem>
              {columnStore.type === ColumnType.String && (
                <MenuItem value={"uuid"}>uuid</MenuItem>
              )}
              {columnStore.type === ColumnType.String && (
                <MenuItem value={"rowid"}>rowid</MenuItem>
              )}

              <MenuItem value={"increment"}>increment</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      )}
    </>
  );
};
