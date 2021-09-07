import { Box, Button, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, TextField, Theme, useTheme } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
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
        <Edit fontSize = "small" />
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