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

  return viewMode === 'grid' ? (
    <DriveGridView parent='shared' entries={processedEntries} />
  ) : (
    <DriveListView parent='shared' entries={processedEntries} />
  );
};

export default SharingPageView;
