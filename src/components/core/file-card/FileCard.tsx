import { EllipsisVerticalIcon, PencilIcon, ShareIcon, TrashIcon } from '@heroicons/react/16/solid';
import { DocumentIcon, MusicalNoteIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { AspectRatio, Card, CardOverflow, IconButton, MenuButton, Typography } from '@mui/joy';
import { useState } from 'react';
import { DropDownMenu } from '../drop-down/DropDownMenu';
import { Info } from '@mui/icons-material';

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
  return icon ? icon.icon : <DocumentIcon />;
};

const FileCard: React.FC<FileCardProps> = ({ id, title, size, preview, onClick, onDoubleClick, onFileInfo }) => {
  const type = title.split('.').length > 1 ? title.split('.').pop() : 'unknown';

  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className='cursor-pointer shadow-sm hover:brightness-90'
      onClick={() => {
        setIsActive(!isActive);
        if (onClick) {
          onClick();
        }
      }}
      onDoubleClick={onDoubleClick}>
      <Card variant='outlined' size='sm' style={{ backgroundColor: isActive ? '#C2E7FF' : '' }}>
        <div className='flex items-center'>
          <div className='flex h-4 grow items-center gap-x-2'>
            <div className='h-6 w-6'>{type2Icon(type as string)}</div>
            <div className='flex flex-col'>
              <Typography level='title-md'>{title}</Typography>
              <Typography level='body-sm'>{size}</Typography>
            </div>
          </div>

          <DropDownMenu
            button={
              <MenuButton
                variant='plain'
                size='sm'
                sx={{
                  padding: 0,
                }}>
                <IconButton component='span' variant='plain' color='neutral' size='sm'>
                  <EllipsisVerticalIcon className='h-6 w-6' />
                </IconButton>
              </MenuButton>
            }
            menuItems={fileOperation}
            onSelected={(index) => {
              console.log('Selected', index);
              // File info
              if (index === 0) {
                if (onFileInfo) {
                  onFileInfo(id);
                }
              }
            }}
          />
        </div>

        <CardOverflow>
          <AspectRatio>
            {preview ? (
              <img src={preview} />
            ) : (
              <div>
                <div className='h-12 w-12'>{type2Icon(type as string)}</div>
              </div>
            )}
          </AspectRatio>
        </CardOverflow>
      </Card>
    </div>
  );
};

export default FileCard;
