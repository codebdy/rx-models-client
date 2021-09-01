import React from 'react';
import { observer } from 'mobx-react';
import { EntityStore } from '../store/entity-store';
import intl from "react-intl-universal";
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useEntityBoardStore } from '../store/helper';
import LazyTextField from 'components/entity-board/property-box/lazy-text-field';
import { NameChangeCommand } from '../command/name-change-command';
import { EntityTableNameChangeCommand } from '../command/entity-table-name-change-command';
import { EntityType } from '../meta/entity-meta';
import { EntityTypeChangeCommand } from '../command/entity-type-change-command';
import { JsonInput } from './json-input';
import { EntityEnumValuesChangeCommand } from '../command/entity-enum-values-change-command';
import { EntityMoveCommand } from '../command/entity-move-command';

export const EntityPanel = observer((
  props:{
    entityStore: EntityStore
  }
)=>{
  const {entityStore} = props;
  const bordStore = useEntityBoardStore();
  const handleNameChange = (value:string)=>{
    const command = new NameChangeCommand(entityStore, value);
    bordStore.excuteCommand(command);
  }

  const handleTableNameChange =  (value:string)=>{
    const command = new EntityTableNameChangeCommand(entityStore, value);
    bordStore.excuteCommand(command);
  }

  const handleTypeChange = (event: React.ChangeEvent<{ value: any }>)=>{
    const type = event.target.value;
    const command = new EntityTypeChangeCommand(entityStore, type);
    bordStore.excuteCommand(command);
  }

  const handleEnumValuesChange = (value:any)=>{
    const command = new EntityEnumValuesChangeCommand(entityStore, value);
    bordStore.excuteCommand(command);
  }

  const handlePackageChange = (event: React.ChangeEvent<{ value: any }>)=>{
    const command = new EntityMoveCommand(entityStore, event.target.value);
    bordStore.excuteCommand(command);
  }

  return(
    <>
      <Grid item xs={12}>
        <LazyTextField 
          label = {intl.get('name')} 
          value = {entityStore.name || ''} 
          onChange={handleNameChange}
        />
      </Grid> 
      <Grid item xs={12}>
        <FormControl variant="outlined" fullWidth size = "small">
          <InputLabel>{intl.get('belongs-to-package')}</InputLabel>
          <Select
            value={entityStore.package?.uuid||''}
            onChange={handlePackageChange}
            label={intl.get('belongs-to-package')}
          >
            {
              entityStore.getRootStore().packages.map((pkg)=>{
                return(
                  <MenuItem key={pkg.uuid} value={pkg.uuid}>{pkg.name}</MenuItem>
                )
              })
            }
            
          </Select>
        </FormControl>  
      </Grid>     
      <Grid item xs={12}>
        <FormControl variant="outlined" fullWidth size = "small">
          <InputLabel>{intl.get('type')}</InputLabel>
          <Select
            value={entityStore.entityType||EntityType.NORMAL}
            onChange={handleTypeChange}
            label={intl.get('type')}
          >
            <MenuItem value={EntityType.NORMAL}>{intl.get('normal-class')}</MenuItem>
            <MenuItem value={EntityType.ENUM}>{intl.get('enum')}</MenuItem>
            <MenuItem value={EntityType.ABSTRACT}>{intl.get('abstract-class')}</MenuItem>
            <MenuItem value={EntityType.INTERFACE}>{intl.get('interface')}</MenuItem>
          </Select>
        </FormControl>  
      </Grid>  
      {
        entityStore.entityType !== EntityType.ENUM && entityStore.entityType !== EntityType.INTERFACE &&
        <Grid item xs={12}>
          <LazyTextField 
            label = {intl.get('table-name')} 
            value = {entityStore.tableName || ''} 
            onChange={handleTableNameChange}
          />
        </Grid>  
      }

      {
        entityStore.entityType === EntityType.ENUM &&
        <Grid item xs={12}>
          <JsonInput label={intl.get('enum-values')} value = {entityStore.enumValues} onChange = {handleEnumValuesChange} />
        </Grid>
      }
    </>
  )
})