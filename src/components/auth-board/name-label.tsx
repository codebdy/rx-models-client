import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginLeft:theme.spacing(1),
    },
  }),
);

export function NameLabel(props:{
  children:any,
}){
  const {children} = props;
  const classes = useStyles();
  return(
    <div className = {classes.root}>
      {children}
    </div>
  )
}