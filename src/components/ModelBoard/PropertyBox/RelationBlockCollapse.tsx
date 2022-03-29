import { memo, useCallback, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Collapse, Paper, Typography } from "@mui/material";

export const RelationBlockCollapse = memo(
  (props: {
    title: string;
    children: React.ReactNode;
    defaultExpand?: boolean;
  }) => {
    const { title, children, defaultExpand } = props;
    const [expanded, setExpanded] = useState(defaultExpand);
    const handleToggle = useCallback(() => {
      setExpanded((a) => !a);
    }, []);

    return (
      <>
        <Paper
          sx={{
            width: "100%",
            cursor: "pointer",
            display: "flex",
            flexFlow: "row",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
            pl: 2,
            zIndex: 1,
            mr: -2,
          }}
          square
          onClick={handleToggle}
        >
          <Typography variant="subtitle1">{title}</Typography>
          {expanded ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />}
        </Paper>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      </>
    );
  }
);
