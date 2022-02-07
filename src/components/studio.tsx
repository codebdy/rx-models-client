import React from "react";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Avatar, IconButton, Link, SvgIcon, Tooltip } from "@mui/material";
import intl from "react-intl-universal";
import { NavLink, Redirect, Route, Switch, useHistory } from "react-router-dom";
import MdiIcon from "./common/mdi-icon";
import Spacer from "./common/spacer";
import ApiBoard from "./api-board";
import { ModelsBoard } from "./entity-board";
import { AuthBoard } from "./auth-board";
import { useAppStore } from "store/app-store";
import { rxModelsSwrConfig } from "@rxdrag/rxmodels-swr";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "100%",
      display: "flex",
      flexFlow: "column",
    },
    logoIcon: {
      marginRight: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
      letterSpacing: "1px",
      fontWeight: "bold",
    },
    githubLink: {
      color: theme.palette.text.secondary,
      marginRight: theme.spacing(1),
    },

    navLink: {
      textDecoration: "none",
      color: theme.palette.text.primary,
      padding: theme.spacing(1, 2),
      borderRadius: "5px",
      fontSize: "0.9rem",
      "&:hover": {
        textDecoration: "none",
        background: "rgba(0,0,0, 0.05)",
      },
    },

    activeLink: {
      color: theme.palette.primary.main,
    },
  })
);

export const Studio = () => {
  const classes = useStyles();
  const history = useHistory();
  const appStore = useAppStore();

  const handleLogout = () => {
    appStore.setToken("");
    appStore.setLoggedUser(undefined);
    localStorage.removeItem(rxModelsSwrConfig.tokenName);
    rxModelsSwrConfig.token = "";
    history.push(rxModelsSwrConfig.loginUrl);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" variant="outlined">
        <Toolbar>
          <Avatar variant="rounded" className={classes.logoIcon}>
            <SvgIcon sx={{ fontSize: 32 }}>
              <path
                fill="currentColor"
                d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V9.21L13,12.58V19.29L19,15.91Z"
              />
            </SvgIcon>
          </Avatar>
          <NavLink
            className={classes.navLink}
            activeClassName={classes.activeLink}
            to="/studio/models"
          >
            {intl.get("uml-studio")}
          </NavLink>

          <NavLink
            className={classes.navLink}
            activeClassName={classes.activeLink}
            to="/studio/api"
          >
            {intl.get("api-studio")}
          </NavLink>
          <NavLink
            className={classes.navLink}
            activeClassName={classes.activeLink}
            to="/studio/auth"
          >
            {intl.get("auth-management")}
          </NavLink>
          {
            //<NavLink
            //  className = {classes.navLink}
            //  activeClassName = {classes.activeLink}
            //  to="/studio/commands"
            //>
            //  {intl.get('commands')}
            ///NavLink>
          }
          <Link
            className={classes.navLink}
            target="_blank"
            href="https://rxdrag.com/docs/intro"
          >
            {intl.get("document")}
          </Link>
          <Link
            className={classes.navLink}
            target="_blank"
            href="https://github.com/rxdrag/rx-models"
          >
            Github
          </Link>
          <Spacer />
          <Tooltip title="Logout" aria-label="Logout" onClick={handleLogout}>
            <IconButton size="large">
              <MdiIcon iconClass="mdi-logout" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/studio/models" component={ModelsBoard}></Route>
        <Route path="/studio/api" component={ApiBoard}></Route>
        <Route path="/studio/auth" component={AuthBoard}></Route>
        <Redirect to={`/studio/models`} from="/studio" />
      </Switch>
    </div>
  );
};
