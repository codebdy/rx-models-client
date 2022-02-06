import { Theme } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display:'flex',
      justifyContent: 'space-between',
      fontSize:'0.9rem',
      minHeight:theme.spacing(5),
      alignItems: 'center',
    },
  }),
);

export function NodeLabel(props:{
  onMouseOver?:()=>void,
  onMouseLeave?:()=>void,
  children:any,
}){
  const {onMouseOver, onMouseLeave, children} = props;
  const classes = useStyles();
  return(
    <div 
      className = {classes.root}
      onMouseOver = {onMouseOver}
      onMouseLeave = {onMouseLeave}  
    >
      {children}
    </div>
  )
}