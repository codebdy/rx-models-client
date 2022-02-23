import React from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Dialog, Theme } from "@mui/material";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import { useRecoilState } from "recoil";
import { appErrorState } from "recoil/atoms";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: "300px",
      display: "flex",
      justifyContent: "space-between",
    },

    details: {
      padding: theme.spacing(2),
    },
  })
);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} square />;
}

export const ErrorDialog = () => {
  const classes = useStyles();
  const [error, setError] = useRecoilState(appErrorState);
  const handleClose = () => {
    setError(undefined);
  };

  return (
    <Dialog
      open={!!error?.message}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Alert onClose={handleClose} severity="error" className={classes.root}>
        {error?.message}
      </Alert>
      {error?.details && <div className={classes.details}>{error.details}</div>}
    </Dialog>
  );
};
