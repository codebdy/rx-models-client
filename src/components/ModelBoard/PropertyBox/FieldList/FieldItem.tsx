import {
  Box,
  Typography,
  IconButton,
  Popover,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React from "react";
import intl from "react-intl-universal";
import { TypeInput } from "../TypeInput";
import { ValueType } from "components/ModelBoard/meta/ValueType";
import { useServiceId } from "components/ModelBoard/hooks/useServiceId";
import { useGetClass } from "components/ModelBoard/hooks/useGetClass";

export interface FieldMeta {
  name: string;
  uuid: string;
  type: ValueType;
  typeUuid?: string;
}

export const FieldItem = memo(
  (props: {
    field: FieldMeta;
    withEntityType?: boolean;
    onDelete: (uuid: string) => void;
    onChange: (field: FieldMeta) => void;
  }) => {
    const { field, withEntityType, onDelete, onChange } = props;
    const [name, setName] = useState(field.name);
    const [type, setType] = useState(field.type);
    const [typeUuid, setTypeUuid] = useState(field.typeUuid);
    useEffect(() => {
      setName(field.name);
      setType(field.type);
      setTypeUuid(field.typeUuid);
    }, [field]);

    const serviceId = useServiceId();
    const getClass = useGetClass(serviceId);

    const typeName = useMemo(() => {
      if (
        field.type === ValueType.ID ||
        field.type === ValueType.Boolean ||
        field.type === ValueType.Int ||
        field.type === ValueType.Float ||
        field.type === ValueType.String ||
        field.type === ValueType.Date ||
        field.type === ValueType.IDArray ||
        field.type === ValueType.IntArray ||
        field.type === ValueType.FloatArray ||
        field.type === ValueType.StringArray ||
        field.type === ValueType.DateArray
      ) {
        return field.type;
      } else {
        const cls = getClass(field.typeUuid || "");
        if (!cls) {
          return "";
        }
        if (
          field.type === ValueType.Enum ||
          field.type === ValueType.ValueObject ||
          field.type === ValueType.ClassType
        ) {
          return cls.name;
        } else if (
          field.type === ValueType.EnumArray ||
          field.type === ValueType.ValueObjectArray ||
          field.type === ValueType.ClassTypeArray
        ) {
          return `${cls.name}[]`;
        }
      }
    }, [field.type, field.typeUuid, getClass]);

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
      setName(field.name);
      setType(field.type);
      setTypeUuid(field.typeUuid);
    }, [field]);

    const open = Boolean(anchorEl);

    const handleNameChange = useCallback(
      (event: React.ChangeEvent<{ value: string }>) => {
        setName(event.target.value);
      },
      []
    );

    const handleTypeChange = useCallback((vType: ValueType) => {
      setType(vType);
    }, []);

    const handleTypeUuidChange = useCallback((typeUuid?: string) => {
      setTypeUuid(typeUuid);
    }, []);

    const handleDelete = useCallback(() => {
      onDelete(field.uuid);
    }, [field.uuid, onDelete]);

    const handleConfirm = useCallback(() => {
      onChange({ ...field, name, type, typeUuid });
      setAnchorEl(null);
    }, [field, name, onChange, type, typeUuid]);

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
        <Typography>
          {field.name}
          {typeName ? ":" + typeName : ""}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <IconButton size="small" onClick={handleClick}>
            <ModeEditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={handleDelete}>
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
              <TextField
                size="small"
                value={name || ""}
                fullWidth
                label={intl.get("name")}
                onChange={handleNameChange}
              />
            </Grid>
            <TypeInput
              valueType={type}
              typeUuid={typeUuid}
              withEntityType={withEntityType}
              onTypeChange={handleTypeChange}
              onTypeUuidChange={handleTypeUuidChange}
            />
            <Grid item xs={12}>
              <Button color="inherit" size="small" onClick={handleClose}>
                {intl.get("cancel")}
              </Button>
              <Button
                variant="contained"
                size="small"
                sx={{ ml: 2 }}
                onClick={handleConfirm}
              >
                {intl.get("confirm")}
              </Button>
            </Grid>
          </Grid>
        </Popover>
      </Box>
    );
  }
);
