import { useCursor, useIsFileMode } from '@/store/my-drive/myDrive.store';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Tooltip } from '@mui/material';
import React from 'react';

type PriorityViewTypeProps = {
  // isFileMode: boolean;
  // setIsFileMode: (value: boolean) => void;
};

const PriorityViewType: React.FC<PriorityViewTypeProps> = () => {
  const { isFileMode, setIsFileMode } = useIsFileMode();
  // const { resetLimit } = useLimit();
  const { nextCursor, setCurrentCursor, resetCursor } = useCursor();
  return (
    <div className='flex cursor-pointer items-center'>
      <Tooltip title='File view'>
        <div
          className={`flex h-[32px]  w-16 items-center justify-center rounded-l-full border border-outline py-1 pr-1
                ${isFileMode ? 'bg-[#c2e7ff] dark:bg-blue-900' : 'hover:bg-surfaceContainer dark:hover:bg-slate-500 dark:hover:text-white'}
              `}
          onClick={() => {
            console.log('File');
            // resetLimit();
            resetCursor();
            !isFileMode && setIsFileMode(true);
          }}>
          {isFileMode && <Icon icon='ic:baseline-check' className='h-5 w-5' />}
          <Icon icon='ph:file' className='h-5 w-5' />
        </div>
      </Tooltip>
      <Tooltip title='Folder View'>
        <div
          className={`flex h-[32px] w-16 items-center justify-center rounded-r-full border border-outline py-1 pl-1 ${!isFileMode ? 'bg-[#c2e7ff] dark:bg-blue-900' : 'hover:bg-surfaceContainer dark:hover:bg-slate-500 dark:hover:text-white'}`}
          onClick={() => {
            console.log('Folder');
            // resetLimit();
            resetCursor();
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
