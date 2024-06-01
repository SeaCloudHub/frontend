import IconifyIcon from '@/components/core/Icon/IConCore';
import Dropdown, { MenuItem } from '@/components/core/drop-down/Dropdown';
import CustomDropdown from '@/components/core/drop-down/CustomDropdown';
import ModalCreateFolder from '@/components/core/modal/ModalCreateFolder';
import ProgressIndicator from '@/components/core/progress-indicator/ProgressIndicator';
import { useProgressIndicator } from '@/store/storage/progressIndicator.store';
import React, { useRef, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useStorageStore } from '@/store/storage/storage.store';
import { downloadMultipleEntries, uploadFiles } from '@/apis/drive/drive.api';
import { api } from '@/helpers/http/config.http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { ApiGenericError } from '@/utils/types/api-generic-error.type';
import { toast } from 'react-toastify';
import { toastError } from '@/utils/toast-options/toast-options';
import { uploadFilesApi } from '@/apis/user/storage/storage.api';
import { UserRole } from '@/utils/types/user-role.type';
import { isPermission } from '@/utils/function/permisstion.function';
import { UserRoleEnum } from '@/utils/enums/user-role.enum';
import { useEntries, useSelected } from '@/store/my-drive/myDrive.store';
import RenamePopUp from '@/components/core/pop-up/RenamePopUp';
import { CopyToClipboard } from '@/utils/function/copy.function';
import { useStarEntryMutation, useUnstarEntryMutation } from '@/hooks/drive.hooks';
import SharePopUp from '@/components/core/pop-up/SharePopUp';
import MovePopUp from '@/components/core/pop-up/MovePopUp';

type DrivePathMenuButtonProps = {
  path: { id: string; name: string; userRoles: UserRole[]; is_starred: boolean };
  type?: 'MyDrive' | 'Shared' | 'Starred' | 'Trash' | 'Priority';
  location?: { id: string; name: string };
};

