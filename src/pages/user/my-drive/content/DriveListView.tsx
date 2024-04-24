import React from 'react';
import { LocalEntry } from '@/hooks/drive.hooks';
import { DataRow } from './DataRow';
import { HeaderMyDriveProps } from '../MyDrive';
import Sort from './Sort';
import { Path } from '@/store/my-drive/myDrive.store';

type DriveListViewProps = {
  sort?: string;
  order?: string;
  setSort?: ({ sort, order }: { sort: string; order: string }) => void;
  setPath?: React.Dispatch<React.SetStateAction<Path>>;
  entries: LocalEntry[];
  onChanged?: () => void;
};

export const DriveListView: React.FC<DriveListViewProps> = ({ order, setSort, sort, entries, setPath, onChanged }) => {
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
                {/* <Sort sort={sort} order={order} setSort={setSort} /> */}
              </div>
            </div>
            {folders.map((entry, index) => {
              return (
                <DataRow
                  key={index}
                  {...entry}
                  onChanged={onChanged}
                  onDoubleClick={() => handlePath([{ id: entry.id, name: entry.title }])}
                />
              );
            })}
            {files.map((entry, index) => {
              return <DataRow key={index} {...entry} onChanged={onChanged} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};
