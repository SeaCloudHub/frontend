import React from 'react';
import { Tooltip } from '@mui/material';
import { LocalEntry } from '../../my-drive/MyDrive';

export const DataRow: React.FC<LocalEntry> = ({ id, isDir, title, icon, lastModified, owner, size }) => {
  return (
    <div className='flex h-8 items-center space-x-3 border-b border-b-[#dadce0] hover:bg-[#f0f1f1]'>
      <div className='flex shrink grow basis-[304px] items-center text-sm font-medium'>
        <div className='px-4'>
          <div className='h-6 w-6'>{icon}</div>
        </div>
        <Tooltip title={title}>
          <div
            className='line-clamp-1 w-96 max-2xl:w-72 max-lg:w-48 max-md:w-36 max-sm:w-28 max-xs:w-20
          '>
            {title}
          </div>
        </Tooltip>
      </div>
      <div className='shrink-0 grow-0 basis-[140px] pl-4 text-sm font-medium max-[1450px]:basis-[140px] max-[1050px]:hidden'>
        {size}
      </div>
    </div>
  );
};
