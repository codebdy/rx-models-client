import React from 'react';
import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import ToolbarArea from './toolbar-area';
import ToolbarTitle from './toolbar-title';
import intl from 'react-intl-universal';
import { observer } from 'mobx-react';
import { useModelsBoardStore } from '../store';
import { PackageStore } from '../store/package';
import { PackagePanel } from './package-pannel';
import { ClassStore } from '../store/class-store';
import { ClassPanel } from './class-pannel';
import { ColumnStore } from '../store/column';
import { ColumnPanel } from './column-pannel';
import { RelationStore } from '../store/relation';
import { RelationPanel } from './relation-pannel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display:'flex',
      flexFlow:'column',
      borderLeft: `solid 1px ${theme.palette.divider}`,
      width:'260px',
    },
    propertiesArea:{
      padding:theme.spacing(2),
      flex:1,
      overflow:'auto'
    }
  }),
);

export const PropertyBox = observer(()=>{
  const classes = useStyles();
  const boardStore = useModelsBoardStore();

  return (
    <div className={classes.root}>
      <ToolbarArea>
        <ToolbarTitle>{intl.get('properties')}</ToolbarTitle>
      </ToolbarArea>
      <div className = {classes.propertiesArea}>
        <Grid container spacing = {2}>
          {
            boardStore?.selectedNode instanceof PackageStore &&
            <PackagePanel packageStore = {boardStore.selectedNode} />
          }
          {
            boardStore?.selectedNode instanceof ClassStore &&
            <ClassPanel classStore = {boardStore.selectedNode} />            
          }
          {
            boardStore?.selectedNode instanceof ColumnStore &&
            <ColumnPanel columnStore = {boardStore.selectedNode} />            
          }
          {
            boardStore?.selectedNode instanceof RelationStore &&
            <RelationPanel relationStore = {boardStore.selectedNode} />            
          }

          {
            !boardStore?.selectedNode &&
            <Grid item>{intl.get('no-selected')}</Grid>
          }
        </Grid>
      </div>
    </div>
  )
})
