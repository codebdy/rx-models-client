import React from "react";
import {
  Theme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import intl from "react-intl-universal";
import { useShowServerError } from "recoil/hooks/useShowServerError";
import { Skeleton } from "@mui/material";
import { useAppStore } from "store/app-store";
import { useAuthBoardStore } from "./store/helper";
import { RxRoleStore } from "./store/rx-role-store";
import { observer } from "mobx-react";
import RouterPrompt from "components/common/RouterPrompt";
import { RxRole } from "entity-interface/RxRole";
import {
  useMagicQuery,
  MagicQueryBuilder,
  useLazyMagicPost,
  MagicPostBuilder,
} from "@rxdrag/rxmodels-swr";
import { LoadingButton } from "@mui/lab";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topBar: {
      height: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    roleSelect: {
      minWidth: "300px",
    },
  })
);

export const Topbar = observer((props: {}) => {
  const classes = useStyles();
  const appStore = useAppStore();
  const boardStore = useAuthBoardStore();

  const { data, error, loading } = useMagicQuery<RxRole[]>(
    new MagicQueryBuilder().setEntity("RxRole").addRelation("abilities")
  );

  const [excuteSave, { loading: saving, error: saveError }] = useLazyMagicPost({
    onCompleted() {
      appStore.showSuccessAlert();
      boardStore.setChanged(false);
    },
  });

  //useShowServerError(error || saveError);

  const changeRole = (roleId: number | "") => {
    const role = data?.data.find((rl) => rl.id === roleId);
    boardStore.setSelecRole(role ? new RxRoleStore(role) : undefined);
  };

  const handleChange = (event: SelectChangeEvent<"" | number>) => {
    const roleId = event.target.value;
    if (roleId !== boardStore.selectRole?.id) {
      if (boardStore.changed) {
        appStore.confirmAction(intl.get("changing-not-save-message"), () => {
          changeRole(roleId as any);
        });
      } else {
        changeRole(roleId as any);
      }
    }
  };

  const handleSave = () => {
    if (!boardStore.selectRole) {
      return;
    }
    const data = new MagicPostBuilder()
      .setEntity("RxRole")
      .setSingleData(boardStore.selectRole.toMeta())
      .toData();
    excuteSave({ data });
  };
  return (
    <div className={classes.topBar}>
      <RouterPrompt
        promptBoolean={boardStore.changed}
        message={intl.get("changing-not-save-message")}
      />
      {loading ? (
        <Skeleton
          variant="rectangular"
          className={classes.roleSelect}
          height={40}
        />
      ) : (
        <FormControl
          variant="outlined"
          size="small"
          className={classes.roleSelect}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            {intl.get("role")}
          </InputLabel>
          <Select
            value={boardStore.selectRole?.id || ""}
            onChange={handleChange}
            label={intl.get("role")}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {data?.data?.map((role) => {
              return (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}

      <LoadingButton
        variant="contained"
        color="primary"
        size="medium"
        disabled={!boardStore.changed}
        loading={saving}
        onClick={handleSave}
      >
        {intl.get("save")}
      </LoadingButton>
    </div>
  );
});
