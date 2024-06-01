import DriveLayout from '@/components/layout/DriveLayout';
import { useState } from 'react';
import { useSelected, useFilter, useViewMode, useCursor } from '@/store/my-drive/myDrive.store';
import InfoButton from '../my-drive/header/InfoButton';
import MultipleDriveHeader from '../my-drive/header/MultipleDriveHeader';
import { useStorageStore } from '@/store/storage/storage.store';
import { DriveGridView } from '../my-drive/content/DriveGridView';
import SidePanel from '../my-drive/side-panel/SidePanel';
import { useSearchEntriesPage } from '@/hooks/drive.hooks';
import { DriveListView } from '../my-drive/content/DriveListView';
import DriveFilter from '../my-drive/header/DriveFilter';
import { Tooltip } from '@mui/material';
import DriveViewMode from '../my-drive/header/DriveViewMode';
import PriorityListView from '../priority/priority-view/PriorityListView';

const SearchPage = () => {
  const { rootId } = useStorageStore();
  const { viewMode, setViewMode } = useViewMode();
  const { arrSelected } = useSelected();
  const [peopleFilter, setPeopleFilter] = useState<string>('');

  const { typeFilter, setTypeFilter } = useFilter();
  const [modifiedFilter, setModifiedFilter] = useState<string>('');
  const { setCurrentCursor, nextCursor, currentCursor } = useCursor();
  const [isScrolling, setIsScrolling] = useState(false);
  const [search, setSearch] = useState<boolean>(false);

  const { data, isLoading, error } = useSearchEntriesPage();

  const onScollBottom = () => {
    if (nextCursor && nextCursor !== currentCursor) {
      setIsScrolling(true);
      setTimeout(() => {
        setIsScrolling(false);
        setCurrentCursor(nextCursor);
      }, 1000);
    }
  };

  return (
    <DriveLayout
      headerLeft={
        <div className='flex flex-col overflow-hidden'>
          <div className='mr-2 flex items-center justify-between space-x-2 text-2xl'>
            <div className='line-clamp-1 pb-[20px] pl-5 pt-[17px]'>Search result</div>
            <div className='flex items-center pb-[6px] pr-[11px] pt-[14px]'>
              <DriveViewMode />
              <div className='mx-1 my-0.5'>
                <InfoButton />
              </div>
            </div>
          </div>
          {arrSelected.length === 0 ? (
            <div className='ml-5 flex gap-2'>
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
          ) : (
            <div className='overflow-x-auto px-4'>
              <MultipleDriveHeader parent='Priority' dir={{ id: rootId, name: 'Priority' }} />
            </div>
          )}
        </div>
      }
      onScrollBottom={onScollBottom}
      bodyLeft={
        error ? (
          <div className='text-center text-lg text-red-500'>Error: {error}</div>
        ) : (
          viewMode === 'grid' ? (
            <DriveGridView entries={data} isLoading={isLoading} isScrolling={isScrolling} parent='priority' />
          ) : (
            <DriveListView entries={data} isLoading={isLoading} isScrolling={isScrolling} parent='priority' />
          )
        )
      }
      sidePanel={
        <SidePanel
          id={arrSelected.length === 0 ? '' : arrSelected.length === 1 ? arrSelected[0].id : ''}
          title={
            arrSelected.length === 0
              ? 'Search'
              : data.find((item) => item.id === arrSelected[arrSelected.length - 1].id)?.title || ''
          }
        />
      }
    />
  );
};

export default SearchPage;
