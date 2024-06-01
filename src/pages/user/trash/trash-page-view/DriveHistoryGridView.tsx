import FileCard from '@/components/core/file-card/FileCard';
import { LocalEntry } from '@/hooks/drive.hooks';
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import Sort from '../../my-drive/content/Sort';
import { FormatDateStrToDDMMYYYY, formatDate } from '@/utils/function/formatDate.function';
import { useDrawer, useSelected } from '@/store/my-drive/myDrive.store';
import { CircularProgress, LinearProgress } from '@mui/material';

export type TimeEntry = {
  time: string;
  entries: LocalEntry[];
};

type DriveHistoryViewProps = {
  sort?: string;
  order?: string;
  setSort?: ({ sort, order }: { sort: string; order: string }) => void;
  entries: TimeEntry[];
  dir: { id: string; name: string };
  isLoading?: boolean;
  isScrolling?: boolean;
};

export const LocalEntryToTimeEntry = (entries: LocalEntry[]): TimeEntry[] => {
  const timeEntries: TimeEntry[] = [];
  // entries.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());
  entries.forEach((entry) => {
    const time = formatDate(entry.lastModified);
    const timeEntry = timeEntries.find((timeEntry) => timeEntry.time === time);
    if (timeEntry) {
      timeEntry.entries.push(entry);
    } else {
      timeEntries.push({ time, entries: [entry] });
    }
  });
  return timeEntries;
};

const DriveHistoryGridView: React.FC<DriveHistoryViewProps> = ({
  sort,
  order,
  setSort,
  entries,
  dir,
  isLoading,
  isScrolling,
}) => {
  const driveGridViewRef = useRef(null);
  const { drawerOpen } = useDrawer();
  const { setArrSelected, arrSelected } = useSelected();

  useEffect(() => {
    const fileCardRefs = document.querySelectorAll('.file-card');

    const handleClickOutside = (event) => {
      if (event.ctrlKey) return;
      const clickedOutsideCards = Array.from(fileCardRefs).every((card) => !card.contains(event.target));

      if (driveGridViewRef.current && driveGridViewRef.current.contains(event.target) && clickedOutsideCards) {
        setArrSelected([]);
        console.log('setArrSelected([])');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [arrSelected, setArrSelected]);

  return isLoading && entries.map((item) => item.entries).flat().length < 15 ? (
    <LinearProgress className='translate-y-1' />
  ) : entries.length === 0 ? (
    <div className='flex h-96 select-none items-center justify-center'>
      <div className='text-center'>
        <div className='text-3xl font-semibold'>Trash is empty</div>
        <div className='line-clamp-2 text-gray-500'>
          You can move files that you don't need to the trash. <br /> Files in the trash will be permanently deleted after 30
          days.
        </div>
      </div>
    </div>
  ) : (
    <div className='mx-5 mt-2 h-full select-none' ref={driveGridViewRef}>
      <div className='flex flex-col space-y-2'>
        {/* <div className='absolute right-4 top-3 z-10'>
          <Sort sort={sort} order={order} setSort={setSort} />
        </div> */}
        {entries.length === 0 && (
          <div className='flex h-96 items-center justify-center'>
            <div className='text-center'>
              <div className='text-3xl font-semibold'>Trash is empty</div>
              <div className='line-clamp-2 text-gray-500'>
                You can move files that you don't need to the trash. <br /> Files in the trash will be permanently deleted after
                30 days.
              </div>
            </div>
          </div>
        )}
        {entries.length &&
          entries.map((entry, index) => (
            <div key={index} className='relative'>
              <div className='sticky top-0 bg-white pb-4 pt-2 text-sm font-medium dark:bg-dashboard-dark'>{entry.time}</div>
              {entry.entries.length !== 0 && (
                <div className={`grid gap-4 ${drawerOpen ? 'xl:grid-cols-3' : 'sm:grid-cols-2 xl:grid-cols-5'}`}>
                  {entry.entries.map((file, index) => (
                    <div key={index} className='aspect-square'>
                      <FileCard
                        title={file.title}
                        icon={file.icon}
                        preview={file.preview}
                        id={file.id}
                        parent='trash'
                        fileType={file.fileType}
                        isSelected={arrSelected.some((e) => e.id === file.id)}
                        isDir={file.isDir}
                        dir={dir}
                        userRoles={file.userRoles}
                        is_starred={file.is_starred}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        {isScrolling && (
          <div className='h-fit text-center'>
            <CircularProgress className='translate-y-1' />
          </div>
        )}
      </div>
    </div>
  );
};

export default DriveHistoryGridView;
