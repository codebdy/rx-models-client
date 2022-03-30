import { Box, Grid, IconButton, Typography } from "@mui/material";
import { memo } from "react";
import AddIcon from "@mui/icons-material/Add";
import intl from "react-intl-universal";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const FieldList = memo(() => {
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
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          "&:hover": {
            background: (theme) => theme.palette.action.hover,
          },
          ml: 1,
          mr: 0,
          pt: 0.5,
          pb: 0.5,
          pl: 1,
          borderRadius: 1,
        }}
      >
        <Typography>alt:String</Typography>
        <Box sx={{ display: "flex" }}>
          <IconButton size="small">
            <ModeEditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Grid>
  );
});
