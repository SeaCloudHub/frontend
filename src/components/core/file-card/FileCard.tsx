import { PencilIcon, ShareIcon, TrashIcon } from '@heroicons/react/16/solid';
import {
  DocumentIcon,
  MusicalNoteIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { Article, Info, InsertDriveFile } from '@mui/icons-material';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Dropdown from '../drop-down/Dropdown';
import { useDrawer } from '@/pages/user/my-drive/MyDrive';
import { Icon } from '@iconify/react/dist/iconify.js';

type FileCardProps = {
  title: string;
  icon: React.ReactNode;
  preview: React.ReactNode;
  id: string;
};

export const fileOperation = [
  { icon: <Info />, label: 'FIle infomation' },
  { icon: <PencilIcon />, label: 'Rename file' },
  { icon: <ShareIcon />, label: 'Share file' },
  { icon: <TrashIcon />, label: 'Delete file' },
];

const supportedFileTypes = [
  { type: 'doc', icon: <DocumentTextIcon /> },
  { type: 'docx', icon: <DocumentTextIcon /> },
  { type: 'mp3', icon: <MusicalNoteIcon /> },
  { type: 'png', icon: <PhotoIcon /> },
  { type: 'jpg', icon: <PhotoIcon /> },
];

const FileCard: React.FC<FileCardProps> = (props) => {
  const { title, icon, preview, id } = props;
  const setDrawerOpen = useDrawer((state) => state.setDrawerOpen);
  const menuItems = [
    [{ label: 'Preview', icon: <Icon icon="material-symbols:visibility" /> }],
    [
      { label: 'Download', icon: <Icon icon="ic:outline-file-download" /> },
      {
        label: 'Rename',
        icon: <Icon icon="ic:round-drive-file-rename-outline" />,
      },
      {
        label: 'Make a copy',
        icon: <Icon icon="material-symbols:content-copy-outline" />,
      },
    ],
    [
      { label: 'Copy link', icon: <Icon icon="material-symbols:link" /> },
      { label: 'Share', icon: <Icon icon="lucide:user-plus" /> },
    ],
    [
      { label: 'Move', icon: <Icon icon="mdi:folder-move-outline" /> },
      {
        label: 'Add shortcut',
        icon: <Icon icon="material-symbols:add-to-drive" />,
      },
      {
        label: 'Add to starred',
        icon: <Icon icon="material-symbols:star-outline" />,
      },
    ],
    [
      {
        label: 'Detail',
        icon: <Icon icon="mdi:information-outline" />,
        action: setDrawerOpen,
      },
      { label: 'Activity', icon: <Icon icon="mdi:graph-line-variant" /> },
      { label: 'Lock', icon: <Icon icon="mdi:lock-outline" /> },
    ],
    [{ label: 'Move to trash', icon: <Icon icon="fa:trash-o" /> }],
  ];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-surfaceContainerLow px-2 shadow-sm hover:bg-surfaceDim">
      <div className="flex w-full items-center justify-between px-1 py-3">
        <div className="flex items-center space-x-4">
          <div className="h-6 w-6">{icon}</div>
          <div className="... truncate text-sm font-medium">{title}</div>
        </div>
        <Dropdown
          button={
            <BsThreeDotsVertical className="h-6 w-6 rounded-full p-1 hover:bg-slate-300" />
          }
          items={menuItems}
          left={true}
        />
      </div>
      <div className="mb-2 flex w-full flex-1 items-center justify-center rounded-md bg-white">
        {preview}
      </div>
    </div>
  );
};

export default FileCard;
