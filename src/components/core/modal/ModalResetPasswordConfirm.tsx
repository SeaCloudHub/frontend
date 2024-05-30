import { resetPasswordApi } from '@/apis/admin/user-management/user-management.api';
import { toastError } from '@/utils/toast-options/toast-options';
import { ApiGenericError } from '@/utils/types/api-generic-error.type';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ButtonContainer from '../button/ButtonContainer';
import ModalCore from './ModalCore';
import ModalResetPasswordSuccess from './ModalResetPasswordSuccess';

type ModalResetPasswordConfirmProps = {
  user_id?: string;
  message: string;
  title: string;
  isOpen: boolean;
  handleConfirm: (data?: boolean) => void;
};

const ModalResetPasswordConfirm = ({ message, title, isOpen, handleConfirm, user_id }: ModalResetPasswordConfirmProps) => {
  const [alert, setAlert] = useState(false);
  const [dataRes, setDataRes] = useState('');
  const resetPasswordMutation = useMutation({
    mutationFn: () => {
      return resetPasswordApi({ identity_id: user_id });
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        handleConfirm(false);
        toast.error(error.response?.data.message, toastError());
      }
    },

    onSuccess: (data) => {
      setDataRes(data.password);
      setAlert(true);
    },
  });
  return (
    <ModalCore open={isOpen} width={'40%'} closeOutside={handleConfirm}>
      {alert && (
        <ModalResetPasswordSuccess
          message={`Password has been changed successfully. The new password is "${dataRes}"`}
          title={'Success'}
          isOpen={true}
          handleConfirm={function (data?: boolean): void {
            handleConfirm(true);
          }}
        />
      )}

      <div className='mb-3 flex w-full flex-col space-y-3 p-2'>
        <h3 className='statement-bold text-[24px]'>{title}</h3>
        {resetPasswordMutation.isPending && !alert ? (
          <img src={(import.meta.env.BASE_URL + 'loader.svg') as string} className='mx-auto  h-[50px] w-[50px]' />
        ) : (
          <p>{message}</p>
        )}
        <div className='mt-6 flex items-center justify-end gap-5'>
          <p
            onClick={() => {
              handleConfirm(false);
            }}
            className='statement-upper-medium pointer cursor-pointer text-blue-600'>
            Cancel
          </p>
          <ButtonContainer
            borderRadius={15}
            tooltip={'Reset'}
            title='Reset'
            background='#0b57d0'
            onClick={() => {
              resetPasswordMutation.mutateAsync();
            }}
          />
        </div>
      </div>
    </ModalCore>
  );
};

export default ModalResetPasswordConfirm;
