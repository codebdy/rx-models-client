import { Box } from "@mui/material";
import { memo } from "react";

export const ClassRect = memo((props: { first?: boolean }) => {
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
        mt: props.first ? 0 : 2,
      }}
    >
      <Box
        sx={{
          height: "30%",
          width: "47px",
          borderBottom: "solid 1px",
          marginLeft: "-1px",
        }}
      ></Box>
      <Box
        sx={{
          height: "30%",
          width: "47px",
          borderBottom: "solid 1px",
          marginLeft: "-1px",
        }}
      ></Box>
    </Box>
  );
});
