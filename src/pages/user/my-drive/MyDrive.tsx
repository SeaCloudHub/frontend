import { fakeEntries } from '@/utils/dumps/entries';
import React, { useState } from 'react';
import DriveLayout from '@/components/layout/DriveLayout';
import { Path, useViewMode } from '@/store/my-drive/myDrive.store';
import MyDriveHeader from './header/MyDriveHeader';
import { DriveGridView } from './content/DriveGridView';
import { remoteToLocalEntries } from './content/DriveGridView';
import { DriveListView } from './content/DriveListView';
import { Entry } from '@/utils/types/entry.type';
import SidePanel from '@/pages/user/my-drive/side-panel/SidePanel';

export type LocalEntry = {
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
  const [{ sort, order }, setSort] = useState<{ sort: string; order: string }>({ sort: 'Name', order: 'desc' });
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [peopleFilter, setPeopleFilter] = useState<string>('');
  const [modifiedFilter, setModifiedFilter] = useState<string>('');
  const [path, setPath] = useState<Path>([
    { name: 'My Drive', id: '1' },
    { name: 'Folder 1', id: '2' },
    { name: 'Folder 2', id: '3' },
    { name: 'Folder 3', id: '4' },
    { name: 'Folder 4', id: '5' },
  ]);

  const viewMode = useViewMode((state) => state.viewMode);
  
  // const remoteEntries = getEntries(dirId, filter, sort, order);
  const remoteEntries: Entry[] = fakeEntries;
  const localEntries: LocalEntry[] = remoteToLocalEntries(remoteEntries);

  return (
    <DriveLayout
      headerLeft={
        <MyDriveHeader
          path={path}
          typeFilter={typeFilter}
          modifiedFilter={modifiedFilter}
          peopleFilter={peopleFilter}
          sort={sort}
          order={order}
          setPath={setPath}
          setTypeFilter={setTypeFilter}
          setModifiedFilter={setModifiedFilter}
          setPeopleFilter={setPeopleFilter}
          setSort={setSort}
        />
      }
      bodyLeft={viewMode === 'grid' ? <DriveGridView entries={localEntries} /> : <DriveListView entries={localEntries} />}
      sidePanel={<SidePanel />}
    />
  );
};

export type HeaderMyDriveProps = {
  name: string;
  owner: string;
  lastModified: string;
  size: string;
};

export default MyDrive;
