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
          className={`flex w-16 items-center justify-center rounded-l-full border border-outline py-1 pr-1
                ${isFileMode ? 'bg-primaryContainer hover:brightness-90' : 'hover:bg-surfaceContainer'}
              `}
          onClick={() => {
            console.log('File');
            !isFileMode && setIsFileMode(true);
          }}>
          {isFileMode && <Icon icon='ic:baseline-check' className='h-4 w-4' />}
          <Icon icon='ph:file' className='h-6 w-6' />
        </div>
      </Tooltip>
      <Tooltip title='Folder View'>
        <div
          className={`r flex w-16 items-center justify-center rounded-r-full border border-outline py-1 pl-1 ${!isFileMode ? 'bg-primaryContainer hover:brightness-90' : 'hover:bg-surfaceContainer'}`}
          onClick={() => {
            console.log('Folder');
            isFileMode && setIsFileMode(false);
          }}>
          {!isFileMode && <Icon icon='ic:baseline-check' className='h-4 w-4' />}
          <Icon icon='ph:folder' className='h-6 w-6' />
        </div>
      </Tooltip>
    </div>
  );
};

export default PriorityViewType;
