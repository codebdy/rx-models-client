import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { AbilityActionItem } from "./ability-action-item";
import { AbilityCondition } from "./express-dialog/ability-condition";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      width:'600px',
    },
  }),
);

export function AbilityActions(props:{
  conditions:AbilityCondition[]
}){
  const {conditions} = props;
  const classes = useStyles();

  return(
    <div className = {classes.root}>
      <AbilityActionItem />
      {
        conditions.map(con=>{
          return (
            <AbilityActionItem key = {con.uuid} condition = {con} />
          )
        })
      }
    </div>

  )
}