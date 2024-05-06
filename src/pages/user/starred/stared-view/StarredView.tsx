import React, { Dispatch, SetStateAction, useState } from 'react';
import { DriveListView } from '../../my-drive/content/DriveListView';
import { DriveGridView } from '../../my-drive/content/DriveGridView';
import { LocalEntry, transformEntries } from '@/hooks/drive.hooks';
import { Entry } from '@/utils/types/entry.type';
import { useViewMode } from '@/store/my-drive/myDrive.store';
import { EntryRESP } from '@/apis/drive/drive.response';

type StarredPageViewProps = {
  entries: LocalEntry[];
  arrSelected: string[];
  setArrSelected: Dispatch<SetStateAction<string[]>>;
  isLoading?: boolean;
};

const StarredView: React.FC<StarredPageViewProps> = ({ entries, arrSelected, setArrSelected, isLoading }) => {
  const { viewMode } = useViewMode();
  const [{ sort, order }, setSort] = useState<{ sort: string; order: string }>({ sort: 'Name', order: 'desc' });

  return viewMode === 'grid' ? (
    <DriveGridView
      sort={sort}
      order={order}
      setSort={setSort}
      entries={entries}
      isLoading={isLoading}
      parent = 'starred'
    />
  ) : (
    <DriveListView
      order={order}
      sort={sort}
      setSort={setSort}
      entries={entries}
      isLoading={isLoading}
      parent = 'starred'
    />
  );
};

export default StarredView;
