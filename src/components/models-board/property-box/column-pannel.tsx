import React from 'react';
import { observer } from 'mobx-react';
import { ColumnStore } from '../store/column';
import intl from "react-intl-universal";
import { Grid } from '@material-ui/core';
import LayzyTextField from 'components/models-board/property-box/layzy-text-field';
import { useModelsBoardStore } from '../store';
import { NameChangeCommand } from '../command/name-change-command';

export const ColumnPanel = observer((
  props:{
    columnStore: ColumnStore
  }
)=>{
  const {columnStore} = props;
  const bordStore = useModelsBoardStore();
  
  const handleNameChange = (value:string)=>{
    const command = new NameChangeCommand(columnStore, value);
    bordStore.excuteCommand(command);
  }

  return(
    <>
      <Grid item xs={12}>
        <LayzyTextField 
            label = {intl.get('name')} 
            value = {columnStore.name || ''} 
            onChange={handleNameChange}
            disabled = {columnStore.name === 'uuid'}
          />
      </Grid>   
    </>
  )
})