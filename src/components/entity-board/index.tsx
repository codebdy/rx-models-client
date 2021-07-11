import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { EntityTree } from './entity-tree';
import { GraphCanvas } from './grahp-canvas';
import classNames from 'classnames';
import { EntityBoardStore } from './store/entity-board';
import { ModelStoreProvider } from './store';
import { Toolbox } from './toolbox';
import { PropertyBox } from './property-box';
import { EntityToolbar } from './entity-toolbar';
import { observer } from 'mobx-react';
import { useMagicQuery } from 'data/use-magic-query';
import { MagicQueryBuilder } from 'data/magic-query-builder';
import { useShowServerError } from 'store/helpers/use-show-server-error';
import Loading from 'components/common/loading';
import { PackageMeta } from './meta/package-meta';
import EmpertyCanvas from './emperty-canvas';

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
    canvasShell:{
      flex:1,
      display:'flex',
    },
  }),
);

export const ModelsBoard = observer(()=>{
  const classes = useStyles();
  const [modelStore, setModelStore] = useState(new EntityBoardStore([]));
  const {data, error, loading} = useMagicQuery<PackageMeta[]>(new MagicQueryBuilder().setModel('RxPackage'));

  useShowServerError(error);

  useEffect(()=>{
    setModelStore(new EntityBoardStore((data?.data)||[]));
  }, [data]);

  return (
    <ModelStoreProvider value = {modelStore}>
      <div className={classes.root}>
        <EntityToolbar />
        {
          loading
          ? <Loading/>
          : <div className = {classNames(classes.content, 'dragit-scrollbar')}>
            <EntityTree></EntityTree>
            {
              modelStore.openedDiagram 
              ? <>
                  <Toolbox></Toolbox>
                  <div className = {classes.canvasShell}>
                    <GraphCanvas></GraphCanvas>
                  </div>
                  
                </>
              : <EmpertyCanvas></EmpertyCanvas>
            }
            <PropertyBox></PropertyBox>
          </div>
        }

      </div>
    </ModelStoreProvider>
  )
})
