import { TreeItem } from "@material-ui/lab";
import MdiIcon from "components/common/mdi-icon";
import { PackageMeta } from "components/entity-board/meta/package-meta";
import { EntityNode } from "./entity-node";
import { RxEntityAuthSettings } from "../../entity-interface/rx-entity-auth-settings";
import { NameLabel } from "./name-label";
import { PackageLabel } from "./package-label";
import { observer } from "mobx-react";

export const PackageNode = observer((props:{
  packageMeta:PackageMeta,
  entityAuths: RxEntityAuthSettings[],
})=>{

  const {packageMeta, entityAuths} = props; 
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
                entityAuth = {entityAuths.find(entityAth=>entityAth.entityUuid === entity.uuid)}
                entityAuths = {entityAuths}
              />
            )
          })
        }
    </TreeItem>

  )
})