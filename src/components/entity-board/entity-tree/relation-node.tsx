import { IconButton, SvgIcon } from "@mui/material";
import { TreeItem } from "@mui/lab";
import MdiIcon from "components/common/mdi-icon";
import { observer } from "mobx-react";
import { RelationDeleteCommand } from "../command/relation-delete-command";
import { useEntityBoardStore } from "../store/helper";
import { EntityStore } from "../store/entity-store";
import { RelationStore } from "../store/relation";
import { NodeText } from "./node-text";
import { TreeNodeLabel } from "./tree-node-label";
import { RelationType } from "../meta/relation-meta";


export const RelationNode = observer((props:{
  key?:string,
  relation: RelationStore,
  isSource: boolean,
  entityStore: EntityStore
})=>{
  const {relation, isSource, entityStore} = props;
  const bordStore = useEntityBoardStore();
  const handleClick = ()=>{
    bordStore.setSelectedElement(relation);
  }

  const handleDelete = ()=>{
    const command = new RelationDeleteCommand(relation);
    bordStore.excuteCommand(command);
  }

  const isInherit = relation.relationType === RelationType.INHERIT;

  const targetEntity = bordStore.getEntityById(relation.targetId);

  return(
    <TreeItem nodeId= {relation.uuid} label={
      <TreeNodeLabel
        action = {
          <IconButton 
            size = "small"
            onClick = {handleDelete}
          >
            <MdiIcon className="mdi-trash-can-outline" size="16" />
          </IconButton>
        }
        onClick = {handleClick}
      >
        {
          isInherit 
            ? <SvgIcon style={{width:12, height:12}}><path fill="currentColor" d="M12,2L1,21H23M12,6L19.53,19H4.47" /></SvgIcon>
            : <MdiIcon iconClass = "mdi-relation-many-to-many" size={12} />
        }
        
        <NodeText>
          <>
          {
            isInherit &&
              targetEntity?.name
          }
          {
            isSource && !isInherit
              ? relation.roleOnSource
              : relation.roleOnTarget
          }
          {
            relation.ownerId === entityStore.uuid && !isInherit &&
            <MdiIcon iconClass = "mdi-account-outline" size={12} />
          }
          </>
        </NodeText>
      </TreeNodeLabel>
    }>
    </TreeItem>
  )
})
