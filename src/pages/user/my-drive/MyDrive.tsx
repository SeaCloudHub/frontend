import { fakeEntries } from '@/utils/dumps/entries';
import React, { useEffect, useState } from 'react';
import DriveLayout from '@/components/layout/DriveLayout';
import { Path, useRootId, useViewMode } from '@/store/my-drive/myDrive.store';
import MyDriveHeader from './header/MyDriveHeader';
import { DriveGridView, remoteToLocalEntries } from './content/DriveGridView';
import { DriveListView } from './content/DriveListView';
import SidePanel from '@/pages/user/my-drive/side-panel/SidePanel';
import { listEntriesQuery } from '@/apis/drive/drive.request';
import { useParams } from 'react-router-dom';

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
  // const { curDirId } = useParams();  // failed to get param?
  const curDirId = window.location.pathname.split('/').pop();
  console.log('[MyDrive] curDirId 1', curDirId);

  const [path, setPath] = useState<Path>([{ id: rootId, name: 'My Drive' }]);

  const { data: remoteEntries, isPending, isError } = listEntriesQuery(curDirId ? curDirId : rootId, typeFilter, sort, order);

  if (isPending) {
    return (
      <DriveLayout
        headerLeft={
          <MyDriveHeader
            path={[]}
            typeFilter={typeFilter}
            modifiedFilter={modifiedFilter}
            peopleFilter={peopleFilter}
            sort={sort}
            order={order}
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

  let localEntries: LocalEntry[] = remoteToLocalEntries(remoteEntries);
  localEntries = localEntries.filter((file) => file.title !== '.trash');

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
