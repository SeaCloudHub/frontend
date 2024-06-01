import { useScreenHook } from '../../../hooks/useScreenHook';
import IconifyIcon from '../Icon/IConCore';
import ButtonContainer from '../button/ButtonContainer';
import ButtonIcon from '../button/ButtonIcon';
import ModalCore from './ModalCore';

export type AuthInfo = {
  email: string;
  password: string;
};

type ModalAddUserSuccessProps = {
  data: AuthInfo[] | AuthInfo;
  single: boolean;
  isOpen: boolean;
  handleConfirm: (data?: any) => void;
};

const ModalAddUserSuccess = ({ isOpen, handleConfirm, data, single }: ModalAddUserSuccessProps) => {
  const flex = !useScreenHook(500);

  return (
    <ModalCore open={isOpen} width='70%' closeOutside={handleConfirm} isCloseOutside={true}>
      <div className='mb-3 flex w-full justify-between'>
        <div className='flex items-center justify-center'>
          <img className='mr-2 h-5 w-5 object-contain' src={(import.meta.env.BASE_URL + 'success.png') as string} alt='Success' />
          <p className='h3'>Success</p>
        </div>
        <ButtonIcon icon='ic:round-close' onClick={() => handleConfirm(false)} />
      </div>
      <div className='max-h-[300px] w-full overflow-y-auto'>
        <p className='mb-3 font-semibold'>Authentication Information</p>
        {single ? (
          <div className='ml-3'>
            <div className='flex items-center space-x-1'>
              <p className='font-bold'>Email:</p>
              <p className='italic'>{(data as AuthInfo).email}</p>
            </div>
            <div className='flex items-center space-x-1'>
              <p className='font-bold'>Password:</p>
              <p className='italic'>{(data as AuthInfo).password}</p>
            </div>
          </div>
        ) : (
          (data as AuthInfo[]).map((item, index) => (
            <div key={index} className='mb-2 ml-3'>
              <div className='flex items-center space-x-1'>
                <p className='font-bold'>Email:</p>
                <p className='italic'>{item.email}</p>
              </div>
              <div className='flex items-center space-x-1'>
                <p className='font-bold'>Password:</p>
                <p className='italic'>{item.password}</p>
              </div>
            </div>
          ))
        )}
        <div className='float-right'>
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

export default ModalAddUserSuccess;
