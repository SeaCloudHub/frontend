import { useFormik } from 'formik';
import IconifyIcon from '../../components/core/Icon/IConCore';
import TextFieldCore from '../../components/core/form/TextFieldCore';
import { Button, LinearProgress, Paper, Typography } from '@mui/material';
import { changePasswordInitialValues, changePasswordSchema } from '../../helpers/form-schema/change-password.schema';
import { useState } from 'react';
import { useScreenMode } from '../../store/responsive/screenMode';
import { ScreenMode } from '../../utils/enums/screen-mode.enum';
// import React from 'react';

const ChangePassword = () => {
  const [isChange, setIsChange] = useState(false);
  const screenMode = useScreenMode((state) => state.screenMode);
  const formik = useFormik({
    initialValues: changePasswordInitialValues,
    validationSchema: changePasswordSchema,
    onSubmit: (values) => {
      console.log(values);
      setIsChange(true);
      setTimeout(() => {
        setIsChange(false);
      }, 2000);
    },
  });

  return (
    <div className={`${screenMode == ScreenMode.MOBILE ? 'mx-2' : 'mx-auto'} max-w-[700px] text-gray-600 `}>
      <IconifyIcon icon='logos:google' className='mx-auto h-20 w-40' />
      <div className='title text-center text-2xl '>Change password for</div>
      <div className='email text-center text-2xl'>kimhieu@gmail.com</div>
      <div className='help'></div>
      {isChange && <LinearProgress className='mx-5 translate-y-6' />}
      <Paper
        component={'form'}
        onSubmit={formik.handleSubmit}
        className='paper mt-5 border'
        elevation={3}
        sx={{ backgroundColor: '#f7f7f7', py: 5, px: screenMode == ScreenMode.DESKTOP ? 5 : 2 }}>
        <IconifyIcon icon='ic:baseline-lock-reset' className='mx-auto my-4 h-24 w-56 text-blue-600' />
        <div className='text line-clamp-2 overflow-hidden'>
          Create a new, strong password that you don't use for other websites
        </div>
        <div className='form mt-5 flex flex-col gap-3'>
          <div className='create-password'>
            <Typography
              className='label'
              fontWeight={{
                fontWeight: 600,
              }}>
              Create password
            </Typography>
            <TextFieldCore
              name={'password'}
              disabled={isChange}
              type='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </div>
          <div className='confirm-password'>
            <Typography
              className='label'
              fontWeight={{
                fontWeight: 600,
              }}>
              Confirm password
            </Typography>
            <TextFieldCore
              name={'confirmPassword'}
              disabled={isChange}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              onBlur={formik.handleBlur}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </div>
          <Button type='submit' className='btn' fullWidth variant='contained' size='large' disabled={isChange}>
            Change password
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default ChangePassword;
