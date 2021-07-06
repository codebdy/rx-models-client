import React from 'react';
import { observer } from 'mobx-react';
import { RelationStore } from '../store/relation';
import intl from "react-intl-universal";
import { FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import { useModelsBoardStore } from '../store';
import LayzyTextField from 'components/models-board/property-box/layzy-text-field';
import { RelationType } from '../meta/relation-meta';
import { RelationChangeCommand } from '../command/relation-change-command';

export const RelationPanel = observer((
  props:{
    relationStore: RelationStore
  }
)=>{
  const {relationStore} = props;
  const boardStore = useModelsBoardStore();
  const source = boardStore.rootStore.getEntityById(relationStore.sourceId);
  const target = boardStore.rootStore.getEntityById(relationStore.targetId);

  const handleTypeChange = (event:React.ChangeEvent<{ value: unknown }>)=>{
    const command = new RelationChangeCommand(relationStore, 'relationType' , event.target.value as RelationType);
    boardStore.excuteCommand(command);
  }

  const handleSourceRoleChange = (value:string)=>{
    const command = new RelationChangeCommand(relationStore, 'roleOnSource' , value);
    boardStore.excuteCommand(command);
  }

  const handleTargetRoleChange = (value:string)=>{
    const command = new RelationChangeCommand(relationStore, 'roleOnTarget' , value);
    boardStore.excuteCommand(command);
  }

  return(
    <>
      <Grid item xs={12}>
        <FormControl variant="outlined" fullWidth size = "small">
          <InputLabel id="demo-simple-select-outlined-label">{intl.get('relation-type')}</InputLabel>
          <Select
            value={relationStore.relationType}
            onChange={handleTypeChange}
            label={intl.get('relation-type')}
          >
            <MenuItem value={RelationType.ONE_TO_ONE}>{intl.get('one-to-one')}</MenuItem>
            <MenuItem value={RelationType.ONE_TO_MANY}>{intl.get('one-to-many')}</MenuItem>
            <MenuItem value={RelationType.MANY_TO_ONE}>{intl.get('many-to-one')}</MenuItem>
            <MenuItem value={RelationType.MANY_TO_MANY}>{intl.get('many-to-many')}</MenuItem>
          </Select>
        </FormControl>        
      </Grid>
      <Grid item xs={12}>
        <Typography variant = 'subtitle1'>
          {source?.name} {intl.get('side')}
        </Typography>
      </Grid>    
      <Grid item xs={12}>
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
      <Grid item xs={12}>  
      <LayzyTextField 
          label = {intl.get('role-name')} 
          value = {relationStore.roleOnTarget || ''} 
          onChange={handleTargetRoleChange}
        />
      </Grid>  
    </>
  )
})