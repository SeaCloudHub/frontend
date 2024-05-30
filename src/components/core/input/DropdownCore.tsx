import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { DropdownItems } from '../../../utils/types/drop-down.type';
import { useTheme } from '@/providers/theme-provider';

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
  const [inputValue, setInputValue] = useState(isDefault ? options[0].value : '');
  const { theme } = useTheme();
  const onChangeConverter = (event: SelectChangeEvent) => {
    onChange && onChange(event.target.value);
    setInputValue(event.target.value);
  };

  return (
    <div
      className={`${className}  w-auto ${
        label && ` space flex items-center whitespace-nowrap text-base font-semibold leading-[25.6px] dark:text-white`
      }`}>
      <p className='mr-2 '> {label}</p>
      <Select
        sx={{
          paddingTop: 0,
          height: height ?? '40px',
          minWidth: minWidth ?? '120px',
          '.dark &': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'gray',
            },
            '& .MuiSelect-icon, & .MuiSelect-select.MuiSelect-select': {
              color: 'white',
            },
            '&:hover': {
              backgroundColor: 'rgb(23 37 84)',
            },
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: theme === 'dark' ? '#1E293B' : 'white',
            },
          },
        }}
        disabled={disabled}
        onChange={onChangeConverter}
        value={inputValue}
        placeholder={placeholder}
        IconComponent={KeyboardArrowDownIcon}>
        {options.map((option) => (
          <MenuItem
            key={option.value}
            sx={{
              py: '3px',
              '.dark &': {
                color: 'white',
                backgroundColor: option.value === inputValue ? 'rgb(23 37 84)' : '',
                '&:hover': {
                  backgroundColor: '#334155',
                },
              },
            }}
            value={option.value}>
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
