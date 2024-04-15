import { useViewMode } from '@/store/my-drive/myDrive.store';
import { Entry } from '@/utils/types/entry.type';
import React, { useState } from 'react';
import { remoteToLocalEntries2 } from '../../my-drive/content/DriveGridView';
import DriveHistoryGridView from './DriveHistoryGridView';
import DriveHistoryListView from './DriveHistoryListView';

type TrashPageViewProps = {
  entries: Entry[];
};

const TrashPageView: React.FC<TrashPageViewProps> = ({ entries }) => {
  const { viewMode } = useViewMode();
  const processedEntries = remoteToLocalEntries2(entries);
  const [{ sort, order }, setSort] = useState<{ sort: string; order: string }>({ sort: 'Name', order: 'desc' });

  return viewMode === 'grid' ? (
    <DriveHistoryGridView sort={sort} order={order} setSort={setSort} entries={processedEntries} />
  ) : (
    <DriveHistoryListView order={order} sort={sort} setSort={setSort} entries={processedEntries} />
  );
};

export default TrashPageView;
