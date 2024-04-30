import FileCard from '@/components/core/file-card/FileCard';
import { LocalEntry } from '@/hooks/drive.hooks';
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import Sort from '../../my-drive/content/Sort';
import { FormatDateStrToDDMMYYYY } from '@/utils/function/formatDate.function';
import { useDrawer } from '@/store/my-drive/myDrive.store';

export type TimeEntry = {
  time: string;
  entries: LocalEntry[];
};

type DriveHistoryViewProps = {
  sort: string;
  order: string;
  setSort: ({ sort, order }: { sort: string; order: string }) => void;
  entries: LocalEntry[];
  setArrSelected: Dispatch<SetStateAction<string[]>>;
  arrSelected: string[];
};

export const LocalEntryToTimeEntry = (entries: LocalEntry[]): TimeEntry[] => {
  const timeEntries: TimeEntry[] = [];
  entries.forEach((entry) => {
    const time = FormatDateStrToDDMMYYYY(entry.lastModified);
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
  setArrSelected,
  arrSelected,
}) => {
  const timeEntries = LocalEntryToTimeEntry(entries);
  const driveGridViewRef = useRef(null);
  const fileCardRefs = useRef<NodeListOf<Element>>(null);
  const folderCardRefs = useRef<NodeListOf<Element>>(null);
  const { drawerOpen } = useDrawer();

  useEffect(() => {
    fileCardRefs.current = document.querySelectorAll('.file-card');
    folderCardRefs.current = document.querySelectorAll('.folder-card');

    const handleClickOutside = (event) => {
      if (event.ctrlKey) return;
      const clickedOutsideCards =
        Array.from(fileCardRefs.current).every((card) => !card.contains(event.target)) &&
        Array.from(folderCardRefs.current).every((card) => !card.contains(event.target));

      if (driveGridViewRef.current && driveGridViewRef.current.contains(event.target) && clickedOutsideCards) {
        setArrSelected && setArrSelected([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setArrSelected]);

  return (
    <div className=' pl-5 pr-3 pt-4' ref={driveGridViewRef}>
      <div className='relative flex flex-col space-y-2'>
        <div className='absolute right-4 top-3'>
          <Sort sort={sort} order={order} setSort={setSort} />
        </div>
        {timeEntries.map((entry, index) => (
          <div key={index}>
            <div className='pb-4 pt-2 text-sm font-medium'>{entry.time}</div>
            {entry.entries.length !== 0 && (
              <div className={`grid gap-4 ${drawerOpen ? 'xl:grid-cols-3' : 'sm:grid-cols-2 xl:grid-cols-5'}`}>
                {entry.entries.map((file, index) => (
                  <div key={index} className='aspect-square w-auto'>
                    <FileCard
                      title={file.title}
                      icon={file.icon}
                      preview={file.preview}
                      id={file.id}
                      parent='trash'
                      setArrSelected={setArrSelected}
                      isSelected={arrSelected.includes(file.id)}
                      fileType={file.fileType}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriveHistoryGridView;
