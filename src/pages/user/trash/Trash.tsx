import DriveLayout from '@/components/layout/DriveLayout';
import { useDrawer, useViewMode } from '@/store/my-drive/myDrive.store';
import { useState } from 'react';
import SharingPageViewMode from '../shared/sharing-page-view/SharingPageViewMode';
import { Icon } from '@iconify/react/dist/iconify.js';
import SharingPageFilter from '../shared/sharing-page-filter/SharingPageFilter';
import ButtonCore from '@/components/core/button/ButtonCore';
import { fakeData } from '../shared/Shared';
import SidePanel from '../my-drive/side-panel/SidePanel';
import TrashPageView from './trash-page-view/TrashPageView';

const Trash = () => {
  const { viewMode, setViewMode } = useViewMode();
  const [typeFilterItem, setTypeFilterItem] = useState<string>('');
  const [peopleFilterItem, setPeopleFilterItem] = useState<string>('');
  const [modifiedFilterItem, setModifiedFilterItem] = useState<string>('');

  const { drawerOpen, openDrawer, closeDrawer } = useDrawer();
  return (
    <DriveLayout
      headerLeft={
        <div className='px-4'>
          <div className='flex justify-between space-x-2 text-2xl'>
            <h2 className='py-2 text-3xl font-semibold'>Shared with me</h2>
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
            <SharingPageFilter
              setModifiedFilterItem={setModifiedFilterItem}
              setPeopleFilterItem={setPeopleFilterItem}
              setTypeFilterItem={setTypeFilterItem}
              modifiedFilter={modifiedFilterItem}
              peopleFilter={peopleFilterItem}
              typeFilter={typeFilterItem}
            />
            {(typeFilterItem || peopleFilterItem || modifiedFilterItem) && (
              <ButtonCore
                title='Clear all filters'
                contentColor='black'
                onClick={() => {
                  setTypeFilterItem('');
                  setPeopleFilterItem('');
                  setModifiedFilterItem('');
                }}
                type={'text'}
              />
            )}
          </div>
        </div>
      }
      bodyLeft={<TrashPageView entries={fakeData} />}
      sidePanel={<SidePanel />}
    />
  );
};

export default Trash;
