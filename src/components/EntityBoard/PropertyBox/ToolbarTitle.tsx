import React from 'react';
import { Theme, Typography } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginLeft:theme.spacing(1),
      fontSize:'0.95rem',
      color: theme.palette.text.primary,
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
