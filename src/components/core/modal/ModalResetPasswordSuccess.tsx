import IconifyIcon from '../Icon/IConCore';
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
          <ButtonContainer
            icon={<IconifyIcon height={15} icon={'el:ok'} />}
            borderRadius={15}
            title='OK'
            background='#0b57d0'
            onClick={() => {
              handleConfirm();
            }}
          />
        </div>
      </div>
    </ModalCore>
  );
};

export default ModalResetPasswordSuccess;
