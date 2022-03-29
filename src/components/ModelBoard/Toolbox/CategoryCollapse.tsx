import { memo, useCallback, useState } from "react";
import { Box, Collapse, Typography } from "@mui/material";

export const CategoryCollapse = memo(
  (props: {
    title: string;
    children: React.ReactNode;
    disabled?: boolean;
    defaultOpen?: boolean;
  }) => {
    const { title, children, disabled, defaultOpen } = props;
    const [expanded, setExpanded] = useState(defaultOpen);
    const handleToggle = useCallback(() => {
      setExpanded((a) => !a);
    }, []);

    return (
      <>
        <Box
          sx={{
            cursor: "pointer",
            display: "flex",
            flexFlow: "row",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
            borderBottom: (theme) => theme.palette.divider + " solid 1px",
            p: 0.5,
          }}
          onClick={handleToggle}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: (theme) =>
                disabled
                  ? theme.palette.action.disabled
                  : theme.palette.text.secondary,
            }}
          >
            {title}
          </Typography>
        </Box>
        <Collapse
          in={expanded && !disabled}
          timeout="auto"
          unmountOnExit
          sx={{ p: 2 }}
        >
          {children}
        </Collapse>
      </>
    );
  }
);
