import React from "react"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Avatar, IconButton, Link, Tooltip } from '@material-ui/core';
import { observer } from 'mobx-react';
import intl from 'react-intl-universal';
import { NavLink, Redirect, Route, Switch, useHistory } from "react-router-dom";
import MdiIcon from "./common/mdi-icon";
import Spacer from "./common/spacer";
import ApiBoard from "./api-board";
import { ModelsBoard } from "./entity-board";
import { AuthBoard } from "./auth-board";
import { useAppStore } from "store/app-store";
import { swrModelConfig } from "swr-rxmodel/swr-model-config";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height:'100%',
      display: 'flex',
      flexFlow: 'column',
    },
    logoIcon: {
      marginRight: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
      letterSpacing:'1px',
      fontWeight:'bold',
      fontSize:'20px',
    },
    githubLink:{
      color: theme.palette.text.secondary,
      marginRight:theme.spacing(1),
    },

    navLink:{
      textDecoration:'none',
      color:theme.palette.text.primary,
      padding:theme.spacing(1, 2),
      borderRadius:'5px',
      fontSize:'0.9rem',
      '&:hover':{
        textDecoration:'none',
        background:'rgba(0,0,0, 0.05)',
      }
    },

    activeLink:{
      color:theme.palette.primary.main,
    }
  }),
);

export const Studio = observer(() => {
  const classes = useStyles();
  const history = useHistory();
  const appStore = useAppStore();

  const handleLogout = ()=>{
    appStore.setToken('');
    appStore.setLoggedUser(undefined);
    localStorage.removeItem(swrModelConfig.tokenName);
    swrModelConfig.token = "";
    history.push(swrModelConfig.loginUrl);
  }

  return (
    <div className={classes.root}>
      <AppBar 
        position="static" 
        color = "transparent"
        variant = "outlined"
      >
        <Toolbar>
          <Avatar
            variant="rounded"
            className={classes.logoIcon}
          >
            RX
          </Avatar>
          <NavLink
            className = {classes.navLink}
            activeClassName = {classes.activeLink}
            to="/studio/models"
          >
            {intl.get('uml-studio')}
          </NavLink>

          <NavLink
            className = {classes.navLink}
            activeClassName = {classes.activeLink}
            to="/studio/api"
          >
            {intl.get('api-studio')}
          </NavLink>
          <NavLink
            className = {classes.navLink}
            activeClassName = {classes.activeLink}
            to="/studio/auth"
          >
            {intl.get('auth-management')}
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
            className = {classes.navLink}
            target = "_blank"
            href= "https://rxdrag.com/docs/intro"
          >
            {intl.get('document')}
          </Link>
          <Link
            className = {classes.navLink}
            target = "_blank"
            href= "https://github.com/rxdrag/rx-models"
          >
            Github
          </Link>
          <Spacer />
          <Tooltip title="Logout" aria-label="Logout" onClick = {handleLogout}>
            <IconButton><MdiIcon iconClass = "mdi-logout" /></IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/studio/models" component={ModelsBoard}></Route> 
        <Route path="/studio/api" component={ApiBoard}></Route>
        <Route path="/studio/auth" component={AuthBoard}></Route>
        <Redirect to={`/studio/models`} from='/studio' /> 
      </Switch>

    </div>
  );
})