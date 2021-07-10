import React from 'react';
import { observer } from 'mobx-react';
import { EntityStore } from '../store/entity-store';
import intl from "react-intl-universal";
import { Grid } from '@material-ui/core';
import { useModelsBoardStore } from '../store';
import LayzyTextField from 'components/models-board/property-box/layzy-text-field';
import { NameChangeCommand } from '../command/name-change-command';
import { EntityTableNameChangeCommand } from '../command/entity-table-name-change-command';

export const EntityPanel = observer((
  props:{
    entityStore: EntityStore
  }
)=>{
  const {entityStore} = props;
  const bordStore = useModelsBoardStore();
  const handleNameChange = (value:string)=>{
    const command = new NameChangeCommand(entityStore, value);
    bordStore.excuteCommand(command);
  }

  const handleTableNameChange =  (value:string)=>{
    const command = new EntityTableNameChangeCommand(entityStore, value);
    bordStore.excuteCommand(command);
  }

  return(
    <>
      <Grid item xs={12}>
        <LayzyTextField 
          label = {intl.get('name')} 
          value = {entityStore.name || ''} 
          onChange={handleNameChange}
        />
      </Grid>    

      <Grid item xs={12}>
        <LayzyTextField 
          label = {intl.get('table-name')} 
          value = {entityStore.tableName || ''} 
          onChange={handleTableNameChange}
        />
      </Grid>  
    </>
  )
})