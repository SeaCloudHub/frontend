import { useViewMode } from '@/store/my-drive/myDrive.store';
import { Entry } from '@/utils/types/entry.type';
import React, { useState } from 'react';
import { LocalEntry, transformEntries } from '@/hooks/drive.hooks';
import DriveHistoryGridView from './DriveHistoryGridView';
import DriveHistoryListView from './DriveHistoryListView';
import { EntryRESP } from '@/apis/drive/drive.response';

type TrashPageViewProps = {
  entries: LocalEntry[];
  arrSelected: string[];
  setArrSelected: (arrSelected: string[]) => void;
};

const TrashPageView: React.FC<TrashPageViewProps> = ({ entries, arrSelected, setArrSelected }) => {
  const { viewMode } = useViewMode();
  const [{ sort, order }, setSort] = useState<{ sort: string; order: string }>({ sort: 'Name', order: 'desc' });

  return viewMode === 'grid' ? (
    <DriveHistoryGridView
      sort={sort}
      order={order}
      setSort={setSort}
      entries={entries}
      arrSelected={arrSelected}
      setArrSelected={setArrSelected}
    />
  ) : (
    <DriveHistoryListView order={order} sort={sort} setSort={setSort} entries={entries} />
  );
};

export default TrashPageView;
