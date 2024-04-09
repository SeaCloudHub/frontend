import { Dialog } from '@mui/material';
import React from 'react';

type PopUpProps = {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
};

const PopUp: React.FC<PopUpProps> = ({ open, handleClose, children }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      {children}
    </Dialog>
  );
};

export default PopUp;
