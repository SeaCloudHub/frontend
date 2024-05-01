import { LocalEntry } from '@/hooks/drive.hooks';
import React from 'react';
import { DataRow } from '../../my-drive/content/DataRow';
import Sort from '../../my-drive/content/Sort';
import { LocalEntryToTimeEntry } from './DriveHistoryGridView';

type DriveHistoryListViewProps = {
  sort: string;
  order: string;
  setSort: ({ sort, order }: { sort: string; order: string }) => void;
  entries: LocalEntry[];
};

const DriveHistoryListView: React.FC<DriveHistoryListViewProps> = ({ sort, order, setSort, entries }) => {
  const timeEntries = LocalEntryToTimeEntry(entries);

  timeEntries.sort((a, b) => {
    if (sort === 'Name') {
      return a.time.localeCompare(b.time) * (order === 'asc' ? 1 : -1);
    } else {
      return a.time.localeCompare(b.time) * (order === 'asc' ? -1 : 1);
    }
  });

  return (
    <div className=' pl-5 pr-3'>
      <div className='relative flex flex-col'>
        <div className='grid grid-cols-7 gap-3 border-b border-b-[#dadce0] pt-2 max-[1160px]:grid-cols-6'>
          <div className='col-span-4 font-medium'>Name</div>
          <div className='font-medium max-[1150px]:hidden'>Owner</div>
          <div className='truncate font-medium max-[1000px]:hidden'>Last Modified</div>
          <div className='font-medium max-[1160px]:hidden'>File Size</div>
        </div>
        {timeEntries.map((entry, index) => {
          return (
            <div key={index}>
              <div className='border-b py-1 font-medium'>{entry.time}</div>
              {entry.entries.map((item, index) => {
                return <DataRow key={index} {...item} parent='trash' />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DriveHistoryListView;
