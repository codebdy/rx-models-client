import React from 'react';
import { observer } from "mobx-react"
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
    },
    iconButton:{
      width:'38px',
      height:'38px',
    },
  }),
);

export const ServerActionMenu = observer(()=>{
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
      <IconButton className = {classes.iconButton}
        onClick = {handleMenuOpen}
      >
        <MdiIcon className="mdi-cog-transfer-outline" />
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
          <MenuItem  className = {classes.menuItem}>
            <MdiIcon iconClass = "mdi-database-refresh-outline" />
            <span className = {classes.text}>{intl.get('database-sync')} </span>
          </MenuItem>
          <MenuItem className = {classes.menuItem}>
            <MdiIcon iconClass = "mdi-file-export-outline"/>
            <span className = {classes.text}>{intl.get('export-inteface')} </span>
          </MenuItem>
      </Menu>
    </>
  )
})