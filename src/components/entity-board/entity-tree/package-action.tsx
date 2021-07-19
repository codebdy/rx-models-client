import React from 'react';
import { createStyles, Divider, IconButton, makeStyles, Menu, MenuItem, Theme } from '@material-ui/core';
import MdiIcon from 'components/common/mdi-icon';
import intl from 'react-intl-universal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuItem:{
      padding:theme.spacing(1, 3),
    },
    text:{
      marginLeft:'16px',
    }
  }),
);

export default function PackageAction(props:{
  onAddClass:()=>void,
  onAddDiagram:()=>void,
  onDelete:()=>void,
  onPublish:()=>void,
  onDownloadJson:()=>void,
  onExportInterface:()=>void,
}){
  const {onAddClass, onAddDiagram, onDelete, onPublish, onDownloadJson, onExportInterface} = props
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  const handleMenuClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    event.stopPropagation();
  };

  const handleAddEntity = (event: React.MouseEvent<HTMLElement>)=>{
    onAddClass();
    setAnchorEl(null);
    event.stopPropagation();
  }
  
  const handleAddDiagram = (event: React.MouseEvent<HTMLElement>)=>{
    onAddDiagram();
    setAnchorEl(null);
    event.stopPropagation();
  }

 
  const handleDelete = (event: React.MouseEvent<HTMLElement>)=>{
    onDelete()
    setAnchorEl(null);
    event.stopPropagation();
  }

  const handlePublishPackage = (event: React.MouseEvent<HTMLElement>) => {
    onPublish();
    setAnchorEl(null);
    event.stopPropagation();
  }
  
  const handleDownloadJson = (event: React.MouseEvent<HTMLElement>) => {
    onDownloadJson();
    setAnchorEl(null);
    event.stopPropagation();
  }

  const handleExportInterface = (event: React.MouseEvent<HTMLElement>) => {
    onExportInterface();
    setAnchorEl(null);
    event.stopPropagation();
  }

  return (
    <>
      <IconButton size = "small"
        onClick = {handleMenuOpen}
      >
        <MdiIcon className="mdi-dots-horizontal" size="16" />
      </IconButton>
      <Menu
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
          
        >
          <MenuItem onClick={handleAddEntity} className = {classes.menuItem}>
            <MdiIcon iconClass = "mdi-shape-square-rounded-plus"  size={16}/>
            <span className = {classes.text}>{intl.get('add-entity')}  </span>
          </MenuItem>
          <MenuItem onClick={handleAddDiagram} className = {classes.menuItem}>
            <MdiIcon iconClass = "mdi-file-plus-outline"  size={16}/>
            <span className = {classes.text}>{intl.get('add-diagram')}   </span>
          </MenuItem>
          <MenuItem onClick={handleDelete} className = {classes.menuItem}>
            <MdiIcon iconClass = "mdi-trash-can-outline"  size={16}/>
            <span className = {classes.text}>{intl.get('delete')} </span>
          </MenuItem> 
          <Divider/>
          <MenuItem  className = {classes.menuItem}
            onClick = {handlePublishPackage}
          >
            <MdiIcon iconClass = "mdi-database-arrow-up-outline"  size={16} />
            <span className = {classes.text}>{intl.get('publish-package')} </span>
          </MenuItem>
          <MenuItem  className = {classes.menuItem}
            onClick = {handleDownloadJson}
          >
            <MdiIcon iconClass = "mdi-database-arrow-down-outline"  size={16} />
            <span className = {classes.text}>{intl.get('export-json')} </span>
          </MenuItem>
          <MenuItem className = {classes.menuItem}
            onClick = {handleExportInterface}
          >
            <MdiIcon iconClass = "mdi-file-export-outline"  size={16}/>
            <span className = {classes.text}>{intl.get('export-inteface')} </span>
          </MenuItem>

      </Menu>
    </>
  )
}
