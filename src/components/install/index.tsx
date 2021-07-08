import React, { useEffect, useState } from 'react';
import { makeStyles, 
  Theme, 
  createStyles, 
  Grid, 
  createTheme, 
  ThemeProvider,
  Button,
} from '@material-ui/core';
import background from "assets/img/background1.jpg";
import rightImage from "assets/img/install3.png";
import intl from "react-intl-universal";
import { useHistory } from 'react-router';
import { observer } from 'mobx-react';
import { INDEX_URL, LOGIN_URL, PRIMARY_COLOR } from '../../util/consts';
import useLayzyAxios from '../../data/use-layzy-axios';
import { useAppStore } from '../../store/app-store';
import useShadows from '../../util/use-shadows';
import { API_INSTALL, API_IS_INSTALLED } from 'apis/install';
import { useSWRQuery } from 'data/use-swr-query';
import { Alert } from '@material-ui/lab';
import { FirstPage } from './first-page';
import { SecondPage } from './second-page';


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
  const [pageNumber, setPageNumber] = useState(1);

  const{data, loading: checking, error} = useSWRQuery<{installed:boolean}>(API_IS_INSTALLED);

  const [install, { loading }] = useLayzyAxios<any>(API_INSTALL,{
    onCompleted(data){
      if(data && data){
        history.push(LOGIN_URL);
      }      
    },
    onError(error){
      setErroMessage(error.message);
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


  const theme = createTheme({
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
  
  const handleLogin = (event?: React.FormEvent<HTMLFormElement>)=>{
    install({
      data:{
        username:values.account, 
        password:values.password
      }
    }); 
    event && event.preventDefault();
  }

  const handleNextPage = ()=>{
    setPageNumber(2);
  }


  return (
    <ThemeProvider theme={theme}>

      <form onSubmit = {handleLogin} className={classes.root}>
        <Grid container justifyContent = "center">
          <Grid 
            container 
            item md={7} 
            sm={8}
            xs={10} 
            className = {classes.installBox} 
            alignContent = "stretch"
          >
            <Grid container item lg={6} 
              className = {classes.leftInstall} 
            >
              <Grid container item lg={12} 
                justifyContent = "space-between" 
                alignItems="flex-start" 
                alignContent = "flex-start"
                spacing = {3}
              >  
                <Grid item xs={12}>
                  <h2 className = {classes.title} >{intl.get('install') + " rxModels"}</h2>
                  {errorMessage&&<span style={{color:'red'}}>{errorMessage}</span>}
                </Grid>
                {
                  checking && 
                  <div>Install checking...</div>
                }
                {
                  error &&
                  <Alert severity="error">{error.message}</Alert>
                }
                {
                  !checking && data?.installed && 
                  <Alert severity="error">{intl.get('installed')}</Alert>
                }
                {
                  !checking && !error && !data?.installed &&
                  <>
                    {
                      pageNumber === 1
                      ? <FirstPage onNextPage = {()=>{
                        setPageNumber(2)
                      }}/>
                      : <SecondPage onPreviousPage = {()=>{
                        setPageNumber(1)
                      }}/>
                    }
                    
                  </>
                }
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
