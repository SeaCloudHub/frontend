import { Avatar, Button, Checkbox, LinearProgress, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IconifyIcon from '../../components/core/Icon/IConCore';
import TextFieldCore from '../../components/core/form/TextFieldCore';
import { loginPasswordInitialValues, loginPasswordSchema } from '../../helpers/form-schema/login-password.schema';
import { useSession } from '../../store/auth/session';
import { accountAuthorityCallback } from '../../utils/constants/account-login-callback.constant';
import AuthFooter from './AuthFooter';
import AuthLink from './auth-link/AuthLink';

const LoginPassword = () => {
  const [currentValue, setCurrentValue] = React.useState('');
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;
  const [isLogin, setIsLogin] = useState(false);
  const authenticated = useSession((state) => state.token) != null;
  const role = useSession((state) => state.role);
  const handleChange = (e: { target: { value: React.SetStateAction<string> } }) => setCurrentValue(e.target.value);

  const formik = useFormik({
    initialValues: loginPasswordInitialValues,
    validationSchema: loginPasswordSchema,
    onSubmit: (values) => {
      setIsLogin(true);
    },
  });

  useEffect(() => {
    console.log(authenticated, role);
    if (!authenticated) return;
    else if (from) {
      navigate(from);
    } else {
      navigate(accountAuthorityCallback[role!]);
    }
  }, [authenticated, role]);
  return (
    <div className='flex h-screen items-center justify-center overflow-hidden bg-[#f0f4f9] px-10'>
      <div className='sm:my-auto sm:h-fit  md:flex md:h-full md:w-full md:flex-col md:justify-between md:bg-white lg:mx-48 lg:my-auto lg:h-fit lg:bg-[#f0f4f9]'>
        {isLogin && <LinearProgress className='mx-5 translate-y-1' />}
        <form onSubmit={formik.handleSubmit} className='rounded-3xl border bg-white p-10 md:border-none'>
          <div className='logo mb-4'>
            <IconifyIcon icon='flat-color-icons:google' className='text-5xl' />
            <Typography variant='h3'>Welcome</Typography>
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
                  // className='w-6 h-6'
                />
                <span className='line-clamp-1 overflow-hidden'>John Doe</span>
              </div>
            </div>
            <div className='flex flex-col gap-5'>
              <div className='input w-full'>
                <TextFieldCore
                  label='Enter your password'
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
              <div className='terms'>
                Not your computer? Use Guest mode to sign in privately.
                <AuthLink link='/terms' className='text-[#0b57d0]'>
                  Learn more
                </AuthLink>
              </div>
              <div className='flex items-center justify-end gap-3'>
                <Button size='medium' variant='text' color='primary' sx={{ borderRadius: '30px' }} className='w-40'>
                  Create account
                </Button>
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
        <AuthFooter currentValue={currentValue} handleChange={handleChange} items={['One', 'Two', 'Three']} />
      </div>
    </div>
  );
};

export default LoginPassword;
