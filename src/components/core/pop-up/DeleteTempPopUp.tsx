import React from 'react';
import PopUp from './PopUp';
import { Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useMoveToTrashMutation } from '@/hooks/drive.hooks';

type DeleteTempPopUpProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
  id: string;
  source_ids: string[];
};

const DeleteTempPopUp: React.FC<DeleteTempPopUpProps> = ({ open, handleClose, title, id, source_ids }) => {
  const deleteTemp = useMoveToTrashMutation();

  return (
    <PopUp open={open} handleClose={handleClose}>
      <DialogTitle>Move to trash?</DialogTitle>
      <DialogContent>"{title}" will be deleted permanently after 30 days.</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            deleteTemp.mutate({ id, source_ids });
            handleClose();
          }}
          sx={{
            backgroundColor: '#063799',
            color: 'white',
            '&:hover': {
              backgroundColor: '#063768',
            },
          }}>
          Move to trash
        </Button>
      </DialogActions>
    </PopUp>
  );
};

export default DeleteTempPopUp;
