import { Theme } from "@mui/material";

import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';

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
