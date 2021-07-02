import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    position:'absolute',
    right:'5px',
  }

}),
);

export function NodeAction(props:{
  children:any,
}){
const classes = useStyles();

return(
  <div className={classes.root}>
    {props.children}
  </div>    
)
}
