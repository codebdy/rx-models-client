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
import AttributeView from "./AttributeView";
import { StereoType } from "components/ModelBoard/meta/ClassMeta";
import { EntityNodeData } from "./EntityNodeData";
import { PRIMARY_COLOR } from "util/consts";
import useShadows from "util/use-shadows";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import intl from "react-intl-universal";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import MethodView from "./MethodView";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  onAttributeSelect?: (columnId: string) => void;
  onAttributeDelete?: (entityId: string, columnId: string) => void;
  onAttributeCreate?: (entityId: string) => void;
  onHide?: (entityId: string) => void;
  onDeleteProperty?: (id: string) => void;
  onAddProperty?: () => void;
  node?: any;
}) => {
  const classes = useStyles();
  const { node, onAttributeSelect, onAttributeDelete, onAttributeCreate, onHide } =
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
    setAnchorEl(null);
  }, [node.id, onHide]);

  const handleAttributeClick = useCallback(
    (id: string) => {
      onAttributeSelect && onAttributeSelect(id);
    },
    [onAttributeSelect]
  );

  const handleAttributeDelete = useCallback(
    (id: string) => {
      onAttributeDelete && onAttributeDelete(node.id, id);
    },
    [node.id, onAttributeDelete]
  );

  const handleAttributeCreate = useCallback(() => {
    onAttributeCreate && onAttributeCreate(node.id);
    setAnchorEl(null);
  }, [node.id, onAttributeCreate]);

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
          <Box
            sx={{
              width: "100%",
              padding: "2px 0",
              display: "flex",
              flexFlow: "column",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                fontSize: "0.9rem",
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              &lt;&lt; {data?.stereoType} &gt;&gt;
            </Box>
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
                    onClick = {handleAttributeCreate}
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
                    onClick={handleHidden}
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
          </Box>
          {data?.stereoType !== StereoType.Enum && (
            <Box
              sx={{
                display: "flex",
                flex: 1,
                flexFlow: "column",
                cursor: canLink ? "crosshair" : "default",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexFlow: "column",
                  borderTop: "solid 1px",
                  minHeight: (theme) => theme.spacing(1),
                }}
              >
                {data?.attributes?.map((attr) => {
                  return (
                    <AttributeView
                      key={attr.uuid}
                      attr={attr}
                      onClick={handleAttributeClick}
                      onDelete={handleAttributeDelete}
                      isSelected={data.selectedId === attr.uuid}
                      readOnly={disableHover}
                    />
                  );
                })}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexFlow: "column",
                  borderTop: "solid 1px",
                  minHeight: (theme) => theme.spacing(3),
                }}
              >
                {data?.methods?.map((method) => {
                  return (
                    <MethodView
                      key={method.uuid}
                      method={method}
                      onClick={handleAttributeClick}
                      onDelete={handleAttributeDelete}
                      isSelected={data.selectedId === method.uuid}
                    />
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
