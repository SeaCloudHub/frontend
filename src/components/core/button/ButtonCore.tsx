import { Button, Tooltip } from '@mui/material';
import React from 'react';
import { ClipLoader } from 'react-spinners';

type ButtonCoreProps = {
  title?: string;
  type: 'contained' | 'outlined' | 'text';
  contentColor?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  tooltip?: string;
  clickType?: 'submit' | 'button' | 'reset';
  [others: string]: any;
};

const ButtonCore: React.FC<ButtonCoreProps> = ({
  contentColor,
  clickType,
  title,
  type,
  disabled,
  icon,
  loading,
  tooltip,
  ...others
}) => {
  return (
    <Tooltip title={tooltip}>
      <Button
        type={clickType}
        sx={{
          paddingY: '3px',
          paddingX: '10px',
          textTransform: 'none',
          color: contentColor,
          minHeight: 'auto',
          minWidth: 'auto',
          fontSize: '0.875rem',
        }}
        startIcon={!loading && icon}
        {...others}
        variant={type}
        disabled={disabled}>
        {!loading && <>{title}</>}
        {loading && <ClipLoader color='#ffffff' size={20} />}
      </Button>
    </Tooltip>
  );
};

export default ButtonCore;
