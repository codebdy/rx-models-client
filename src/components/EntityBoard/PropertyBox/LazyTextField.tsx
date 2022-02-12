import React, { useCallback } from "react";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

export interface PropsInputProps {
  autoFocus?: boolean;
  label?: string;
  value: any;
  onChange: (value: string) => void;
  size?: string;
  disabled?: boolean;
}

export default function LazyTextField(props: PropsInputProps) {
  const { label, value, onChange, disabled, size = "small", ...rest } = props;
  const [inputValue, setInputValue] = useState<any>();
  const [oldValue, setOldValue] = useState<any>();

  useEffect(() => {
    setInputValue(value);
    setOldValue(value);
  }, [value]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      let newValue = (event.target.value as string).trim();
      setInputValue(newValue);
    },
    []
  );

  const handleFinishEdit = useCallback(() => {
    if (oldValue !== inputValue) {
      onChange(inputValue);
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
      onKeyUp={handleKeyEnter}
      {...rest}
    />
  );
}
