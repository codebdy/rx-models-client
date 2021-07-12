import { SvgIcon } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";
import { EntityMeta } from "components/entity-board/meta/entity-meta";

export function EntityNode(props:{
  entityMeta: EntityMeta
}){

  const {entityMeta} = props; 
  return(
     <TreeItem 
        nodeId = {entityMeta.uuid} 
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
              {entityMeta.name}
            </div>
          </div>
      }>
    </TreeItem>
  )
}