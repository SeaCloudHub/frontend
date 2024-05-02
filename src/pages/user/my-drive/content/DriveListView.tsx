import { LocalEntry } from '@/hooks/drive.hooks';
import { Path } from '@/store/my-drive/myDrive.store';
import React, { useEffect, useRef } from 'react';
import { DataRow } from './DataRow';
import { useNavigate } from 'react-router-dom';
import { CUSTOMER_MY_DRIVE } from '@/utils/constants/router.constant';

type DriveListViewProps = {
  sort?: string;
  order?: string;
  setSort?: ({ sort, order }: { sort: string; order: string }) => void;
  setPath?: React.Dispatch<React.SetStateAction<Path>>;
  entries: LocalEntry[];
  isLoading?: boolean;
  curDir?: { id: string; name: string };
  arrSelected?: string[];
  setArrSelected?: React.Dispatch<React.SetStateAction<string[]>>;
};

export const DriveListView: React.FC<DriveListViewProps> = ({
  order,
  setSort,
  sort,
  entries,
  arrSelected,
  setArrSelected,
  curDir,
}) => {
  const files = entries.filter((entry) => !entry.isDir);
  const folders = entries.filter((entry) => entry.isDir);

  const navigate = useNavigate();
  const driveGridViewRef = useRef(null);

  useEffect(() => {
    const DataRows = document.querySelectorAll('.data-row');

    const handleClickOutside = (event) => {
      if (event.ctrlKey) return;
      const clickedOutsideRows = Array.from(DataRows).every((row) => !row.contains(event.target))

      if (driveGridViewRef.current && driveGridViewRef.current.contains(event.target) && clickedOutsideRows) {
        setArrSelected && setArrSelected([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [arrSelected, setArrSelected]);

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
        <div className='pl-5 pr-3' ref={driveGridViewRef}>
          <div className='relative flex flex-col'>
            <div className='grid grid-cols-7 gap-3 border-b border-b-[#dadce0] pt-2 max-[1160px]:grid-cols-6'>
              <div className='col-span-4 font-medium'>Name</div>
              <div className='font-medium max-[1150px]:hidden'>Owner</div>
              <div className='truncate font-medium max-[1000px]:hidden'>Last Modified</div>
              <div className='font-medium max-[1160px]:hidden'>File Size</div>
            </div>
            {folders.map((entry, index) => (
              <DataRow
                key={index}
                {...entry}
                onDoubleClick={() => {
                  navigate(`${CUSTOMER_MY_DRIVE}/dir/${entry.id}`);
                }}
                onClick={() => setArrSelected && setArrSelected([entry.id])}
                isSelected={arrSelected?.includes(entry.id)}
                setArrSelected={setArrSelected}
              />
            ))}
            {files.map((entry, index) => (
              <DataRow
                key={index}
                {...entry}
                dirId={curDir?.id}
                onClick={() => setArrSelected && setArrSelected([entry.id])}
                isSelected={arrSelected?.includes(entry.id)}
                setArrSelected={setArrSelected}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
