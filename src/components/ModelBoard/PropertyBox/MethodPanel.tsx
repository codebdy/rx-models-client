import React, { useCallback } from "react";
import intl from "react-intl-universal";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import LazyTextField from "components/ModelBoard/PropertyBox/LazyTextField";
import { ArgMeta, MethodMeta, MethodImplementType, MethodOperateType } from "../meta/MethodMeta";
import { Type } from "../meta/Type";
import { ClassMeta } from "../meta/ClassMeta";
import { useServiceId } from "../hooks/useServiceId";
import { TypeInput } from "./TypeInput";
import { useChangeMethod } from "../hooks/useChangeMethod";
import { useGetTypeLabel } from "../hooks/useGetTypeLabel";
import { FieldList } from "./FieldList";
import { ScriptInput } from "./ScriptInput";

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
    (type: Type) => {
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

  const handleMethodTypeChange = useCallback(
    (event: SelectChangeEvent<MethodImplementType>) => {
      changeMethod(
        {
          ...method,
          implementType: event.target.value as MethodImplementType,
        },
        cls
      );
    },
    [changeMethod, cls, method]
  );

  const handleMethodOperateChange = useCallback(
    (event: SelectChangeEvent<MethodOperateType>) => {
      changeMethod(
        {
          ...method,
          operateType: event.target.value as MethodOperateType,
        },
        cls
      );
    },
    [changeMethod, cls, method]
  );

  const hangdleMethodImplementsChange = useCallback(
    (value: any) => {
      changeMethod(
        {
          ...method,
          methodImplements: value,
        },
        cls
      );
    },
    [changeMethod, cls, method]
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
      <Grid item xs={12}>
        <FormControl variant="outlined" fullWidth size="small">
          <InputLabel>{intl.get("operate-type")}</InputLabel>
          <Select
            value={method.operateType || ""}
            onChange={handleMethodOperateChange}
            label={intl.get("operate-type")}
          >
            <MenuItem value={MethodOperateType.Query}>
              QUERY
            </MenuItem>
            <MenuItem value={MethodOperateType.Mutation}>
              MUTATION
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="outlined" fullWidth size="small">
          <InputLabel>{intl.get("implement-type")}</InputLabel>
          <Select
            value={method.implementType || MethodImplementType.Script}
            onChange={handleMethodTypeChange}
            label={intl.get("implement-type")}
          >
            <MenuItem value={MethodImplementType.Script}>
              {intl.get("script")}
            </MenuItem>
            <MenuItem value={MethodImplementType.CloudFunction}>
              {intl.get("cloud-function")}
            </MenuItem>
            <MenuItem value={MethodImplementType.MicroService}>
              {intl.get("micro-service")}
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {(!method.implementType ||
        method.implementType === MethodImplementType.Script) && (
        <Grid item xs={12}>
          <ScriptInput
            label={intl.get("script")}
            value={method.methodImplements || ""}
            onChange={hangdleMethodImplementsChange}
            title={intl.get("edit-script")}
          />
        </Grid>
      )}
    </>
  );
};
