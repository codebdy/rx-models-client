import { makeStyles, Theme, createStyles, IconButton } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";
import MdiIcon from "components/common/mdi-icon";
import { PackageStore } from "../store/package";
import { NodeText } from "./node-text";
import { TreeNodeLabel } from "./tree-node-label";

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {

  },  

}),
);

export function PackageNode(props:{
  packageStore: PackageStore
}){
const {packageStore} = props;
const classes = useStyles();

return(
  <TreeItem nodeId= {packageStore.id} label={
    <TreeNodeLabel
      action = {
        <IconButton size = "small">
          <MdiIcon className="mdi-dots-horizontal" size="16" />
        </IconButton>
      }
    >
      <MdiIcon iconClass = "mdi-folder-outline" size={18} />
      <NodeText>{packageStore.name}</NodeText>
    </TreeNodeLabel>
  }>
    {
      packageStore.packages.map(aPackage=>{
        return (
          <PackageNode packageStore = {aPackage} />
        )
      })
    }
  </TreeItem>
)
}
