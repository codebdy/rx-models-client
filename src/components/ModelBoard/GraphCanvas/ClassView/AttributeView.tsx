import React, { useState } from "react";
import { Theme, IconButton, Typography, Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import classNames from "classnames";
import { AttributeMeta } from "components/ModelBoard/meta/AttributeMeta";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { CONST_ID } from "components/ModelBoard/meta/Meta";

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
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
  isSelected?: boolean;
  readOnly?: boolean;
}) {
  const { attr, onClick, onDelete, isSelected, readOnly = false } = props;
  const classes = useStyles();
  const [hover, setHover] = useState(false);

  const isId = attr.name === CONST_ID;

  const handleClick = () => {
    onClick(attr.uuid);
  };

  const handleDeleteClick = () => {
    onDelete(attr.uuid);
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
        :
        <Typography
          sx={{
            fontSize: "0.8rem",
            marginLeft: "5px",
          }}
        >
          {attr.type}
        </Typography>
      </Box>
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
