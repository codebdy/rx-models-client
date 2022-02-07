import React from "react";
import { IconButton, Menu, MenuItem, Theme } from "@mui/material";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import MdiIcon from "components/common/mdi-icon";
import intl from "react-intl-universal";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuItem: {
      padding: theme.spacing(1, 3),
    },
    text: {
      marginLeft: "16px",
    },
  })
);

export default function LocalModelAction(props: {
  onAddPackage: () => void;
  onImportPackage: () => void;
}) {
  const { onAddPackage, onImportPackage } = props;
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

  const handleAddPackage = (event: React.MouseEvent<HTMLElement>) => {
    onAddPackage();
    setAnchorEl(null);
    event.stopPropagation();
  };

  const handleImportPackage = (event: React.MouseEvent<HTMLElement>) => {
    onImportPackage();
    setAnchorEl(null);
    event.stopPropagation();
  };

  return (
    <>
      <IconButton size="small" onClick={handleMenuOpen}>
        <MoreVertOutlinedIcon fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        //getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleAddPackage} className={classes.menuItem}>
          <MdiIcon iconClass="mdi-folder-plus-outline" size={16} />
          <span className={classes.text}>{intl.get("add-package")} </span>
        </MenuItem>
        <MenuItem onClick={handleImportPackage} className={classes.menuItem}>
          <MdiIcon iconClass="mdi-database-import-outline" size={16} />
          <span className={classes.text}>{intl.get("import-package")} </span>
        </MenuItem>
      </Menu>
    </>
  );
}
