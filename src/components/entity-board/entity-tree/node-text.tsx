import { Theme, Typography } from "@mui/material";

import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
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
      component = 'div'
      className={classes.labelText}
    >
      {props.children}
    </Typography>    
  )
}
