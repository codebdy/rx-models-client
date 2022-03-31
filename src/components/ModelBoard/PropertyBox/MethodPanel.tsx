import React, { useCallback } from "react";
import intl from "react-intl-universal";
import { Grid } from "@mui/material";
import LazyTextField from "components/ModelBoard/PropertyBox/LazyTextField";
import { ArgMeta, MethodMeta } from "../meta/MethodMeta";
import { ValueType } from "../meta/ValueType";
import { ClassMeta } from "../meta/ClassMeta";
import { useServiceId } from "../hooks/useServiceId";
import { TypeInput } from "./TypeInput";
import { useChangeMethod } from "../hooks/useChangeMethod";
import { useGetTypeLabel } from "../hooks/useGetTypeLabel";
import { FieldList } from "./FieldList";

export const MethodPanel = (props: { method: MethodMeta; cls: ClassMeta }) => {
  const { method, cls } = props;
  const serviceId = useServiceId();
  const changeMethod = useChangeMethod(serviceId);
  const getTypeLabel = useGetTypeLabel(serviceId);

  const handleStringChange = useCallback(
    (prop: any) => (event: React.ChangeEvent<{ value: string }>) => {
      changeMethod(
        {
          ...method,
          [prop]: event.target.value.trim(),
        },
        cls
      );
    },
    [changeMethod, method, cls]
  );

  //不设置allValues， 类型改变会清空所有旧设置，保留nullable
  const handleTypeChange = useCallback(
    (type: ValueType) => {
      changeMethod(
        {
          ...method,
          type,
          typeUuid: undefined,
          typeLabel: getTypeLabel(type),
        },
        cls
      );
    },
    [changeMethod, method, getTypeLabel, cls]
  );

  const handleValueObjectChange = useCallback(
    (uuid: string) => {
      changeMethod(
        {
          ...method,
          typeUuid: uuid,
          typeLabel: getTypeLabel(method.type, uuid),
        },
        cls
      );
    },
    [changeMethod, method, getTypeLabel, cls]
  );

  const handleArgsChange = useCallback(
    (args: ArgMeta[]) => {
      changeMethod(
        {
          ...method,
          args: args.map((arg) => ({
            ...arg,
            typeLabel: getTypeLabel(arg.type, arg.typeUuid),
          })),
        },
        cls
      );
    },
    [changeMethod, cls, getTypeLabel, method]
  );

  return (
    <>
      <Grid item xs={12}>
        <LazyTextField
          label={intl.get("name")}
          value={method.name || ""}
          onChange={handleStringChange("name")}
        />
      </Grid>

      <TypeInput
        valueType={method.type}
        typeUuid={method.typeUuid}
        onTypeChange={handleTypeChange}
        onTypeUuidChange={handleValueObjectChange}
        withEntityType={true}
      />

      <FieldList
        fields={method.args || []}
        onChange={handleArgsChange}
        title={intl.get("arg-list")}
        prefix="arg"
      />
    </>
  );
};
