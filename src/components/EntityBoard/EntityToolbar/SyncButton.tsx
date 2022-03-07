import * as React from "react";
import { Button, SvgIcon } from "@mui/material";
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

const options = [
  "Create a merge commit",
  "Squash and merge",
  "Rebase and merge",
];

export const SyncButton = memo(() => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const disabled = false;
  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        sx={{ ml: 1 }}
        ref={anchorRef}
        aria-label="split button"
      >
        <LoadingButton
          variant="contained"
          color="primary"
          size="medium"
          sx={{
            "&.MuiButtonGroup-grouped:not(:last-of-type)": {
              borderRight: !disabled
                ? "rgba(255, 255, 255, 0.15) solid 1px"
                : "rgba(0, 0, 0, 0.15) solid 1px !important",
            },
            fontSize: "0.9rem",
          }}
          startIcon={
            <SvgIcon fontSize="small">
              <path
                fill="currentColor"
                d="M12 16C12.41 16 12.81 15.97 13.21 15.94C13.4 15.18 13.72 14.46 14.16 13.83C13.47 13.94 12.74 14 12 14C9.58 14 7.3 13.4 6 12.45V9.64C7.47 10.47 9.61 11 12 11S16.53 10.47 18 9.64V11.19C18.5 11.07 19 11 19.55 11C19.7 11 19.85 11 20 11.03V7C20 4.79 16.42 3 12 3S4 4.79 4 7V17C4 19.21 7.59 21 12 21C12.66 21 13.31 20.96 13.92 20.88C13.57 20.29 13.31 19.64 13.16 18.94C12.79 19 12.41 19 12 19C8.13 19 6 17.5 6 17V14.77C7.61 15.55 9.72 16 12 16M12 5C15.87 5 18 6.5 18 7S15.87 9 12 9 6 7.5 6 7 8.13 5 12 5M23 17.5C23 18.32 22.75 19.08 22.33 19.71L21.24 18.62C21.41 18.28 21.5 17.9 21.5 17.5C21.5 16.12 20.38 15 19 15V16.5L16.75 14.25L19 12V13.5C21.21 13.5 23 15.29 23 17.5M19 18.5L21.25 20.75L19 23V21.5C16.79 21.5 15 19.71 15 17.5C15 16.68 15.25 15.92 15.67 15.29L16.76 16.38C16.59 16.72 16.5 17.1 16.5 17.5C16.5 18.88 17.62 20 19 20V18.5Z"
              />
            </SvgIcon>
          }
          //onClick={handleSave}
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
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
});
