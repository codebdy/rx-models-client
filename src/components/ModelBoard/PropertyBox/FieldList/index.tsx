import { Grid, IconButton, Typography } from "@mui/material";
import { memo } from "react";
import AddIcon from "@mui/icons-material/Add";
import intl from "react-intl-universal";
import { FieldItem, FieldMeta } from "./FieldItem";

export const FieldList = memo(
  (props: { fields: FieldMeta[]; withEntityType?: boolean }) => {
    const { fields, withEntityType } = props;

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
            {intl.get("field-list")}
          </Typography>
          <IconButton size="small">
            <AddIcon fontSize="small" />
          </IconButton>
        </Grid>
        {fields.map((field) => {
          return <FieldItem key={field.uuid} field = {field} withEntityType = {withEntityType}/>;
        })}
      </Grid>
    );
  }
);
