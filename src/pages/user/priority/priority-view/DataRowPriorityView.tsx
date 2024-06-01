import { downloadFile } from '@/apis/drive/drive.api';
import CustomDropdown from '@/components/core/drop-down/CustomDropdown';
import { MenuItem, classNames } from '@/components/core/drop-down/Dropdown';
import FileViewerContainer from '@/components/core/file-viewers/file-viewer-container/FileViewerContainer';
import DeleteTempPopUp from '@/components/core/pop-up/DeleteTempPopUp';
import MovePopUp from '@/components/core/pop-up/MovePopUp';
import RenamePopUp from '@/components/core/pop-up/RenamePopUp';
import SharePopUp from '@/components/core/pop-up/SharePopUp';
import {
  LocalEntry,
  SuggestedEntry,
  useCopyMutation,
  useDownloadMutation,
  useRestoreEntriesMutation,
  useStarEntryMutation,
  useUnstarEntryMutation,
} from '@/hooks/drive.hooks';
import { useSession } from '@/store/auth/session';
import { useDrawer, useEntries, useSelected } from '@/store/my-drive/myDrive.store';
import { useStorageStore } from '@/store/storage/storage.store';
import { DRIVE_HOME, DRIVE_MY_DRIVE, DRIVE_MY_DRIVE_DIR, DRIVE_SHARED, HOME } from '@/utils/constants/router.constant';
import { UserRoleEnum } from '@/utils/enums/user-role.enum';
import { CopyToClipboard } from '@/utils/function/copy.function';
import { formatDate } from '@/utils/function/formatDate.function';
import { getFirstCharacters } from '@/utils/function/getFirstCharacter';
import { getRandomColor } from '@/utils/function/getRandomColor';
import { numToSize } from '@/utils/function/numbertToSize';
import { isPermission } from '@/utils/function/permisstion.function';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Star } from '@mui/icons-material';
import { Avatar, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type DataRowPriorityViewProps = {
  isSelected?: boolean;
  onDoubleClick?: () => void;
  onChanged?: () => void;
  dir: { id: string; name: string };
};

const DataRowPriorityView: React.FC<SuggestedEntry & DataRowPriorityViewProps> = ({
  dir,
  isSelected,
  onChanged,
  onDoubleClick,
  isDir,
  id,
  title,
  owner,
  fileType,
  icon,
  lastModified,
  preview,
  size,
  log,
  parent,
  userRoles,
  is_starred,
}) => {
  const [type, setType] = useState<'move' | 'share' | 'rename' | 'move to trash' | null>(null);
  const [fileViewer, setFileViewer] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [result, setResult] = useState(false);
  const { rootId } = useStorageStore();

  const { openDrawer, setTab } = useDrawer();
  const { identity } = useSession();
  const navigate = useNavigate();
  const copyMutation = useCopyMutation();
  const restoreMutation = useRestoreEntriesMutation();
  const url = useLocation();
  const { setArrSelected, arrSelected } = useSelected();
  const starEntryMutation = useStarEntryMutation();
  const unstarEntryMutation = useUnstarEntryMutation();
  const downloadMutation = useDownloadMutation();
  const { listSuggestedEntries, setListSuggestedEntries } = useEntries();

  const entryMenu: MenuItem[][] = [
    !isDir
      ? [
          {
            label: 'Preview',
            icon: <Icon icon='material-symbols:visibility' />,
            action: () => {
              setFileViewer(true);
            },
          },
        ]
      : [],
    [
      {
        label: 'Download',
        icon: <Icon icon='ic:outline-file-download' />,
        action: () => {
          downloadMutation.mutate({ id, name: title });
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
      !isDir && {
        label: 'Make a copy',
        icon: <Icon icon='material-symbols:content-copy-outline' />,
        action: () => {
          copyMutation.mutate({ ids: [id], to: dir.id });
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
                      const newState = listSuggestedEntries.map((entry: SuggestedEntry) => {
                        if (entry.id === id) {
                          return { ...entry, is_starred: false };
                        }
                        return entry;
                      });
                      setListSuggestedEntries(newState);
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
                      const newState = listSuggestedEntries.map((entry: SuggestedEntry) => {
                        if (entry.id === id) {
                          return { ...entry, is_starred: true };
                        }
                        return entry;
                      });
                      setListSuggestedEntries(newState);
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
      // !isDir && { label: 'Lock', icon: <Icon icon='mdi:lock-outline' />, action: () => {} },
    ],
    [
      {
        label: 'Move to trash',
        icon: <Icon icon='fa:trash-o' />,
        action: () => {
          setType('move to trash');
          setIsPopUpOpen(true);
        },
        isHidden: isPermission(userRoles) < UserRoleEnum.EDITOR,
      },
    ],
  ].filter((e) => e.length != 0);

  const handleCtrlClick = () => {
    setArrSelected(
      arrSelected.some((e) => e.id === id)
        ? arrSelected.filter((item) => item.id !== id)
        : [...arrSelected, { id, isDir, userRoles }],
    );
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.ctrlKey) {
      handleCtrlClick();
      return;
    }
    setArrSelected([{ id, isDir, userRoles }]);
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.ctrlKey) {
      handleCtrlClick();
      return;
    }
    if (isDir) {
      setArrSelected && setArrSelected([]);

      onDoubleClick && onDoubleClick();
    } else {
      setFileViewer(true);
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
          canDelete={isPermission(userRoles) >= UserRoleEnum.EDITOR}
          canShare={isPermission(userRoles) >= UserRoleEnum.EDITOR}
          fileInfo={{ isDir, title, icon, preview: '', id, owner: null, lastModified, size, fileType, userRoles }}
        />
      )}
      <div
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        className={classNames(
          'data-row grid cursor-pointer grid-cols-8 gap-3 truncate border-b border-b-[#dadce0] py-2 max-[1160px]:grid-cols-7 max-[1150px]:grid-cols-6 max-[1000px]:grid-cols-5',
          isSelected ? 'bg-[#c2e7ff]  dark:bg-blue-900' : 'hover:bg-[#dfe3e7] dark:text-white dark:hover:bg-slate-700',
        )}>
        <div className='col-span-4 flex'>
          <div className='px-4'>
            <div className='h-6 w-6'>{icon}</div>
          </div>
          <Tooltip title={title}>
            <div className='truncate'>{title}</div>
          </Tooltip>
          {is_starred && <Star className='h-5 w-5 dark:text-yellow-400' />}
        </div>
        <div className='col-span-2 max-[1150px]:hidden'>
          <span className='truncate'>
            {' '}
            You {log.action} • {formatDate(log.created_at)}{' '}
          </span>
        </div>
        <div className='truncate max-[1000px]:hidden'>
          <div className='flex items-center gap-x-2'>
            {owner?.avatar_url ? (
              <Avatar
                alt={owner.last_name}
                src={import.meta.env.VITE_BACKEND_API + owner.avatar_url}
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
            <span className='truncate'>{owner?.id === identity.id ? 'me' : owner?.last_name}</span>
          </div>
        </div>

        <div className='flex justify-between max-[1160px]:justify-end'>
          <div className='truncate max-[1160px]:hidden'>
            <div className='hover:bg-[#dfe3e7] dark:hover:bg-slate-400 rounded-full p-1 cursor-pointer px-1'
              onClick={(e) => {
                e.stopPropagation();
                if (isPermission(userRoles) >= UserRoleEnum.VIEWER) {
                  const paths = parent.path.split('/');
                  if(paths[1] === identity.id || (paths[1] === '' && parent.name === identity.id)) {
                    navigate(`${DRIVE_MY_DRIVE}/dir/${parent.id}`);
                  } else {
                    navigate(`/drive/folder/${parent.id}`);
                  }
                }
              }}>
              {parent.id === rootId ? 'My Drive' : parent.name}
            </div>
          </div>
          <div className='text-end'>
            <CustomDropdown
              button={<Icon icon='ic:baseline-more-vert' className='h-7 w-7 rounded-full p-1 hover:bg-surfaceContainerLow' />}
              items={entryMenu}
            />
          </div>
        </div>
        {type === 'share' && <SharePopUp fileId='' open={isPopUpOpen} handleClose={() => setIsPopUpOpen(false)} title={title} />}
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
      </div>
    </>
  );
};

export default DataRowPriorityView;
