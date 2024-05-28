import { useSession } from '@/store/auth/session';
import { Button, LinearProgress, Paper, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { changePasswordApi } from '../../apis/auth/auth.api';
import { changePasswordInitialValue } from '../../apis/auth/request/change-password.request';
import IconifyIcon from '../../components/core/Icon/IConCore';
import TextFieldCore from '../../components/core/form/TextFieldCore';
import ModalChangePasswordSuccess from '../../components/core/modal/ModalChangePasswordSuccess';
import { changePasswordSchema } from '../../helpers/form-schema/change-password.schema';
import { useScreenMode } from '../../store/responsive/screenMode';
import { DRIVE_HOME } from '../../utils/constants/router.constant';
import { ScreenMode } from '../../utils/enums/screen-mode.enum';
import { toastError } from '../../utils/toast-options/toast-options';
import { ApiGenericError } from '../../utils/types/api-generic-error.type';

const ChangePassword = () => {
  const navigate = useNavigate();
  const screenMode = useScreenMode((state) => state.screenMode);
  const signOut = useSession((state) => state.signOut);
  const [modalOpen, setModalOpen] = useState(false);
  const identity = useSession((state) => state.identity);
  const formik = useFormik({
    initialValues: changePasswordInitialValue,
    validationSchema: changePasswordSchema,
    onSubmit: (values) => {
      changPasswordMutation.mutateAsync();
    },
  });
  const changPasswordMutation = useMutation({
    mutationFn: () => {
      return changePasswordApi({ old_password: formik.values.old_password, new_password: formik.values.new_password });
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: () => {
      setModalOpen(true);
    },
  });

  return (
    <div className={`${screenMode == ScreenMode.MOBILE ? 'mx-2' : 'mx-auto'} max-w-[700px] text-gray-600 `}>
      {/* <IconifyIcon icon='logos:google' className='mx-auto h-20 w-40' /> */}
      <img
        src={(import.meta.env.BASE_URL + 'logo.png') as string}
        alt='placeholder'
        className='mx-auto h-[7rem] w-[7rem] rounded-full object-contain'
      />
      <div className='title text-center text-2xl '>Change password for</div>
      <div className='email text-center text-2xl'>{identity && identity.email}</div>
      <div className='help'></div>
      {changPasswordMutation.isPending && <LinearProgress className='mx-5 translate-y-6' />}
      <ModalChangePasswordSuccess
        isOpen={modalOpen}
        handleConfirm={() => {
          setModalOpen(false);
          navigate(DRIVE_HOME);
        }}
      />
      <Paper
        component={'form'}
        onSubmit={formik.handleSubmit}
        className='paper mt-5 border'
        elevation={3}
        sx={{
          backgroundColor: '#f7f7f7',
          py: 5,
          px: screenMode == ScreenMode.DESKTOP ? 5 : 2,
        }}>
        <IconifyIcon icon='ic:baseline-lock-reset' className='mx-auto my-4 h-24 w-56 text-blue-600' />
        <div className='text line-clamp-2 overflow-hidden'>
          Create a new, strong password that you don't use for other websites
        </div>
        <div className='form mt-5 flex flex-col gap-3'>
          <div className='old-password'>
            <Typography
              className='label'
              fontWeight={{
                fontWeight: 600,
              }}>
              Current password
            </Typography>
            <TextFieldCore
              theme='light'
              name={'old_password'}
              disabled={changPasswordMutation.isPending}
              type='password'
              value={formik.values.old_password}
              onChange={formik.handleChange}
              error={formik.touched.old_password && Boolean(formik.errors.old_password)}
              onBlur={formik.handleBlur}
              helperText={formik.touched.old_password && formik.errors.old_password}
            />
          </div>
          <div className='create-password'>
            <Typography
              className='label'
              fontWeight={{
                fontWeight: 600,
              }}>
              New password
            </Typography>
            <TextFieldCore
              theme='light'
              name={'new_password'}
              disabled={changPasswordMutation.isPending}
              type='password'
              value={formik.values.new_password}
              onChange={formik.handleChange}
              error={formik.touched.new_password && Boolean(formik.errors.new_password)}
              onBlur={formik.handleBlur}
              helperText={formik.touched.new_password && formik.errors.new_password}
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
              theme='light'
              type='password'
              name={'confirmPassword'}
              disabled={changPasswordMutation.isPending}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              onBlur={formik.handleBlur}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </div>

          <Button
            type='submit'
            className='btn'
            fullWidth
            variant='contained'
            size='large'
            disabled={changPasswordMutation.isPending}>
            Change password
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default ChangePassword;
