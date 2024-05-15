import ButtonCore from '../button/ButtonCore';
import ModalCore from './ModalCore';

type ModalChangePasswordSuccessProps = {
  isOpen: boolean;
  handleConfirm: () => void;
};

const ModalChangePasswordSuccess = ({ isOpen, handleConfirm }: ModalChangePasswordSuccessProps) => {
  return (
    <ModalCore open={isOpen} closeOutside={handleConfirm}>
      <div className='relative flex h-full items-center justify-center'>
        <div className='flex flex-col items-center rounded-lg bg-white p-8 text-center shadow-md'>
          <img
            className='mb-4 h-24 w-24 object-contain'
            src={(import.meta.env.BASE_URL + 'success.png') as string}
            alt='Success'
          />
          <p className='text-lg font-bold text-gray-800'>Password Changed Successfully</p>
          <p className='mb-6 text-sm text-gray-600'>Back to home page to continue using our services.</p>
          <ButtonCore
            title='OK'
            onClick={() => {
              handleConfirm();
            }}
            type={'outlined'}
          />
        </div>
      </div>
    </ModalCore>
  );
};

export default ModalChangePasswordSuccess;
