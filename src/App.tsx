import { createTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { initSwrModel, swrModelConfig } from 'swr-model/swr-model-config';
import './App.css';
import Loading from './components/common/loading';
import { Install } from './components/install';
import { Login } from './components/login';
import { Studio } from './components/studio';
import { ConfirmDialog } from './components/widgets/confirm-dialog';
import { ErrorDialog } from './components/widgets/error-dialog';
import { SuccessAlertBar } from './components/widgets/success-alert-bar';
import { INDEX_URL, INTALL_URL,  LOGIN_URL,  PRIMARY_COLOR, SERVER_URL, TOKEN_NAME } from './util/consts';
import { useIntl } from './util/use-intl';
import useShadows from './util/use-shadows';

function App() {
  initSwrModel({
    serverUrl: SERVER_URL,
    loginUrl: LOGIN_URL,
    tokenName: TOKEN_NAME,
  });

  const [langLoading] = useIntl();
  const theme = createTheme({
    palette: {
      type: 'light',
      primary:{
        main: PRIMARY_COLOR,
      },

    },

    shadows:[...useShadows()] as any
  });

  return (
    langLoading?
      (<Loading />)
    :
      (<ThemeProvider theme={theme}>
          <Switch> 
            <Route path={ swrModelConfig.loginUrl } component={Login}></Route>
            <Route path={ INTALL_URL } component={Install}></Route>
            <Route path={ INDEX_URL } component={Studio}></Route>
            <Redirect to={ INDEX_URL } from='/' /> 
          </Switch>
        <SuccessAlertBar />
        <ErrorDialog />
        <ConfirmDialog />
      </ThemeProvider>)
  );
}

export default App;
