import { useDrawer, useFilter, useSelected, useViewMode } from '@/store/my-drive/myDrive.store';
import React from 'react';
import SharingPageViewMode from '../shared/sharing-page-view/SharingPageViewMode';
import { Icon } from '@iconify/react/dist/iconify.js';
import TrashPageFilter from './trash-page-filter/TrashPageFilter';
import MultipleDriveHeader from '../my-drive/header/MultipleDriveHeader';
import { useStorageStore } from '@/store/storage/storage.store';
import DriveFilter from '../my-drive/header/DriveFilter';

// type TrashPageHeaderProps = {
//   typeFilterItem: string;
//   setTypeFilterItem: React.Dispatch<React.SetStateAction<string>>;
//   modifiedFilterItem: string;
//   setModifiedFilterItem: React.Dispatch<React.SetStateAction<string>>;
// };

const TrashPageHeader = () => {
  const { drawerOpen, openDrawer, closeDrawer } = useDrawer();
  const { setViewMode, viewMode } = useViewMode();
  const { modifiedFilter, typeFilter, setModifiedFilter, setTypeFilter } = useFilter();
  const { arrSelected, setArrSelected } = useSelected();
  const { rootId } = useStorageStore();
  console.log('[TrashPageHeader] arrSelected', arrSelected);

  return (
    <div className='flex select-none flex-col px-5'>
      <div className='flex justify-between space-x-2'>
        <h2 className='pb-[20px] pt-[17px] text-2xl'>Trash</h2>
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
      {arrSelected.length === 0 ? (
        <div className='flex items-center gap-3'>
          <DriveFilter />
          {(typeFilter || modifiedFilter) && (
            <div className='flex h-7 items-center rounded-full px-[12px] py-[1px] hover:bg-[#ededed]'>
              <div
                onClick={() => {
                  setTypeFilter('');
                  setModifiedFilter('');
                }}
                className='cursor-pointer text-sm font-medium'>
                Clear filters
              </div>
            </div>
          )}
        </div>
      ) : (
        <MultipleDriveHeader parent='Trash' dir={{ id: rootId, name: 'Trash' }} />
      )}
    </div>
  );
};

export default TrashPageHeader;
