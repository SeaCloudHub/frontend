import { accountAuthorityCallback } from '@/utils/constants/account-login-callback.constant';
import { Button, LinearProgress, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkEmailApi } from '../../apis/auth/auth.api';
import { loginInitialValue } from '../../apis/auth/request/auth-sign-in.request';
import { default as TextFieldCore } from '../../components/core/form/TextFieldCore';
import { emailSchema } from '../../helpers/form-schema/auth/login.schema';
import { useSession } from '../../store/auth/session';
import { AUTH_LOGIN_PASSWORD } from '../../utils/constants/router.constant';
import { toastError } from '../../utils/toast-options/toast-options';
import { ApiGenericError } from '../../utils/types/api-generic-error.type';
import AuthFooter from './AuthFooter';
import { default as AuthLink } from './auth-link/AuthLink';

const LoginEmail = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname;
  const [currentValue, setCurrentValue] = React.useState('');
  const onEmailValid = useSession((state) => state.onEmailValid);
  const navigate = useNavigate();
  const { token: authenticated, role } = useSession();
  const handleChange = (e: { target: { value: React.SetStateAction<string> } }) => setCurrentValue(e.target.value);

  useEffect(() => {
    if (!authenticated) return;
    if (from) {
      navigate(from);
    } else {
      navigate(accountAuthorityCallback[role!]);
    }
  }, [authenticated, role]);

  const formik = useFormik({
    initialValues: loginInitialValue,
    validationSchema: emailSchema,
    onSubmit: async (values) => {
      const res = await checkEmailMutation.mutateAsync(values.email);
    },
  });
  const checkEmailMutation = useMutation({
    mutationFn: (email: string) => {
      return checkEmailApi({ email: email });
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: (res) => {
      const { email, avatar_url, first_name, last_name, password_changed_at } = res.data;
      onEmailValid(email, avatar_url, first_name, last_name, password_changed_at);
      navigate(AUTH_LOGIN_PASSWORD);
    },
  });
  return (
    <div className='flex h-screen items-center justify-center overflow-hidden bg-[#f0f4f9]'>
      <div className='sm:my-auto sm:h-fit md:flex md:h-full md:w-full md:flex-col md:justify-between md:bg-white lg:mx-60 lg:my-auto lg:h-fit lg:bg-[#f0f4f9]'>
        <form onSubmit={formik.handleSubmit} className='relative rounded-xl border bg-white p-10 md:border-none'>
          <div className='absolute left-0 top-0 w-full px-1'>
            {checkEmailMutation.isPending && <LinearProgress className=' translate-y-1' />}
          </div>
          <div className=' w-[50px]'>
            <img className='w-full object-contain' src={(import.meta.env.BASE_URL + 'logo.png') as string} />
          </div>
          <div className='content gap-4 md:flex md:justify-between'>
            <div>
              <Typography variant='h3'>Sign in</Typography>
              <h4 className='mt-3'>To continue to SeaweedFS</h4>
            </div>
            <div className='flex flex-col gap-5'>
              <div className='input w-full'>
                <TextFieldCore
                  label='Email'
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <div className='mt-1'>
                  <AuthLink link='/forgot-password' className='text-[#0b57d0]'>
                    Forgot email?
                  </AuthLink>
                </div>
              </div>
              <div className='terms'>
                <Typography variant='body2' color='textSecondary'>
                  Not your computer? Use Guest mode to sign in privately.
                </Typography>
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
                  {...(checkEmailMutation.isPending && { disabled: true })}
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

export default LoginEmail;
