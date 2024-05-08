import { LocalEntry } from '@/hooks/drive.hooks';
import { Path, useSelected } from '@/store/my-drive/myDrive.store';
import React, { useEffect, useRef } from 'react';
import { DataRow } from './DataRow';
import { useNavigate } from 'react-router-dom';
import { CUSTOMER_MY_DRIVE } from '@/utils/constants/router.constant';

type DriveListViewProps = {
  sort?: string;
  order?: string;
  setSort?: ({ sort, order }: { sort: string; order: string }) => void;
  // setPath?: React.Dispatch<React.SetStateAction<Path>>;
  entries: LocalEntry[];
  isLoading?: boolean;
  curDir?: { id: string; name: string };
  // arrSelected?: string[];
  // setArrSelected?: React.Dispatch<React.SetStateAction<string[]>>;
  parent?: 'priority' | 'my-drive' | 'shared' | 'trash' | 'starred';
};

export const DriveListView: React.FC<DriveListViewProps> = ({
  order,
  setSort,
  sort,
  entries,
  // arrSelected,
  // setArrSelected,
  curDir,
  parent,
}) => {
  const files = entries.filter((entry) => !entry.isDir);
  const folders = entries.filter((entry) => entry.isDir);

  const navigate = useNavigate();
  const { setArrSelected, arrSelected } = useSelected();
  const driveListViewRef = useRef(null);

  useEffect(() => {
    const DataRows = document.querySelectorAll('.data-row');

    const handleClickOutside = (event) => {
      if (event.ctrlKey) return;
      const clickedOutsideRows = Array.from(DataRows).every((row) => !row.contains(event.target))

      if (driveListViewRef.current && driveListViewRef.current.contains(event.target) && clickedOutsideRows) {
        setArrSelected([]);
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
        <div className='pl-5 pr-3' ref={driveListViewRef}>
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
                dir={curDir}
                {...entry}
                onDoubleClick={() => {
                  navigate(`${CUSTOMER_MY_DRIVE}/dir/${entry.id}`);
                } }
                isSelected={arrSelected?.includes(entry.id)}
                parent={parent}              />
            ))}
            {files.map((entry, index) => (
              <DataRow
                key={index}
                {...entry}
                dir={curDir}
                // onClick={() => setArrSelected && setArrSelected([entry.id])}
                isSelected={arrSelected?.includes(entry.id)}
                parent={parent}
                // setArrSelected={setArrSelected}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
