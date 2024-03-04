'use client';
import { ICONS } from '@/utils/theme';
import { DropdownItems } from '@/utils/types/dropdown.type';
import { Select } from 'antd';
import './DropdownCore.css';

type DropdownCoreProps = {
  label?: any;
  style?: string;
  disabled?: boolean;
  options: DropdownItems;
  isDefault?: boolean;
  onChange?: (e: any) => void;
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
  value,
}: DropdownCoreProps) => {
  return (
    <div
      className={`w-auto ${
        label && `flex items-center gap-3 whitespace-nowrap text-base font-normal leading-[25.6px] !text-[#535353]`
      }`}>
      {label}
      <Select
        suffixIcon={<ICONS.DOWN />}
        onChange={onChange}
        className={`customDropdown ${height ? height : 'h-[40px]'} ${style}`}
        options={options}
        disabled={disabled}
        value={value}
        dropdownStyle={{ borderRadius: 8, margin: 0, padding: 0 }}
        defaultValue={isDefault && options.length > 0 && options[0].value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default DropdownCore;
