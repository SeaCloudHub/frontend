import React from 'react';
import PopUp from './PopUp';
import { Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useDeleteMutation } from '@/hooks/drive.hooks';
import ButtonSuccess from '../button/ButtonSuccess';
import ButtonCancel from '../button/ButtonCancel';
import { useEntries } from '@/store/my-drive/myDrive.store';

type DeletePopUpProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
  source_ids: string[];
  setResult: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeletePopUp: React.FC<DeletePopUpProps> = ({ open, handleClose, title, source_ids, setResult }) => {
  const deleteMutation = useDeleteMutation();
  return (
    <PopUp open={open} handleClose={handleClose}>
      <DialogTitle>Delete permanently?</DialogTitle>
      {title ? (
        <DialogContent>"{title}" will be deleted permanently and cannot be recovered.</DialogContent>
      ) : (
        <DialogContent>{source_ids.length} items will be deleted permanently and cannot be recovered.</DialogContent>
      )}
      <DialogActions>
        <ButtonCancel onClick={handleClose}> Cancel </ButtonCancel>
        <ButtonSuccess
          isInvisible={deleteMutation.isPending}
          onClick={() => {
            handleClose();
            setResult(true);
            deleteMutation.mutate({ source_ids });
          }}
          type={'button'}>
          Delete
        </ButtonSuccess>
      </DialogActions>
    </PopUp>
  );
};

export default DeletePopUp;
