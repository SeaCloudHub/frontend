import { EllipsisVerticalIcon, PencilIcon, ShareIcon, TrashIcon } from '@heroicons/react/16/solid';
import { DocumentIcon, MusicalNoteIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import {
  AspectRatio,
  Box,
  Card,
  CardOverflow,
  Dropdown,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
} from '@mui/joy';

interface FileCardProps {
  title: string;
  size: string;
  preview?: string;
  onClick?: () => void;
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

const FileCard: React.FC<FileCardProps> = ({ title, size, preview, onClick }) => {
  const type = title.split('.').length > 1 ? title.split('.').pop() : 'unknown';
  return (
    <div className='shadow-sm cursor-pointer hover:brightness-90' onClick={onClick}>
      <Card variant='outlined' size='sm'>
        <div className='flex items-center'>
          <div className='flex flex-col grow'>
            <div className='flex h-4 items-center gap-x-2'>
              <div className='h-4 w-4'>{type2Icon(type as string)}</div>
              <Typography level='title-md'>{title}</Typography>
            </div>
            <Typography level='body-sm'>{size}</Typography>
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
          <AspectRatio color='primary'>
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
