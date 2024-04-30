import fileTypeIcons from '@/utils/constants/file-icons.constant';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Tooltip } from '@mui/material';
import React from 'react';

const FileChip = ({ title }: { title: string }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ext = title.split('.').pop() || 'any';
  const icon = fileTypeIcons[ext] || fileTypeIcons.any;

  return (
    <div
      className='relative flex w-full items-center gap-2 hover:bg-gray-200'
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}>
      <div className='flex w-full cursor-pointer items-center gap-2 rounded-lg border border-gray-500 px-2 py-1 font-semibold'>
        <div className='h-5 w-5'>{icon}</div>
        <Tooltip title={title} className='text-sm font-semibold'>
          <div className='line-clamp-1 max-w-32'>{title}</div>
        </Tooltip>
      </div>
      <Tooltip title='View file in folder' className={`absolute ${isVisible ? 'visible' : 'hidden'} -right-8`}>
        <Icon icon='mdi:magnify' className='h-7 w-7 cursor-pointer text-gray-500' />
      </Tooltip>
    </div>
  );
};

export default FileChip;
