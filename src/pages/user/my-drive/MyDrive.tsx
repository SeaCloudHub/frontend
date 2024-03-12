import FileCard from '@/components/core/file-card/FileCard';
import fileIcons from '@/components/core/file-card/fileicon.constant';
import { useState } from 'react';
import { GiEntryDoor } from 'react-icons/gi';

const filesFilter = (entry: Entry) => {
  if (entry.is_dir) {
    return false;
  }
  return true;
};

const foldersFilter = (entry: Entry) => {
  if (entry.is_dir) {
    return true;
  }
  return false;
};

const MyDrive = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);

  // const entries: Entry[] = getEntries();
  const entries: Entry[] = [
    {
      name: 'file1',
      full_path: '/file1',
      size: 1024,
      mode: 0o777,
      mime_type: 'text/plain',
      md5: 'md5',
      is_dir: false,
      created_at: '2021-09-21T14:00:00Z',
      updated_at: '2021-09-21T14:00:00Z',
    },
    {
      name: 'file2',
      full_path: '/file2',
      size: 1024,
      mode: 0o777,
      mime_type: 'text/plain',
      md5: 'md5',
      is_dir: false,
      created_at: '2021-09-21T14:00:00Z',
      updated_at: '2021-09-21T14:00:00Z',
    },
    {
      name: 'file3',
      full_path: '/file3',
      size: 1024,
      mode: 0o777,
      mime_type: 'text/plain',
      md5: 'md5',
      is_dir: false,
      created_at: '2021-09-21T14:00:00Z',
      updated_at: '2021-09-21T14:00:00Z',
    },
    {
      name: 'file4',
      full_path: '/file4',
      size: 1024,
      mode: 0o777,
      mime_type: 'text/plain',
      md5: 'md5',
      is_dir: false,
      created_at: '2021-09-21T14:00:00Z',
      updated_at: '2021-09-21T14:00:00Z',
    },
    {
      name: 'file5',
      full_path: '/file5',
      size: 1024,
      mode: 0o777,
      mime_type: 'text/plain',
      md5: 'md5',
      is_dir: false,
      created_at: '2021-09-21T14:00:00Z',
      updated_at: '2021-09-21T14:00:00Z',
    },
  ];
  const files = entries.filter(filesFilter);
  const folders = entries.filter(foldersFilter);

  // const fileList = files.map((entry) => {
  //   const ext = entry.name.split('.').pop() || 'any';
  //   const icon = fileIcons[ext] || fileIcons.any;

  //   const img = ["jpg", "ico", "webp", "png", "jpeg", "gif", "jfif"].includes(ext)
  //   ? <img className='w-full h-full object-cover object-center' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrHRymTob1kd-ywHzIs0ty7UhrFUcJay839nNd6tcSig&s' />
  //   : null;

  //   return (

  //   )

  // }

  return (
    <div className='flex h-full w-full flex-wrap gap-2 overflow-y-auto p-5'>
      {Array.from({ length: 30 }).map((_, index) => (
        <div className='h-64 w-64'>
          <FileCard title={'File number ' + index.toString()} size={index.toString()} id={index.toString()} />
        </div>
      ))}
    </div>
  );
};

export default MyDrive;
