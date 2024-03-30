import React from 'react';
import { _entryToMyEntry, _myEntryToFile, _myEntryToFolders, _renderListView, useViewMode } from '../../my-drive/MyDrive';
import { Entry } from '@/utils/types/Entry';

type StarredPageViewProps = {
  entries: Entry[];
};

const StarredView: React.FC<StarredPageViewProps> = ({ entries }) => {
  const { viewMode } = useViewMode();
  const processedEntries = _entryToMyEntry(entries);
  const folders = processedEntries.filter((entry) => entry.isDir);
  const files = processedEntries.filter((entry) => !entry.isDir);

  return (
    <div className='overflow-y-auto p-5'>
      {viewMode === 'grid' ? (
        <div className='flex flex-col space-y-4'>
          <div className='text-sm font-medium'> Folders</div>
          <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
            {_myEntryToFolders(folders)}
          </div>
          <div className='text-sm font-medium'> Files</div>
          <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
            {_myEntryToFile(files)}
          </div>
        </div>
      ) : (
        _renderListView(processedEntries)
      )}
    </div>
  );
};

export default StarredView;
