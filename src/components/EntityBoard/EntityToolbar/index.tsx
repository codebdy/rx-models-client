import React, { memo } from "react";
import { Theme, IconButton } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import intl from "react-intl-universal";
import Spacer from "components/common/spacer";
import SubmitButton from "components/common/submit-button";
import RouterPrompt from "components/common/router-prompt";
import { useShowServerError } from "store/helpers/use-show-server-error";
import { useLazyMagicPost } from "@rxdrag/rxmodels-swr";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { successAlertState } from "recoil/atoms";
import {
  changedState,
  redoListState,
  selectedElementState,
  undoListState,
} from "../recoil/atoms";
import { useUndo } from "../hooks/useUndo";
import { useRedo } from "../hooks/useRedo";
import { useColumn } from "../hooks/useColumn";
import { useDeleteSelectedElement } from "../hooks/useDeleteSelectedElement";

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
  const setSuccessAlertState = useSetRecoilState(successAlertState);
  const changed = useRecoilValue(changedState);

  const undoList = useRecoilValue(undoListState);
  const redoList = useRecoilValue(redoListState);
  const selectedElement = useRecoilValue(selectedElementState);
  const { column } = useColumn(selectedElement || "");
  const undo = useUndo();
  const redo = useRedo();
  const deleteSelectedElement = useDeleteSelectedElement();

  const [excuteSave, { loading, error }] = useLazyMagicPost({
    onCompleted() {
      setSuccessAlertState(true);
      //boardStore.setChanged(false);
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
    // const data = new MagicPostBuilder()
    //   .setEntity("RxPackage")
    //   .setDatas(boardStore.getPackeMetas()) //.addModelCommand('removeOthers')
    //   .addEntityDirective("removeOthers")
    //   .toData();
    // excuteSave({ data });
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
        <Spacer />
        <div className={classes.saveButtonShell}>
          <SubmitButton
            variant="contained"
            color="primary"
            size="medium"
            disabled={!changed}
            submitting={loading}
            onClick={handleSave}
          >
            {intl.get("save")}
          </SubmitButton>
        </div>
      </div>
    </div>
  );
});
