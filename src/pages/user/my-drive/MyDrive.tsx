import { fakeEntries } from '@/utils/dumps/entries';
import React, { useState } from 'react';
import FileHeader from '@/components/core/file-header/FileHeader';
import DriveLayout from '@/components/layout/DriveLayout';
import { Path, useDrawer, useViewMode } from '@/store/my-drive/myDrive.store';
import MyDriveHeader from './temp-components/MyDriveHeader';
import Dropdown from '@/components/core/drop-down/Dropdown';
import Sort from './browser/Sort';
import { DriveGridView, localEntriesToFiles } from './browser/DriveGridView';
import { localEntriesToFolder } from './browser/DriveGridView';
import { remoteToLocalEntries } from './browser/DriveGridView';
import { DriveListView, _renderListView } from './browser/DriveListView';
import { Entry } from '@/utils/types/entry.type';
import SidePanel from '@/pages/user/my-drive/side-panel/SidePanel';
import { Icon } from '@iconify/react/dist/iconify.js';
import Header from './side-panel/Header';
import Details from './side-panel/Details';
import Activity from './side-panel/Activity';

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
  const processedEntries = remoteToLocalEntries(fakeEntries);
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

  const sidePanel = (
    <div className='h-full w-[336px] overflow-hidden'>
      <div className='h-28 bg-yellow-400'>header</div>
      <div className='relative flex h-full w-full flex-col overflow-y-auto'>
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
        </div>
      </div>
    </div>
  );

  // const remoteEntries = getEntries(dirId, filter, sort, order);
  const remoteEntries: Entry[] = fakeEntries;
  const localEntries: LocalEntry[] = remoteToLocalEntries(remoteEntries);

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
          <DriveGridView sort={sort} order={order} setSort={setSort} entries={localEntries} />
        ) : (
          <DriveListView order={order} sort={sort} setSort={setSort} entries={localEntries} />
        )
      }
      sidePanel={<SidePanel />}
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
