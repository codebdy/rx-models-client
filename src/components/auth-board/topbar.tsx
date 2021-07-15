import React from 'react';
import { makeStyles, Theme, createStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import SubmitButton from 'components/common/submit-button';
import intl from 'react-intl-universal';
import { useMagicQuery } from 'data/use-magic-query';
import { MagicQueryBuilder } from 'data/magic-query-builder';
import { useShowServerError } from 'store/helpers/use-show-server-error';
import { RxRole } from '../../entity-interface/rx-role';
import { Skeleton } from '@material-ui/lab';
import { useAppStore } from 'store/app-store';
import { useAuthBoardStore } from './store/helper';
import { RxRoleStore } from './store/rx-role-store';
import { observer } from 'mobx-react';
import useLayzyMagicPost from 'data/use-layzy-magic-post';
import { MagicPostBuilder } from 'data/magic-post-builder';
import RouterPrompt from 'components/common/router-prompt';

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

export const Topbar = observer((
  props:{
  }
)=>{
  const classes = useStyles();
  const appStore = useAppStore();
  const boardStore = useAuthBoardStore();

  const {data, error, loading} = useMagicQuery<RxRole[]>(
    new MagicQueryBuilder()
      .setEntity('RxRole')
      .addRelation('abilities')
  );

  const [excuteSave, {loading:saving, error:saveError}] = useLayzyMagicPost({
    onCompleted(){
      appStore.showSuccessAlert();
      boardStore.setChanged(false);
    }
  })

  useShowServerError(error||saveError);

  const changeRole = (roleId:number|'')=>{
    const role = data?.data.find(rl=>rl.id === roleId);
    boardStore.setSelecRole(role ? new RxRoleStore(role) : undefined);
  }

  const handleChange = (event: React.ChangeEvent<{ value: any }>)=>{
    const roleId = event.target.value;
    if(roleId !== boardStore.selectRole?.id){
      if(boardStore.changed){
        appStore.confirmAction(intl.get('changing-not-save-message'), ()=>{
          changeRole(roleId);
        })        
      }
      else{
        changeRole(roleId);
      }
    }

  }

  const handleSave = ()=>{
    if(!boardStore.selectRole){
      return;
    }
    const data = new MagicPostBuilder()
      .setEntity('RxRole')
      .setSingleData(
        boardStore.selectRole.toMeta()
      ).toData()
    excuteSave({data});
  }
  return (
    <div className = {classes.topBar}>
      <RouterPrompt promptBoolean = {boardStore.changed} message = {intl.get('changing-not-save-message')} />
      {
        loading
        ? <Skeleton variant="rect" className = {classes.roleSelect} height = {40}/>
        : <FormControl variant="outlined" size= "small" className = {classes.roleSelect}>
          <InputLabel id="demo-simple-select-outlined-label">{intl.get('role')}</InputLabel>
          <Select
            value={boardStore.selectRole?.id || ''}
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
          disabled = {!boardStore.changed}
          submitting = {saving}
          onClick = {handleSave}
        >{intl.get('save')}</SubmitButton>
    </div>
  )
})
