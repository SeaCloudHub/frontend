import FileCard from '@/components/core/file-card/FileCard';
import { LocalEntry } from '@/hooks/drive.hooks';
import React from 'react';
import Sort from '../../my-drive/content/Sort';
import { FormatDateStrToDDMMYYYY } from '@/utils/function/formatDate.function';

export type TimeEntry = {
  time: string;
  entries: LocalEntry[];
};

type DriveHistoryViewProps = {
  sort: string;
  order: string;
  setSort: ({ sort, order }: { sort: string; order: string }) => void;
  entries: LocalEntry[];
};

export const LocalEntryToTimeEntry = (entries: LocalEntry[]): TimeEntry[] => {
  const timeEntries: TimeEntry[] = [];
  entries.forEach((entry) => {
    const time = FormatDateStrToDDMMYYYY(entry.lastModified);
    const timeEntry = timeEntries.find((timeEntry) => timeEntry.time === time);
    if (timeEntry) {
      timeEntry.entries.push(entry);
    } else {
      timeEntries.push({ time, entries: [entry] });
    }
  });
  return timeEntries;
};

const DriveHistoryGridView: React.FC<DriveHistoryViewProps> = ({ sort, order, setSort, entries }) => {
  const timeEntries = LocalEntryToTimeEntry(entries);

  return (
    <div className=' pl-5 pr-3 pt-4'>
      <div className='relative flex flex-col space-y-2'>
        <div className='absolute right-4 top-3'>
          <Sort sort={sort} order={order} setSort={setSort} />
        </div>
        {timeEntries.map((entry, index) => (
          <div key={index}>
            <div className='pb-4 pt-2 text-sm font-medium'>{entry.time}</div>
            {entry.entries.length !== 0 && (
              <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
                {entry.entries.map((file, index) => (
                  <div key={index} className='aspect-square w-auto'>
                    <FileCard title={file.title} icon={file.icon} preview={file.preview} id={file.id} parent='trash' />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriveHistoryGridView;
