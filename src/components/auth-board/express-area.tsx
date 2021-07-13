import { makeStyles, Theme, createStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    expressAtion: {
      width:'300px',
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