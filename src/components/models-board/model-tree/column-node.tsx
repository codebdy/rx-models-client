import { makeStyles, Theme, createStyles, IconButton } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";
import MdiIcon from "components/common/mdi-icon";
import { ClassStore } from "../store/class-store";
import { ColumnStore } from "../store/column";
import { NodeText } from "./node-text";
import { TreeNodeLabel } from "./tree-node-label";

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {

  },  

}),
);

export function ColumnNode(props:{
  key?:string,
  columnStore: ColumnStore
}){
const {columnStore} = props;
const classes = useStyles();

return(
  <TreeItem nodeId= {columnStore.id} label={
    <TreeNodeLabel
      action = {
        <IconButton size = "small">
          <MdiIcon className="mdi-dots-horizontal" size="16" />
        </IconButton>
      }
    >
      <MdiIcon iconClass = "mdi-folder-outline" size={18} />
      <NodeText>{columnStore.name}</NodeText>
    </TreeNodeLabel>
  }>
  </TreeItem>
)
}
