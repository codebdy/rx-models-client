import React from 'react';
import { observer } from 'mobx-react';
import { ColumnStore } from '../store/column';
import intl from "react-intl-universal";
import { FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch } from '@material-ui/core';
import LayzyTextField from 'components/entity-board/property-box/layzy-text-field';
import { useModelsBoardStore } from '../store';
import { ColumnType } from '../meta/column-meta';
import { ColumnChangeCommand } from '../command/column-change-command';

export const ColumnPanel = observer((
  props:{
    columnStore: ColumnStore
  }
)=>{
  const {columnStore} = props;
  const bordStore = useModelsBoardStore();
  const allValues = columnStore.toMeta();
  
  const handleStringChange = (prop: any) => (value: string) => {
    const command = new ColumnChangeCommand(columnStore, {...allValues, [prop]: value });
    bordStore.excuteCommand(command);
  };

  //默认值以后要改成一个单独控件
  const handleDefaultChange = (value:string)=>{
    const command = new ColumnChangeCommand(columnStore, {...allValues, default: value === '' ? undefined : value });
    bordStore.excuteCommand(command);
  }

  //不设置allValues， 类型改变会清空所有旧设置
  const handleTypeChange = (event: React.ChangeEvent<{ value: unknown }>)=>{
    const type = event.target.value;
    let generated = columnStore.generated;
    if(type !== ColumnType.String && type !== ColumnType.Number){
      generated = undefined;
    }
    const command = new ColumnChangeCommand(columnStore, { type, generated });
    bordStore.excuteCommand(command);
  }

  const handleGeneratedChange = (event: React.ChangeEvent<{ value: unknown }>)=>{
    let value = event.target.value;
    if(value === 'true'){
      value = true;
    }
    if(!value){
      value = undefined;
    }
    const command = new ColumnChangeCommand(columnStore, { ...allValues, generated: value });
    bordStore.excuteCommand(command);
  }

  const handleBooleanChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const command = new ColumnChangeCommand(columnStore, { ...allValues, [prop]: event.target.checked });
    bordStore.excuteCommand(command);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked ? false : undefined;
    const command = new ColumnChangeCommand(columnStore, { ...allValues, select: value });
    bordStore.excuteCommand(command);
  };

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
      {
        isId &&
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={columnStore.primary||false}
                onChange={handleBooleanChange('primary')}
                color="primary"
              />
            }
            disabled
            label= {intl.get('primary-key')}
          />
        </Grid>  
      }
      {
        !isId && 
        <Grid item xs = {6}>
          <FormControlLabel
            control={
              <Switch
                checked={columnStore.nullable||false}
                onChange={handleBooleanChange('nullable')}
                color="primary"
              />
            }
            label= {intl.get('nullable')}
          />
        </Grid>
      }
      {
        !isId && 
        <Grid item xs = {6}>
          <FormControlLabel
            control={
              <Switch
                checked={columnStore.unique||false}
                onChange={handleBooleanChange('unique')}
                color="primary"
              />
            }
            label= {intl.get('unique')}
          />
        </Grid>
      }
      {
        columnStore.type === ColumnType.Date &&
        <Grid item xs = {6}>
          <FormControlLabel
            control={
              <Switch
                checked={columnStore.createDate||false}
                onChange={handleBooleanChange('createDate')}
                color="primary"
              />
            }
            label= {intl.get('create-date')}
          />
        </Grid>
      }
      {
        columnStore.type === ColumnType.Date &&
        <Grid item xs = {6}>
          <FormControlLabel
            control={
              <Switch
                checked={columnStore.updateDate||false}
                onChange={handleBooleanChange('updateDate')}
                color="primary"
              />
            }
            label= {intl.get('update-date')}
          />
        </Grid>
      }
      {
        columnStore.type === ColumnType.Date &&
        <Grid item xs = {12}>
          <FormControlLabel
            control={
              <Switch
                checked={columnStore.deleteDate||false}
                onChange={handleBooleanChange('deleteDate')}
                color="primary"
              />
            }
            label= {intl.get('delete-date')}
          />
        </Grid>
      }
      {
        !isId && 
        <Grid item xs = {12}>
          <FormControlLabel
            control={
              <Switch
                checked={columnStore.select === false ? true : false}
                onChange={handleSelectChange}
                color="primary"
              />
            }
            label= {intl.get('hide-field')}
          />
        </Grid>
      }
      

      {
        !isId && 
        <Grid item xs = {12}>
          <LayzyTextField 
              label = {intl.get('default-value')} 
              value = {columnStore.default || ''} 
              onChange={handleDefaultChange}
            />
        </Grid>        
      }     

      {
        !isId && columnStore.type === ColumnType.String &&
        <Grid item xs = {12}>
          <LayzyTextField 
              label = {intl.get('length')} 
              value = {columnStore.default || ''} 
              onChange={handleStringChange('length')}
            />
        </Grid>        
      }  

      {
        (columnStore.type === ColumnType.Number || columnStore.type === ColumnType.String) &&
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth size = "small" disabled = {isId}>
            <InputLabel>{intl.get('generated')}</InputLabel>
            <Select
              value={(columnStore.generated === true ? 'true' : columnStore.generated) ||''}
              onChange={handleGeneratedChange}
              label={intl.get('generated')}
            >
              <MenuItem value={""}><em>None</em></MenuItem>
              <MenuItem value={'true'}>True</MenuItem>
              {
                columnStore.type === ColumnType.String &&
                  <MenuItem value={'uuid'}>uuid</MenuItem>
              }
              {
                columnStore.type === ColumnType.String &&
                  <MenuItem value={'rowid'}>rowid</MenuItem>
              }
               
              <MenuItem value={'increment'}>increment</MenuItem>
            </Select>
          </FormControl>  
        </Grid>
      }
    </>
  )
})