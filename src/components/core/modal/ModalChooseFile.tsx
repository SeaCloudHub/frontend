// import { validateFileType } from '@/utils/function/validateFileType';
import { validateFileType } from '@/utils/function/validateFileType';
import { useState } from 'react';
import IconifyIcon from '../Icon/IConCore';
import ButtonContainer from '../button/ButtonContainer';
import ButtonCore from '../button/ButtonCore';
import ButtonIcon from '../button/ButtonIcon';
import ModalCore from './ModalCore';
type ModalChooseFileProps = {
  fileType?: string;
  isOpen: boolean;
  fileIcon?: string;
  handleConfirm: (data?: File) => void;
};

const ModalChooseFile = ({ isOpen, handleConfirm, fileIcon, fileType }: ModalChooseFileProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>('');
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const uploadedFile = event.target.files[0];
      handleFile(uploadedFile, fileType);
    }
  };
  const handleFile = async (file: File, fileType?: string) => {
    if (await validateFileType(file, fileType)) {
      setFile(file);
      setError(null);
    } else {
      setError('Invalid file type*');
    }
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    handleFile(droppedFile, fileType);
  };
  return (
    <ModalCore open={isOpen} width={'40%'} closeOutside={handleConfirm}>
      <div className='relative mb-3  w-full flex-col space-y-3 md:flex'>
        <div className='flex w-full flex-col space-y-2'>
          {!file && (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className=' border-gradient-to-r relative my-6 flex w-full flex-col items-center justify-center space-y-5  rounded-lg border-2 border-dashed border-blue-600 p-3 shadow-md '>
              <input
                type='file'
                className='absolute left-0 top-0 z-10 h-full w-full cursor-pointer opacity-0'
                accept={fileType}
                onChange={handleFileChange}
              />
              <h2 className='text-center font-bold uppercase text-blue-600'>Drop and drag file here</h2>
              <h3 className='uppercase text-blue-500'>OR</h3>
              <ButtonCore
                startIcon={<IconifyIcon icon={'tabler:cloud-down'} />}
                variant='contained'
                title='Upload file'
                contentColor='white'
                className='bg-gradient-to-r from-blue-400 to-blue-700 '
                component='label'
                htmlFor='file-input'
                type={'text'}
              />
              {error && <p className='italic text-red-700'>{error}</p>}
            </div>
          )}
          {file && (
            <div className='flex items-center space-x-1'>
              <IconifyIcon icon={fileIcon!} /> <p className='statement-upper-medium '>{file.name}</p>
              <ButtonIcon
                icon={'mdi:trash'}
                color='red'
                onClick={() => {
                  setFile(null);
                }}
              />
            </div>
          )}
        </div>
        <div className=' flex items-center justify-end gap-5'>
          <p
            onClick={() => {
              handleConfirm(undefined);
            }}
            className='statement-upper-medium pointer cursor-pointer  rounded-md px-3 py-2 text-blue-600 dark:hover:bg-slate-700 hover:bg-blue-100'>
            Cancel
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
        </div>
      </div>
    </ModalCore>
  );
};

export default ModalChooseFile;
