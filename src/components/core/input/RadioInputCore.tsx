import './RadioInputCore.css';

import { Radio } from 'antd';

type RadioInputCoreProps = {
  label?: string;
  className?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: () => void;
};

const RadioInputCore = ({ label, className, disabled, checked, onChange }: RadioInputCoreProps) => {
  return (
    <Radio value={label} checked={checked} disabled={disabled} onChange={onChange} className={`customRadio ${className}`}>
      {label}
    </Radio>
  );
};

export default RadioInputCore;
