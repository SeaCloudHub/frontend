import FileCard from '@/components/core/file-card/FileCard';
import FolderCard from '@/components/core/folder-card/FolderCard';
import { LocalEntry } from '@/hooks/drive.hooks';
import { Path, useDrawer, useEntries, useSelected } from '@/store/my-drive/myDrive.store';
import { DRIVE_MY_DRIVE } from '@/utils/constants/router.constant';
import { LinearProgress } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

type DriveGridViewProps = {
  curDir?: { id: string; name: string };
  sort?: string;
  order?: string;
  setSort?: ({ sort, order }: { sort: string; order: string }) => void;
  entries: LocalEntry[];
  fileShow?: boolean;
  folderShow?: boolean;
  isLoading?: boolean;
  parent?: 'priority' | 'my-drive' | 'shared' | 'trash' | 'starred';
};

export const DriveGridView: React.FC<DriveGridViewProps> = ({
  entries,
  fileShow,
  folderShow,
  isLoading,
  curDir,
  parent,
}) => {
  // console.log('DriveGridView', entries);
  // const files = entries.filter((entry) => !entry.isDir);
  // const folders = entries.filter((entry) => entry.isDir);
  const showEntry = fileShow ? entries.filter((entry) => !entry.isDir) : folderShow ? entries.filter((entry) => entry.isDir) : entries;
  const driveGridViewRef = useRef(null);

  const navigate = useNavigate();
  const { drawerOpen } = useDrawer();
  const { setArrSelected, arrSelected } = useSelected();

  useEffect(() => {
    const fileCardRefs = document.querySelectorAll('.file-card');
    const folderCardRefs = document.querySelectorAll('.folder-card');

    const handleClickOutside = (event) => {
      if (event.ctrlKey) return;
      const clickedOutsideCards =
        Array.from(fileCardRefs).every((card) => !card.contains(event.target)) &&
        Array.from(folderCardRefs).every((card) => !card.contains(event.target));

      if (driveGridViewRef.current && driveGridViewRef.current.contains(event.target) && clickedOutsideCards) {
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
      {isLoading && entries.length < 15 ? (
        <LinearProgress className='translate-y-1' />
      ) : entries.length === 0 ? (
        <div className='flex h-96 items-center justify-center'>
          <div className='text-center'>
            <div className='text-3xl font-semibold'>No files or folders here</div>
            <div className='text-gray-500'>Try uploading a file or creating a folder</div>
          </div>
        </div>
      ) : (
        <div ref={driveGridViewRef} className='pl-5 pr-3 pt-4'>
          <div className='relative flex flex-col space-y-2 min-w-40 overflow-y-auto overflow-hidden'>
            {/* {folders.length !== 0 && (
              <div className={!folderShow ? 'visible' : 'hidden'}>
                <div className='pb-4 pt-2 text-sm font-medium'> Folders</div>
                <div className={`grid grid-cols-1 gap-4 ${drawerOpen ? 'xl:grid-cols-3' : 'sm:grid-cols-2 xl:grid-cols-5'}`}>
                  {folders.map((folder, index) => (
                    <div key={index} className='w-auto'>
                      <FolderCard
                        title={folder.title}
                        icon={folder.icon}
                        id={folder.id}
                        onDoubleClick={() => navigate(`${DRIVE_MY_DRIVE}/dir/${folder.id}`)}
                        onClick={() => setArrSelected([folder.id])}
                        isSelected={arrSelected?.includes(folder.id)}
                        parent={parent}
                        dir={curDir}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )} */}
            {entries.length !== 0 && (
              <>
                <div className='pb-4 text-sm font-medium'>{folderShow ? 'Folders' : fileShow ? 'Files' : 'All'}</div>
                <div className={`grid grid-cols-1 gap-4 ${drawerOpen ? 'xl:grid-cols-3' : 'sm:grid-cols-2 xl:grid-cols-5'}`}>
                  {showEntry.map((entry, index) => (
                    folderShow ? (
                      <div key={index} className='w-auto'>
                        <FolderCard
                          title={entry.title}
                          icon={entry.icon}
                          id={entry.id}
                          onDoubleClick={() => navigate(`${DRIVE_MY_DRIVE}/dir/${entry.id}`)}
                          onClick={() => setArrSelected([entry.id])}
                          isSelected={arrSelected?.includes(entry.id)}
                          parent={parent}
                          dir={curDir}
                        />
                      </div>
                    ) : (
                      <div key={index} className='aspect-square '>
                        <FileCard
                          isDir={entry.isDir}
                          title={entry.title}
                          icon={entry.icon}
                          preview={entry.preview}
                          id={entry.id}
                          dir={curDir}
                          isSelected={arrSelected?.includes(entry.id)}
                          fileType={entry.fileType}
                          parent={parent}
                        />
                      </div>
                    )
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
