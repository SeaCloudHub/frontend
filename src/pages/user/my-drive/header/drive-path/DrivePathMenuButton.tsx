import IconifyIcon from '@/components/core/Icon/IConCore';
import Dropdown, { MenuItem } from '@/components/core/drop-down/Dropdown';
import CustomDropdown from '@/components/core/drop-down/CustomDropdown';
import ModalCreateFolder from '@/components/core/modal/ModalCreateFolder';
import ProgressIndicator from '@/components/core/progress-indicator/ProgressIndicator';
import { useProgressIndicator } from '@/store/storage/progressIndicator.store';
import React, { useRef, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useStorageStore } from '@/store/storage/storage.store';
import { uploadFiles } from '@/apis/drive/drive.api';
import { api } from '@/helpers/http/config.http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { ApiGenericError } from '@/utils/types/api-generic-error.type';
import { toast } from 'react-toastify';
import { toastError } from '@/utils/toast-options/toast-options';
import { uploadFilesApi } from '@/apis/user/storage/storage.api';

type DrivePathMenuButtonProps = {
  dirId: string;
  dirName: string;
  type?: 'MyDrive' | 'Shared' | 'Starred' | 'Trash' | 'Priority';
};

const DrivePathMenuButton: React.FC<DrivePathMenuButtonProps> = ({ dirId, dirName, type }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const [createModal, setCreateModal] = useState<boolean>(false);
  const { setFileNames } = useProgressIndicator();
  const { rootId } = useStorageStore();
  const queryClient = useQueryClient();
  const uploadFilesMutation = useMutation({
    mutationFn: (body: { files: File[]; id: string }) => {
      return uploadFilesApi(body);
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: (data) => {
      setFileNames(data.data.map((item) => item.name));
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, curDirId: string) => {
    const fileList = e.currentTarget.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      await uploadFilesMutation.mutateAsync({ files: filesArray, id: curDirId });
      queryClient.invalidateQueries({ queryKey: ['mydrive-entries'] });
    }
  };

  const handleFolderUpload = (e: React.ChangeEvent<HTMLInputElement>, curDirId: string) => {
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

  const rootMenuItems: MenuItem[][] = [
    [
      {
        label: 'New Folder',
        icon: <IconifyIcon icon={'lets-icons:folder-add-light'} />,
        action: () => setCreateModal(true),
      },
    ],
    [
      {
        label: 'File Upload',
        icon: <IconifyIcon icon={'ic:baseline-upload-file'} />,
        action: () => {
          if (fileInputRef.current) {
            fileInputRef.current.click();
          }
        },
      },
      {
        label: 'Folder Upload',
        icon: <IconifyIcon icon={'uil:folder-upload'} />,
        action: () => {
          if (folderInputRef.current) {
            folderInputRef.current.click();
          }
        },
      },
    ],
  ];

  const dirMenuItems: MenuItem[][] = [
    [
      {
        label: 'New folder',
        icon: <Icon icon='ic:outline-create-new-folder' />,
        action: () => setCreateModal(true),
        isHidden: type !== 'MyDrive',
      },
    ],
    [
      {
        label: 'Download',
        icon: <Icon icon='ic:outline-file-download' />,
        action: () => {},
      },
      {
        label: 'Rename',
        icon: <Icon icon='ic:round-drive-file-rename-outline' />,
        action: () => {},
        isHidden: type !== 'MyDrive',
      },
    ],
    [
      {
        label: 'Copy link',
        icon: <Icon icon='material-symbols:link' />,
        action: (text: string) => {},
      },
      {
        label: 'Share',
        icon: <Icon icon='lucide:user-plus' />,
        action: () => {},
      },
      {
        label: 'Move',
        icon: <Icon icon='mdi:folder-move-outline' />,
        action: () => {},
      },
      {
        label: 'Add to starred',
        icon: <Icon icon='material-symbols:star-outline' />,
        action: () => {},
      },
    ],
    [
      {
        label: 'File upload',
        icon: <Icon icon='ic:baseline-upload-file' />,
        action: () => {
          if (fileInputRef.current) {
            fileInputRef.current.click();
          }
        },
      },
      {
        label: 'Folder upload',
        icon: <Icon icon='mdi:folder-upload-outline' />,
        action: () => {
          if (folderInputRef.current) {
            folderInputRef.current.click();
          }
        },
      },
    ],
  ];

  return (
    <>
      <CustomDropdown
        button={
          <div className='my-0.5 flex h-9 cursor-pointer items-center rounded-full py-1 pl-4 pr-3 hover:bg-[#ededed]'>
            <div className='pb-1 text-2xl'>{dirName}</div>
            <Icon icon='mdi:caret-down' className='h-5 w-5' />
          </div>
        }
        items={dirId === rootId ? rootMenuItems : dirMenuItems}
      />
      <input
        ref={fileInputRef}
        id='fileInput'
        type='file'
        style={{ display: 'none' }}
        onChange={(e) => {
          handleFileUpload(e, dirId);
        }}
        multiple
      />
      <input
        ref={folderInputRef}
        id='folderInput'
        type=''
        directory=''
        webkitdirectory=''
        style={{ display: 'none' }}
        onChange={(e) => {
          handleFolderUpload(e, dirId);
        }}
        multiple={false}
      />
      {createModal && (
        <ModalCreateFolder
          dirId={dirId}
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

export default DrivePathMenuButton;
