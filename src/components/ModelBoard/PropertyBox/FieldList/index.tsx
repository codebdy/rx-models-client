import { Grid, IconButton, Typography } from "@mui/material";
import { memo, useCallback } from "react";
import AddIcon from "@mui/icons-material/Add";
import intl from "react-intl-universal";
import { FieldItem, FieldMeta } from "./FieldItem";
import { useCreateAttribute } from "components/ModelBoard/hooks/useCreateAttribute";
import { useServiceId } from "components/ModelBoard/hooks/useServiceId";
import { useAlertError } from "recoil/hooks/useAlertError";

export const FieldList = memo(
  (props: {
    fields: FieldMeta[];
    withEntityType?: boolean;
    onChange: (fields: FieldMeta[]) => void;
    title?: string;
    prefix?: string;
  }) => {
    const { fields, withEntityType, onChange, title, prefix } = props;
    const serviceId = useServiceId();
    const createAttribute = useCreateAttribute(serviceId, prefix);
    const alertError = useAlertError();

    const handleAdd = useCallback(() => {
      const attr = createAttribute(fields);
      onChange([...fields, attr]);
    }, [createAttribute, fields, onChange]);

    const handleDelete = useCallback(
      (uuid: string) => {
        onChange(fields.filter((fd) => fd.uuid !== uuid));
      },
      [fields, onChange]
    );

    const handleChange = useCallback(
      (field: FieldMeta) => {
        if (
          fields
            .filter((fd) => fd.uuid !== field.uuid)
            .find((fd) => fd.name === field.name)
        ) {
          alertError(intl.get("error-name-repeat"));
          return;
        }
        onChange(fields.map((fd) => (fd.uuid === field.uuid ? field : fd)));
      },
      [alertError, fields, onChange]
    );

    return (
      <Grid container item xs={12} spacing={2} sx={{ pb: 4 }}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "0.9rem" }}>
            {title || intl.get("field-list")}
          </Typography>
          <IconButton size="small" onClick={handleAdd}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Grid>
        {fields.map((field) => {
          return (
            <FieldItem
              key={field.uuid}
              field={field}
              withEntityType={withEntityType}
              onDelete={handleDelete}
              onChange={handleChange}
            />
          );
        })}
      </Grid>
    );
  }
);
