import React from 'react';
import { LocalEntry, SuggestedEntry } from '@/hooks/drive.hooks';
import { Path, useViewMode } from '@/store/my-drive/myDrive.store';
import { DriveGridView } from '../../my-drive/content/DriveGridView';
import { DriveListView } from '../../my-drive/content/DriveListView';
import { useStorageStore } from '@/store/storage/storage.store';
import PriorityListView from './PriorityListView';

type PriorityViewProps = {
  isFileMode: boolean;
  entries: SuggestedEntry[];
  sort: string;
  order: string;
  setSort: (value: { sort: string; order: string }) => void;
  isLoading: boolean;
};

const PriorityView: React.FC<PriorityViewProps> = ({ entries, sort, order, setSort, isFileMode, isLoading }) => {
  const { viewMode } = useViewMode();
  const { rootId } = useStorageStore();
  const localEntries = isFileMode ? entries.filter((entry) => !entry.isDir) : entries.filter((entry) => entry.isDir);

  return viewMode === 'grid' ? (
    <DriveGridView
      isLoading={isLoading}
      sort={sort}
      order={order}
      setSort={setSort}
      entries={localEntries}
      fileShow={isFileMode}
      folderShow={!isFileMode}
      parent='priority'
      curDir={{ id: rootId, name: 'Priority' }}
    />
  ) : (
    <PriorityListView
      entries={localEntries}
      isLoading={isLoading}
      order={order}
      setSort={setSort}
      sort={sort}
      curDir={{ id: rootId, name: 'Priority' }}
    />
  );
};

export default PriorityView;
