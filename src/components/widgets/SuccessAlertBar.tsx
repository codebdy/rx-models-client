import React from "react";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import intl from "react-intl-universal";
import { useRecoilState } from "recoil";
import { successAlertState } from "recoil/atoms";

export const SuccessAlertBar = () => {
  const [successAlert, setSuccessAlert] = useRecoilState(successAlertState);

  const handleClose = (event?: any, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessAlert(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={!!successAlert}
      autoHideDuration={700}
      onClose={handleClose}
    >
      <Alert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity="success"
      >
        {successAlert !== true && !!successAlert ? successAlert : intl.get("operate-success")}
      </Alert>
    </Snackbar>
  );
};
