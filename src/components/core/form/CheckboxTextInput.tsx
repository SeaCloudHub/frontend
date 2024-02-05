import { Checkbox } from 'antd';
import { useState } from 'react';
import TextInputCore, { TextInputCoreProps } from '../input/TextInputCore';

type CheckboxTextInputProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  label?: string;
  type?: string;
  onInputChange?: (checked: boolean, input: string) => void | undefined;
  onCheckboxChange?: (data?: any) => void;
  onToggle?: (checked: boolean) => void;
} & TextInputCoreProps;

const CheckboxTextInput = ({
  type = 'text',
  defaultChecked = false,
  label,
  checked,
  onInputChange,
  onCheckboxChange,
  onToggle,
  ...props
}: CheckboxTextInputProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [textInput, setTextInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || '';
    setTextInput(value);
    onInputChange && onInputChange(isChecked, value);
  };

  const handleCheck = (e: any) => {
    setIsChecked(e.target.checked);
    onInputChange && onInputChange(!isChecked, textInput);
    if (onCheckboxChange) onCheckboxChange(e);
    if (onToggle) onToggle(e.target.checked);
  };

  return (
    <div className={`flex items-center gap-4 mr-[30px]`}>
      <Checkbox
        checked={checked ? checked : isChecked}
        defaultChecked={defaultChecked}
        onChange={(e) => {
          handleCheck(e);
        }}
        className={`customCheckbox font-bold`}>
        {label}
      </Checkbox>
      <TextInputCore
        {...props}
        className='xl:w-[300px] 2xl:w-[368px] font-bold h-[40px]'
        disabled={checked ? !checked : !isChecked}
        onChange={handleInputChange}
        type={type}
      />
    </div>
  );
};

export default CheckboxTextInput;
