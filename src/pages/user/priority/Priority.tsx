import { useEffect, useState } from 'react';
import { Path, useDrawer, useIsFileMode, useLimit, useSelected, useViewMode } from '@/store/my-drive/myDrive.store';
import DriveLayout from '@/components/layout/DriveLayout';
import { Icon } from '@iconify/react/dist/iconify.js';
import PriorityFilter from './priority-filter/PriorityFilter';
import SidePanel from '../my-drive/side-panel/SidePanel';
import PriorityView from './priority-view/PriorityView';
import { transformEntries, usePriorityEntries, useSuggestedEntries } from '@/hooks/drive.hooks';
import { toast } from 'react-toastify';
import { LocalEntry } from '@/hooks/drive.hooks';
import { Entry } from '@/utils/types/entry.type';
import { useQuery } from '@tanstack/react-query';
import { useSession } from '@/store/auth/session';
import { useStorageStore } from '@/store/storage/storage.store';
import DrivePath from '../my-drive/header/drive-path/DrivePath';
import { ListEntriesRESP } from '@/apis/drive/drive.response';
import MultipleDriveHeader from '../my-drive/header/MultipleDriveHeader';
import { useTheme } from '@/providers/theme-provider';
import InfoButton from '../my-drive/header/InfoButton';

const Priority = () => {
  const { viewMode, setViewMode } = useViewMode();
  const { isFileMode, setIsFileMode } = useIsFileMode();
  const { rootId } = useStorageStore();
  const { arrSelected } = useSelected();
  const { limit, increaseLimit } = useLimit();
  const { data, isLoading, refetch } = useSuggestedEntries();
  console.log(data);

  const onScrollBottom = () => {
    if (data.length < limit) return;
    increaseLimit();
  };

  return (
    // <div>
    <DriveLayout
      headerLeft={
        <div className='flex flex-col overflow-hidden'>
          <div className='mr-2 flex items-center justify-between space-x-2 text-2xl'>
            <div className='line-clamp-1 pb-[20px] pl-5 pt-[17px]'>Welcome to SeaCloud</div>
            <InfoButton />
          </div>
          {arrSelected.length === 0 ? (
            <PriorityFilter
              // isFileMode={isFileMode}
              // setIsFileMode={setIsFileMode}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          ) : (
            <div className='overflow-x-auto px-4'>
              <MultipleDriveHeader parent='Priority' dir={{ id: rootId, name: 'Priority' }} />
            </div>
          )}
        </div>
      }
      onScrollBottom={onScrollBottom}
      bodyLeft={
        <PriorityView
          isLoading={isLoading}
          isFileMode={isFileMode}
          entries={data}
          sort={''}
          order={''}
          setSort={({ sort, order }) => console.log(sort, order)}
        />
      }
      sidePanel={
        <SidePanel
          id={arrSelected.length === 0 ? rootId : arrSelected.length === 1 ? arrSelected[0] : ''}
          title={
            arrSelected.length === 0
              ? 'Priority'
              : data.find((item) => item.id === arrSelected[arrSelected.length - 1])?.title || ''
          }
        />
      }
    />
    // </div>
  );
};

export default Priority;
