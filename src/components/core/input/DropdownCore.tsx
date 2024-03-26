'use client';
import { ICONS } from '../../../utils/theme';
import { DropdownItems } from '../../../utils/types/drop-down.type';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

type DropdownCoreProps = {
  label?: string;
  style?: string;
  disabled?: boolean;
  options: DropdownItems;
  isDefault?: boolean;
  onChange?: (value: string) => void;
  placeholder?: string;
  height?: string;
  value?: string;
};


const DropdownCore = ({
  label,
  style,
  disabled,
  options,
  onChange,
  placeholder,
  isDefault,
  height,
}: DropdownCoreProps) => {
      const [inputValue, setInputValue] = useState(isDefault ? options[0] .value:undefined);
      const onChangeConverter = (event: SelectChangeEvent) => {
        onChange&&onChange(event.target.value);
        setInputValue(event.target.value);
      };
  return (
    <div
      className={`w-auto ${
        label && `flex items-center gap-3 whitespace-nowrap text-base font-normal leading-[25.6px] !text-[#535353]`
      }`}>
      {label}
      <Select
        onChange={onChangeConverter}
        className={`customDropdown ${height ? height : 'h-[40px]'} ${style}`}
        // options={options}
        disabled={disabled}
        value={inputValue}
        // dropdownStyle={{ borderRadius: 8, margin: 0, padding: 0 }}
        placeholder={placeholder}
      >
        {options.map((option)=>(<MenuItem key={option.value} value={option.value} >
          {option.label}
        </MenuItem>))}
      </Select>
    </div>
  );
};

export default DropdownCore;
