import DriveLayout from '@/components/layout/DriveLayout';
import React, { useState } from 'react';
import MyDriveHeader from '../my-drive/header/MyDriveHeader';
import { useEntries, useLimit, useSelected, useViewMode } from '@/store/my-drive/myDrive.store';
import InfoButton from '../my-drive/header/InfoButton';
import PriorityFilter from '../priority/priority-filter/PriorityFilter';
import MultipleDriveHeader from '../my-drive/header/MultipleDriveHeader';
import { useStorageStore } from '@/store/storage/storage.store';
import { DriveGridView } from '../my-drive/content/DriveGridView';
import PriorityView from '../priority/priority-view/PriorityView';
import SidePanel from '../my-drive/side-panel/SidePanel';
import { LocalEntry, useQueries, useSearchEntries, useSearchEntriesPage } from '@/hooks/drive.hooks';
import { DriveListView } from '../my-drive/content/DriveListView';
import { useSubmit } from 'react-router-dom';

const SearchPage = () => {
  const {rootId} = useStorageStore();
  const {viewMode, setViewMode} = useViewMode();
  const {arrSelected} = useSelected();
  const [isFileMode, setIsFileMode] = useState<boolean>(true);
  const {increaseLimit, limit} = useLimit();

  const {data, isLoading, refetch} = useSearchEntriesPage();
  console.log('SearchPage', data);
  console.log('SearchPage', isLoading);
  console.log('SearchPage', limit);

  const onScollBottom = () => {
    if(data.length < limit) return;
    increaseLimit();
  }

  return (
    <DriveLayout
      headerLeft={
        <div className='flex flex-col overflow-hidden'>
          <div className='flex justify-between items-center space-x-2 text-2xl mr-2'>
            <div className='pb-[20px] pl-5 pt-[17px] line-clamp-1'>Search result</div>
            <InfoButton />
          </div>
          {arrSelected.length === 0 ? (
            <PriorityFilter
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          ) : (
            <div className='px-4 overflow-x-auto'>
              <MultipleDriveHeader parent='Priority' dir={{id: rootId, name: 'Priority'}} />
            </div>
          )}
        </div>
      }
      onScrollBottom={onScollBottom}
      bodyLeft={
        viewMode === 'grid' ? (
          <DriveGridView entries={data} isLoading={isLoading} />
        ) : (
          <DriveListView entries={data} isLoading={isLoading} />
        )
      }
      sidePanel={
        <SidePanel
          id={arrSelected.length === 0 ?  '' : arrSelected.length === 1 ? arrSelected[0].id : ''}
          title={arrSelected.length === 0 ? 'Search' : data.find((item) => item.id === arrSelected[arrSelected.length - 1].id)?.title || ''}
        />
      }
    />
  );
};

export default SearchPage;