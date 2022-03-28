import React, { useCallback } from "react";
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
import { ClassMeta, StereoType } from "../meta/ClassMeta";
import { JsonInput } from "./JsonInput";
import { useChangeClass } from "../hooks/useChangeEntity";
import { useServiceId } from "../hooks/useServiceId";

export const ClassPanel = (props: { cls: ClassMeta }) => {
  const { cls } = props;
  const serviceId = useServiceId();
  const changeEntity = useChangeClass(serviceId);

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      changeEntity({ ...cls, name: event.target.value.trim() });
    },
    [changeEntity, cls]
  );

  // const handleTableNameChange = useCallback(
  //   (event: React.ChangeEvent<{ value: string }>) => {
  //     changeEntity({ ...entity, tableName: event.target.value.trim() });
  //   },
  //   [changeEntity, entity]
  // );

  const handleTypeChange = useCallback(
    (event: SelectChangeEvent<StereoType>) => {
      const entityType = event.target.value as StereoType;
      changeEntity({ ...cls, stereoType: entityType });
    },
    [changeEntity, cls]
  );

  const handleEnumValuesChange = useCallback(
    (value: any) => {
      changeEntity({ ...cls, enumValues: value });
    },
    [changeEntity, cls]
  );

  const handleEventableChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      changeEntity({ ...cls, root: event.target.checked });
    },
    [changeEntity, cls]
  );

  const handleDescriptionChange = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      changeEntity({ ...cls, description: event.target.value });
    },
    [changeEntity, cls]
  );

  return (
    <>
      <Grid item xs={12}>
        <LazyTextField
          label={intl.get("name")}
          value={cls.name || ""}
          onChange={handleNameChange}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="outlined" fullWidth size="small">
          <InputLabel>{intl.get("type")}</InputLabel>
          <Select
            value={cls.stereoType || StereoType.Entity}
            onChange={handleTypeChange}
            label={intl.get("type")}
          >
            <MenuItem value={StereoType.Enum}>{intl.get("enum")}</MenuItem>
            {/* <MenuItem value={StereoType.Interface}>
              {intl.get("interface")}
            </MenuItem> */}
            <MenuItem value={StereoType.Abstract}>
              {intl.get("abstract-class")}
            </MenuItem>
            <MenuItem value={StereoType.ValueObject}>
              {intl.get("value-object")}
            </MenuItem>
            <MenuItem value={StereoType.Entity}>
              {intl.get("entity-class")}
            </MenuItem>
            <MenuItem value={StereoType.Association}>
              {intl.get("association-class")}
            </MenuItem>
            {/* <MenuItem value={StereoType.GQLInterface}>
              {intl.get("graphql-interface")}
            </MenuItem> */}
            <MenuItem value={StereoType.Service}>
              {intl.get("service")}
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {cls.stereoType !== StereoType.Enum &&
        cls.stereoType !== StereoType.Abstract &&
        cls.stereoType !== StereoType.Association &&
        cls.stereoType !== StereoType.ValueObject && (
          <>
            {/* <Grid item xs={12}>
              <LazyTextField
                label={intl.get("table-name")}
                value={entity.tableName || ""}
                onChange={handleTableNameChange}
              />
            </Grid> */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={cls.root || false}
                    onChange={handleEventableChange}
                    color="primary"
                  />
                }
                label={intl.get("root")}
              />
            </Grid>
          </>
        )}

      {cls.stereoType === StereoType.Enum && (
        <Grid item xs={12}>
          <JsonInput
            label={intl.get("enum-values")}
            value={cls.enumValues}
            onChange={handleEnumValuesChange}
            title={intl.get("edit-enum")}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <LazyTextField
          label={intl.get("description")}
          value={cls.description || ""}
          multiline
          rows={4}
          onChange={handleDescriptionChange}
        />
      </Grid>
    </>
  );
};
