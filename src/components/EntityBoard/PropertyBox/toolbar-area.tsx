import React from 'react';
import { Theme } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display:'flex',
      width:'100%',
      height:'40px',
      borderBottom: `solid 1px ${theme.palette.divider}`,
      alignItems:'center',
    },
  }),
);

export default function ToolbarArea(props:{
  children?:any
}){
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {props.children}
    </div>
  )
}
