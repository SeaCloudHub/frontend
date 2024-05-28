import { TextField } from '@mui/material';
import React from 'react';
import { Error } from '@mui/icons-material';
import { useTheme } from '@/providers/theme-provider';

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
  sx?: any;
  isFocused?: boolean;
  theme?: 'light' | 'dark';
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
  sx,
  theme: themeProp,
  isFocused,
}: TextFieldCoreProps) => {
  const { theme } = useTheme();
  return (
    <TextField
      autoComplete='off'
      autoFocus={isFocused}
      name={name}
      disabled={disabled}
      type={type}
      variant='outlined'
      label={label}
      className={`bg-white ${themeProp === 'light' ? '' : theme === 'dark' ? 'input-dark' : ''} ${className}`}
      fullWidth
      value={value}
      onChange={onChange}
      onBlur={onBlur || undefined}
      error={error}
      helperText={
        helperText && (
          <span className='flex -translate-x-3 items-center gap-1'>
            {error && (
              <Error
                sx={{
                  width: '15px',
                  height: '15px',
                  color: 'red',
                  '.dark &': {
                    color: '#F87171',
                  },
                }}
              />
            )}
            <span>{helperText}</span>
          </span>
        )
      }
      sx={sx}
    />
  );
};

export default TextFieldCore;
