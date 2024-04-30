import { useEffect, useState } from 'react';
import DriveLayout from '@/components/layout/DriveLayout';
import { Path, useViewMode } from '@/store/my-drive/myDrive.store';
import MyDriveHeader from './header/MyDriveHeader';
import { DriveGridView } from './content/DriveGridView';
import { DriveListView } from './content/DriveListView';
import SidePanel from '@/pages/user/my-drive/side-panel/SidePanel';
import { useStorageStore } from '@/store/storage/storage.store';
import { useListEntries } from '@/hooks/drive.hooks';

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
  onChanged?: () => void;
};

const MyDrive = () => {
  const { rootId } = useStorageStore();

  const [{ sort, order }, setSort] = useState<{ sort: string; order: string }>({ sort: 'Name', order: 'desc' });
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [peopleFilter, setPeopleFilter] = useState<string>('');
  const [modifiedFilter, setModifiedFilter] = useState<string>('');
  const [arrSelected, setArrSelected] = useState<string[]>([]);

  const viewMode = useViewMode((state) => state.viewMode);
  const { parents, data, refetch, isLoading } = useListEntries();
  const [selected, setSelected] = useState<{ id: string; name: string }>({
    id: parents[parents.length - 1].id,
    name: parents[parents.length - 1].name,
  });

  console.log(arrSelected);

  // console.log('[MyDrive] parents', parents);
  // console.log('[MyDrive] selected', selected);

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
          // arrSelected={arrSelected}
          // setArrSelected={setArrSelected}
          setTypeFilter={setTypeFilter}
          setModifiedFilter={setModifiedFilter}
          setPeopleFilter={setPeopleFilter}
          setSort={setSort}
          setArrSelected={setArrSelected}
          arrSelected={arrSelected}
        />
      }
      bodyLeft={
        viewMode === 'grid' ? (
          <DriveGridView
            entries={data}
            // setPath={() => {}}
            // setSelected={setSelected}
            // selected={selected}
            isLoading={isLoading}
            curDir={parents[parents.length - 1]}
            arrSelected={arrSelected}
            setArrSelected={setArrSelected}
          />
        ) : (
          <DriveListView entries={data} setPath={() => {}} />
        )
      }
      sidePanel={
        <SidePanel
          id={arrSelected.length === 0 ? rootId : arrSelected.length === 1 ? arrSelected[0] : ''}
          title={arrSelected.length === 0 ? 'My Drive' : selected.name}
        />
      }
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
