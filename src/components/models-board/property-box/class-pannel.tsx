import React from 'react';
import { observer } from 'mobx-react';
import { ClassStore } from '../store/class-store';
import intl from "react-intl-universal";
import { Grid, TextField } from '@material-ui/core';

export const ClassPanel = observer((
  props:{
    classStore: ClassStore
  }
)=>{
  const {classStore} = props;
  
  return(
    <>
      <Grid item>
        <TextField 
          label = {intl.get('name')} 
          value = {classStore.name || ''} 
          variant = "outlined" 
          size="small"
        />
      </Grid>    
    </>
  )
})