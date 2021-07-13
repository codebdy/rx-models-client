import { makeStyles, Theme, createStyles, FormControlLabel, Checkbox, Grid, IconButton, Switch } from "@material-ui/core";
import MdiIcon from "components/common/mdi-icon";

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
              />
            }
            label="读取"
          />
        </Grid>
        <Grid item className={classes.actionGrid}>
          <FormControlLabel
            control={
              <Checkbox
                //checked={state.checkedB}
                //onChange={handleChange}
                color="primary"
              />
            }
            label="创建"
          />
        </Grid>

        <Grid item className={classes.actionGrid}>
          <FormControlLabel
            control={
              <Checkbox
                //checked={state.checkedB}
                //onChange={handleChange}
                color="primary"
              />
            }
            label="修改"
          />
        </Grid>
        <Grid item className={classes.actionGrid}>
          <FormControlLabel
            control={
              <Checkbox
                //checked={state.checkedB}
                //onChange={handleChange}
                color="primary"
              />
            }
            label="删除"
          />
        </Grid>
      </Grid>
    </div>

  )
}