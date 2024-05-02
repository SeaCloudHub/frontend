import Dropdown, { MenuItem, classNames } from '@/components/core/drop-down/Dropdown';
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Avatar, Tooltip } from '@mui/material';
import { useDrawer } from '@/store/my-drive/myDrive.store';
import { LocalEntry, useCopyMutation } from '@/hooks/drive.hooks';
import CustomDropdown from '@/components/core/drop-down/CustomDropdown';
import SharePopUp from '@/components/core/pop-up/SharePopUp';
import MovePopUp from '@/components/core/pop-up/MovePopUp';
import RenamePopUp from '@/components/core/pop-up/RenamePopUp';
import DeletePopUp from '@/components/core/pop-up/DeletePopUp';
import { FormatDateStrToDDMMYYYY, formatDate } from '@/utils/function/formatDate.function';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSession } from '@/store/auth/session';
import { getFirstCharacters } from '@/utils/function/getFirstCharacter';
import { getRandomColor } from '@/utils/function/getRandomColor';
import { numToSize } from '@/utils/function/numbertToSize';
import FileViewerContainer from '@/components/core/file-viewers/file-viewer-container/FileViewerContainer';
import { downloadFile } from '@/apis/drive/drive.api';
import { CopyToClipboard } from '@/utils/function/copy.function';
import { CUSTOMER_MY_DRIVE, CUSTOMER_MY_DRIVE_DIR, CUSTOMER_SHARED_DIR } from '@/utils/constants/router.constant';
import DeleteTempPopUp from '@/components/core/pop-up/DeleteTempPopUp';

type DataRowProps = {
  dirId?: string;
  onClick?: () => void;
  isSelected?: boolean;
  setArrSelected?: React.Dispatch<React.SetStateAction<string[]>>;
};

export const DataRow: React.FC<LocalEntry & DataRowProps> = ({
  id,
  isDir,
  title,
  icon,
  lastModified,
  owner,
  size,
  onDoubleClick,
  parent,
  onClick,
  onChanged,
  dirId,
  fileType,
  isSelected,
  setArrSelected,
}) => {
  const [type, setType] = useState<'move' | 'share' | 'rename' | 'move to trash' | null>(null);
  const [fileViewer, setFileViewer] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = React.useState(false);

  const { openDrawer } = useDrawer();
  const { identity } = useSession();
  const navigate = useNavigate();
  const copyMutation = useCopyMutation();
  const url = useLocation();

  const fileMenu: MenuItem[][] = [
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
          // console.log('[FileCard] Copy link ' + window.location.origin + location.pathname + `/${id}`);  //[TODO]
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

  const folderMenu = [
    [
      { label: 'Download', icon: <Icon icon='ic:outline-file-download' /> },
      {
        label: 'Rename',
        icon: <Icon icon='ic:round-drive-file-rename-outline' />,
        action: () => {
          setType('rename');
          setIsPopUpOpen(true);
        },
      },
    ],
    [
      {
        label: 'Copy link',
        icon: <Icon icon='material-symbols:link' />,
        action: () => {
          CopyToClipboard(window.location.origin + CUSTOMER_MY_DRIVE + `/dir/${id}`);
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
          console.log('[FileCard] add shortcut ' + id);
          setType('move');
          setIsPopUpOpen(true);
        },
      },
      {
        label: 'Add shortcut',
        icon: <Icon icon='material-symbols:add-to-drive' />,
      },
      {
        label: 'Add to starred',
        icon: <Icon icon='material-symbols:star-outline' />,
      },
    ],
    [
      {
        label: 'Detail',
        icon: <Icon icon='mdi:information-outline' />,
        action: () => openDrawer(id),
      },
      { label: 'Activity', icon: <Icon icon='mdi:graph-line-variant' /> },
    ],
    [{ label: 'Move to trash', icon: <Icon icon='fa:trash-o' /> }],
  ];

  const menuItemsTrash: MenuItem[] = [
    {
      label: 'Restore',
      icon: <Icon icon='mdi:restore' />,
      action: () => {
        console.log('[FileCard] Restore ' + id);
      },
    },
    {
      label: 'Delete permanently',
      icon: <Icon icon='fa:trash-o' />,
      action: () => {
        console.log('[FileCard] Delete permanently ' + id);
        setIsPopUpOpen(true);
      },
    },
  ];

  const handleCtrlClick = () => {
    setArrSelected && setArrSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.ctrlKey) {
      handleCtrlClick();
      return;
    }
    onClick && onClick();
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.ctrlKey) {
      handleCtrlClick();
      return;
    }
    if (isDir) {
      setArrSelected && setArrSelected([]);
      if (parent === 'shared') {
        navigate(`${CUSTOMER_SHARED_DIR}/dir/${id}`);
      }
      onDoubleClick && onDoubleClick();
    } else {
      parent !== 'trash' && setFileViewer(true);
    }
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
          'data-row grid grid-cols-7 max-[1160px]:grid-cols-7 max-[1150px]:grid-cols-6 max-[1000px]:grid-cols-5 gap-3 border-b border-b-[#dadce0] truncate py-2 cursor-pointer',
          isSelected
            ? 'bg-[#c2e7ff]  dark:bg-blue-700'
            : 'hover:bg-[#dfe3e7] dark:bg-slate-600 dark:text-white dark:hover:bg-blue-950',
        )}>
        <div className='flex col-span-4'>
          <div className='px-4'>
            <div className='h-6 w-6'>{icon}</div>
          </div>
          <Tooltip title={title}>
            <div className='truncate'>{title}</div>
          </Tooltip>
        </div>
        <div className='max-[1150px]:hidden'>
          <div className='flex items-center gap-x-2'>
            {owner?.avatar_url ? (
              <Avatar
                alt={owner.last_name}
                src={owner.avatar_url || 'https://picsum.photos/200/300'}
                sx={{
                  width: 30,
                  height: 30,
                }}
              />
            ) : (
              <div
                className='round flex h-[30px] w-[30px] items-center justify-center rounded-full'
                style={{ backgroundColor: getRandomColor() }}>
                <p className='statement-bold truncate'>
                  {getFirstCharacters(identity.first_name + ' ' + identity.last_name || '')}
                </p>
              </div>
            )}
            <span className='truncate'>
              {owner?.id === identity.id ? 'me' : owner?.last_name}
            </span>
          </div>
        </div>
        <div className='max-[1000px]:hidden truncate'>
          {formatDate(lastModified, owner?.id === identity.id ? 'me' : owner?.last_name)}
        </div>
        <div className='flex justify-between max-[1160px]:justify-end'>
          <div className='max-[1160px]:hidden truncate'>{numToSize(size)}</div>
          <div className='text-end'>
            <CustomDropdown
              button={<Icon icon='ic:baseline-more-vert' className='h-7 w-7 rounded-full p-1 hover:bg-surfaceContainerLow' />}
              items={parent === 'trash' ? [menuItemsTrash] : isDir ? folderMenu : fileMenu}
            />
          </div>
        </div>
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
        {parent === 'trash' && (
          <DeletePopUp open={isPopUpOpen} handleClose={() => setIsPopUpOpen(false)} title={title} source_ids={[id]} />
        )}
        {type === 'move to trash' && (
          <DeleteTempPopUp
            open={isPopUpOpen}
            handleClose={() => setIsPopUpOpen(false)}
            title={title}
            id={dirId}
            source_ids={[id]}
          />
        )}
      </div>
    </>
  );
};
