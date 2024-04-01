import React from 'react';
import { LocalEntry } from '../MyDrive';
import { DataRow } from '../temp-components/DataRow';
import { HeaderMyDriveProps } from '../MyDrive';
import { Icon } from '@iconify/react/dist/iconify.js';

type DriveListViewProps = {};

export const DriveListView: React.FC<DriveListViewProps> = ({}) => {
  return (
    <div className='bg-white pl-5 pr-3'>
      <div className='flex flex-col'>
        <div className='flex h-12 items-center space-x-3 pt-2'>
          <div className='shrink grow basis-[304px] text-sm font-medium'>Name</div>
          <div className='shrink-0 grow-0 basis-[215px] text-sm font-medium'>Owner</div>
          <div className='shrink-0 grow-0 basis-[200px] text-sm font-medium'>Last modified</div>
          <div className='shrink-0 grow-0 basis-[88px] text-sm font-medium'>File size</div>
          <div className='shrink-0 grow-0 basis-[192px] text-sm font-medium'></div>
        </div>
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
