import React from 'react';
import { observer } from 'mobx-react';
import { PackageStore } from '../store/package';
import { Grid, TextField } from '@material-ui/core';
import intl from "react-intl-universal";

export const PackagePanel = observer((
  props:{
    packageStore:PackageStore
  }
)=>{
  const {packageStore} = props;

  return(
    <>
      <Grid item>
        <TextField 
          label = {intl.get('name')} 
          value = {packageStore.name || ''} 
          variant = "outlined" 
          size="small"
        />
      </Grid>
    </>
  )
})