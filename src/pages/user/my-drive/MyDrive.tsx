import React, { useState } from 'react';
import DriveLayout from '@/components/layout/DriveLayout';
import { Path, useViewMode } from '@/store/my-drive/myDrive.store';
import MyDriveHeader from './header/MyDriveHeader';
import { DriveGridView } from './content/DriveGridView';
import { remoteToLocalEntries } from './content/DriveGridView';
import { DriveListView } from './content/DriveListView';
import { Entry } from '@/utils/types/entry.type';
import SidePanel from '@/pages/user/my-drive/side-panel/SidePanel';
import { useStorageStore } from '@/store/storage/storage.store';
import { useListEntries } from '@/hooks/drive.hooks';
import { ListEntriesRESP } from '@/apis/drive/response/list-entries.reponse';

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

  onDoubleClick?: () => void;
};

const MyDrive = () => {
  const { rootId } = useStorageStore();

  const [{ sort, order }, setSort] = useState<{ sort: string; order: string }>({ sort: 'Name', order: 'desc' });
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [peopleFilter, setPeopleFilter] = useState<string>('');
  const [modifiedFilter, setModifiedFilter] = useState<string>('');
  const [path, setPath] = useState<Path>([{ name: 'My Drive', id: rootId }]); // [TODO] wait for get path api
  const viewMode = useViewMode((state) => state.viewMode);

  const { dirId, dirName, data, refetch, isLoading } = useListEntries();
  const localEntries: LocalEntry[] = remoteToLocalEntries((data || []) as Required<Entry[]> & ListEntriesRESP['entries']);
  const [selected, setSelected] = useState<{ id: string; name: string }>({ id: dirId, name: 'My Drive' }); // [TODO] wait for get path api

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
      bodyLeft={
        viewMode === 'grid' ? (
          <DriveGridView
            entries={localEntries}
            setPath={setPath}
            setSelected={setSelected}
            selected={selected}
            isLoading={isLoading}
            curDir={{ id: dirId, name: dirName }}
          />
        ) : (
          <DriveListView entries={localEntries} setPath={setPath} />
        )
      }
      // pass entry name so no need to wait for api
      sidePanel={<SidePanel id={selected.id} title={selected.id === rootId ? 'My Drive' : selected.name} />}
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
