import React from 'react';
import { observer } from 'mobx-react';
import { RelationStore } from '../store/relation';
import intl from "react-intl-universal";
import { Grid, TextField, Typography } from '@material-ui/core';
import { useModelsBoardStore } from '../store';

export const RelationPanel = observer((
  props:{
    relationStore: RelationStore
  }
)=>{
  const {relationStore} = props;
  const boardStore = useModelsBoardStore();
  const source = boardStore.rootStore.getEntityById(relationStore.sourceId);
  const target = boardStore.rootStore.getEntityById(relationStore.targetId);

  return(
    <>
      <Grid item xs={12}>
        <Typography variant = 'subtitle1'>
          {source?.name} {intl.get('side')}
        </Typography>
      </Grid>    
      <Grid item>
        <TextField 
          label =  {intl.get('role-name')} 
          value = {relationStore.roleOnSource || ''} 
          variant = "outlined" 
          size="small"
        />
      </Grid> 
      <Grid item xs={12}>
        <Typography variant = 'subtitle1'>
          {target?.name} {intl.get('side')}
        </Typography>
      </Grid>
      <Grid item>  
        <TextField 
          label = {intl.get('role-name')} 
          value = {relationStore.roleOnTarget || ''} 
          variant = "outlined" 
          size="small"
        />
      </Grid>  
    </>
  )
})