import TextFieldCore from '../../components/core/form/TextFieldCore';
import IconifyIcon from '../../components/core/Icon/IConCore';
import { Avatar, Button, Checkbox, LinearProgress, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import AuthFooter from './AuthFooter';
import { passwordSchema } from '../../helpers/form-schema/auth/login.schema';
import { resetPasswordInitialValue } from '../../apis/auth/request/reset-password.request';

const ResetPassword = () => {
  const [currentValue, setCurrentValue] = React.useState('');
  const [isLogin, setIsLogin] = React.useState(false);
  const [isShowPassword, setIsShowPassword] = React.useState(false);

  const handleChange = (e: { target: { value: React.SetStateAction<string> } }) => setCurrentValue(e.target.value);

  const formik = useFormik({
    initialValues: resetPasswordInitialValue,
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      console.log(values);
      setIsLogin(true);
    },
  });

  return (
    <div className='flex h-screen items-center justify-center bg-[#f0f4f9]'>
      <div className='sm:my-auto sm:h-fit md:flex md:h-full md:w-full md:flex-col md:justify-between md:bg-white lg:mx-48 lg:my-auto lg:h-fit lg:bg-[#f0f4f9]'>
        {isLogin && <LinearProgress className='mx-5 translate-y-1' />}
        <form onSubmit={formik.handleSubmit} className='rounded-3xl border bg-white p-10 md:border-none'>
          <div className='logo mb-4'>
            <IconifyIcon icon='flat-color-icons:google' className='text-5xl' />
            <Typography variant='h4'>Account recovery</Typography>
          </div>
          <div className='content flex flex-col gap-20 md:flex-row md:justify-between'>
            <div className='min-w-60'>
              <div className='flex items-center gap-3 rounded-2xl border p-1 pr-5 ring-1 ring-black'>
                <Avatar
                  alt='Remy Sharp'
                  src='https://picsum.photos/100/100'
                  sx={{
                    width: 25,
                    height: 25,
                  }}
                />
                <span className='line-clamp-1 overflow-hidden'>John Doe</span>
              </div>
            </div>
            <div className='flex flex-col gap-5 '>
              <div className='input w-full'>
                <div className='-translate-y-5'>Enter the last password you remember using with this Google Account</div>
                <TextFieldCore
                  label='Enter last password'
                  name='password'
                  type={isShowPassword ? 'text' : 'password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
                <div className='flex -translate-x-2 items-center'>
                  <Checkbox checked={isShowPassword} onChange={() => setIsShowPassword(!isShowPassword)} />
                  <span>Show password</span>
                </div>
              </div>
              <div className='flex items-center justify-end gap-3'>
                <Button
                  size='medium'
                  sx={{ borderRadius: '30px' }}
                  type='submit'
                  variant='contained'
                  color='primary'
                  {...(isLogin && { disabled: true })}
                  className='w-24'>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </form>
        <AuthFooter />
      </div>
    </div>
  );
};

export default ResetPassword;
