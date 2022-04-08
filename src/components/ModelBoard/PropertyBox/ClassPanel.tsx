import React, { useCallback } from "react";
import intl from "react-intl-universal";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import LazyTextField from "components/ModelBoard/PropertyBox/LazyTextField";
import { ClassMeta, StereoType } from "../meta/ClassMeta";
import { useChangeClass } from "../hooks/useChangeClass";
import { useServiceId } from "../hooks/useServiceId";

export const ClassPanel = (props: { cls: ClassMeta }) => {
  const { cls } = props;
  const serviceId = useServiceId();

  const changeClass = useChangeClass(serviceId);

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      const name = event.target.value.trim()
      changeClass({ ...cls, name: name });
    },
    [changeClass, cls]
  );

  const handleRootChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      changeClass({ ...cls, root: event.target.checked });
    },
    [changeClass, cls]
  );

  // const handleGqlInterfaceChange = useCallback(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     changeClass({ ...cls, gqlInterface: event.target.checked });
  //   },
  //   [changeClass, cls]
  // );

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
      {cls.stereoType !== StereoType.Enum &&
        cls.stereoType !== StereoType.ValueObject && (
          <>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cls.root || false}
                    onChange={handleRootChange}
                    color="primary"
                  />
                }
                label={intl.get("root-node")}
              />
            </Grid>
          </>
        )}

      {/* {cls.stereoType === StereoType.Abstract && (
          <>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cls.gqlInterface || false}
                    onChange={handleGqlInterfaceChange}
                    color="primary"
                  />
                }
                label={intl.get("graphql-interface")}
              />
            </Grid>
          </>
        )} */}
      {/* {cls.stereoType === StereoType.Enum && (
        <Grid item xs={12}>
          <JsonInput
            label={intl.get("enum-values")}
            value={cls.enumValues}
            onChange={handleEnumValuesChange}
            title={intl.get("edit-enum")}
          />
        </Grid>
      )} */}
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
