import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import intl from 'react-intl-universal';
import { NodeText } from './node-text';
import { TreeNodeLabel } from './tree-node-label';
import MdiIcon from 'components/common/mdi-icon';
import { useModelsBoardStore } from '../store';
import { PackageNode } from './package-node';
import { EntityNode } from './entity-node';
import { DiagramNode } from './diagram-node';
import PackageAction from './package-action';
import { observer } from 'mobx-react';
import { PackageCreateCommand } from '../command/package-create-command';
import { createId } from 'util/creat-id';
import { getNewPackageName } from '../store/get-new-package-name';
import { PackageStore } from '../store/package';
import { EntityCreateOnTreeCommand } from '../command/entity-create-on-tree-command';
import { creatNewEntityMeta } from '../store/create-new-entity-meta';
import { TREE_ROOT_ID } from 'util/consts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding:theme.spacing(1),
    },
  }),
);

export const ModelTreeView = observer(() => {
  const classes = useStyles();
  const bordStore = useModelsBoardStore();
  const rootStore = bordStore.rootStore;

  const handleAddPackage = ()=>{
    const command = new PackageCreateCommand(
      new PackageStore({
        id:createId(), 
        name: getNewPackageName(rootStore),
      }, rootStore), 
      rootStore
    )
    bordStore.excuteCommand(command);
  } 
  
  const handleAddEntity = ()=>{
    const command = new EntityCreateOnTreeCommand(bordStore.rootStore, creatNewEntityMeta(bordStore.rootStore))
    bordStore.excuteCommand(command);
  }
  
  const handleAddDiagram = ()=>{
  
  }
  
  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={[TREE_ROOT_ID]}
      defaultExpandIcon={<ChevronRightIcon />}
      selected = {[bordStore?.selectedElement?.id || '', bordStore?.openedDiagram?.id || '']}
    >
      <TreeItem nodeId={TREE_ROOT_ID} label={
        <TreeNodeLabel
          action = {
            <PackageAction 
              onAddPackage = {handleAddPackage} 
              onAddClass = {handleAddEntity}
              onAddDiagram = {handleAddDiagram}
            />
          }
        >
          <MdiIcon iconClass = "mdi-cube-outline" size={18} />
          <NodeText>{intl.get('root-models')}</NodeText>
        </TreeNodeLabel>
      }>
        {
          rootStore.diagrams.map(diagram=>{
            return (
              <DiagramNode key={diagram.id} diagramStore = {diagram} />
            )
          })
        }

        {
          rootStore.packages.map(aPackage=>{
            return (
              <PackageNode key={aPackage.id} packageStore = {aPackage} />
            )
          })
        }
        {
          rootStore.entities.map(aClass=>{
            return (
              <EntityNode key={aClass.id} entityStore = {aClass} />
            )
          })
        }
      </TreeItem>
      
    </TreeView>
  );
})
