import { memo, useCallback, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Collapse, Typography } from "@mui/material";

export const RelationBlockCollapse = memo(
  (props: { title: string; children: React.ReactNode }) => {
    const { title, children } = props;
    const [expanded, setExpanded] = useState(false);
    const handleToggle = useCallback(() => {
      setExpanded((a) => !a);
    }, []);

    return (
      <>
        <Box
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
          }}
          onClick={handleToggle}
        >
          <Typography variant="subtitle1">{title}</Typography>
          {expanded ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />}
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      </>
    );
  }
);
