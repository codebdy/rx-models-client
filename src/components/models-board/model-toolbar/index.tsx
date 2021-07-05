import React from 'react';
import { makeStyles, Theme, createStyles, Tooltip, IconButton, Button } from '@material-ui/core';
import { observer } from 'mobx-react';
import MdiIcon from 'components/common/mdi-icon';
import intl from 'react-intl-universal';
import Spacer from 'components/common/spacer';
import { useModelsBoardStore } from '../store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  }),
);

export const ModelToolbar = observer(()=>{
  const classes = useStyles();
  const boardStore = useModelsBoardStore();

  const handleUndo = ()=>{
    boardStore.undo();
  }

  const handleRedo = ()=>{
    boardStore.redo();
  }

  return (
    <div className = {classes.toolbar}>
      <div className = {classes.toolbarInner}>
        <Tooltip title={intl.get('database-settings')} aria-label={intl.get('database-settings')}>
          <IconButton className={classes.iconButton}><MdiIcon iconClass = "mdi-database-cog-outline" /></IconButton>
        </Tooltip>
        <Tooltip title={intl.get('export-inteface')} aria-label={intl.get('export-inteface')}>
          <IconButton className={classes.iconButton}><MdiIcon iconClass = "mdi-file-export-outline" /></IconButton>
        </Tooltip>
        <Spacer />
        <IconButton 
          className={classes.iconButton}
          disabled = {boardStore.undoList.length === 0}
          onClick = {handleUndo}
        ><MdiIcon iconClass = "mdi-undo" /></IconButton>
        <IconButton 
          className={classes.iconButton}
          disabled = {boardStore.redoList.length === 0}
          onClick = {handleRedo}
        ><MdiIcon iconClass = "mdi-redo" /></IconButton>
        <IconButton 
          className={classes.iconButton}
          disabled = {!boardStore.selectedCell}
        ><MdiIcon iconClass = "mdi-trash-can-outline" size={20} /></IconButton>
        <div className={classes.saveButtonShell}>
          <Button 
            variant="contained" 
            color = "primary" 
            size = "medium"
          >{intl.get('save')}</Button>
        </div>
      </div>
    </div>

  )
})