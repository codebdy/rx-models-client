import { Grid, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react';
import intl from "react-intl-universal";
import { PageLayout } from './page-layout';

export const FirstPage=(props:{
  onNextPage:()=>void
})=>{
  const {onNextPage} = props;
  const [values, setValues] = useState<any>({
    type:'mysql',
    host:'localhost',
    port:'3306',
    database:'',
    username: 'root',
    password: '',
    showPassword: false,
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
  
  return (
    <PageLayout
      action = {
        <Button variant="contained" color="primary" size = "large" 
          onClick = {onNextPage}
          type = "button"
          disabled = {!values.type || !values.host || !values.port || !values.database || !values.username}
        >
          {intl.get('next-step')}
        </Button>
      }
    >
      <Grid item xs={6}>
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
      <Grid item xs={6}>
        <TextField
          fullWidth
          label={intl.get('database-type')}
          value={values.type}
          variant="outlined"
          onChange={handleChange('type')}
          size = "small"
          disabled
          required
        />
      </Grid>

      <Grid item xs={6}>
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
      <Grid item xs={6}>
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
    </PageLayout>
  )
}