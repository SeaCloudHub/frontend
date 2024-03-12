import { EllipsisVerticalIcon, PencilIcon, ShareIcon, TrashIcon } from '@heroicons/react/16/solid';
import { DocumentIcon, MusicalNoteIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { AspectRatio, Card, CardOverflow, IconButton, MenuButton, Typography } from '@mui/joy';
import { useState } from 'react';
import { DropDownMenu } from '../drop-down/DropDownMenu';
import { Article, Info, InsertDriveFile } from '@mui/icons-material';

interface FileDetails {
  id: string;
  title: string;
  size: string;
  type?: string;
  owner?: string;
  modified?: string;
  created?: string;
  preview?: string;
}

interface FileCardProps extends FileDetails {
  onClick?: () => void;
  onDoubleClick?: () => void;
  onFileInfo?: (id: string) => void;
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

const type2Icon = (type: string) => {
  const icon = supportedFileTypes.find((fileType) => fileType.type === type);
  return icon ? icon.icon : <InsertDriveFile style={{ width: '100%', height: '100%' }} />;
};

const FileCard: React.FC<FileCardProps> = (props) => {
  const { title, size, id, preview, onClick, onDoubleClick, onFileInfo } = props;
  const type = title.split('.').length > 1 ? title.split('.').pop() : 'unknown';

  const [isActive, setIsActive] = useState(false);

  return (
    // <div
    //   className={`h-full w-full cursor-pointer rounded-xl border-none bg-surfaceContainerLow  active:bg-primaryContainer ${isActive ? 'bg-primaryContainer' : 'hover:bg-surfaceDim'}`}
    //   onClick={() => {
    //     console.log('click');
    //     setIsActive(!isActive);
    //   }}>
    //   <div className='flex flex-row items-center'>
    //     <div className='flex grow flex-row items-center space-x-4 p-4'>
    //       <div className='h-6 w-6'>{type2Icon(type as string)}</div>
    //       <div className='text-sm'> {title}</div>
    //     </div>
    //     <div className='mr-2 h-6 w-6'>
    //       <EllipsisVerticalIcon />
    //     </div>
    //   </div>
    //   <div className='h-full w-full justify-center overflow-auto'>
    //     {preview ? <img src={preview} alt={title} /> : <div className='h-36'>{type2Icon(type as string)}</div>}
    //   </div>
    // </div>

    <div
      className={`flex h-full w-full cursor-pointer flex-col rounded-xl border-none bg-surfaceContainerLow active:bg-primaryContainer ${isActive ? 'bg-primaryContainer' : 'hover:bg-surfaceDim'}`}
      onClick={() => {
        console.log('click');
        setIsActive(!isActive);
      }}
    >
      <div className="flex flex-row items-center">
        <div className="flex grow items-center space-x-4 p-4">
          <div className="h-6 w-6">{type2Icon(type as string)}</div>
          <div className="text-sm">{title}</div>
        </div>

        <div className="mr-2 h-6 w-6 self-center hover:bg-slate-200">
          <EllipsisVerticalIcon />
        </div>
      </div>

      <div className="flex h-full w-full justify-center overflow-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="{1.5}"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
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
    //     </div>

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
