import React from 'react';
import { makeStyles, Theme, createStyles, IconButton } from '@material-ui/core';
import { observer } from 'mobx-react';
import MdiIcon from 'components/common/mdi-icon';
import intl from 'react-intl-universal';
import Spacer from 'components/common/spacer';
import { useModelsBoardStore } from '../store';
import { PackageStore } from '../store/package';
import { PackageDeleteCommand } from '../command/package-delete-command';
import { EntityStore } from '../store/entity-store';
import { EntityDeleteCommand } from '../command/entity-delete-command';
import { ColumnStore } from '../store/column';
import { ColumnDeleteCommand } from '../command/column-delete-command';
import { RelationStore } from '../store/relation';
import { RelationDeleteCommand } from '../command/relation-delete-command';
import SubmitButton from 'components/common/submit-button';
import RouterPrompt from 'components/common/router-prompt';
import { useShowServerError } from 'store/helpers/use-show-server-error';
import { useAppStore } from 'store/app-store';
import useLayzyMagicPost from 'data/use-layzy-magic-post';
import { MagicPostBuilder } from 'data/magic-post-builder';

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

export const EntityToolbar = observer(()=>{
  const classes = useStyles();
  const boardStore = useModelsBoardStore();
  const appStore = useAppStore();
  const [excuteSave, {loading, error}] = useLayzyMagicPost({
    onCompleted(){
      appStore.setSuccessAlert(true);
      boardStore.setChanged(false);
    }
  });

  useShowServerError(error);

  const handleUndo = ()=>{
    boardStore.undo();
  }

  const handleRedo = ()=>{
    boardStore.redo();
  }

  const handleDelete = ()=>{
    if(boardStore.selectedElement instanceof PackageStore){
      const command = new PackageDeleteCommand(boardStore.selectedElement);
      boardStore.excuteCommand(command);
    }

    if(boardStore.selectedElement instanceof EntityStore){
      const command = new EntityDeleteCommand(boardStore.selectedElement);
      boardStore.excuteCommand(command);
    }

    if(boardStore.selectedElement instanceof ColumnStore){
      const command = new ColumnDeleteCommand(boardStore.selectedElement);
      boardStore.excuteCommand(command);
    }

    if(boardStore.selectedElement instanceof RelationStore){
      const command = new RelationDeleteCommand(boardStore.selectedElement);
      boardStore.excuteCommand(command);
    }

  }

  const handleSave = ()=>{
    const data = new MagicPostBuilder()
      .setEntity('RxPackage')
      .setDatas(boardStore.getPackeMetas())//.addModelCommand('removeOthers')
      .addEntityCommand('removeOthers')
      .toData();
    excuteSave({data});
  }

  return (
    <div className = {classes.toolbar}>
      <div className = {classes.toolbarInner}>
        <RouterPrompt promptBoolean = {boardStore.changed} message = {intl.get('changing-not-save-message')} />
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
          disabled = {!boardStore.selectedElement || (boardStore.selectedElement as any).name === 'id'}
          onClick = {handleDelete}
        ><MdiIcon iconClass = "mdi-trash-can-outline" size={20} /></IconButton>
        <div className={classes.saveButtonShell}>
          <SubmitButton 
            variant="contained" 
            color = "primary" 
            size = "medium"
            disabled = {!boardStore.changed}
            submitting = {loading}
            onClick = {handleSave}
          >{intl.get('save')}</SubmitButton>
        </div>
      </div>
    </div>

  )
})