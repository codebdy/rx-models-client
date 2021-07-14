import React from 'react';
import { makeStyles, Theme, createStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import SubmitButton from 'components/common/submit-button';
import intl from 'react-intl-universal';
import { useMagicQuery } from 'data/use-magic-query';
import { MagicQueryBuilder } from 'data/magic-query-builder';
import { useShowServerError } from 'store/helpers/use-show-server-error';
import { RxRole } from './interface/rx-role';
import { useState } from 'react';
import { Skeleton } from '@material-ui/lab';
import { useAppStore } from 'store/app-store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topBar:{
      height:'50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    roleSelect:{
      minWidth:'300px',
    }
  }),
);

export default function Topbar(
  props:{
    onSelectRole:(role?:RxRole)=>void,
    changed: boolean,
  }
){
  const {onSelectRole, changed} = props;
  const classes = useStyles();
  const [selected, setSelected] = useState<RxRole|undefined>();
  const {data, error, loading} = useMagicQuery<RxRole[]>(
    new MagicQueryBuilder()
      .setEntity('RxRole')
  );

  useShowServerError(error);

  const appStore = useAppStore();


  const handleChange = (event: React.ChangeEvent<{ value: any }>)=>{
    const roleId = event.target.value;
    if(roleId !== selected?.id && changed){
      appStore.confirmAction(intl.get('changing-not-save-message'), ()=>{
        const role = data?.data.find(rl=>rl.id === roleId);
        setSelected(role);
        onSelectRole(role);
      } )
    }

  }

  const handleSave = ()=>{

  }
  return (
    <div className = {classes.topBar}>
      {
        loading
        ? <Skeleton variant="rect" className = {classes.roleSelect} height = {40}/>
        : <FormControl variant="outlined" size= "small" className = {classes.roleSelect}>
          <InputLabel id="demo-simple-select-outlined-label">{intl.get('role')}</InputLabel>
          <Select
            value={selected?.id || ''}
            onChange={handleChange}
            label={intl.get('role')}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
              data?.data?.map(role=>{
                return(
                  <MenuItem key = {role.id} value={role.id}>{role.name}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      }
      
      <SubmitButton 
          variant="contained" 
          color = "primary" 
          size = "medium"
          disabled = {!changed}
          //submitting = {loading}
          onClick = {handleSave}
        >{intl.get('save')}</SubmitButton>
    </div>
  )
}
