import { Listbox } from '@headlessui/react';
import { MenuItem, Select, SelectChangeEvent, menuItemClasses } from '@mui/material';
import React from 'react';
import { classNames } from './Dropdown';
import { ClassNames } from '@emotion/react';

type CustomSelectProps = {
  value: unknown;
  onChange: (event: SelectChangeEvent<unknown>, child: React.ReactNode) => void;
  children: React.ReactNode;
  //sx maybe class or style
  sx?: any;
  variant?: 'standard' | 'outlined' | 'filled';
};

const CustomSelect: React.FC<CustomSelectProps> = ({ onChange, value, children, sx }) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      inputProps={{
        MenuProps: {
          MenuListProps: {
            sx: {
              '.dark &': {
                backgroundColor: '#1E293B',
                color: 'white',
              },
            },
          },
        },
      }}
      sx={{
        ...sx,
        '.dark &': {
          backgroundColor: '#031525',
          color: 'white',
          '& .MuiSelect-icon': {
            color: 'white',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.25)',
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
          },
        },
      }}>
      {children}
    </Select>
  );
};

export default CustomSelect;
