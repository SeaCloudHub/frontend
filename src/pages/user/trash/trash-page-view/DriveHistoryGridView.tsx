import React from 'react';
import Sort from '../../my-drive/content/Sort';
import { localEntriesToFiles } from '../../my-drive/content/DriveGridView';
import { LocalEntry } from '../../my-drive/MyDrive';

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

const FormatDateStrToYYYYMMDD = (dateStr: string): string => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const LocalEntryToTimeEntry = (entries: LocalEntry[]): TimeEntry[] => {
  const timeEntries: TimeEntry[] = [];
  entries.forEach((entry) => {
    const time = FormatDateStrToYYYYMMDD(entry.lastModified);
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

  timeEntries.sort((a, b) => {
    if (sort === 'Name') {
      return a.time.localeCompare(b.time) * (order === 'asc' ? 1 : -1);
    } else {
      return a.time.localeCompare(b.time) * (order === 'asc' ? -1 : 1);
    }
  });

  return (
    <div className='bg-white pl-5 pr-3 pt-4'>
      <div className='relative flex flex-col space-y-2'>
        <div className='absolute right-4 top-3'>
          <Sort sort={sort} order={order} setSort={setSort} />
        </div>
        {timeEntries.map((entry, index) => {
          return (
            <div key={index}>
              <div className='pb-4 pt-2 text-sm font-medium'>{entry.time}</div>
              <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
                {localEntriesToFiles(entry.entries)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DriveHistoryGridView;
