import React, { useRef } from 'react';
import { makeStyles, Theme, createStyles, Container, Grid, FormControl, InputLabel, Select, MenuItem, TextField, CircularProgress, Fab } from '@material-ui/core';
import MonacoEditor from 'react-monaco-editor';
import MdiIcon from 'components/common/mdi-icon';

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
      flexFlow:'column',
      position:'relative',
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
    },
    leftJsonShell:{
      flex:1,
      marginTop:theme.spacing(2),
      border: `${theme.palette.divider} solid 1px`,
    },
    rightJsonShell:{
      border: `${theme.palette.divider} solid 1px`,
    },
    send:{
      position:'absolute',
      top:'50%',
      right:'-25px',
      zIndex:1,
    }
  }),
);

export default function ApiBoard(){
  const classes = useStyles();
  const ref = useRef(null);
  const code = '{\n\n}';
  const optionsLeft = {
    selectOnLineNumbers: true,
  };

  const optionsRight = {
    selectOnLineNumbers: false,
    lineNumbers: 'off' as any,
    glyphMargin: false,
    folding: false,
    lineDecorationsWidth: 10,
    lineNumbersMinChars: 0
  };

  const onEditorDidMount = (monaco: any)=>{
    monaco.languages?.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
    });
  }

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
          <div className = {classes.leftJsonShell} ref = {ref}>
            <MonacoEditor
              language="json"
              theme="vs"
              value={code}
              options={optionsLeft}
              //onChange={::this.onChange}
              editorDidMount={onEditorDidMount}
            />
          </div>
          <div className = {classes.send}>
            {
              false?
                <CircularProgress />
              :
              <Fab 
                size="large" 
                color = "primary"
                //onClick={handleRun} 
              >        
                <MdiIcon iconClass="mdi-play" size={50}/>
              </Fab>  
            }   
          </div>
        </Grid>
        <Grid item container md = {6}>
          <Grid item xs = {12} className={classes.rightJsonShell}>
            <MonacoEditor
              language="json"
              theme="vs"
              value={code}
              options={optionsRight}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
