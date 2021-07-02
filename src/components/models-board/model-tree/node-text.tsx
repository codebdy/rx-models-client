import { makeStyles, Theme, createStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
    margintLeft:'4px',
    marginLeft: theme.spacing(1),
  },  

}),
);

export function NodeText(props:{
  children:any,
}){
const classes = useStyles();

return(
  <Typography variant="body2" 
    className={classes.labelText}
  >
    {props.children}
  </Typography>    
)
}
