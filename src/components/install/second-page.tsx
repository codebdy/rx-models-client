import { Button, Grid, TextField} from '@material-ui/core';
import SubmitButton from 'components/common/submit-button';
import React, { useState } from 'react';
import intl from "react-intl-universal";

export const SecondPage=(
  props:{
    onPreviousPage:()=>void
  }
)=>{
  const {onPreviousPage} = props;
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

  return (
    <>
      <Grid item xs={12}>
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
      <Grid item xs={12} container justifyContent="flex-end">
          <Button variant="contained" size = "large" 
            onClick = {onPreviousPage}
            style={{marginRight:'16px'}}
          >
            {intl.get('previous-step')}
          </Button>
          <SubmitButton fullWidth variant="contained" color="primary" size = "large" 
            //submitting = {loading}
            type = "button"
          >
            {intl.get('install')}
          </SubmitButton>
      </Grid>    
    </>
  )
}