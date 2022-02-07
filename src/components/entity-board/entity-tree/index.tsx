import React from "react";
import { Box, Button, Theme, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import { EntityTreeView } from "./entity-tree-view";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexFlow: "column",
      borderRight: `solid 1px ${theme.palette.divider}`,
      width: "280px",
    },
    modelTree: {
      flex: 1,
      overflow: "auto",
    },
    miniMap: {
      borderTop: `solid 1px ${theme.palette.divider}`,
    },
  })
);

export const EntityTree = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box
        sx={{
          height: (theme) => theme.spacing(6),
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: (theme) => theme.palette.divider + " solid 1px",
          pl: 2,
          pr: 2,
        }}
      >
        <Typography>实体模型</Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddOutlinedIcon />}
        >
          添加节点
        </Button>
      </Box>
      <div className={classes.modelTree}>
        <EntityTreeView />
      </div>
      <div className={classes.miniMap} id="mini-map"></div>
    </div>
  );
};
