import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import PopUp from './PopUp';
import TextFieldCore from '../form/TextFieldCore';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ButtonCancel from '../button/ButtonCancel';
import ButtonSuccess from '../button/ButtonSuccess';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useUpDateAvatarMutation, useUpdateNameProfileMutation } from '@/hooks/auth.hooks';

type RenameProfilePopUpProps = {
  open: boolean;
  handleClose: () => void;
  values: { first_name: string; last_name: string };
  avatar_url: string;
};

const RenameProfilePopUp: React.FC<RenameProfilePopUpProps> = ({ open, handleClose, values, avatar_url }) => {
  const updateNameProfile = useUpdateNameProfileMutation();

  const formik = useFormik({
    initialValues: values,
    validationSchema: Yup.object({
      first_name: Yup.string().required('First name is required'),
      last_name: Yup.string().required('Last name is required'),
    }),
    onSubmit: (values) => {
      updateNameProfile.mutate({ ...values, avatar_url });
      handleClose();
    },
  });
  return (
    <PopUp open={open} handleClose={handleClose}>
      <form className='min-w-[300px] max-w-[500px]' onSubmit={formik.handleSubmit}>
        <DialogTitle className='flex items-center justify-between'>
          <div className='text-lg'>Name</div>
          <Icon icon='mdi:close' className='cursor-pointer' onClick={handleClose} />
        </DialogTitle>
        <DialogContent className='flex flex-col gap-3'>
          <TextFieldCore
            label='First name'
            name='first_name'
            sx={{ mt: '5px' }}
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.first_name && Boolean(formik.errors.first_name)}
            helperText={formik.touched.first_name && formik.errors.first_name}
          />
          <TextFieldCore
            label='Last name'
            name='last_name'
            value={formik.values.last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
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

export default RenameProfilePopUp;
