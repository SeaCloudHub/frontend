import FileCard from '@/components/core/file-card/FileCard';
import fileIcons from '@/components/core/file-card/fileicon.constant';
import FolderCard from '@/components/core/folder-card/FolderCard';
import { entries } from '@/utils/dumps/entries';
import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { create } from 'zustand';
import { DataRow } from './DataRow';
import SidePanel from '@/components/core/side-panel/SidePanel';
import { Entry } from '@/utils/types/entry.type';

type MyEntry = {
  isDir: boolean;
  title: string;
  icon: React.ReactNode;
  preview: React.ReactNode;
  id: string;
  extra: string;
  owner: string;
  lastModified: string;
  size: string;
};

const MyDrive = () => {
  //TODO: const entries: Entry[] = getEntries();

  const processedEntries = _entryToMyEntry(entries);
  const files = processedEntries.filter((entry) => !entry.isDir);
  const folders = processedEntries.filter((entry) => entry.isDir);

  const viewMode = useViewMode((state) => state.viewMode);
  const drawerOpen = useDrawer((state) => state.drawerOpen);
  return (
    // temmporary solution
    <div className='mx-auto flex  overflow-x-hidden bg-surfaceContainerLow'>
      <div className='flex h-full grow flex-col rounded-2xl bg-white'>
        {/* <FileHeader headerName='My Drive' /> */}
        <div className='overflow-y-auto'>
          {viewMode === 'grid' ? (
            <div className='flex flex-col space-y-4'>
              <div className='statement-bold'> Folders</div>
              <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
                {_myEntryToFolders(folders)}
              </div>
              <div className='statement-bold'> Files</div>
              <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
                {_myEntryToFile(files)}
              </div>
            </div>
          ) : (
            // <div></div>
            _renderListView(folders.concat(files))
          )}
        </div>
      </div>
      {drawerOpen && <SidePanel icon={fileIcons['any']} title='filename' />}
      {/* <SidePanel icon={fileIcons['any']} title='filename' /> */}
    </div>
  );
};

/**
 * Map Entry to MyEntry.
 */
export const _entryToMyEntry = (entries: Entry[]): MyEntry[] => {
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
        lastModified: 'lastModified',
        size: 'size',
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
      lastModified: 'lastModified',
      size: 'size',
    };
  });
};

/**
 * Map MyEntry to FileCard
 */
export const _myEntryToFile = (files: MyEntry[]) => {
  return files.map((file) => (
    <div className='aspect-square w-auto'>
      <FileCard title={file.title} icon={file.icon} preview={file.preview} id={file.id} />
    </div>
  ));
};

/**
 * Map MyEntry to FolderCard
 */
export const _myEntryToFolders = (folders: MyEntry[]) => {
  return folders.map((folder) => {
    return (
      <div key={index} className='w-auto'>
        <FolderCard title={folder.title} icon={folder.icon} id={folder.id} />
      </div>
    );
  });
};

type HeaderMyDriveProps = {
  name: string;
  owner: string;
  lastModified: string;
  size: string;
};

const _header: React.FC<HeaderMyDriveProps> = ({ name, owner, lastModified, size }) => {
  return (
    <div className='flex items-center pb-2'>
      <div className='flex-1 basis-72 text-sm font-medium'>{name}</div>
      <div className='basis-64 text-sm font-medium max-2xl:basis-36 max-lg:hidden'>{owner}</div>
      <div className='basis-48 text-sm font-medium max-2xl:shrink max-md:hidden'>{lastModified}</div>
      <div className='basis-20 text-sm font-medium max-xl:hidden'>{size}</div>
      <div className='flex basis-48 justify-end max-2xl:basis-12'>
        {/* <Icon
          icon="ic:baseline-more-vert"
          className="h-7 w-7 rounded-full p-1 hover:bg-surfaceContainerLow"
        /> */}
      </div>
    </div>
  );
};

export const _renderListView = (entries: MyEntry[]) => {
  return (
    <div className='flex flex-col'>
      {_header({ name: 'Name', owner: 'Owner', lastModified: 'Last Modified', size: 'Size' })}
      {entries.map((entry, index) => {
        return <DataRow key={index} {...entry} />;
      })}
    </div>
  );
};

/**
 * Global state
 */
type DrawerType = {
  drawerOpen: boolean;
  setDrawerOpen: () => void;
};

const useDrawer = create<DrawerType>((set) => ({
  drawerOpen: false,
  setDrawerOpen: () => set({ drawerOpen: true }),
}));

type ViewModeType = {
  viewMode: string;
  setViewMode: (mode: string) => void;
};

// read local storage here
const useViewMode = create<ViewModeType>((set) => ({
  viewMode: 'grid',
  setViewMode: (mode: string) => set({ viewMode: mode }),
}));

export { useDrawer, useViewMode };
export type { MyEntry };
export default MyDrive;
