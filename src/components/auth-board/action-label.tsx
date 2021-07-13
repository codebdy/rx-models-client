import { makeStyles, Theme, createStyles } from "@material-ui/core";

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