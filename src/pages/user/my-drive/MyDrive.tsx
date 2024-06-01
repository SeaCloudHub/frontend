import { useEffect, useState } from 'react';
import DriveLayout from '@/components/layout/DriveLayout';
import { Path, useEntries, useSelected, useFilter, useViewMode, useCursor } from '@/store/my-drive/myDrive.store';
import MyDriveHeader from './header/MyDriveHeader';
import { DriveGridView } from './content/DriveGridView';
import { DriveListView } from './content/DriveListView';
import SidePanel from '@/pages/user/my-drive/side-panel/SidePanel';
import { LocalEntry, useCopyMutation, useListEntries, usePathParents } from '@/hooks/drive.hooks';
import { toast } from 'react-toastify';

const MyDrive = () => {
  const [{ sort, order }, setSort] = useState<{ sort: string; order: string }>({ sort: 'Name', order: 'desc' });
  const [copiedIds, setCopiedIds] = useState<string[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);

  const { arrSelected } = useSelected();
  const viewMode = useViewMode((state) => state.viewMode);
  const { nextCursor, setCurrentCursor, currentCursor } = useCursor();

  const copyMutation = useCopyMutation();

  const { parents, error: parentError } = usePathParents();
  const { data, isLoading, error } = useListEntries();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
        if (arrSelected.length !== 0 && JSON.stringify(arrSelected) !== JSON.stringify(copiedIds)) {
          toast.info(`Copied ${arrSelected.length}` + (arrSelected.length > 1 ? ' items' : ' item') + ` to clipboard`);
          setCopiedIds(arrSelected.map((e) => e.id));
        }
      } else if ((event.ctrlKey || event.metaKey) && event.key === 'v' && copiedIds.length !== 0) {
        copyMutation.mutate({ ids: copiedIds, to: parents[parents.length - 1].id });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [arrSelected, copiedIds, parents, copyMutation]);

  // scroll to load more
  const onScollBottom = () => {
    if (nextCursor !== '' && currentCursor !== nextCursor) {
      setIsScrolling(true);
      setTimeout(() => {
        setIsScrolling(false);
        setCurrentCursor(nextCursor);
      }, 1000);
    }
  };

  return (
    <DriveLayout
      headerLeft={<MyDriveHeader path={parents} sort={sort} order={order} setSort={setSort} />}
      onScrollBottom={onScollBottom}
      bodyLeft={
        parentError || error ? (
          <div className='text-center text-lg text-red-500'>Error: {parentError || error}</div>
        ) : (
          viewMode === 'grid' ? (
            <DriveGridView
              entries={data}
              parent='my-drive'
              isLoading={isLoading}
              curDir={parents[parents.length - 1]}
              isScrolling={isScrolling}
            />
          ) : (
            <DriveListView
              entries={data}
              parent='my-drive'
              isLoading={isLoading}
              curDir={parents[parents.length - 1]}
              isScrolling={isScrolling}
            />
          )
        )
      }
      sidePanel={
        <SidePanel
          id={arrSelected.length === 0 ? parents[parents.length - 1].id : arrSelected.length === 1 ? arrSelected[0].id : ''}
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
