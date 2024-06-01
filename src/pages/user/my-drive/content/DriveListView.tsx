import { LocalEntry } from '@/hooks/drive.hooks';
import { Path, useCursor, useCursorActivity, useSelected } from '@/store/my-drive/myDrive.store';
import React, { useEffect, useRef } from 'react';
import { DataRow } from './DataRow';
import { useNavigate } from 'react-router-dom';
import { DRIVE_MY_DRIVE } from '@/utils/constants/router.constant';
import { CircularProgress, LinearProgress } from '@mui/material';

type DriveListViewProps = {
  sort?: string;
  order?: string;
  setSort?: ({ sort, order }: { sort: string; order: string }) => void;
  entries: LocalEntry[];
  isLoading?: boolean;
  curDir?: { id: string; name: string };
  isScrolling?: boolean;
  parent?: 'priority' | 'my-drive' | 'shared' | 'trash' | 'starred';
  isSearchPage?: boolean;
};

export const DriveListView: React.FC<DriveListViewProps> = ({
  order,
  setSort,
  sort,
  entries,
  curDir,
  parent,
  isScrolling,
  isLoading,
}) => {
  const files = entries.filter((entry) => !entry.isDir);
  const folders = entries.filter((entry) => entry.isDir);

  const navigate = useNavigate();
  const { setArrSelected, arrSelected } = useSelected();
  const { nextCursor } = useCursor();
  const { resetCursorActivity } = useCursorActivity();
  const driveListViewRef = useRef(null);

  useEffect(() => {
    const DataRows = document.querySelectorAll('.data-row');

    const handleClickOutside = (event) => {
      if (event.ctrlKey) return;
      const clickedOutsideRows = Array.from(DataRows).every((row) => !row.contains(event.target));

      if (driveListViewRef.current && driveListViewRef.current.contains(event.target) && clickedOutsideRows) {
        setArrSelected([]);
        resetCursorActivity();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [arrSelected, resetCursorActivity, setArrSelected]);

  return (
    <>
      {isLoading && !nextCursor ? (
        <LinearProgress className='translate-y-1' />
      ) : entries.length === 0 ? (
        <div className='flex h-96 items-center justify-center'>
          <div className='text-center'>
            <div className='text-3xl font-semibold'>No files or folders here</div>
            <div className='text-gray-500'>Try uploading a file or creating a folder</div>
          </div>
        </div>
      ) : (
        <div className='h-full pl-5 pr-5' ref={driveListViewRef}>
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
                  navigate(`${DRIVE_MY_DRIVE}/dir/${entry.id}`);
                }}
                isSelected={arrSelected?.some((e) => e.id === entry.id)}
                parent={parent}
              />
            ))}
            {files.map((entry, index) => (
              <DataRow
                key={index}
                {...entry}
                dir={curDir}
                isSelected={arrSelected?.some((e) => e.id === entry.id)}
                parent={parent}
                userRoles={entry.userRoles}
              />
            ))}
            {isScrolling && (
              <div className='h-fit text-center'>
                <CircularProgress />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
