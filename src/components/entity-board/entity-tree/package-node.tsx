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
import { API_PUBLISH_PACKAGE } from "apis/install";
import { useShowServerError } from "store/helpers/use-show-server-error";
import { CircularProgress } from "@material-ui/core";
import { useAppStore } from "store/app-store";
import intl from 'react-intl-universal';
import { PackageSourceGenerator } from "./package-source-generator";
import { useLazyAxios } from "@rxdrag/rxmodels-swr";

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
  const appStore = useAppStore();
  const rootStore = useEntityBoardStore();
  const [excutePublish, {loading, error}] = useLazyAxios(API_PUBLISH_PACKAGE,{
    onCompleted(){
      appStore.showSuccessAlert();
    }
  })

  useShowServerError(error);

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

  const handlePublish = ()=>{
    if(rootStore.changed){
      appStore.infoError(intl.get('please-save-first'));
    }else{
      excutePublish({data:packageStore.toMeta()});
    }
  }

  const handleDownloadJson = ()=>{
    downloadFile(packageStore.uuid + '.json', JSON.stringify(packageStore.toMeta(), null, 2));
  }

  const handelExportInterface = ()=>{
    if(rootStore.changed){
      appStore.infoError(intl.get('please-save-first'));
    }else{
      const packageGenerator = new PackageSourceGenerator(packageStore, rootStore);
      packageGenerator.generate();
    }
  }

  return(
    <TreeItem nodeId= {packageStore.uuid} label={
      <TreeNodeLabel
        action = {
          <PackageAction 
            onAddClass = {handleAddEntity}
            onAddDiagram = {handleAddDiagram}
            onDelete = {handleDelete} 
            onPublish = {handlePublish}
            onDownloadJson = {handleDownloadJson}  
            onExportInterface ={handelExportInterface}       
          />
        }
        onClick = {handleClick}
      >
        <MdiIcon iconClass = "mdi-folder-outline" size={18} />
        <NodeText>{packageStore.name}</NodeText>
        {
          loading &&
          <CircularProgress size ={18} />
        }
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
