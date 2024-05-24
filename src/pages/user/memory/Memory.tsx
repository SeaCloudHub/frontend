import DriveLayout from '@/components/layout/DriveLayout';
import SidePanel from '../my-drive/side-panel/SidePanel';
import MemoryHeader from './header/MemoryHeader';
import { useState } from 'react';
import { MemoryView } from './content/MemoryView';
import { fakeEntries } from '@/utils/dumps/entries';
import { transformEntries, useMemory } from '@/hooks/drive.hooks';
import { EntryRESP } from '@/apis/drive/drive.response';
import { useCursor } from '@/store/my-drive/myDrive.store';

const Memory = () => {
  const [{ sort, order }, setSort] = useState<{ sort: string; order: 'asc' | 'desc' }>({ sort: 'Size', order: 'desc' });
  const {setCurrentCursor, currentCursor, nextCursor} = useCursor();

  const {data, isLoading} = useMemory(order === 'asc' ? true: false);

  const onScrollBottom = () => {
    if(nextCursor && nextCursor !== currentCursor) {
      setCurrentCursor(nextCursor);
    }
  };

  return (
    <DriveLayout
      headerLeft={<MemoryHeader />}
      onScrollBottom={onScrollBottom}
      bodyLeft={<MemoryView entries={data} isLoading={isLoading} order={order} setSort={setSort} sort={sort} />}
      sidePanel={<SidePanel />}
    />
  );
};

export default Memory;
