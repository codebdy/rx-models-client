import { IconButton, SvgIcon } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";
import MdiIcon from "components/common/mdi-icon";
import { ClassStore } from "../store/class-store";
import { NodeText } from "./node-text";
import { ColumnNode } from "./column-node";
import { TreeNodeLabel } from "./tree-node-label";
import intl from "react-intl-universal";
import { RelationNode } from "./relation-node";
import { observer } from "mobx-react";


export const ClassNode = observer((props:{
  key?:string,
  classStore: ClassStore
})=>{
  const {classStore} = props;

  const relations = classStore.getRelations();

  return(
    <TreeItem nodeId= {classStore.id} label={
      <TreeNodeLabel
        action = {
          <IconButton size = "small">
            <MdiIcon className="mdi-trash-can-outline" size="16" />
          </IconButton>
        }
      >
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
        <NodeText><div style={{marginLeft:'-8px'}}>{classStore.name}</div></NodeText>
      </TreeNodeLabel>
    }>
      <TreeItem nodeId= {classStore.id + 'columns'} label={
        <TreeNodeLabel
          action = {
            <IconButton size = "small">
              <MdiIcon className="mdi-plus" size="16" />
            </IconButton>
          }
        >
          <NodeText>{intl.get('properties')}</NodeText>
        </TreeNodeLabel>
      }>
        {
          classStore.columns.map(column=>{
            return (
              <ColumnNode key={column.id} columnStore = {column} />
            )
          })
        }
      </TreeItem>
      {
        relations.length > 0 &&
        <TreeItem nodeId= {classStore.id + 'relations'} label={
          <TreeNodeLabel>
            <NodeText>{intl.get('relations')}</NodeText>
          </TreeNodeLabel>
        }>
          {
            relations.map(relation=>{
              return (
                <RelationNode key={relation.id} relation = {relation} />
              )
            })
          }
        </TreeItem>      
      }

    </TreeItem>
  )
})
