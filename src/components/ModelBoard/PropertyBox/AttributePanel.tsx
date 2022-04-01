import React, { useCallback, useMemo } from "react";
import intl from "react-intl-universal";
import { FormControlLabel, Grid, Switch } from "@mui/material";
import LazyTextField from "components/ModelBoard/PropertyBox/LazyTextField";
import { AttributeMeta } from "../meta/AttributeMeta";
import { Type } from "../meta/Type";
import { ClassMeta, StereoType } from "../meta/ClassMeta";
import { useChangeAttribute } from "../hooks/useChangeAttribute";
import { useServiceId } from "../hooks/useServiceId";
import { CONST_ID } from "../meta/Meta";
import { TypeInput } from "./TypeInput";
import { useGetTypeLabel } from "../hooks/useGetTypeLabel";

export const AttributePanel = (props: {
  attribute: AttributeMeta;
  cls: ClassMeta;
}) => {
  const { attribute, cls } = props;
  const serviceId = useServiceId();
  const changeAttribute = useChangeAttribute(serviceId);
  const getTypeLabel = useGetTypeLabel(serviceId);

  const handleStringChange = useCallback(
    (prop: any) => (event: React.ChangeEvent<{ value: string }>) => {
      changeAttribute(
        {
          ...attribute,
          [prop]: event.target.value.trim(),
        },
        cls
      );
    },
    [changeAttribute, attribute, cls]
  );

  //默认值以后要改成一个单独控件
  const handleDefaultChange = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      changeAttribute(
        {
          ...attribute,
          default: event.target.value === "" ? undefined : event.target.value,
        },
        cls
      );
    },
    [changeAttribute, attribute, cls]
  );

  //不设置allValues， 类型改变会清空所有旧设置，保留nullable
  const handleTypeChange = useCallback(
    (type: Type) => {
      changeAttribute(
        {
          ...attribute,
          type,
          nullable: attribute.nullable,
          typeUuid: undefined,
          typeLabel: getTypeLabel(type),
        },
        cls
      );
    },
    [changeAttribute, attribute, getTypeLabel, cls]
  );

  const handleValueObjectChange = useCallback(
    (uuid: string) => {
      changeAttribute(
        {
          ...attribute,
          typeUuid: uuid,
          typeLabel: getTypeLabel(attribute.type, uuid),
        },
        cls
      );
    },
    [changeAttribute, attribute, getTypeLabel, cls]
  );

  const handleBooleanChange = useCallback(
    (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      changeAttribute(
        {
          ...attribute,
          [prop]: event.target.checked,
        },
        cls
      );
    },
    [changeAttribute, attribute, cls]
  );

  const handleSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.checked ? false : undefined;
      changeAttribute(
        {
          ...attribute,
          select: value,
        },
        cls
      );
    },
    [changeAttribute, attribute, cls]
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

      {cls.stereoType !== StereoType.Enum && (
        <>
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

          {attribute.type === Type.Date && (
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
          {attribute.type === Type.Date && (
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
          {attribute.type === Type.Date && (
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

          {!isId && attribute.type === Type.String && (
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
      )}
    </>
  );
};
