import { createFolderApi } from '@/apis/user/storage/storage.api';
import { toastError } from '@/utils/toast-options/toast-options';
import { ApiGenericError } from '@/utils/types/api-generic-error.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ModalCore from './ModalCore';

type ModalCreateFolderProps = {
  isOpen: boolean;
  handleConfirm: (data?: any) => void;
  dirId?: string;
};

const ModalCreateFolder = ({ isOpen, handleConfirm, dirId }: ModalCreateFolderProps) => {
  const [folderName, setFolderName] = useState<string>('');
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(event.target.value);
  };
  const createFolderMutation = useMutation({
    mutationFn: () => {
      const data = queryClient.getQueriesData({ queryKey: ['entry-metadata'] });
      const dirIdFromQueryData = data?.[0]?.[0]?.[1] as string;
      console.log('[ModalCreateFolder] dirIdFromQueryData', dirIdFromQueryData);
      return createFolderApi({ id: dirId || dirIdFromQueryData, name: folderName });
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: (data) => {
      console.log(data.data);
    },
  });

  const queryClient = useQueryClient();

  return (
    <ModalCore
      open={isOpen}
      width={'30%'}
      closeOutside={() => {
        handleConfirm(false);
      }}>
      <div className='mb-3 flex w-full flex-col space-y-3'>
        <h3 className='statement-bold text-2xl'>New folder</h3>
        <div className='mt-6  gap-5'>
          <input
            className='border-textC outline-textC2 w-full rounded-md border py-2 indent-5'
            type='text'
            placeholder='Untitled folder'
            value={folderName}
            onChange={onInputChange}
          />
          <div className=' text-textC2 mt-4 flex w-full justify-end space-x-5 pr-3 font-medium'>
            <button type='button' onClick={() => handleConfirm(false)} className='rounded-full px-3 py-2 hover:bg-blue-100'>
              Cancel
            </button>
            <button
              onClick={async () => {
                await createFolderMutation.mutateAsync();
                handleConfirm(true);
                queryClient.invalidateQueries({ queryKey: ['mydrive-entries'] });
              }}
              className='rounded-full px-3 py-2 hover:bg-blue-100'>
              Create
            </button>
          </div>
        </div>
      </div>
    </ModalCore>
  );
};

export default ModalCreateFolder;
