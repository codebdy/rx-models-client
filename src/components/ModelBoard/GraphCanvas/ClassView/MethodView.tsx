import React, { useCallback, useEffect, useState } from "react";
import { Theme, IconButton, Typography, Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import classNames from "classnames";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { MethodMeta } from "components/ModelBoard/meta/MethodMeta";
import { useMountRef } from "./useMountRef";
import {
  EVENT_ELEMENT_SELECTED_CHANGE,
  offCanvasEvent,
  onCanvasEvent,
} from "../events";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hover: {
      background: "rgba(80,111,226,0.05)",
    },
    selected: {
      background: "rgba(80,111,226,0.1)",
    },
    property: {
      position: "relative",
      fontSize: "0.9rem",
      padding: "2px 0",
      display: "flex",
    },
  })
);

export default function MethodView(props: {
  method: MethodMeta;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const { method, onClick, onDelete } = props;
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [isSelected, setIsSelected] = React.useState(false);
  const mountRef = useMountRef();

  const handleClick = () => {
    onClick(method.uuid);
  };

  const handleDeleteClick = () => {
    onDelete(method.uuid);
  };

  const handleChangeSelected = useCallback(
    (event: Event) => {
      const selectedId = (event as CustomEvent).detail;
      if (mountRef.current) {
        setIsSelected(selectedId === method.uuid);
      }
    },
    [method.uuid, mountRef]
  );

  useEffect(() => {
    onCanvasEvent(EVENT_ELEMENT_SELECTED_CHANGE, handleChangeSelected);
    return () => {
      offCanvasEvent(EVENT_ELEMENT_SELECTED_CHANGE, handleChangeSelected);
    };
  }, [handleChangeSelected]);

  return (
    <div
      className={classNames(classes.property, {
        [classes.hover]: hover,
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
        }}
      >
        <Typography
          sx={{
            marginLeft: "3px",
          }}
        >
          {method.name}(
          {method.args.map((arg) => arg.name + ":" + arg.typeLabel).join(",")}
          {
            // method.args.length > 0
            //   ? "..."
            //   : ""
          }
          )
        </Typography>
        :
        <Typography
          sx={{
            fontSize: "0.8rem",
            marginLeft: "5px",
          }}
        >
          {method.typeLabel}
        </Typography>
      </Box>
      {hover && (
        <Box
          sx={{
            zIndex: 1,
            position: "absolute",
            right: "4px",
            top: "0",
            borderRadius: "50%",
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
