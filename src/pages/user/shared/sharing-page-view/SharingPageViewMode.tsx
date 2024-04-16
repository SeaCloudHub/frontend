import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Tooltip } from '@mui/material';
import { Path } from '@/store/my-drive/myDrive.store';

export type SharingPageViewModeProps = {
  viewMode: string;
  setViewMode: (value: string) => void;
  setPath?: React.Dispatch<React.SetStateAction<Path>>;
};

const SharingPageViewMode: React.FC<SharingPageViewModeProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className='flex cursor-pointer items-center'>
      <Tooltip title='File view'>
        <div
          className={`flex w-16 items-center justify-center rounded-l-full border border-outline py-1 pr-1 ${viewMode === 'list' ? 'bg-primaryContainer hover:brightness-90' : 'hover:bg-surfaceContainer'}`}
          onClick={() => {
            console.log('list');
            !(viewMode === 'list') && setViewMode('list');
          }}>
          {viewMode === 'list' && <Icon icon='ic:baseline-check' className='h-4 w-4' />}
          <Icon icon='ic:baseline-view-headline' className='h-6 w-6' />
        </div>
      </Tooltip>
      <Tooltip title='Grid View'>
        <div
          className={`r flex w-16 items-center justify-center rounded-r-full border border-outline py-1 pl-1 ${!(viewMode === 'list') ? 'bg-primaryContainer hover:brightness-90' : 'hover:bg-surfaceContainer'}`}
          onClick={() => {
            console.log('grid');
            viewMode === 'list' && setViewMode('grid');
          }}>
          {!(viewMode === 'list') && <Icon icon='ic:baseline-check' className='h-4 w-4' />}
          <Icon icon='mdi:view-grid-outline' className='h-6 w-6' />
        </div>
      </Tooltip>
    </div>
  );
};

export default SharingPageViewMode;
