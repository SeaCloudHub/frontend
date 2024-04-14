import React, { useEffect, useRef } from 'react';
import Sort from './Sort';
import FolderCard from '@/components/core/folder-card/FolderCard';
import FileCard from '@/components/core/file-card/FileCard';
import { Entry } from '@/utils/types/entry.type';
import fileIcons from '@/components/core/file-card/fileicon.constant';
import { Icon } from '@iconify/react/dist/iconify.js';
import { LocalEntry } from '../MyDrive';
import { FileModel } from '@/apis/drive/drive.model';

type DriveGridViewProps = {
  dirId?: string;
  sort?: string;
  order?: string;
  setSort?: ({ sort, order }: { sort: string; order: string }) => void;
  entries: LocalEntry[];
  fileShow?: boolean;
  folderShow?: boolean;
};

export const DriveGridView: React.FC<DriveGridViewProps> = ({ dirId, order, sort, setSort, entries, fileShow, folderShow }) => {
  const files = entries.filter((entry) => !entry.isDir);
  const folders = entries.filter((entry) => entry.isDir);

  const [selectedFileIds, setSelectedFileIds] = React.useState<string[]>([]);
  const [selectedFolderIds, setSelectedFolderIds] = React.useState<string[]>([]);

  const viewRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    let targetElement = e.target as Element;
    while (targetElement && targetElement !== viewRef.current) {
      if (targetElement.classList.contains('file-card') || targetElement.classList.contains('folder-card')) {
        return;
      }
      targetElement = targetElement.parentNode as Element;
    }
    setSelectedFileIds([]);
    setSelectedFolderIds([]);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFileClick = (id: string) => {
    setSelectedFileIds((prevIds) => {
      return prevIds.includes(id) ? prevIds.filter((fileId) => fileId !== id) : [...prevIds, id];
    });
  };

  const handleFolderClick = (id: string) => {
    setSelectedFolderIds((prevIds) => {
      return prevIds.includes(id) ? prevIds.filter((folderId) => folderId !== id) : [...prevIds, id];
    });
  };

  return (
    <div ref={viewRef} className='bg-white pl-5 pr-3 pt-4'>
      <div className='relative flex flex-col space-y-2'>
        <div className={!folderShow ? 'visible' : 'hidden'}>
          <div className='pb-4 pt-2 text-sm font-medium'> Folders</div>
          <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
            {folders.map((folder) => (
              <FolderCard
                key={folder.id}
                id={folder.id}
                title={folder.title}
                icon={folder.icon}
                onClick={() => handleFolderClick(folder.id)}
                selected={selectedFolderIds.includes(folder.id)}
              />
            ))}
          </div>
        </div>
        <div className={!fileShow ? 'visible' : 'hidden'}>
          <div className='pb-4 pt-2 text-sm font-medium'> Files</div>
          <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
            {files.map((file) => (
              <div className='aspect-square'>
                <FileCard
                  key={file.id}
                  id={file.id}
                  title={file.title}
                  icon={file.icon}
                  preview={file.preview}
                  onClick={() => handleFileClick(file.id)}
                  selected={selectedFileIds.includes(file.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const localEntriesToFiles = (files: LocalEntry[]) => {
  return files.map((file, ind) => (
    <div className='aspect-square w-auto' key={ind}>
      <FileCard title={file.title} icon={file.icon} preview={file.preview} id={file.id} onClick={() => {}} selected={false} />
    </div>
  ));
};

export const localEntriesToFolder = (folders: LocalEntry[]) => {
  return folders.map((folder, index) => {
    return (
      <div key={index} className='w-auto'>
        <FolderCard title={folder.title} icon={folder.icon} id={folder.id} onClick={() => {}} selected={false} />
      </div>
    );
  });
};

export const remoteToLocalEntries = (entries: FileModel[]): LocalEntry[] => {
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
      id: entry.md5,
      extra: 'extra',
      owner: 'owner',
      ownerAvt: 'https://slaydarkkkk.github.io/img/slaydark_avt.jpg',
      lastModified: entry.updated_at,
      size: entry.size.toString(),
    };
  });
};

export const remoteToLocalEntries2 = (entries: Entry[]): LocalEntry[] => {
  return entries.map((entry) => {
    if (entry.is_dir) {
      return {
        isDir: true,
        title: entry.name,
        icon: <Icon icon='ic:baseline-folder' className='object-cover-full h-full w-full' />,
        preview: <Icon icon='ic:baseline-folder' className='h-full w-full' />,
        id: entry.md5,
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
      id: entry.md5,
      extra: 'extra',
      owner: 'owner',
      ownerAvt: 'https://slaydarkkkk.github.io/img/slaydark_avt.jpg',
      lastModified: entry.updated_at,
      size: entry.size.toString(),
    };
  });
};
