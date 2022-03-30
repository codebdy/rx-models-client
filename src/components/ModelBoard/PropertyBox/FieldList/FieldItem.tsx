import {
  Box,
  Typography,
  IconButton,
  Popover,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { memo, useCallback } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React from "react";
import intl from "react-intl-universal";
import { ValueType } from "components/ModelBoard/meta/ValueType";
import { useServiceId } from "components/ModelBoard/hooks/useServiceId";
import { useEnums } from "components/ModelBoard/hooks/useEnums";

export const FieldItem = memo(() => {
  const serviceId = useServiceId();
  const enums = useEnums(serviceId);

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
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth size="small">
              <InputLabel>{intl.get("data-type")}</InputLabel>
              <Select
                //value={attribute.type}
                //onChange={handleTypeChange}
                label={intl.get("data-type")}
              >
                <MenuItem value={ValueType.ID}>ID</MenuItem>
                <MenuItem value={ValueType.Int}>Int</MenuItem>
                <MenuItem value={ValueType.Float}>Float</MenuItem>
                <MenuItem value={ValueType.Boolean}>Boolean</MenuItem>
                <MenuItem value={ValueType.String}>String</MenuItem>
                <MenuItem value={ValueType.Date}>Date</MenuItem>
                <MenuItem value={ValueType.Enum}>{intl.get("enum")}</MenuItem>
                <MenuItem value={ValueType.ValueObject}>
                  {intl.get("value-object")}
                </MenuItem>
                <MenuItem value={ValueType.IDArray}>
                  ID {intl.get("array")}
                </MenuItem>
                <MenuItem value={ValueType.IntArray}>
                  Int {intl.get("array")}
                </MenuItem>
                <MenuItem value={ValueType.FloatArray}>
                  Float {intl.get("array")}
                </MenuItem>
                <MenuItem value={ValueType.StringArray}>
                  String {intl.get("array")}
                </MenuItem>
                <MenuItem value={ValueType.DateArray}>
                  Date {intl.get("array")}
                </MenuItem>
                <MenuItem value={ValueType.EnumArray}>
                  {intl.get("enum")}
                  {intl.get("array")}
                </MenuItem>
                <MenuItem value={ValueType.ValueObjectArray}>
                  {intl.get("value-object")}
                  {intl.get("array")}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth size="small">
              <InputLabel>{intl.get("enum-class")}</InputLabel>
              <Select
                //value={attribute.typeUuid || ""}
                //onChange={handleTypeEntiyChange}
                label={intl.get("enum-class")}
              >
                {enums.map((enumEntity) => {
                  return (
                    <MenuItem key={enumEntity.uuid} value={enumEntity.uuid}>
                      {enumEntity.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
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
