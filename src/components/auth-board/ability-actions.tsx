import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { AbilityActionItem } from "./ability-action-item";
import { AbilityCondition } from "./interface/ability-condition";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      width:'600px',
    },
  }),
);

export function AbilityActions(props:{
  conditions:AbilityCondition[],
  selectedRoleId: number|'',
}){
  const {conditions, selectedRoleId} = props;
  const classes = useStyles();

  return(
    <div className = {classes.root}>
      <AbilityActionItem selectedRoleId = {selectedRoleId} hasSubCondition = {conditions.length > 0}/>
      {
        conditions.map(con=>{
          return (
            <AbilityActionItem 
              key = {con.uuid} 
              condition = {con} 
              selectedRoleId = {selectedRoleId} 
            />
          )
        })
      }
    </div>

  )
}