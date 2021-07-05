import React from 'react';
import { observer } from 'mobx-react';
import { EntityStore } from '../store/entity-store';
import intl from "react-intl-universal";
import { Grid, TextField } from '@material-ui/core';
import { useModelsBoardStore } from '../store';
import { ClassNameCommand } from '../command/class-name-command';

export const ClassPanel = observer((
  props:{
    classStore: EntityStore
  }
)=>{
  const {classStore} = props;
  const bordStore = useModelsBoardStore();
  const handleNameChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const command = new ClassNameCommand(classStore, event.target.value as string);
    bordStore.excuteCommand(command);
  }
  return(
    <>
      <Grid item>
        <TextField 
          label = {intl.get('name')} 
          value = {classStore.name || ''} 
          variant = "outlined" 
          size="small"
          onChange={handleNameChange}
        />
      </Grid>    
    </>
  )
})