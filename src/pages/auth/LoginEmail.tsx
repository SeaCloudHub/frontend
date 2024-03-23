import { useFormik } from 'formik';
import React from 'react';
import {
  loginEmailInitialValues,
  loginEmailSchema,
} from '../../helpers/form-schema/login-email.schema';
import { Button, LinearProgress, Typography } from '@mui/material';
import TextFieldCore from '../../components/core/form/TextFieldCore';
import AuthLink from './auth-link/AuthLink';
import IconifyIcon from '../../components/core/Icon/IConCore';
import { useNavigate } from 'react-router-dom';
import AuthFooter from './AuthFooter';

const LoginEmail = () => {
  const [isLogin, setIsLogin] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState('');
  const navigate = useNavigate();

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setCurrentValue(e.target.value);

  const formik = useFormik({
    initialValues: loginEmailInitialValues,
    validationSchema: loginEmailSchema,
    onSubmit: (values) => {
      console.log(values);
      setIsLogin(true);
      setTimeout(() => {
        setIsLogin(false);
        navigate('/auth/login/challenge');
      }, 2000);
    },
  });
  return (
    <div className="flex h-screen items-center justify-center overflow-hidden bg-[#f0f4f9]">
      <div className="sm:my-auto sm:h-fit md:flex md:h-full md:w-full md:flex-col md:justify-between md:bg-white lg:mx-60 lg:my-auto lg:h-fit lg:bg-[#f0f4f9]">
        {isLogin && <LinearProgress className="mx-5 translate-y-1" />}
        <form
          onSubmit={formik.handleSubmit}
          className="rounded-xl border bg-white p-10 md:border-none"
        >
          <div className="logo mb-8">
            <IconifyIcon icon="flat-color-icons:google" className="text-5xl" />
          </div>
          <div className="content gap-4 md:flex md:justify-between">
            <div>
              <Typography variant="h3">Sign in</Typography>
              <h4 className="mt-3">To continue to Google Drive</h4>
            </div>
            <div className="flex flex-col gap-5">
              <div className="input w-full">
                <TextFieldCore
                  label="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <div className="mt-1">
                  <AuthLink link="/forgot-password" className="text-[#0b57d0]">
                    Forgot email?
                  </AuthLink>
                </div>
              </div>
              <div className="terms">
                <Typography variant="body2" color="textSecondary">
                  Not your computer? Use Guest mode to sign in privately.
                </Typography>
                <AuthLink link="/terms" className="text-[#0b57d0]">
                  Learn more
                </AuthLink>
              </div>
              <div className="flex items-center justify-end gap-3">
                <Button
                  size="medium"
                  variant="text"
                  color="primary"
                  sx={{ borderRadius: '30px' }}
                  className="w-40"
                >
                  Create account
                </Button>
                <Button
                  size="medium"
                  sx={{ borderRadius: '30px' }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  {...(isLogin && { disabled: true })}
                  className="w-24"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </form>
        <AuthFooter
          currentValue={currentValue}
          handleChange={handleChange}
          items={['One', 'Two', 'Three']}
        />
      </div>
    </div>
  );
};

export default LoginEmail;
