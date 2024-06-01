import Dropdown, { MenuItem, classNames } from '@/components/core/drop-down/Dropdown';
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Avatar, Tooltip } from '@mui/material';
import { useCursor, useDrawer, useEntries, useFilter, useSelected } from '@/store/my-drive/myDrive.store';
import {
  LocalEntry,
  SuggestedEntry,
  useCopyMutation,
  useDownloadMutation,
  useRestoreEntriesMutation,
  useStarEntryMutation,
  useUnstarEntryMutation,
} from '@/hooks/drive.hooks';
import CustomDropdown from '@/components/core/drop-down/CustomDropdown';
import SharePopUp from '@/components/core/pop-up/SharePopUp';
import MovePopUp from '@/components/core/pop-up/MovePopUp';
import RenamePopUp from '@/components/core/pop-up/RenamePopUp';
import DeletePopUp from '@/components/core/pop-up/DeletePopUp';
import { formatDate } from '@/utils/function/formatDate.function';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSession } from '@/store/auth/session';
import { getFirstCharacters } from '@/utils/function/getFirstCharacter';
import { getRandomColor } from '@/utils/function/getRandomColor';
import { numToSize } from '@/utils/function/numbertToSize';
import FileViewerContainer from '@/components/core/file-viewers/file-viewer-container/FileViewerContainer';
import { downloadFile } from '@/apis/drive/drive.api';
import { CopyToClipboard } from '@/utils/function/copy.function';
import { DRIVE_MY_DRIVE, DRIVE_SHARED } from '@/utils/constants/router.constant';
import DeleteTempPopUp from '@/components/core/pop-up/DeleteTempPopUp';
import { Star } from '@mui/icons-material';
import { useStorageStore } from '@/store/storage/storage.store';
import { isPermission } from '@/utils/function/permisstion.function';
import { UserRoleEnum } from '@/utils/enums/user-role.enum';

type DataRowProps = {
  // dirId?: string;
  isSelected?: boolean;
  onDoubleClick?: () => void;
  onChanged?: () => void;
  dir: { id: string; name: string };
  parent?: 'priority' | 'my-drive' | 'shared' | 'trash' | 'starred';
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
  userRoles,
  onChanged,
  dir,
  fileType,
  isSelected,
  is_starred,
}) => {
  const [type, setType] = useState<'move' | 'share' | 'rename' | 'move to trash' | null>(null);
  const [fileViewer, setFileViewer] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = React.useState(false);
  const [result, setResult] = useState(false);

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
  const { setListEntries, listEntries, listSuggestedEntries, setListSuggestedEntries } = useEntries();
  const { resetFilter } = useFilter();
  const { resetCursor } = useCursor();
  const { rootId } = useStorageStore();

  const entryMenu: MenuItem[][] = [
    [
      {
        label: 'Preview',
        icon: <Icon icon='material-symbols:visibility' />,
        action: () => {
          setFileViewer(true);
        },
        isHidden: isDir,
      },
    ],
    [
      {
        label: 'Download',
        icon: <Icon icon='ic:outline-file-download' />,
        action: () => {
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
        isHidden: isPermission(userRoles) <= 1,
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
        isHidden: isPermission(userRoles) <= 1,
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
      },
    ],
  ].filter((e) => e.length > 0);

  const menuItemsTrash: MenuItem[] = [
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
      isHidden: isPermission(userRoles) <= 1,
    },
  ];

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
      setListEntries([]);
      // setActivityLog([]);
      resetFilter();
      resetCursor();
      if (parent === 'shared') {
        id === rootId ? navigate(DRIVE_SHARED) : navigate(`/drive/folder/${id}`);
      }
      // onDoubleClick && onDoubleClick();
      else id === rootId ? navigate(DRIVE_MY_DRIVE) : navigate(`${DRIVE_MY_DRIVE}/dir/${id}`);
    } else {
      parent !== 'trash' && setFileViewer(true);
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
          fileInfo={{
            isDir: false,
            title: title,
            icon: icon,
            preview: '',
            id: id,
            owner: null,
            lastModified: new Date(),
            size: size,
            fileType: fileType,
            userRoles: userRoles,
          }}
        />
      )}
      <div
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        className={classNames(
          'data-row grid cursor-pointer grid-cols-7 gap-3 truncate border-b border-b-[#dadce0] py-2 font-medium max-[1160px]:grid-cols-7 max-[1150px]:grid-cols-6 max-[1000px]:grid-cols-5',
          isSelected ? 'bg-[#c2e7ff]  dark:bg-blue-900' : 'hover:bg-[#dfe3e7] dark:text-white dark:hover:bg-slate-700',
        )}>
        <div className='col-span-4 flex items-center'>
          <div className='px-4'>
            <div className='h-6 w-6'>{icon}</div>
          </div>
          <Tooltip title={title}>
            <div className='truncate'>{title}</div>
          </Tooltip>
          {is_starred && <Star className='dark:text-yellow-400' />}
        </div>
        <div className='max-[1150px]:hidden'>
          <div className='flex items-center gap-x-2'>
            {owner?.avatar_url ? (
              <div className='border border-[#c2e7ff] dark:border-blue-900 p-0.5 rounded-full ring-[1.5px]'>
                <Avatar
                  alt={owner.last_name}
                  src={import.meta.env.VITE_BACKEND_API + owner.avatar_url}
                  sx={{
                    width: 30,
                    height: 30,
                  }}
                />
              </div>
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
        <div className='my-auto truncate max-[1000px]:hidden'>{formatDate(lastModified)}</div>
        <div className='flex items-center justify-between max-[1160px]:justify-end'>
          <div className='truncate max-[1160px]:hidden'>{isDir ? '---' : numToSize(size)}</div>
          <div
            className='rounded-full text-end hover:bg-slate-300 dark:hover:bg-slate-500'
            // onClick={(e) => e.stopPropagation()}
            onDoubleClick={(e) => e.stopPropagation()}>
            <CustomDropdown
              button={<Icon icon='ic:baseline-more-vert' className='h-7 w-7 rounded-full p-1 dark:hover:text-white' />}
              items={parent === 'trash' ? [menuItemsTrash] : entryMenu}
            />
          </div>
        </div>
        {type === 'share' && (
          <SharePopUp fileId={id} open={isPopUpOpen} handleClose={() => setIsPopUpOpen(false)} title={title} />
        )}
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
        {parent === 'trash' && (
          <DeletePopUp
            open={isPopUpOpen}
            handleClose={() => setIsPopUpOpen(false)}
            title={title}
            source_ids={[id]}
            setResult={setResult}
          />
        )}
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
