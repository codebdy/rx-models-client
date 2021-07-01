import React, { useEffect, useState } from 'react';
import { makeStyles, 
  Theme, 
  createStyles, 
  Grid, 
  InputAdornment, 
  TextField, 
  FormControl, 
  IconButton, 
  InputLabel, 
  OutlinedInput, 
  createMuiTheme, 
  ThemeProvider, 
} from '@material-ui/core';
import background from "assets/img/background1.jpg";
import rightImage from "assets/img/install3.png";
import { Visibility, VisibilityOff } from '@material-ui/icons';
import intl from "react-intl-universal";
import { useHistory } from 'react-router';
import { observer } from 'mobx-react';
import SubmitButton from './common/submit-button';
import { INDEX_URL, PRIMARY_COLOR } from '../util/consts';
import { API_LOGIN } from '../apis/auth';
import useLayzyAxios from '../data/useLayzyAxios';
import { useAppStore } from '../store/app-store';
import useShadows from '../util/use-shadows';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width:'100%',
      height:'100%',
      backgroundImage:`url(${background})`,
      backgroundPosition:' 50%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },

    installBox:{
      background: "#FFF",
      minHeight:'480px',
      boxShadow:theme.shadows[23],
    },

    rightImage:{
      background:"#f2f4f4",
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flex:1,
      height:'100%',
    },

    leftInstall:{
      padding:theme.spacing(4),
    },

    title:{
      fontSize:'20px',
    },

  }),
);

export const Install = observer(()=>{
  const classes = useStyles();
  const [values, setValues] = useState<any>({
    type:'mysql',
    host:'localhost',
    port:'3306',
    database:'',
    username: 'root',
    password: '',
    showPassword: false,
  });

  const [errorMessage, setErroMessage] = useState('');
  const appStore = useAppStore();
  const history = useHistory();

  const [login, { loading }] = useLayzyAxios<any>(API_LOGIN,{
    onCompleted(data){
      if(data && data){
        const token = data.access_token;
        appStore.setToken(token);
        history.push(INDEX_URL);
      }      
    },
    onError(error){
      if(error.response?.status === 401){
        setErroMessage(intl.get('login-failure'));
      }else{
        setErroMessage(error.message);
      }
    }
  });

  useEffect(()=>{
    setErroMessage('');
  },[values]);

  useEffect(()=>{
    if(appStore.loggedUser){
      history.push(INDEX_URL)
    }
  },[appStore.loggedUser, history]);


  const theme = createMuiTheme({
    palette: {
      type: 'light',
      primary:{
        main: PRIMARY_COLOR,
      },

    },

    shadows:[...useShadows()] as any
  });

  const handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = (event?: React.FormEvent<HTMLFormElement>)=>{
    login({
      data:{
        username:values.account, 
        password:values.password
      }
    }); 
    event && event.preventDefault();
  }

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit = {handleLogin} className={classes.root}>
        
          <Grid container justify = "center">
            <Grid 
              container 
              item md={7} 
              sm={8}
              xs={10} 
              className = {classes.installBox} 
              alignContent = "stretch"
              onKeyUp = {e=>{
                if(e.key === 'Enter') {
                  handleLogin()
                }
              }}
            >
              <Grid container item lg={6} 
                className = {classes.leftInstall} 
              >
                <Grid container item lg={12} 
                  justify = "space-between" 
                  alignItems="flex-start" 
                  alignContent = "flex-start"
                  spacing = {3}
                >  
                  <Grid item xs={12}>
                    <h2 className = {classes.title} >{intl.get('install') + " rxModels"}</h2>
                    {errorMessage&&<span style={{color:'red'}}>{errorMessage}</span>}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={intl.get('database-type')}
                      value={values.type}
                      variant="outlined"
                      onChange={handleChange('type')}
                      size = "small"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={intl.get('host')}
                      value={values.host}
                      variant="outlined"
                      onChange={handleChange('host')}
                      size = "small"
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={intl.get('port')}
                      value={values.port}
                      variant="outlined"
                      onChange={handleChange('port')}
                      size = "small"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={intl.get('database')}
                      value={values.database||''}
                      variant="outlined"
                      onChange={handleChange('database')}
                      size = "small"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={intl.get('user-name')}
                      value={values.username}
                      variant="outlined"
                      onChange={handleChange('username')}
                      size = "small"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant = "outlined" size = "small">
                      <InputLabel htmlFor="standard-adornment-password" style={{background:"#fff",padding:"0 8px"}}>{intl.get('password')}</InputLabel>
                      <OutlinedInput
                        id="standard-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                      <SubmitButton fullWidth variant="contained" color="primary" size = "large" 
                        style={{fontSize:'1.2rem'}}
                        submitting = {loading}
                        type = "submit"
                      >
                        {intl.get('install')}
                      </SubmitButton>
                  </Grid>            
                </Grid>
              </Grid>
              <Grid item lg={6} className = {classes.rightImage}>
                <img src={rightImage} alt="" width="100%"/>
              </Grid>  
            </Grid>

          </Grid>
      </form>
    </ThemeProvider>
  )
})
