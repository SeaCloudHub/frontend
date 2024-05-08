import React from 'react';
import { LocalEntry } from '@/hooks/drive.hooks';
import { Path, useViewMode } from '@/store/my-drive/myDrive.store';
import { DriveGridView } from '../../my-drive/content/DriveGridView';
import { DriveListView } from '../../my-drive/content/DriveListView';
import { useStorageStore } from '@/store/storage/storage.store';

type PriorityViewProps = {
  isFileMode: boolean;
  entries: LocalEntry[];
  sort: string;
  order: string;
  setSort: (value: { sort: string; order: string }) => void;
};

const PriorityView: React.FC<PriorityViewProps> = ({
  entries,
  sort,
  order,
  setSort,
  isFileMode,
}) => {
  const { viewMode } = useViewMode();
  const { rootId } = useStorageStore();
  const localEntries = isFileMode ? entries.filter((entry) => !entry.isDir) : entries.filter((entry) => entry.isDir);

  return viewMode === 'grid' ? (
    <DriveGridView
      sort={sort}
      order={order}
      setSort={setSort}
      entries={localEntries}
      fileShow={!isFileMode}
      folderShow={isFileMode}
      curDir={{ id: rootId, name: 'Priority' }}
    />
  ) : (
    <DriveListView
      order={order}
      sort={sort}
      setSort={setSort}
      entries={localEntries}
      curDir={{ id: rootId, name: 'Priority' }}
    />
  );
};

export default PriorityView;
