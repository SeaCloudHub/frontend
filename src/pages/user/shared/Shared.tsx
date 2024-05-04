import SharingPageFilter from './sharing-page-filter/SharingPageFilter';
import { useEffect, useState } from 'react';
import SharingPageViewMode from './sharing-page-view/SharingPageViewMode';
import DriveLayout from '@/components/layout/DriveLayout';
import ButtonCore from '@/components/core/button/ButtonCore';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Entry } from '@/utils/types/entry.type';
import { Path, useDrawer, useSelected, useViewMode } from '@/store/my-drive/myDrive.store';
import SidePanel from '../my-drive/side-panel/SidePanel';
import { DriveGridView } from '../my-drive/content/DriveGridView';
import { transformEntries, useSharedEntry } from '@/hooks/drive.hooks';
import { DriveListView } from '../my-drive/content/DriveListView';
import { useSession } from '@/store/auth/session';
import { useQuery } from '@tanstack/react-query';
import { getSharedEntries } from '@/apis/drive/drive.api';
import { LocalEntry } from '@/hooks/drive.hooks';
import { toast } from 'react-toastify';
import DrivePath from '../my-drive/header/drive-path/DrivePath';
import { useStorageStore } from '@/store/storage/storage.store';
import { ListEntriesRESP } from '@/apis/drive/drive.response';
import MultipleDriveHeader from '../my-drive/header/MultipleDriveHeader';

const Shared = () => {
  const { viewMode, setViewMode } = useViewMode();
  const [typeFilterItem, setTypeFilterItem] = useState<string>('');
  const [peopleFilterItem, setPeopleFilterItem] = useState<string>('');
  const [modifiedFilterItem, setModifiedFilterItem] = useState<string>('');
  const { drawerOpen, openDrawer, closeDrawer } = useDrawer();
  // const [{ sort, order }, setSort] = useState<{ sort: string; order: string }>({ sort: 'Name', order: 'desc' });
  const { arrSelected } = useSelected();
  const { rootId } = useStorageStore();

  const { data, isLoading, parents } = useSharedEntry();

  return (
    <DriveLayout
      headerLeft={
        <div>
          <div className='flex justify-between space-x-2 text-2xl'>
            <div className='w-full pb-[14px] pt-[15px]'>
              <DrivePath path={parents} type='Shared' />
            </div>
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

          <div className='flex items-center gap-3 px-5'>
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
              <MultipleDriveHeader parent='SharedWithMe' dirId={
                arrSelected.length === 1 ? arrSelected[0] : ''
              } />
            )}
          </div>
        </div>
      }
      bodyLeft={
        viewMode === 'grid' ? (
          <DriveGridView
            entries={data}
            isLoading={isLoading}
            curDir={parents[parents.length - 1]}
          />
        ) : (
          <DriveListView
            entries={data}
            curDir={parents[parents.length - 1]}
            isLoading={isLoading}
          />
        )
      }
      sidePanel={
        <SidePanel
          id={arrSelected.length === 0 ? rootId : arrSelected.length === 1 ? arrSelected[0] : ''}
          title={arrSelected.length === 0 ? 'Shared' :
            data.find((item) => item.id === arrSelected[arrSelected.length - 1])?.title || ''}
        />
      }
    />
  );
};

export default Shared;
