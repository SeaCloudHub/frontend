import FileCard from '@/components/core/file-card/FileCard';
import fileIcons from '@/components/core/file-card/fileicon.constant';
import { useState } from 'react';
import { render } from 'react-dom';
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

/* Suport mp4, mp3, pdf, jpg, jpeg, png, jfif, gif, webp, ico, svg, 
docx, txt, zip, any */
const renderFiles = (files: Entry[]) => {
  return files.map((entry) => {
    const ext = entry.name.split('.').pop() || 'any';
    const icon = fileIcons[ext] || fileIcons.any;
    const preview = ['jpg', 'ico', 'webp', 'png', 'jpeg', 'gif', 'jfif'].includes(ext) ? (
      <img
        className="object-cover object-center h-full"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrHRymTob1kd-ywHzIs0ty7UhrFUcJay839nNd6tcSig&s"
      />
    ) : (
      <div className="h-16 w-16">{icon}</div>
    );

    // some condition
    let condition = true;
    return (
      condition && (
        <div className="h-64 w-72">
          <FileCard title={entry.name} icon={icon} preview={preview} id={entry.md5} />
        </div>
      )
    );
  });
};

const MyDrive = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);

  // const entries: Entry[] = getEntries();
  const entries: Entry[] = [
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
    <div className="h-full w-full overflow-y-auto p-5">
      <div className="flex flex-col space-y-4">
        <div> Folders</div>
        <div> Files</div>
        <div className="flex flex-wrap gap-4 overflow-y-auto">
          {renderFiles(files)}
        </div>
      </div>
    </div>
  );
};

export default MyDrive;
