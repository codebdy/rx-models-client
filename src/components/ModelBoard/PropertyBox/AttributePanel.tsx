import React, { useCallback, useMemo } from "react";
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
import LazyTextField from "components/ModelBoard/PropertyBox/LazyTextField";
import { AttributeMeta } from "../meta/AttributeMeta";
import { ValueType } from "../meta/ValueType";
import { ClassMeta, StereoType } from "../meta/ClassMeta";
import { useChangeAttribute } from "../hooks/useChangeAttribute";
import { useEnums } from "../hooks/useEnums";
import { useInterfaces } from "../hooks/useInterfaces";
import { useServiceId } from "../hooks/useServiceId";
import { CONST_ID } from "../meta/Meta";

export const AttributePanel = (props: {
  attribute: AttributeMeta;
  entity: ClassMeta;
}) => {
  const { attribute, entity } = props;
  const serviceId = useServiceId()
  const changeAttribute = useChangeAttribute(serviceId);
  const enums = useEnums(serviceId);
  const interfaces = useInterfaces(serviceId);

  const handleStringChange = useCallback(
    (prop: any) => (event: React.ChangeEvent<{ value: string }>) => {
      changeAttribute(
        {
          ...attribute,
          [prop]: event.target.value.trim(),
        },
        entity
      );
    },
    [changeAttribute, attribute, entity]
  );

  //默认值以后要改成一个单独控件
  const handleDefaultChange = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      changeAttribute(
        {
          ...attribute,
          default: event.target.value === "" ? undefined : event.target.value,
        },
        entity
      );
    },
    [changeAttribute, attribute, entity]
  );

  //不设置allValues， 类型改变会清空所有旧设置，保留nullable
  const handleTypeChange = useCallback(
    (event: SelectChangeEvent<ValueType>) => {
      const type = event.target.value as any;

      changeAttribute(
        {
          ...attribute,
          type,
          nullable: attribute.nullable,
        },
        entity
      );
    },
    [changeAttribute, attribute, entity]
  );

  const handleEnumEntiyChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      changeAttribute(
        {
          ...attribute,
          typeUuid: event.target.value,
        },
        entity
      );
    },
    [changeAttribute, attribute, entity]
  );

  const handleInterfaceEntiyChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      changeAttribute(
        {
          ...attribute,
          typeUuid: event.target.value,
        },
        entity
      );
    },
    [changeAttribute, attribute, entity]
  );

  const handleBooleanChange = useCallback(
    (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      changeAttribute(
        {
          ...attribute,
          [prop]: event.target.checked,
        },
        entity
      );
    },
    [changeAttribute, attribute, entity]
  );

  const handleSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.checked ? false : undefined;
      changeAttribute(
        {
          ...attribute,
          select: value,
        },
        entity
      );
    },
    [changeAttribute, attribute, entity]
  );

  const isId = useMemo(
    () => attribute.name === CONST_ID && entity.stereoType !== StereoType.Interface,
    [attribute.name, entity.stereoType]
  );
  return (
    <>
      <Grid item xs={12}>
        <LazyTextField
          label={intl.get("name")}
          value={attribute.name || ""}
          onChange={handleStringChange("name")}
          disabled={isId}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="outlined" fullWidth size="small" disabled={isId}>
          <InputLabel>{intl.get("data-type")}</InputLabel>
          <Select
            value={attribute.type}
            onChange={handleTypeChange}
            label={intl.get("data-type")}
          >
            <MenuItem value={ValueType.ID}>ID</MenuItem>
            <MenuItem value={ValueType.String}>String</MenuItem>
            <MenuItem value={ValueType.Int}>Int</MenuItem>
            <MenuItem value={ValueType.Float}>Float</MenuItem>
            <MenuItem value={ValueType.Boolean}>Boolean</MenuItem>
            <MenuItem value={ValueType.Date}>Date</MenuItem>
            <MenuItem value={ValueType.Enum}>Enum</MenuItem>
            <MenuItem value={ValueType.ValueObject}>
              {intl.get("simple-json")}
            </MenuItem>
            {/* <MenuItem value={ValueType.Array}>
              {intl.get("simple-array")}
            </MenuItem>
            <MenuItem value={ValueType.JsonArray}>
              {intl.get("json-array")}
            </MenuItem> */}
          </Select>
        </FormControl>
      </Grid>
      {attribute.type === ValueType.Enum && (
        <Grid item xs={12}>
          <FormControl
            variant="outlined"
            fullWidth
            size="small"
            disabled={isId}
          >
            <InputLabel>{intl.get("enum-class")}</InputLabel>
            <Select
              value={attribute.typeUuid || ""}
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
      {(attribute.type === ValueType.ValueObject ||
        attribute.type === ValueType.ValueObjectArray) && (
        <Grid item xs={12}>
          <FormControl
            variant="outlined"
            fullWidth
            size="small"
            disabled={isId}
          >
            <InputLabel>{intl.get("interface-class")}</InputLabel>
            <Select
              value={attribute.typeUuid || ""}
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
      {!isId && (
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Switch
                checked={attribute.nullable || false}
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
                checked={attribute.unique || false}
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
                checked={attribute.index || false}
                onChange={handleBooleanChange("index")}
                color="primary"
              />
            }
            label={intl.get("index")}
          />
        </Grid>
      )}

      {attribute.type === ValueType.Date && (
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Switch
                checked={attribute.createDate || false}
                onChange={handleBooleanChange("createDate")}
                color="primary"
              />
            }
            label={intl.get("create-date")}
          />
        </Grid>
      )}
      {attribute.type === ValueType.Date && (
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Switch
                checked={attribute.updateDate || false}
                onChange={handleBooleanChange("updateDate")}
                color="primary"
              />
            }
            label={intl.get("update-date")}
          />
        </Grid>
      )}
      {attribute.type === ValueType.Date && (
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={attribute.deleteDate || false}
                onChange={handleBooleanChange("deleteDate")}
                color="primary"
              />
            }
            label={intl.get("delete-date")}
          />
        </Grid>
      )}
      {!isId && (
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Switch
                checked={attribute.select === false ? true : false}
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
            value={attribute.default || ""}
            onChange={handleDefaultChange}
          />
        </Grid>
      )}

      {!isId && attribute.type === ValueType.String && (
        <Grid item xs={12}>
          <LazyTextField
            label={intl.get("length")}
            value={attribute.default || ""}
            onChange={handleStringChange("length")}
          />
        </Grid>
      )}

      <Grid item xs={12}>
        <LazyTextField
          label={intl.get("description")}
          value={attribute.description || ""}
          multiline
          rows={4}
          onChange={handleStringChange("description")}
        />
      </Grid>
    </>
  );
};
