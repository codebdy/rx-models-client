import { TreeItem } from "@material-ui/lab";
import MdiIcon from "components/common/mdi-icon";
import { observer } from "mobx-react";
import React from "react";
import { useEntityBoardStore } from "../store/helper";
import { PackageStore } from "../store/package";
import { EntityNode } from "./entity-node";
import { DiagramNode } from "./diagram-node";
import { NodeText } from "./node-text";
import PackageAction from "./package-action";
import { TreeNodeLabel } from "./tree-node-label";
import { createId } from "util/creat-id";
import { EntityCreateOnTreeCommand } from "../command/entity-create-on-tree-command";
import { creatNewEntityMeta } from "../store/create-new-entity-meta";
import { DiagramCreateCommand } from "../command/diagram-create-command";
import { getNewDiagramName } from "../store/get-new-diagram-name";
import { PackageDeleteCommand } from "../command/package-delete-command";

const downloadFile = function (filename:string, content:string) {
  // 创建隐藏的可下载链接
  var eleLink = document.createElement('a');
  eleLink.download = filename;
  eleLink.style.display = 'none';
  // 字符内容转变成blob地址
  var blob = new Blob([content]);
  eleLink.href = URL.createObjectURL(blob);
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
};

export const PackageNode = observer((props:{
  key?:string,
  packageStore: PackageStore
})=>{
  const {packageStore} = props;
  const rootStore = useEntityBoardStore();

  const handleClick = (event:React.MouseEvent)=>{
    rootStore.setSelectedElement(packageStore);
    event.stopPropagation();
  }

  const handleAddEntity = ()=>{
    const command = new EntityCreateOnTreeCommand(packageStore, creatNewEntityMeta(rootStore))
    rootStore.excuteCommand(command);
  }

  const handleAddDiagram = ()=>{
    const command = new DiagramCreateCommand({
      uuid: createId(),
      name: getNewDiagramName(packageStore),
      nodes:[],
      edges:[]
    }, packageStore, rootStore);
    rootStore.excuteCommand(command);
  }

  const handleDelete = ()=>{
    const command = new PackageDeleteCommand(packageStore);
    rootStore.excuteCommand(command);
  }

  const handleDownloadJson = ()=>{
    downloadFile(packageStore.uuid + '.json', JSON.stringify(packageStore.toMeta(), null, 2));
  }

  return(
    <TreeItem nodeId= {packageStore.uuid} label={
      <TreeNodeLabel
        action = {
          <PackageAction 
            onAddClass = {handleAddEntity}
            onAddDiagram = {handleAddDiagram}
            onDelete = {handleDelete} 
            onDownloadJson = {handleDownloadJson}         
          />
        }
        onClick = {handleClick}
      >
        <MdiIcon iconClass = "mdi-folder-outline" size={18} />
        <NodeText>{packageStore.name}</NodeText>
      </TreeNodeLabel>
    }>
      {
        packageStore.entities.map(aClass=>{
          return (
            <EntityNode key={aClass.uuid} entityStore = {aClass} />
          )
        })
      }
      {
        packageStore.diagrams.map(diagram=>{
          return (
            <DiagramNode key={diagram.uuid} diagramStore = {diagram} />
          )
        })
      }
    </TreeItem>
  )
})
