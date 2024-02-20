import { Button } from '@mui/material';
import React from 'react';
import { ClipLoader } from 'react-spinners';

type ButtonCoreProps = {
  text: string;
  type: 'contained' | 'outlined' | 'text';
  color?: 'error' | 'info' | 'inherit' | 'primary' | 'secondary' | 'success' | 'warning';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  [others: string]: any;
};

const ButtonCore: React.FC<ButtonCoreProps> = ({ text, type, disabled, icon, loading, ...others }) => {
  return (
    <Button startIcon={!loading && icon} {...others} variant={type} disabled={disabled}>
      {!loading && <>{text}</>}
      {loading && <ClipLoader color='#ffffff' size={20} />}
    </Button>
  );
};

export default ButtonCore;
