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

type RenamePopUpProps = {
  open: boolean;
  name: string;
  id: string;
  handleClose: () => void;
};

const RenamePopUp: React.FC<RenamePopUpProps> = ({ open, handleClose, name, id }) => {
  const renameMutation = useRenameMutation();

  const formik = useFormik({
    initialValues: {
      name: name,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
    }),
    onSubmit: (values) => {
      renameMutation.mutate({ id, name: values.name });
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
            sx={{
              '.dark &': {
                backgroundColor: '#031525',
                color: 'white',
                '& .MuiInputLabel-root': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#64748B',
                },
                '& .MuiFormHelperText-root': {
                  color: '#64748B',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.25)',
                },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '& .MuiFormLabel-root': {
                  color: 'white',
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#F87171',
                },
                '& .MuiFormHelperText-root.Mui-error': {
                  color: '#F87171',
                },
              },
            }}
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.name && formik.errors.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
          />
        </DialogContent>
        <DialogActions>
          <ButtonCancel onClick={handleClose}>Cancel</ButtonCancel>
          <ButtonSuccess type='submit'> Save </ButtonSuccess>
        </DialogActions>
      </form>
    </PopUp>
  );
};

export default RenamePopUp;
