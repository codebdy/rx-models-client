import React, { memo } from "react";
import { Theme, IconButton, Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import intl from "react-intl-universal";
import RouterPrompt from "components/common/RouterPrompt";
import { useShowServerError } from "recoil/hooks/useShowServerError";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { successAlertState } from "recoil/atoms";
import {
  changedState,
  diagramsState,
  entitiesState,
  metaState,
  redoListState,
  relationsState,
  selectedElementState,
  undoListState,
  x6EdgesState,
  x6NodesState,
} from "../recoil/atoms";
import { useUndo } from "../hooks/useUndo";
import { useRedo } from "../hooks/useRedo";
import { useColumn } from "../hooks/useColumn";
import { useDeleteSelectedElement } from "../hooks/useDeleteSelectedElement";
import { LoadingButton } from "@mui/lab";
import { usePostOne } from "do-ents/usePostOne";
import { EntityNameMeta, Meta } from "../meta/Meta";

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

export const EntityToolbar = memo(() => {
  const classes = useStyles();
  const meta = useRecoilValue(metaState);
  const entities = useRecoilValue(entitiesState);
  const relations = useRecoilValue(relationsState);
  const diagrams = useRecoilValue(diagramsState);
  const x6Nodes = useRecoilValue(x6NodesState);
  const x6Edges = useRecoilValue(x6EdgesState);
  const setSuccessAlertState = useSetRecoilState(successAlertState);
  const [changed, setChanged] = useRecoilState(changedState);
  const undoList = useRecoilValue(undoListState);
  const redoList = useRecoilValue(redoListState);
  const selectedElement = useRecoilValue(selectedElementState);
  const { column } = useColumn(selectedElement || "");
  const undo = useUndo();
  const redo = useRedo();
  const deleteSelectedElement = useDeleteSelectedElement();

  const [excuteSave, { loading, error }] = usePostOne({
    onCompleted() {
      setSuccessAlertState(true);
      setChanged(false);
    },
  });

  useShowServerError(error);

  const handleUndo = () => {
    undo();
  };

  const handleRedo = () => {
    redo();
  };

  const handleDelete = () => {
    deleteSelectedElement();
  };

  const handleSave = () => {
    const data: Meta = {
      ...meta,
      __type: EntityNameMeta,
      content: {
        entities,
        relations,
        diagrams,
        x6Nodes,
        x6Edges,
      },
    };
    excuteSave(data);
  };

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
          disabled={(column && column.name === "id") || !selectedElement}
          onClick={handleDelete}
          size="large"
        >
          <DeleteOutlineOutlinedIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <Box sx={{ flex: 1 }} />
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
        </div>
      </div>
    </div>
  );
});
