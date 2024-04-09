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
import MovePopUp from '../pop-up/MovePopUp';
import SharePopUp from '../pop-up/SharePopUp';
import { useDrawer } from '@/store/my-drive/myDrive.store';

type FileCardProps = {
  title: string;
  icon?: React.ReactNode;
  preview?: React.ReactNode;
  id: string;
  onClick: (id: string) => void;
  selected: boolean;
};

export const fileOperation = [
  { icon: <Info />, label: 'FIle infomation' },
  { icon: <PencilIcon />, label: 'Rename file' },
  { icon: <ShareIcon />, label: 'Share file' },
  { icon: <TrashIcon />, label: 'Delete file' },
];

const FileCard: React.FC<FileCardProps> = ({ id, onClick, title, icon, preview, selected }) => {
  const [fileViewer, setFileViewer] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [type, setType] = useState<'move' | 'share' | null>(null);
  const { openDrawer } = useDrawer();

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
    <div
      className={classNames(
        'file-card',
        'flex h-full w-full flex-col items-center justify-center rounded-xl px-2 shadow-sm',
        selected ? 'bg-[#c2e7ff]' : 'bg-[#f0f4f9] hover:bg-[#dfe3e7]',
      )}
      onDoubleClick={() => {
        setFileViewer(true);
      }}
      onClick={() => onClick(id)}>
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
  );
};

export default FileCard;
