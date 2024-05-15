import React, { Dispatch, SetStateAction, useState } from 'react';
import { DriveListView } from '../../my-drive/content/DriveListView';
import { DriveGridView } from '../../my-drive/content/DriveGridView';
import { LocalEntry, transformEntries } from '@/hooks/drive.hooks';
import { Entry } from '@/utils/types/entry.type';
import { useSelected, useViewMode } from '@/store/my-drive/myDrive.store';
import { EntryRESP } from '@/apis/drive/drive.response';
import { useStorageStore } from '@/store/storage/storage.store';

type StarredPageViewProps = {
  entries: LocalEntry[];
  isLoading?: boolean;
};

const StarredView: React.FC<StarredPageViewProps> = ({ entries, isLoading }) => {
  const { viewMode } = useViewMode();
  const { rootId } = useStorageStore();
  const [{ sort, order }, setSort] = useState<{ sort: string; order: string }>({ sort: 'Name', order: 'desc' });

  return viewMode === 'grid' ? (
    <DriveGridView
      sort={sort}
      order={order}
      setSort={setSort}
      entries={entries}
      isLoading={isLoading}
      parent='starred'
      curDir={{ id: rootId, name: 'Starred' }}
    />
  ) : (
    <DriveListView
      order={order}
      sort={sort}
      setSort={setSort}
      entries={entries}
      isLoading={isLoading}
      parent='starred'
      curDir={{ id: rootId, name: 'Starred' }}
    />
  );
};

export default StarredView;
