import { getFileIcon } from '@/utils/function/validateFileType';
import { Dialog, DialogContent, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { memo, useEffect, useState } from 'react';
import IconifyIcon from '../../Icon/IConCore';
import ButtonCore from '../../button/ButtonCore';
import ButtonIcon from '../../button/ButtonIcon';
import MenuCore from '../../menu/MenuCore';
import { MenuItemCoreProps } from '../../menu/MenuItem';

type FileViewerContainerProps = {
  open: boolean;
  fileName?: string;
  fileType?: string;
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

const FileViewerContainer: React.FC<FileViewerContainerProps> = ({ isCloseOutside, closeOutside, open, fileName, fileType }) => {
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction='up' ref={ref} {...props} />;
  });
  const [fileViewerActions, setFileViewerActions] = useState<MenuItemCoreProps[]>([]);
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

  const FileIcon = getFileIcon('pdf') as React.ReactNode;

  return (
    <Dialog onClose={isCloseOutside ? closeOutside : () => {}} open={open} fullScreen TransitionComponent={Transition}>
      <DialogTitle
        className='md:text-md flex h-[54px] items-center justify-between border-b  py-0'
        sx={{
          fontFamily: 'bold',
          fontSize: { sm: '16px', xs: '12px' },
          paddingX: { sm: '10px', xs: '2px' },
          paddingY: { sm: '10px', xs: '2px' },
        }}>
        <div className='z-10 flex w-1/3  flex-grow  items-center space-x-3'>
          <ButtonCore type='contained' title='Edit' icon={<IconifyIcon icon='basil:edit-outline' />} />
          <div cursor-pointer className='flex items-center space-x-2 rounded-md p-2 hover:bg-gray-100'>
            <IconifyIcon icon='codicon:share' fontSize={13} />
            <p className='text-sm'>Share</p>
          </div>
          <div cursor-pointer className='hidden items-center space-x-2 rounded-md p-2 hover:bg-gray-100 xs:flex'>
            <IconifyIcon icon='ic:sharp-link' fontSize={16} />
            <p className='text-sm'>Copy link</p>
          </div>
          <div cursor-pointer className={`hidden items-center space-x-2 rounded-md p-2 hover:bg-gray-100 sm:flex`}>
            <IconifyIcon icon='material-symbols-light:download' fontSize={16} />
            <p className='text-sm'>Download</p>
          </div>
          <MenuCore menuItems={fileViewerActions}>
            <ButtonIcon icon='majesticons:more-menu' size={20} />
          </MenuCore>
        </div>
        <div className='hidden flex-grow items-center justify-center md:flex'>
          <div className='flex max-h-[20px] items-center space-x-2'>
            <div>{FileIcon}</div>
            <p className='truncate text-sm font-bold'>{fileName || 'file01.pdf'}</p>
          </div>
        </div>
        <div className='flex w-1/3 flex-grow flex-nowrap items-center justify-end'>
          <ButtonCore type='text' title='Close' icon={<IconifyIcon icon='material-symbols:close' />} onClick={closeOutside} />
        </div>
      </DialogTitle>
      <DialogContent>
        <div className='mx-auto h-full max-w-7xl'>
          <iframe className='h-full w-full' src='https://pos.nvncdn.com/b153ea-53436/ps/20240102_LTQPw2eBHz.jpeg'></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default memo(FileViewerContainer);
