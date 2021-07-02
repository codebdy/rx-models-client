import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { useState } from "react";
import { NodeAction } from "./node-action";

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    display:'flex',
    alignItems: 'center',
    padding:'5px 0',
    position:'relative',
  },  

}),
);

export function TreeNodeLabel(props:{
  children:any,
  action?:any,
  onClick?:()=>void
}){
  const {action, children, onClick} = props;
  const classes = useStyles();
  const [hover, setHover] = useState(false);

  return(
    <div
      className={classes.root}
      onMouseOver = {()=>setHover(true)}
      onMouseLeave = {()=>setHover(false)}  
      onClick = {onClick}
    >
      {children}
      {
        hover &&
        <NodeAction>
          {action}
        </NodeAction>
      }
    </div>    
  )
}
