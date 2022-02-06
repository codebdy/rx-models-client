import React from 'react';
import { Theme } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:1,
    },
  }),
);

export default function Spacer(){
  const classes = useStyles();
  return (
    <div className={classes.root}>
    </div>
  )
}
