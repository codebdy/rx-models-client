import { makeStyles, Theme, createStyles, Grid } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";
import MdiIcon from "components/common/mdi-icon";
import { ColumnMeta } from "components/entity-board/meta/column-meta";
import { AuthAction } from "./auth-action";
import { ExpressArea } from "./express-area";
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
  columnMeta:ColumnMeta
}){
  const {columnMeta} = props; 
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
              <ExpressArea>
                <Grid item xs={4}>

                </Grid>
                <Grid item>
                  自己的
                </Grid>
              </ExpressArea>
              <AuthAction/>
            </div>
          </NodeLabel>
      }>
    </TreeItem>

  )
}