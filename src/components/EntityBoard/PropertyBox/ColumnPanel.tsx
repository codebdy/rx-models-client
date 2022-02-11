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
import { ColumnMeta, ColumnType } from "../meta/ColumnMeta";
import { EntityMeta, EntityType } from "../meta/EntityMeta";
import { useChangeColumn } from "../hooks/useChangeColumn";
import { useEnums } from "../hooks/useEnums";
import { useInterfaces } from "../hooks/useInterfaces";

export const ColumnPanel = (props: {
  column: ColumnMeta;
  entity: EntityMeta;
}) => {
  const { column, entity } = props;
  const changeColumn = useChangeColumn();
  const enums = useEnums();
  const interfaces = useInterfaces();

  const handleStringChange = (prop: any) => (value: string) => {
    changeColumn(
      {
        ...column,
        [prop]: value,
      },
      entity
    );
  };

  //默认值以后要改成一个单独控件
  const handleDefaultChange = (value: string) => {
    changeColumn(
      {
        ...column,
        default: value === "" ? undefined : value,
      },
      entity
    );
  };

  //不设置allValues， 类型改变会清空所有旧设置，保留nullable
  const handleTypeChange = (event: SelectChangeEvent<ColumnType>) => {
    const type = event.target.value as any;
    let generated = column.generated;
    if (type !== ColumnType.String && type !== ColumnType.Number) {
      generated = undefined;
    }

    changeColumn(
      {
        ...column,
        type,
        generated,
        nullable: column.nullable,
      },
      entity
    );
  };

  const handleEnumEntiyChange = (event: SelectChangeEvent<string>) => {
    changeColumn(
      {
        ...column,
        typeEnityUuid: event.target.value,
      },
      entity
    );
  };

  const handleInterfaceEntiyChange = (event: SelectChangeEvent<string>) => {
    changeColumn(
      {
        ...column,
        typeEnityUuid: event.target.value,
      },
      entity
    );
  };

  const handleGeneratedChange = (event: SelectChangeEvent<string>) => {
    let value: any = event.target.value;
    if (value === "true") {
      value = true;
    }
    if (!value) {
      value = undefined;
    }

    changeColumn(
      {
        ...column,
        generated: value,
      },
      entity
    );
  };

  const handleBooleanChange =
    (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      changeColumn(
        {
          ...column,
          [prop]: event.target.checked,
        },
        entity
      );
    };

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked ? false : undefined;
    changeColumn(
      {
        ...column,
        select: value,
      },
      entity
    );
  };

  const isId =
    column.name === "id" && entity.entityType !== EntityType.INTERFACE;
  return (
    <>
      <Grid item xs={12}>
        <LazyTextField
          label={intl.get("name")}
          value={column.name || ""}
          onChange={handleStringChange("name")}
          disabled={isId}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="outlined" fullWidth size="small" disabled={isId}>
          <InputLabel>{intl.get("data-type")}</InputLabel>
          <Select
            value={column.type}
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
      {column.type === ColumnType.Enum && (
        <Grid item xs={12}>
          <FormControl
            variant="outlined"
            fullWidth
            size="small"
            disabled={isId}
          >
            <InputLabel>{intl.get("enum-class")}</InputLabel>
            <Select
              value={column.typeEnityUuid || ""}
              onChange={handleEnumEntiyChange}
              label={intl.get("enum-class")}
            >
              {enums.map((enumEntity) => {
                return (
                  <MenuItem key={enumEntity.uuid} value={enumEntity.uuid}>
                    {enumEntity.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      )}
      {(column.type === ColumnType.SimpleJson ||
        column.type === ColumnType.JsonArray) && (
        <Grid item xs={12}>
          <FormControl
            variant="outlined"
            fullWidth
            size="small"
            disabled={isId}
          >
            <InputLabel>{intl.get("interface-class")}</InputLabel>
            <Select
              value={column.typeEnityUuid || ""}
              onChange={handleInterfaceEntiyChange}
              label={intl.get("interface-class")}
            >
              {interfaces.map((interfaceEntity) => {
                return (
                  <MenuItem
                    key={interfaceEntity.uuid}
                    value={interfaceEntity.uuid}
                  >
                    {interfaceEntity.name}
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
                checked={column.primary || false}
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
                checked={column.nullable || false}
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
                checked={column.unique || false}
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
                checked={column.index || false}
                onChange={handleBooleanChange("index")}
                color="primary"
              />
            }
            label={intl.get("index")}
          />
        </Grid>
      )}

      {column.type === ColumnType.Date && (
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Switch
                checked={column.createDate || false}
                onChange={handleBooleanChange("createDate")}
                color="primary"
              />
            }
            label={intl.get("create-date")}
          />
        </Grid>
      )}
      {column.type === ColumnType.Date && (
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Switch
                checked={column.updateDate || false}
                onChange={handleBooleanChange("updateDate")}
                color="primary"
              />
            }
            label={intl.get("update-date")}
          />
        </Grid>
      )}
      {column.type === ColumnType.Date && (
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={column.deleteDate || false}
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
                checked={column.select === false ? true : false}
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
            value={column.default || ""}
            onChange={handleDefaultChange}
          />
        </Grid>
      )}

      {!isId && column.type === ColumnType.String && (
        <Grid item xs={12}>
          <LazyTextField
            label={intl.get("length")}
            value={column.default || ""}
            onChange={handleStringChange("length")}
          />
        </Grid>
      )}

      {(column.type === ColumnType.Number ||
        column.type === ColumnType.String) && (
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
                (column.generated === true ? "true" : column.generated) || ""
              }
              onChange={handleGeneratedChange}
              label={intl.get("generated")}
            >
              <MenuItem value={""}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={"true"}>True</MenuItem>
              {column.type === ColumnType.String && (
                <MenuItem value={"uuid"}>uuid</MenuItem>
              )}
              {column.type === ColumnType.String && (
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
