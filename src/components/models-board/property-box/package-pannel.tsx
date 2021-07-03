import React from 'react';
import { observer } from 'mobx-react';
import { PackageStore } from '../store/package';
import { Grid, TextField } from '@material-ui/core';
import intl from "react-intl-universal";
import { useModelsBoardStore } from '../store';
import { PackageNameCommand } from '../command/package-name-command';

export const PackagePanel = observer((
  props:{
    packageStore:PackageStore
  }
)=>{
  const {packageStore} = props;
  const bordStore = useModelsBoardStore();
  const handleNameChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const command = new PackageNameCommand(packageStore, event.target.value as string);
    bordStore.excuteCommand(command);
  }

  return(
    <>
      <Grid item>
        <TextField 
          label = {intl.get('name')} 
          value = {packageStore.name || ''} 
          variant = "outlined" 
          size="small"
          onChange={handleNameChange}
        />
      </Grid>
    </>
  )
})