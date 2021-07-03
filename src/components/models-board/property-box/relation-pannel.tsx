import React from 'react';
import { observer } from 'mobx-react';
import { RelationStore } from '../store/relation';
import intl from "react-intl-universal";
import { Grid, TextField } from '@material-ui/core';

export const RelationPanel = observer((
  props:{
    relationStore: RelationStore
  }
)=>{
  const {relationStore} = props;
  
  return(
    <>
      <Grid item>
        <TextField 
          label = {intl.get('name')} 
          value = { ''} 
          variant = "outlined" 
          size="small"
        />
      </Grid>   
    </>
  )
})