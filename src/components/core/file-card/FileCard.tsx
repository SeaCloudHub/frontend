import {
  EllipsisVerticalIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/16/solid';
import {
  DocumentIcon,
  MusicalNoteIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import {
  AspectRatio,
  Card,
  CardOverflow,
  IconButton,
  MenuButton,
  Typography,
} from '@mui/joy';
import React, { useState } from 'react';
import { DropDownMenu } from '../drop-down/DropDownMenu';
import { Article, Info, InsertDriveFile } from '@mui/icons-material';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
  MdContentCopy,
  MdDriveFileRenameOutline,
  MdLink,
  MdLockOutline,
  MdOpenWith,
  MdOutlineFileDownload,
  MdOutlineStarBorder,
  MdVisibility,
} from 'react-icons/md';
import { AiOutlineFolderOpen } from 'react-icons/ai';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { FaRegTrashCan } from 'react-icons/fa6';
import { FiUserPlus } from 'react-icons/fi';
import { LuFolderInput } from 'react-icons/lu';
import { VscGraphLine } from 'react-icons/vsc';
import FileMenu from '../drop-down/FileMenu';
import { userDrawer as useDrawer } from '@/components/layout/test/TuyenLayout';

// interface FileDetails {
//   id: string;
//   title: string;
//   size: string;
//   type?: string;
//   owner?: string;
//   modified?: string;
//   created?: string;
//   preview?: string;
// }

// interface FileCardProps extends FileDetails {
//   onClick?: () => void;
//   onDoubleClick?: () => void;
//   onFileInfo?: (id: string) => void;
// }

interface FileCardProps {
  title: string;
  icon: React.ReactNode;
  preview: React.ReactNode;
  id: string;
}

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
    [{ label: 'Preview', icon: <MdVisibility /> }],
    [
      { label: 'Download', icon: <MdOutlineFileDownload /> },
      { label: 'Rename', icon: <MdDriveFileRenameOutline /> },
      { label: 'Make a copy', icon: <MdContentCopy /> },
    ],
    [
      { label: 'Copy link', icon: <MdLink /> },
      { label: 'Share', icon: <FiUserPlus /> },
  ],
    [
      { label: 'Move', icon: <LuFolderInput /> },
      { label: 'Add to starred', icon: <MdOutlineStarBorder /> },
    ],
    [
      { label: 'Detail', icon: <IoMdInformationCircleOutline />, action: setDrawerOpen },
      { label: 'Activity', icon: <VscGraphLine /> },
      { label: 'Lock', icon: <MdLockOutline /> },
    ],
    [{ label: 'Move to trash', icon: <FaRegTrashCan /> }],
  ];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-surfaceContainerLow px-2 shadow-sm hover:bg-surfaceDim">
      <div className="flex w-full items-center justify-between px-1 py-3">
        <div className="flex items-center space-x-4">
          <div className="h-6 w-6">{icon}</div>
          <div className="... w-32 truncate text-sm font-medium">{title}</div>
        </div>
        <FileMenu
          button={
            <BsThreeDotsVertical className="h-6 w-6 rounded-full p-1 hover:bg-slate-300" />
          }
          items={menuItems}
        />
      </div>
      <div className="mb-2 flex w-full flex-1 items-center justify-center rounded-md bg-white">
        {preview}
      </div>
    </div>

    // <div
    //   className='cursor-pointer shadow-sm hover:brightness-90'
    //   onClick={() => {
    //     setIsActive(!isActive);
    //     if (onClick) {
    //       onClick();
    //     }
    //   }}
    //   onDoubleClick={onDoubleClick}>
    //   <Card variant='outlined' size='sm' style={{ backgroundColor: isActive ? '#C2E7FF' : '' }}>
    //     <div className='flex items-center'>
    //       <div className='flex h-4 grow items-center gap-x-2'>
    //         <div className='h-6 w-6'>{type2Icon(type as string)}</div>
    //         <div className='flex flex-col'>
    //           <Typography level='title-md'>{title}</Typography>
    //           <Typography level='body-sm'>{size}</Typography>
    //         </div>
    //       </div>

    //       <DropDownMenu
    //         button={
    //           <MenuButton
    //             variant='plain'
    //             size='sm'
    //             sx={{
    //               padding: 0,
    //             }}>
    //             <IconButton component='span' variant='plain' color='neutral' size='sm'>
    //               <EllipsisVerticalIcon className='h-6 w-6' />
    //             </IconButton>
    //           </MenuButton>
    //         }
    //         menuItems={fileOperation}
    //         onSelected={(index) => {
    //           console.log('Selected', index);
    //           // File info
    //           if (index === 0) {
    //             if (onFileInfo) {
    //               onFileInfo(id);
    //             }
    //           }
    //         }}
    //       />
    //     </>

    //     <CardOverflow>
    //       <AspectRatio>
    //         {preview ? (
    //           <img src={preview} />
    //         ) : (
    //           <div>
    //             <div className='h-12 w-12'>{type2Icon(type as string)}</div>
    //           </div>
    //         )}
    //       </AspectRatio>
    //     </CardOverflow>
    //   </Card>
    // </div>
  );
};

export default FileCard;
