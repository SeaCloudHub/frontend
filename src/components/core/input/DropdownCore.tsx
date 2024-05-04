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
  minWidth?: string;
  mix?: boolean;
};

const DropdownCore = ({
  label,
  disabled,
  options,
  onChange,
  placeholder,
  isDefault,
  className,
  height,
  minWidth,
  mix,
}: DropdownCoreProps) => {
  const [inputValue, setInputValue] = useState(isDefault ? options[0].value : undefined);
  const onChangeConverter = (event: SelectChangeEvent) => {
    onChange && onChange(event.target.value);
    setInputValue(event.target.value);
  };
  return (
    <div
      className={`${className}  w-auto ${
        label && ` flex items-center whitespace-nowrap text-base font-semibold space leading-[25.6px]`
      }`}>
     <p className='text-black mr-2'> {label}</p>
      <Select
        sx={{
          height: height ?? '35px',
          minWidth: minWidth ?? '120px',
        }}
        disabled={disabled}
        onChange={onChangeConverter}
        value={inputValue}
        placeholder={placeholder}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.preIcon && (
              <div className='flex items-center space-x-3'>
                {option.preIcon}
                <p className='truncate'>{option.label}</p>
              </div>
            )}
            {!option.preIcon && (
              <div className='flex items-center space-x-3'>
                {mix && <p className='w-[26px]'></p>}
                {option.label}
              </div>
            )}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default DropdownCore;
