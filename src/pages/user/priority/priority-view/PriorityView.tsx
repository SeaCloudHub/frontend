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
  // setPath?: React.Dispatch<React.SetStateAction<Path>>;

  // setArrSelected?: React.Dispatch<React.SetStateAction<string[]>>;
  // arrSelected?: string[];
};

const PriorityView: React.FC<PriorityViewProps> = ({
  entries,
  sort,
  order,
  setSort,
  isFileMode,
  // setPath,
  // arrSelected,
  // setArrSelected,
}) => {
  const { viewMode } = useViewMode();
  const { rootId } = useStorageStore();
  const localEntries = isFileMode ? entries.filter((entry) => !entry.isDir) : entries.filter((entry) => entry.isDir);

  console.log('PriorityView', localEntries);

  return viewMode === 'grid' ? (
    <DriveGridView
      sort={sort}
      order={order}
      setSort={setSort}
      entries={localEntries}
      fileShow={!isFileMode}
      folderShow={isFileMode}
      // arrSelected={arrSelected}
      // setArrSelected={setArrSelected}
      curDir={{ id: rootId, name: 'Priority' }}
      // setPath={setPath}
    />
  ) : (
    <DriveListView
      order={order}
      sort={sort}
      setSort={setSort}
      entries={localEntries}
      // setPath={setPath}
      curDir={{ id: rootId, name: 'Priority' }}
    />
  );
};

export default PriorityView;
