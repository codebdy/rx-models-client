import { alpha, useTheme } from "@mui/material";
import { useMemo } from "react";

export function useScrollbarStyles(fixed?: boolean) {
  const theme = useTheme();
  const styles = useMemo(
    () => ({
      //scrollbarGutter: "stable",
      "&::-webkit-scrollbar": {
        display: "block",
        width: "0.5rem",
        height: "0.5rem",
      },
      "&::-webkit-scrollbar-track": {
        borderRadius: 0,
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: "0.2rem",
        border: "transparent",

        background: fixed
          ? alpha(theme.palette.text.secondary, 0.2)
          : "transparent",
        "&:hover": {
          background: alpha(theme.palette.text.secondary, 0.4),
        },

        transition: "all .2s",
      },
      // "&:hover": {
      //   "&::-webkit-scrollbar-thumb": {
      //     background: alpha(theme.palette.text.secondary, 0.2),
      //     "&:hover": {
      //       background: alpha(theme.palette.text.secondary, 0.4),
      //     },
      //   },
      // },
      '&::-webkit-scrollbar-corner':{
        display: 'none',
      },
    }),
    [fixed, theme.palette.text.secondary]
  );
  return styles;
}
