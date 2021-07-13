import React from 'react';
import { makeStyles, Theme, createStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import SubmitButton from 'components/common/submit-button';
import intl from 'react-intl-universal';
import { useMagicQuery } from 'data/use-magic-query';
import { MagicQueryBuilder } from 'data/magic-query-builder';
import { useShowServerError } from 'store/helpers/use-show-server-error';
import { RxRole } from './interface/rx-role';
import { useState } from 'react';

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
    onSelectRole:(roleId:number)=>void,
  }
){
  const {onSelectRole} = props;
  const classes = useStyles();
  const [selectId, setSelectedId] = useState<number|''>('');
  const {data, error} = useMagicQuery<RxRole[]>(new MagicQueryBuilder().setEntity('RxRole'));
  useShowServerError(error);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>)=>{
    const roleId = event.target.value as number;
    setSelectedId(roleId);
    onSelectRole(roleId)
  }

  const handleSave = ()=>{

  }
  return (
    <div className = {classes.topBar}>
      <FormControl variant="outlined" size= "small" className = {classes.roleSelect}>
        <InputLabel id="demo-simple-select-outlined-label">{intl.get('role')}</InputLabel>
        <Select
          value={selectId}
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
      <SubmitButton 
          variant="contained" 
          color = "primary" 
          size = "medium"
          //disabled = {!boardStore.changed}
          //submitting = {loading}
          onClick = {handleSave}
        >{intl.get('save')}</SubmitButton>
    </div>
  )
}
