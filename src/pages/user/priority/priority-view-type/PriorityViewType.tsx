import { Icon } from '@iconify/react/dist/iconify.js';
import { Tooltip } from '@mui/material';
import React from 'react';

type PriorityViewTypeProps = {
  isFileMode: boolean;
  setIsFileMode: (value: boolean) => void;
};

const PriorityViewType: React.FC<PriorityViewTypeProps> = ({ isFileMode, setIsFileMode }) => {
  return (
    <div className='flex cursor-pointer items-center'>
      <Tooltip title='File view'>
        <div
          className={`flex h-[32px]  w-16 items-center justify-center rounded-l-full border border-outline py-1 pr-1
                ${isFileMode ? 'bg-white text-black dark:bg-white dark:text-white' : 'hover:bg-surfaceContainer'}
              `}
          onClick={() => {
            console.log('File');
            !isFileMode && setIsFileMode(true);
          }}>
          {isFileMode && <Icon icon='ic:baseline-check' className='h-5 w-5' />}
          <Icon icon='ph:file' className='h-5 w-5' />
        </div>
      </Tooltip>
      <Tooltip title='Folder View'>
        <div
          className={`flex h-[32px] w-16 items-center justify-center rounded-r-full border border-outline py-1 pl-1 ${!isFileMode ? 'bg-black text-white dark:bg-white dark:text-white ' : ''}`}
          onClick={() => {
            console.log('Folder');
            isFileMode && setIsFileMode(false);
          }}>
          {!isFileMode && <Icon icon='ic:baseline-check' className='h-5 w-5' />}
          <Icon icon='ph:folder' className='h-5 w-5' />
        </div>
      </Tooltip>
    </div>
  );
};

export default PriorityViewType;
