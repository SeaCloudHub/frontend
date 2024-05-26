import React from 'react';
import PopUp from './PopUp';
import { Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useMoveToTrashMutation } from '@/hooks/drive.hooks';
import ButtonSuccess from '../button/ButtonSuccess';
import ButtonCancel from '../button/ButtonCancel';
import { useEntries } from '@/store/my-drive/myDrive.store';

type DeleteTempPopUpProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
  id: string;
  source_ids: string[];
  setResult: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteTempPopUp: React.FC<DeleteTempPopUpProps> = ({ open, handleClose, title, id, source_ids, setResult }) => {
  const { listEntries, setListEntries } = useEntries();

  const deleteTemp = useMoveToTrashMutation();

  return (
    <PopUp open={open} handleClose={handleClose}>
      <DialogTitle>Move to trash?</DialogTitle>
      <DialogContent>"{title}" will be deleted permanently after 30 days.</DialogContent>
      <DialogActions>
        <ButtonCancel onClick={handleClose}> Cancel </ButtonCancel>
        <ButtonSuccess
          type='button'
          isInvisible={deleteTemp.isPending}
          onClick={() => {
            deleteTemp.mutate({ id, source_ids });
            setResult(true);
            handleClose();
          }}>
          Move to trash
        </ButtonSuccess>
      </DialogActions>
    </PopUp>
  );
};

export default DeleteTempPopUp;
