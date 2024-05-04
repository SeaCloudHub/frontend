import { PencilIcon, ShareIcon, TrashIcon } from '@heroicons/react/16/solid';
import { CopyToClipboard } from '@/utils/function/copy.function';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Info } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MenuItem, classNames } from '../drop-down/Dropdown';
import { downloadFile } from '@/apis/drive/drive.api';
import { useCopyMutation, useRestoreEntriesMutation } from '@/hooks/drive.hooks';
import { useDrawer, useSelected } from '@/store/my-drive/myDrive.store';
import CustomDropdown from '../drop-down/CustomDropdown';
import FileViewerContainer from '../file-viewers/file-viewer-container/FileViewerContainer';
import DeletePopUp from '../pop-up/DeletePopUp';
import DeleteTempPopUp from '../pop-up/DeleteTempPopUp';
import MovePopUp from '../pop-up/MovePopUp';
import RenamePopUp from '../pop-up/RenamePopUp';
import SharePopUp from '../pop-up/SharePopUp';

type FileCardProps = {
  title: string;
  icon?: React.ReactNode;
  preview?: React.ReactNode;
  id: string;
  isSelected?: boolean;
  dirId?: string;
  fileType?: string;
  parent?: 'priority' | 'my-drive' | 'shared' | 'trash';
  isDir: boolean;
};

export const FileOperation = [
  { icon: <Info />, label: 'FIle infomation' },
  { icon: <PencilIcon />, label: 'Rename file' },
  { icon: <ShareIcon />, label: 'Share file' },
  { icon: <TrashIcon />, label: 'Delete file' },
];

