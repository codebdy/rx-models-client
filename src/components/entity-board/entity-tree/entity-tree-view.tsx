import React, { useRef } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import intl from 'react-intl-universal';
import { NodeText } from './node-text';
import { TreeNodeLabel } from './tree-node-label';
import MdiIcon from 'components/common/mdi-icon';
import { useEntityBoardStore } from '../store/helper';
import { PackageNode } from './package-node';
import { observer } from 'mobx-react';
import { PackageCreateCommand } from '../command/package-create-command';
import { createId } from 'util/creat-id';
import { getNewPackageName } from '../store/get-new-package-name';
import { PackageStore } from '../store/package';
import { TREE_ROOT_ID } from 'util/consts';
import RootAction from './root-action';
import { PackageStatus } from '../meta/package-meta';
import { useAppStore } from 'store/app-store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding:theme.spacing(1),
    },
  }),
);

export const EntityTreeView = observer(() => {
  const classes = useStyles();
  const rootStore = useEntityBoardStore();
  const fileInputRef = useRef(null);
  const appStore = useAppStore();

  const handleAddPackage = ()=>{
    const command = new PackageCreateCommand(
      new PackageStore({
        uuid:createId(), 
        name: getNewPackageName(rootStore),
        status: PackageStatus.EDITING
      }, rootStore), 
      rootStore
    )
    rootStore.excuteCommand(command);
  } 

  const handleImportPackage = ()=>{
    if(fileInputRef.current){
      (fileInputRef.current as any)?.click();
    }
  }

  const handlePackageFileInputChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const pacakgeFile = event.target.files ? event.target.files[0] : undefined;
    if(pacakgeFile){
      var reader = new FileReader();
      reader.readAsText(pacakgeFile,'utf-8');
      reader.onload = ()=>{
        if(!reader.result){
          appStore.infoError(intl.get('package-file-illegal'));
          return;
        }
        const aPackage = JSON.parse(reader.result as string);
        if(!aPackage.uuid){
          appStore.infoError(intl.get('package-file-illegal'));
          return;
        }

        if(rootStore.packages.find(apk => apk.uuid === aPackage.uuid)){
          appStore.infoError(intl.get('package-exist'));
          return;
        }
        const command = new PackageCreateCommand(new PackageStore(aPackage, rootStore), rootStore);
        rootStore.excuteCommand(command);
      }
    }
  }
  
  return (
    <>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={[TREE_ROOT_ID]}
        defaultExpandIcon={<ChevronRightIcon />}
        selected = {[rootStore?.selectedElement?.uuid || '', rootStore?.openedDiagram?.uuid || '']}
      >
        <TreeItem nodeId={TREE_ROOT_ID} label={
          <TreeNodeLabel
            action = {
              <RootAction 
                onAddPackage = {handleAddPackage} 
                onImportPackage = {handleImportPackage}
              />
            }
          >
            <MdiIcon iconClass = "mdi-cube-outline" size={18} />
            <NodeText>{intl.get('root-models')}</NodeText>
          </TreeNodeLabel>
        }>
          {
            rootStore.packages.map(aPackage=>{
              return (
                <PackageNode key={aPackage.uuid} packageStore = {aPackage} />
              )
            })
          }
        </TreeItem>
        
      </TreeView>
      <input ref = {fileInputRef} type="file" accept=".json"
        style={{ display:"none", }}
        onChange={handlePackageFileInputChange}
      />
    </>
  );
})
