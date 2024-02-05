import { Checkbox } from 'antd';
import './CheckboxCore.css';

type CheckboxCoreProps = {
  label?: string;
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (data?: any) => void;
  onToggle?: (checked: boolean) => void;
  [others: string]: any;
};

const CheckboxCore = ({ defaultChecked, label, checked, className, onToggle, onChange, ...others }: CheckboxCoreProps) => {
  return (
    <div>
      <Checkbox
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={(e) => {
          if (onChange) onChange(e);
          if (onToggle) onToggle(e.target.checked);
        }}
        className={`customCheckbox ${className}`}
        {...others}>
        {label}
      </Checkbox>
    </div>
  );
};

export default CheckboxCore;
