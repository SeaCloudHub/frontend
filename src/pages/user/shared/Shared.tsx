import SharingPageFilter from './sharing-page-filter/SharingPageFilter';
import { useEffect, useState } from 'react';
import SharingPageViewMode from './sharing-page-view/SharingPageViewMode';
import DriveLayout from '@/components/layout/DriveLayout';
import ButtonCore from '@/components/core/button/ButtonCore';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Entry } from '@/utils/types/entry.type';
import { Path, useDrawer, useViewMode } from '@/store/my-drive/myDrive.store';
import SidePanel from '../my-drive/side-panel/SidePanel';
import { DriveGridView, remoteToLocalEntries } from '../my-drive/content/DriveGridView';
import { DriveListView } from '../my-drive/content/DriveListView';
import { useSession } from '@/store/auth/session';
import { useQuery } from '@tanstack/react-query';
import { getSharedEntries } from '@/apis/drive/drive.api';
import { ListEntriesRESP } from '@/apis/drive/response/list-entries.reponse';
import { LocalEntry } from '../my-drive/MyDrive';
import { toast } from 'react-toastify';
import DrivePath from '../my-drive/header/drive-path/DrivePath';

export const fakeData: Entry[] = [
  {
    id: '1',
    name: 'file0ádfasdfasdsadsadfasdf ádfasđfádf',
    full_path: '/file1',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '1',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-23T14:00:00Z',
  },
  {
    id: '2',
    name: 'file1.mp3',
    full_path: '/file1.mp3',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '1',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-22T14:00:00Z',
  },
  {
    id: '3',
    name: 'file2.mp4',
    full_path: '/file2.mp4',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '2',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-26T14:00:00Z',
  },
  {
    id: '4',
    name: 'file3.pdf',
    full_path: '/file3.pdf',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '3',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-27T14:00:00Z',
  },
  {
    id: '5',
    name: 'file4.docx',
    full_path: '/file4.docx',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '4',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-22T14:00:00Z',
  },
  {
    id: '6',
    name: 'file5.jpg',
    full_path: '/file5.jpg',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '5',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-23T14:00:00Z',
  },
  {
    id: '7',
    name: 'file6.txt',
    full_path: '/file6.txt',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '6',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-24T14:00:00Z',
  },
  {
    id: '8',
    name: 'file7.zip',
    full_path: '/file7.zip',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '7',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-27T14:00:00Z',
  },
  {
    id: '9',
    name: 'file8.jpeg',
    full_path: '/file8.jpeg',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: 'md5',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-28T14:00:00Z',
  },
  {
    id: '10',
    name: 'file9.png',
    full_path: '/file9.png',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '8',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-22T14:00:00Z',
  },
  {
    id: '11',
    name: 'file10.jfif',
    full_path: '/file10.jfif',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '9',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-29T14:00:00Z',
  },
  {
    id: '12',
    name: 'file11.gif',
    full_path: '/file11.gif',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '10',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-23T14:00:00Z',
  },
  {
    id: '13',
    name: 'file12.webp',
    full_path: '/file12.webp',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '11',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-25T14:00:00Z',
  },
  {
    id: '14',
    name: 'file13.ico',
    full_path: '/file13.ico',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '12',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    id: '15',
    name: 'file14.svg',
    full_path: '/file14.svg',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '13',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    id: '16',
    name: 'dir1',
    full_path: '/dir1',
    size: 0,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '14',
    is_dir: true,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    id: '17',
    name: 'dir2',
    full_path: '/dir2',
    size: 0,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '15',
    is_dir: true,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
];

const Shared = () => {
  const { viewMode, setViewMode } = useViewMode();
  const [typeFilterItem, setTypeFilterItem] = useState<string>('');
  const [peopleFilterItem, setPeopleFilterItem] = useState<string>('');
  const [modifiedFilterItem, setModifiedFilterItem] = useState<string>('');
  const { drawerOpen, openDrawer, closeDrawer } = useDrawer();
  const [{ sort, order }, setSort] = useState<{ sort: string; order: string }>({ sort: 'Name', order: 'desc' });
  const { root_id } = useSession();
  const [path, setPath] = useState<Path>([{ name: 'Shared', id: root_id }]);

  const { data, error, refetch } = useQuery({
    queryKey: ['shared-entries', root_id],
    queryFn: async () => await getSharedEntries({ id: path[path.length - 1].id }).then((res) => res?.data?.entries || []),
  });

  useEffect(() => {
    refetch();
  }, [path, refetch]);

  const processedEntries: LocalEntry[] = remoteToLocalEntries((data || []) as Required<Entry[]> & ListEntriesRESP['entries']);

  return (
    <DriveLayout
      headerLeft={
        <div className='px-4'>
          <div className='flex justify-between space-x-2 text-2xl'>
            <div className='w-full pb-[8px] pl-1 pt-[14px]'>
              <DrivePath path={path} setPath={setPath} type='Shared' />
            </div>
            <div className='flex items-center gap-2'>
              <SharingPageViewMode setViewMode={setViewMode} viewMode={viewMode} />
              <Icon
                icon='mdi:information-outline'
                className='h-8 w-8 cursor-pointer rounded-full p-1 transition-all hover:bg-surfaceContainerLow active:brightness-90'
                onClick={() => {
                  if (!drawerOpen) {
                    openDrawer();
                  } else {
                    closeDrawer();
                  }
                }}
              />
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <SharingPageFilter
              setModifiedFilterItem={setModifiedFilterItem}
              setPeopleFilterItem={setPeopleFilterItem}
              setTypeFilterItem={setTypeFilterItem}
              modifiedFilter={modifiedFilterItem}
              peopleFilter={peopleFilterItem}
              typeFilter={typeFilterItem}
            />
            {(typeFilterItem || peopleFilterItem || modifiedFilterItem) && (
              <ButtonCore
                title='Clear all filters'
                contentColor='black'
                onClick={() => {
                  setTypeFilterItem('');
                  setPeopleFilterItem('');
                  setModifiedFilterItem('');
                }}
                type={'text'}
              />
            )}
          </div>
        </div>
      }
      bodyLeft={
        viewMode === 'grid' ? (
          <DriveGridView sort={sort} order={order} setSort={setSort} entries={processedEntries} setPath={setPath} />
        ) : (
          <DriveListView order={order} sort={sort} setSort={setSort} entries={processedEntries} />
        )
      }
      sidePanel={<SidePanel />}
    />
  );
};

export default Shared;
