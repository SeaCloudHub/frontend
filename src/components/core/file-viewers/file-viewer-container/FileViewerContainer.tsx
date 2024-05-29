import { downloadFile } from '@/apis/drive/drive.api';
import { downloadFileApi } from '@/apis/user/storage/storage.api';
import { LocalEntry, useDownloadMutation } from '@/hooks/drive.hooks';
import { getFileIcon } from '@/utils/function/validateFileType';
import { toastError } from '@/utils/toast-options/toast-options';
import { ApiGenericError } from '@/utils/types/api-generic-error.type';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import IconifyIcon from '../../Icon/IConCore';
import ButtonCore from '../../button/ButtonCore';
import ButtonIcon from '../../button/ButtonIcon';
import MenuCore from '../../menu/MenuCore';
import { MenuItemCoreProps } from '../../menu/MenuItem';
import SharePopUp from '../../pop-up/SharePopUp';
import Viewer from './Viewer';

type FileViewerContainerProps = {
  canDelete?: boolean;
  canShare?: boolean;
  open: boolean;
  fileInfo: LocalEntry;
  isCloseOutside?: boolean;
  closeOutside?: (data?: any) => void;
};

const totalFileViewerActions: Record<string, MenuItemCoreProps> = {
  delete: {
    icon: 'material-symbols-light:delete-outline',
    onClick: () => {},
    title: 'Delete',
  },
  print: {
    icon: 'uit:print',
    onClick: () => {},
    title: 'Print',
  },
  fileHistory: {
    icon: 'system-uicons:files-history',
    onClick: () => {},
    title: 'File history',
  },
  copyLink: {
    icon: 'ic:sharp-link',
    onClick: () => {},
    title: 'Copy link',
  },
  share: {
    icon: 'codicon:share',
    onClick: () => {},
    title: 'Share',
  },
  download: {
    icon: 'material-symbols-light:download',
    onClick: () => {},
    title: 'Download',
  },
};
const FileViewerContainer: React.FC<FileViewerContainerProps> = ({
  isCloseOutside,
  closeOutside,
  open,
  fileInfo,
  canDelete,
  canShare,
}) => {
  const [fileViewerActions, setFileViewerActions] = useState<MenuItemCoreProps[]>([]);
  const [fileIcon, setFileIcon] = useState<React.ReactNode | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [openShare, setOpenShare] = useState<boolean>(false);

  const downloadMutation = useDownloadMutation();

  useEffect(() => {
    function updateActions() {
      let actions: MenuItemCoreProps[] = [
        totalFileViewerActions['delete'],
        totalFileViewerActions['print'],
        totalFileViewerActions['fileHistory'],
      ];
      if (window.innerWidth < 640) {
        actions.push(totalFileViewerActions['download']);
      } else {
        const download = totalFileViewerActions['download'];
        actions = actions.filter((action) => action !== download);
      }

      if (window.innerWidth < 375) {
        actions.push(totalFileViewerActions['copyLink']);
      } else {
        const copyLink = totalFileViewerActions['copyLink'];
        actions = actions.filter((action) => action !== copyLink);
      }

      setFileViewerActions(actions);
    }

    updateActions();
    window.addEventListener('resize', updateActions);
    return () => window.removeEventListener('resize', updateActions);
  }, []);

  const getFileBinary = async () => {
    try {
      const res = await downloadFileApi(fileInfo.id);
      const blob = new Blob([res.data], { type: res.headers['content-type'] });
      const fileName = fileInfo.title || 'file';
      const file = new File([blob], fileName, { type: blob.type });
      setFile(file);
    } catch (error) {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    }
  };
  useEffect(() => {
    if (fileInfo.id) {
      const fetchData = async () => {
        if (fileInfo.id) {
          await getFileBinary();
        }
      };
      fetchData();
      const FileIcon = getFileIcon(fileInfo.title.split('.').pop().toString()) as React.ReactNode;
      setFileIcon(FileIcon);
    }
  }, [fileInfo]);
  const onDownloadClick = () => {
    downloadMutation.mutate({ id: fileInfo.id, name: fileInfo.title });
  };
  return (
    <>
      <Dialog onClose={isCloseOutside ? closeOutside : () => {}} open={open} fullScreen>
        <DialogTitle
          className='md:text-md flex h-[54px] items-center justify-between border-b  bg-content-bg py-0  dark:bg-content-bg-dark dark:text-icons-color-dark'
          sx={{
            fontFamily: 'bold',
            fontSize: { sm: '16px', xs: '12px' },
            paddingX: { sm: '10px', xs: '2px' },
            paddingY: { sm: '10px', xs: '2px' },
          }}>
          <div className='z-10 flex w-1/3  flex-grow  items-center space-x-3'>
            {/* <ButtonCore type='contained' title='Edit' icon={<IconifyIcon icon='basil:edit-outline' />} /> */}
            {canShare && (
              <div
                className='flex  cursor-pointer  items-center space-x-2 rounded-md p-2 hover:bg-gray-100'
                onClick={() => {
                  setOpenShare(true);
                }}>
                <IconifyIcon icon='codicon:share' fontSize={13} />
                <p className='text-sm'>Share</p>
              </div>
            )}
            <div className='hidden cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-gray-100 xs:flex'>
              <IconifyIcon icon='ic:sharp-link' fontSize={16} />
              <p className='text-sm'>Copy link</p>
            </div>
            <div
              onClick={() => {
                onDownloadClick();
              }}
              className={` hidden cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-gray-100 sm:flex`}>
              <IconifyIcon icon='material-symbols-light:download' fontSize={16} />
              <p className='text-sm'>Download</p>
            </div>
            <MenuCore menuItems={fileViewerActions}>
              <ButtonIcon icon='majesticons:more-menu' size={20} />
            </MenuCore>
          </div>
          <div className='hidden flex-grow items-center justify-center md:flex'>
            <div className='flex max-h-[20px] items-center space-x-2'>
              <div>{fileIcon}</div>
              <p className='truncate text-sm font-bold'>{fileInfo && fileInfo.title}</p>
            </div>
          </div>
          <div className='flex w-1/3 flex-grow flex-nowrap items-center justify-end'>
            <ButtonCore
              type='text'
              title='Close'
              icon={<IconifyIcon icon='material-symbols:close' />}
              onClick={() => {
                closeOutside && closeOutside(false);
              }}
            />
          </div>
        </DialogTitle>
        <DialogContent
          className='bg-content-bg  dark:bg-content-bg-dark dark:text-icons-color-dark'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          {file && <Viewer file={file} fileId={fileInfo.id} fileName={fileInfo.title} fileType={fileInfo.fileType} />}
          {!file && <img src={(import.meta.env.BASE_URL + 'loader.svg') as string} className='mx-auto  h-[50px] w-[50px]' />}
        </DialogContent>
      </Dialog>
      {openShare && (
        <SharePopUp fileId={fileInfo.id} open={openShare} handleClose={() => setOpenShare(false)} title={fileInfo.title} />
      )}
    </>
  );
};
export default FileViewerContainer;
