import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { ModelTree } from './model-tree';
import { GraphCanvas } from './grahp-canvas';
import classNames from 'classnames';
import { ModelsBoardStore } from './store/models-board';
import { ModelStoreProvider } from './store';
import { rootMeta } from './store/mock';
import { Toolbox } from './toolbox';
import { PropertyBox } from './property-box';
import { ModelToolbar } from './model-toolbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:1,
      display:'flex',
      flexFlow:'column',
      height:'0',
    },
    content: {
      width:'100%',
      flex:1,
      display:'flex',
      height:'0',
    },
  }),
);

export default function ModelsBoard(){
  const modelStore = new ModelsBoardStore(rootMeta);
  const classes = useStyles();
  return (
    <ModelStoreProvider value = {modelStore}>
      <div className={classes.root}>
      <ModelToolbar />
      <div className = {classNames(classes.content, 'dragit-scrollbar')}>
        <ModelTree></ModelTree>
        <Toolbox></Toolbox>
        <GraphCanvas></GraphCanvas>
        <PropertyBox></PropertyBox>
      </div>
    </div>
    </ModelStoreProvider>
  )
}
