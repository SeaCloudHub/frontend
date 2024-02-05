import { Button } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { ClipLoader } from 'react-spinners';
import './ButtonCore.css';

type ButtonCoreProps = {
  text: string;
  className?: string;
  type?: 'primary-contained' | 'primary-outlined' | 'secondary-contained' | 'secondary-outlined';
  icon?: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  [others: string]: any;
};

const ButtonCore = ({ text, className, type: buttonType, icon, disabled, loading, ...others }: ButtonCoreProps) => {
  return (
    <Button
      {...others}
      disabled={disabled || loading}
      type='text'
      className={classNames('flex items-center h-full justify-center font-bold hover:shadow-md', className, {
        [buttonType || '']: !disabled,
        'secondary-contained': disabled,
      })}>
      {loading && <ClipLoader color='#ffffff' size={20} />}
      {!loading && (
        <>
          {icon}
          {text}
        </>
      )}
    </Button>
  );
};

export default ButtonCore;
