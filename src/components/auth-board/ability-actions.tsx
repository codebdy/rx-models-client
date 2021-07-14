import { makeStyles, Theme, createStyles, Grid } from "@material-ui/core";
import classNames from "classnames";
import { ActionWithExpression } from "./action-with-expression";
import { observer } from "mobx-react";
import { useAuthBoardStore } from "./store/helper";
import intl from 'react-intl-universal';
import { AbilityType, RxAbility } from "entity-interface/rx-ability";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      width:'600px',
    },
    actionGrid:{
      width: '25%',
      display:'flex',
      alignItems:'center',
    },
   createGrid:{
    width: '20%',
   }
  }),
);


export const AbilityActions = observer((props:{
  entityUuid:string,
  columnUuid?:string,
})=>{
  const {entityUuid, columnUuid} = props;
  const classes = useStyles();

  const boardStore = useAuthBoardStore();

  const findAbilityByType = (type:AbilityType):RxAbility=>{
    return boardStore.selectRole?.abilities?.find(
      ability=>ability.entityUuid === entityUuid 
      && (ability.columnUuid||undefined) === columnUuid 
      && ability.abilityType === type
    ) || {can:false, expression:'', entityUuid:entityUuid, columnUuid: columnUuid, abilityType:type};

  }

  const createAbility = findAbilityByType(AbilityType.CREATE);
  const deleteAbility = findAbilityByType(AbilityType.DELETE);
  const readAbility = findAbilityByType(AbilityType.READ);
  const updateAbility = findAbilityByType(AbilityType.UPDATE);

  const handleAbilityChange = (ability:RxAbility)=>{
    if(ability.can){
      boardStore?.selectRole?.upateAbility(ability);
    }
    else{
      boardStore?.selectRole?.removeAbiltiy(ability);
    }

    boardStore.setChanged(true);
  }

  const isEntity = !columnUuid;

  return(
    <div className = {classes.root}>
      <Grid container alignItems = "center">
        {
          boardStore.selectRole&&
          <>
            <Grid item className={classNames(classes.actionGrid, classes.createGrid)}>
              {
                isEntity && 
                <ActionWithExpression ability = {createAbility} label = {intl.get('create')} onAbilityChange = {handleAbilityChange} noExpression />            
              }
            </Grid>
            <Grid item className={classes.actionGrid}>
              {
                isEntity &&
                <ActionWithExpression ability = {deleteAbility} label = {intl.get('delete')} onAbilityChange = {handleAbilityChange} />            
              }
            </Grid>
            <Grid item className={classes.actionGrid}>
              <ActionWithExpression ability = {readAbility} label = {intl.get('read')} onAbilityChange = {handleAbilityChange} />
            </Grid>
            <Grid item className={classes.actionGrid}>
              <ActionWithExpression ability = {updateAbility} label = {intl.get('update')} onAbilityChange = {handleAbilityChange} />
            </Grid>

          </>
        }
      </Grid>

    </div>

  )
})