import { LocalEntry, SuggestedEntry } from '@/hooks/drive.hooks';
import { useCursorActivity, useSelected } from '@/store/my-drive/myDrive.store';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DataRowPriorityView from './DataRowPriorityView';
import { DRIVE_MY_DRIVE } from '@/utils/constants/router.constant';

type PriorityListViewProps = {
  sort?: string;
  order?: string;
  setSort?: ({ sort, order }: { sort: string; order: string }) => void;
  entries: SuggestedEntry[];
  isLoading?: boolean;
  curDir?: { id: string; name: string };
  parrent?: 'priority' | 'my-drive' | 'shared' | 'trash' | 'starred';
};

const PriorityListView: React.FC<PriorityListViewProps> = ({ entries, curDir, isLoading, order, setSort, sort, parrent }) => {
  const files = entries.filter((entry) => !entry.isDir);
  const folders = entries.filter((entry) => entry.isDir);
  const driveListViewRef = useRef(null);

  const navigate = useNavigate();
  const { setArrSelected, arrSelected } = useSelected();
  const { resetCursorActivity } = useCursorActivity();

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
        <div className='h-full pl-5 pr-5' ref={driveListViewRef}>
          <div className='relative flex flex-col'>
            <div className='grid grid-cols-8 gap-3 border-b border-b-[#dadce0] pt-2 max-[1160px]:grid-cols-6'>
              <div className='col-span-4 font-medium'>Name</div>
              <div className='col-span-2 font-medium max-[1150px]:hidden'>Suggested reasons</div>
              <div className='truncate font-medium max-[1000px]:hidden'>Owner</div>
              <div className='font-medium max-[1160px]:hidden'>Location</div>
            </div>
            {folders.map((entry, index) => (
              <DataRowPriorityView
                dir={curDir}
                key={index}
                {...entry}
                isSelected={arrSelected?.some((e) => e.id === entry.id)}
                onDoubleClick={() => navigate(`${DRIVE_MY_DRIVE}/dir/${entry.id}`)}
              />
            ))}
            {files.map((entry, index) => (
              <DataRowPriorityView key={index} {...entry} dir={curDir} isSelected={arrSelected?.some((e) => e.id === entry.id)} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PriorityListView;
