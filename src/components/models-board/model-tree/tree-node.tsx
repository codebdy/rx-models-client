import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    display:'flex',
    alignItems: 'center',
    padding:'5px 0',
    position:'relative',
  },  

}),
);

export function TreeNode(props:{
  children:any,
}){
const classes = useStyles();

return(
  <div
    className={classes.root}
  >
    {props.children}
  </div>    
)
}
