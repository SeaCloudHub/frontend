import DriveLayout from '@/components/layout/DriveLayout';
import SidePanel from '../my-drive/side-panel/SidePanel';
import MemoryHeader from './header/MemoryHeader';
import { useState } from 'react';
import { MemoryView } from './content/MemoryView';
import { fakeEntries } from '@/utils/dumps/entries';
import { transformEntries } from '@/hooks/drive.hooks';
import { EntryRESP } from '@/apis/drive/drive.response';

const Memory = () => {
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [modifiedFilter, setModifiedFilter] = useState<string>('');
  const [{ sort, order }, setSort] = useState<{ sort: string; order: string }>({ sort: 'Name', order: 'desc' });

  const entries = fakeEntries as unknown;
  const localEntries = transformEntries(entries as EntryRESP[]);

  return (
    <DriveLayout
      headerLeft={
        <MemoryHeader
          typeFilter={typeFilter}
          modifiedFilter={modifiedFilter}
          setTypeFilter={setTypeFilter}
          setModifiedFilter={setModifiedFilter}
        />
      }
      bodyLeft={<MemoryView entries={localEntries} order={order} setSort={setSort} sort={sort} />}
      sidePanel={<SidePanel />}
    />
  );
};

export default Memory;
