import fileIcons from '@/components/core/file-card/fileicon.constant';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Tooltip } from '@mui/material';
import React from 'react';

const FileChip = ({title}: {title: string}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ext = title.split('.').pop() || 'any';
  const icon = fileIcons[ext] || fileIcons.any;

  return (
    <div className='flex gap-2 w-full relative hover:bg-gray-200'
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className='flex gap-2 items-center px-2 py-1 w-full border border-gray-500 rounded-lg cursor-pointer font-semibold'>
        <div className='w-6 h-6'>{icon}</div>
        <Tooltip title={title} className='font-semibold'>
          <div className='line-clamp-1 max-w-40'>{title}</div>
        </Tooltip>
      </div>
      <Tooltip title='View file in folder' className={`absolute ${isVisible ? 'visible' : 'hidden'} -right-8`}>
        <Icon icon='mdi:magnify' className='w-8 h-8 text-gray-500 cursor-pointer'/>
      </Tooltip>
    </div>
  );
};

export default FileChip;