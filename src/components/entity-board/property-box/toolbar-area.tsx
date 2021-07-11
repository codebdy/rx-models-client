import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

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
