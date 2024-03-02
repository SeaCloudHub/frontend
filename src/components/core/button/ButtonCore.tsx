import { Button } from '@mui/material';
import React from 'react';
import { ClipLoader } from 'react-spinners';

type ButtonCoreProps = {
  title: string;
  type: 'contained' | 'outlined' | 'text';
  contentColor?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  [others: string]: any;
};

const ButtonCore: React.FC<ButtonCoreProps> = ({ contentColor, title, type, disabled, icon, loading, ...others }) => {
  return (
    <Button
      sx={{ textTransform: 'none', color: contentColor }}
      startIcon={!loading && icon}
      {...others}
      variant={type}
      disabled={disabled}>
      {!loading && <>{title}</>}
      {loading && <ClipLoader color='#ffffff' size={20} />}
    </Button>
  );
};

export default ButtonCore;
