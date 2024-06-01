import { PencilIcon, ShareIcon, TrashIcon } from '@heroicons/react/16/solid';
import { CopyToClipboard } from '@/utils/function/copy.function';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Info, Star } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MenuItem, classNames } from '../drop-down/Dropdown';
import {
  LocalEntry,
  SuggestedEntry,
  useCopyMutation,
  useDownLoadMultipleMutation,
  useDownloadMutation,
  useRestoreEntriesMutation,
  useStarEntryMutation,
  useUnstarEntryMutation,
} from '@/hooks/drive.hooks';
import {
  useActivityLogStore,
  useCursor,
  useCursorActivity,
  useDrawer,
  useEntries,
  useFilter,
  useSelected,
} from '@/store/my-drive/myDrive.store';
import CustomDropdown from '../drop-down/CustomDropdown';
import FileViewerContainer from '../file-viewers/file-viewer-container/FileViewerContainer';
import DeletePopUp from '../pop-up/DeletePopUp';
import DeleteTempPopUp from '../pop-up/DeleteTempPopUp';
import MovePopUp from '../pop-up/MovePopUp';
import RenamePopUp from '../pop-up/RenamePopUp';
import SharePopUp from '../pop-up/SharePopUp';
import { DRIVE_MY_DRIVE, DRIVE_SHARED } from '@/utils/constants/router.constant';
import { useNavigate } from 'react-router-dom';
import { useStorageStore } from '@/store/storage/storage.store';
import { isPermission } from '@/utils/function/permisstion.function';
import { UserRole } from '@/utils/types/user-role.type';

