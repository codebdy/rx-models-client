import { Typography } from "@mui/material";

export function NodeText(props: { children: any }) {
  return (
    <Typography variant="body2" sx={{ pl: 1 }}>
      {props.children}
    </Typography>
  );
}
