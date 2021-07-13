import { makeStyles, Theme, createStyles, Checkbox, FormControlLabel, Grid } from "@material-ui/core";
import MdiIcon from "components/common/mdi-icon";
import { ActionLabel } from "./action-label";
import { AbilityCondition } from "./interface/ability-condition";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionGrid:{
      width: '20%',
      minHeight:theme.spacing(5),
      display:'flex',
      alignItems:'center',
    }
  }),
);

export function AbilityActionItem(props:{
  condition?:AbilityCondition,
  selectedRoleId: number|'',
}){
  const{condition, selectedRoleId} = props;
  const classes = useStyles();
  
  return (
    <Grid container alignItems = "center">
      <Grid item className={classes.actionGrid}>
        {
          (condition?.name) 
          ? condition.name
          : <MdiIcon iconClass = "mdi-regex" size={15}></MdiIcon>
        }
        
      </Grid>
      {
        selectedRoleId&&
        <>
          <Grid item className={classes.actionGrid}>
            <FormControlLabel
              control={
                <Checkbox
                  //checked={state.checkedB}
                  //onChange={handleChange}
                  color="primary"
                  size = "small"
                />
              }
              label={<ActionLabel>读取</ActionLabel>}
            />
          </Grid>
          <Grid item className={classes.actionGrid}>
            <FormControlLabel
              control={
                <Checkbox
                  //checked={state.checkedB}
                  //onChange={handleChange}
                  color="primary"
                  size = "small"
                />
              }
              label={<ActionLabel>创建</ActionLabel>}
            />
          </Grid>

          <Grid item className={classes.actionGrid}>
            <FormControlLabel
              control={
                <Checkbox
                  //checked={state.checkedB}
                  //onChange={handleChange}
                  color="primary"
                  size = "small"
                />
              }
              label={<ActionLabel>修改</ActionLabel>}
            />
          </Grid>
          <Grid item className={classes.actionGrid}>
            <FormControlLabel
              control={
                <Checkbox
                  //checked={state.checkedB}
                  //onChange={handleChange}
                  color="primary"
                  size = "small"
                />
              }
              label={<ActionLabel>删除</ActionLabel>}
            />
          </Grid>
        </>
      }
    </Grid>
  )
}