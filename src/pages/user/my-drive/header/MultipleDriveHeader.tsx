import IconifyIcon from '@/components/core/Icon/IConCore';
import DeletePopUp from '@/components/core/pop-up/DeletePopUp';
import DeleteTempPopUp from '@/components/core/pop-up/DeleteTempPopUp';
import MovePopUp from '@/components/core/pop-up/MovePopUp';
import RenamePopUp from '@/components/core/pop-up/RenamePopUp';
import SharePopUp from '@/components/core/pop-up/SharePopUp';
import {
  useDeleteMutation,
  useDownLoadMultipleMutation,
  useDownloadMutation,
  useRestoreEntriesMutation,
  useStarEntryMutation,
  useUnstarEntryMutation,
} from '@/hooks/drive.hooks';
import { useEntries, useSelected } from '@/store/my-drive/myDrive.store';
import { UserRoleEnum } from '@/utils/enums/user-role.enum';
import { CopyToClipboard } from '@/utils/function/copy.function';
import { isSelectedPermission } from '@/utils/function/permisstion.function';
import { Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';

type MultipleDriveHeaderProps = {
  parent: 'MyDrive' | 'Priority' | 'SharedWithMe' | 'Starred' | 'Trash' | null;
  dir: { id: string; name: string };
};

const MultipleDriveHeader: React.FC<MultipleDriveHeaderProps> = ({ dir, parent }) => {
  const [isOpened, setIsOpened] = useState(false);
  const { setArrSelected, arrSelected } = useSelected();
  const [result, setResult] = useState(false);
  const [type, setType] = useState<'move' | 'share' | 'rename' | 'move to trash' | null>();

  const {
    listEntries,
    setListEntries,
    getNameById,
    entriesSearchPage,
    setEntriesSearchPage,
    listSuggestedEntries,
    setListSuggestedEntries,
  } = useEntries();

  const deleteMutation = useDeleteMutation();
  const restoreMutation = useRestoreEntriesMutation();
  const starEntryMutation = useStarEntryMutation();
  const unstarEntryMutation = useUnstarEntryMutation();
  const downloadMutation = useDownloadMutation();
  const downloadMultipleEntries = useDownLoadMultipleMutation();

  const multipleDriveHeaderMenu: { icon: string; label: string; action: () => void; isHidden?: boolean }[] = [
    {
      icon: 'mdi:account-multiple-plus',
      label: 'Share',
      action: () => {
        setType('share');
        setIsOpened(true);
      },
      isHidden: !isSelectedPermission(arrSelected, UserRoleEnum.EDITOR) || arrSelected.length > 1,
    },
    {
      icon: 'mdi:download',
      label: 'Download',
      action: () => {
        arrSelected.length === 1
          ? downloadMutation.mutate({ id: arrSelected[0].id })
          : downloadMultipleEntries.mutate({
              ids: arrSelected.map((e) => e.id),
              parent_id: dir.id,
            });
      },
      isHidden: parent === 'Priority',
    },
    {
      icon: 'mdi:folder-move',
      label: 'Move',
      action: () => {
        if (parent === 'SharedWithMe') return;
        setType('move');
        setIsOpened(true);
      },
      isHidden: !isSelectedPermission(arrSelected, UserRoleEnum.OWNER) || parent === 'Priority',
    },
    {
      icon: 'mdi:delete',
      label: 'Move to trash',
      action: () => {
        setType('move to trash');
        setIsOpened(true);
      },
      isHidden: !isSelectedPermission(arrSelected, UserRoleEnum.EDITOR) || parent === 'Priority',
    },
    {
      label: arrSelected.every((e) => e.isStared) ? 'Unstar' : 'Star',
      icon: arrSelected.every((e) => e.isStared) ? 'mdi:star-off-outline': 'mdi:star',
      action: () => {
        arrSelected.every((e) => e.isStared) ?
          unstarEntryMutation.mutate({ file_ids: arrSelected.map((e) => e.id)},{
            onSuccess: () => {
              switch (parent) {
                case 'Priority': {
                  const newList = listSuggestedEntries.map((entry) => {
                    if (arrSelected.some((e) => e.id === entry.id)) {
                      return { ...entry, is_starred: false };
                    }
                    return entry;
                  });
                  setListSuggestedEntries(newList);
                  break;
                }
                default : {
                  const newList = listEntries.map((entry) => {
                    if (arrSelected.some((e) => e.id === entry.id)) {
                      return { ...entry, is_starred: false };
                    }
                    return entry;
                  });
                  setListEntries(newList);
                  break;
                }
              }
              setArrSelected(arrSelected.map((e) => ({ ...e, isStared: false })));
            }
          }) :
          starEntryMutation.mutate({ file_ids: arrSelected.map((e) => e.id)}, {
            onSuccess: () => {
              switch (parent) {
                case 'Priority': {
                  const newList = listSuggestedEntries.map((entry) => {
                    if (arrSelected.some((e) => e.id === entry.id)) {
                      return { ...entry, is_starred: true };
                    }
                    return entry;
                  });
                  setListSuggestedEntries(newList);
                  break;
                }
                default : {
                  const newList = listEntries.map((entry) => {
                    if (arrSelected.some((e) => e.id === entry.id)) {
                      return { ...entry, is_starred: true };
                    }
                    return entry;
                  });
                  setListEntries(newList);
                  break;
                }
              }
              setArrSelected(arrSelected.map((e) => ({ ...e, isStared: true })));
            }
          });
      },
    },
    {
      icon: 'mdi:link',
      label: 'Copy link',
      action: () => {
        const links = arrSelected.map((e) => `${window.location.origin}/drive/${e.isDir ? 'folder' : 'file'}/${e.id}`);
        CopyToClipboard(links.join('; '));
      },
    },
    {
      icon: 'mdi:rename-box',
      label: 'Rename',
      action: () => {
        setType('rename');
        setIsOpened(true);
      },
      isHidden: !isSelectedPermission(arrSelected, UserRoleEnum.EDITOR),
    },
  ];

  useEffect(() => {
    if (result) {
      setArrSelected([]);
      setResult(false);
    }
  }, [result, setArrSelected]);

  return (
    <div className='flex min-w-fit items-center gap-3 rounded-full bg-gray-100 p-0.5 dark:bg-search-bg-dark'>
      <Tooltip title='Clear selection'>
        <div>
          <IconifyIcon
            icon='mdi:close'
            className='h-8 w-8 rounded-full p-1 hover:bg-gray-200 dark:hover:bg-slate-500 dark:hover:text-white'
            onClick={() => setArrSelected([])}
          />
        </div>
      </Tooltip>
      <div className='min-w-40'> {arrSelected.length} items selected </div>
      {parent === 'Trash' ? (
        <>
          <IconifyIcon
            icon='mdi:restore'
            className='h-8 w-8 cursor-pointer rounded-full p-1 hover:bg-gray-200 dark:hover:bg-slate-500 dark:hover:text-white'
            onClick={() => {
              setResult(true);
              restoreMutation.mutate({ source_ids: arrSelected.map((e) => e.id) });
            }}
          />
          <IconifyIcon
            icon='mdi:delete'
            className='h-8 w-8 cursor-pointer rounded-full p-1 hover:bg-gray-200 dark:hover:bg-slate-500 dark:hover:text-white'
            onClick={() => setIsOpened(true)}
          />
        </>
      ) : (
        multipleDriveHeaderMenu.map(({ label, icon, action, isHidden }, index) => (
          <Tooltip key={index} title={label}>
            <div>
              <IconifyIcon
                icon={icon}
                className={`h-8 w-8 rounded-full p-1 ${
                  isHidden ||
                  (parent === 'SharedWithMe' && label === 'Move to trash') ||
                  (label === 'Rename' && arrSelected.length > 1)
                    ? 'text-gray-400 dark:brightness-75'
                    : 'cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-500 dark:hover:text-white'
                } `}
                onClick={
                  isHidden ||
                  (parent === 'SharedWithMe' && label === 'Move to trash') ||
                  (label === 'Rename' && arrSelected.length > 1)
                    ? () => {}
                    : action
                }
              />
            </div>
          </Tooltip>
        ))
      )}
      {type === 'share' && (
        <SharePopUp
          fileId={arrSelected.length === 1 ? arrSelected[0].id : null}
          open={isOpened}
          handleClose={() => setIsOpened(false)}
          title={`${arrSelected.length} items`}
        />
      )}
      {type === 'move' && (
        <MovePopUp
          open={isOpened}
          handleClose={() => setIsOpened(false)}
          title={`${arrSelected.length} items`}
          location={dir}
          ids={arrSelected.map((e) => e.id)}
        />
      )}
      {type === 'move to trash' && (
        <DeleteTempPopUp
          open={isOpened}
          handleClose={() => setIsOpened(false)}
          title={`${arrSelected.length} items`}
          id={dir.id}
          source_ids={arrSelected.map((e) => e.id)}
          setResult={setResult}
        />
      )}
      {parent === 'Trash' && (
        <DeletePopUp
          handleClose={() => setIsOpened(false)}
          open={isOpened}
          source_ids={arrSelected.map((e) => e.id)}
          title={''}
          setResult={setResult}
        />
      )}
      {type === 'rename' && (
        <RenamePopUp
          open={isOpened}
          handleClose={() => setIsOpened(false)}
          id={arrSelected[0].id}
          name={getNameById(arrSelected[0].id)}
        />
      )}
    </div>
  );
};

export default MultipleDriveHeader;
