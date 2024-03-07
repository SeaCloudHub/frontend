import { TextField } from '@mui/material';
import React from 'react';
import { Error } from '@mui/icons-material';

type TextFieldCoreProps = {
  label: string;
  name: string;
  type?: string;
  className?: string;
  value?: string | unknown;
  disabled?: boolean | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean | undefined;
  helperText?: React.ReactNode;
};

const TextFieldCore = ({
  label,
  name,
  className,
  error,
  helperText,
  onBlur,
  onChange,
  disabled,
  type,
  value,
}: TextFieldCoreProps) => {
  return (
    // <div className='w-full px-1'>
    <TextField
      name={name}
      disabled={disabled}
      type={type}
      variant='outlined'
      label={label}
      className={className}
      fullWidth
      value={value}
      onChange={onChange}
      onBlur={onBlur || undefined}
      error={error}
      helperText={
        helperText && (
          <span className='flex -translate-x-3 items-center gap-1'>
            {error && <Error color='error' sx={{ width: '15px', height: '15px' }} />}
            <span>{helperText}</span>
          </span>
        )
      }
      autoComplete='off'
    />
    // </div>
  );
};

export default TextFieldCore;
