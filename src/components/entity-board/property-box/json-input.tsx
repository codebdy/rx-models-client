import { TextField } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { useAppStore } from "store/app-store";

export function JsonInput(
  props:{
    label: string,
    value: any,
    onChange: (value:any)=>void,
  }
) {
  const {label, value, onChange} = props;
  const [valueString, setValueString] = useState(JSON.stringify(value||{}, null, 2));
  const [oldValue, setOldValue] = useState<any>();
  const appStore = useAppStore();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let newValue = (event.target.value as string).trim();
    setValueString(newValue);
  }; 

  useEffect(()=>{
    setValueString(JSON.stringify(value, null, 2));
  }, [value])

  const handleFinishEdit = ()=>{
    try{
      if(oldValue !== valueString){
        onChange(JSON.parse(valueString)); 
        setOldValue(valueString);       
      }      
    }
    catch(error){
      appStore.infoError(error.message);
    }
  }

  return (
    <TextField 
      size = "small" 
      multiline 
      rows = "12"  
      fullWidth 
      variant = "outlined"
      label = {label}
      value = {valueString}
      onChange = {handleChange}
      onBlur = {handleFinishEdit}
    />
  )
}