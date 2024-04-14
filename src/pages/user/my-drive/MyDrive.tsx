import { fakeEntries } from '@/utils/dumps/entries';
import React, { useState } from 'react';
import DriveLayout from '@/components/layout/DriveLayout';
import { Path, useRootId, useViewMode } from '@/store/my-drive/myDrive.store';
import MyDriveHeader from './header/MyDriveHeader';
import { DriveGridView, remoteToLocalEntries } from './content/DriveGridView';
import { DriveListView } from './content/DriveListView';
import SidePanel from '@/pages/user/my-drive/side-panel/SidePanel';
import { listEntriesApi } from '@/apis/drive/drive.request';

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

  const { viewMode } = useViewMode();
  const { rootId } = useRootId();

  const [path, setPath] = useState<Path>([{ name: 'My Drive', id: rootId }]);

  const { data: testEntries, isPending, isError } = listEntriesApi(path[path.length - 1].id, typeFilter, sort, order);
  console.log('[MyDrive] testEntries', testEntries);
  // const remoteEntries: Entry[] = fakeEntries;

  if (isPending) {
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
        bodyLeft={[]}
        sidePanel={<SidePanel />}
      />
    );
  }

  const localEntries: LocalEntry[] = remoteToLocalEntries(testEntries);

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

export default MyDrive;
