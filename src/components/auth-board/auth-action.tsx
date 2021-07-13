import { makeStyles, Theme, createStyles, FormControlLabel, Checkbox, Grid, IconButton, Switch } from "@material-ui/core";
import MdiIcon from "components/common/mdi-icon";
import { ActionLabel } from "./action-label";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      width:'400px',
    },
    actionGrid:{
      width: '25%'
    }
  }),
);

export function AuthAction(props:{
}){
  const classes = useStyles();
  return(
    <div className = {classes.root}>
      <Grid container alignItems = "center">
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
      </Grid>
    </div>

  )
}