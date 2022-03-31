import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  SvgIcon,
  TextField,
  Theme,
  useTheme,
} from "@mui/material";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { useEffect } from "react";
import { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import intl from 'react-intl-universal';
import { Close } from "@mui/icons-material";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogContent: {
      height: 'calc(100vh - 140px)',
      overflow: 'hidden',
      '& .monaco-editor':{
        height: '100%',
      },
    },
    dialogTitle:{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative'
    },
    closeButton:{
      position: 'absolute',
      right: 8,
      top: 8,
    },
    dialogActions:{
      p:2,
      pr:3,
    }
  }),
);

export function ScriptInput(
  props:{
    label: string,
    value: string,
    onChange: (value:any)=>void,
    title: string,
  }
) {
  const {label, value, onChange, title} = props;
  const [open, setOpen] = useState(false);
  const [valueString, setValueString] = useState(value);
  const [oldValue, setOldValue] = useState<string>();
  const [error, setError] = useState('');
  const classes = useStyles();
  const theme = useTheme();

  const handleChange = (valueStr: string)=>{
    setValueString(valueStr);
    setError('');
  }

  useEffect(()=>{
    setValueString(value);
    setOldValue(value);
  }, [value])

  const handleEditorDidMount = (monaco: any)=>{
    monaco.languages?.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
    });
  }

  const handleClose = ()=>{
    setOpen(false);
    setValueString(value);
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
      onChange(valueString);
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
        rows = "6"  
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
        size="large">
        <SvgIcon fontSize = "small">
          <path fill="currentColor" d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" />
        </SvgIcon>
      </IconButton>
      <Dialog 
        open ={open}
        fullWidth
        maxWidth = 'sm'
        onClose = {handleClose}
      >
        <DialogTitle className = {classes.dialogTitle}>
          <span>{title}</span>
          <IconButton className = {classes.closeButton} onClick = {handleClose} size="large"><Close /></IconButton>
        </DialogTitle>
        <DialogContent
          className = {classes.dialogContent}
        >
          <MonacoEditor
            language="javascript"
            theme={ theme.palette.mode === 'light' ? 'vs' : 'vs-dark'}
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
  );
}