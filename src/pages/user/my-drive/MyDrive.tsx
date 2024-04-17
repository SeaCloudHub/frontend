import { fakeEntries } from '@/utils/dumps/entries';
import React, { useEffect, useState } from 'react';
import DriveLayout from '@/components/layout/DriveLayout';
import { Path, useViewMode } from '@/store/my-drive/myDrive.store';
import MyDriveHeader from './header/MyDriveHeader';
import { DriveGridView } from './content/DriveGridView';
import { remoteToLocalEntries } from './content/DriveGridView';
import { DriveListView } from './content/DriveListView';
import { Entry } from '@/utils/types/entry.type';
import SidePanel from '@/pages/user/my-drive/side-panel/SidePanel';
import { useQuery } from '@tanstack/react-query';
import { useSession } from '@/store/auth/session';
import { toast } from 'react-toastify';
import { getListEntriesMyDrive } from '@/apis/drive/list-entries.api';
import { ListEntriesRESP } from '@/apis/drive/response/list-entries.reponse';
import { useParams } from 'react-router-dom';
import { useListEntries } from '@/hooks/useListEntries';

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
  const { root_id } = useSession();

  const [{ sort, order }, setSort] = useState<{ sort: string; order: string }>({ sort: 'Name', order: 'desc' });
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [peopleFilter, setPeopleFilter] = useState<string>('');
  const [modifiedFilter, setModifiedFilter] = useState<string>('');
  const [path, setPath] = useState<Path>([{ name: 'My Drive', id: root_id }]);

  const viewMode = useViewMode((state) => state.viewMode);

  // const { data, error, refetch } = useQuery({
  //   queryKey: ['mydrive-entries', path[path.length - 1].id],
  //   queryFn: async () => {
  //     return (
  //       await getListEntriesMyDrive({ id: path[path.length - 1].id, limit: 100 }).then((res) => res?.data?.entries || [])
  //     ).filter((e) => !e.name.includes('.trash'));
  //   },
  // });
  const {data, error, refetch} = useListEntries();
  const localEntries: LocalEntry[] = remoteToLocalEntries((data || []) as Required<Entry[]> & ListEntriesRESP['entries']);

  // const [entries, setEntries] = useState<LocalEntry[]>(localEntries);
  useEffect(() => {
    error && toast.error('Failed to fetch entries');
  }, [error]);

  // useEffect(() => {
  //   refetch();
  // }, [path, refetch]);

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
          <DriveGridView entries={localEntries} setPath={setPath} />
        ) : (
          <DriveListView entries={localEntries} setPath={setPath} />
        )
      }
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
