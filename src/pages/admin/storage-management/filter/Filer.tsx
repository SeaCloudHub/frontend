import { FilerButton } from './FilerButton';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Breadcrumb } from 'antd';
import { FilerDataType, FilerTable } from './FilterTable';
import { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUploadMutation } from '@/hooks/drive.hooks';
import ModalCreateFolder from '@/components/core/modal/ModalCreateFolder';

type FilerProps = {
  test?: string;
};

const fakeData: FilerDataType[] = [
  { id: '1', created: new Date(), is_dir: true, name: 'Folder 1', size: 100, type: 'Folder' },
  { id: '2', created: new Date(), is_dir: false, name: 'File 1', size: 100, type: 'File' },
  { id: '3', created: new Date(), is_dir: true, name: 'Folder 2', size: 6969, type: 'Folder' },
  { id: '4', created: new Date(), is_dir: false, name: 'File 2', size: 100, type: 'File' },
];

export const Filer: React.FC<FilerProps> = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const [createModal, setCreateModal] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const uploadFilesMutation = useUploadMutation();

  const toggleFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const toggleCreateFolder = () => {
    setCreateModal(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, curDirId: string) => {
    const fileList = e.currentTarget.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      await uploadFilesMutation.mutateAsync({ files: filesArray, id: curDirId });
      queryClient.invalidateQueries({ queryKey: ['mydrive-entries'] });
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='mb-[20px] flex items-center justify-between'>
        <Breadcrumb
          items={[
            {
              title: <a href=''>/</a>,
            },
            {
              title: <a href=''>Dir 1</a>,
            },
            {
              title: <a href=''>Dir 2</a>,
            },
            {
              title: <a href=''>Dir 3</a>,
            },
          ]}
        />
        <div className='flex flex-row'>
          <FilerButton
            icon={<Icon icon='mdi:plus' />}
            label='New Folder'
            onClick={() => {
              toggleCreateFolder();
            }}
          />
          <FilerButton
            icon={<Icon icon='mdi:upload' />}
            label='Upload'
            onClick={() => {
              toggleFilePicker();
            }}
          />
        </div>
      </div>
      <FilerTable data={fakeData} />
      <input
        ref={fileInputRef}
        id='fileInput'
        type='file'
        style={{ display: 'none' }}
        onChange={(e) => {
          const data = queryClient.getQueriesData({ queryKey: ['entry-metadata'] });
          const curDirId = data?.[0]?.[0]?.[1] as string;
          console.log('[AddFileMenu] curDirId', curDirId);
          handleFileUpload(e, curDirId);
        }}
        multiple
      />
      {createModal && (
        <ModalCreateFolder
          isOpen={createModal}
          handleConfirm={() => {
            setCreateModal(false);
          }}
        />
      )}
    </div>
  );
};
