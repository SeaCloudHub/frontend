'use client';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { DropdownItems } from '../../../utils/types/drop-down.type';

type DropdownCoreProps = {
  label?: string;
  style?: string;
  disabled?: boolean;
  options: DropdownItems;
  className?: string;
  isDefault?: boolean;
  onChange?: (value?: string) => void;
  placeholder?: string;
  height?: string;
};

const DropdownCore = ({ label, disabled, options, onChange, placeholder, isDefault, className }: DropdownCoreProps) => {
  const [inputValue, setInputValue] = useState(isDefault ? options[0].value : undefined);
  const onChangeConverter = (event: SelectChangeEvent) => {
    onChange && onChange(event.target.value);
    setInputValue(event.target.value);
  };
  return (
    <div
      className={`${className}  w-auto ${
        label && ` flex items-center gap-3 whitespace-nowrap text-base font-semibold leading-[25.6px] !text-[#535353]`
      }`}>
      {label}
      <Select disabled={disabled} onChange={onChangeConverter} value={inputValue} placeholder={placeholder}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default DropdownCore;
