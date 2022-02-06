import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import intl from "react-intl-universal";
import { Tooltip, IconButton, Theme, Grid, TextField } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import MdiIcon from 'components/common/mdi-icon';
import SubmitButton from 'components/common/submit-button';
import { useAuthBoardStore } from '../store/helper';
import { EntityMeta } from 'components/entity-board/meta/entity-meta';

const SqlWhereParser = require('sql-where-parser');
const OPERATOR_UNARY_MINUS = Symbol('-');

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
      paddingRight:theme.spacing(3),
    }

  }),
);


export default function ExpressDialog(
  props:{
    entityMeta:EntityMeta,
    expression:string,
    onExpressionChange:(exp:string)=>void,
  }
) {
  const {entityMeta, expression, onExpressionChange} = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [exp, setExp] = useState(expression);
  const [error, setError] = useState('');

  const borderStore = useAuthBoardStore();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setExp(expression);
    setError('');
    setOpen(false);
  };


  const handleExpressionChange = (event: React.ChangeEvent<{value:string}>)=>{
    setExp(event.target.value);
    setError('');
  }

  const getRelationByName = (entityUuid:string, roleName:string)=>{
    for(const aPackage of borderStore.packages){
      for(const relation of aPackage.relations||[]){
        if(relation.roleOnSource === roleName && relation.sourceId === entityUuid){
          return relation;
        }
        if(relation.roleOnTarget === roleName && relation.targetId === entityUuid){
          return relation;
        }
      } 
    }
  }

  const getEntityByUuid = (entityUuid:string)=>{
    for(const aPackage of borderStore.packages){
      for(const entity of aPackage.entities||[]){
        if(entity.uuid === entityUuid){
          return entity;
        }
      } 
    }
  }


  const validateExpression = (exp: string): string | undefined =>{

    const parser = new SqlWhereParser();

 
    const evaluator = (operatorValue: string | typeof OPERATOR_UNARY_MINUS, operands: any[]) => {
      if (operatorValue === OPERATOR_UNARY_MINUS) {
        operatorValue = '-';
      }
      if (operatorValue === ',') {
        return [].concat(operands[0], operands[1]);
      }
  
      switch (operatorValue) {
        case 'OR':
          return `(${operands.join(' OR ')})`;
        case 'AND':
          return `(${operands.join(' AND ')})`;
        default:
          const arr = operands[0].split('.');

          if (arr.length > 1) {
            const [roleName, columnName] = arr;

            const relation = getRelationByName(entityMeta.uuid, roleName);
            if(!relation){
              throw new Error(`Entity ${entityMeta.name} has not relation ${roleName}`);
            }

            const targetUuid = entityMeta.uuid === relation.sourceId ? relation.targetId : relation.sourceId;
            const targetEntity = getEntityByUuid(targetUuid);

            if(!targetEntity?.columns.find(column=>column.name === columnName)){
              throw new Error(`Relation ${roleName} target entity ${targetEntity?.name} has not column ${columnName}`);
            }
          }
          else{
            if(!entityMeta.columns.find(column=>column.name === operands[0])){
              throw new Error(`Entity ${entityMeta.name} has not column ${operands[0]}`);
            }
          }
      }
    };
  
    try{
      parser.parse(exp, evaluator);
    }
    catch(error){
      return error.message;
    }
  }

  const handleConfirm = ()=>{
    const validateResult = validateExpression(exp, );
    if(validateResult){
      setError(validateResult);
      return;
    }

    onExpressionChange(exp);
    setOpen(false);
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
        <DialogTitle>{intl.get('express-tip')}</DialogTitle>
        <DialogContent>
          <div className = {classes.content}>
            <Grid container>
              <Grid item xs = {12}>
                <TextField 
                  multiline 
                  fullWidth 
                  rows = {16} 
                  variant="outlined" 
                  size = "small"
                  value = {exp||''} 
                  autoFocus
                  onChange = {handleExpressionChange}
                  error = {!!error}
                  helperText = {error}
                />
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions className = {classes.actions}>
          <Button onClick={handleClose} >
            {intl.get('cancel')}
          </Button>
          <SubmitButton 
            onClick={handleConfirm} 
            variant = "contained" 
            color="primary"
          >
            {intl.get('confirm')}
          </SubmitButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
