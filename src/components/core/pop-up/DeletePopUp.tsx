import React from 'react';
import PopUp from './PopUp';
import { Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useDeleteMutation } from '@/hooks/drive.hooks';

type DeletePopUpProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
  source_ids: string[];
};

const DeletePopUp: React.FC<DeletePopUpProps> = ({ open, handleClose, title, source_ids }) => {
  const deleteMutation = useDeleteMutation();

  return (
    <PopUp open={open} handleClose={handleClose}>
      <DialogTitle>Delete permanently?</DialogTitle>
      <DialogContent>"{title}" will be deleted permanently and cannot be recovered.</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => deleteMutation.mutate({ source_ids })}
          sx={{
            backgroundColor: '#063799',
            color: 'white',
            '&:hover': {
              backgroundColor: '#063768',
            },
          }}>
          Delete
        </Button>
      </DialogActions>
    </PopUp>
  );
};

export default DeletePopUp;
