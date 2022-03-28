import React, { useEffect, useState } from "react";
import {
  Theme,
  Grid,
  Typography,
  InputAdornment,
  TextField,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import background from "assets/img/background1.jpg";
import leftImage from "assets/img/login1.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import intl from "react-intl-universal";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import { INDEX_URL, PRIMARY_COLOR } from "../util/consts";
import { useAppStore } from "../store/app-store";
import useShadows from "../util/use-shadows";
import { cache } from "swr";
import { rxModelsSwrConfig } from "@rxdrag/rxmodels-swr";
import { useLogin } from "do-ents/useLogin";
import { LoadingButton } from "@mui/lab";

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

    loginBox: {
      background: "#FFF",
      height: "60vh",
      minHeight: "480px",
      boxShadow: theme.shadows[23],
    },

    leftImage: {
      background: "#f2f4f4",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      height: "100%",
    },

    rightLogin: {
      padding: theme.spacing(4),
    },

    title: {
      fontSize: "20px",
    },

    margin: {
      margin: theme.spacing(1),
    },

    rememberAndForgot: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  })
);

export const Login = observer(() => {
  const classes = useStyles();
  const [values, setValues] = useState<any>({
    account: "demo",
    password: "demo",
    showPassword: false,
  });

  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErroMessage] = useState("");
  const appStore = useAppStore();
  const history = useHistory();

  const [login, { loading }] = useLogin({
    onCompleted(token: string) {
      console.log("token:", token);
      if (token) {
        if (rememberMe) {
          localStorage.setItem(rxModelsSwrConfig.tokenName, token);
        } else {
          localStorage.removeItem(rxModelsSwrConfig.tokenName);
        }
        appStore.setToken(token);
        rxModelsSwrConfig.token = token;
        history.push(INDEX_URL);
      }
    },
    onError(error: any) {
      if (error.response?.status === 401) {
        setErroMessage(intl.get("login-failure"));
      } else {
        setErroMessage(error.message);
      }
    },
  });

  useEffect(() => {
    setErroMessage("");
  }, [values]);

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

  const handleChange =
    (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleRememberMe = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };

  const handleLogin = (event?: React.FormEvent<HTMLFormElement>) => {
    cache.clear();
    login(values.account, values.password);
    event && event.preventDefault();
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <form onSubmit={handleLogin} className={classes.root}>
          <Grid container justifyContent="center">
            <Grid
              container
              item
              md={7}
              sm={8}
              xs={10}
              className={classes.loginBox}
              alignContent="stretch"
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            >
              <Grid item md={6} className={classes.leftImage}>
                <img src={leftImage} alt="" width="100%" />
              </Grid>
              <Grid
                container
                item
                lg={6}
                className={classes.rightLogin}
                justifyContent="space-between"
                alignItems="flex-start"
                alignContent="flex-start"
                spacing={3}
              >
                <Grid item xs={12}>
                  <h2 className={classes.title}>{intl.get("login")}</h2>
                  <Typography variant="subtitle1" color="textSecondary">
                    {intl.get("login-tip")}
                  </Typography>
                  {errorMessage && (
                    <span style={{ color: "red" }}>{errorMessage}</span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="name"
                    label={intl.get("user-name")}
                    value={values.account}
                    variant="outlined"
                    onChange={handleChange("account")}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined" required>
                    <InputLabel
                      htmlFor="standard-adornment-password"
                      style={{ background: "#fff", padding: "0 8px" }}
                    >
                      {intl.get("password")}
                    </InputLabel>
                    <OutlinedInput
                      id="standard-adornment-password"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            size="large"
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} className={classes.rememberAndForgot}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        name="rememberMe"
                        color="primary"
                        onChange={handleRememberMe}
                      />
                    }
                    label={
                      <Typography variant="subtitle1" color="textSecondary">
                        {intl.get("remember-me")}
                      </Typography>
                    }
                  />
                  <a href="#forgot"> {intl.get("forgot-password")}</a>
                </Grid>
                <Grid item xs={6}>
                  <LoadingButton
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{ fontSize: "1.2rem" }}
                    loading={loading}
                    type="submit"
                  >
                    {intl.get("login")}
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </ThemeProvider>
    </StyledEngineProvider>
  );
});
