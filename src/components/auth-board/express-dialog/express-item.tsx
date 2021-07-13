import { makeStyles, Theme, createStyles, IconButton } from "@material-ui/core";
import MdiIcon from "components/common/mdi-icon";
import { AbilityCondition } from "./ability-condition";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item:{
      height:'40px',
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      userSelect: 'none',
      cursor:'default',
      '&:hover':{
        background:'#f0f0f0',
      },
      padding: theme.spacing(0,1),
    }
  }),
);

export function ExpressItem(props:{
  item: AbilityCondition
}){
  const {item} = props;
  const classes = useStyles();
  return(
    <div className = {classes.item}>
      <div>{item.name}</div>
      <div>
        <IconButton size = 'small'>
          <MdiIcon iconClass ="mdi-trash-can-outline" size = {16}></MdiIcon>
        </IconButton>
      </div>
    </div>
  )
}