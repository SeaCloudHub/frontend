import { Button } from '@mui/material';
import React from 'react';

type ButtonSuccessProps = {
  onClick?: () => void;
  type: 'submit' | 'button' | 'reset';
  children: React.ReactNode;
  variant?: 'contained' | 'outlined' | 'text';
  isInvisible?: boolean;
};

const ButtonSuccess: React.FC<ButtonSuccessProps> = ({ children, type, onClick, variant, isInvisible }) => {
  return (
    <Button
      type='submit'
      variant={variant}
      onClick={onClick}
      sx={{
        fontSize: '16px',
        textTransform: 'none',
        backgroundColor: '#3B82F6',
        color: 'white',
        '&:hover': {
          backgroundColor: '#2563EB',
        },
        '.dark &': {
          backgroundColor: '#1E3A8A',
          color: 'white',
          '&:hover': {
            backgroundColor: '#1E40AF',
          },
        },
        // visibility: isInvisible ? 'hidden' : 'visible',
        // none click effect
        ...(isInvisible ? { pointerEvents: 'none', opacity: 0.5 } : {}),
      }}>
      {children}
    </Button>
  );
};

export default ButtonSuccess;
