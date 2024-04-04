import React from 'react';
import { LocalEntry } from '../MyDrive';
import { DataRow } from './DataRow';
import { HeaderMyDriveProps } from '../MyDrive';
import Sort from './Sort';

type DriveListViewProps = {
  sort: string;
  order: string;
  setSort: ({ sort, order }: { sort: string; order: string }) => void;
  entries: LocalEntry[];
};

export const DriveListView: React.FC<DriveListViewProps> = ({ order, setSort, sort, entries }) => {
  const files = entries.filter((entry) => !entry.isDir);
  const folders = entries.filter((entry) => entry.isDir);

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

export const _renderListView = (entries: LocalEntry[]) => {
  return (
    <div className='flex flex-col'>
      {_header({ name: 'Name', owner: 'Owner', lastModified: 'Last Modified', size: 'Size' })}
      {entries.map((entry, index) => {
        return <DataRow key={index} {...entry} />;
      })}
    </div>
  );
};
const _header: React.FC<HeaderMyDriveProps> = ({ name, owner, lastModified, size }) => {
  return (
    <div className='flex items-center pb-2'>
      <div className='flex-1 basis-72 text-sm font-medium'>{name}</div>
      <div className='basis-64 text-sm font-medium max-2xl:basis-36 max-lg:hidden'>{owner}</div>
      <div className='basis-48 text-sm font-medium max-2xl:shrink max-md:hidden'>{lastModified}</div>
      <div className='basis-20 text-sm font-medium max-xl:hidden'>{size}</div>
      <div className='flex basis-48 justify-end max-2xl:basis-12'>
        {/* <Icon
              icon="ic:baseline-more-vert"
              className="h-7 w-7 rounded-full p-1 hover:bg-surfaceContainerLow"
            /> */}
      </div>
    </div>
  );
};
