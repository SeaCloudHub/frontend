import { useDrawer, useSelected, useViewMode } from '@/store/my-drive/myDrive.store';
import React from 'react';
import SharingPageViewMode from '../shared/sharing-page-view/SharingPageViewMode';
import { Icon } from '@iconify/react/dist/iconify.js';
import TrashPageFilter from './trash-page-filter/TrashPageFilter';
import MultipleDriveHeader from '../my-drive/header/MultipleDriveHeader';
import { useStorageStore } from '@/store/storage/storage.store';

type TrashPageHeaderProps = {
  typeFilterItem: string;
  setTypeFilterItem: React.Dispatch<React.SetStateAction<string>>;
  modifiedFilterItem: string;
  setModifiedFilterItem: React.Dispatch<React.SetStateAction<string>>;
};

const TrashPageHeader: React.FC<TrashPageHeaderProps> = ({
  modifiedFilterItem,
  setModifiedFilterItem,
  setTypeFilterItem,
  typeFilterItem,
}) => {
  const { drawerOpen, openDrawer, closeDrawer } = useDrawer();
  const { setViewMode, viewMode } = useViewMode();
  const { arrSelected, setArrSelected } = useSelected();
  const { rootId } = useStorageStore();
  console.log('[TrashPageHeader] arrSelected', arrSelected);

  return (
    <div className='px-5'>
      <div className='flex justify-between space-x-2'>
        <h2 className='pb-[20px] pt-[17px] text-2xl font-semibold'>Trash</h2>
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
      <div className='flex items-center gap-3'>
        {arrSelected.length === 0 ? (
          <>
            <TrashPageFilter
              modifiedFilter={modifiedFilterItem}
              setModifiedFilterItem={setModifiedFilterItem}
              typeFilter={typeFilterItem}
              setTypeFilterItem={setTypeFilterItem}
            />
            {(typeFilterItem || modifiedFilterItem) && (
              <div className='flex h-7 items-center rounded-full px-[12px] py-[1px] hover:bg-[#ededed]'>
                <div
                  onClick={() => {
                    setTypeFilterItem('');
                    setModifiedFilterItem('');
                  }}
                  className='cursor-pointer text-sm font-medium'>
                  Clear filters
                </div>
              </div>
            )}
          </>
        ) : (
          <MultipleDriveHeader parent='Trash' dirId={rootId} />
        )}
      </div>
    </div>
  );
};

export default TrashPageHeader;
