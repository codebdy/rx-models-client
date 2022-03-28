import * as React from "react";
import { Button, Divider, SvgIcon } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { memo } from "react";
import { LoadingButton } from "@mui/lab";
import intl from "react-intl-universal";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import { changedState, publishedIdState, metaState, serviceState } from "../recoil/atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useShowServerError } from "recoil/hooks/useShowServerError";
import { usePublishMeta } from "do-ents/usePublishMeta";
import { successAlertState } from "recoil/atoms";
import { MetaStatus } from "../meta/Meta";

export const SyncButton = memo(() => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const setSuccessAlertState = useSetRecoilState(successAlertState);
  const service = useRecoilValue(serviceState);
  const publishedId = useRecoilValue(publishedIdState(service?.id||0));
  const changed = useRecoilValue(changedState(service?.id||0));
  const [meta, setMeta] = useRecoilState(metaState(service?.id||0));
  const setPublishedId = useSetRecoilState(publishedIdState(service?.id||0));

  const [publish, { loading, error }] = usePublishMeta({
    onCompleted() {
      setPublishedId(meta?.id);
      setMeta(meta => (meta ? { ...meta, status: MetaStatus.META_STATUS_PUBLISHED } : undefined));
      setSuccessAlertState(true);
    },
  });

  useShowServerError(error);
  const handleToggle = React.useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const handleClose = React.useCallback((event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  }, []);

  const disableIncreasePublished = React.useMemo(() => {
    return !!meta?.publishedAt || (publishedId === meta?.id && !changed);
  }, [changed, meta?.id, meta?.publishedAt, publishedId]);

  const handlePublish = React.useCallback(() => {
    publish();
  }, [publish]);

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        sx={{ ml: 1 }}
        ref={anchorRef}
        disabled={changed||loading}
      >
        <LoadingButton
          variant="contained"
          color="primary"
          size="medium"
          disabled={disableIncreasePublished}
          loading={loading}
          sx={{
            "&.MuiButtonGroup-grouped:not(:last-of-type)": {
              borderRight: !changed
                ? "rgba(255, 255, 255, 0.15) solid 1px"
                : "rgba(0, 0, 0, 0.15) solid 1px !important",
            },
            fontSize: "0.9rem",
          }}
          startIcon={
            <SvgIcon fontSize="small">
              <path
                fill="currentColor"
                d="M20 13.09V7C20 4.79 16.42 3 12 3S4 4.79 4 7V17C4 19.21 7.59 21 12 21C12.46 21 12.9 21 13.33 20.94C13.12 20.33 13 19.68 13 19L13 18.95C12.68 19 12.35 19 12 19C8.13 19 6 17.5 6 17V14.77C7.61 15.55 9.72 16 12 16C12.65 16 13.27 15.96 13.88 15.89C14.93 14.16 16.83 13 19 13C19.34 13 19.67 13.04 20 13.09M18 12.45C16.7 13.4 14.42 14 12 14S7.3 13.4 6 12.45V9.64C7.47 10.47 9.61 11 12 11S16.53 10.47 18 9.64V12.45M12 9C8.13 9 6 7.5 6 7S8.13 5 12 5 18 6.5 18 7 15.87 9 12 9M22 18H20V22H18V18H16L19 15L22 18Z"
              />
            </SvgIcon>
          }
          onClick={handlePublish}
        >
          {intl.get("publish")}
        </LoadingButton>

        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          sx={{
            "&.MuiButtonGroup-grouped": {
              width: (theme) => theme.spacing(3),
              minWidth: (theme) => theme.spacing(3),
            },
          }}
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: "center top",
            }}
          >
            <Paper elevation={5}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  <MenuItem disabled={disableIncreasePublished}>
                    <SvgIcon fontSize="small" sx={{ mr: 1 }}>
                      <path
                        fill="currentColor"
                        d="M20 13.09V7C20 4.79 16.42 3 12 3S4 4.79 4 7V17C4 19.21 7.59 21 12 21C12.46 21 12.9 21 13.33 20.94C13.12 20.33 13 19.68 13 19L13 18.95C12.68 19 12.35 19 12 19C8.13 19 6 17.5 6 17V14.77C7.61 15.55 9.72 16 12 16C12.65 16 13.27 15.96 13.88 15.89C14.93 14.16 16.83 13 19 13C19.34 13 19.67 13.04 20 13.09M18 12.45C16.7 13.4 14.42 14 12 14S7.3 13.4 6 12.45V9.64C7.47 10.47 9.61 11 12 11S16.53 10.47 18 9.64V12.45M12 9C8.13 9 6 7.5 6 7S8.13 5 12 5 18 6.5 18 7 15.87 9 12 9M22 18H20V22H18V18H16L19 15L22 18Z"
                      />
                    </SvgIcon>
                    增量发布
                  </MenuItem>
                  <MenuItem>
                    <SvgIcon fontSize="small" sx={{ mr: 1 }}>
                      <path
                        fill="currentColor"
                        d="M12 16C12.41 16 12.81 15.97 13.21 15.94C13.4 15.18 13.72 14.46 14.16 13.83C13.47 13.94 12.74 14 12 14C9.58 14 7.3 13.4 6 12.45V9.64C7.47 10.47 9.61 11 12 11S16.53 10.47 18 9.64V11.19C18.5 11.07 19 11 19.55 11C19.7 11 19.85 11 20 11.03V7C20 4.79 16.42 3 12 3S4 4.79 4 7V17C4 19.21 7.59 21 12 21C12.66 21 13.31 20.96 13.92 20.88C13.57 20.29 13.31 19.64 13.16 18.94C12.79 19 12.41 19 12 19C8.13 19 6 17.5 6 17V14.77C7.61 15.55 9.72 16 12 16M12 5C15.87 5 18 6.5 18 7S15.87 9 12 9 6 7.5 6 7 8.13 5 12 5M23 17.5C23 18.32 22.75 19.08 22.33 19.71L21.24 18.62C21.41 18.28 21.5 17.9 21.5 17.5C21.5 16.12 20.38 15 19 15V16.5L16.75 14.25L19 12V13.5C21.21 13.5 23 15.29 23 17.5M19 18.5L21.25 20.75L19 23V21.5C16.79 21.5 15 19.71 15 17.5C15 16.68 15.25 15.92 15.67 15.29L16.76 16.38C16.59 16.72 16.5 17.1 16.5 17.5C16.5 18.88 17.62 20 19 20V18.5Z"
                      />
                    </SvgIcon>
                    重新发布
                  </MenuItem>
                  <Divider />
                  <MenuItem disabled>
                    <UndoOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                    回滚
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
});
