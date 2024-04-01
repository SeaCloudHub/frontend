import { mockEntries } from '@/utils/dumps/entries';
import React, { useState } from 'react';
import FileHeader from '@/components/core/file-header/FileHeader';
import DriveLayout from '@/components/layout/DriveLayout';
import { Path, useViewMode } from '@/store/my-drive/myDrive.store';
import MyDriveHeader from './temp-components/MyDriveHeader';
import Dropdown from '@/components/core/drop-down/Dropdown';
import Sort from './browser/Sort';
import { DriveGridView, localEntriesToFiles } from './browser/DriveGridView';
import { localEntriesToFolder } from './browser/DriveGridView';
import { remoteToLocalEntries } from './browser/DriveGridView';
import { DriveListView, _renderListView } from './browser/DriveListView';

export type LocalEntry = {
  isDir: boolean;
  title: string;
  icon: React.ReactNode;
  preview: React.ReactNode;
  id: string;
  extra: string;
  owner: string;
  lastModified: string;
  size: string;
};

const MyDrive = () => {
  const processedEntries = remoteToLocalEntries(mockEntries);
  const files = processedEntries.filter((entry) => !entry.isDir);
  const folders = processedEntries.filter((entry) => entry.isDir);

  const [{ sort, order }, setSort] = useState<{ sort: string; order: string }>({ sort: 'Name', order: 'desc' });
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [peopleFilter, setPeopleFilter] = useState<string>('');
  const [modifiedFilter, setModifiedFilter] = useState<string>('');
  const [path, setPath] = useState<Path>([
    { name: 'My Drive', id: '1' },
    { name: 'Folder 1', id: '2' },
    { name: 'Folder 2', id: '3' },
    { name: 'Folder 3', id: '4' },
    { name: 'Folder 4', id: '5' },
  ]);

  const viewMode = useViewMode((state) => state.viewMode);

  const bodyLeft = (
    <div className='bg-white pl-5 pr-3 pt-4'>
      {viewMode === 'grid' ? (
        <div className='relative flex flex-col space-y-4'>
          <div className='absolute right-4 top-3'>
            <Sort sort={sort} order={order} setSort={setSort} />
          </div>
          <div className='statement-bold'> Folders</div>
          <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
            {localEntriesToFolder(folders)}
          </div>
          <div className='statement-bold'> Files</div>
          <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
            {localEntriesToFiles(files)}
          </div>
        </div>
      ) : (
        _renderListView(folders.concat(files))
      )}
    </div>
  );

  const bodyRight = (
    <div className='flex flex-col pl-5 pr-3 pt-4'>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
    </div>
  );

  // const headerLeft = <FileHeader headerName='My Drive' />;

  return (
    <DriveLayout
      headerLeft={
        <MyDriveHeader
          path={path}
          setPath={setPath}
          typeFilter={typeFilter}
          modifiedFilter={modifiedFilter}
          peopleFilter={peopleFilter}
          setTypeFilter={setTypeFilter}
          setModifiedFilter={setModifiedFilter}
          setPeopleFilter={setPeopleFilter}
        />
      }
      bodyLeft={
        viewMode === 'grid' ? (
          <DriveGridView
            dirId={path[path.length - 1].id}
            filter={{ typeFilter, peopleFilter, modifiedFilter }}
            sort={sort}
            order={order}
            setSort={setSort}
          />
        ) : (
          <DriveListView />
        )
      }
      headerRight={<div className=''>header</div>}
      bodyRight={bodyRight}
    />
  );
};

export type HeaderMyDriveProps = {
  name: string;
  owner: string;
  lastModified: string;
  size: string;
};

export default MyDrive;
