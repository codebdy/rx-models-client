import React, { useState } from "react";
import { Theme, IconButton } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import classNames from "classnames";
import { EntityNodeData } from "../../store/diagram";
import ColumnView from "./ColumnView";
import { EntityType } from "components/EntityBoard/meta/entity-meta";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexFlow: "column",
      background: "#FFFFFF",
      overflow: "hidden",
    },
    canLink: {
      cursor: "crosshair",
    },
    container: {
      flex: 1,
      border: "solid 2px",
      borderRadius: "5px",
      display: "flex",
      flexFlow: "column",
      background: "#FFFFFF",
      overflow: "hidden",
    },
    entityName: {
      width: "100%",
      padding: "2px 0",
      display: "flex",
      flexFlow: "column",
      position: "relative",
    },
    entityCloseButton: {
      width: "24px",
      height: "24px",
      zIndex: 1,
      position: "absolute",
      right: "0",
      top: "0",
    },
    propertiesArea: {
      flex: 1,
      display: "flex",
      flexFlow: "column",
      borderTop: "solid 1px",
    },
    defaultCusor: {
      cursor: "default",
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
  onColumnSelect?: (entityId: string, columnId: string) => void;
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

  const canLink =
    node.data.isPressedRelation &&
    data?.entityType !== EntityType.ENUM &&
    data?.entityType !== EntityType.INTERFACE &&
    data?.entityType !== EntityType.ABSTRACT;
  const disableHover = !!node.data.isPressedRelation;

  const handleHidden = () => {
    onHide && onHide(node.id);
  };

  const handleColumnClick = (id: string) => {
    onColumnSelect && onColumnSelect(node.id, id);
  };

  const handleColumnDelete = (id: string) => {
    onColumnDelete && onColumnDelete(node.id, id);
  };

  const handleColumnCreate = () => {
    onColumnCreate && onColumnCreate(node.id);
  };

  return (
    <div
      className={classNames(classes.root, { [classes.canLink]: canLink })}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={classes.container}>
        <div className={classes.entityName}>
          {(data?.entityType === EntityType.ENUM ||
            data?.entityType === EntityType.INTERFACE ||
            data?.entityType === EntityType.ABSTRACT) && (
            <div className={classNames(classes.nameItem, classes.smFont)}>
              &lt;&lt; {data?.entityType} &gt;&gt;
            </div>
          )}
          <div className={classes.nameItem}>{data?.name}</div>
          {data?.packageName && (
            <div className={classNames(classes.nameItem, classes.smFont)}>
              <em>{data?.packageName}</em>
            </div>
          )}
          {hover && !disableHover && (
            <IconButton
              className={classes.entityCloseButton}
              onClick={handleHidden}
              size="large"
            >
              <VisibilityOffOutlinedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          )}
        </div>
        {data?.entityType !== EntityType.ENUM && (
          <div
            className={classNames(classes.propertiesArea, {
              [classes.canLink]: canLink,
              [classes.defaultCusor]: !canLink,
            })}
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
                  isInterface={data?.entityType === EntityType.INTERFACE}
                />
              );
            })}
            {hover && !disableHover && (
              <div className={classes.columnPuls}>
                <IconButton
                  className={classes.columnButton}
                  onClick={handleColumnCreate}
                  size="large"
                >
                  <AddOutlinedIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};