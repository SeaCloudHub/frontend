import DriveLayout from '@/components/layout/DriveLayout';
import { useDrawer, useViewMode } from '@/store/my-drive/myDrive.store';
import { useState } from 'react';
import SharingPageViewMode from '../shared/sharing-page-view/SharingPageViewMode';
import { Icon } from '@iconify/react/dist/iconify.js';
import SharingPageFilter from '../shared/sharing-page-filter/SharingPageFilter';
import ButtonCore from '@/components/core/button/ButtonCore';
import SidePanel from '../my-drive/side-panel/SidePanel';
import TrashPageView from './trash-page-view/TrashPageView';
import { useTrash } from '@/hooks/drive.hooks';
import MultipleDriveHeader from '../my-drive/header/MultipleDriveHeader';

const Trash = () => {
  const { viewMode, setViewMode } = useViewMode();
  const [typeFilterItem, setTypeFilterItem] = useState<string>('');
  const [peopleFilterItem, setPeopleFilterItem] = useState<string>('');
  const [modifiedFilterItem, setModifiedFilterItem] = useState<string>('');
  const [arrSelected, setArrSelected] = useState<string[]>([]);
  const { drawerOpen, openDrawer, closeDrawer } = useDrawer();

  const { data, isLoading, refetch } = useTrash();

  return (
    <DriveLayout
      headerLeft={
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
                <SharingPageFilter
                  setModifiedFilterItem={setModifiedFilterItem}
                  setPeopleFilterItem={setPeopleFilterItem}
                  setTypeFilterItem={setTypeFilterItem}
                  modifiedFilter={modifiedFilterItem}
                  peopleFilter={peopleFilterItem}
                  typeFilter={typeFilterItem}
                />
                {(typeFilterItem || peopleFilterItem || modifiedFilterItem) && (
                  <div className='flex h-7 items-center rounded-full px-[12px] py-[1px] hover:bg-[#ededed]'>
                    <div
                      onClick={() => {
                        setTypeFilterItem('');
                        setPeopleFilterItem('');
                        setModifiedFilterItem('');
                      }}
                      className='cursor-pointer text-sm font-medium'>
                      Clear filters
                    </div>
                  </div>
                )}
              </>
            ) : (
              <MultipleDriveHeader arrSelected={arrSelected} setArrSelected={setArrSelected} type='Trash' />
            )}
          </div>
        </div>
      }
      bodyLeft={<TrashPageView entries={data} arrSelected={arrSelected} setArrSelected={setArrSelected} />}
      sidePanel={<SidePanel />}
    />
  );
};

export default Trash;
