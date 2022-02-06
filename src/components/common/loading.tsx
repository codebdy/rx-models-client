import React from 'react';
import { Theme, CircularProgress } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position:'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width:'100%',
      height:'100%',
    },

  }),
);

export default function Loading(){
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  )
}
