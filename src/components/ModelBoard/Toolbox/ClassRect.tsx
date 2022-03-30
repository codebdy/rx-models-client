import { Box, Typography } from "@mui/material";
import { memo } from "react";

export const ClassRect = memo(
  (props: { stereoChar?: string; oneBorder: boolean }) => {
    const { stereoChar, oneBorder } = props;
    return (
      <Box
        sx={{
          width: "45px",
          height: "30px",
          border: "solid 2px",
          display: "flex",
          flexFlow: "column",
          padding: "0",
          borderRadius: "3px",
          mt: 0,
          mb: 0.5,
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        <Box
          sx={{
            height: stereoChar ? "60%" : "30%",
            width: "100%",
            borderBottom: "solid 1px",
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: "0.2rem" }}>
            {stereoChar ? `<${stereoChar}>` : ""}
          </Typography>
        </Box>

        <Box
          sx={{
            height: "10%",
            width: "100%",
            borderBottom: oneBorder ? "" : "solid 1px",
          }}
        ></Box>
      </Box>
    );
  }
);
