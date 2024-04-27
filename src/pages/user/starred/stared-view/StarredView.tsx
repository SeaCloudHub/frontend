import React, { Dispatch, SetStateAction, useState } from 'react';
import { DriveListView } from '../../my-drive/content/DriveListView';
import { DriveGridView } from '../../my-drive/content/DriveGridView';
import { transformEntries } from '@/hooks/drive.hooks';
import { Entry } from '@/utils/types/entry.type';
import { useViewMode } from '@/store/my-drive/myDrive.store';
import { EntryRESP } from '@/apis/drive/drive.response';

type StarredPageViewProps = {
  entries: EntryRESP[];
  arrSelected: string[];
  setArrSelected: Dispatch<SetStateAction<string[]>>;
};

const StarredView: React.FC<StarredPageViewProps> = ({ entries, arrSelected, setArrSelected }) => {
  const { viewMode } = useViewMode();
  const processedEntries = transformEntries(entries);
  const [{ sort, order }, setSort] = useState<{ sort: string; order: string }>({ sort: 'Name', order: 'desc' });

  return viewMode === 'grid' ? (
    <DriveGridView sort={sort} order={order} setSort={setSort} entries={processedEntries} arrSelected={arrSelected} setArrSelected={setArrSelected}/>
  ) : (
    <DriveListView order={order} sort={sort} setSort={setSort} entries={processedEntries} />
  );
};

export default StarredView;
