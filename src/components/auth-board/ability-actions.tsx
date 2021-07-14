import { makeStyles, Theme, createStyles, Grid, Checkbox, FormControlLabel } from "@material-ui/core";
import classNames from "classnames";
import { useState } from "react";
import { ActionLabel } from "./action-label";
import { ActionAbility, ActionWithExpression } from "./action-with-expression";
import { RxRole } from "./interface/rx-role";

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

export function AbilityActions(props:{
  role?: RxRole,
  isEnity: boolean,
}){
  const {role, isEnity} = props;
  const [readAbility, setReadAbility] = useState<ActionAbility>({can:true, expression:''});
  const classes = useStyles();

  const handleReadChange = (ability:ActionAbility)=>{
    setReadAbility(ability);
  }

  return(
    <div className = {classes.root}>
      <Grid container alignItems = "center">
        {
          role&&
          <>
            <Grid item className={classNames(classes.actionGrid, classes.createGrid)}>
              {
                isEnity && 
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
              }
            </Grid>
            <Grid item className={classes.actionGrid}>
              {
                isEnity &&
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
              }
            </Grid>
            <Grid item className={classes.actionGrid}>
              <ActionWithExpression ability = {readAbility} label = '读取' onAbilityChange = {handleReadChange} />
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

          </>
        }
      </Grid>

    </div>

  )
}