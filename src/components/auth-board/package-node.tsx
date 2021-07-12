import { SvgIcon } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";
import MdiIcon from "components/common/mdi-icon";
import { PackageMeta } from "components/entity-board/meta/package-meta";

export function PackageNode(props:{
  packageMeta:PackageMeta
}){

  const {packageMeta} = props; 
  return(
    <TreeItem 
      nodeId = {packageMeta.uuid} 
      label = {
          <div>
            <div>
              <MdiIcon iconClass = "mdi-folder-outline" size={18} />
              {packageMeta.name}
            </div>
          </div>
      }>
        {
          packageMeta.entities?.map((entity)=>{
            return(
              <TreeItem 
                nodeId = {entity.uuid} 
                label = {
                    <div>
                      <div>
                        <SvgIcon>
                          <path d="
                            M 1,6
                            L 14,6
                            L 14,19
                            L 1,19
                            L 1,6
                            M 1,11
                            L 14,11
                          " stroke="#000" strokeWidth="1" fill="#fff"></path>
                        </SvgIcon>
                        {entity.name}
                      </div>
                    </div>
                }>
              </TreeItem>
            )
          })
        }
    </TreeItem>

  )
}