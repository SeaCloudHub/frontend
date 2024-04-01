import DriveViewMode from '../header/DriveViewMode';
import { Path } from '@/store/my-drive/myDrive.store';
import InfoButton from './InfoButton';
import DrivePath from '../header/drive-path/DrivePath';
import DriveFilter from '../header/DriveFilter';
import { useState } from 'react';

type MyDriveHeaderProps = {
  path: Path;
  setPath: (path: Path) => void;
  typeFilter: string;
  peopleFilter: string;
  modifiedFilter: string;
  setTypeFilter: (type: string) => void;
  setPeopleFilter: (people: string) => void;
  setModifiedFilter: (modified: string) => void;
};

const MyDriveHeader: React.FC<MyDriveHeaderProps> = ({
  path,
  setPath,
  modifiedFilter,
  peopleFilter,
  typeFilter,
  setModifiedFilter,
  setPeopleFilter,
  setTypeFilter,
}) => {
  return (
    <div className='flex flex-col bg-white pr-3'>
      <div className='flex'>
        <div className='w-full pb-[8px] pl-1 pt-[14px]'>
          <DrivePath path={path} setPath={setPath} />
        </div>
        <div className='flex items-center pb-[6px] pl-[25px] pr-[11px] pt-[14px]'>
          <DriveViewMode />
          <div className='mx-1 my-0.5'>
            <InfoButton />
          </div>
        </div>
      </div>
      <div className='flex items-center gap-3 pl-5'>
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
    </div>
  );
};

export default MyDriveHeader;
