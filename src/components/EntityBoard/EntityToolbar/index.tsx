import React, { memo } from "react";
import { Theme, IconButton, Box, SvgIcon } from "@mui/material";
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

          <LoadingButton
            variant="contained"
            color="primary"
            size="medium"
            sx={{ ml: 1 }}
            startIcon={
              <SvgIcon fontSize="small">
                <path fill="currentColor" d="M12 16C12.41 16 12.81 15.97 13.21 15.94C13.4 15.18 13.72 14.46 14.16 13.83C13.47 13.94 12.74 14 12 14C9.58 14 7.3 13.4 6 12.45V9.64C7.47 10.47 9.61 11 12 11S16.53 10.47 18 9.64V11.19C18.5 11.07 19 11 19.55 11C19.7 11 19.85 11 20 11.03V7C20 4.79 16.42 3 12 3S4 4.79 4 7V17C4 19.21 7.59 21 12 21C12.66 21 13.31 20.96 13.92 20.88C13.57 20.29 13.31 19.64 13.16 18.94C12.79 19 12.41 19 12 19C8.13 19 6 17.5 6 17V14.77C7.61 15.55 9.72 16 12 16M12 5C15.87 5 18 6.5 18 7S15.87 9 12 9 6 7.5 6 7 8.13 5 12 5M23 17.5C23 18.32 22.75 19.08 22.33 19.71L21.24 18.62C21.41 18.28 21.5 17.9 21.5 17.5C21.5 16.12 20.38 15 19 15V16.5L16.75 14.25L19 12V13.5C21.21 13.5 23 15.29 23 17.5M19 18.5L21.25 20.75L19 23V21.5C16.79 21.5 15 19.71 15 17.5C15 16.68 15.25 15.92 15.67 15.29L16.76 16.38C16.59 16.72 16.5 17.1 16.5 17.5C16.5 18.88 17.62 20 19 20V18.5Z" />
              </SvgIcon>
            }
            disabled={changed}
            loading={loading}
            onClick={handleSave}
          >
            {intl.get("publish")}
          </LoadingButton>
        </div>
      </div>
    </div>
  );
});
