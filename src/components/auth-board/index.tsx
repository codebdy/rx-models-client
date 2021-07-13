import React from 'react';
import { makeStyles, Theme, createStyles, Container} from '@material-ui/core';
import Topbar from './topbar';
import classNames from 'classnames';
import { TreeView } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { API_PUSLISHED_SCHEMA } from 'apis/auth';
import { useSWRQuery } from 'data/use-swr-query';
import { useShowServerError } from 'store/helpers/use-show-server-error';
import { PackageMeta } from 'components/entity-board/meta/package-meta';
import { PackageNode } from './package-node';
import Loading from 'components/common/loading';

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

export default function AuthBoard(){
  const classes = useStyles();
  const {data, loading, error} = useSWRQuery<PackageMeta[]>(API_PUSLISHED_SCHEMA);
  console.log(data);

  useShowServerError(error);

  return (
    <Container className={classNames(classes.root, 'dragit-scrollbar')} maxWidth = "lg">
      {
        loading 
        ? <Loading />
        : <div className = {classes.container}>
            <Topbar />
            <div className = {classes.belowContent}>
            <TreeView
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              selected = ''
            >
              {
                data?.map(aPackage=>{
                  return(
                    <PackageNode key={aPackage.uuid} packageMeta = {aPackage} />
                  )
                })
              }
            </TreeView>
            </div>
          </div>        
      }
    </Container>
  )
}
