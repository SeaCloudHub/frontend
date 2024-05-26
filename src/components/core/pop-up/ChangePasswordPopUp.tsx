import React from 'react';
import PopUp from './PopUp';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import TextFieldCore from '../form/TextFieldCore';
import ButtonCancel from '../button/ButtonCancel';
import ButtonSuccess from '../button/ButtonSuccess';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { changePasswordInitialValue } from '@/apis/auth/request/change-password.request';
import { changePasswordSchema } from '@/helpers/form-schema/change-password.schema';
import { useChangePasswordMutation } from '@/hooks/auth.hooks';

type ChangePasswordPopUpProps = {
  open: boolean;
  handleClose: () => void;
};

const ChangePasswordPopUp: React.FC<ChangePasswordPopUpProps> = ({ handleClose, open }) => {
  const changePasswordMutation = useChangePasswordMutation();

  const formik = useFormik({
    initialValues: changePasswordInitialValue,
    validationSchema: changePasswordSchema,
    onSubmit: (values) => {
      if (values.new_password === values.confirmPassword) {
        changePasswordMutation.mutateAsync(values);
      }
      handleClose();
    },
  });

  return (
    <PopUp open={open} handleClose={handleClose}>
      <form className='min-w-[400px] max-w-[600px]' onSubmit={formik.handleSubmit}>
        <DialogTitle className='flex items-center'>
          <div className='text-lg'>Change Password</div>
        </DialogTitle>
        <DialogContent className='flex flex-col gap-3'>
          <TextFieldCore
            label='Current password'
            name='old_password'
            type='password'
            sx={{ mt: '5px' }}
            value={formik.values.old_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.old_password && Boolean(formik.errors.old_password)}
            helperText={formik.touched.old_password && formik.errors.old_password}
          />
          <TextFieldCore
            label='New Password'
            name='new_password'
            type='password'
            value={formik.values.new_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.new_password && Boolean(formik.errors.new_password)}
            helperText={formik.touched.new_password && formik.errors.new_password}
          />
          <TextFieldCore
            label='Confirm Password'
            name='confirmPassword'
            type='password'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
        </DialogContent>
        <DialogActions>
          <ButtonCancel onClick={handleClose}>Cancel</ButtonCancel>
          <ButtonSuccess type='submit' isInvisible={!formik.isValid}>
            Save{' '}
          </ButtonSuccess>
        </DialogActions>
      </form>
    </PopUp>
  );
};

export default ChangePasswordPopUp;
