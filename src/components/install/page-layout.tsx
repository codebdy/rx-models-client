import { Divider, Grid, Theme } from '@mui/material';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:1,
      display:'flex',
      flexFlow:'column'
    },

    content:{
      marginTop:theme.spacing(2),
      flex:1,
    },

    action:{
      marginTop:theme.spacing(2),
      marginBottom:theme.spacing(-1),
    }

  }),
);
export const PageLayout=(
  props:{
    children:any,
    action:any
  }
)=>{
  const {children, action} = props;
  const classes = useStyles();
  
  return (
    <div className = {classes.root}>
      <div className = {classes.content}>
        <Grid item container spacing = {3}>
          {children}
        </Grid>
      </div>
      <Divider></Divider>
      <div className= {classes.action}>
        <Grid item xs={12} container justifyContent="flex-end">
          {action}
        </Grid>    
      </div>
    </div>
  )
}