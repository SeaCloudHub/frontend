import DriveViewMode from './DriveViewMode';
import { Path } from '@/store/my-drive/myDrive.store';
import InfoButton from './InfoButton';
import DrivePath from './drive-path/DrivePath';
import DriveFilter from './DriveFilter';
import { useState } from 'react';
import Sort from '../content/Sort';

type MyDriveHeaderProps = {
  path: Path;
  typeFilter: string;
  peopleFilter: string;
  modifiedFilter: string;
  setTypeFilter: (type: string) => void;
  setPeopleFilter: (people: string) => void;
  setModifiedFilter: (modified: string) => void;
  sort: string;
  order: string;
  setSort: ({ sort, order }: { sort: string; order: string }) => void;
};

const MyDriveHeader: React.FC<MyDriveHeaderProps> = ({
  path,
  modifiedFilter,
  setModifiedFilter,
  peopleFilter,
  setPeopleFilter,
  typeFilter,
  setTypeFilter,
  sort,
  order,
  setSort,
}) => {
  return (
    <div className='flex flex-col bg-white pr-3'>
      <div className='flex'>
        <div className='w-full pb-[8px] pl-1 pt-[14px]'>
          <DrivePath path={path} />
        </div>
        <div className='flex items-center pb-[6px] pl-[25px] pr-[11px] pt-[14px]'>
          <DriveViewMode />
          <div className='mx-1 my-0.5'>
            <InfoButton />
          </div>
        </div>
      </div>
      <div className='flex items-center justify-between pl-5 pr-3'>
        <div className='flex items-center gap-3'>
          <DriveFilter
            setModifiedFilter={setModifiedFilter}
            setPeopleFilter={setPeopleFilter}
            setTypeFilter={setTypeFilter}
            modifiedFilter={modifiedFilter}
            peopleFilter={peopleFilter}
            typeFilter={typeFilter}
          />
          {(typeFilter || peopleFilter || modifiedFilter) && (
            <div className='flex h-7 items-center rounded-full px-[12px] py-[1px] hover:bg-[#ededed]'>
              <div
                onClick={() => {
                  setTypeFilter('');
                  setPeopleFilter('');
                  setModifiedFilter('');
                }}
                className='cursor-pointer text-sm font-medium'>
                Clear filters
              </div>
            </div>
          )}
        </div>
        <Sort sort={sort} order={order} setSort={setSort} />
      </div>
    </div>
  );
};

export default MyDriveHeader;
