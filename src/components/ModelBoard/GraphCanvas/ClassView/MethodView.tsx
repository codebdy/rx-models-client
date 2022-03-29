import React, { useState } from "react";
import { Theme, IconButton, Typography, Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import classNames from "classnames";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { MethodMeta } from "components/ModelBoard/meta/MethodMeta";

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

export default function MethodView(props: {
  method: MethodMeta;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const { method, onClick, onDelete } = props;
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [isSelected, setIsSelected] = React.useState(false);

  const isId = method.name === "id";

  const handleClick = () => {
    onClick(method.uuid);
  };

  const handleDeleteClick = () => {
    onDelete(method.uuid);
  };

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
          color: (theme) => (isId ? theme.palette.text.secondary : undefined),
        }}
      >
        <Typography
          sx={{
            marginLeft: "3px",
          }}
        >
          {method.name}
        </Typography>
        :
        <Typography
          sx={{
            fontSize: "0.8rem",
            marginLeft: "5px",
          }}
        >
          {method.type}
        </Typography>
      </Box>
      {hover && (
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
