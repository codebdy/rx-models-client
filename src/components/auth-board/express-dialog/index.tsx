import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import intl from "react-intl-universal";
import {
  Tooltip,
  IconButton,
  Theme,
  Grid,
  TextField,
  SvgIcon,
} from "@mui/material";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import { ClassMeta } from "components/ModelBoard/meta/ClassMeta";
import {
  classesState,
  relationsState,
  serviceState,
} from "components/ModelBoard/recoil/atoms";
import { useRecoilValue } from "recoil";
import { LoadingButton } from "@mui/lab";

const SqlWhereParser = require("sql-where-parser");
const OPERATOR_UNARY_MINUS = Symbol("-");

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      minWidth: "600px",
      minHeight: "260px",
    },
    list: {
      border: ` ${theme.palette.divider} solid 1px`,
      display: "flex",
      flexFlow: "column",
      padding: 0,
      height: "100%",
    },
    plus: {
      textAlign: "center",
      marginTop: theme.spacing(1),
    },
    actions: {
      padding: theme.spacing(2),
      paddingRight: theme.spacing(3),
    },
  })
);

export default function ExpressDialog(props: {
  entityMeta: ClassMeta;
  expression: string;
  onExpressionChange: (exp: string) => void;
}) {
  const { entityMeta, expression, onExpressionChange } = props;
  const classes = useStyles();
  const service = useRecoilValue(serviceState)
  const [open, setOpen] = useState(false);
  const [exp, setExp] = useState(expression);
  const [error, setError] = useState("");
  const entites = useRecoilValue(classesState(service?.id||0));
  const relations = useRecoilValue(relationsState(service?.id||0));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setExp(expression);
    setError("");
    setOpen(false);
  };

  const handleExpressionChange = (
    event: React.ChangeEvent<{ value: string }>
  ) => {
    setExp(event.target.value);
    setError("");
  };

  const getRelationByName = (entityUuid: string, roleName: string) => {
    for (const relation of relations || []) {
      if (
        relation.roleOfTarget === roleName &&
        relation.sourceId === entityUuid
      ) {
        return relation;
      }
      if (
        relation.roleOfSource === roleName &&
        relation.targetId === entityUuid
      ) {
        return relation;
      }
    }
  };

  const getEntityByUuid = (entityUuid: string) => {
    for (const entity of entites || []) {
      if (entity.uuid === entityUuid) {
        return entity;
      }
    }
  };

  const validateExpression = (exp: string) => {
    const parser = new SqlWhereParser();

    const evaluator = (
      operatorValue: string | typeof OPERATOR_UNARY_MINUS,
      operands: any[]
    ) => {
      if (operatorValue === OPERATOR_UNARY_MINUS) {
        operatorValue = "-";
      }
      if (operatorValue === ",") {
        return [].concat(operands[0], operands[1]);
      }

      switch (operatorValue) {
        case "OR":
          return `(${operands.join(" OR ")})`;
        case "AND":
          return `(${operands.join(" AND ")})`;
        default:
          const arr = operands[0].split(".");

          if (arr.length > 1) {
            const [roleName, columnName] = arr;

            const relation = getRelationByName(entityMeta.uuid, roleName);
            if (!relation) {
              throw new Error(
                `Entity ${entityMeta.name} has not relation ${roleName}`
              );
            }

            const targetUuid =
              entityMeta.uuid === relation.sourceId
                ? relation.targetId
                : relation.sourceId;
            const targetEntity = getEntityByUuid(targetUuid);

            if (
              !targetEntity?.methods.find(
                (column) => column.name === columnName
              )
            ) {
              throw new Error(
                `Relation ${roleName} target entity ${targetEntity?.name} has not column ${columnName}`
              );
            }
          } else {
            if (
              !entityMeta.methods.find((column) => column.name === operands[0])
            ) {
              throw new Error(
                `Entity ${entityMeta.name} has not column ${operands[0]}`
              );
            }
          }
      }
    };

    try {
      parser.parse(exp, evaluator);
    } catch (error) {
      //return error.message;
    }
  };

  const handleConfirm = () => {
    // const validateResult = validateExpression(exp);
    // if (validateResult) {
    //   setError(validateResult);
    //   return;
    // }

    onExpressionChange(exp);
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title={intl.get("express-tip")}>
        <IconButton size="small" onClick={handleClickOpen}>
          <SvgIcon sx={{ fontSize: 18 }}>
            <path
              fill="currentColor"
              d="M12.42,5.29C11.32,5.19 10.35,6 10.25,7.11L10,10H12.82V12H9.82L9.38,17.07C9.18,19.27 7.24,20.9 5.04,20.7C3.79,20.59 2.66,19.9 2,18.83L3.5,17.33C3.83,18.38 4.96,18.97 6,18.63C6.78,18.39 7.33,17.7 7.4,16.89L7.82,12H4.82V10H8L8.27,6.93C8.46,4.73 10.39,3.1 12.6,3.28C13.86,3.39 15,4.09 15.66,5.17L14.16,6.67C13.91,5.9 13.23,5.36 12.42,5.29M22,13.65L20.59,12.24L17.76,15.07L14.93,12.24L13.5,13.65L16.35,16.5L13.5,19.31L14.93,20.72L17.76,17.89L20.59,20.72L22,19.31L19.17,16.5L22,13.65Z"
            />
          </SvgIcon>
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} scroll="paper" maxWidth="lg">
        <DialogTitle>{intl.get("express-tip")}</DialogTitle>
        <DialogContent>
          <div className={classes.content}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  multiline
                  fullWidth
                  rows={16}
                  variant="outlined"
                  size="small"
                  value={exp || ""}
                  autoFocus
                  onChange={handleExpressionChange}
                  error={!!error}
                  helperText={error}
                />
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button onClick={handleClose}>{intl.get("cancel")}</Button>
          <LoadingButton
            onClick={handleConfirm}
            variant="contained"
            color="primary"
          >
            {intl.get("confirm")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
