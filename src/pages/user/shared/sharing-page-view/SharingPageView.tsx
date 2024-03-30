import { Entry } from '@/utils/types/Entry';
import React from 'react';
import { _entryToMyEntry, _myEntryToFile, _renderListView, useViewMode } from '../../my-drive/MyDrive';

type SharingPageViewProps = {
  entries: Entry[];
};

const SharingPageView: React.FC<SharingPageViewProps> = ({ entries }) => {
  const { viewMode } = useViewMode();
  const processedEntries = _entryToMyEntry(entries);

  return (
    <div className='overflow-y-auto p-5'>
      {viewMode === 'grid' ? (
        <div className='flex flex-col space-y-4'>
          <div className='text-sm font-medium'> Folders</div>
          <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
            {_myEntryToFile(processedEntries)}
          </div>
        </div>
      ) : (
        _renderListView(processedEntries)
      )}
    </div>
  );
};

export default SharingPageView;
