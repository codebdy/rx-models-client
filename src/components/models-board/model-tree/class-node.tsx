import { makeStyles, Theme, createStyles, IconButton } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";
import MdiIcon from "components/common/mdi-icon";
import { ClassStore } from "../store/class-store";
import { NodeText } from "./node-text";
import { ProperytNode } from "./property-node";
import { TreeNodeLabel } from "./tree-node-label";

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {

  },  

}),
);

export function ClassNode(props:{
  classStore: ClassStore
}){
const {classStore} = props;
const classes = useStyles();

return(
  <TreeItem nodeId= {classStore.id} label={
    <TreeNodeLabel
      action = {
        <IconButton size = "small">
          <MdiIcon className="mdi-dots-horizontal" size="16" />
        </IconButton>
      }
    >
      <MdiIcon iconClass = "mdi-folder-outline" size={18} />
      <NodeText>{classStore.name}</NodeText>
    </TreeNodeLabel>
  }>
    {
      classStore.columns.map(column=>{
        return (
          <ProperytNode key={column.id} columnStore = {column} />
        )
      })
    }
  </TreeItem>
)
}
