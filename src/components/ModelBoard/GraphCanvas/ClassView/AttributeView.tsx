import React, { useCallback, useEffect, useState } from "react";
import { Theme, IconButton, Typography, Box, alpha } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import classNames from "classnames";
import { AttributeMeta } from "components/ModelBoard/meta/AttributeMeta";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { CONST_ID } from "components/ModelBoard/meta/Meta";
import {
  EVENT_ELEMENT_SELECTED_CHANGE,
  offCanvasEvent,
  onCanvasEvent,
} from "../events";
import { StereoType } from "components/ModelBoard/meta/ClassMeta";
import { useMountRef } from "./useMountRef";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hover: {
      background: alpha(theme.palette.primary.main, 0.1),
    },
    selected: {
      background: alpha(theme.palette.primary.main, 0.3),
    },
    property: {
      position: "relative",
      fontSize: "0.9rem",
      padding: "2px 0",
      display: "flex",
    },
    propertyTools: {
      zIndex: 1,
      position: "absolute",
      right: "4px",
      top: "0",
    },
    propertyButton: {
      width: "24px",
      height: "24px",
    },
  })
);

export default function AttributeView(props: {
  attr: AttributeMeta;
  stereoType: StereoType;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
  readOnly?: boolean;
}) {
  const { attr, stereoType, onClick, onDelete, readOnly = false } = props;
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [isSelected, setIsSelected] = React.useState(false);
  const mountRef = useMountRef();

  const isId = attr.name === CONST_ID;

  const handleChangeSelected = useCallback(
    (event: Event) => {
      const selectedId = (event as CustomEvent).detail;
      if (mountRef.current) {
        setIsSelected(selectedId === attr.uuid);
      }
    },
    [attr.uuid, mountRef]
  );

  useEffect(() => {
    onCanvasEvent(EVENT_ELEMENT_SELECTED_CHANGE, handleChangeSelected);
    return () => {
      offCanvasEvent(EVENT_ELEMENT_SELECTED_CHANGE, handleChangeSelected);
    };
  }, [handleChangeSelected]);

  const handleClick = useCallback(() => {
    onClick(attr.uuid);
  }, [attr.uuid, onClick]);

  const handleDeleteClick = useCallback(() => {
    onDelete(attr.uuid);
  }, [attr.uuid, onDelete]);

  return (
    <div
      className={classNames(classes.property, {
        [classes.hover]: !readOnly && hover,
        [classes.selected]: isSelected,
      })}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          opacity: (theme) => (isId ? 0.8 : undefined),
        }}
      >
        <Typography
          sx={{
            marginLeft: "3px",
          }}
        >
          {attr.name}
        </Typography>
        {stereoType !== StereoType.Enum && (
          <>
            :
            <Typography
              sx={{
                fontSize: "0.8rem",
                marginLeft: "5px",
              }}
            >
              {attr.typeLabel}
            </Typography>
          </>
        )}
      </Box>
      {hover && !readOnly && !isId && (
        <Box
          sx={{
            zIndex: 1,
            position: "absolute",
            right: "4px",
            top: "0",
            borderRadius:"50%",
            background: (theme) => theme.palette.background.paper,
          }}
        >
          <IconButton
            sx={{
              width: "24px",
              height: "24px",
            }}
            onClick={handleDeleteClick}
            size="large"
          >
            <DeleteOutlineOutlinedIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      )}
    </div>
  );
}
