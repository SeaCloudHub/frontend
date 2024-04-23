import React from 'react';
import PopUp from './PopUp';
import { Button, DialogActions, DialogContent, DialogTitle, Input } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useFormik } from 'formik';
import { useRenameMutation } from '@/hooks/drive.hooks';
import * as Yup from 'yup';
import TextFieldCore from '../form/TextFieldCore';

type RenamePopUpProps = {
  open: boolean;
  name: string;
  id: string;
  handleClose: () => void;
  onChanged?: () => void;
};

const RenamePopUp: React.FC<RenamePopUpProps> = ({
  open, handleClose, name, onChanged, id
}) => {
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
      onChanged && onChanged();
      handleClose();
    },
    onReset: () => {
      formik.resetForm();
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
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.name && formik.errors.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' sx={{
            backgroundColor: '#063799',
            color: 'white',
            '&:hover': {
              backgroundColor: '#063768',
            }
          }}>Save</Button>
        </DialogActions>
      </form>
    </PopUp>
  );
};

export default RenamePopUp;