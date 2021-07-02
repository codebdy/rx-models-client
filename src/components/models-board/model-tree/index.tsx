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
import { ClassNode } from './class-node';
import { DiagramNode } from './diagram-node';
import PackageAction from './package-action';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding:theme.spacing(1),
    },
  }),
);

export default function ModelTree() {
  const classes = useStyles();

  const modelStore = useModelsBoardStore().rootStore;

  const handleAddPackage = ()=>{

  }
  
  const handleAddClass = ()=>{
  
  }
  
  const handleAddDiagram = ()=>{
  
  }
  
  const handleDelete = ()=>{
    
  }

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem nodeId='root' label={
        <TreeNodeLabel
          action = {
            <PackageAction 
              onAddPackage = {handleAddPackage} 
              onAddClass = {handleAddClass}
              onAddDiagram = {handleAddDiagram}
              onDelete = {handleDelete}
            />
          }
        >
          <MdiIcon iconClass = "mdi-cube-outline" size={18} />
          <NodeText>{intl.get('root-models')}</NodeText>
        </TreeNodeLabel>
      }>
        {
          modelStore.packages.map(aPackage=>{
            return (
              <PackageNode key={aPackage.id} packageStore = {aPackage} />
            )
          })
        }
        {
          modelStore.classes.map(aClass=>{
            return (
              <ClassNode key={aClass.id} classStore = {aClass} />
            )
          })
        }
        {
          modelStore.diagrams.map(diagram=>{
            return (
              <DiagramNode key={diagram.id} diagramStore = {diagram} />
            )
          })
        }
      </TreeItem>
      
    </TreeView>
  );
}
