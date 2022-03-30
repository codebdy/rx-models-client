import {
  Box,
  Typography,
  IconButton,
  Popover,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { memo, useCallback } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React from "react";
import intl from "react-intl-universal";
import { TypeInput } from "../TypeInput";
import { ValueType } from "components/ModelBoard/meta/ValueType";

export interface FieldMeta {
  name: string;
  uuid: string;
  type: ValueType;
  typeUuid?: string;
}

export const FieldItem = memo(
  (props: { field: FieldMeta; withEntityType?: boolean }) => {
    const { field, withEntityType } = props;
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
      null
    );

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      },
      []
    );

    const handleClose = useCallback(() => {
      setAnchorEl(null);
    }, []);

    const open = Boolean(anchorEl);

    const handleTypeChange = useCallback(() => {}, []);

    const handleTypeUuidChange = useCallback(() => {}, []);

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
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Grid container spacing={2} sx={{ p: 2, width: 260 }}>
            <Grid item xs={12}>
              <TextField size="small" fullWidth label={intl.get("name")} />
            </Grid>
            <TypeInput
              valueType={field.type}
              typeUuid={field.typeUuid}
              withEntityType={withEntityType}
              onTypeChange={handleTypeChange}
              onTypeUuidChange={handleTypeUuidChange}
            />
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
  }
);
