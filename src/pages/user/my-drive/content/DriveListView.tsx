import { LocalEntry } from '@/hooks/drive.hooks';
import { Path } from '@/store/my-drive/myDrive.store';
import React from 'react';
import { DataRow } from './DataRow';

type DriveListViewProps = {
  sort?: string;
  order?: string;
  setSort?: ({ sort, order }: { sort: string; order: string }) => void;
  setPath?: React.Dispatch<React.SetStateAction<Path>>;
  entries: LocalEntry[];
};

export const DriveListView: React.FC<DriveListViewProps> = ({ order, setSort, sort, entries, setPath }) => {
  const files = entries.filter((entry) => !entry.isDir);
  const folders = entries.filter((entry) => entry.isDir);

  const handlePath = (path: Path) => {
    setPath && setPath((prev) => [...prev, ...path]);
  };

  return (
    <>
      {entries.length === 0 ? (
        <div className='flex h-96 items-center justify-center'>
          <div className='text-center'>
            <div className='text-3xl font-semibold'>No files or folders here</div>
            <div className='text-gray-500'>Try uploading a file or creating a folder</div>
          </div>
        </div>
      ) : (
        <div className='pl-5 pr-3'>
          <div className='relative flex flex-col'>
          <div className='grid grid-cols-7 max-[1160px]:grid-cols-6 gap-3 border-b border-b-[#dadce0] pt-2'>
              <div className='col-span-4 font-medium'>Name</div>
              <div className='font-medium max-[1150px]:hidden'>Owner</div>
              <div className='font-medium max-[1000px]:hidden truncate'>Last Modified</div>
              <div className='font-medium max-[1160px]:hidden'>File Size</div>
            </div>
            {folders.map((entry, index) =>
              <DataRow key={index} {...entry} onDoubleClick={() => handlePath([{ id: entry.id, name: entry.title }])} />
            )}
            {files.map((entry, index) =>
              <DataRow key={index} {...entry} />
            )}
          </div>
        </div>
      )}
    </>
  );
};
