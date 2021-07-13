import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import intl from "react-intl-universal";
import { Tooltip, IconButton, createStyles, makeStyles, Theme, Grid, TextField } from '@material-ui/core';
import MdiIcon from 'components/common/mdi-icon';
import { ExpressItem } from './express-item';
import { AbilityCondition } from '../interface/ability-condition';
import { createId } from 'util/creat-id';
import SubmitButton from 'components/common/submit-button';
import { RxEntityAuth } from '../interface/rx-entity-auth';
import useLayzyMagicPost from 'data/use-layzy-magic-post';
import { useShowServerError } from 'store/helpers/use-show-server-error';
import { ENTITY_AUTH_QUERY } from '../consts';
import { mutate } from 'swr';
import { MagicPostBuilder } from 'data/magic-post-builder';
import { EntityMeta } from 'components/entity-board/meta/entity-meta';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      minWidth:'600px',
      minHeight:'260px',
    },
    list:{
      border:` ${theme.palette.divider} solid 1px`,
      display:'flex',
      flexFlow:'column',
      padding:0,
      height:'100%'
    },
    plus:{
      textAlign:'center',
      marginTop: theme.spacing(1),
    },
    actions:{
      padding:theme.spacing(2),
      paddingTop:0,
      paddingRight:theme.spacing(3),
    }

  }),
);


export default function ExpressDialog(
  props:{
    onOpenChange:(open:boolean)=>void,
    entityMeta: EntityMeta,
    entityAuth?: RxEntityAuth,
    entityAuths: RxEntityAuth[]
  }
) {
  const {entityMeta, onOpenChange, entityAuth, entityAuths} = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [conditions, setConditions] = useState<AbilityCondition[]>(JSON.parse(JSON.stringify(entityAuth?.conditions||[])));
  const [selectedId, setSelectedId] = useState<string|undefined>(entityAuth?.conditions?.length ? entityAuth?.conditions[0].uuid : undefined);
  const [excutePost, {loading, error}] = useLayzyMagicPost({
    onCompleted(data:any){
      mutate(
        ENTITY_AUTH_QUERY.toUrl(), 
        {
          data:[
            ...entityAuths.filter(entithAth=>entithAth.entityUuid !== entityAuth?.entityUuid), 
            data.RxEntityAuth
          ]
        }
      );
      handleClose();
    }
  });

  useShowServerError(error);

  const handleClickOpen = () => {
    setOpen(true);
    onOpenChange(true);
  };

  const handleClose = () => {
    setOpen(false);
    onOpenChange(false);
  };

  const handleAddNew = ()=>{
    const newCondition =  {uuid:createId(), name:'new Condition', expression :''};
    setConditions([...conditions,newCondition]);
    setSelectedId(newCondition.uuid);
  }

  const handleSelect = (uuid:string)=>{
    setSelectedId(uuid);
  }

  const handleDelete  = (uuid:string)=>{
    setConditions(conditions.filter(con=>con.uuid !== uuid));
    if(uuid === selectedId){
      setSelectedId(undefined);      
    }
  }

  const selectCondition = conditions.find(con=>con.uuid === selectedId);

  const handleNameChange = (event: React.ChangeEvent<{value:string}>)=>{
    if(!selectCondition){
      return;
    }
    const name = event.target.value;
    selectCondition.name = name;
    setConditions([...conditions]);
  }

  const handleExpressionChange = (event: React.ChangeEvent<{value:string}>)=>{
    if(!selectCondition){
      return;
    }
    const expression = event.target.value;
    selectCondition.expression = expression;
    setConditions([...conditions]);
  }

  const handleSave = ()=>{
    const auth = entityAuth ? entityAuth : {uuid: createId(), entityUuid: entityMeta.uuid, conditions:[]}
    const data = new MagicPostBuilder()
      .setEntity('RxEntityAuth')
      .setSingleData({...auth, conditions:conditions})
      .toData()
    excutePost({data});
  }

  return (
    <div>
      <Tooltip title={intl.get('express-tip')}>
        <IconButton size = "small" onClick={handleClickOpen}>
          <MdiIcon iconClass = "mdi-function-variant" size={18}></MdiIcon>
        </IconButton>
      </Tooltip>  
      <Dialog
        open={open}
        onClose={handleClose}
        scroll = "paper"
        maxWidth ="lg"
      >
        <DialogTitle>{intl.get('express-manage')}</DialogTitle>
        <DialogContent>
          <div className = {classes.content}>
            <Grid container spacing = {2}>
              <Grid item xs={6} >
                <div className = {classes.list}>
                  {
                    conditions.map(condition=>{
                      return (
                        <ExpressItem 
                          key ={condition.uuid} 
                          item = {condition} 
                          isSelected = {selectedId === condition.uuid }
                          onSelect = {handleSelect}
                          onDelete = {handleDelete}
                        />
                      )
                    })
                  }

                  <div className = {classes.plus}>
                    <IconButton size = 'small'
                      onClick = {handleAddNew}
                    >
                      <MdiIcon iconClass ="mdi-plus" size = {20}></MdiIcon>
                    </IconButton>
                  </div>
                </div>
              </Grid>
              <Grid item container xs={6}>
                <Grid item xs = {12}>
                  <TextField 
                    fullWidth 
                    label={intl.get('name')} 
                    variant="outlined" size = "small" 
                    value = {selectCondition?.name || ''}
                    autoFocus
                    onChange = {handleNameChange}
                  />
                </Grid>
                <Grid item xs = {12} style={{marginTop:'16px'}}>
                  <TextField 
                    multiline 
                    fullWidth 
                    rows = {10} 
                    label={intl.get('express-tip')} 
                    variant="outlined" 
                    size = "small"
                    value = {selectCondition?.expression || ''} 
                    onChange = {handleExpressionChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions className = {classes.actions}>
          <Button onClick={handleClose} >
            {intl.get('cancel')}
          </Button>
          <SubmitButton 
            onClick={handleSave} 
            variant = "contained" 
            color="primary"
            submitting = {loading}
          >
            {intl.get('save')}
          </SubmitButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
