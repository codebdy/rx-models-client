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
import { StereoType } from "components/EntityBoard/meta/ClassMeta";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { EntityNodeData } from "./EntityNodeData";
import { PRIMARY_COLOR } from "util/consts";
import useShadows from "util/use-shadows";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import intl from "react-intl-universal";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

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
    data?.stereoType !== StereoType.Enum &&
    data?.stereoType !== StereoType.Interface;
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
    setAnchorEl(null);
    setHover(false);
  }, []);

  const handleMenuClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    setHover(false);
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
            color: data?.root
              ? theme.palette.primary.main
              : theme.palette.text.primary,
            overflow: "hidden",
          }}
        >
          <div className={classes.entityName}>
            {(data?.stereoType === StereoType.Enum ||
              data?.stereoType === StereoType.Interface) && (
              <div className={classNames(classes.nameItem, classes.smFont)}>
                &lt;&lt; {data?.stereoType} &gt;&gt;
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
                        d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                      />
                    </SvgIcon>
                    <Typography sx={{ marginLeft: "16px" }}>
                      {intl.get("add-attribute")}
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
                        d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                      />
                    </SvgIcon>
                    <Typography sx={{ marginLeft: "16px" }}>
                      {intl.get("add-method")}
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    sx={{
                      padding: theme.spacing(1, 3),
                    }}
                  >
                    <VisibilityOffOutlinedIcon fontSize="small" />
                    <Typography sx={{ marginLeft: "16px" }}>
                      {intl.get("hide-class")}
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    sx={{
                      padding: theme.spacing(1, 3),
                    }}
                  >
                    <DeleteForeverOutlinedIcon fontSize="small" />
                    <Typography sx={{ marginLeft: "16px" }}>
                      {intl.get("delete")}
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
          </div>
          {data?.stereoType !== StereoType.Enum && (
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
                    isInterface={data?.stereoType === StereoType.Interface}
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
