import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { AbilityActionItem } from "./ability-action-item";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      width:'600px',
    },
  }),
);

export function AbilityActions(props:{
  selectedRoleId: number|'',
}){
  const {selectedRoleId} = props;
  const classes = useStyles();

  return(
    <div className = {classes.root}>
      <AbilityActionItem selectedRoleId = {selectedRoleId} />
    </div>

  )
}