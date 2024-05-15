import { useViewMode } from '@/store/my-drive/myDrive.store';
import React, { useState } from 'react';
import { LocalEntry } from '@/hooks/drive.hooks';
import DriveHistoryGridView from './DriveHistoryGridView';
import DriveHistoryListView from './DriveHistoryListView';

type TrashPageViewProps = {
  entries: LocalEntry[];
  dir: { id: string; name: string };
};

const TrashPageView: React.FC<TrashPageViewProps> = ({ entries, dir }) => {
  const { viewMode } = useViewMode();
  const [{ sort, order }, setSort] = useState<{ sort: string; order: string }>({ sort: 'Name', order: 'desc' });

  return viewMode === 'grid' ? (
    <DriveHistoryGridView sort={sort} order={order} setSort={setSort} entries={entries} dir={dir} />
  ) : (
    <DriveHistoryListView order={order} sort={sort} setSort={setSort} entries={entries} dir={dir} />
  );
};

export default TrashPageView;
