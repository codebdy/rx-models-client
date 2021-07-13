import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";
import MdiIcon from "components/common/mdi-icon";
import { ColumnMeta } from "components/entity-board/meta/column-meta";
import { AbilityActions } from "./ability-actions";
import { AbilityCondition } from "./express-dialog/ability-condition";
import { NameLabel } from "./name-label";
import { NodeLabel } from "./node-label";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nodeName:{
      display:'flex',
      alignItems:'center',
    },
    actionArea:{
      display:'flex',
    }
  }),
);


export function ColumnNode(props:{
  columnMeta: ColumnMeta,
  conditions: AbilityCondition[]
}){
  const {columnMeta, conditions} = props; 
  const classes = useStyles();

  return(
    <TreeItem 
      nodeId = {columnMeta.uuid} 
      label = {
          <NodeLabel>
            <div className={classes.nodeName}>
              <MdiIcon iconClass = "mdi-rhombus-outline" size={12} />
              <NameLabel>{columnMeta.name}</NameLabel>
            </div>
            <div className = {classes.actionArea}>
              <AbilityActions conditions = {conditions}/>
            </div>
          </NodeLabel>
      }>
    </TreeItem>

  )
}