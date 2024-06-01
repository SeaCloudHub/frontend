import { useEffect, useState } from 'react';
import SharingPageViewMode from '../shared/sharing-page-view/SharingPageViewMode';
import SharingPageFilter from '../shared/sharing-page-filter/SharingPageFilter';
import { Icon } from '@iconify/react/dist/iconify.js';
import ButtonCore from '@/components/core/button/ButtonCore';
import StarredView from './stared-view/StarredView';
import DriveLayout from '@/components/layout/DriveLayout';
import { useCursor, useDrawer, useFilter, useSelected, useViewMode } from '@/store/my-drive/myDrive.store';
import SidePanel from '../my-drive/side-panel/SidePanel';
import { useSession } from '@/store/auth/session';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Entry } from '@/utils/types/entry.type';
import { useStorageStore } from '@/store/storage/storage.store';
import { ListEntriesRESP } from '@/apis/drive/drive.response';
import MultipleDriveHeader from '../my-drive/header/MultipleDriveHeader';
import { useStarred } from '@/hooks/drive.hooks';

const Starred = () => {
  // const [typeFilterItem, setTypeFilterItem] = useState<string>('');
  // const [peopleFilterItem, setPeopleFilterItem] = useState<string>('');
  // const [modifiedFilterItem, setModifiedFilterItem] = useState<string>('');
  const { modifiedFilter, typeFilter, setModifiedFilter, setTypeFilter } = useFilter();
  const { currentCursor, nextCursor, setCurrentCursor } = useCursor();
  const { viewMode, setViewMode } = useViewMode();
  const { arrSelected } = useSelected();
  const { drawerOpen, openDrawer, closeDrawer } = useDrawer();
  const { rootId } = useStorageStore();

  const { data, isLoading, error } = useStarred();

  console.log(isLoading);

  const onScrollBottom = () => {
    if (nextCursor) setCurrentCursor(nextCursor);
  };

  return (
    <DriveLayout
      headerLeft={
        <div className='select-none px-5'>
          <div className='flex justify-between space-x-2'>
            <h2 className='pb-[20px] pt-[17px] text-2xl'>Starred</h2>
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
            <div className='mb-1.5 flex w-full items-center gap-3'>
              <SharingPageFilter />
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
            <div className='overflow-x-auto'>
              <MultipleDriveHeader
                parent='Starred'
                dir={{
                  id: rootId,
                  name: 'Starred',
                }}
              />
            </div>
          )}
        </div>
      }
      onScrollBottom={onScrollBottom}
      bodyLeft={
        error ? (
          <div className='text-center text-lg text-red-500'>Error: {error}</div>
        ) : (
          <StarredView entries={data} isLoading={isLoading}/>
        )
      }
      sidePanel={
        <SidePanel
          id={arrSelected.length === 0 ? rootId : arrSelected.length === 1 ? arrSelected[0].id : ''}
          title={
            arrSelected.length === 0
              ? 'Starred'
              : data.find((item) => item.id === arrSelected[arrSelected.length - 1].id)?.title || ''
          }
        />
      }
    />
  );
};

export default Starred;
