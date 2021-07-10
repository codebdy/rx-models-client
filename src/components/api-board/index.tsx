import React from 'react';
import { makeStyles, Theme, createStyles, Container, Grid, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop:theme.spacing(2),
      height:'100%',
    },
    container:{
      height:'100%'
    },
    left:{
      display:'flex',
      flexFlow:'column'
    },
    leftApiArea: {
      display:'flex',
    },
    leftMethod:{
      width:'200px',
    },
    leftUrl:{
      flex:1,
      marginLeft:theme.spacing(2),
    },
    uploadInputArea:{
      marginTop:theme.spacing(2),
    }
  }),
);

export default function ApiBoard(){
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth="xl">
      <Grid container className={classes.container} spacing ={3}>
        <Grid item md = {6} className = {classes.left}>
          <div className={classes.leftApiArea}>
            <div className = {classes.leftMethod}>
              <FormControl variant="outlined" fullWidth size = "small">
                <InputLabel >API</InputLabel>
                <Select
                  //value={age}
                  //onChange={handleChange}
                  label="API"
                >
                  <MenuItem value={10}>query</MenuItem>
                  <MenuItem value={20}>post</MenuItem>
                  <MenuItem value={201}>update</MenuItem>
                  <MenuItem value={23}>delete</MenuItem>
                  <MenuItem value={30}>upload</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className = {classes.leftUrl}>
              <TextField label="URL" variant="outlined" fullWidth size = "small" disabled />
            </div>
          </div>
          <div className = {classes.uploadInputArea}>
            <input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
            />
          </div>
          <div>

          </div>
        </Grid>
        <Grid item md = {6}>
          Right
        </Grid>
      </Grid>
    </Container>
  )
}
