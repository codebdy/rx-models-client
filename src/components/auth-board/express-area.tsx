import { Theme, Grid } from "@mui/material";

import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    expressAtion: {
      width:'160px',
    },
  }),
);

export function ExpressArea(props:{
  children:any,
}){
  const {children} = props;
  const classes = useStyles();
  return(
    <Grid container className = {classes.expressAtion} alignItems = "center">
      {
        children
      }
    </Grid>
  )
}