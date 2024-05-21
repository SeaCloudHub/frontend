import { LocalEntry, useMemory } from '@/hooks/drive.hooks';
import { DataRow } from './DataRow';
import Sort from './Sort';
import Statistics from './Statistics';
import { useState } from 'react';
import { LinearProgress } from '@mui/material';

export type Sort = {
  sort: string;
  order: 'asc' | 'desc';
};

type MemoryViewProps = {
  entries: LocalEntry[];
  isLoading: boolean;
  order: 'asc' | 'desc';
  sort: string;
  setSort: ({ sort, order }: { sort: string; order: 'asc' | 'desc' }) => void;
};


export const MemoryView: React.FC<MemoryViewProps> = ({entries, isLoading, order, setSort, sort}) => {
  const files = entries.filter((entry) => !entry.isDir);
  const folders = entries.filter((entry) => entry.isDir);

  return (
    isLoading && entries.length < 15 ? <LinearProgress className='translate-y-1' /> :
    <div className='pl-5 pr-3'>
      <div className='relative flex flex-col'>
        <Statistics />
        <div className='sticky grid grid-cols-7 top-0 h-12 items-center space-x-3 border-b border-b-[#dadce0] pt-2 dark:bg-dashboard-dark bg-white'>
          <div className='text-sm font-medium col-span-6 max-[500px]:col-span-7'>Files using Drive storage</div>
          <div className='max-[500px]:hidden'>
            <Sort sort={sort} order={order} setSort={setSort} />
          </div>
        </div>
        {folders.map((entry, index) => {
          return <DataRow key={index} {...entry} />;
        })}
        {files.map((entry, index) => {
          return <DataRow key={index} {...entry} />;
        })}
      </div>
    </div>
  );
};
