import { makeStyles, Theme, createStyles, Checkbox, FormControlLabel, Grid, IconButton } from "@material-ui/core";
import classNames from "classnames";
import MdiIcon from "components/common/mdi-icon";
import { ActionLabel } from "./action-label";
import { AbilityCondition } from "./interface/ability-condition";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionGrid:{
      width: '25%',
      minHeight:theme.spacing(5),
      display:'flex',
      alignItems:'center',
    },
   createGrid:{
    width: '20%',
   }
  }),
);

export function AbilityActionItem(props:{
  condition?:AbilityCondition,
  selectedRoleId: number|'',
  hasSubCondition?: boolean,
}){
  const{condition, selectedRoleId, hasSubCondition} = props;
  const classes = useStyles();
  
  return (
    <Grid container alignItems = "center">
      {
        selectedRoleId&&
        <>
          <Grid item className={classNames(classes.actionGrid, classes.createGrid)}>
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
              label={<ActionLabel>读取</ActionLabel>}
            />
            <IconButton size = "small">
              <MdiIcon iconClass = "mdi-function-variant" size={16}></MdiIcon>
            </IconButton>

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
            <IconButton size = "small">
              <MdiIcon iconClass = "mdi-function-variant" size={16}></MdiIcon>
            </IconButton>
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
            <IconButton size = "small">
              <MdiIcon iconClass = "mdi-function-variant" size={16}></MdiIcon>
            </IconButton>
          </Grid>
        </>
      }
    </Grid>
  )
}