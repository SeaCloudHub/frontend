import { uploadFilesApi } from '@/apis/user/storage/storage.api';
import IconifyIcon from '@/components/core/Icon/IConCore';
import CustomDropdown from '@/components/core/drop-down/CustomDropdown';
import { MenuItem } from '@/components/core/drop-down/Dropdown';
import ModalCreateFolder from '@/components/core/modal/ModalCreateFolder';
import { useSharedFileInfo } from '@/store/storage/file-share-info.store';
import { useProgressIndicator } from '@/store/storage/progressIndicator.store';
import { useStorageStore } from '@/store/storage/storage.store';
import { toastError } from '@/utils/toast-options/toast-options';
import { ApiGenericError } from '@/utils/types/api-generic-error.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

type AddFileMenuProps = {
  shrinkMode?: boolean;
};

const AddFileMenu = ({ shrinkMode }: AddFileMenuProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const rootId = useStorageStore((state) => state.rootId);
  const setFileNames = useProgressIndicator((state) => state.setFileNames);
  const [canCreate, setCanCreate] = useState(true);
  const location = useLocation();
  const { role } = useSharedFileInfo();
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
      queryClient.invalidateQueries({ queryKey: ['mydrive-entries'] });
    },
  });
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.currentTarget.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      await uploadFilesMutation.mutateAsync({ files: filesArray, id: dirId });
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

  useEffect(() => {
    if (location.pathname.includes('folder')) {
      if (role == 'editor' || role == 'owner') {
        setCanCreate(true);
      } else {
        setCanCreate(false);
      }
    } else {
      setCanCreate(true);
    }
  }, [location.pathname, role]);

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
    [{ label: 'File Upload', icon: <IconifyIcon icon={'ic:baseline-upload-file'} />, action: toggleFilePicker }],
  ];

  const [createModal, setCreateModal] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const dirId = useMemo(() => {
    if (location.pathname.includes('/dir/') || location.pathname.includes('/folder/')) {
      const lastSlashIndex = location.pathname.lastIndexOf('/');
      return location.pathname.substring(lastSlashIndex + 1);
    } else {
      return rootId;
    }
  }, [location]);
  return (
    <>
      <CustomDropdown
        disableAll={!canCreate}
        button={
          <button
            className={`flex w-40 items-center space-x-3 rounded-full bg-white ${shrinkMode ? '' : 'sidebar-item-lg'} px-4 py-2 duration-300 hover:bg-blue-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700`}>
            <IconifyIcon icon={'ic:outline-add'} fontSize={shrinkMode ? '1.4rem' : '1.5rem'} />
            {!shrinkMode && <span className='font-medium'>New</span>}
          </button>
        }
        items={addFileMenu}
      />
      <input
        ref={fileInputRef}
        id='fileInput'
        type='file'
        style={{ display: 'none' }}
        onChange={(e) => {
          handleFileUpload(e);
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
          const data = queryClient.getQueriesData({ queryKey: ['entry-metadata'] });
          const curDirId = data?.[0]?.[0]?.[1] as string;
          handleFolderUpload(e, curDirId);
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
    </>
  );
};

export default AddFileMenu;
