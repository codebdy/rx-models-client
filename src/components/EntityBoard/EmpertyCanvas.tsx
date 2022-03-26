import React from 'react';
import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
//import welcomeImage from "assets/img/welcome.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width:'100%',
      height:'100%',
      opacity:'0.6',
      //backgroundImage:`url(${welcomeImage})`,
      //backgroundRepeat: 'no-repeat',
      //backgroundSize: 'cover',
      background: theme.palette.background.paper,
    },

  }),
);

export default function EmpertyCanvas(){
  const classes = useStyles();
  return (
    <div className={classes.root}>
    </div>
  )
}
