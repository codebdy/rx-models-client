import { TreeItem } from "@material-ui/lab";
import MdiIcon from "components/common/mdi-icon";
import { EntityMeta } from "components/entity-board/meta/entity-meta";
import { RelationMeta } from "components/entity-board/meta/relation-meta";
import { EntityNode } from "./entity-node";
import { NameLabel } from "./name-label";
import { PackageLabel } from "./package-label";

export function RelationNode(props:{
  relation: RelationMeta,
  isSource: boolean,
  entity: EntityMeta
}){

  const {relation, isSource, entity } = props; 
  return(
    <TreeItem 
      nodeId = {entity.uuid + relation.uuid} 
      label = {
          <PackageLabel>
            <>
              <MdiIcon iconClass = "mdi-folder-outline" size={18} />
              <NameLabel>{}</NameLabel>
            </>
          </PackageLabel>
      }>
        {

        }
    </TreeItem>

  )
}