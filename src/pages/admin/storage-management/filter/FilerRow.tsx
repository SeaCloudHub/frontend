import { numToSize } from '@/utils/function/numbertToSize';
import { FilerDataDto } from './FilterTable';
import { Icon } from '@iconify/react/dist/iconify.js';
import { MenuItem } from '@/components/core/drop-down/Dropdown';
import './index.css';
import { useDeleteMutation, useRenameMutation } from '@/hooks/drive.hooks';
import FileViewerContainer from '@/components/core/file-viewers/file-viewer-container/FileViewerContainer';
import { useState } from 'react';

type FilerRowProps = {
  data: FilerDataDto;
  onClick?: () => void;
  onDoubleClick?: (id: string, name: string) => void;
};

export const FilerRow: React.FC<FilerRowProps> = ({ data, onDoubleClick }) => {
  const renameMutation = useRenameMutation();
  const deleteMutation = useDeleteMutation();
  const [fileViewer, setFileViewer] = useState(false);

  const ops: MenuItem[] = [
    {
      label: 'Rename',
      icon: <Icon icon='ic:round-drive-file-rename-outline' />,
      action: () => {
        handleRename(data.id, data.name);
      },
    },
    {
      label: 'Move to trash',
      icon: <Icon icon='fa:trash-o' />,
      action: () => {
        if (!data.is_dir) {
          handleDelete(data.id);
        }
      },
    },
  ];

  const handleRename = (id, oldName) => {
    const newName = prompt('New Name:', oldName);
    if (newName == null || newName == '') {
      return;
    }
    renameMutation.mutate({ id, name: newName });
  };

  const handleDelete = (id) => {
    deleteMutation.mutate({ source_ids: [id] });
  };

  return (
    <>
      {fileViewer && (
        <FileViewerContainer
          open={fileViewer}
          closeOutside={() => {
            setFileViewer(false);
          }}
          fileInfo={{
            isDir: false,
            title: data.name,
            icon: <Icon icon='mdi:file' />,
            preview: '',
            id: data.id,
            owner: null,
            lastModified: new Date(),
            size: 0,
            fileType: data.type,
            userRoles: data.userRoles,
          }}
        />
      )}
      <div
        className='filer-row grid cursor-pointer grid-cols-9 gap-3 border-b border-b-[#dadce0] py-1 hover:bg-[#f5f5f5] max-[1160px]:grid-cols-6'
        onDoubleClick={() => {
          onDoubleClick && data.is_dir && onDoubleClick(data.id, data.name);
          !data.is_dir && setFileViewer(true);
        }}>
        <div className='col-span-3 flex items-center gap-1'>
          {data.is_dir && <Icon icon='mdi:folder' />}
          {data.name}
        </div>
        <p className='col-span-3 flex justify-end break-keep'>{data.type && data.type}</p>
        <div className='truncate  text-end max-[1000px]:hidden'>{data.size && numToSize(data.size)}</div>
        <div className=''>{formatDate(data.created)}</div>
        {!data.is_root && data.name !== '.trash' && (
          <div className={'operations hidden items-center justify-center gap-4'}>
            {ops.map((op, idx) => {
              return (
                <div className='cursor-pointer' key={idx} onClick={op.action}>
                  {op.icon}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
