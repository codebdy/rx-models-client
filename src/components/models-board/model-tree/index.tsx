import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import intl from 'react-intl-universal';
import { NodeLabel } from './node-label';
import { TreeNode } from './tree-node';
import MdiIcon from 'components/common/mdi-icon';
import { IconButton } from '@material-ui/core';

interface RenderTree {
  id: string;
  name: string;
  children?: RenderTree[];
}

const data: RenderTree = {
  id: 'root2',
  name: 'ddd',//root-models
  children: [
    {
      id: '1',
      name: 'Child - 1',
    },
    {
      id: '3',
      name: 'Child - 3',
      children: [
        {
          id: '4',
          name: 'Child - 4',
        },
      ],
    },
  ],
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding:theme.spacing(1),
    },
    rootAction: {
      position:'absolute',
      right:'5px',
    }
  }),
);

export default function ModelTree() {
  const classes = useStyles();

  const renderTree = (nodes: RenderTree) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem nodeId='root' label={
        <TreeNode>
          <MdiIcon iconClass = "mdi-cube-outline" size={18} />
          <NodeLabel>{intl.get('root-models')}</NodeLabel>
          <div className={classes.rootAction}>
            <IconButton size = "small">
              <MdiIcon className="mdi-dots-horizontal" size="16" />
            </IconButton>
          </div>
        </TreeNode>
      }>
        {renderTree(data)}
      </TreeItem>
      
    </TreeView>
  );
}
