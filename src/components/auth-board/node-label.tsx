import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display:'flex',
      justifyContent: 'space-between',
      fontSize:'0.9rem'
    },
  }),
);

export function NodeLabel(props:{
  children:any,
}){
  const {children} = props;
  const classes = useStyles();
  return(
    <div className = {classes.root}>
      {children}
    </div>
  )
}