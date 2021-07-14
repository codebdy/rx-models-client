import { FormControlLabel, Checkbox } from "@material-ui/core";
import React from "react";
import { ActionLabel } from "./action-label";
import ExpressDialog from "./express-dialog";

export interface ActionAbility{
  can:boolean,
  expression:string,
}

export function ActionWithExpression(props:{
  label: string,
  ability: ActionAbility,
  onAbilityChange:(ability:ActionAbility)=>void,
}){
  const {label, ability, onAbilityChange} = props;

  const handleCanChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    onAbilityChange({...ability, can: event.target.checked});
  }

  const handleExpChange = (exp:string)=>{
    onAbilityChange({...ability, expression: exp});
  }

  return(
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={ability.can}
            onChange={handleCanChange}
            color="primary"
            size = "small"
          />
        }
        label={<ActionLabel>{label}</ActionLabel>}
      />
      {
        ability.can &&
        <ExpressDialog expression = {ability.expression} onExpressionChange = {handleExpChange}/>
      }
    </>
  )
}