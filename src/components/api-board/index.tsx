import React, { useRef, useState } from 'react';
import { makeStyles, Theme, createStyles, Container, Grid, FormControl, InputLabel, Select, MenuItem, TextField, CircularProgress, Fab } from '@material-ui/core';
import MonacoEditor from 'react-monaco-editor';
import MdiIcon from 'components/common/mdi-icon';
import { serverUrl } from 'data/server-config';
import { API_MAGIC_DELETE, API_MAGIC_POST, API_MAGIC_QUERY, API_MAGIC_UPDATE, API_MAGIC_UPLOAD } from 'apis/magic';

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

enum ApiType{
  query = 1,
  post,
  update,
  delete,
  upload
}

export default function ApiBoard(){
  const classes = useStyles();
  const ref = useRef(null);
  const [apiType, setApiType] = useState(ApiType.query);
  const code = '{\n\n}';
  const optionsLeft = {
    selectOnLineNumbers: true,
  };

  let url = serverUrl + API_MAGIC_QUERY.url;

  if(apiType === ApiType.post){
    url = serverUrl + API_MAGIC_POST.url;
  }
  if(apiType === ApiType.update){
    url = serverUrl + API_MAGIC_UPDATE.url;
  }
  if(apiType === ApiType.delete){
    url = serverUrl + API_MAGIC_DELETE.url;
  }
  if(apiType === ApiType.upload){
    url = serverUrl + API_MAGIC_UPLOAD.url;
  }

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

  const handleApiChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setApiType(event.target.value as ApiType);
  };

  return (
    <Container className={classes.root} maxWidth="xl">
      <Grid container className={classes.container} spacing ={3}>
        <Grid item md = {6} className = {classes.left}>
          <div className={classes.leftApiArea}>
            <div className = {classes.leftMethod}>
              <FormControl variant="outlined" fullWidth size = "small">
                <InputLabel >API</InputLabel>
                <Select
                  value={apiType}
                  onChange={handleApiChange}
                  label="API"
                >
                  <MenuItem value={ApiType.query}>query</MenuItem>
                  <MenuItem value={ApiType.post}>post</MenuItem>
                  <MenuItem value={ApiType.update}>update</MenuItem>
                  <MenuItem value={ApiType.delete}>delete</MenuItem>
                  <MenuItem value={ApiType.upload}>upload</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className = {classes.leftUrl}>
              <TextField label="URL" variant="outlined" fullWidth size = "small" disabled value = {url} />
            </div>
          </div>
          {
            apiType === ApiType.upload &&
            <div className = {classes.uploadInputArea}>
              <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
              />
            </div>
          }
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
