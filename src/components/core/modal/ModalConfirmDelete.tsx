import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import ButtonCore from '../button/ButtonCore';
import ButtonDelete from '../button/ButtonDelete';

type ModalConfirmDeleteProps = {
  message: string;
  loadingMessage?: string;
  isOpen: boolean;
  setIsOpen: (data?: any) => void;
  handleConfirm: () => void;
};

const ModalConfirmDelete = ({ message, loadingMessage, isOpen, setIsOpen, handleConfirm }: ModalConfirmDeleteProps) => {
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    setIsClick(false);
  }, [isOpen]);

  const clickConfirm = () => {
    setIsClick(true);
    handleConfirm();
  };

  return (
    <Modal
      open={isOpen}
      okButtonProps={{ style: { display: 'none' } }}
      cancelButtonProps={{ style: { display: 'none' } }}
      closable={false}
      width={460}>
      <p className='text-center text-lg font-semibold'>
        {isClick ? <>{loadingMessage ? loadingMessage : 'Deleting...'}</> : <>{message}</>}
      </p>
      {isClick ? (
        <div className='mt-6 flex justify-center'>
          <ClipLoader color='gray' />
        </div>
      ) : (
        <div className='mt-6 flex justify-center gap-4'>
          <ButtonCore type='secondary-outlined' text='취 소' onClick={() => setIsOpen(false)} />
          <ButtonDelete onClick={clickConfirm} />
        </div>
      )}
    </Modal>
  );
};

export default ModalConfirmDelete;
