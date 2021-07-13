import { TreeItem } from "@material-ui/lab";
import MdiIcon from "components/common/mdi-icon";
import { PackageMeta } from "components/entity-board/meta/package-meta";
import { EntityNode } from "./entity-node";
import { EntityAuth } from "./interface/entity-auth";
import { NameLabel } from "./name-label";
import { PackageLabel } from "./package-label";

export function PackageNode(props:{
  packageMeta:PackageMeta,
  selectedRoleId:number|'',
  entityAuths: EntityAuth[],
}){

  const {packageMeta, selectedRoleId, entityAuths} = props; 
  return(
    <TreeItem 
      nodeId = {packageMeta.uuid} 
      label = {
          <PackageLabel>
            <>
              <MdiIcon iconClass = "mdi-folder-outline" size={18} />
              <NameLabel>{packageMeta.name}</NameLabel>
            </>
          </PackageLabel>
      }>
        {
          packageMeta.entities?.map((entity)=>{
            return(
              <EntityNode 
                key ={entity.uuid} 
                entityMeta = {entity} 
                selectedRoleId = {selectedRoleId} 
                entityAuth = {entityAuths.find(entityAth=>entityAth.entityUuid === entity.uuid)}
                entityAuths = {entityAuths}
              />
            )
          })
        }
    </TreeItem>

  )
}