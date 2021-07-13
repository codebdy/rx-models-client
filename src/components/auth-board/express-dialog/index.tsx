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
import { AbilityCondition } from './ability-condition';
import { createId } from 'util/creat-id';

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
    }

  }),
);


export default function ExpressDialog(
  props:{
    onOpenChange:(open:boolean)=>void,
    abilityCondigions:AbilityCondition[],
    onChange:(abilityCondigions:AbilityCondition[])=>void,
  }
) {
  const {onOpenChange, abilityCondigions, onChange} = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [conditions, setConditions] = useState<AbilityCondition[]>(JSON.parse(JSON.stringify(abilityCondigions)));
  const [selectedId, setSelectedId] = useState<string|undefined>(abilityCondigions?.length ? abilityCondigions[0].uuid : undefined);

  const handleClickOpen = () => {
    setOpen(true);
    onOpenChange(true);
  };

  const handleClose = () => {
    setOpen(false);
    onOpenChange(false);
  };

  const handleAddNew = ()=>{
    const newCondition =  {uuid:createId(), name:'new Condtion', expression :''};
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

  const handleConfirm = ()=>{
    onChange(abilityCondigions);
    handleClose();
  }

  return (
    <div>
      <Tooltip title={intl.get('express-tip')}>
        <IconButton size = "small" onClick={handleClickOpen}>
          <MdiIcon iconClass = "mdi-regex" size={18}></MdiIcon>
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
        <DialogActions>
          <Button onClick={handleClose} >
            {intl.get('cancel')}
          </Button>
          <Button onClick={handleConfirm} variant = "contained" color="primary" autoFocus>
          {intl.get('confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
