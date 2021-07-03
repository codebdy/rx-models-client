import React from 'react';
import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginLeft:theme.spacing(1),
      fontSize:'0.95rem',
    },
  }),
);

export default function ToolbarTitle(props:{
  children?:any,
}){
  const classes = useStyles();
  return (
    <Typography variant="subtitle1" className = {classes.root}>
      {props.children}
    </Typography>
  )
}
