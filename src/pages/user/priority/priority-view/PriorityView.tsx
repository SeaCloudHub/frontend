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
  isLoading: boolean;
};

const PriorityView: React.FC<PriorityViewProps> = ({ entries, isFileMode, isLoading }) => {
  const { viewMode } = useViewMode();
  const { rootId } = useStorageStore();
  const localEntries = isFileMode ? entries.filter((entry) => !entry.isDir) : entries.filter((entry) => entry.isDir);

  return viewMode === 'grid' ? (
    <DriveGridView
      isLoading={isLoading}
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
      curDir={{ id: rootId, name: 'Priority' }}
    />
  );
};

export default PriorityView;
