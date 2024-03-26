import { LinearProgress } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { AddUserREQ, addUserInitValue } from '../../../apis/admin/user-management/request/add-user.request';
import { addUserApi } from '../../../apis/admin/user-management/user-management.api';
import { addUserSchema } from '../../../helpers/form-schema/admin/add-user.schema';
import { useScreenHook } from '../../../hooks/useScreenHook';
import { toastError, toastSuccess } from '../../../utils/toast-options/toast-options';
import { ApiGenericError } from '../../../utils/types/api-generic-error.type';
import IconifyIcon from '../Icon/IConCore';
import ButtonContainer from '../button/ButtonContainer';
import ButtonIcon from '../button/ButtonIcon';
import TextInputCore from '../input/TextInputCore';
import ModalCore from './ModalCore';

type ModalAddUserProps = {
  title: string;
  isOpen: boolean;
  handleConfirm: (data?: any) => void;
};

const ModalAddUser = ({ title, isOpen, handleConfirm }: ModalAddUserProps) => {
  const flex = !useScreenHook(500);

  const formik = useFormik({
    initialValues: addUserInitValue,
    validationSchema: addUserSchema,
    onSubmit: async (values) => {
      await addUserMutation.mutateAsync({
        email: values.email,
        password: values.password,
      });
    },
  });
  const addUserMutation = useMutation({
    mutationFn: (body: AddUserREQ) => {
      return addUserApi(body);
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: () => {
      handleConfirm(true);
      toast.success('Create user successfully', toastSuccess());
    },
  });
  const handleFieldChange = (fieldName: string, value: string) => {
    formik.handleChange({
      target: {
        name: fieldName,
        value: value,
      },
    });
  };
  return (
    <ModalCore open={isOpen} width={'70%'} closeOutside={handleConfirm} isCloseOutside={true}>
      <div className='absolute bottom-1 left-0 w-full px-3'>
        {addUserMutation.isPending && <LinearProgress className=' translate-y-1' />}
      </div>
      <div className='mb-3  flex w-full justify-between'>
        {addUserMutation.isPending && <LinearProgress className='mx-5 translate-y-1' />}
        <p className='h3 statement-upper-medium'>{title}</p>
        <ButtonIcon
          icon='ic:round-close'
          onClick={() => {
            handleConfirm(false);
          }}
        />
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className='mb-3 flex w-full flex-col border '>
          <p className=' statement-upper-medium border-b  p-2'>User Information</p>
          <div className='space-y-2 p-2'>
            <div className={`${flex ? 'flex items-center justify-center space-x-6' : ''}`}>
              <TextInputCore
                onChange={(value?: string) => handleFieldChange('name', value!)}
                label='Name'
                value={formik.values.name}
                name='name'
                labelDirection='vertical'
                placeholder='Name'
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                fullWidth={true}
              />
              <TextInputCore
                onChange={(value?: string) => handleFieldChange('email', value!)}
                label='Email'
                name='email'
                value={formik.values.email}
                labelDirection='vertical'
                fullWidth={true}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                placeholder='Email'
              />
            </div>
            <div className={`${flex ? 'flex items-center justify-center space-x-6' : ''}  w-full `}>
              <TextInputCore
                name='password'
                value={formik.values.confirmPassword}
                type={'password'}
                onChange={(value?: string) => handleFieldChange('password', value!)}
                fullWidth={true}
                label='Confirm password'
                labelDirection='vertical'
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                placeholder='Confirm password'
              />
              <TextInputCore
                name='confirmPassword'
                value={formik.values.confirmPassword}
                type={'password'}
                onChange={(value?: string) => handleFieldChange('confirmPassword', value!)}
                fullWidth={true}
                label='Confirm password'
                labelDirection='vertical'
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                placeholder='Confirm password'
              />
            </div>
            <div
              className='flex cursor-pointer items-center '
              onClick={() => {
                //Lay anh
              }}>
              <ButtonIcon icon='tabler:camera' color='blue' />
              <p className='statement-upper-medium text-blue-600'>UPLOAD PROFILE PHOTO</p>
            </div>
            <div className='float-right'>
              <ButtonContainer
                type='submit'
                title='Add User'
                onClick={() => {
                  formik.submitForm;
                }}
                icon={<IconifyIcon icon='tabler:playlist-add' />}
              />
            </div>
          </div>
        </div>
      </form>
    </ModalCore>
  );
};

export default ModalAddUser;
