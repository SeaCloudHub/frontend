import FileCard from '@/components/core/file-card/FileCard';
import FolderCard from '@/components/core/folder-card/FolderCard';
import { LocalEntry } from '@/hooks/drive.hooks';
import { Path, useDrawer } from '@/store/my-drive/myDrive.store';
import { CUSTOMER_MY_DRIVE } from '@/utils/constants/router.constant';
import { LinearProgress } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

type DriveGridViewProps = {
  curDir?: { id: string; name: string };
  sort?: string;
  order?: string;
  setSort?: ({ sort, order }: { sort: string; order: string }) => void;
  arrSelected?: string[];
  setArrSelected?: React.Dispatch<React.SetStateAction<string[]>>;
  entries: LocalEntry[];
  fileShow?: boolean;
  folderShow?: boolean;
  // setPath?: React.Dispatch<React.SetStateAction<Path>>;
  // setSelected?: React.Dispatch<React.SetStateAction<{ id: string; name: string }>>;
  // selected?: { id: string; name: string };
  isLoading?: boolean;
};

export const DriveGridView: React.FC<DriveGridViewProps> = ({
  entries,
  fileShow,
  folderShow,
  // setPath,
  isLoading,
  curDir,
  setArrSelected,
  arrSelected,
}) => {
  const files = entries.filter((entry) => !entry.isDir);
  const folders = entries.filter((entry) => entry.isDir);

  // const handlePath = (path: Path) => {
  //   setPath && setPath((prev) => [...prev, ...path]);
  // };

  const navigate = useNavigate();
  const { drawerOpen } = useDrawer();
  console.log('[DriveGridView] drawerOpen', drawerOpen);

  const driveGridViewRef = useRef(null);
  const fileCardRefs = useRef<NodeListOf<Element>>(null);
  const folderCardRefs = useRef<NodeListOf<Element>>(null);

  useEffect(() => {
    fileCardRefs.current = document.querySelectorAll('.file-card');
    folderCardRefs.current = document.querySelectorAll('.folder-card');
    // console.log('[DriveGridView] fileCardRefs', Array.from(fileCardRefs.current));

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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setArrSelected]);

  return (
    <>
      {isLoading ? (
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
          <div className='relative flex flex-col space-y-2'>
            {folders.length !== 0 && (
              <div className={!folderShow ? 'visible' : 'hidden'}>
                <div className='pb-4 pt-2 text-sm font-medium'> Folders</div>
                <div className={`grid grid-cols-1 gap-4 ${drawerOpen ? 'xl:grid-cols-3' : 'sm:grid-cols-2 xl:grid-cols-5'}`}>
                  {folders.map((folder, index) => (
                    <div key={index} className='w-auto'>
                      <FolderCard
                        title={folder.title}
                        icon={folder.icon}
                        id={folder.id}
                        onDoubleClick={() => {
                          // handlePath([{ id: folder.id, name: folder.title }]);
                          navigate(`${CUSTOMER_MY_DRIVE}/dir/${folder.id}`);
                        }}
                        onClick={() => setArrSelected && setArrSelected([folder.id])}
                        isSelected={arrSelected?.includes(folder.id)}
                        setArrSelected={setArrSelected}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {files.length !== 0 && (
              <div className={!fileShow ? 'visible' : 'hidden'}>
                <div className='pb-4 pt-2 text-sm font-medium'>Files</div>
                <div className={`grid gap-4 ${drawerOpen ? 'xl:grid-cols-3' : 'sm:grid-cols-2 xl:grid-cols-5'}`}>
                  {files.map((file, index) => (
                    <div key={index} className='aspect-square w-auto'>
                      <FileCard
                        title={file.title}
                        icon={file.icon}
                        preview={file.preview}
                        id={file.id}
                        dirId={curDir?.id}
                        onClick={() => setArrSelected && setArrSelected([file.id])}
                        isSelected={arrSelected?.includes(file.id)}
                        setArrSelected={setArrSelected}
                        fileType={file.fileType}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
