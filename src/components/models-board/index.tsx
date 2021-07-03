import React, { useState } from 'react';
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
import { observer } from 'mobx-react';

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
    empertyCanvas: {
      flex: 1,
    }
  }),
);

export const ModelsBoard = observer(()=>{
  const [modelStore] = useState(new ModelsBoardStore(rootMeta));
  const classes = useStyles();
  return (
    <ModelStoreProvider value = {modelStore}>
      <div className={classes.root}>
      <ModelToolbar />
      <div className = {classNames(classes.content, 'dragit-scrollbar')}>
        <ModelTree></ModelTree>
        {
          modelStore.openedDiagram 
          ? <>
              <Toolbox></Toolbox>
              <GraphCanvas></GraphCanvas>
            </>
          : <div className={classes.empertyCanvas}></div>
        }
        <PropertyBox></PropertyBox>
      </div>
    </div>
    </ModelStoreProvider>
  )
})
