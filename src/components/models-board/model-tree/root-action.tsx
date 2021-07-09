import React from 'react';
import { createStyles, IconButton, makeStyles, Menu, MenuItem, Theme } from '@material-ui/core';
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

export default function RootAction(props:{
  onAddPackage:(event:React.MouseEvent)=>void
}){
  const {onAddPackage} = props;
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
          <MenuItem onClick={onAddPackage} className = {classes.menuItem}>
            <MdiIcon iconClass = "mdi-folder-plus-outline"  size={16}/>
            <span className = {classes.text}>{intl.get('add-package')} </span>
          </MenuItem>
          <MenuItem className = {classes.menuItem}>
            <MdiIcon iconClass = "mdi-database-import-outline"  size={16}/>
            <span className = {classes.text}>{intl.get('import-package')} </span>
          </MenuItem>
      </Menu>
    </>
  )
}
