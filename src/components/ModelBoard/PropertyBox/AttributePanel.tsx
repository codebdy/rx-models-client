import React, { useCallback, useMemo } from "react";
import intl from "react-intl-universal";
import { FormControlLabel, Grid, Switch } from "@mui/material";
import LazyTextField from "components/ModelBoard/PropertyBox/LazyTextField";
import { AttributeMeta } from "../meta/AttributeMeta";
import { ValueType } from "../meta/ValueType";
import { ClassMeta } from "../meta/ClassMeta";
import { useChangeAttribute } from "../hooks/useChangeAttribute";
import { useServiceId } from "../hooks/useServiceId";
import { CONST_ID } from "../meta/Meta";
import { TypeInput } from "./TypeInput";

export const AttributePanel = (props: {
  attribute: AttributeMeta;
  entity: ClassMeta;
}) => {
  const { attribute, entity } = props;
  const serviceId = useServiceId();
  const changeAttribute = useChangeAttribute(serviceId);

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
    (type: ValueType) => {
      changeAttribute(
        {
          ...attribute,
          type,
          nullable: attribute.nullable,
          typeUuid: undefined,
        },
        entity
      );
    },
    [changeAttribute, attribute, entity]
  );

  const handleValueObjectChange = useCallback(
    (uuid: string) => {
      changeAttribute(
        {
          ...attribute,
          typeUuid: uuid,
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

  const isId = useMemo(() => attribute.name === CONST_ID, [attribute.name]);
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
      <TypeInput
        valueType={attribute.type}
        typeUuid={attribute.typeUuid}
        onTypeChange={handleTypeChange}
        onTypeUuidChange={handleValueObjectChange}
        disabled={isId}
      />
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
