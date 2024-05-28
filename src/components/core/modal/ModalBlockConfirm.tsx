import { UserManagementInfoDto } from '@/apis/admin/user-management/dto/user-management-info.dto';
import { UserDeleteREQ } from '@/apis/admin/user-management/request/user-action.request';
import { blockUserApi, deleteUserAPi } from '@/apis/admin/user-management/user-management.api';
import { toastError, toastSuccess } from '@/utils/toast-options/toast-options';
import { ApiGenericError } from '@/utils/types/api-generic-error.type';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import ButtonContainer from '../button/ButtonContainer';
import ModalCore from './ModalCore';

type ModalConfirmBlockOrUnBlockProps = {
  user?: UserManagementInfoDto;
  isBlock?: boolean;
  message: string;
  title: string;
  isOpen: boolean;
  handleConfirm: (data?: boolean) => void;
};

const ModalConfirmBlockOrUnBlock = ({
  message,
  title,
  isOpen,
  handleConfirm,
  user,
  isBlock,
}: ModalConfirmBlockOrUnBlockProps) => {
  const blockUserMutation = useMutation({
    mutationFn: (param: UserDeleteREQ) => {
      return blockUserApi(param);
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        handleConfirm(false);
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: (data) => {
      handleConfirm(true);
      toast.success(isBlock ? 'User was blocked successfully' : 'Un-block user successfully', toastSuccess());
    },
  });
  console.log('isBlock', isBlock);
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
            tooltip={isBlock ? 'Block' : 'Un-block'}
            title={isBlock ? 'Block' : 'Un-block'}
            background='#0b57d0'
            onClick={() => {
              blockUserMutation.mutateAsync({ identity_id: user.userId });
            }}
          />
        </div>
      </div>
    </ModalCore>
  );
};

export default ModalConfirmBlockOrUnBlock;
