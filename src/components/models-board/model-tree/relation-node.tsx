import { IconButton } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";
import MdiIcon from "components/common/mdi-icon";
import { RelationOfClass } from "../store/class-store";
import { NodeText } from "./node-text";
import { TreeNodeLabel } from "./tree-node-label";


export function RelationNode(props:{
  key?:string,
  relation: RelationOfClass
}){
const {relation} = props;

return(
  <TreeItem nodeId= {relation.id} label={
    <TreeNodeLabel
      action = {
        <IconButton size = "small">
          <MdiIcon className="mdi-dots-horizontal" size="16" />
        </IconButton>
      }
    >
      <MdiIcon iconClass = "mdi-relation-many-to-many" size={15} />
      <NodeText>{relation.name}</NodeText>
    </TreeNodeLabel>
  }>
  </TreeItem>
)
}
