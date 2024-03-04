import { EllipsisVerticalIcon, PencilIcon, ShareIcon, StarIcon, TrashIcon } from '@heroicons/react/16/solid';
import { DocumentIcon, FolderIcon, MusicalNoteIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { Info } from '@mui/icons-material';
import { AspectRatio, Card, CardOverflow, Dropdown, IconButton, Menu, MenuButton, MenuItem, Typography } from '@mui/joy';
import { useState } from 'react';

interface FolderCardProps {
  title: string;
  type?: 'starred' | 'shared';
  onClick?: () => void;
  onDoubleClick?: () => void;
}

const folderOperations = [
  { icon: <Info />, label: 'Folder infomation' },
  { icon: <PencilIcon />, label: 'Rename file' },
  { icon: <ShareIcon />, label: 'Share file' },
  { icon: <TrashIcon />, label: 'Delete file' },
];

const supportedFolderTypes = [
  { type: 'starred', icon: <StarIcon className='text-yellow-400' /> },
  { type: 'shared', icon: <ShareIcon /> },
];

const type2Icon = (type: string) => {
  const icon = supportedFolderTypes.find((fileType) => fileType.type === type);
  return icon ? icon.icon : <FolderIcon />;
};

const FolderCard: React.FC<FolderCardProps> = ({ title, type, onClick, onDoubleClick }) => {
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
          <div className='flex grow'>
            <div className='flex h-4 items-center gap-x-2'>
              <div className='h-6 w-6'>{type2Icon(type as string)}</div>
              <Typography level='title-md'>{title}</Typography>
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
                <EllipsisVerticalIcon className='h-6 w-6' />
              </IconButton>
            </MenuButton>

            <Menu placement='bottom-start' size='sm'>
              {folderOperations.map((item, index) => (
                <MenuItem key={index}>
                  <div
                    className={`flex 
                  ${item.label.includes('Delete') ? 'text-red-500' : ''}
                  `}>
                    <div className='mr-2 h-6 w-6'>{item.icon}</div>
                    <div className='mr-2 text-nowrap'>{item.label}</div>
                  </div>
                </MenuItem>
              ))}
            </Menu>
          </Dropdown>
        </div>
      </Card>
    </div>
  );
};

export default FolderCard;
