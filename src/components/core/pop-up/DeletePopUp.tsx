import { useDeleteMutation } from '@/hooks/drive.hooks';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { UseMutationResult } from '@tanstack/react-query';
import React from 'react';
import ButtonCancel from '../button/ButtonCancel';
import ButtonSuccess from '../button/ButtonSuccess';
import PopUp from './PopUp';

type DeletePopUpProps = {
  open: boolean;
  handleClose: (data?: any) => void;
  title: string;
  source_ids: string[];
  setResult: React.Dispatch<React.SetStateAction<boolean>>;
  additionalMutaion?: UseMutationResult<any, Error, any, unknown>;
};

const DeletePopUp: React.FC<DeletePopUpProps> = ({ open, handleClose, title, source_ids, setResult, additionalMutaion }) => {
  const deleteMutation = useDeleteMutation();
  return (
    <PopUp
      open={open}
      handleClose={() => {
        handleClose(false);
      }}>
      <DialogTitle>Delete permanently?</DialogTitle>
      {title ? (
        <DialogContent>"{title}" will be deleted permanently and cannot be recovered.</DialogContent>
      ) : (
        <DialogContent>{source_ids.length} items will be deleted permanently and cannot be recovered.</DialogContent>
      )}
      <DialogActions>
        <ButtonCancel
          onClick={() => {
            handleClose(false);
          }}>
          {' '}
          Cancel{' '}
        </ButtonCancel>
        <ButtonSuccess
          isInvisible={deleteMutation.isPending}
          onClick={() => {
            handleClose(true);
            setResult(true);
            additionalMutaion ? additionalMutaion.mutate({ source_ids }) : deleteMutation.mutate({ source_ids });
          }}
          type={'button'}>
          Delete
        </ButtonSuccess>
      </DialogActions>
    </PopUp>
  );
};

export default DeletePopUp;
