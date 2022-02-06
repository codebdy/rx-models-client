import { Theme } from "@mui/material";

import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding:theme.spacing(1, 0),
      display:'flex',
      alignItems:'center',
      fontSize:'0.9rem'
    },
  }),
);

export function PackageLabel(props:{
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