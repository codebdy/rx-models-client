import React, { useState } from "react";
import { Theme, IconButton } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import classNames from "classnames";
import { AttributeMeta } from "components/EntityBoard/meta/AttributeMeta";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hover: {
      background: "rgba(80,111,226,0.05)",
    },
    selected: {
      background: "rgba(80,111,226,0.1)",
    },
    name: {
      marginLeft: "3px",
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

    typeText: {
      fontSize: "0.8rem",
      marginLeft: "5px",
    },

  })
);

export default function ColumnView(props: {
  column: AttributeMeta;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
  isSelected?: boolean;
  readOnly?: boolean;
  isInterface: boolean;
}) {
  const {
    column,
    onClick,
    onDelete,
    isSelected,
    readOnly = false,
    isInterface,
  } = props;
  const classes = useStyles();
  const [hover, setHover] = useState(false);

  const isId = column.name === "id" && !isInterface;

  const handleClick = () => {
    onClick(column.uuid);
  };

  const handleDeleteClick = () => {
    onDelete(column.uuid);
  };

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
      <span className={classes.name}>{column.name}</span>:
      <span className={classes.typeText}>{column.type}</span>
      {hover && !readOnly && !isId && (
        <div className={classes.propertyTools}>
          <IconButton
            className={classes.propertyButton}
            onClick={handleDeleteClick}
            size="large"
          >
            <DeleteOutlineOutlinedIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </div>
      )}
    </div>
  );
}
