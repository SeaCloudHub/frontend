import Dropdown, { classNames } from '@/components/core/drop-down/Dropdown';
import FileCard from '@/components/core/file-card/FileCard';
import fileIcons from '@/components/core/file-card/fileicon.constant';
import FileHeader from '@/components/core/file-header/FileHeader';
import FolderCard from '@/components/core/folder-card/FolderCard';
import { useDrawer } from '@/components/layout/test/TuyenLayout';
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import { render } from 'react-dom';
import { GiEntryDoor } from 'react-icons/gi';
import { create } from 'zustand';

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

/**
 * Map Entry to MyEntry.
 */
const entryToMyEntry = (entries: Entry[]): MyEntry[] => {
  return entries.map((entry) => {
    if (entry.is_dir) {
      return {
        isDir: true,
        title: entry.name,
        icon: <Icon icon="ic:baseline-folder" className="h-full w-full" />,
        preview: <Icon icon="ic:baseline-folder" className="h-full w-full" />,
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
    const preview = [
      'jpg',
      'ico',
      'webp',
      'png',
      'jpeg',
      'gif',
      'jfif',
    ].includes(ext) ? (
      <img
        className="rounded-md object-cover object-center"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrHRymTob1kd-ywHzIs0ty7UhrFUcJay839nNd6tcSig&s"
      />
    ) : (
      <div className="h-16 w-16">{icon}</div>
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
const myEntryToFile = (files: MyEntry[]) => {
  return files.map((file) => {
    return (
      <div className="aspect-square w-auto">
        <FileCard
          title={file.title}
          icon={file.icon}
          preview={file.preview}
          id={file.id}
        />
      </div>
    );
  });
};

/**
 * Map MyEntry to FolderCard
 */
const myEntryToFolders = (folders: MyEntry[]) => {
  return folders.map((folder) => {
    return (
      <div className="w-auto">
        <FolderCard title={folder.title} icon={folder.icon} id={folder.id} />
      </div>
    );
  });
};

const useViewMode = create((set) => ({
  viewMode: 'list',
  setViewMode: (mode: string) => set({ viewMode: mode }),
}));
export { useViewMode };

const entries: Entry[] = [
  {
    name: 'file1.mp3',
    full_path: '/file1.mp3',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '1',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'file2.mp4',
    full_path: '/file2.mp4',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '2',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'file3.pdf',
    full_path: '/file3.pdf',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '3',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'file4.docx',
    full_path: '/file4.docx',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '4',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'file5.jpg',
    full_path: '/file5.jpg',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '5',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'file6.txt',
    full_path: '/file6.txt',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '6',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'file7.zip',
    full_path: '/file7.zip',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '7',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'file8.jpeg',
    full_path: '/file8.jpeg',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: 'md5',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'file9.png',
    full_path: '/file9.png',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '8',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'file10.jfif',
    full_path: '/file10.jfif',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '9',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'file11.gif',
    full_path: '/file11.gif',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '10',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'file12.webp',
    full_path: '/file12.webp',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '11',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'file13.ico',
    full_path: '/file13.ico',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '12',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'file14.svg',
    full_path: '/file14.svg',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '13',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'dir1',
    full_path: '/dir1',
    size: 0,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '14',
    is_dir: true,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'dir2',
    full_path: '/dir2',
    size: 0,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '15',
    is_dir: true,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
];

const MyDrive = () => {
  //TODO: const entries: Entry[] = getEntries();

  const processedEntries = entryToMyEntry(entries);
  const files = processedEntries.filter((entry) => !entry.isDir);
  const folders = processedEntries.filter((entry) => entry.isDir);

  const viewMode = useViewMode((state) => state.viewMode);

  return (
    <div className="h-full w-full">
      <FileHeader headerName="My Drive" />
      <div className="h-full w-full overflow-y-auto p-5">
        {viewMode === 'grid' ? (
          <div className="flex flex-col space-y-4">
            <div className="text-sm font-medium"> Folders</div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {myEntryToFolders(folders)}
            </div>
            <div className="text-sm font-medium"> Files</div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {myEntryToFile(files)}
            </div>
          </div>
        ) : (
          // <div></div>
          renderListView(folders.concat(files))
        )}
      </div>
    </div>
  );
};

export default MyDrive;

const header = (name, owner, lastModified, size) => {
  return (
    <div className="flex items-center pb-2">
      <div className="flex-1 basis-72 text-sm font-medium">{name}</div>
      <div className="basis-64 text-sm font-medium max-2xl:basis-36 max-lg:hidden">
        {owner}
      </div>
      <div className="basis-48 text-sm font-medium max-2xl:shrink max-md:hidden">
        {lastModified}
      </div>
      <div className="basis-20 text-sm font-medium max-xl:hidden">{size}</div>
      <div className="flex basis-48 justify-end max-2xl:basis-12">
        {/* <Icon
          icon="ic:baseline-more-vert"
          className="h-7 w-7 rounded-full p-1 hover:bg-surfaceContainerLow"
        /> */}
      </div>
    </div>
  );
};

/**
 * Map processed Entry to row
 */
const DataRow: React.FC<MyEntry> = ({
  isDir,
  title,
  icon,
  lastModified,
  owner,
  size,
}) => {
  const setDrawerOpen = useDrawer((state) => state.setDrawerOpen);
  const fileOps = [
    [{ label: 'Preview', icon: <Icon icon="material-symbols:visibility" /> }],
    [
      { label: 'Download', icon: <Icon icon="ic:outline-file-download" /> },
      {
        label: 'Rename',
        icon: <Icon icon="ic:round-drive-file-rename-outline" />,
      },
      {
        label: 'Make a copy',
        icon: <Icon icon="material-symbols:content-copy-outline" />,
      },
    ],
    [
      { label: 'Copy link', icon: <Icon icon="material-symbols:link" /> },
      { label: 'Share', icon: <Icon icon="lucide:user-plus" /> },
    ],
    [
      { label: 'Move', icon: <Icon icon="mdi:folder-move-outline" /> },
      {
        label: 'Add shortcut',
        icon: <Icon icon="material-symbols:add-to-drive" />,
      },
      {
        label: 'Add to starred',
        icon: <Icon icon="material-symbols:star-outline" />,
      },
    ],
    [
      {
        label: 'Detail',
        icon: <Icon icon="mdi:information-outline" />,
        action: setDrawerOpen,
      },
      { label: 'Activity', icon: <Icon icon="mdi:graph-line-variant" /> },
      { label: 'Lock', icon: <Icon icon="mdi:lock-outline" /> },
    ],
    [{ label: 'Move to trash', icon: <Icon icon="fa:trash-o" /> }],
  ];
  const folderOps = [
    [
      { label: 'Download', icon: <Icon icon="ic:outline-file-download" /> },
      {
        label: 'Rename',
        icon: <Icon icon="ic:round-drive-file-rename-outline" />,
      },
    ],
    [
      { label: 'Copy link', icon: <Icon icon="material-symbols:link" /> },
      { label: 'Share', icon: <Icon icon="lucide:user-plus" /> },
    ],
    [
      { label: 'Move', icon: <Icon icon="mdi:folder-move-outline" /> },
      {
        label: 'Add shortcut',
        icon: <Icon icon="material-symbols:add-to-drive" />,
      },
      {
        label: 'Add to starred',
        icon: <Icon icon="material-symbols:star-outline" />,
      },
    ],
    [
      {
        label: 'Detail',
        icon: <Icon icon="mdi:information-outline" />,
        action: setDrawerOpen,
      },
      { label: 'Activity', icon: <Icon icon="mdi:graph-line-variant" /> },
    ],
    [{ label: 'Move to trash', icon: <Icon icon="fa:trash-o" /> }],
  ];

  // const [showTools, setShowTools] = useState(false);
  return (
    <div
      className="py= flex items-center border-b hover:bg-surfaceContainer"
      // onMouseOver={() => {
      //   setShowTools(true);
      // }}
      // onMouseOut={() => {
      //   setShowTools(false);
      // }}
    >
      <div className="flex flex-1 basis-72 text-sm font-medium">
        <div className="px-4">
          <div className="h-6 w-6">{icon}</div>
        </div>
        <div>{title}</div>
      </div>
      <div className="basis-64 text-sm font-normal max-2xl:basis-36 max-lg:hidden">
        {owner}
      </div>
      <div className="basis-48 text-sm font-normal max-2xl:shrink max-md:hidden">
        {lastModified}
      </div>
      <div className="basis-20 text-sm font-normal max-xl:hidden">{size}</div>
      <div className="flex basis-48 justify-end max-2xl:basis-12">
        {/* removed because of lagging */}
        {/* <div
          className={classNames('flex', showTools ? 'visible' : 'invisible')}
        >
          <Icon
            className="h-7 w-7 rounded-full p-1 hover:bg-surfaceContainerLow"
            icon="lucide:user-plus"
          />
          <Icon
            className="h-7 w-7 rounded-full p-1 hover:bg-surfaceContainerLow"
            icon="ic:outline-file-download"
          />
          <Icon
            className="h-7 w-7 rounded-full p-1 hover:bg-surfaceContainerLow"
            icon="ic:round-drive-file-rename-outline"
          />
          <Icon
            className="h-7 w-7 rounded-full p-1 hover:bg-surfaceContainerLow"
            icon="material-symbols:star-outline"
          />
        </div> */}
        <Dropdown
          button={
            <Icon
              icon="ic:baseline-more-vert"
              className="h-7 w-7 rounded-full p-1 hover:bg-surfaceContainerLow"
            />
          }
          items={isDir ? folderOps : fileOps}
          left={true}
        />
      </div>
    </div>
  );
};

const renderListView = (entries: MyEntry[]) => {
  return (
    <div className="flex flex-col">
      {header('Name', 'Owner', 'Last Modified', 'Size')}
      {entries.map((entry) => {
        return <DataRow {...entry} />;
      })}
    </div>
  );
};
