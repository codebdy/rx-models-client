import React from 'react';
import { Theme, Container } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import { Topbar } from './topbar';
import classNames from 'classnames';
import { TreeView } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { API_PUSLISHED_SCHEMA } from 'apis/auth';
import { useShowServerError } from 'store/helpers/use-show-server-error';
import { PackageMeta } from 'components/EntityBoard/meta/package-meta';
import { PackageNode } from './package-node';
import Loading from 'components/common/loading';
import { useState } from 'react';
import { useEffect } from 'react';
import { ENTITY_AUTH_QUERY } from './consts';
import { AuthBoardStore } from './store/auth-board-store';
import { AuthStoreProvider } from './store/helper';
import { observer } from 'mobx-react';
import { RxEntityAuthSettings } from 'entity-interface/RxEntityAuthSettings';
import { useMagicQuery, useSWRQuery } from '@rxdrag/rxmodels-swr';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop:theme.spacing(2),
      flex: 1,
      display: 'flex',
      flexFlow: 'column',
      height: 0,
    },
    container:{
      flex: 1,
      display: 'flex',
      flexFlow: 'column',
      height: 0,
    },
    belowContent:{
      flex: 1,
      border:`${theme.palette.divider} solid 1px`,
      overflow: 'auto',
      height: '0',
      marginTop: theme.spacing(1),
      padding: theme.spacing(2),
    },
    nodeLabel:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    actions:{
      width:'800px',
    },
    actionGrid:{
      width: '16.6%'
    }
  }),
);

export const AuthBoard = observer(()=>{
  const classes = useStyles();
  const [boardStore] = useState(new AuthBoardStore());
  const [entityAuths, setEntityAuths] = useState<RxEntityAuthSettings[]>([]);
  const {data, loading, error} = useSWRQuery<PackageMeta[]>(API_PUSLISHED_SCHEMA);
  const {data:authData, loading:authLoading, error:authError} = useMagicQuery<RxEntityAuthSettings[]>(
    ENTITY_AUTH_QUERY,
  )

  useEffect(()=>{
    boardStore.setPackages(data||[]);
  },[boardStore, data])

  useEffect(()=>{
    setEntityAuths(authData?.data || []);
  }, [authData])

  useShowServerError(error||authError);


  return (
    <AuthStoreProvider value = {boardStore}>
      <Container className={classNames(classes.root, 'dragit-scrollbar')} maxWidth = "lg">
        {
          loading || authLoading
          ? <Loading />
          : <div className = {classes.container}>
              <Topbar/>
              <div className = {classes.belowContent}>
              <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                selected = ''
              >
                {
                  data?.map(aPackage=>{
                    return(
                      <PackageNode 
                        key={aPackage.uuid} 
                        packageMeta = {aPackage} 
                        entityAuths = {entityAuths}
                      />
                    )
                  })
                }
              </TreeView>
              </div>
            </div>        
        }
      </Container>
    </AuthStoreProvider>
  )
})
