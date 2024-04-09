import { useState } from 'react';
import IconifyIcon from '../Icon/IConCore';
import ButtonContainer from '../button/ButtonContainer';
import ModalCore from './ModalCore';
type ModalChooseFileProps = {
  title: string;
  isOpen: boolean;
  fileIcon?: string;
  handleConfirm: (data?: File) => void;
};

const ModalChooseFile = ({ title, isOpen, handleConfirm, fileIcon }: ModalChooseFileProps) => {
  const [file, setFile] = useState<File | null>(null);
  const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <ModalCore open={isOpen} width={'40%'} closeOutside={handleConfirm}>
      <div className='relative mb-3 min-h-[150px] w-full flex-col space-y-3 md:flex'>
        <h3 className='statement-bold text-[24px]'>{title}</h3>
        <div className='flex w-full flex-col space-y-2'>
          <label
            htmlFor='upload-photo'
            className='flex w-fit items-center justify-center space-x-2 rounded-lg bg-blue-100 px-2 px-3 py-2'>
            <IconifyIcon icon='tabler:upload' color='blue' />
            <p className='statement-upper-medium text-blue-600'>Add file</p>
          </label>
          {file && (
            <div className='flex items-center space-x-1'>
              <IconifyIcon icon={fileIcon!} /> <p className='statement-upper-medium '>{file.name}</p>
            </div>
          )}
        </div>
        <div className='absolute -bottom-1 right-0 flex items-center justify-end gap-5'>
          <p
            onClick={() => {
              handleConfirm(undefined);
            }}
            className='statement-upper-medium pointer cursor-pointer text-blue-600'>
            Cancle
          </p>
          <ButtonContainer
            borderRadius={15}
            tooltip={'Upload'}
            title='Upload'
            background='#0b57d0'
            onClick={() => {
              handleConfirm(file!);
            }}
          />
          <input type='file' accept='.csv' style={{ display: 'none' }} id='upload-photo' onChange={handleImageSelection} />
        </div>
      </div>
    </ModalCore>
  );
};

export default ModalChooseFile;
