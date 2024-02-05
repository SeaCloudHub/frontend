import { Nil } from '@/utils/types/utility.type';
import './TextInputCore.css';

import { stringOrUndefined } from '@/utils/parser/io.parser';
import { Input } from 'antd';
import React, { HTMLInputTypeAttribute } from 'react';

export type TextInputCoreProps = {
  label?: React.ReactNode;
  type?: HTMLInputTypeAttribute;
  name?: any;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
  onChange?: (data?: any) => void;
  value?: Nil<string>;
};

const TextInputCore = ({
  label,
  type,
  name,
  placeholder,
  defaultValue,
  className,
  disabled,
  onChange,
  value,
}: TextInputCoreProps) => {
  return (
    <div className='flex items-center'>
      {label}
      <Input
        type={type}
        name={name}
        value={stringOrUndefined(value)}
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={onChange}
        className={`customTextInput rounded-lg border border-[#E2E2E2] leading-[25.6px] text-[#1E1E1E] ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInputCore;
