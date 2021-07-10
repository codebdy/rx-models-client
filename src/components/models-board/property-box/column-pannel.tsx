import React from 'react';
import { observer } from 'mobx-react';
import { ColumnStore } from '../store/column';
import intl from "react-intl-universal";
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import LayzyTextField from 'components/models-board/property-box/layzy-text-field';
import { useModelsBoardStore } from '../store';
import { NameChangeCommand } from '../command/name-change-command';
import { ColumnType } from '../meta/column-meta';
import { ColumnChangeCommand } from '../command/column-change-command';

export const ColumnPanel = observer((
  props:{
    columnStore: ColumnStore
  }
)=>{
  const {columnStore} = props;
  const bordStore = useModelsBoardStore();
  
  const handleStringChange = (prop: any) => (value: string) => {
    const command = new ColumnChangeCommand(columnStore, { [prop]: value });
    bordStore.excuteCommand(command);
  };

  const handleTypeChange = (event: React.ChangeEvent<{ value: unknown }>)=>{
    const command = new ColumnChangeCommand(columnStore, { type: event.target.value });
    bordStore.excuteCommand(command);
  }

  const isId = columnStore.name === 'id';
  return(
    <>
      <Grid item xs={12}>
        <LayzyTextField 
            label = {intl.get('name')} 
            value = {columnStore.name || ''} 
            onChange={handleStringChange('name')}
            disabled = {isId}
          />
      </Grid> 
      <Grid item xs={12}>
        <FormControl variant="outlined" fullWidth size = "small" disabled = {isId}>
          <InputLabel>{intl.get('data-type')}</InputLabel>
          <Select
            value={columnStore.type}
            onChange={handleTypeChange}
            label={intl.get('data-type')}
          >
            <MenuItem value={ColumnType.String}>{intl.get('string')}</MenuItem>
            <MenuItem value={ColumnType.Number}>{intl.get('number')}</MenuItem>
            <MenuItem value={ColumnType.Boolean}>{intl.get('boolean')}</MenuItem>
            <MenuItem value={ColumnType.Date}>{intl.get('date')}</MenuItem>
            <MenuItem value={ColumnType.SimpleJson}>{intl.get('simple-json')}</MenuItem>
            <MenuItem value={ColumnType.SimpleArray}>{intl.get('simple-array')}</MenuItem>
          </Select>
        </FormControl>  
      </Grid>  
    </>
  )
})