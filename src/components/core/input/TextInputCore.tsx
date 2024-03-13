import { FilledInputProps, InputLabel, InputProps, OutlinedInputProps, SxProps, TextField, Theme } from '@mui/material';
import React from 'react';

export type TextInputCoreProps = {
  labelDirection?: 'horizontal' | 'vertical';
  label?: React.ReactNode;
  name?: string;
  sx?: SxProps<Theme>;
  inputProps?: Partial<FilledInputProps> | Partial<OutlinedInputProps> | Partial<InputProps>;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (data?: any) => void;
};

const TextInputCore = ({
  label,
  name,
  placeholder,
  defaultValue,
  disabled,
  sx,
  inputProps,
  labelDirection,
}: TextInputCoreProps) => {
  const onChange = (event: any) => {
    console.log(event?.target.value);
  };
  return (
    <div className={`${labelDirection === 'vertical' ? 'flex flex-col justify-start' : 'flex items-center space-x-1'}`}>
      {label && <InputLabel sx={{ fontWeight: 'bold' }}>{label}</InputLabel>}
      <TextField
        InputProps={inputProps}
        sx={sx}
        name={name}
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInputCore;
