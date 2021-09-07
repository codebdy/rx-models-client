import { Box, Button, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, SvgIcon, TextField, Theme, useTheme } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import intl from 'react-intl-universal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogContent: {
      height: 'calc(100vh - 140px)',
      overflow: 'hidden',
      '& .monaco-editor':{
        height: '100%',
      },
    },
    dialogActions:{
      p:2,
      pr:3,
    }
  }),
);

export function JsonInput(
  props:{
    label: string,
    value: any,
    onChange: (value:any)=>void,
    title: string,
  }
) {
  const {label, value, onChange, title} = props;
  const [open, setOpen] = useState(false);
  const [valueString, setValueString] = useState(JSON.stringify(value||{}, null, 2));
  const [oldValue, setOldValue] = useState<any>();
  const [error, setError] = useState('');
  const classes = useStyles();
  const theme = useTheme();

  const handleChange = (valueStr: string)=>{
    setValueString(valueStr);
    setError('');
  }

  useEffect(()=>{
    setValueString(JSON.stringify(value, null, 2));
    setOldValue(JSON.stringify(value, null, 2));
  }, [value])

  const handleEditorDidMount = (monaco: any)=>{
    monaco.languages?.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
    });
  }

  const handleClose = ()=>{
    setOpen(false);
    setValueString(JSON.stringify(value, null, 2));
    if(error){
      setError('');
    }
  }

  const handleConfirm = ()=>{
    try{    
      if(!valueString){
        onChange(undefined);
        handleClose();
        return;
      }

      const newValue = JSON.parse(valueString);
      onChange(newValue);
      handleClose();
    }
    catch(error:any){
      setError(error?.toString());
      return;
    }
  }

  return (
    <Box sx={{
      position: 'relative'
    }}>
      <TextField 
        size = "small" 
        multiline 
        rows = "12"  
        fullWidth 
        variant = "outlined"
        label = {label}
        value = {oldValue}
      />
      <IconButton
        style={{
          position: 'absolute',
          right: 2,
          bottom: 2,
        }}
        onClick = {()=>{setOpen(true)}}
      >
        <SvgIcon fontSize = "small">
          <path fill="currentColor" d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" />
        </SvgIcon>
      </IconButton>
      <Dialog 
        open ={open}
        fullWidth
        maxWidth = 'sm'
      >
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent
          className = {classes.dialogContent}
        >
          <MonacoEditor
            language="json"
            theme={ theme.palette.type === 'light' ? 'vs' : 'vs-dark'}
            value={ valueString }
            editorDidMount={handleEditorDidMount}
            onChange = {handleChange}
          />
        </DialogContent>
        <DialogActions
          className = {classes.dialogActions}
        >
          {
            error &&
            <Box sx={{color:'red', mr:4}}>{error}</Box>
          }
          <Button 
            color = 'inherit'
            onClick = {handleClose}
          >
            {intl.get('cancel')}
          </Button>
          <Button variant = 'contained'
            onClick = {handleConfirm}
          >
          {intl.get('confirm')}
          </Button>
        </DialogActions>

      </Dialog>
    </Box>
  )
}