import React from 'react';
import { makeStyles, Theme, createStyles, Tooltip, IconButton, Button } from '@material-ui/core';
import LeftArea from './leaft-area';
import RightArea from './right-area';
import { WorkSpace } from './workspace';
import MdiIcon from 'components/common/mdi-icon';
import intl from 'react-intl-universal';
import Spacer from 'components/common/spacer';
import classNames from 'classnames';
import { ModelsBoardStore } from './store/models-board';
import { ModelStoreProvider } from './store';
import { rootMeta } from './store/mock';
import { Toolbox } from './toolbox';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:1,
      display:'flex',
      flexFlow:'column',
      height:'0',
    },
    toolbar: {
      display:'flex',
      width:'100%',
      height:'40px',
      borderBottom: `solid 1px ${theme.palette.divider}`,
      alignItems:'center',
    },
    toolbarInner:{
      flex:1,
      display:'flex',
      marginRight:theme.spacing(4),
      marginLeft:theme.spacing(2),
    },
    iconButton:{
      width:'38px',
      height:'38px',
    },
    saveButtonShell:{
      display:'flex',
      alignItems:'center',
      marginLeft:theme.spacing(4),
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
      <div className = {classes.toolbar}>
        <div className = {classes.toolbarInner}>
          <Tooltip title={intl.get('database-settings')} aria-label={intl.get('database-settings')}>
            <IconButton className={classes.iconButton}><MdiIcon iconClass = "mdi-database-cog-outline" /></IconButton>
          </Tooltip>
          <Tooltip title={intl.get('export-inteface')} aria-label={intl.get('export-inteface')}>
            <IconButton className={classes.iconButton}><MdiIcon iconClass = "mdi-file-export-outline" /></IconButton>
          </Tooltip>
          <Spacer />
          <Tooltip title={intl.get('database-settings')} aria-label={intl.get('undo')}>
            <IconButton className={classes.iconButton}><MdiIcon iconClass = "mdi-undo" /></IconButton>
          </Tooltip>
          <Tooltip title={intl.get('database-settings')} aria-label={intl.get('redo')}>
            <IconButton className={classes.iconButton}><MdiIcon iconClass = "mdi-redo" /></IconButton>
          </Tooltip>
          <Tooltip title={intl.get('database-settings')} aria-label={intl.get('delete')}>
            <IconButton className={classes.iconButton}><MdiIcon iconClass = "mdi-trash-can-outline" size={20} /></IconButton>
          </Tooltip>
          <div className={classes.saveButtonShell}>
            <Button variant="contained" color = "primary" size = "medium">{intl.get('save')}</Button>
          </div>
        </div>
      </div>
      <div className = {classNames(classes.content, 'dragit-scrollbar')}>
        <LeftArea></LeftArea>
        <Toolbox></Toolbox>
        <WorkSpace></WorkSpace>
        <RightArea></RightArea>
      </div>
    </div>
    </ModelStoreProvider>
  )
}
