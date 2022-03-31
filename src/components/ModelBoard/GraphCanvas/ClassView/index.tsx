import React, {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
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
  alpha,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import classNames from "classnames";
import AttributeView from "./AttributeView";
import { StereoType } from "components/ModelBoard/meta/ClassMeta";
import { ClassNodeData } from "./ClassNodeData";
import { PRIMARY_COLOR } from "util/consts";
import useShadows from "util/use-shadows";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import intl from "react-intl-universal";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import MethodView from "./MethodView";
import { CONST_ID } from "components/ModelBoard/meta/Meta";
import { canStartLink } from "../canStartLink";
import { green } from "@mui/material/colors";
import {
  EVENT_CLASS_CHANGED,
  EVENT_PREPARE_LINK_TO,
  EVENT_PRESSED_LINE_TYPE,
  EVENT_UNDO_REDO,
  offCanvasEvent,
  onCanvasEvent,
} from "../events";
import { RelationType } from "components/ModelBoard/meta/RelationMeta";
import { useMountRef } from "./useMountRef";

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

export const ClassView = memo(
  (props: {
    onAttributeSelect?: (attrId: string) => void;
    onAttributeDelete?: (clsId: string, attrId: string) => void;
    onAttributeCreate?: (clsId: string) => void;
    onMethodSelect?: (methodId: string) => void;
    onMethodDelete?: (clsId: string, methodId: string) => void;
    onMethodCreate?: (clsId: string) => void;
    onHide?: (clsId: string) => void;
    onDelete?: (uuid: string) => void;
    node?: any;
  }) => {
    const classes = useStyles();
    const {
      node,
      onAttributeSelect,
      onAttributeDelete,
      onAttributeCreate,
      onMethodSelect,
      onMethodDelete,
      onMethodCreate,
      onDelete,
      onHide,
    } = props;
    const [hover, setHover] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [showLinkTo, setShowLinkTo] = React.useState(false);
    const isMenuOpen = Boolean(anchorEl);
    const mountRef = useMountRef();
    const [data, setData] = useState<ClassNodeData>();
    const [pressedLineType, setPressedLineType] = useState<RelationType>();

    useEffect(() => {
      setData(node?.data);
    }, [node?.data]);

    const theme = createTheme({
      palette: {
        mode: data?.themeMode || "dark",
        primary: {
          main: PRIMARY_COLOR,
        },
      },

      shadows: [...useShadows()] as any,
    });

    const handleChangePrepareToLink = useCallback(
      (event: Event) => {
        const showId = (event as CustomEvent).detail;
        if (mountRef.current) {
          setShowLinkTo(showId === data?.id);
        }
      },
      [data?.id, mountRef]
    );

    const pressedLineTypeChanged = useCallback(
      (event: Event) => {
        const newData = (event as CustomEvent).detail;
        if (mountRef.current) {
          setPressedLineType(newData);
        }
      },
      [mountRef]
    );
    const handleNodeChanged = useCallback(
      (event: Event) => {
        const newData = (event as CustomEvent).detail;
        if (mountRef.current && newData.uuid === data?.id) {
          setData({ ...data, ...newData });
        }
      },
      [data, mountRef]
    );

    const handleUndoRedo = useCallback(
      (event: Event) => {
        if (mountRef.current) {
          setData((data) => ({ ...data } as any));
        }
      },
      [mountRef]
    );

    useEffect(() => {
      onCanvasEvent(EVENT_PREPARE_LINK_TO, handleChangePrepareToLink);
      onCanvasEvent(EVENT_PRESSED_LINE_TYPE, pressedLineTypeChanged);
      onCanvasEvent(EVENT_CLASS_CHANGED, handleNodeChanged);
      onCanvasEvent(EVENT_UNDO_REDO, handleUndoRedo);
      return () => {
        offCanvasEvent(EVENT_PREPARE_LINK_TO, handleChangePrepareToLink);
        offCanvasEvent(EVENT_PRESSED_LINE_TYPE, pressedLineTypeChanged);
        offCanvasEvent(EVENT_CLASS_CHANGED, handleNodeChanged);
        offCanvasEvent(EVENT_UNDO_REDO, handleUndoRedo);
      };
    }, [
      handleChangePrepareToLink,
      handleNodeChanged,
      handleUndoRedo,
      pressedLineTypeChanged,
    ]);

    const canLinkFrom = useMemo(
      () => data && pressedLineType && canStartLink(pressedLineType, data),
      [data, pressedLineType]
    );
    const disableHover = useMemo(() => !!pressedLineType, [pressedLineType]);

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

    const handleMethodClick = useCallback(
      (id: string) => {
        onMethodSelect && onMethodSelect(id);
      },
      [onMethodSelect]
    );

    const handleMethodDelete = useCallback(
      (id: string) => {
        onMethodDelete && onMethodDelete(node.id, id);
      },
      [node.id, onMethodDelete]
    );
    const handleMethodCreate = useCallback(() => {
      onMethodCreate && onMethodCreate(node.id);
      setAnchorEl(null);
    }, [node.id, onMethodCreate]);

    const handleMenuOpen = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation();
      },
      []
    );

    const handleMouseOver = useCallback(() => {
      setHover(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setAnchorEl(null);
      setHover(false);
    }, []);

    const handleMenuClose = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(null);
        setHover(false);
        event.stopPropagation();
      },
      []
    );

    const handleDelete = useCallback(() => {
      onDelete && onDelete(data?.uuid || "");
      setAnchorEl(null);
    }, [data?.uuid, onDelete]);

    const boxShadow = useMemo(() => {
      const shadowConst = "0 0 0 3px ";
      const greenShadow = shadowConst + alpha(green[500], 0.7);
      if (hover) {
        if (!pressedLineType) {
          return (
            shadowConst +
            (theme.palette.mode === "light"
              ? alpha(theme.palette.text.primary, 0.2)
              : alpha(theme.palette.text.primary, 0.4))
          );
        } else {
          return canLinkFrom ? greenShadow : "";
        }
      } else {
        if (showLinkTo) {
          return greenShadow;
        }
      }

      return "";
    }, [
      canLinkFrom,
      hover,
      pressedLineType,
      showLinkTo,
      theme.palette.mode,
      theme.palette.text.primary,
    ]);

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
            cursor: canLinkFrom ? "crosshair" : undefined,
            boxShadow: boxShadow,
            borderRadius: "5px",
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
              fontStyle:
                data?.stereoType === StereoType.Abstract ? "italic" : undefined,
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
              {data?.stereoType !== StereoType.Entity && (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    fontSize: "0.9rem",
                    opacity: 0.8,
                  }}
                >
                  &lt;&lt; {data?.stereoType} &gt;&gt;
                </Box>
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
                      disabled={data?.stereoType === StereoType.Service}
                      onClick={handleAttributeCreate}
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
                      disabled={
                        data?.stereoType === StereoType.Enum ||
                        data?.stereoType === StereoType.ValueObject
                      }
                      onClick={handleMethodCreate}
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
                      onClick={handleDelete}
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

            <Box
              sx={{
                display: "flex",
                flex: 1,
                flexFlow: "column",
                cursor: canLinkFrom ? "crosshair" : "default",
              }}
            >
              {data?.stereoType !== StereoType.Service && (
                <Box
                  sx={{
                    display: "flex",
                    flexFlow: "column",
                    borderTop: "solid 1px",
                    minHeight: (theme) => theme.spacing(1),
                  }}
                >
                  {data?.attributes?.map((attr) => {
                    return attr.name === CONST_ID &&
                      data?.stereoType === StereoType.Abstract &&
                      !data?.root ? (
                      <Fragment key={attr.uuid}></Fragment>
                    ) : (
                      <AttributeView
                        key={attr.uuid}
                        attr={attr}
                        stereoType={data.stereoType}
                        onClick={handleAttributeClick}
                        onDelete={handleAttributeDelete}
                        readOnly={disableHover}
                      />
                    );
                  })}
                </Box>
              )}

              {data?.stereoType !== StereoType.Enum &&
                data?.stereoType !== StereoType.ValueObject && (
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
                          onClick={handleMethodClick}
                          onDelete={handleMethodDelete}
                        />
                      );
                    })}
                  </Box>
                )}
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
);
