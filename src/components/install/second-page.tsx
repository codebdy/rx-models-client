import { Button, Checkbox, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { API_INSTALL } from 'apis/install';
import SubmitButton from 'components/common/submit-button';
import useLayzyAxios from 'swr-model/use-layzy-axios';
import React, { useState } from 'react';
import intl from "react-intl-universal";
import { PageLayout } from './page-layout';
import { useHistory } from 'react-router';
import { useShowServerError } from 'store/helpers/use-show-server-error';
import { swrModelConfig } from 'swr-model/swr-model-config';

export const SecondPage=(
  props:{
    values:any,
    onPreviousPage:()=>void,
    onValuesChange:(values:any)=>void,
  }
)=>{
  const {values, onPreviousPage, onValuesChange} = props;
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const [install, { loading, error}] = useLayzyAxios<any>(API_INSTALL,{
    onCompleted(data){
      if(data && data.success){
        history.push(swrModelConfig.loginUrl);
      }      
    },
  });

  useShowServerError(error);
  
  const handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onValuesChange({ ...values, [prop]: event.target.value });
  };

  const handleWithDemoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValuesChange({ ...values, withDemo: event.target.checked });
  };
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleInstall = ()=>{
    install({data:values})
  }

  return (
    <PageLayout
      action = {
        <>
          <Button variant="contained" size = "large" 
            onClick = {onPreviousPage}
            style={{marginRight:'16px'}}
          >
            {intl.get('previous-step')}
          </Button>
          <SubmitButton fullWidth variant="contained" color="primary" size = "large" 
            submitting = {loading}
            disabled = {!values.admin || !values.adminPassword}
            type = "button"
            onClick = {handleInstall}
          >
            {intl.get('install')}
          </SubmitButton>
        </>
      }
    >
      <Grid item xs={12}>
        <TextField
          fullWidth
          label={intl.get('admin-name')}
          value={values.admin}
          variant="outlined"
          onChange={handleChange('admin')}
          size = "small"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth variant = "outlined" size = "small" required>
          <InputLabel htmlFor="standard-adornment-password" style={{background:"#fff",padding:"0 8px"}}>{intl.get('password')}</InputLabel>
          <OutlinedInput
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={values.adminPassword}
            required
            onChange={handleChange('adminPassword')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid> 
      <Grid item xs = {12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={values.withDemo}
              onChange={handleWithDemoChange}
              color="primary"
            />
          }
          label={intl.get('with-demo')}
        />
      </Grid>          
    </PageLayout>
  )
}