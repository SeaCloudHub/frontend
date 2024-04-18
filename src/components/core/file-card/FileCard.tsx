import { PencilIcon, ShareIcon, TrashIcon } from '@heroicons/react/16/solid';
// import { MusicalNoteIcon, PhotoIcon } from '@heroicons/react/24/outline';
// import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { CopyToClipboard } from '@/utils/function/copy.function';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Info } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Dropdown, { MenuItem, classNames } from '../drop-down/Dropdown';
// import FileViewerContainer from '../file-viewers/file-viewer-container/FileViewerContainer';
import { useDrawer } from '@/store/my-drive/myDrive.store';
import FileViewerContainer from '../file-viewers/file-viewer-container/FileViewerContainer';
import MovePopUp from '../pop-up/MovePopUp';
import SharePopUp from '../pop-up/SharePopUp';
import { useMutation } from '@tanstack/react-query';
import { CopyFileREQ } from '@/apis/drive/request/copy.request';
import { copyFiles } from '@/apis/drive/drive.api';
import { isAxiosError } from 'axios';
import { ApiGenericError } from '@/utils/types/api-generic-error.type';
import { toast } from 'react-toastify';
import { toastError } from '@/utils/toast-options/toast-options';
import { useSession } from '@/store/auth/session';
import { useCopyMutation } from '@/hooks/drive.hooks';

type FileCardProps = {
  title: string;
  icon?: React.ReactNode;
  preview?: React.ReactNode;
  id: string;
  onClick?: () => void;
  isSelected?: boolean;
};

export const fileOperation = [
  { icon: <Info />, label: 'FIle infomation' },
  { icon: <PencilIcon />, label: 'Rename file' },
  { icon: <ShareIcon />, label: 'Share file' },
  { icon: <TrashIcon />, label: 'Delete file' },
];

const FileCard: React.FC<FileCardProps> = ({ title, icon, preview, id, isSelected, onClick }) => {
  const [fileViewer, setFileViewer] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [type, setType] = useState<'move' | 'share' | null>(null);
  const openDrawer = useDrawer((state) => state.openDrawer);

  const { root_id } = useSession();

  const copyMutation = useCopyMutation();

  const menuItems: MenuItem[][] = [
    [{ label: 'Preview', icon: <Icon icon='material-symbols:visibility' />, action: () => {} }],
    [
      { label: 'Download', icon: <Icon icon='ic:outline-file-download' />, action: () => {} },
      {
        label: 'Rename',
        icon: <Icon icon='ic:round-drive-file-rename-outline' />,
        action: () => {},
      },
      {
        label: 'Make a copy',
        icon: <Icon icon='material-symbols:content-copy-outline' />,
        action: () => {
          copyMutation.mutate({ ids: [id], to: root_id });
        },
      },
    ],
    [
      {
        label: 'Copy link',
        icon: <Icon icon='material-symbols:link' />,
        action: (text: string) => {
          CopyToClipboard(text);
        },
      },
      {
        label: 'Share',
        icon: <Icon icon='lucide:user-plus' />,
        action: () => {
          setType('share');
          setIsPopUpOpen(true);
        },
      },
    ],
    [
      {
        label: 'Move',
        icon: <Icon icon='mdi:folder-move-outline' />,
        action: () => {
          console.log('[FileCard] add shortcut ' + id);
          setType('move');
          setIsPopUpOpen(true);
        },
      },
      {
        label: 'Add shortcut',
        icon: <Icon icon='material-symbols:add-to-drive' />,
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
        label: 'Detail',
        icon: <Icon icon='mdi:information-outline' />,
        action: () => {
          console.log('[FileCard] detail ' + id);
          openDrawer(id);
        },
      },
      { label: 'Activity', icon: <Icon icon='mdi:graph-line-variant' />, action: () => {} },
      { label: 'Lock', icon: <Icon icon='mdi:lock-outline' />, action: () => {} },
    ],
    [{ label: 'Move to trash', icon: <Icon icon='fa:trash-o' />, action: () => {} }],
  ];

  return (
    <>
      {fileViewer && (
        <FileViewerContainer
          open={fileViewer}
          closeOutside={() => {
            setFileViewer(false);
          }}
          fileName={title}
          fileType={''}
        />
      )}
      <div
        onDoubleClick={() => {
          setFileViewer(true);
        }}
        onClick={onClick}
        className={classNames(
          'flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-xl px-2 shadow-sm',
          isSelected ? 'bg-[#c2e7ff]' : 'bg-[#f0f4f9] hover:bg-[#dfe3e7]',
        )}>
        <div className='flex w-full items-center justify-between px-1 py-3'>
          <div className='flex max-w-[calc(100%-24px)] items-center space-x-4'>
            <div className='h-6 w-6 min-w-fit'>{icon}</div>
            <Tooltip title={title}>
              <div className='truncate text-sm font-medium'>{title}</div>
            </Tooltip>
          </div>
          <Dropdown
            button={<BsThreeDotsVertical className='h-6 w-6 rounded-full p-1 hover:bg-slate-300' />}
            items={menuItems}
            left={true}
          />
        </div>
        <div className='mb-2 flex h-full w-full items-center justify-center overflow-hidden rounded-md bg-white'>{preview}</div>
        {type === 'share' && <SharePopUp open={isPopUpOpen} handleClose={() => setIsPopUpOpen(false)} title={title} />}
        {type === 'move' && (
          <MovePopUp
            open={isPopUpOpen}
            handleClose={() => setIsPopUpOpen(false)}
            title={title}
            location={'adfasdfasdf asdfasdfasdf asdfasdf'}
          />
        )}
      </div>
    </>
  );
};

export default FileCard;
