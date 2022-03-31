import { Box } from "@mui/material";
import { useState } from "react";
import { NodeAction } from "./NodeAction";

export function TreeNodeLabel(props: {
  children: any;
  action?: any;
  onClick?: (event: React.MouseEvent) => void;
  onDragStart?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  color?: string;
}) {
  const { action, children, onClick, onDragStart, color } = props;
  const [hover, setHover] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "5px 0",
        position: "relative",
        userSelect: "none",
        color: color || ((theme) => theme.palette.text.primary),
      }}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      onDragStart={onDragStart}
      draggable
    >
      {children}
      {hover && <NodeAction>{action}</NodeAction>}
    </Box>
  );
}
