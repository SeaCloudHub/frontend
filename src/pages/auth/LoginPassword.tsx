import { useStorageStore } from '@/store/storage/storage.store';
import { accountAuthorityCallback } from '@/utils/constants/account-login-callback.constant';
import { getFirstCharacters } from '@/utils/function/getFirstCharacter';
import { getRandomColor } from '@/utils/function/getRandomColor';
import { Avatar, Button, Checkbox, LinearProgress, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signinApi } from '../../apis/auth/auth.api';
import { AuthSignInREQ, loginInitialValue } from '../../apis/auth/request/auth-sign-in.request';
import TextFieldCore from '../../components/core/form/TextFieldCore';
import { passwordSchema } from '../../helpers/form-schema/auth/login.schema';
import { useSession } from '../../store/auth/session';
import { AUTH_CHANGE_PASSWORD, AUTH_LOGIN_EMAIL } from '../../utils/constants/router.constant';
import { Role } from '../../utils/enums/role.enum';
import { toastError } from '../../utils/toast-options/toast-options';
import { ApiGenericError } from '../../utils/types/api-generic-error.type';
import AuthFooter from './AuthFooter';

const LoginPassword = () => {
  // const [currentValue, setCurrentValue] = React.useState('');
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie] = useCookies(['token', 'role']);
  const from = location.state?.from?.pathname;
  const { signIn, firstLogin, identity } = useSession();
  const updateStorageStore = useStorageStore((state) => state.update);
  // const handleChange = (e: { target: { value: React.SetStateAction<string> } }) => setCurrentValue(e.target.value);
  const formik = useFormik({
    initialValues: { ...loginInitialValue, email: identity.email },
    validationSchema: passwordSchema,
    onSubmit: async (values) => {
      await loginMutation.mutateAsync(values as AuthSignInREQ);
    },
  });

  const loginMutation = useMutation({
    mutationFn: (body: AuthSignInREQ) => {
      return signinApi(body);
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: (data) => {
      const firstSignin = data.data.identity.password_changed_at === null;
      if (firstSignin) {
        navigate(AUTH_CHANGE_PASSWORD);
      }
      setCookie('role', data.data.identity.is_admin ? Role.ADMIN : Role.USER, {
        path: '/',
        expires: new Date(data.data.session_expires_at),
      });
      setCookie('token', data.data.session_token, { path: '/', expires: new Date(data.data.session_expires_at) });
      updateStorageStore(data.data.identity.storage_usage, data.data.identity.storage_capacity, data.data.identity.root_id);
      signIn(data.data.identity.is_admin ? Role.ADMIN : Role.USER, firstSignin, data.data.identity);
    },
  });

  useEffect(() => {
    if (identity && !identity.email) {
      navigate(AUTH_LOGIN_EMAIL);
      return;
    }
    if (!cookies.token) return;
    if (!firstLogin) {
      if (from) {
        navigate(from);
      } else {
        navigate(accountAuthorityCallback[cookies.role!]);
      }
    }
  }, [cookies.role, firstLogin, identity, cookies.token, navigate, from]);

  return (
    <div className='flex h-screen items-center justify-center bg-[#f0f4f9] px-10'>
      <div>
        {loginMutation.isPending && <LinearProgress className='mx-5 translate-y-1' />}
        <form onSubmit={formik.handleSubmit} className='rounded-3xl bg-white p-10'>
          <div className='logo mb-4'>
            <img className='w-[70px]  object-contain' src={(import.meta.env.BASE_URL + 'logo.png') as string} />
            <Typography variant='h3'>Welcome</Typography>
          </div>
          <div className='flex min-w-72 flex-col gap-10'>
            <div className='min-w-60'>
              <div className='flex items-center gap-3 rounded-2xl border p-1 pr-5 ring-1 ring-black'>
                {identity && identity.avatar_url && (
                  <Avatar
                    alt='Remy Sharp'
                    src={import.meta.env.VITE_BACKEND_API + identity.avatar_url}
                    sx={{
                      width: 25,
                      height: 25,
                    }}
                  />
                )}
                {identity && !identity.avatar_url && (
                  <div
                    className='round flex h-[25px] w-[25px] items-center justify-center rounded-full'
                    style={{ backgroundColor: getRandomColor() }}>
                    <p className='statement-bold truncate'>
                      {getFirstCharacters(identity.first_name + ' ' + identity.last_name || '')}
                    </p>
                  </div>
                )}
                <span className='line-clamp-1 overflow-hidden'>{identity && identity.first_name}</span>
              </div>
            </div>
            <div className='flex min-w-56 flex-col gap-5'>
              <div className='input w-full'>
                <TextFieldCore
                  theme='light'
                  label='Enter your password'
                  name='password'
                  type={isShowPassword ? 'text' : 'password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
                <div
                  className='flex -translate-x-2 cursor-pointer items-center'
                  onClick={() => setIsShowPassword(!isShowPassword)}>
                  <Checkbox checked={isShowPassword} />
                  <span>Show password</span>
                </div>
              </div>
              <div className='flex items-center justify-end gap-3'>
                <Button
                  size='medium'
                  variant='text'
                  color='primary'
                  sx={{ borderRadius: '30px' }}
                  className='w-24'
                  onClick={() => navigate(AUTH_LOGIN_EMAIL)}>
                  Back
                </Button>
                <Button
                  size='medium'
                  sx={{ borderRadius: '30px' }}
                  type='submit'
                  variant='contained'
                  color='primary'
                  {...(loginMutation.isPending && { disabled: true })}
                  className='w-24'>
                  Login
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

export default LoginPassword;
