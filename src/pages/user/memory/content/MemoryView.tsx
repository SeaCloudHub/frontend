import { LocalEntry, useMemory } from '@/hooks/drive.hooks';
import { DataRow } from './DataRow';
import Sort from './Sort';
import Statistics from './Statistics';
import { useState } from 'react';
import { LinearProgress } from '@mui/material';
import { useSelected } from '@/store/my-drive/myDrive.store';

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

export const MemoryView: React.FC<MemoryViewProps> = ({ entries, isLoading, order, setSort, sort }) => {
  const files = entries.filter((entry) => !entry.isDir);
  const folders = entries.filter((entry) => entry.isDir);
  const { arrSelected, setArrSelected } = useSelected();

  return isLoading && entries.length < 15 ? (
    <LinearProgress className='translate-y-1' />
  ) : (
    <div className='select-none pl-5 pr-3'>
      <div className='relative flex flex-col'>
        <Statistics />
        <div className='sticky top-0 grid h-12 grid-cols-7 items-center space-x-3 border-b border-b-[#dadce0] bg-white pt-2 dark:bg-dashboard-dark'>
          <div className='col-span-6 text-sm font-medium max-[500px]:col-span-7'>Files using Drive storage</div>
          <div className='overflow-hidden max-[470px]:hidden'>
            <Sort sort={sort} order={order} setSort={setSort} />
          </div>
        </div>
        {folders.map((entry, index) => {
          return <DataRow key={index} {...entry} isSelected={arrSelected.some((e) => e.id === entry.id)} />;
        })}
        {files.map((entry, index) => {
          return <DataRow key={index} {...entry} isSelected={arrSelected.some((e) => e.id === entry.id)} />;
        })}
      </div>
    </div>
  );
};