const FileCard: React.FC<FileCardProps> = ({
  title,
  icon,
  preview,
  id,
  isSelected,
  dirId,
  fileType,
  parent,
  isDir,
}) => {
  const [fileViewer, setFileViewer] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [type, setType] = useState<'move' | 'share' | 'rename' | 'move to trash' | null>(null);
  const openDrawer = useDrawer((state) => state.openDrawer);
  const [result, setResult] = useState(false);

  const copyMutation = useCopyMutation();
  const restoreMutation = useRestoreEntriesMutation();
  const { setArrSelected, arrSelected } = useSelected();

  const menuItems: MenuItem[][] = [
    [
      {
        label: 'Preview',
        icon: <Icon icon='material-symbols:visibility' />,
        action: () => {
          setFileViewer(true);
        },
      },
    ],
    [
      {
        label: 'Download',
        icon: <Icon icon='ic:outline-file-download' />,
        action: () => {
          downloadFile({ id, name: title });
        },
      },
      {
        label: 'Rename',
        icon: <Icon icon='ic:round-drive-file-rename-outline' />,
        action: () => {
          setType('rename');
          setIsPopUpOpen(true);
        },
      },
      {
        label: 'Make a copy',
        icon: <Icon icon='material-symbols:content-copy-outline' />,
        action: () => {
          copyMutation.mutate({ ids: [id], to: dirId });
        },
      },
    ],
    [
      {
        label: 'Copy link',
        icon: <Icon icon='material-symbols:link' />,
        action: (text: string) => {
          CopyToClipboard(text);
        },
      },
      {
        label: 'Share',
        icon: <Icon icon='lucide:user-plus' />,
        action: () => {
          setType('share');
          setIsPopUpOpen(true);
        },
      },
    ],
    [
      {
        label: 'Move',
        icon: <Icon icon='mdi:folder-move-outline' />,
        action: () => {
          console.log('[FileCard] Move ' + id);
          setType('move');
          setIsPopUpOpen(true);
        },
      },
      {
        label: 'Add shortcut',
        icon: <Icon icon='material-symbols:add-to-drive' />,
        action: () => {},
      },
      {
        label: 'Add to starred',
        icon: <Icon icon='material-symbols:star-outline' />,
        action: () => {},
      },
    ],
    [
      {
        label: 'Detail',
        icon: <Icon icon='mdi:information-outline' />,
        action: () => {
          console.log('[FileCard] detail ' + id);
          openDrawer(id);
        },
      },
      { label: 'Activity', icon: <Icon icon='mdi:graph-line-variant' />, action: () => {} },
      { label: 'Lock', icon: <Icon icon='mdi:lock-outline' />, action: () => {} },
    ],
    [
      {
        label: 'Move to trash',
        icon: <Icon icon='fa:trash-o' />,
        action: () => {
          setType('move to trash');
          setIsPopUpOpen(true);
        },
      },
    ],
  ];

  const menuItemsTrash: MenuItem[][] = [
    [
      {
        label: 'Restore',
        icon: <Icon icon='mdi:restore' />,
        action: () => {
          setResult(true);
          restoreMutation.mutate({ source_ids: [id] });
        },
      },
      {
        label: 'Delete permanently',
        icon: <Icon icon='fa:trash-o' />,
        action: () => {
          setIsPopUpOpen(true);
        },
      },
    ],
  ];

  const handleCtrlClick = () => {
    setArrSelected(arrSelected.includes(id) ? arrSelected.filter((item) => item !== id) : [...arrSelected, id]);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.ctrlKey) {
      handleCtrlClick();
      return;
    }
    setArrSelected([id]);
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.ctrlKey) {
      handleCtrlClick();
      return;
    }
    console.log(isDir);
    !isDir && setFileViewer(true);
  };

  useEffect(() => {
    if (result) {
      setResult(false);
      setArrSelected([]);
    }
  }, [result, setArrSelected]);

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
            title: title,
            icon: icon,
            preview: '',
            id: id,
            owner: null,
            lastModified: new Date(),
            size: 0,
            fileType: fileType,
            onDoubleClick: function (): void {
              throw new Error('Function not implemented.');
            },
            onChanged: function (): void {
              throw new Error('Function not implemented.');
            },
          }}
        />
      )}
      <div
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        className={classNames(
          'file-card flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-xl px-2 shadow-sm duration-150',
          isSelected
            ? 'bg-[#c2e7ff] dark:bg-blue-900 dark:text-white'
            : 'bg-[#f0f4f9] hover:bg-[#dfe3e7] dark:bg-slate-600 dark:text-white dark:hover:bg-blue-950',
        )}>
        <div className='flex w-full items-center justify-between px-1 py-3'>
          <div className='flex max-w-[calc(100%-1.5rem)] items-center space-x-4'>
            <div className='h-6 w-6 min-w-fit'>{icon}</div>
            <Tooltip title={title}>
              <div className='select-none truncate text-sm font-medium'>{title}</div>
            </Tooltip>
          </div>
          <div className='h-6 w-6 rounded-full p-1 hover:bg-slate-300 dark:hover:bg-slate-800'>
            <CustomDropdown
              button={<BsThreeDotsVertical className='dark:hover:text-slate-500' />}
              items={parent === 'trash' ? menuItemsTrash : menuItems}
            />
          </div>
        </div>
        <div className='mb-2 flex h-full w-full items-center justify-center overflow-hidden rounded-md bg-white dark:bg-slate-500'>{preview}</div>
        {type === 'share' && <SharePopUp open={isPopUpOpen} handleClose={() => setIsPopUpOpen(false)} title={title} />}
        {type === 'move' && (
          <MovePopUp
            open={isPopUpOpen}
            handleClose={() => setIsPopUpOpen(false)}
            title={title}
            location={'adfasdfasdf asdfasdfasdf asdfasdf'}
          />
        )}
        {type === 'rename' && <RenamePopUp open={isPopUpOpen} handleClose={() => setIsPopUpOpen(false)} name={title} id={id} />}
        {type === 'move to trash' && (
          <DeleteTempPopUp
            open={isPopUpOpen}
            handleClose={() => setIsPopUpOpen(false)}
            title={title}
            id={dirId}
            source_ids={[id]}
            setResult={setResult}
          />
        )}
        {parent === 'trash' && (
          <DeletePopUp
            open={isPopUpOpen}
            handleClose={() => setIsPopUpOpen(false)}
            setResult={setResult}
            title={title}
            source_ids={[id]}
          />
        )}
      </div>
    </>
  );
};

export default FileCard;
