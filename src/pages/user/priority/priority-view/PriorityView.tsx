import React from 'react';
import { LocalEntry } from '../../my-drive/MyDrive';
import { useViewMode } from '@/store/my-drive/myDrive.store';
import { DriveGridView } from '../../my-drive/content/DriveGridView';
import { DriveListView } from '../../my-drive/content/DriveListView';

type PriorityViewProps = {
  isFileMode: boolean;
  entries: LocalEntry[];
  sort: string;
  order: string;
  setSort: (value: { sort: string; order: string }) => void;
};

const PriorityView: React.FC<PriorityViewProps> = ({ entries, sort, order, setSort, isFileMode }) => {
  const { viewMode } = useViewMode();
  const localEntries = isFileMode ? entries.filter((entry) => !entry.isDir) : entries.filter((entry) => entry.isDir);

  return viewMode === 'grid' ? (
    <DriveGridView
      sort={sort}
      order={order}
      setSort={setSort}
      entries={localEntries}
      fileShow={!isFileMode}
      folderShow={isFileMode}
    />
  ) : (
    <DriveListView order={order} sort={sort} setSort={setSort} entries={localEntries} />
  );
};

export default PriorityView;
