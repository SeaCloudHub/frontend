import { TextField } from '@mui/material';
import React from 'react';
import { Error } from '@mui/icons-material';

type TextFieldCoreProps = {
  label?: string;
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
    <TextField
      autoComplete='off'
      name={name}
      disabled={disabled}
      type={type}
      variant='outlined'
      label={label}
      className={`bg-white ${className}`}
      fullWidth
      value={value}
      onChange={onChange}
      onBlur={onBlur || undefined}
      error={error}
      helperText={
        helperText && (
          <span className='flex -translate-x-3 items-center gap-1'>
            {error && <Error
              sx={{
                width: '15px',
                height: '15px',
                color: 'red',
                '.dark &': {
                  color: '#F87171',
                },
              }}
            />}
            <span>{helperText}</span>
          </span>
        )
      }
      sx={{
        '.dark &': {
          backgroundColor: '#031525',
          color: 'white',
          '& .MuiInputLabel-root': {
            color: 'white',
          },
          '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: '#64748B',
          },
          '& .MuiFormHelperText-root': {
            color: '#64748B',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.25)',
          },
          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
          },
          '& .MuiOutlinedInput-root.Mui-focused fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
          },
          '& .MuiFormLabel-root': {
            color: 'white',
          },
          '& .MuiInputBase-input': {
            color: 'white',
          },
          '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: '#F87171',
          },
          '& .MuiFormHelperText-root.Mui-error': {
            color: '#F87171',
          },
        },
      }}
    />
  );
};

export default TextFieldCore;
