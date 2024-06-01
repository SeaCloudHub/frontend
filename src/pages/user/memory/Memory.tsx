import DriveLayout from '@/components/layout/DriveLayout';
import SidePanel from '../my-drive/side-panel/SidePanel';
import MemoryHeader from './header/MemoryHeader';
import { useState } from 'react';
import { MemoryView } from './content/MemoryView';
import { fakeEntries } from '@/utils/dumps/entries';
import { transformEntries, useMemory } from '@/hooks/drive.hooks';
import { EntryRESP } from '@/apis/drive/drive.response';
import { useCursor, useEntries, useSelected } from '@/store/my-drive/myDrive.store';
import { useStorageStore } from '@/store/storage/storage.store';

const Memory = () => {
  const [{ sort, order }, setSort] = useState<{ sort: string; order: 'asc' | 'desc' }>({ sort: 'Size', order: 'desc' });
  const { setCurrentCursor, currentCursor, nextCursor } = useCursor();
  const { rootId } = useStorageStore();
  // const {} = useEntries();
  const { arrSelected } = useSelected();

  const { data, isLoading, error } = useMemory(order === 'asc' ? true : false);

  const onScrollBottom = () => {
    if (nextCursor && nextCursor !== currentCursor) {
      setCurrentCursor(nextCursor);
    }
  };

  return (
    <DriveLayout
      headerLeft={<MemoryHeader />}
      onScrollBottom={onScrollBottom}
      bodyLeft={
        error ? (
          <div className='text-center text-lg text-red-500'>Error: {error}</div>
        ) : (
          <MemoryView entries={data} isLoading={isLoading} order={order} setSort={setSort} sort={sort} />
        )
      }
      sidePanel={
        <SidePanel
          isHidden={arrSelected.length === 0}
          id={arrSelected.length === 0 ? rootId : arrSelected.length === 1 ? arrSelected[0].id : ''}
          title={
            arrSelected.length === 0
              ? 'Memory'
              : data.find((item) => item.id === arrSelected[arrSelected.length - 1].id)?.title || ''
          }
        />
      }
    />
  );
};

export default Memory;
