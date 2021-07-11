import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
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
