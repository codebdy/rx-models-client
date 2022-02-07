import React, { useEffect, useState } from "react";
import {
  Theme,
  Grid,
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import background from "assets/img/background1.jpg";
import rightImage from "assets/img/install1.png";
import intl from "react-intl-universal";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import { INDEX_URL, PRIMARY_COLOR } from "../../util/consts";
import { useAppStore } from "../../store/app-store";
import useShadows from "../../util/use-shadows";
import { API_IS_INSTALLED } from "apis/install";
import { useSWRQuery } from "@rxdrag/rxmodels-swr";
import { Alert } from "@mui/material";
import { FirstPage } from "./first-page";
import { SecondPage } from "./second-page";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      backgroundImage: `url(${background})`,
      backgroundPosition: " 50%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },

    installBox: {
      background: "#FFF",
      minHeight: "480px",
      boxShadow: theme.shadows[23],
    },

    rightImage: {
      background: "#f2f4f4",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      height: "100%",
    },

    leftInstall: {
      display: "flex",
      flexFlow: "column",
      padding: theme.spacing(4),
    },

    title: {
      fontSize: "20px",
    },
  })
);

export const Install = observer(() => {
  const classes = useStyles();
  const appStore = useAppStore();
  const history = useHistory();
  const [pageNumber, setPageNumber] = useState(1);
  const [values, setValues] = useState<any>({
    type: "mysql",
    host: "localhost",
    port: "3306",
    database: "",
    username: "root",
    password: "",
    admin: "admin",
    adminPassword: "",
    withDemo: false,
  });

  const handleChange = (values: any) => {
    setValues({ ...values });
  };

  const {
    data,
    loading: checking,
    error,
  } = useSWRQuery<{ installed: boolean }>(API_IS_INSTALLED);

  useEffect(() => {
    if (appStore.loggedUser) {
      history.push(INDEX_URL);
    }
  }, [appStore.loggedUser, history]);

  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: PRIMARY_COLOR,
      },
    },

    shadows: [...useShadows()] as any,
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Grid container justifyContent="center">
            <Grid
              container
              item
              md={7}
              sm={8}
              xs={10}
              className={classes.installBox}
              alignContent="stretch"
            >
              <Grid item lg={6} className={classes.leftInstall}>
                <div>
                  <h2 className={classes.title}>
                    {intl.get("install") + " rxModels"}
                  </h2>
                </div>
                {checking && <div>Install checking...</div>}
                {error && <Alert severity="error">{error.message}</Alert>}
                {!checking && data?.installed && (
                  <Alert severity="error">{intl.get("installed")}</Alert>
                )}
                {!checking && !error && !data?.installed && (
                  <>
                    {pageNumber === 1 ? (
                      <FirstPage
                        values={values}
                        onValuesChange={handleChange}
                        onNextPage={() => {
                          setPageNumber(2);
                        }}
                      />
                    ) : (
                      <SecondPage
                        values={values}
                        onValuesChange={handleChange}
                        onPreviousPage={() => {
                          setPageNumber(1);
                        }}
                      />
                    )}
                  </>
                )}
              </Grid>
              <Grid item lg={6} className={classes.rightImage}>
                <img src={rightImage} alt="" width="100%" />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
});
