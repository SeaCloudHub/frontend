import { EllipsisVerticalIcon, PencilIcon, ShareIcon, TrashIcon } from '@heroicons/react/16/solid';
import { DocumentIcon, MusicalNoteIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { AspectRatio, Card, CardOverflow, Dropdown, IconButton, Menu, MenuButton, MenuItem, Typography } from '@mui/joy';
import { useState } from 'react';

interface FileCardProps {
  title: string;
  size: string;
  preview?: string;
  onClick?: () => void;
  onDoubleClick?: () => void;
}

const menuItems = [
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

const FileCard: React.FC<FileCardProps> = ({ title, size, preview, onClick, onDoubleClick }) => {
  const type = title.split('.').length > 1 ? title.split('.').pop() : 'unknown';

  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className='shadow-sm cursor-pointer hover:brightness-90'
      onClick={() => {
        setIsActive(!isActive);
        if (onClick) {
          onClick();
        }
      }}
      onDoubleClick={onDoubleClick}>
      <Card variant='outlined' size='sm' style={{ backgroundColor: isActive ? '#C2E7FF' : '' }}>
        <div className='flex items-center'>
          <div className='flex h-4 items-center gap-x-2 grow'>
            <div className='h-6 w-6'>{type2Icon(type as string)}</div>
            <div className='flex flex-col'>
              <Typography level='title-md'>{title}</Typography>
              <Typography level='body-sm'>{size}</Typography>
            </div>
          </div>

          <Dropdown>
            <MenuButton
              variant='plain'
              size='sm'
              sx={{
                padding: 0,
              }}>
              <IconButton component='span' variant='plain' color='neutral' size='sm'>
                <EllipsisVerticalIcon className='w-6 h-6' />
              </IconButton>
            </MenuButton>

            <Menu placement='bottom-start' size='sm'>
              {menuItems.map((item, index) => (
                <MenuItem key={index}>
                  <div
                    className={`flex 
                  ${item.label.includes('Delete') ? 'text-red-500' : ''}
                  `}>
                    <div className='w-6 h-6 mr-2'>{item.icon}</div>
                    <div className='text-nowrap mr-2'>{item.label}</div>
                  </div>
                </MenuItem>
              ))}
            </Menu>
          </Dropdown>
        </div>

        <CardOverflow>
          <AspectRatio>
            {preview ? (
              <img src={preview} />
            ) : (
              <div>
                <div className='w-12 h-12'>{type2Icon(type as string)}</div>
              </div>
            )}
          </AspectRatio>
        </CardOverflow>
      </Card>
    </div>
  );
};

export default FileCard;
