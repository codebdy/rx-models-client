import {
  Box,
  Typography,
  IconButton,
  Popover,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { memo } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React from "react";
import intl from "react-intl-universal";

export const FieldItem = memo(() => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
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
        <IconButton size="small" onClick={handleClick}>
          <ModeEditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        
      >
        <Grid container spacing={2} sx={{ p: 2, width: 300 }}>
          <Grid item xs={12}>
            <TextField size="small" fullWidth label={intl.get("name")} />
          </Grid>
          <Grid item xs={12}>
            <Button color="inherit" size="small" onClick={handleClose}>
              {intl.get("cancel")}
            </Button>
            <Button variant="contained" size="small" sx={{ ml: 2 }}>
              {intl.get("confirm")}
            </Button>
          </Grid>
        </Grid>
      </Popover>
    </Box>
  );
});
