import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import ToolbarArea from './toolbar-area';
import ToolbarTitle from './toolbar-title';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display:'flex',
      flexFlow:'column',
      borderLeft: `solid 1px ${theme.palette.divider}`,
      width:'260px',
    },
  }),
);

export default function RightArea(){
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ToolbarArea>
        <ToolbarTitle>属性</ToolbarTitle>
      </ToolbarArea>
    </div>
  )
}
