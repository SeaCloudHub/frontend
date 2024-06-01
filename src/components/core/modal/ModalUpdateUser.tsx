import { AdminUpdateUserREQ } from '@/apis/admin/user-management/request/update-user.request';
import { updateUserApi } from '@/apis/admin/user-management/user-management.api';
import { IdentityRESP } from '@/apis/auth/response/auth.sign-in.response';
import { updateUserSchema } from '@/helpers/form-schema/admin/update-user.schema';
import { LinearProgress } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { uploadImage } from '../../../apis/shared/shared.api';
import { useScreenHook } from '../../../hooks/useScreenHook';
import { toastError, toastSuccess } from '../../../utils/toast-options/toast-options';
import { ApiGenericError } from '../../../utils/types/api-generic-error.type';
import IconifyIcon from '../Icon/IConCore';
import ButtonContainer from '../button/ButtonContainer';
import ButtonIcon from '../button/ButtonIcon';
import TextInputCore from '../input/TextInputCore';
import ModalCore from './ModalCore';

type ModalUpdateUserProps = {
  title: string;
  user?: IdentityRESP;
  isOpen: boolean;
  handleConfirm: (data?: any) => void;
};

const ModalUpdateUser = ({ title, user, isOpen, handleConfirm }: ModalUpdateUserProps) => {
  const flex = !useScreenHook(500);
  const [file, setFile] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<null | string>(null);
  useEffect(() => {
    if (file) {
      setAvatar(URL.createObjectURL(file));
    } else if (user && user.avatar_url) {
      setAvatar(import.meta.env.VITE_BACKEND_API + user.avatar_url);
    }
  }, [user, file]);
  const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const formik = useFormik({
    initialValues: {
      first_name: user ? user.first_name : '',
      last_name: user ? user.last_name : '',
    },
    validationSchema: updateUserSchema,
    onSubmit: async (values) => {
      let avatar_url = user ? user.avatar_url : null;
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
      await updateUserMutation.mutateAsync({
        body: {
          avatar_url: avatar_url,
          first_name: values.first_name,
          last_name: values.last_name,
        },
        userId: user.id,
      });
      handleConfirm(true);
    },
  });
  const queryClient = useQueryClient();
  const updateUserMutation = useMutation({
    mutationFn: (data: { body: AdminUpdateUserREQ; userId: string }) => updateUserApi(data),
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: (data) => {
       toast.success('Update user successfully !', toastSuccess());
      queryClient.invalidateQueries({ queryKey: ['user-details', user.id] });
      handleConfirm(true);
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
        {updateUserMutation.isPending && <LinearProgress className=' translate-y-1' />}
      </div>
      <div className='mb-3  flex w-full justify-between'>
        {updateUserMutation.isPending && <LinearProgress className='mx-5 translate-y-1' />}
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
              <label className='flex w-1/2 cursor-pointer items-center' htmlFor='upload-photo'>
                <ButtonIcon icon='tabler:camera' color='blue' />
                <p className='statement-upper-medium text-blue-600'>UPLOAD PROFILE PHOTO</p>
              </label>
            </div>
            <div className='file'>
              <input
                type='file'
                accept='.png, .jpg, .jpeg'
                style={{ display: 'none' }}
                id='upload-photo'
                onChange={handleImageSelection}
              />
              {avatar && (
                <div className='flex items-center space-x-2'>
                  <img className='max-w-[90px] object-contain' src={avatar} />
                </div>
              )}
            </div>
            <div className='float-right'>
              <ButtonContainer type='submit' title='Update' icon={<IconifyIcon  icon='dashicons:update-alt' />} />
            </div>
          </div>
        </div>
      </form>
    </ModalCore>
  );
};

export default ModalUpdateUser;
