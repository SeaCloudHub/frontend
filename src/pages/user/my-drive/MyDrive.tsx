import { useEffect, useState } from 'react';
import DriveLayout from '@/components/layout/DriveLayout';
import { Path, useViewMode } from '@/store/my-drive/myDrive.store';
import MyDriveHeader from './header/MyDriveHeader';
import { DriveGridView } from './content/DriveGridView';
import { DriveListView } from './content/DriveListView';
import SidePanel from '@/pages/user/my-drive/side-panel/SidePanel';
import { useStorageStore } from '@/store/storage/storage.store';
import { useListEntries } from '@/hooks/drive.hooks';

const MyDrive = () => {
  const { rootId } = useStorageStore();

  const [{ sort, order }, setSort] = useState<{ sort: string; order: string }>({ sort: 'Name', order: 'desc' });
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [peopleFilter, setPeopleFilter] = useState<string>('');
  const [modifiedFilter, setModifiedFilter] = useState<string>('');
  const [onChanged, setOnChanged] = useState<boolean>(false);

  const viewMode = useViewMode((state) => state.viewMode);
  const { parents, data, refetch, isLoading } = useListEntries();
  const [selected, setSelected] = useState<{ id: string; name: string }>({
    id: parents[parents.length - 1].id,
    name: parents[parents.length - 1].name,
  }); // select cur dir by default

  // console.log('[MyDrive] parents', parents);
  // console.log('[MyDrive] selected', selected);

  useEffect(() => {
    refetch();
    setOnChanged(false);
  }, [onChanged, refetch]);

  return (
    <DriveLayout
      headerLeft={
        <MyDriveHeader
          path={parents}
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
      bodyLeft={
        viewMode === 'grid' ? (
          <DriveGridView
            entries={data}
            setPath={() => {}}
            setSelected={setSelected}
            selected={selected}
            isLoading={isLoading}
            onChanged={() => setOnChanged(true)}
            curDir={parents[parents.length - 1]}
          />
        ) : (
          <DriveListView entries={data} setPath={() => {}} onChanged={() => setOnChanged(true)} />
        )
      }
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
