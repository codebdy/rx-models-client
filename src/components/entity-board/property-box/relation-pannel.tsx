import React from 'react';
import { observer } from 'mobx-react';
import { RelationStore } from '../store/relation';
import intl from "react-intl-universal";
import { FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, Typography } from '@mui/material';
import { useEntityBoardStore } from '../store/helper';
import LazyTextField from 'components/entity-board/property-box/lazy-text-field';
import { CombinationType, RelationType } from '../meta/relation-meta';
import { RelationChangeCommand } from '../command/relation-change-command';

export const RelationPanel = observer((
  props:{
    relationStore: RelationStore
  }
)=>{
  const {relationStore} = props;
  const boardStore = useEntityBoardStore();
  const source = boardStore.getEntityById(relationStore.sourceId);
  const target = boardStore.getEntityById(relationStore.targetId);

  const handleTypeChange = (event:SelectChangeEvent<RelationType>)=>{
    const ownerId = relationStore.relationType === RelationType.ONE_TO_MANY ? relationStore.sourceId : relationStore.targetId
    const command = new RelationChangeCommand(relationStore, 
      {
        relationType: event.target.value as RelationType,
        ownerId :ownerId
      }
    );
    boardStore.excuteCommand(command);
  }

  const handleSourceRoleChange = (value:string)=>{
    const command = new RelationChangeCommand(relationStore, 
      { 
        roleOnSource : value
      }
    );
    boardStore.excuteCommand(command);
  }

  const handleTargetRoleChange = (value:string)=>{
    const command = new RelationChangeCommand(relationStore, 
      {
        roleOnTarget : value
      }
    );
    boardStore.excuteCommand(command);
  }

  const handleOwnerChange = (event:SelectChangeEvent<string>)=>{
    const command = new RelationChangeCommand(relationStore, 
      {
        ownerId : event.target.value as string
      }
    );
    boardStore.excuteCommand(command);
  }

  const handleCombinationOnSourceChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const command = new RelationChangeCommand(relationStore, 
      {
        combination : event.target.checked ? CombinationType.ON_SOURCE : undefined
      }
    );
    boardStore.excuteCommand(command);
  }

  const handleCombinationOnTargetChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const command = new RelationChangeCommand(relationStore, 
      {
        combination : event.target.checked ? CombinationType.ON_TARGET : undefined
      }
    );
    boardStore.excuteCommand(command);
  }

  const isInherit = RelationType.INHERIT === relationStore.relationType;

  return(
    <>
      <Grid item xs={12}>
        <FormControl variant="outlined" fullWidth size = "small">
          <InputLabel>{intl.get('relation-type')}</InputLabel>
          <Select
            value={relationStore.relationType}
            onChange={handleTypeChange}
            label={intl.get('relation-type')}
            disabled = {isInherit}
          >
            <MenuItem value={RelationType.INHERIT}>{intl.get('inherit')}</MenuItem>
            <MenuItem value={RelationType.ONE_TO_ONE}>{intl.get('one-to-one')}</MenuItem>
            <MenuItem value={RelationType.ONE_TO_MANY}>{intl.get('one-to-many')}</MenuItem>
            <MenuItem value={RelationType.MANY_TO_ONE}>{intl.get('many-to-one')}</MenuItem>
            <MenuItem value={RelationType.MANY_TO_MANY}>{intl.get('many-to-many')}</MenuItem>
          </Select>
        </FormControl>        
      </Grid>
      <Grid item xs={12}>
        <FormControl 
          variant="outlined" 
          fullWidth 
          size = "small" 
          disabled = {
            relationStore.relationType === RelationType.ONE_TO_MANY 
            || relationStore.relationType === RelationType.MANY_TO_ONE
            || isInherit
          }>
          <InputLabel>{intl.get('owner')}</InputLabel>
          <Select
            value={relationStore.ownerId}
            onChange={handleOwnerChange}
            label={intl.get('owner')}
          >
            <MenuItem value={relationStore.sourceId}>{boardStore.getEntityById(relationStore.sourceId)?.name}</MenuItem>
            <MenuItem value={relationStore.targetId}>{boardStore.getEntityById(relationStore.targetId)?.name}</MenuItem>
          </Select>
        </FormControl>        
      </Grid>
      {
        !isInherit &&
        <>
          <Grid item xs={12}>
            <Typography variant = 'subtitle1'>
              {source?.name} {intl.get('side')}
            </Typography>
          </Grid>    
          <Grid item xs={12}>
            <LazyTextField 
              label = {intl.get('role-name')} 
              value = {relationStore.roleOnSource || ''} 
              onChange={handleSourceRoleChange}
            />
          </Grid> 
          <Grid item xs = {12}>
            <FormControlLabel
              control={
                <Switch
                  checked={relationStore.combination === CombinationType.ON_SOURCE}
                  onChange={handleCombinationOnSourceChange}
                  color="primary"
                />
              }
              label= {intl.get('combination')}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant = 'subtitle1'>
              {target?.name} {intl.get('side')}
            </Typography>
          </Grid>
          <Grid item xs={12}>  
          <LazyTextField 
              label = {intl.get('role-name')} 
              value = {relationStore.roleOnTarget || ''} 
              onChange={handleTargetRoleChange}
            />
          </Grid>  
          <Grid item xs = {12}>
            <FormControlLabel
              control={
                <Switch
                  checked={relationStore.combination === CombinationType.ON_TARGET}
                  onChange={handleCombinationOnTargetChange}
                  color="primary"
                />
              }
              label= {intl.get('combination')}
            />
          </Grid>
        </>
      }
    </>
  )
})