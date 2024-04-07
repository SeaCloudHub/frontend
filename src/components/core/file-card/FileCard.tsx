import { PencilIcon, ShareIcon, TrashIcon } from '@heroicons/react/16/solid';
// import { MusicalNoteIcon, PhotoIcon } from '@heroicons/react/24/outline';
// import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { useDrawer } from '@/store/my-drive/myDrive.store';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Info } from '@mui/icons-material';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Dropdown, { MenuItem } from '../drop-down/Dropdown';

type FileCardProps = {
  title: string;
  icon?: React.ReactNode;
  preview?: React.ReactNode;
  id: string;
};

export const fileOperation = [
  { icon: <Info />, label: 'FIle infomation' },
  { icon: <PencilIcon />, label: 'Rename file' },
  { icon: <ShareIcon />, label: 'Share file' },
  { icon: <TrashIcon />, label: 'Delete file' },
];

const FileCard: React.FC<FileCardProps> = (props) => {
  const { title, icon, preview, id } = props;
  const openDrawer = useDrawer((state) => state.openDrawer);
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
        action: () => {},
      },
    ],
    [
      { label: 'Copy link', icon: <Icon icon='material-symbols:link' />, action: () => {} },
      { label: 'Share', icon: <Icon icon='lucide:user-plus' />, action: () => {} },
    ],
    [
      { label: 'Move', icon: <Icon icon='mdi:folder-move-outline' />, action: () => {} },
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
    <div className='flex h-full w-full flex-col items-center justify-center rounded-xl bg-surfaceContainerLow px-2 shadow-sm hover:bg-surfaceDim'>
      <div className='flex w-full items-center justify-between px-1 py-3'>
        <div className='flex max-w-[calc(100%-24px)] items-center space-x-4'>
          <div className='h-6 w-6 min-w-fit'>{icon}</div>
          <div className='truncate text-sm font-medium'>{title}</div>
        </div>
        <Dropdown
          button={<BsThreeDotsVertical className='h-6 w-6 rounded-full p-1 hover:bg-slate-300' />}
          items={menuItems}
          left={true}
        />
      </div>
      <div className='mb-2 flex h-full w-full items-center justify-center overflow-hidden rounded-md bg-white'>{preview}</div>
    </div>
  );
};

export default FileCard;
