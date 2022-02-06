import { Theme } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import { TreeItem } from "@mui/lab";
import MdiIcon from "components/common/mdi-icon";
import { ColumnMeta } from "components/entity-board/meta/column-meta";
import { AbilityActions } from "./ability-actions";
import { NameLabel } from "./name-label";
import { NodeLabel } from "./node-label";
import { observer } from "mobx-react";
import { EntityMeta } from "components/entity-board/meta/entity-meta";

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


export const ColumnNode = observer((props:{
  entityMeta: EntityMeta,
  columnMeta: ColumnMeta,
})=>{
  const {entityMeta, columnMeta} = props; 
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
              <AbilityActions entityMeta = {entityMeta} columnUuid = {columnMeta.uuid}/>
            </div>
          </NodeLabel>
      }>
    </TreeItem>

  )
})