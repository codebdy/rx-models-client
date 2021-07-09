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
import { observer } from 'mobx-react';
import { PackageCreateCommand } from '../command/package-create-command';
import { createId } from 'util/creat-id';
import { getNewPackageName } from '../store/get-new-package-name';
import { PackageStore } from '../store/package';
import { TREE_ROOT_ID } from 'util/consts';
import RootAction from './root-action';

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
        uuid:createId(), 
        name: getNewPackageName(rootStore),
      }, rootStore, rootStore), 
      rootStore
    )
    bordStore.excuteCommand(command);
  } 
  
  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={[TREE_ROOT_ID]}
      defaultExpandIcon={<ChevronRightIcon />}
      selected = {[bordStore?.selectedElement?.uuid || '', bordStore?.openedDiagram?.uuid || '']}
    >
      <TreeItem nodeId={TREE_ROOT_ID} label={
        <TreeNodeLabel
          action = {
            <RootAction onAddPackage = {handleAddPackage} />
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
        {
          rootStore.entities.map(aClass=>{
            return (
              <EntityNode key={aClass.uuid} entityStore = {aClass} />
            )
          })
        }
        {
          rootStore.diagrams.map(diagram=>{
            return (
              <DiagramNode key={diagram.uuid} diagramStore = {diagram} />
            )
          })
        }
      </TreeItem>
      
    </TreeView>
  );
})
