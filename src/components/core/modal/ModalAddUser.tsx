import { LinearProgress } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { AddUserREQ, addUserInitValue } from '../../../apis/admin/user-management/request/add-user.request';
import { addUserApi } from '../../../apis/admin/user-management/user-management.api';
import { uploadImage } from '../../../apis/shared/shared.api';
import { addUserSchema } from '../../../helpers/form-schema/admin/add-user.schema';
import { useScreenHook } from '../../../hooks/useScreenHook';
import { toastError } from '../../../utils/toast-options/toast-options';
import { ApiGenericError } from '../../../utils/types/api-generic-error.type';
import IconifyIcon from '../Icon/IConCore';
import ButtonContainer from '../button/ButtonContainer';
import ButtonIcon from '../button/ButtonIcon';
import TextInputCore from '../input/TextInputCore';
import ModalAddUserSuccess from './ModalAddUserSuccess';
import ModalCore from './ModalCore';

type ModalAddUserProps = {
  title: string;
  isOpen: boolean;
  handleConfirm: (data?: any) => void;
};

const ModalAddUser = ({ title, isOpen, handleConfirm }: ModalAddUserProps) => {
  const flex = !useScreenHook(500);
  const [file, setFile] = useState<File | null>(null);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [authInfo, setAuthInfo] = useState<{ email: string; pass: string }>({ email: '', pass: '' });
  const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };
  const formik = useFormik({
    initialValues: addUserInitValue,
    validationSchema: addUserSchema,
    onSubmit: async (values) => {
      let avatar_url: string | undefined;
      if (file) {
        try {
          const res = await uploadImage({
            image: file,
          });
          avatar_url = res.data.file_path;
        } catch (error) {
          if (isAxiosError(error)) {
            toast.error(error.response?.data.message, toastError());
          }
          return;
        }
      }
      await addUserMutation.mutateAsync({
        email: values.email,
        password: values.password,
        first_name: values.first_name,
        last_name: values.last_name,
        avatar_url: avatar_url,
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
    onSuccess: (data) => {
      setAuthInfo({ email: data.email, pass: data.password });
      setModalSuccess(true);
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
      {modalSuccess && (
        <ModalAddUserSuccess
          data={{
            email: authInfo.email,
            password: authInfo.pass,
          }}
          single={true}
          isOpen={true}
          handleConfirm={function (data?: any): void {
            setModalSuccess(false);
            handleConfirm(true);
          }}
        />
      )}
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
                onChange={(value?: string) => handleFieldChange('first_name', value!)}
                label='First Name'
                value={formik.values.first_name}
                name='first_name'
                labelDirection='vertical'
                placeholder='First Name'
                error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                helperText={formik.touched.first_name && formik.errors.first_name}
                fullWidth={true}
              />
              <TextInputCore
                onChange={(value?: string) => handleFieldChange('last_name', value!)}
                label='Last Name'
                name='last_name'
                value={formik.values.last_name}
                labelDirection='vertical'
                fullWidth={true}
                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                helperText={formik.touched.last_name && formik.errors.last_name}
                placeholder='Last Name'
              />
            </div>
            <div className={`${flex ? 'flex items-center  space-x-6' : ''}`}>
              <TextInputCore
                onChange={(value?: string) => handleFieldChange('email', value!)}
                label='Email'
                className='w-1/2'
                value={formik.values.email}
                name='email'
                labelDirection='vertical'
                placeholder='Email'
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <label className='flex w-1/2 cursor-pointer items-center' htmlFor='upload-photo'>
                <ButtonIcon icon='tabler:camera' color='blue' />
                <p className='statement-upper-medium text-blue-600'>UPLOAD PROFILE PHOTO</p>
              </label>
            </div>
            <div className={`${flex ? 'flex items-center justify-center space-x-6' : ''}  w-full `}>
              <TextInputCore
                name='password'
                value={formik.values.password}
                type={'password'}
                onChange={(value?: string) => handleFieldChange('password', value!)}
                fullWidth={true}
                label='Password'
                labelDirection='vertical'
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                placeholder='Password'
              />
              <TextInputCore
                name='confirm_password'
                value={formik.values.confirm_password}
                type={'password'}
                onChange={(value?: string) => handleFieldChange('confirm_password', value!)}
                fullWidth={true}
                label='Confirm password'
                labelDirection='vertical'
                error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                placeholder='Confirm password'
              />
            </div>
            <div className='file'>
              <input
                type='file'
                accept='.png, .jpg, .jpeg'
                style={{ display: 'none' }}
                id='upload-photo'
                onChange={handleImageSelection}
              />
              {file && (
                <div className='flex items-center space-x-2'>
                  <img className='max-w-[90px] object-contain' src={URL.createObjectURL(file)} />
                  <ButtonIcon
                    icon='uiw:delete'
                    onClick={() => {
                      setFile(null);
                    }}
                    color='red'
                  />
                </div>
              )}
            </div>
            <div className='float-right'>
              <ButtonContainer type='submit' title='Add User' icon={<IconifyIcon icon='tabler:playlist-add' />} />
            </div>
          </div>
        </div>
      </form>
    </ModalCore>
  );
};

export default ModalAddUser;
