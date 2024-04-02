import ButtonContainer from '../button/ButtonContainer';
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
          <img className='mb-4 h-24 w-24 object-contain' src={import.meta.env.VITE_SUCCESS_ICON as string} alt='Success' />
          <p className='text-lg font-semibold text-gray-800'>Password Changed Successfully</p>
          <p className='mb-6 text-sm text-gray-600'>Please login again.</p>
          <ButtonContainer title='OK' onClick={handleConfirm} />
        </div>
      </div>
    </ModalCore>
  );
};

export default ModalChangePasswordSuccess;
