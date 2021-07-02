import React from 'react';
import { createStyles, Divider, IconButton, makeStyles, Menu, MenuItem, Theme } from '@material-ui/core';
import MdiIcon from 'components/common/mdi-icon';
import intl from 'react-intl-universal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuItem:{
      padding:theme.spacing(1, 3),
    },
    deleteText:{
      marginLeft:'16px',
    }
  }),
);

export default function PackageAction(props:{
  hasDelete?:boolean,
  onAddPackage:()=>void,
  onAddClass:()=>void,
  onAddDiagram:()=>void,
  onDelete:()=>void,
}){
  const {hasDelete, onAddPackage, onAddClass, onAddDiagram, onDelete} = props
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

  const handleAddPackage = (event: React.MouseEvent<HTMLElement>)=>{
    onAddPackage();
    setAnchorEl(null);
    event.stopPropagation();
  }
  
  const handleAddClass = (event: React.MouseEvent<HTMLElement>)=>{
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
          <MenuItem onClick={handleAddPackage} className = {classes.menuItem}>
            {intl.get('add-package')} 
          </MenuItem>
          <MenuItem onClick={handleAddClass} className = {classes.menuItem}>
            {intl.get('add-class')} 
          </MenuItem>
          <MenuItem onClick={handleAddDiagram} className = {classes.menuItem}>
            {intl.get('add-diagram')} 
          </MenuItem>
          {
            hasDelete&&
            <div>
              <Divider/>
              <MenuItem onClick={handleDelete} className = {classes.menuItem}>
                <MdiIcon iconClass = "mdi-trash-can-outline"  color = "red" size={16}/>
                <span className = {classes.deleteText}>{intl.get('delete')} </span>
              </MenuItem> 
            </div>           
          }

      </Menu>
    </>
  )
}
