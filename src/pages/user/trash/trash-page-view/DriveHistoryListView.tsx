import { LocalEntry, useRestoreEntriesMutation } from '@/hooks/drive.hooks';
import React, { useEffect, useRef } from 'react';
import { DataRow } from '../../my-drive/content/DataRow';
import Sort from '../../my-drive/content/Sort';
import { TimeEntry } from './DriveHistoryGridView';
import { useCursorActivity, useSelected } from '@/store/my-drive/myDrive.store';

type DriveHistoryListViewProps = {
  sort: string;
  order: string;
  setSort: ({ sort, order }: { sort: string; order: string }) => void;
  entries: TimeEntry[];
  dir: { id: string; name: string };
};

const DriveHistoryListView: React.FC<DriveHistoryListViewProps> = ({ sort, order, setSort, entries, dir }) => {
  const { setArrSelected, arrSelected } = useSelected();
  const { resetCursorActivity } = useCursorActivity();

  entries.sort((a, b) => {
    if (sort === 'Name') {
      return a.time.localeCompare(b.time) * (order === 'asc' ? 1 : -1);
    } else {
      return a.time.localeCompare(b.time) * (order === 'asc' ? -1 : 1);
    }
  });

  const driveListViewRef = useRef(null);

  useEffect(() => {
    const DataRows = document.querySelectorAll('.data-row');

    const handleClickOutside = (event) => {
      if (event.ctrlKey) return;
      const clickedOutsideRows = Array.from(DataRows).every((row) => !row.contains(event.target));

      if (driveListViewRef.current && driveListViewRef.current.contains(event.target) && clickedOutsideRows) {
        setArrSelected([]);
        resetCursorActivity();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [arrSelected, setArrSelected]);

  return (
    <div className='h-full select-none pl-5 pr-3' ref={driveListViewRef}>
      <div className='relative flex flex-col'>
        <div className='grid grid-cols-7 gap-3 border-b border-b-[#dadce0] pt-2 max-[1160px]:grid-cols-6'>
          <div className='col-span-4 font-medium'>Name</div>
          <div className='font-medium max-[1150px]:hidden'>Owner</div>
          <div className='truncate font-medium max-[1000px]:hidden'>Last Modified</div>
          <div className='font-medium max-[1160px]:hidden'>File Size</div>
        </div>
        {entries.map((entry, index) => {
          return (
            <div key={index} className='relative'>
              <div className='sticky top-0 z-10 border-b bg-white py-2 text-sm font-medium dark:bg-dashboard-dark'>
                {entry.time}
              </div>
              {entry.entries.map((item, index) => {
                return (
                  <DataRow
                    key={index}
                    dir={dir}
                    {...item}
                    parent='trash'
                    isSelected={arrSelected?.some((e) => e.id === item.id)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DriveHistoryListView;
