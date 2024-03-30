import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Tooltip } from '@mui/material';

export type SharingPageViewModeProps = {
  viewMode: string;
  setViewMode: (value: string) => void;
};

const SharingPageViewMode: React.FC<SharingPageViewModeProps> = ({ viewMode, setViewMode }) => {
  return (
    <div>
      {viewMode === 'grid' ? (
        <div className='flex cursor-pointer items-center'>
          <Tooltip title='List View'>
            <div
              onClick={() => {
                setViewMode('list');
                console.log('list');
              }}
              className='flex w-16 items-center justify-center rounded-l-full border border-outline py-1 pl-1 hover:bg-surfaceContainer'>
              <Icon icon='ic:baseline-view-headline' className='h-6 w-6' />
            </div>
          </Tooltip>
          <Tooltip title='Grid View'>
            <div className='flex w-16 items-center justify-center rounded-r-full border border-outline bg-primaryContainer py-1 pr-1 hover:brightness-90'>
              <Icon icon='ic:baseline-check' className='h-4 w-4' />
              <Icon icon='mdi:view-grid-outline' className='h-6 w-6' />
            </div>
          </Tooltip>
        </div>
      ) : (
        <div className='flex cursor-pointer items-center'>
          <div className='flex w-16 items-center justify-center rounded-l-full border border-outline bg-primaryContainer py-1 pl-1 hover:brightness-90'>
            <Icon icon='ic:baseline-check' className='h-4 w-4' />
            <Icon icon='ic:baseline-view-headline' className='h-6 w-6' />
          </div>
          <div
            onClick={() => {
              setViewMode('grid');
              console.log('grid');
            }}
            className='flex w-16 items-center justify-center rounded-r-full border border-outline py-1 pr-1 hover:bg-surfaceContainer'>
            <Icon icon='mdi:view-grid-outline' className='h-6 w-6' />
          </div>
        </div>
      )}
    </div>
  );
};

export default SharingPageViewMode;
