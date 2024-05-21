import { useMutation } from '@tanstack/react-query';
import ButtonContainer from '../button/ButtonContainer';
import ModalCore from './ModalCore';
import { deleteUserAPi } from '@/apis/admin/user-management/user-management.api';
import { UserDeleteREQ } from '@/apis/admin/user-management/request/user-action.request';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';
import { ApiGenericError } from '@/utils/types/api-generic-error.type';
import { toastError, toastSuccess } from '@/utils/toast-options/toast-options';
import { UserManagementInfoDto } from '@/apis/admin/user-management/dto/user-management-info.dto';

type ModalConfirmDeleteProps = {
  user?: UserManagementInfoDto;
  message: string;
  title: string;
  isOpen: boolean;
  handleConfirm: (data?: boolean) => void;
};

const ModalConfirmDelete = ({ message, title, isOpen, handleConfirm, user }: ModalConfirmDeleteProps) => {
  const deleteUserMutation = useMutation({
    mutationFn: (param: UserDeleteREQ) => {
      return deleteUserAPi(param);
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        handleConfirm(false);
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: (data) => {
      handleConfirm(true);
      toast.success('User was deleted successfully', toastSuccess());
    },
  });
  return (
    <ModalCore open={isOpen} width={'40%'} closeOutside={handleConfirm}>
      <div className='mb-3 flex w-full flex-col space-y-3 p-2'>
        <h3 className='statement-bold text-[24px]'>{title}</h3>
        <p>{message}</p>
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
            tooltip={'Delete'}
            title='Delete'
            background='#0b57d0'
            onClick={() => {
              deleteUserMutation.mutateAsync({ identity_id: user.userId });
            }}
          />
        </div>
      </div>
    </ModalCore>
  );
};

export default ModalConfirmDelete;
