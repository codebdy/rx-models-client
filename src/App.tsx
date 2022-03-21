import {
  createTheme,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material";
import { rxModelsSwrConfig } from "@rxdrag/rxmodels-swr";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Loading from "./components/common/loading";
import { Install } from "./components/install";
import { Login } from "./components/login";
import { Studio } from "./components/studio";
import { ConfirmDialog } from "./components/widgets/confirm-dialog";
import { ErrorDialog } from "./components/widgets/ErrorDialog";
import { SuccessAlertBar } from "./components/widgets/SuccessAlertBar";
import {
  INDEX_URL,
  INTALL_URL,
  PRIMARY_COLOR,
} from "./util/consts";
import { useIntl } from "./util/use-intl";
import useShadows from "./util/use-shadows";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

function App() {

  const [langLoading] = useIntl();
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: PRIMARY_COLOR,
      },
    },

    shadows: [...useShadows()] as any,
  });

  return langLoading ? (
    <Loading />
  ) : (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path={rxModelsSwrConfig.loginUrl} component={Login}></Route>
          <Route path={INTALL_URL} component={Install}></Route>
          <Route path={INDEX_URL} component={Studio}></Route>
          <Redirect to={INDEX_URL} from="/" />
        </Switch>
        <SuccessAlertBar />
        <ErrorDialog />
        <ConfirmDialog />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
