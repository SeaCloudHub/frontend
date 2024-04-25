import React from 'react';
import { LocalEntry } from '@/hooks/drive.hooks';
import Sort from '../../my-drive/content/Sort';
import { DataRow } from '../../my-drive/content/DataRow';
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
    <div className='bg-white pl-5 pr-3'>
      <div className='relative flex flex-col'>
        <div className='flex h-12 items-center space-x-3 border-b border-b-[#dadce0] pt-2'>
          <div className='shrink grow basis-[304px] text-sm font-medium'>Name</div>
          <div className='shrink-0 grow-0 basis-[215px] text-sm font-medium max-[1450px]:basis-[140px] max-[1050px]:hidden'>
            Owner
          </div>
          <div className='shrink-0 grow-0 basis-[200px] text-sm font-medium max-[1450px]:basis-[144px] max-[1000px]:hidden'>
            Last modified
          </div>
          <div className='shrink-0 grow-0 basis-[88px] text-sm font-medium max-[1450px]:basis-[88px] max-[1160px]:hidden'>
            File size
          </div>
          <div className='flex shrink-0 grow-0 basis-[192px] justify-end text-sm font-medium max-[1450px]:basis-[48px]'>
            <Sort sort={sort} order={order} setSort={setSort} />
          </div>
        </div>
        {timeEntries.map((entry, index) => {
          return (
            <div key={index}>
              <div className='border-b py-1 text-sm font-medium'>{entry.time}</div>
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
