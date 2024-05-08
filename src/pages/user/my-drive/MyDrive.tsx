import { useEffect, useState } from 'react';
import DriveLayout from '@/components/layout/DriveLayout';
import { Path, useSelected, useViewMode } from '@/store/my-drive/myDrive.store';
import MyDriveHeader from './header/MyDriveHeader';
import { DriveGridView } from './content/DriveGridView';
import { DriveListView } from './content/DriveListView';
import SidePanel from '@/pages/user/my-drive/side-panel/SidePanel';
import { useStorageStore } from '@/store/storage/storage.store';
import { useCopyMutation, useListEntries } from '@/hooks/drive.hooks';
import { toast } from 'react-toastify';
import { useTheme } from '@/providers/theme-provider';

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
  const { arrSelected, setArrSelected } = useSelected();
  const [copiedIds, setCopiedIds] = useState<string[]>([]);

  const viewMode = useViewMode((state) => state.viewMode);
  const { parents, data, refetch, isLoading } = useListEntries();
  const [selected, setSelected] = useState<{ id: string; name: string }>({
    id: parents[parents.length - 1].id,
    name: parents[parents.length - 1].name,
  });

  console.log('[MyDrive] data', data);

  const copyMutation = useCopyMutation();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'c') {
        if (arrSelected.length !== 0 && JSON.stringify(arrSelected) !== JSON.stringify(copiedIds)) {
          toast.info(`Copied ${arrSelected.length}` + (arrSelected.length > 1 ? ' items' : ' item') + ` to clipboard`);
          setCopiedIds(arrSelected);
        }
      } else if (event.ctrlKey && event.key === 'v' && copiedIds.length !== 0) {
        copyMutation.mutate({ ids: copiedIds, to: parents[parents.length - 1].id });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

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
          <DriveGridView entries={data} isLoading={isLoading} curDir={parents[parents.length - 1]} />
        ) : (
          <DriveListView entries={data} isLoading={isLoading} curDir={parents[parents.length - 1]} />
        )
      }
      sidePanel={
        <SidePanel
          id={arrSelected.length === 0 ? parents[parents.length - 1].id : arrSelected.length === 1 ? arrSelected[0] : ''}
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
