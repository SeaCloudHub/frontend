import React from 'react';
import Sort from './Sort';
import FolderCard from '@/components/core/folder-card/FolderCard';
import FileCard from '@/components/core/file-card/FileCard';
import { Entry } from '@/utils/types/entry.type';
import fileIcons from '@/components/core/file-card/fileicon.constant';
import { Icon } from '@iconify/react/dist/iconify.js';
import { LocalEntry } from '../MyDrive';
import { Path } from '@/store/my-drive/myDrive.store';

type Filter = {
  typeFilter: string;
  peopleFilter: string;
  modifiedFilter: string;
};

type DriveGridViewProps = {
  dirId?: string;
  sort?: string;
  order?: string;
  setSort?: ({ sort, order }: { sort: string; order: string }) => void;
  entries: LocalEntry[];
  fileShow?: boolean;
  folderShow?: boolean;
  setPath?: React.Dispatch<React.SetStateAction<Path>>;
};

export const DriveGridView: React.FC<DriveGridViewProps> = ({ dirId, order, sort, setSort, entries, fileShow, folderShow, setPath }) => {
  const files = entries.filter((entry) => !entry.isDir);
  const folders = entries.filter((entry) => entry.isDir);

  const handlePath = (path: Path) => {
    setPath && setPath((prev) => [...prev, ...path]);
  }

  return (
    <>
      {entries.length === 0 ? (
        <div className='flex justify-center items-center h-96'>
          <div className='text-center'>
            <div className='text-3xl font-semibold'>No files or folders here</div>
            <div className='text-gray-500'>Try uploading a file or creating a folder</div>
          </div>
        </div>
      ) : (
      <div className='bg-white pl-5 pr-3 pt-4'>
        <div className='relative flex flex-col space-y-2'>
          <div className={!folderShow ? 'visible' : 'hidden'}>
            <div className='pb-4 pt-2 text-sm font-medium'> Folders</div>
            <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
              {localEntriesToFolder(folders, handlePath)}
            </div>
          </div>
          <div className={!fileShow ? 'visible' : 'hidden'}>
            <div className='pb-4 pt-2 text-sm font-medium'> Files</div>
            <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
              {localEntriesToFiles(files)}
            </div>
          </div>
        </div>
      </div>)}
    </>
  );
};

/**
 * Map MyEntry to FileCard
 */

export const localEntriesToFiles = (files: LocalEntry[]) => {
  return files.map((file, ind) => (
    <div className='aspect-square w-auto' key={ind}>
      <FileCard title={file.title} icon={file.icon} preview={file.preview} id={file.id} />
    </div>
  ));
};

/**
 * Map MyEntry to FolderCard
 */
export const localEntriesToFolder = (folders: LocalEntry[], handlePath: (path: Path)=>void) => {
  return folders.map((folder, index) => {
    return (
      <div key={index} className='w-auto'>
        <FolderCard title={folder.title} icon={folder.icon} id={folder.id} onDoubleClick={
          ()=>{
            handlePath([{id: folder.id, name: folder.title}]);
          }
        } />
      </div>
    );
  });
};

/**
 * Map remote Entry to MyEntry.
 */
export const remoteToLocalEntries = (entries: Entry[]): LocalEntry[] => {
  return entries.map((entry) => {
    if (entry.is_dir) {
      return {
        isDir: true,
        title: entry.name,
        icon: <Icon icon='ic:baseline-folder' className='object-cover-full h-full w-full' />,
        preview: <Icon icon='ic:baseline-folder' className='h-full w-full' />,
        id: entry.id,
        extra: 'extra',
        owner: 'owner',
        ownerAvt: 'https://slaydarkkkk.github.io/img/slaydark_avt.jpg',
        lastModified: entry.updated_at,
        size: entry.size.toString(),
      };
    }
    const ext = entry.name.split('.').pop() || 'any';
    const icon = fileIcons[ext] || fileIcons.any;
    /* Suport mp4, mp3, pdf, jpg, jpeg, png, jfif, gif, webp, ico, svg,
    docx, txt, zip, any */
    const preview = ['jpg', 'ico', 'webp', 'png', 'jpeg', 'gif', 'jfif'].includes(ext) ? (
      <img
        className='h-full w-full rounded-md object-cover'
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrHRymTob1kd-ywHzIs0ty7UhrFUcJay839nNd6tcSig&s'
      />
    ) : (
      <div className='h-16 w-16'>{icon}</div>
    );
    return {
      isDir: false,
      title: entry.name,
      icon: icon,
      preview: preview,
      id: entry.id,
      extra: 'extra',
      owner: 'owner',
      ownerAvt: 'https://slaydarkkkk.github.io/img/slaydark_avt.jpg',
      lastModified: entry.updated_at,
      size: entry.size.toString(),
    };
  });
};
