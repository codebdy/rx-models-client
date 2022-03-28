import { Box, Typography } from "@mui/material";
import { memo } from "react";

export const ClassRect = memo(
  (props: { first?: boolean; stereoType?: string }) => {
    const { first, stereoType } = props;
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
          mt: first ? 0 : 2,
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        <Box
          sx={{
            height: stereoType ? "60%" : "30%",
            width: "47px",
            borderBottom: "solid 1px",
            marginLeft: "-1px",
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: "0.2rem" }}>
            {stereoType ? `<${stereoType}>` : ""}
          </Typography>
        </Box>
        
          <Box
            sx={{
              height: "10%",
              width: "47px",
              borderBottom: "solid 1px",
              marginLeft: "-1px",
            }}
          ></Box>
        
      </Box>
    );
  }
);
