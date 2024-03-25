import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

type SelectCoreProps = {
  currentValue: string;
  items: string[];
  handleChange: (event: SelectChangeEvent) => void;
};

const SelectCore: React.FC<SelectCoreProps> = ({ items, currentValue, handleChange }) => {
  return (
    <Select
      value={currentValue}
      onChange={handleChange}
      displayEmpty
      size='small'
      variant='outlined'
      sx={{
        boxShadow: 'none',
        '.MuiOutlinedInput-notchedOutline': { border: 0 },
      }}>
      <MenuItem value=''>
        <em>None</em>
      </MenuItem>
      {items.map((item, index) => (
        <MenuItem key={index} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectCore;
