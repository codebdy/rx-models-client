import React, { useRef, useState } from 'react';
import { makeStyles, Theme, createStyles, Container, Grid, FormControl, InputLabel, Select, MenuItem, TextField, CircularProgress, Fab } from '@material-ui/core';
import MonacoEditor from 'react-monaco-editor';
import MdiIcon from 'components/common/mdi-icon';
import { serverUrl } from 'data/server-config';
import { API_MAGIC_DELETE, API_MAGIC_POST, API_MAGIC_QUERY, API_MAGIC_UPDATE, API_MAGIC_UPLOAD } from 'apis/magic';
import { useShowServerError } from 'store/helpers/use-show-server-error';
import { useAppStore } from 'store/app-store';
import intl from 'react-intl-universal';
import { MagicQueryBuilder } from 'data/magic-query-builder';
import useLayzyAxios from 'data/use-layzy-axios';

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
  const [queryString, setQueryString] = useState(JSON.stringify({entity:""}, null, 2));
  const [postString, setPostString] = useState(JSON.stringify({EntityName:{id:1}}, null, 2));
  const [updateString, setUpdateString] = useState(JSON.stringify({EntityName:{fieldName:'', ids:[]}}, null, 2));
  const [deleteString, setDeleteString] = useState(JSON.stringify({EntityName:[]}, null, 2));
  const [uploadString, setUploadString] = useState(JSON.stringify({entity:'RxMedia'}, null, 2));
  const [uploadFile, setUploadFile] = useState<any>();
  const appStore = useAppStore();
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

  let value = queryString;
  if(apiType === ApiType.post){
    value = postString;
  }
  if(apiType === ApiType.update){
    value = updateString;
  }
  if(apiType === ApiType.delete){
    value = deleteString;
  }
  if(apiType === ApiType.upload){
    value = uploadString;
  }

  const optionsRight = {
    selectOnLineNumbers: false,
    lineNumbers: 'off' as any,
    glyphMargin: false,
    folding: true,
    lineDecorationsWidth: 20,
    lineNumbersMinChars: 0
  };

  const handleEditorDidMount = (monaco: any)=>{
    monaco.languages?.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
    });
  }

  const handleApiChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setApiType(event.target.value as ApiType);
  };

  const handleUploadFileChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setUploadFile(event.target.files ? event.target.files[0] : undefined);
  }

  const [excuteRun, {data, loading, error}] = useLayzyAxios();

  useShowServerError(error);
  

  const handleJsonChange =(value:string)=>{
    if(apiType === ApiType.query){
      setQueryString(value);
    }

    if(apiType === ApiType.post){
      setPostString(value);
    }

    if(apiType === ApiType.update){
      setUpdateString(value);
    }
    if(apiType === ApiType.delete){
      setDeleteString(value);
    }
    if(apiType === ApiType.upload){
      setUploadString(value);
    }
  }

  const handleRun = ()=>{
    try{
      JSON.parse(value);
      if(apiType === ApiType.query){
        const builder = new MagicQueryBuilder(queryString);
        excuteRun(builder.toAxioConfig());
      }

      if(apiType === ApiType.post){
        excuteRun({...API_MAGIC_POST, data:JSON.parse(postString)});
      }

      if(apiType === ApiType.update){
        excuteRun({...API_MAGIC_UPDATE, data:JSON.parse(updateString)});
      }

      if(apiType === ApiType.delete){
        excuteRun({...API_MAGIC_DELETE, data:JSON.parse(deleteString)});
      }

      if(apiType === ApiType.upload){
        const formData = new FormData()
        formData.append('file', uploadFile);
        const inpuJson = JSON.parse(uploadString);
        for(const key in inpuJson){
          formData.append(key, inpuJson[key])
        }
        excuteRun({
          ...API_MAGIC_UPLOAD, 
          headers:{"Content-Type": "multipart/form-data;boundary=" + new Date().getTime()},
          data:formData
        });
      }

    }
    catch(error){
      console.error(error);
      appStore.infoError(intl.get('error'), error.message);
    }
  }

  return (
    <Container className={classes.root} maxWidth="xl">
      <Grid container className={classes.container} spacing ={3}>
        <Grid item xs = {6} className = {classes.left}>
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
                onChange = {handleUploadFileChange}
              />
            </div>
          }
          <div className = {classes.leftJsonShell} ref = {ref}>
            <MonacoEditor
              language="json"
              theme="vs"
              value={value}
              options={optionsLeft}
              onChange={handleJsonChange}
              editorDidMount={handleEditorDidMount}
            />
          </div>
          <div className = {classes.send}>
            {
              loading?
                <CircularProgress />
              :
              <Fab 
                size="large" 
                color = "primary"
                onClick={handleRun} 
              >        
                <MdiIcon iconClass="mdi-play" size={46}/>
              </Fab>  
            }   
          </div>
        </Grid>
        <Grid item container xs = {6}>
          <Grid item xs = {12} className={classes.rightJsonShell}>
            <MonacoEditor
              language="json"
              theme="vs"
              value={data ? JSON.stringify(data, null, 2) : ''}
              options={optionsRight}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
