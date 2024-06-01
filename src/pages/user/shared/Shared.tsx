import SharingPageFilter from './sharing-page-filter/SharingPageFilter';
import { useEffect, useState } from 'react';
import SharingPageViewMode from './sharing-page-view/SharingPageViewMode';
import DriveLayout from '@/components/layout/DriveLayout';
import ButtonCore from '@/components/core/button/ButtonCore';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Entry } from '@/utils/types/entry.type';
import { Path, useDrawer, useFilter, useSelected, useViewMode } from '@/store/my-drive/myDrive.store';
import SidePanel from '../my-drive/side-panel/SidePanel';
import { DriveGridView } from '../my-drive/content/DriveGridView';
import { transformEntries, useSharedEntry } from '@/hooks/drive.hooks';
import { DriveListView } from '../my-drive/content/DriveListView';
import DrivePath from '../my-drive/header/drive-path/DrivePath';
import { useStorageStore } from '@/store/storage/storage.store';
import { ListEntriesRESP } from '@/apis/drive/drive.response';
import MultipleDriveHeader from '../my-drive/header/MultipleDriveHeader';

const Shared = () => {
  const { viewMode, setViewMode } = useViewMode();
  // const [typeFilterItem, setTypeFilterItem] = useState<string>('');
  const { modifiedFilter, typeFilter, setModifiedFilter, setTypeFilter } = useFilter();
  // const [peopleFilterItem, setPeopleFilterItem] = useState<string>('');
  // const [modifiedFilterItem, setModifiedFilterItem] = useState<string>('');
  const { drawerOpen, openDrawer, closeDrawer } = useDrawer();
  // const [{ sort, order }, setSort] = useState<{ sort: string; order: string }>({ sort: 'Name', order: 'desc' });
  const { arrSelected } = useSelected();
  const { rootId } = useStorageStore();

  const { data, isLoading, parents, error } = useSharedEntry();

  return (
    <DriveLayout
      headerLeft={
        <div className='flex select-none flex-col overflow-hidden'>
          <div className='flex justify-between space-x-2 text-2xl'>
            <div className='w-full px-4 pb-[20px] pt-[15px]'> Shared with me </div>
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
            <>
              <div className='flex items-center gap-3 px-5'>
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
            </>
          ) : (
            <div className='overflow-x-auto px-4 py-1'>
              <MultipleDriveHeader
                parent='SharedWithMe'
                dir={{
                  id: arrSelected.length === 1 ? arrSelected[0].id : '',
                  name: arrSelected.length === 1 ? data.find((item) => item.id === arrSelected[0].id)?.title || '' : '',
                }}
              />
            </div>
          )}
        </div>
      }
      bodyLeft={
        error ? (
          <div className='text-center text-lg text-red-500'>Error: {error}</div>
        ) : (
          viewMode === 'grid' ? (
            <DriveGridView entries={data} parent='shared' isLoading={isLoading} curDir={parents[parents.length - 1]} />
          ) : (
            <DriveListView entries={data} parent='shared' curDir={parents[parents.length - 1]} isLoading={isLoading} />
          )
        )
      }
      sidePanel={
        <SidePanel
          isHidden={arrSelected.length === 0}
          id={arrSelected.length === 0 ? rootId : arrSelected.length === 1 ? arrSelected[0].id : ''}
          title={
            arrSelected.length === 0
              ? 'Shared'
              : data.find((item) => item.id === arrSelected[arrSelected.length - 1].id)?.title || ''
          }
        />
      }
    />
  );
};

export default Shared;
