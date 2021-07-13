import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding:theme.spacing(1, 0),
      display:'flex',
      alignItems:'center',
      fontSize:'0.9rem'
    },
  }),
);

export function PackageLabel(props:{
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