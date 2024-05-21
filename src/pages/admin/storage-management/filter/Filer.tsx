import { FilerButton } from './FilerButton';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Breadcrumb } from 'antd';
import { FilerDataDto, FilerTable } from './FilterTable';
import { SetStateAction, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUploadMutation } from '@/hooks/drive.hooks';
import ModalCreateFolder from '@/components/core/modal/ModalCreateFolder';
import { LinearProgress } from '@mui/material';
import { Path } from '@/store/my-drive/myDrive.store';

type FilerProps = {
  data: FilerDataDto[];
  setPath?: React.Dispatch<React.SetStateAction<Path>>;
  path: Path;
};

export const Filer: React.FC<FilerProps> = ({ data, setPath, path }) => {
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
          items={path.map((item) => ({
            title: <a>{item.name}</a>,
            onClick: () => {
              setPath && setPath(path.slice(0, path.indexOf(item) + 1));
            },
          }))}
        />
        {path.length !== 1 && (
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
        )}
      </div>
      <FilerTable data={data} setPath={setPath} />
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
