import { Theme } from "@mui/material";

import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize:'0.9rem'
    },
  }),
);

export function ActionLabel(props:{
  children:any,
}){
  const {children} = props;
  const classes = useStyles();
  return(
    <span className = {classes.root}>
      {children}
    </span>
  )
}