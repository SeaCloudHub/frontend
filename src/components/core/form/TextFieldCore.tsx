import { FormLabel, TextField } from '@mui/material';
import React from 'react';

type TextFieldCoreProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  className?: string;
  value?: string | unknown;
  disabled?: boolean | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean | undefined;
  helperText?: string | undefined | false;
};

const TextFieldCore = ({
  label,
  name,
  className,
  error,
  helperText,
  onBlur,
  onChange,
  placeholder,
  disabled,
  type,
  value,
}: TextFieldCoreProps) => {
  return (
    <div className='w-full px-1'>
      <FormLabel
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#000',
        }}>
        {label}
      </FormLabel>
      <TextField
        name={name}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        margin='dense'
        InputProps={{
          className: 'border rounded-md hover:border-blue-300 focus:transition-all',
        }}
        className={className}
        fullWidth
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        helperText={helperText}
        autoComplete='off'
      />
    </div>
  );
};

export default TextFieldCore;
