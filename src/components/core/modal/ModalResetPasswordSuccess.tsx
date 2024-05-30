import ButtonContainer from '../button/ButtonContainer';
import ModalCore from './ModalCore';

type ModalResetPasswordSuccessProps = {
  user_id?: string;
  message: string;
  title: string;
  isOpen: boolean;
  handleConfirm: (data?: boolean) => void;
};

const ModalResetPasswordSuccess = ({ message, title, isOpen, handleConfirm, user_id }: ModalResetPasswordSuccessProps) => {
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
            tooltip={'Reset'}
            title='Reset'
            background='#0b57d0'
            onClick={() => {
              handleConfirm(true);
            }}
          />
        </div>
      </div>
    </ModalCore>
  );
};

export default ModalResetPasswordSuccess;
