import React, { useState } from 'react';
import { DriveGridView } from '../../my-drive/content/DriveGridView';
import { transformEntries } from '@/hooks/drive.hooks';
import { Entry } from '@/utils/types/entry.type';
import { useViewMode } from '@/store/my-drive/myDrive.store';
import { DriveListView } from '../../my-drive/content/DriveListView';
import { EntryRESP } from '@/apis/drive/drive.response';

type SharingPageViewProps = {
  entries: EntryRESP[];
};

const SharingPageView: React.FC<SharingPageViewProps> = ({ entries }) => {
  const { viewMode } = useViewMode();
  const processedEntries = transformEntries(entries);
  const [{ sort, order }, setSort] = useState<{ sort: string; order: string }>({ sort: 'Name', order: 'desc' });

  return viewMode === 'grid' ? (
    <DriveGridView sort={sort} parent='shared' order={order} setSort={setSort} entries={processedEntries} />
  ) : (
    <DriveListView order={order} parent='shared' sort={sort} setSort={setSort} entries={processedEntries} />
  );
};

export default SharingPageView;
