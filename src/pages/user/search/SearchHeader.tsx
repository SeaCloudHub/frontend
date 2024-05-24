import React, { useState } from 'react';
import SharingPageViewMode from '../shared/sharing-page-view/SharingPageViewMode';
import { useDrawer, useSelected, useFilter, useViewMode } from '@/store/my-drive/myDrive.store';
import { Icon } from '@iconify/react/dist/iconify.js';
import SharingPageFilter from '../shared/sharing-page-filter/SharingPageFilter';
import MultipleDriveHeader from '../my-drive/header/MultipleDriveHeader';
import DriveFilter from '../my-drive/header/DriveFilter';
import { Tooltip } from '@mui/material';

const SearchHeader = () => {
  const { viewMode, setViewMode } = useViewMode();
  const { drawerOpen, openDrawer, closeDrawer } = useDrawer();
  const { arrSelected } = useSelected();
  const [modifiedFilter, setModifiedFilter] = useState<string>('');
  const [peopleFilter, setPeopleFilter] = useState<string>('');
  const { typeFilter, setTypeFilter } = useFilter();

  return (
    <div className='flex flex-col overflow-hidden'>
      <div className='flex justify-between space-x-2 text-2xl'>
        <div className='w-full pb-[14px] pt-[15px]'>Search results</div>
        <div className='flex items-center gap-2'>
          <SharingPageViewMode setViewMode={setViewMode} viewMode={viewMode} />
          <Icon
            icon='mdi:information-outline'
            className='h-8 w-8 cursor-pointer rounded-full p-1 transition-all hover:bg-surfaceContainerLow active:brightness-90'
            onClick={() => {
              if (!drawerOpen) {
                openDrawer();
              } else {
                closeDrawer();
              }
            }}
          />
        </div>
      </div>
      {arrSelected.length > 0 ? (
        <div className='overflow-x-auto px-4 py-0.5'>
          <MultipleDriveHeader parent='MyDrive' dir={{ id: '', name: '' }} />
        </div>
      ) : (
        <div className='w-full pl-5'>
          <div className='flex items-center justify-between overflow-x-auto'>
            <div className='flex gap-3'>
              <DriveFilter />
              {(typeFilter || peopleFilter || modifiedFilter) && (
                <div className='flex h-7 items-center rounded-full px-[12px] py-[1px] hover:bg-slate-200 active:brightness-90 dark:hover:bg-slate-500'>
                  <Tooltip title='Clear filters'>
                    <div
                      onClick={() => {
                        setTypeFilter('');
                        setPeopleFilter('');
                        setModifiedFilter('');
                      }}
                      className='line-clamp-1 cursor-pointer text-sm font-medium'>
                      Clear filters
                    </div>
                  </Tooltip>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchHeader;
