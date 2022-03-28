import React, { useCallback } from "react";
import intl from "react-intl-universal";
import { Checkbox, FormControlLabel, Grid, Switch } from "@mui/material";
import LazyTextField from "components/ModelBoard/PropertyBox/LazyTextField";
import { ClassMeta, StereoType } from "../meta/ClassMeta";
import { JsonInput } from "./JsonInput";
import { useChangeClass } from "../hooks/useChangeEntity";
import { useServiceId } from "../hooks/useServiceId";

export const ClassPanel = (props: { cls: ClassMeta }) => {
  const { cls } = props;
  const serviceId = useServiceId();
  const changeClass = useChangeClass(serviceId);

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      changeClass({ ...cls, name: event.target.value.trim() });
    },
    [changeClass, cls]
  );

  const handelAbtractChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const stereoType = event.target.checked
        ? StereoType.Abstract
        : StereoType.Entity;
      changeClass({ ...cls, stereoType });
    },
    [changeClass, cls]
  );

  const handleEnumValuesChange = useCallback(
    (value: any) => {
      changeClass({ ...cls, enumValues: value });
    },
    [changeClass, cls]
  );

  const handleEventableChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      changeClass({ ...cls, root: event.target.checked });
    },
    [changeClass, cls]
  );

  const handleDescriptionChange = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      changeClass({ ...cls, description: event.target.value });
    },
    [changeClass, cls]
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
      {(cls.stereoType === StereoType.Abstract ||
        cls.stereoType === StereoType.Entity) && (
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={cls.stereoType === StereoType.Abstract}
                onChange={handelAbtractChange}
              />
            }
            label={intl.get("abstract-class")}
          />
        </Grid>
      )}

      {cls.stereoType !== StereoType.Enum &&
        cls.stereoType !== StereoType.Association &&
        cls.stereoType !== StereoType.ValueObject && (
          <>
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
