import { Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import { useState } from "react";
import { NodeAction } from "./NodeAction";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      padding: "5px 0",
      position: "relative",
      userSelect: "none",
    },
  })
);

export function TreeNodeLabel(props: {
  children: any;
  action?: any;
  onClick?: (event: React.MouseEvent) => void;
  onDragStart?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) {
  const { action, children, onClick, onDragStart } = props;
  const classes = useStyles();
  const [hover, setHover] = useState(false);

  return (
    <div
      className={classes.root}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      onDragStart={onDragStart}
      draggable
    >
      {children}
      {hover && <NodeAction>{action}</NodeAction>}
    </div>
  );
}
