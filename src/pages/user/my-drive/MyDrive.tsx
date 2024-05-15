import { useEffect, useState } from 'react';
import DriveLayout from '@/components/layout/DriveLayout';
import { Path, useEntries, useLimit, useSelected, useTypeFilter, useViewMode } from '@/store/my-drive/myDrive.store';
import MyDriveHeader from './header/MyDriveHeader';
import { DriveGridView } from './content/DriveGridView';
import { DriveListView } from './content/DriveListView';
import SidePanel from '@/pages/user/my-drive/side-panel/SidePanel';
import { useCopyMutation, useListEntries } from '@/hooks/drive.hooks';
import { toast } from 'react-toastify';
import { TypeEntry } from '@/apis/drive/drive.request';

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
  const [{ sort, order }, setSort] = useState<{ sort: string; order: string }>({ sort: 'Name', order: 'desc' });
  const {typeFilter} = useTypeFilter();
  const [peopleFilter, setPeopleFilter] = useState<string>('');
  const [modifiedFilter, setModifiedFilter] = useState<string>('');
  const [copiedIds, setCopiedIds] = useState<string[]>([]);

  const {listEntries} = useEntries();
  const { arrSelected } = useSelected();
  const viewMode = useViewMode((state) => state.viewMode);
  const copyMutation = useCopyMutation();
  const {limit, increaseLimit} = useLimit();

  const {parents, data, isLoading } = useListEntries(limit, typeFilter);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey||event.metaKey) && event.key === 'c') {
        if (arrSelected.length !== 0 && JSON.stringify(arrSelected) !== JSON.stringify(copiedIds)) {
          toast.info(`Copied ${arrSelected.length}` + (arrSelected.length > 1 ? ' items' : ' item') + ` to clipboard`);
          setCopiedIds(arrSelected);
        }
      } else if ((event.ctrlKey||event.metaKey) && event.key === 'v' && copiedIds.length !== 0) {
        copyMutation.mutate({ ids: copiedIds, to: parents[parents.length - 1].id });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [arrSelected, copiedIds, parents, copyMutation]);

  const onScollBottom = () => {
    if(data.length < limit) return;
    increaseLimit();
  }

  return (
    <DriveLayout
      headerLeft={
        <MyDriveHeader
          path={parents}
          modifiedFilter={modifiedFilter}
          peopleFilter={peopleFilter}
          sort={sort}
          order={order}
          setModifiedFilter={setModifiedFilter}
          setPeopleFilter={setPeopleFilter}
          setSort={setSort}
        />
      }
      onScrollBottom={onScollBottom}
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
          title={arrSelected.length === 0 ? 'My Drive' : parents[parents.length - 1].name}
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
