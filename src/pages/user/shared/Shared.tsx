import SharingPageFilter from './sharing-page-filter/SharingPageFilter';
import { useState } from 'react';
import SharingPageViewMode from './sharing-page-view/SharingPageViewMode';
import { useViewMode } from '../my-drive/MyDrive';
import { Icon } from '@iconify/react/dist/iconify.js';
import SharingPageView from './sharing-page-view/SharingPageView';
import { Entry } from '@/utils/types/Entry';
import ButtonCore from '@/components/core/button/ButtonCore';

const fakeData: Entry[] = [
  {
    name: 'file0ádfasdfasdsadsadfasdf ádfasđfádf',
    full_path: '/file1',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '1',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'file1.mp3',
    full_path: '/file1.mp3',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '1',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'file2.mp4',
    full_path: '/file2.mp4',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '2',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'file3.pdf',
    full_path: '/file3.pdf',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '3',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'file4.docx',
    full_path: '/file4.docx',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '4',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'file5.jpg',
    full_path: '/file5.jpg',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '5',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'file6.txt',
    full_path: '/file6.txt',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '6',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'file7.zip',
    full_path: '/file7.zip',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '7',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'file8.jpeg',
    full_path: '/file8.jpeg',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: 'md5',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'file9.png',
    full_path: '/file9.png',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '8',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'file10.jfif',
    full_path: '/file10.jfif',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '9',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'file11.gif',
    full_path: '/file11.gif',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '10',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
    name: 'file12.webp',
    full_path: '/file12.webp',
    size: 1024,
    mode: 0o777,
    mime_type: 'text/plain',
    md5: '11',
    is_dir: false,
    created_at: '2021-09-21T14:00:00Z',
    updated_at: '2021-09-21T14:00:00Z',
  },
  {
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
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false);

  return (
    <div className='w-full'>
      <div className='flex justify-between space-x-2 text-2xl'>
        <h2 className='py-2 text-3xl font-semibold'>Shared with me</h2>
        <div className='flex items-center gap-2'>
          <SharingPageViewMode setViewMode={setViewMode} viewMode={viewMode} />
          <Icon
            icon='mdi:information-outline'
            className='h-8 w-8 cursor-pointer rounded-full p-1 transition-all hover:bg-surfaceContainerLow active:brightness-90'
            onClick={() => setIsShowDetail(!isShowDetail)}
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
      <SharingPageView entries={fakeData} />
    </div>
  );
};

export default Shared;
