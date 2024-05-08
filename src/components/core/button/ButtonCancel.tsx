import { Button } from '@mui/material';
import React from 'react';

type ButtonCancelProps = {
  onClick: () => void;
  children: React.ReactNode;
};

const ButtonCancel: React.FC<ButtonCancelProps> = ({ children, onClick }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        textTransform: 'none',
        '.dark &': {
          fontSize: '16px',
          color: '#1E40AF',
          '&:hover': {
            color: '#1E3A8A',
          },
        },
      }}>
      {children}
    </Button>
  );
};

export default ButtonCancel;
