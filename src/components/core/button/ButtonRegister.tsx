import { Button } from 'antd';
import React from 'react';

type ButtonRegisterProps = {
  title: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

const ButtonRegister = ({ title, icon, onClick }: ButtonRegisterProps) => {
  return (
    <Button type='text' onClick={onClick} className='registration-btn' style={{ letterSpacing: '4px' }}>
      {icon}
      {title}
    </Button>
  );
};

export default ButtonRegister;
