import React from 'react';
import { observer } from 'mobx-react';
import { ColumnStore } from '../store/column';
import intl from "react-intl-universal";
import { Grid, TextField } from '@material-ui/core';

export const ColumnPanel = observer((
  props:{
    columnStore: ColumnStore
  }
)=>{
  const {columnStore} = props;
  
  return(
    <>
      <Grid item>
        <TextField 
          label = {intl.get('name')} 
          value = {columnStore.name || ''} 
          variant = "outlined" 
          size="small"
        />
      </Grid>   
    </>
  )
})