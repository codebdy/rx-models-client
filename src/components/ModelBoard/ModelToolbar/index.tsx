import React, { memo, useCallback } from "react";
import { Theme, IconButton, Box, SvgIcon } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import intl from "react-intl-universal";
import RouterPrompt from "components/common/RouterPrompt";
import { useShowServerError } from "recoil/hooks/useShowServerError";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { successAlertState } from "recoil/atoms";
import {
  changedState,
  diagramsState,
  classesState,
  metaState,
  minMapState,
  redoListState,
  relationsState,
  selectedDiagramState,
  selectedElementState,
  undoListState,
  x6EdgesState,
  x6NodesState,
} from "../recoil/atoms";
import { useUndo } from "../hooks/useUndo";
import { useRedo } from "../hooks/useRedo";
import { useAttribute } from "../hooks/useAttribute";
import { useDeleteSelectedElement } from "../hooks/useDeleteSelectedElement";
import { LoadingButton } from "@mui/lab";
import { usePostOne } from "do-ents/usePostOne";
import { CONST_ID, EntityNameMeta, Meta, MetaStatus } from "../meta/Meta";
import { SyncButton } from "./SyncButton";
import { useServiceId } from "../hooks/useServiceId";
import { useValidate } from "../hooks/useValidate";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: "flex",
      width: "100%",
      height: theme.spacing(6),
      borderBottom: `solid 1px ${theme.palette.divider}`,
      alignItems: "center",
    },
    toolbarInner: {
      flex: 1,
      display: "flex",
      marginRight: theme.spacing(4),
      marginLeft: theme.spacing(2),
    },
    iconButton: {
      width: "38px",
      height: "38px",
    },
    saveButtonShell: {
      display: "flex",
      alignItems: "center",
      marginLeft: theme.spacing(4),
    },
  })
);

export const ModelToolbar = memo(() => {
  const classes = useStyles();
  const serviceId = useServiceId();
  const [meta, setMeta] = useRecoilState(metaState(serviceId));
  const classeMetas = useRecoilValue(classesState(serviceId));
  const relations = useRecoilValue(relationsState(serviceId));
  const diagrams = useRecoilValue(diagramsState(serviceId));
  const x6Nodes = useRecoilValue(x6NodesState(serviceId));
  const x6Edges = useRecoilValue(x6EdgesState(serviceId));
  const setSuccessAlertState = useSetRecoilState(successAlertState);
  const [changed, setChanged] = useRecoilState(changedState(serviceId));
  const undoList = useRecoilValue(undoListState(serviceId));
  const redoList = useRecoilValue(redoListState(serviceId));
  const selectedDiagram = useRecoilValue(selectedDiagramState(serviceId));
  const selectedElement = useRecoilValue(selectedElementState(serviceId));
  const { attribute } = useAttribute(selectedElement || "", serviceId);
  const undo = useUndo(serviceId);
  const redo = useRedo(serviceId);
  const deleteSelectedElement = useDeleteSelectedElement(serviceId);
  const [minMap, setMinMap] = useRecoilState(minMapState(serviceId));
  const validate = useValidate(serviceId);
  const [excuteSave, { loading, error }] = usePostOne<Meta>({
    onCompleted(data: Meta) {
      setSuccessAlertState(true);
      setChanged(false);
      setMeta(data);
    },
  });

  useShowServerError(error);

  const toggleMinMap = useCallback(() => {
    setMinMap((a) => !a);
  }, [setMinMap]);

  const handleUndo = useCallback(() => {
    undo();
  }, [undo]);

  const handleRedo = () => {
    redo();
  };

  const handleDelete = useCallback(() => {
    deleteSelectedElement();
  }, [deleteSelectedElement]);

  const handleSave = useCallback(() => {
    if (!validate()) {
      return;
    }
    const content = {
      classes: classeMetas,
      relations,
      diagrams,
      x6Nodes,
      x6Edges,
    };

    const data: Meta =
      meta?.status === MetaStatus.META_STATUS_PUBLISHED || !meta
        ? {
            __type: EntityNameMeta,
            content,
          }
        : {
            ...meta,
            __type: EntityNameMeta,
            content,
          };
    excuteSave(data);
  }, [
    classeMetas,
    diagrams,
    excuteSave,
    meta,
    relations,
    validate,
    x6Edges,
    x6Nodes,
  ]);

  return (
    <div className={classes.toolbar}>
      <div className={classes.toolbarInner}>
        <RouterPrompt
          promptBoolean={changed}
          message={intl.get("changing-not-save-message")}
        />
        <IconButton
          className={classes.iconButton}
          disabled={undoList.length === 0}
          onClick={handleUndo}
          size="large"
        >
          <UndoOutlinedIcon />
        </IconButton>
        <IconButton
          className={classes.iconButton}
          disabled={redoList.length === 0}
          onClick={handleRedo}
          size="large"
        >
          <RedoOutlinedIcon />
        </IconButton>
        <IconButton
          className={classes.iconButton}
          disabled={
            (attribute && attribute.name === CONST_ID) || !selectedElement
          }
          onClick={handleDelete}
          size="large"
        >
          <DeleteForeverOutlinedIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <Box sx={{ flex: 1 }} />
        <IconButton
          color={minMap ? "primary" : "default"}
          disabled={!selectedDiagram}
          onClick={toggleMinMap}
        >
          <SvgIcon>
            <path
              fill="currentColor"
              d="M12 4C14.2 4 16 5.8 16 8C16 10.1 13.9 13.5 12 15.9C10.1 13.4 8 10.1 8 8C8 5.8 9.8 4 12 4M12 2C8.7 2 6 4.7 6 8C6 12.5 12 19 12 19S18 12.4 18 8C18 4.7 15.3 2 12 2M12 6C10.9 6 10 6.9 10 8S10.9 10 12 10 14 9.1 14 8 13.1 6 12 6M20 19C20 21.2 16.4 23 12 23S4 21.2 4 19C4 17.7 5.2 16.6 7.1 15.8L7.7 16.7C6.7 17.2 6 17.8 6 18.5C6 19.9 8.7 21 12 21S18 19.9 18 18.5C18 17.8 17.3 17.2 16.2 16.7L16.8 15.8C18.8 16.6 20 17.7 20 19Z"
            />
          </SvgIcon>
        </IconButton>
        <div className={classes.saveButtonShell}>
          <LoadingButton
            variant="contained"
            color="primary"
            size="medium"
            disabled={!changed}
            loading={loading}
            onClick={handleSave}
          >
            {intl.get("save")}
          </LoadingButton>
          <SyncButton />
        </div>
      </div>
    </div>
  );
});
