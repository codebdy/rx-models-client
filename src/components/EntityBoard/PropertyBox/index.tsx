import React from 'react';
import { Theme, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import ToolbarArea from './toolbar-area';
import ToolbarTitle from './toolbar-title';
import intl from 'react-intl-universal';
import { observer } from 'mobx-react';
import { useEntityBoardStore } from '../store/helper';
import { PackageStore } from '../store/package';
import { PackagePanel } from './package-pannel';
import { EntityStore } from '../store/entity-store';
import { EntityPanel } from './entity-pannel';
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
  const boardStore = useEntityBoardStore();

  return (
    <div className={classes.root}>
      <ToolbarArea>
        <ToolbarTitle>{intl.get('properties')}</ToolbarTitle>
      </ToolbarArea>
      <div className = {classes.propertiesArea}>
        <Grid container spacing = {2}>
          {
            boardStore?.selectedElement instanceof PackageStore &&
            <PackagePanel packageStore = {boardStore.selectedElement} />
          }
          {
            boardStore?.selectedElement instanceof EntityStore &&
            <EntityPanel entityStore = {boardStore.selectedElement} />            
          }
          {
            boardStore?.selectedElement instanceof ColumnStore &&
            <ColumnPanel columnStore = {boardStore.selectedElement} />            
          }
          {
            boardStore?.selectedElement instanceof RelationStore &&
            <RelationPanel relationStore = {boardStore.selectedElement} />            
          }

          {
            !boardStore?.selectedElement &&
            <Grid item>{intl.get('no-selected')}</Grid>
          }
        </Grid>
      </div>
    </div>
  )
})
