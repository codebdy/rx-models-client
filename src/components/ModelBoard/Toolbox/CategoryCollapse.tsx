import { memo, useCallback, useMemo, useState } from "react";
import { Box, Collapse, Paper, Typography, useTheme } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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

    const theme = useTheme();
    const color = useMemo(() => {
      return disabled
        ? theme.palette.action.disabled
        : theme.palette.text.secondary;
    }, [disabled, theme.palette.action.disabled, theme.palette.text.secondary]);

    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexFlow: "column",
        }}
      >
        <Paper
          sx={{
            cursor: "pointer",
            display: "flex",
            flexFlow: "row",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1,
            p: 0.5,
            pl: 1,
          }}
          square
          onClick={handleToggle}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: color,
            }}
          >
            {title}
          </Typography>
          {expanded && !disabled ? (
            <KeyboardArrowDownIcon
              sx={{
                color: color,
              }}
              fontSize="small"
            />
          ) : (
            <ChevronRightIcon
              sx={{
                color: color,
              }}
              fontSize="small"
            />
          )}
        </Paper>
        <Collapse
          in={expanded && !disabled}
          timeout="auto"
          unmountOnExit
          sx={{ p: 2 }}
        >
          {children}
        </Collapse>
      </Box>
    );
  }
);
