import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import SubmitButton from 'components/common/submit-button';
import React, { useState } from 'react';
import intl from "react-intl-universal";
import { PageLayout } from './page-layout';


export const SecondPage=(
  props:{
    values:any,
    onPreviousPage:()=>void,
    onValuesChange:(values:any)=>void,
  }
)=>{
  const {values, onPreviousPage, onValuesChange} = props;
  const [showPassword, setShowPassword] = useState(false);
  
  const handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onValuesChange({ ...values, [prop]: event.target.value });
  };
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  

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
              //submitting = {loading}
              disabled = {!values.admin || !values.adminPassword}
              type = "button"
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
            type={values.showPassword ? 'text' : 'password'}
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
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>           
      </PageLayout>
  )
}