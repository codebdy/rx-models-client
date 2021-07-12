import React from 'react';
import { makeStyles, Theme, createStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import SubmitButton from 'components/common/submit-button';
import intl from 'react-intl-universal';

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

export default function Topbar(){
  const classes = useStyles();
  const handleSave = ()=>{

  }
  return (
    <div className = {classes.topBar}>
      <FormControl variant="outlined" size= "small" className = {classes.roleSelect}>
        <InputLabel id="demo-simple-select-outlined-label">{intl.get('role')}</InputLabel>
        <Select
          //value={age}
          //onChange={handleChange}
          label={intl.get('role')}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>业务员</MenuItem>
          <MenuItem value={20}>经理</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
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
