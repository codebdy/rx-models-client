import React, { useCallback, useState } from "react";
import {
  Theme,
  IconButton,
  Box,
  createTheme,
  ThemeProvider,
  Menu,
  MenuItem,
  SvgIcon,
  Typography,
  Divider,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import classNames from "classnames";
import ColumnView from "./ColumnView";
import { EntityType } from "components/EntityBoard/meta/EntityMeta";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { EntityNodeData } from "./EntityNodeData";
import { PRIMARY_COLOR } from "util/consts";
import useShadows from "util/use-shadows";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import intl from "react-intl-universal";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    entityName: {
      width: "100%",
      padding: "2px 0",
      display: "flex",
      flexFlow: "column",
      position: "relative",
    },
    nameItem: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
    },
    smFont: {
      fontSize: "0.9rem",
    },
    columnPuls: {
      display: "flex",
      justifyContent: "center",
    },
    columnButton: {
      width: "24px",
      height: "24px",
    },
  })
);

export const EntityView = (props: {
  onColumnSelect?: (columnId: string) => void;
  onColumnDelete?: (entityId: string, columnId: string) => void;
  onColumnCreate?: (entityId: string) => void;
  onHide?: (entityId: string) => void;
  onDeleteProperty?: (id: string) => void;
  onAddProperty?: () => void;
  node?: any;
}) => {
  const classes = useStyles();
  const { node, onColumnSelect, onColumnDelete, onColumnCreate, onHide } =
    props;
  const [hover, setHover] = useState(false);
  const data: EntityNodeData | undefined = node?.data;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const theme = createTheme({
    palette: {
      mode: data?.themeMode || "dark",
      primary: {
        main: PRIMARY_COLOR,
      },
    },

    shadows: [...useShadows()] as any,
  });

  const canLink =
    node.data.isPressedRelation &&
    data?.entityType !== EntityType.Enum &&
    data?.entityType !== EntityType.Interface;
  const disableHover = !!node.data.isPressedRelation;

  const handleHidden = useCallback(() => {
    onHide && onHide(node.id);
  }, [node.id, onHide]);

  const handleColumnClick = useCallback(
    (id: string) => {
      onColumnSelect && onColumnSelect(id);
    },
    [onColumnSelect]
  );

  const handleColumnDelete = useCallback(
    (id: string) => {
      onColumnDelete && onColumnDelete(node.id, id);
    },
    [node.id, onColumnDelete]
  );

  const handleColumnCreate = useCallback(() => {
    onColumnCreate && onColumnCreate(node.id);
  }, [node.id, onColumnCreate]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  const handleMouseOver = useCallback(() => {
    setHover(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  const handleMenuClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    event.stopPropagation();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexFlow: "column",
          background: theme.palette.background.paper,
          overflow: "hidden",
          cursor: canLink ? "crosshair" : undefined,
        }}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <Box
          sx={{
            flex: 1,
            border: "solid 2px",
            borderRadius: "5px",
            display: "flex",
            flexFlow: "column",
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            overflow: "hidden",
          }}
        >
          <div className={classes.entityName}>
            {(data?.entityType === EntityType.Enum ||
              data?.entityType === EntityType.Interface) && (
              <div className={classNames(classes.nameItem, classes.smFont)}>
                &lt;&lt; {data?.entityType} &gt;&gt;
              </div>
            )}
            <div className={classes.nameItem}>{data?.name}</div>
            {data?.serviceName && (
              <div className={classNames(classes.nameItem, classes.smFont)}>
                <em>{data?.serviceName}</em>
              </div>
            )}
            {hover && !disableHover && (
              <>
                <IconButton
                  sx={{
                    width: "24px",
                    height: "24px",
                    zIndex: 1,
                    position: "absolute",
                    right: "0",
                    top: "0",
                  }}
                  onClick={handleMenuOpen}
                  size="large"
                >
                  <MenuOutlinedIcon sx={{ fontSize: 16 }} />
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
                  <MenuItem
                    sx={{
                      padding: theme.spacing(1, 3),
                    }}
                  >
                    <SvgIcon fontSize="small">
                      <path
                        fill="currentColor"
                        d="M17 2H19V5H22V7H19V10H17V7H14V5H17V2M7 5H11V7H7C5.9 7 5 7.9 5 9V17C5 18.11 5.9 19 7 19H15C16.11 19 17 18.11 17 17V13H19V17C19 19.21 17.21 21 15 21H7C4.79 21 3 19.21 3 17V9C3 6.79 4.79 5 7 5Z"
                      />
                    </SvgIcon>
                    <Typography sx={{ marginLeft: "16px" }}>
                      {intl.get("add-attribute")}{" "}
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    sx={{
                      padding: theme.spacing(1, 3),
                    }}
                  >
                    <SvgIcon fontSize="small">
                      <path
                        fill="currentColor"
                        d="M17 2H19V5H22V7H19V10H17V7H14V5H17V2M7 5H11V7H7C5.9 7 5 7.9 5 9V17C5 18.11 5.9 19 7 19H15C16.11 19 17 18.11 17 17V13H19V17C19 19.21 17.21 21 15 21H7C4.79 21 3 19.21 3 17V9C3 6.79 4.79 5 7 5Z"
                      />
                    </SvgIcon>
                    <Typography sx={{ marginLeft: "16px" }}>
                      {intl.get("add-method")}{" "}
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    sx={{
                      padding: theme.spacing(1, 3),
                    }}
                  >
                    <SvgIcon fontSize="small">
                      <path
                        fill="currentColor"
                        d="M12,14V11H10V14H7V16H10V19H12V16H15V14M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18"
                      />
                    </SvgIcon>
                    <Typography sx={{ marginLeft: "16px" }}>
                      {intl.get("hidden")}{" "}
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    sx={{
                      padding: theme.spacing(1, 3),
                    }}
                  >
                    <DeleteForeverOutlinedIcon />
                    <Typography sx={{ marginLeft: "16px" }}>
                      {intl.get("delete")}{" "}
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
          </div>
          {data?.entityType !== EntityType.Enum && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexFlow: "column",
                borderTop: "solid 1px",
                cursor: canLink ? "crosshair" : "default",
              }}
            >
              {data?.columns?.map((column) => {
                return (
                  <ColumnView
                    key={column.uuid}
                    column={column}
                    onClick={handleColumnClick}
                    onDelete={handleColumnDelete}
                    isSelected={data.selectedId === column.uuid}
                    readOnly={disableHover}
                    isInterface={data?.entityType === EntityType.Interface}
                  />
                );
              })}
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
