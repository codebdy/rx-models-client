import { makeStyles, Theme, createStyles, IconButton } from "@material-ui/core";
import classNames from "classnames";
import MdiIcon from "components/common/mdi-icon";
import { AbilityCondition } from "../interface/ability-condition";

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
    },
    selected:{
      background:'rgba(0,0,255, 0.1)',
      '&:hover':{
        background:'rgba(0,0,255, 0.1)',
      },
    }
  }),
);

export function ExpressItem(props:{
  item: AbilityCondition,
  isSelected: boolean,
  onSelect:(uuid:string)=>void,
  onDelete:(uuid:string)=>void,
}){
  const {item, isSelected, onSelect, onDelete} = props;
  const classes = useStyles();
  const handleClick = ()=>{
    onSelect(item.uuid);
  }

  const handleDelete = (event:React.MouseEvent)=>{
    onDelete(item.uuid);
    event.stopPropagation();
  }

  return(
    <div 
      className = {classNames(classes.item, {[classes.selected]:isSelected})}
      onClick = {handleClick}
    >
      <div>{item.name}</div>
      <div>
        <IconButton 
          size = 'small'
          onClick = {handleDelete}
        >
          <MdiIcon iconClass ="mdi-trash-can-outline" size = {16}></MdiIcon>
        </IconButton>
      </div>
    </div>
  )
}