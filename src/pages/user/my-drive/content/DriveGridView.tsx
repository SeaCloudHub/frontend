import React, { useEffect, useRef } from 'react';
import Sort from './Sort';
import FolderCard from '@/components/core/folder-card/FolderCard';
import FileCard from '@/components/core/file-card/FileCard';
import { LocalEntry } from '@/hooks/drive.hooks';
import { Path } from '@/store/my-drive/myDrive.store';
import { useNavigate, useParams } from 'react-router-dom';
import { CUSTOMER_MY_DRIVE } from '@/utils/constants/router.constant';
import { LinearProgress } from '@mui/material';

type DriveGridViewProps = {
  curDir?: { id: string; name: string };
  sort?: string;
  order?: string;
  setSort?: ({ sort, order }: { sort: string; order: string }) => void;
  entries: LocalEntry[];
  fileShow?: boolean;
  folderShow?: boolean;
  setPath?: React.Dispatch<React.SetStateAction<Path>>;
  setSelected?: React.Dispatch<React.SetStateAction<{ id: string; name: string }>>;
  selected?: { id: string; name: string };
  isLoading?: boolean;
};

export const DriveGridView: React.FC<DriveGridViewProps> = ({
  entries,
  fileShow,
  folderShow,
  setPath,
  setSelected,
  selected,
  isLoading,
  curDir,
}) => {
  const files = entries.filter((entry) => !entry.isDir);
  const folders = entries.filter((entry) => entry.isDir);

  const handlePath = (path: Path) => {
    setPath && setPath((prev) => [...prev, ...path]);
  };

  const navigate = useNavigate();

  const driveGridViewRef = useRef(null);
  const fileCardRefs = useRef<NodeListOf<Element>>(null);
  const folderCardRefs = useRef<NodeListOf<Element>>(null);

  useEffect(() => {
    fileCardRefs.current = document.querySelectorAll('.file-card');
    folderCardRefs.current = document.querySelectorAll('.folder-card');
    // console.log('[DriveGridView] fileCardRefs', Array.from(fileCardRefs.current));

    const handleClickOutside = (event) => {
      const clickedOutsideCards =
        Array.from(fileCardRefs.current).every((card) => !card.contains(event.target)) &&
        Array.from(folderCardRefs.current).every((card) => !card.contains(event.target));

      if (driveGridViewRef.current && driveGridViewRef.current.contains(event.target) && clickedOutsideCards) {
        setSelected && setSelected(curDir);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  // console.log('[DriveGridView] current selected', selected);

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
        <div ref={driveGridViewRef} className='bg-white pl-5 pr-3 pt-4'>
          <div className='relative flex flex-col space-y-2'>
            {folders.length !== 0 && (
              <div className={!folderShow ? 'visible' : 'hidden'}>
                <div className='pb-4 pt-2 text-sm font-medium'> Folders</div>
                <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
                  {folders.map((folder, index) => {
                    return (
                      <div key={index} className='w-auto'>
                        <FolderCard
                          title={folder.title}
                          icon={folder.icon}
                          id={folder.id}
                          onDoubleClick={() => {
                            handlePath([{ id: folder.id, name: folder.title }]);
                            navigate(`${CUSTOMER_MY_DRIVE}/dir/${folder.id}`);
                          }}
                          onClick={() => setSelected({ id: folder.id, name: folder.title })}
                          isSelected={selected.id === folder.id}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {files.length !== 0 && (
              <div className={!fileShow ? 'visible' : 'hidden'}>
                <div className='pb-4 pt-2 text-sm font-medium'> Files</div>
                <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
                  {files.map((file, index) => {
                    return (
                      <div key={index} className='aspect-square w-auto'>
                        <FileCard
                          title={file.title}
                          icon={file.icon}
                          preview={file.preview}
                          id={file.id}
                          dirId={curDir?.id}
                          onClick={() => setSelected({ id: file.id, name: file.title })}
                          isSelected={selected && selected.id === file.id}  // [TODO]
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
