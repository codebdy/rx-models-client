import React, { useCallback } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

export default function LazyTextField(props: TextFieldProps) {
  const { label, value, onChange, disabled, multiline, size = "small", ...rest } = props;
  const [inputValue, setInputValue] = useState<any>();
  const [oldValue, setOldValue] = useState<any>();

  useEffect(() => {
    setInputValue(value);
    setOldValue(value);
  }, [value]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      let newValue = event.target.value as string;
      newValue = multiline ? newValue :newValue.trim()
      setInputValue(newValue);
    },
    [multiline]
  );

  const handleFinishEdit = useCallback(() => {
    if (oldValue !== inputValue) {
      onChange && onChange({ target: { value: inputValue }} as any);
      setOldValue(inputValue);
    }
  }, [inputValue, oldValue, onChange]);

  const handleKeyEnter = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === "Enter") {
        handleFinishEdit();
      }
    },
    [handleFinishEdit]
  );

  return (
    <TextField
      label={label}
      value={inputValue || ""}
      onChange={handleChange}
      onBlur={handleFinishEdit}
      size={size as any}
      fullWidth
      disabled={disabled}
      variant="outlined"
      multiline = {multiline}
      onKeyUp={handleKeyEnter}
      {...rest}
    />
  );
}