type FileCardProps = {
  title: string;
  icon?: React.ReactNode;
  preview?: React.ReactNode;
  id: string;
  isSelected?: boolean;
  dir?: { id: string; name: string };
  fileType?: string;
  parent?: 'priority' | 'my-drive' | 'shared' | 'trash' | 'starred';
  isDir: boolean;
  userRoles: UserRole[];
  is_starred: boolean;
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
  dir,
  fileType,
  parent,
  isDir,
  userRoles,
  is_starred,
}) => {
  const [fileViewer, setFileViewer] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [type, setType] = useState<'move' | 'share' | 'rename' | 'move to trash' | null>(null);
  const { openDrawer, setTab } = useDrawer();
  const [result, setResult] = useState(false);
  const navigate = useNavigate();
  const { rootId } = useStorageStore();
  // const { resetLimit } = useLimit();
  const { resetCursorActivity } = useCursorActivity();
  const { resetCursor } = useCursor();
  const { setListEntries, listEntries, setListSuggestedEntries, listSuggestedEntries } = useEntries();
  const { setActivityLog } = useActivityLogStore();
  const copyMutation = useCopyMutation();
  const restoreMutation = useRestoreEntriesMutation();
  const starEntryMutation = useStarEntryMutation();
  const unstarEntryMutation = useUnstarEntryMutation();
  const downloadMutation = useDownloadMutation();
  const downloadFolder = useDownLoadMultipleMutation();
  const { setArrSelected, arrSelected } = useSelected();
  const { resetFilter } = useFilter();

  const menuItems: MenuItem[][] = [
    [
      {
        label: 'Preview',
        icon: <Icon icon='material-symbols:visibility' />,
        action: () => {
          setFileViewer(true);
        },
        isHidden: isPermission(userRoles) <= 0 || isDir,
      },
    ],
    [
      {
        label: 'Download',
        icon: <Icon icon='ic:outline-file-download' />,
        action: () => {
          // downloadFile({ id, name: title });
          downloadMutation.mutate({ id, name: title });
        },
        isHidden: isPermission(userRoles) <= 0,
      },
      {
        label: 'Rename',
        icon: <Icon icon='ic:round-drive-file-rename-outline' />,
        action: () => {
          setType('rename');
          setIsPopUpOpen(true);
        },
        isHidden: isPermission(userRoles) <= 1,
      },
      {
        label: 'Make a copy',
        icon: <Icon icon='material-symbols:content-copy-outline' />,
        action: () => {
          copyMutation.mutate({ ids: [id], to: dir.id });
        },
        isHidden: isPermission(userRoles) <= 1,
      },
    ],
    [
      {
        label: 'Copy link',
        icon: <Icon icon='material-symbols:link' />,
        action: () => {
          const domain = window.location.origin;
          const link = `${domain}/drive/${isDir ? 'folder' : 'file'}/${id}`;
          CopyToClipboard(link);
        },
      },
      {
        label: 'Share',
        icon: <Icon icon='lucide:user-plus' />,
        action: () => {
          setType('share');
          setIsPopUpOpen(true);
        },
        isHidden: isPermission(userRoles) <= 1,
      },
    ],
    [
      {
        label: 'Move',
        icon: <Icon icon='mdi:folder-move-outline' />,
        action: () => {
          setType('move');
          setIsPopUpOpen(true);
        },
        isHidden: isPermission(userRoles) <= 1,
      },
      ...(is_starred
        ? [
            {
              label: 'Remove from starred',
              icon: <Icon icon='mdi:star-off-outline' />,
              action: () => {
                unstarEntryMutation.mutate(
                  { file_ids: [id] },
                  {
                    onSuccess: () => {
                      if (parent === 'priority') {
                        const newState = listSuggestedEntries.map((entry: SuggestedEntry) => {
                          if (entry.id === id) {
                            return { ...entry, is_starred: false };
                          }
                          return entry;
                        });
                        setListSuggestedEntries(newState);
                      } else {
                        const newState = listEntries.map((entry: LocalEntry) => {
                          if (entry.id === id) {
                            return { ...entry, is_starred: false };
                          }
                          return entry;
                        });
                        setListEntries(newState);
                      }
                    },
                  },
                );
              },
            },
          ]
        : [
            {
              label: 'Add to starred',
              icon: <Icon icon='material-symbols:star-outline' />,
              action: () => {
                starEntryMutation.mutate(
                  { file_ids: [id] },
                  {
                    onSuccess: () => {
                      if (parent === 'priority') {
                        const newState = listSuggestedEntries.map((entry: SuggestedEntry) => {
                          if (entry.id === id) {
                            return { ...entry, is_starred: true };
                          }
                          return entry;
                        });
                        setListSuggestedEntries(newState);
                      } else {
                        const newState = listEntries.map((entry: LocalEntry) => {
                          if (entry.id === id) {
                            return { ...entry, is_starred: true };
                          }
                          return entry;
                        });
                        setListEntries(newState);
                      }
                    },
                  },
                );
              },
            },
          ]),
    ],
    [
      {
        label: 'Detail',
        icon: <Icon icon='mdi:information-outline' />,
        action: () => {
          setTab('Details');
          openDrawer(id);
        },
      },
      {
        label: 'Activity',
        icon: <Icon icon='mdi:graph-line-variant' />,
        action: () => {
          setTab('Activity');
          openDrawer(id);
        },
      },
      // { label: 'Lock', icon: <Icon icon='mdi:lock-outline' />, action: () => {} },
    ],
    [
      {
        label: 'Move to trash',
        icon: <Icon icon='fa:trash-o' />,
        action: () => {
          setType('move to trash');
          setIsPopUpOpen(true);
        },
        isHidden: isPermission(userRoles) <= 1,
      },
    ],
  ].filter((item) => item.length > 0);

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
    setArrSelected(
      arrSelected.some((item) => item.id === id)
        ? arrSelected.filter((item) => item.id !== id)
        : [...arrSelected, { id, isDir, userRoles }],
    );
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey) {
      handleCtrlClick();
      return;
    }
    if (arrSelected.some((item) => item.id === id)) return;
    setArrSelected([{ id, isDir, userRoles }]);
    // setActivityLog([]);
    resetCursorActivity();
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDir) setFileViewer(true);
    else {
      if (parent === 'trash') return;
      setArrSelected([]);
      setListEntries([]);
      // setActivityLog([]);
      resetFilter();
      resetCursor();
      // resetCursorActivity();
      if (parent === 'shared') id === rootId ? navigate(DRIVE_SHARED) : navigate(`/drive/folder/${id}`);
      else id === rootId ? navigate(DRIVE_MY_DRIVE) : navigate(`${DRIVE_MY_DRIVE}/dir/${id}`);
    }
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
          canDelete={isPermission(userRoles) >= 1}
          canShare={isPermission(userRoles) >= 1}
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
            userRoles: userRoles,
          }}
        />
      )}
      <div
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        className={classNames(
          'file-card flex h-full cursor-pointer flex-col items-center justify-center rounded-xl px-2 shadow-sm duration-150',
          isSelected
            ? 'bg-[#c2e7ff] dark:bg-blue-900 dark:text-white'
            : 'bg-[#f0f4f9] hover:bg-[#dfe3e7] dark:bg-slate-600 dark:text-white dark:hover:bg-slate-700',
        )}>
        <div className='flex w-full items-center justify-between px-1 py-3'>
          <div className='flex max-w-[calc(100%-1.5rem)] items-center space-x-4'>
            <div className='h-6 w-6 min-w-fit'>{icon}</div>
            <Tooltip title={title}>
              <div className='select-none truncate font-medium'>{title}</div>
            </Tooltip>
            {is_starred && <Star className={'dark:text-yellow-500'} />}
          </div>
          <div
            className='h-6 w-6 rounded-full p-1 hover:bg-slate-300 dark:hover:bg-slate-500'
            onDoubleClick={(e) => e.stopPropagation()}>
            <CustomDropdown
              button={<BsThreeDotsVertical className='dark:hover:text-white' />}
              minWidth
              items={parent === 'trash' ? menuItemsTrash : menuItems}
            />
          </div>
        </div>
        <div className='mb-2 flex h-full w-full items-center justify-center overflow-hidden rounded-md bg-white dark:bg-slate-400'>
          {preview}
        </div>
      </div>
      {type === 'share' && <SharePopUp fileId={id} open={isPopUpOpen} handleClose={() => setIsPopUpOpen(false)} title={title} />}
      {type === 'move' && (
        <MovePopUp
          open={isPopUpOpen}
          handleClose={() => setIsPopUpOpen(false)}
          title={title}
          location={dir}
          ids={arrSelected.map((item) => item.id) || [id]}
        />
      )}
      {type === 'rename' && <RenamePopUp open={isPopUpOpen} handleClose={() => setIsPopUpOpen(false)} name={title} id={id} />}
      {type === 'move to trash' && (
        <DeleteTempPopUp
          open={isPopUpOpen}
          handleClose={() => setIsPopUpOpen(false)}
          title={title}
          id={dir.id}
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
    </>
  );
};

export default FileCard;
