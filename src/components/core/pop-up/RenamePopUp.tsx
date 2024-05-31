import React from 'react';
import PopUp from './PopUp';
import { Button, DialogActions, DialogContent, DialogTitle, Input } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useFormik } from 'formik';
import { useRenameMutation } from '@/hooks/drive.hooks';
import * as Yup from 'yup';
import TextFieldCore from '../form/TextFieldCore';
import ButtonSuccess from '../button/ButtonSuccess';
import ButtonCancel from '../button/ButtonCancel';
import { useEntries } from '@/store/my-drive/myDrive.store';
import { UseMutationResult } from '@tanstack/react-query';

type RenamePopUpProps = {
  open: boolean;
  name: string;
  id: string;
  handleClose: () => void;
  additionalMutaion?: UseMutationResult<any, Error, any, unknown>;
};

const RenamePopUp: React.FC<RenamePopUpProps> = ({ open, handleClose, name, id, additionalMutaion }) => {
  const renameMutation = useRenameMutation();

  const formik = useFormik({
    initialValues: {
      name: name,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
    }),
    onSubmit: (values) => {
      additionalMutaion ? additionalMutaion.mutate({ id, name: values.name }) : renameMutation.mutate({ id, name: values.name });
      handleClose();
    },
  });

  return (
    <PopUp open={open} handleClose={handleClose}>
      <form className='min-w-[400px]' onSubmit={formik.handleSubmit}>
        <DialogTitle className='flex justify-between'>
          <span>Rename</span>
          <Icon icon='ic:round-close' onClick={handleClose} style={{ cursor: 'pointer' }} />
        </DialogTitle>
        <DialogContent>
          <TextFieldCore
            name='name'
            isFocused={true}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.name && formik.errors.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
          />
        </DialogContent>
        <DialogActions>
          <ButtonCancel onClick={handleClose}>Cancel</ButtonCancel>
          <ButtonSuccess type='submit' isInvisible={!formik.isValid}>
            {' '}
            Save{' '}
          </ButtonSuccess>
        </DialogActions>
      </form>
    </PopUp>
  );
};

export default RenamePopUp;