const DrivePathMenuButton: React.FC<DrivePathMenuButtonProps> = ({ path, type, location }) => {
  console.log('DrivePathMenuButtonProps:', location);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const folderInputRef = useRef<HTMLInputElement>(null);
  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const [typePopUp, setTypePopUp] = useState<string>('');
  const { setFileNames } = useProgressIndicator();
  const { rootId } = useStorageStore();
  const queryClient = useQueryClient();
  const { listEntries } = useEntries();
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

  const starEntryMutation = useStarEntryMutation();
  const unStarEntryMutation = useUnstarEntryMutation();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, curDirId: string) => {
    const fileList = e.currentTarget.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      await uploadFilesMutation.mutateAsync({ files: filesArray, id: curDirId });
      queryClient.invalidateQueries({ queryKey: ['mydrive-entries'] });
    }
  };

  // const handleFolderUpload = (e: React.ChangeEvent<HTMLInputElement>, curDirId: string) => {
  //   const folderInput = e.target;
  //   const fileList = folderInput.files;
  //   if (fileList && fileList.length > 0) {
  //     const selectedFolder = fileList[0];
  //     const folderName = selectedFolder.webkitRelativePath.split('/')[0];
  //     const listFilesAndFolders = (directory: string, files: FileList) => {
  //       for (let i = 0; i < files.length; i++) {
  //         const file = files[i];
  //         const relativePath = file.webkitRelativePath;
  //         const parts = relativePath.split('/');
  //         if (parts[0] === directory) {
  //           if (parts.length === 1) {
  //             console.log('File inside', directory, ':', parts[1]);
  //           } else {
  //             listFilesAndFolders(parts.slice(1).join('/'), files);
  //           }
  //         }
  //       }
  //     };

  //     listFilesAndFolders(folderName, fileList);
  //   }
  // };

  const rootMenuItems: MenuItem[][] = [
    [
      {
        label: 'New Folder',
        icon: <IconifyIcon icon={'lets-icons:folder-add-light'} />,
        action: () => {
          setOpenPopUp(true), setTypePopUp('Create');
        },
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
    ],
  ];

  const dirMenuItems: MenuItem[][] = [
    [
      {
        label: 'New folder',
        icon: <Icon icon='ic:outline-create-new-folder' />,
        action: () => {
          console.log('Create new folder');
          setOpenPopUp(true), setTypePopUp('Create');
        },
        isHidden: isPermission(path.userRoles) < UserRoleEnum.EDITOR,
      },
    ],
    [
      {
        label: 'Download',
        icon: <Icon icon='ic:outline-file-download' />,
        action: () => {
          downloadMultipleEntries({
            ids: listEntries.map((entry) => entry.id),
            parent_id: path.id,
          });
        },
      },
      {
        label: 'Rename',
        icon: <Icon icon='ic:round-drive-file-rename-outline' />,
        action: () => {
          setOpenPopUp(true), setTypePopUp('Rename');
        },
        isHidden: isPermission(path.userRoles) < UserRoleEnum.EDITOR,
      },
    ],
    [
      {
        label: 'Copy link',
        icon: <Icon icon='material-symbols:link' />,
        action: () => {
          const link = `${window.location.origin}/drive/folder/${path.id}`;
          CopyToClipboard(link);
        },
      },
      {
        label: 'Share',
        icon: <Icon icon='lucide:user-plus' />,
        action: () => {
          setOpenPopUp(true), setTypePopUp('Share');
        },
        isHidden: isPermission(path.userRoles) < UserRoleEnum.EDITOR,
      },
      {
        label: 'Move',
        icon: <Icon icon='mdi:folder-move-outline' />,
        action: () => {
          setOpenPopUp(true), setTypePopUp('Move');
        },
        isHidden: isPermission(path.userRoles) < UserRoleEnum.EDITOR,
      },
      ...(path.is_starred
        ? [
            {
              label: 'Remove from starred',
              icon: <Icon icon='material-symbols:star' />,
              action: () => {
                unStarEntryMutation.mutate({ file_ids: [path.id] });
              },
            },
          ]
        : [
            {
              label: 'Add to starred',
              icon: <Icon icon='material-symbols:star-outline' />,
              action: () => {
                starEntryMutation.mutate({ file_ids: [path.id] });
              },
            },
          ]),
    ],
    [
      {
        label: 'File upload',
        icon: <Icon icon='ic:baseline-upload-file' />,
        action: () => {
          // if (fileInputRef.current) {
          fileInputRef?.current.click();
          // }
        },
        isHidden: isPermission(path.userRoles) < UserRoleEnum.EDITOR,
      },
    ],
  ];

  return (
    <>
      <CustomDropdown
        button={
          <div className='my-0.5 flex h-9 cursor-pointer items-center rounded-full py-1 pl-4 pr-3 hover:bg-[#ededed] active:brightness-90 dark:hover:bg-slate-500'>
            <div className='max-w-fit truncate pb-1 text-2xl'>{path.name}</div>
            <Icon icon='mdi:caret-down' className='h-5 w-5' />
          </div>
        }
        items={path.id === rootId ? rootMenuItems : dirMenuItems}
      />
      <input
        ref={fileInputRef}
        id='fileInput'
        type='file'
        style={{ display: 'none' }}
        onChange={(e) => {
          handleFileUpload(e, path.id);
        }}
        multiple
      />
      {openPopUp && typePopUp === 'Create' && (
        <ModalCreateFolder dirId={path.id} isOpen={openPopUp} handleConfirm={() => setOpenPopUp(false)} />
      )}
      {openPopUp && typePopUp === 'Rename' && (
        <RenamePopUp open={openPopUp} handleClose={() => setOpenPopUp(false)} id={path.id} name={path.name} />
      )}
      {openPopUp && typePopUp === 'Share' && (
        <SharePopUp open={openPopUp} handleClose={() => setOpenPopUp(false)} title={path.name} fileId={path.id} />
      )}
      {openPopUp && typePopUp === 'Move' && (
        <MovePopUp
          open={openPopUp}
          handleClose={() => setOpenPopUp(false)}
          title={path.name}
          ids={[path.id]}
          location={location}
        />
      )}
    </>
  );
};

export default DrivePathMenuButton;
