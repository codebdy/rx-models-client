import React from 'react';
import { observer } from 'mobx-react';
import { RelationStore } from '../store/relation';
import intl from "react-intl-universal";
import { Grid, TextField, Typography } from '@material-ui/core';
import { useModelsBoardStore } from '../store';
import LayzyTextField from 'components/common/layzy-text-field';

export const RelationPanel = observer((
  props:{
    relationStore: RelationStore
  }
)=>{
  const {relationStore} = props;
  const boardStore = useModelsBoardStore();
  const source = boardStore.rootStore.getEntityById(relationStore.sourceId);
  const target = boardStore.rootStore.getEntityById(relationStore.targetId);

  const handleSourceRoleChange = (value:string)=>{
    relationStore.setRoleOnSource(value);
  }

  const handleTargetRoleChange = (value:string)=>{
    relationStore.setRoleOnTarget(value);
  }

  return(
    <>
      <Grid item xs={12}>
        <Typography variant = 'subtitle1'>
          {source?.name} {intl.get('side')}
        </Typography>
      </Grid>    
      <Grid item>
        <LayzyTextField 
          label = {intl.get('role-name')} 
          value = {relationStore.roleOnSource || ''} 
          onChange={handleSourceRoleChange}
        />
      </Grid> 
      <Grid item xs={12}>
        <Typography variant = 'subtitle1'>
          {target?.name} {intl.get('side')}
        </Typography>
      </Grid>
      <Grid item>  
      <LayzyTextField 
          label = {intl.get('role-name')} 
          value = {relationStore.roleOnTarget || ''} 
          onChange={handleTargetRoleChange}
        />
      </Grid>  
    </>
  )
})