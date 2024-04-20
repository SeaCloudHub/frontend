import { uploadFilesApi } from '@/apis/user/storage/create-storage.api';
import IconifyIcon from '@/components/core/Icon/IConCore';
import Dropdown, { MenuItem } from '@/components/core/drop-down/Dropdown';
import ModalCreateFolder from '@/components/core/modal/ModalCreateFolder';
import ProgressIndicator from '@/components/core/progress-indicator/ProgressIndicator';
import { useProgressIndicator } from '@/store/storage/progressIndicator.store';
import { useStorageStore } from '@/store/storage/storage.store';
import { toastError } from '@/utils/toast-options/toast-options';
import { ApiGenericError } from '@/utils/types/api-generic-error.type';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';

type AddFileMenuProps = {
  shrinkMode?: boolean;
};

const AddFileMenu = ({ shrinkMode }: AddFileMenuProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const rootId = useStorageStore((state) => state.rootId);
  const setFileNames = useProgressIndicator((state) => state.setFileNames);
  const uploadFilesMutation = useMutation({
    mutationFn: (files: File[]) => {
      return uploadFilesApi({ files: files, id: rootId });
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: (data) => {
      console.log(data.data);
      // setFileNames(data.data.map((item) => item.name));
    },
  });
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      console.log(filesArray);
      await uploadFilesMutation.mutateAsync(filesArray);
    }
  };
  const handleFolderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const folderInput = e.target;
    const fileList = folderInput.files;
    if (fileList && fileList.length > 0) {
      const selectedFolder = fileList[0];
      const folderName = selectedFolder.webkitRelativePath.split('/')[0];
      const listFilesAndFolders = (directory: string, files: FileList) => {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const relativePath = file.webkitRelativePath;
          const parts = relativePath.split('/');
          if (parts[0] === directory) {
            if (parts.length === 1) {
              console.log('File inside', directory, ':', parts[1]);
            } else {
              listFilesAndFolders(parts.slice(1).join('/'), files);
            }
          }
        }
      };

      listFilesAndFolders(folderName, fileList);
    }
  };

  const toggleFolderPicker = () => {
    if (folderInputRef.current) {
      folderInputRef.current.click();
    }
  };

  const toggleFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const toggleCreateFolder = () => {
    setCreateModal(true);
  };
  const onCreateModalResponse = (data: any) => {
    if (data != false) {
      console.log(data);
    }
    setCreateModal(false);
  };

  const addFileMenu: MenuItem[][] = [
    [{ label: 'New Folder', icon: <IconifyIcon icon={'lets-icons:folder-add-light'} />, action: toggleCreateFolder }],
    [
      { label: 'File Upload', icon: <IconifyIcon icon={'ic:baseline-upload-file'} />, action: toggleFilePicker },
      {
        label: 'Folder Upload',
        icon: <IconifyIcon icon={'uil:folder-upload'} />,
        action: toggleFolderPicker,
      },
    ],
  ];

  const [createModal, setCreateModal] = useState<boolean>(false);
  return (
    <>
      <Dropdown
        button={
          <div className='mt-5 flex cursor-pointer items-center rounded-full px-4 py-1 text-[#063768] hover:bg-gray-400'>
            <IconifyIcon icon={'mdi:create-new-folder-outline'} fontSize={35} />
            {!shrinkMode && <span className='font-bold'>New</span>}
          </div>
        }
        items={addFileMenu}
        left={false}
      />
      <input ref={fileInputRef} id='fileInput' type='file' style={{ display: 'none' }} onChange={handleFileUpload} multiple />
      <input
        ref={folderInputRef}
        id='folderInput'
        type=''
        directory=''
        webkitdirectory=''
        style={{ display: 'none' }}
        onChange={handleFolderUpload}
        multiple={false}
      />
      {createModal && (
        <ModalCreateFolder
          isOpen={createModal}
          handleConfirm={() => {
            setCreateModal(false);
          }}
        />
      )}
      <ProgressIndicator />
    </>
  );
};

export default AddFileMenu;
