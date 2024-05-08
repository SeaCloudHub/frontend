import { Dialog } from '@mui/material';
import React from 'react';

type PopUpProps = {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
};

const PopUp: React.FC<PopUpProps> = ({ open, handleClose, children }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onDoubleClick={(e) => e.stopPropagation()}
      sx={{
        fontSize: '16px',
        '.dark &': {
          backgroundColor: 'transparent',
          brightness: '2',
          '.MuiPaper-root': {
            backgroundColor: '#031525',
            color: 'white',
          },
        },
      }}>
      {children}
    </Dialog>
  );
};

export default PopUp;
