import { Error } from '@mui/icons-material';
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
  type?: string;
  fullWidth?: boolean;
  value?: string;
  onChange?: (data?: string) => void;
  error?: boolean | undefined;
  helperText?: React.ReactNode;
  className?: string;
};

const TextInputCore = ({
  label,
  name,
  placeholder,
  defaultValue,
  disabled,
  sx,
  className,
  type,
  inputProps,
  fullWidth,
  labelDirection,
  error,
  helperText,
  value,
  onChange,
}: TextInputCoreProps) => {
  const [inputValue, setInputValue] = React.useState(value || '');

  const onConvertvalue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange && onChange(newValue);
  };

  return (
    <div
      className={`${labelDirection === 'vertical' ? 'flex flex-col justify-start' : 'flex items-center space-x-1'} ${className} ${fullWidth ? 'w-full' : ''}  `}>
      {label && <InputLabel sx={{ fontWeight: 'bold', '.dark &': { color: 'white' } }}>{label}</InputLabel>}
      <TextField
        fullWidth={fullWidth}
        InputProps={{ ...inputProps }}
        sx={{
          ...sx,
          '& .MuiInputBase-root': {
            height: '45px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          },
          '& .MuiInputLabel-root': {
            transform: 'translateY(-50%)',
          },
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
        name={name}
        value={inputValue}
        type={type}
        disabled={disabled}
        error={error}
        helperText={
          helperText && (
            <span className='flex -translate-x-3 items-center gap-1'>
              {error && <Error color='error' sx={{ width: '15px', height: '10px' }} />}
              <span>{helperText}</span>
            </span>
          )
        }
        defaultValue={defaultValue}
        onChange={onConvertvalue}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInputCore;
