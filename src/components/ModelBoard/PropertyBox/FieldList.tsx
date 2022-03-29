import { Grid, Typography } from "@mui/material";
import { memo } from "react";

export const FieldList = memo(() => {
  return (
    <Grid container item xs={12} spacing={2}>
      <Grid
        item
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: "0.9rem" }}>字段列表</Typography>
      </Grid>
    </Grid>
  );
});
