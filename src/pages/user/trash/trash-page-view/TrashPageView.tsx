import { useViewMode } from '@/store/my-drive/myDrive.store';
import React, { useState } from 'react';
import { LocalEntry } from '@/hooks/drive.hooks';
import DriveHistoryGridView, { TimeEntry } from './DriveHistoryGridView';
import DriveHistoryListView from './DriveHistoryListView';

type TrashPageViewProps = {
  entries: TimeEntry[];
  dir: { id: string; name: string };
  isLoading?: boolean;
  isScrolling?: boolean;
};

const TrashPageView: React.FC<TrashPageViewProps> = ({ entries, dir, isLoading, isScrolling }) => {
  const { viewMode } = useViewMode();
  const [{ sort, order }, setSort] = useState<{ sort: string; order: string }>({ sort: 'Name', order: 'desc' });

  return viewMode === 'grid' ? (
    <DriveHistoryGridView
      sort={sort}
      order={order}
      setSort={setSort}
      entries={entries}
      dir={dir}
      isLoading={isLoading}
      isScrolling={isScrolling}
    />
  ) : (
    <DriveHistoryListView order={order} sort={sort} setSort={setSort} entries={entries} dir={dir} />
  );
};

export default TrashPageView;
